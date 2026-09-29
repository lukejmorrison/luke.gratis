import { clearCookie, cookieValue, readSession, sessionCookie, signSession } from "./auth.js";
import {
  ADMIN_EMAIL,
  defaultSite,
  normalizeSite,
  renderAdmin,
  renderLogin,
  renderNotFound,
  renderPage,
} from "./site.js";

const SESSION_TTL = 60 * 60 * 12;

export default {
  async fetch(request, env) {
    try {
      return await route(request, env);
    } catch {
      const asset = await env.ASSETS.fetch(request);
      if (asset.ok) return asset;
      return new Response("The site hit a snag.", { status: 500, headers: { "content-type": "text/plain; charset=utf-8" } });
    }
  },
};

async function route(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.luke.gratis") {
      url.hostname = "luke.gratis";
      return Response.redirect(url.toString(), 301);
    }

    const path = url.pathname.replace(/\/+$/, "") || "/";
    if (path.startsWith("/api/admin/")) return api(request, env, path);
    if (path === "/admin") return adminPage(request, env);
    if (hasFileExtension(path)) return env.ASSETS.fetch(request);

    const site = await loadSite(env);
    const admin = await isAdmin(request, env);
    if (path === "/") return html(renderPage(site, "home", { admin }));

    const slug = decodeURIComponent(path.slice(1)).toLowerCase();
    if (!/^[a-z0-9-]+$/i.test(slug)) return env.ASSETS.fetch(request);
    if (!site.pages.some((page) => page.slug === slug)) return html(renderNotFound(site), 404);
    return html(renderPage(site, slug, { admin }));
}

function hasFileExtension(path) {
  return /\/[^/]+\.[a-z0-9]+$/i.test(path);
}

function html(body, status = 200) {
  return new Response(body, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
      "referrer-policy": "strict-origin-when-cross-origin",
    },
  });
}

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...extraHeaders,
    },
  });
}

async function loadSite(env) {
  try {
    const stored = env.SITE ? await env.SITE.get("site", "json") : null;
    if (!stored) return defaultSite();
    const normalized = normalizeSite(stored);
    return normalized.site || defaultSite();
  } catch {
    return defaultSite();
  }
}

async function currentSession(request, env) {
  const token = cookieValue(request.headers.get("cookie"), "luke_admin");
  return readSession(env.SESSION_SECRET, token);
}

async function isAdmin(request, env) {
  const session = await currentSession(request, env);
  return session?.email === ADMIN_EMAIL;
}

async function adminPage(request, env) {
  if (!(await isAdmin(request, env))) return html(renderLogin());
  const site = await loadSite(env);
  return html(renderAdmin(site, { email: ADMIN_EMAIL }));
}

async function api(request, env, path) {
  if (path === "/api/admin/login" && request.method === "POST") return login(request, env);
  if (path === "/api/admin/logout" && request.method === "POST") return logout();
  if (path === "/api/admin/site" && request.method === "GET") return getSite(request, env);
  if (path === "/api/admin/site" && request.method === "PUT") return putSite(request, env);
  return json({ error: "Not found." }, 404);
}

async function login(request, env) {
  if (!env.SESSION_SECRET || !env.LUKE_GRATIS_BRIDGE_SECRET) {
    return json({ error: "Admin sign-in is not configured yet." }, 500);
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Sign-in needs an email and password." }, 400);
  }
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  const twoFactorCode = String(body.twoFactorCode || "").trim();
  if (email !== ADMIN_EMAIL || !password) return json({ error: "Invalid credentials." }, 401);

  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  if (await attemptCount(env, ip) >= 8) return json({ error: "Too many sign-in attempts. Wait a few minutes." }, 429);

  let upstream;
  try {
    upstream = await fetch("https://apps.wizwam.com/api/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        "x-luke-gratis-bridge": env.LUKE_GRATIS_BRIDGE_SECRET,
      },
      body: JSON.stringify({ email, password, twoFactorCode, rememberMe: false }),
    });
  } catch {
    return json({ error: "Wizwam sign-in is unreachable right now." }, 502);
  }

  const data = await upstream.json().catch(() => ({}));
  if (!upstream.ok) {
    await recordAttempt(env, ip);
    const message = safeError(data.error) || "Invalid credentials.";
    return json({ error: message, requiresTwoFactor: Boolean(data.requiresTwoFactor) }, upstream.status);
  }

  const userEmail = String(data.user?.email || "").toLowerCase();
  if (userEmail !== ADMIN_EMAIL) return json({ error: "That Wizwam account cannot edit this site." }, 403);
  await closeUpstreamSession(upstream, data.csrfToken);

  const token = await signSession(env.SESSION_SECRET, ADMIN_EMAIL, SESSION_TTL);
  return json({ ok: true, email: ADMIN_EMAIL }, 200, { "set-cookie": sessionCookie(token, SESSION_TTL) });
}

async function logout() {
  return json({ ok: true }, 200, { "set-cookie": clearCookie() });
}

async function getSite(request, env) {
  if (!(await isAdmin(request, env))) return json({ error: "Sign in required." }, 401);
  return json({ site: await loadSite(env) });
}

async function putSite(request, env) {
  if (!(await isAdmin(request, env))) return json({ error: "Sign in required." }, 401);
  if (request.headers.get("x-luke-admin") !== "1") return json({ error: "Missing editor header." }, 403);
  if (!env.SITE) return json({ error: "The content store is not connected." }, 500);
  const text = await request.text();
  if (text.length > 300000) return json({ error: "That edit is too large." }, 413);
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    return json({ error: "The edit was not valid JSON." }, 400);
  }
  const normalized = normalizeSite(body.site || body);
  if (normalized.error) return json({ error: normalized.error }, 400);
  await env.SITE.put("site", JSON.stringify(normalized.site));
  return json({ ok: true, site: normalized.site });
}

async function attemptCount(env, ip) {
  if (!env.SITE) return 0;
  return Number(await env.SITE.get(`login:${ip}`)) || 0;
}

async function recordAttempt(env, ip) {
  if (!env.SITE) return;
  const next = (await attemptCount(env, ip)) + 1;
  await env.SITE.put(`login:${ip}`, String(next), { expirationTtl: 600 });
}

function safeError(value) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (!text || text.length > 180) return "";
  return text;
}

async function closeUpstreamSession(response, csrfToken) {
  const cookies = typeof response.headers.getSetCookie === "function" ? response.headers.getSetCookie() : [];
  const session = cookies
    .map((cookie) => cookie.match(/^wizwam_session=([^;]+)/)?.[1] || "")
    .find(Boolean);
  if (!session) return;
  try {
    await fetch("https://apps.wizwam.com/api/auth/logout", {
      method: "POST",
      headers: {
        cookie: `wizwam_session=${session}`,
        "x-csrf-token": String(csrfToken || ""),
        "content-type": "application/json",
      },
      body: "{}",
    });
  } catch {
    // The luke.gratis session is already separate. Leaving the short Wizwam session is not fatal.
  }
}
