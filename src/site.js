export const THEMES = [
  { id: "ink", label: "Ink", note: "The dark Wizwam desk." },
  { id: "paper", label: "Paper", note: "A light page, closer to a printed essay." },
  { id: "field", label: "Field", note: "Warm paper with gold links." },
];

const RESERVED_SLUGS = new Set(["admin", "api", "images", "assets", "home"]);
const WIZWAM_NOTE = "“Wiz” as in wizard. “Wham” as in wham e.g. Wizwām";
const WIZWAM_WORD = `<abbr title="${WIZWAM_NOTE}">Wizwam</abbr>`;

export function defaultSite() {
  return {
    theme: "ink",
    title: "Luke Morrison",
    description:
      "Canadian. Professional fruit inspector. Founder of Wizwam. I make small tools for Omarchy, and I aspire to be truly helpful, truth-seeking, and fun.",
    header: {
      name: "Luke Morrison",
      avatar: "/images/helmet.jpg",
      avatarAlt: "Luke Morrison",
      introHtml:
        `I am a <a href="#canada">Canadian</a>, a <a href="#inspector">professional fruit inspector</a>, <a href="#wizwam">founder of ${WIZWAM_WORD}</a>, <a href="#omarchy">maker of small tools for Omarchy</a>, and someone who aspires to be <a href="#helpful">truly helpful, truth-seeking, and fun</a>.`,
    },
    home: {
      blocks: [
        {
          type: "p",
          html: `I write on <a rel="me" href="https://x.com/lukejmorrison">X</a>. The code is on <a rel="me" href="https://github.com/lukejmorrison">GitHub</a>. The company is <a href="https://www.wizwam.com">${WIZWAM_WORD}</a>. You can also <a href="https://www.buymeacoffee.com/lukejmorrison">buy me a coffee</a>.`,
        },
        { type: "h2", id: "canada", text: "Canadian" },
        {
          type: "p",
          html: 'Home is Canada. I joined X in April 2009 as <a href="https://x.com/lukejmorrison">@lukejmorrison</a>. In high school my mates called me Morrison. The name stuck.',
        },
        { type: "h2", id: "inspector", text: "Professional fruit inspector" },
        { type: "p", html: "I coined that from a story of my dad." },
        {
          type: "p",
          html: "Dad used to take my brother and me to see Mr. Major, a local apple farmer. Mr. Major loved telling us. Remember, place that apple, boys. A good picker takes it off the tree and doesn’t break that little stem. See that little stem, he’d say, and point at an apple sitting in the top of one of his precisely laid out baskets. If you can’t see the stem, the picker didn’t do it right. They didn’t pop it free. They left it on the branch. They probably wrenched the apple off, and the stem tore the bark. You hurt the branch that way. Then the tree spends the next year on repair, instead of growing apples. The apples don’t come back as well, and the tree won’t produce, because the picker was lazy. You’re not lazy, eh, boys? He’d wink. You have to learn to see the branch.",
        },
        {
          type: "p",
          html: "Place each and every apple into the basket. Do not drop it. Apples bruise easily. Any small drop bruises them. Drop one into the basket and it shows bruising and internal blemishes. Never dump a basket of apples into another basket. For that, Mr. Major would fire your ass.",
        },
        {
          type: "p",
          html: "Then my dad met this other guy. A man who said, “I’m a fruit inspector.” It was the same answer whenever anyone asked what he did. I’m a professional fruit inspector, he’d say. His job, he said, was simply to serve. Look at the fruit. Quite easy, really. That one stayed with Dad, and then with me. I love how my dad tells stories.",
        },
        {
          type: "p",
          html: 'This story makes me think of the line in <a href="https://bible.usccb.org/bible/matthew/7">Matthew 7</a>. “By their fruits you will know them.”',
        },
        {
          type: "p",
          html: "Tear the bark and you wreck next year’s fruit. Drop the apple or dump the basket and you wreck this year’s. Mr. Major could have been that guy. Inspect the produce. That is proof of good work, and you can see it if you know what to look for. The bruise and the internal blemish are the part you only find later.",
        },
        { type: "h2", id: "wizwam", text: `Founder of ${WIZWAM_WORD}` },
        {
          type: "p",
          html: `<a href="https://www.wizwam.com">${WIZWAM_WORD}</a> is the company. Pronounced wiz-wham. “Wiz” as in wizard. “Wham” as in wham. The mark is a pixel hat: blue cloth, a gold band, a navy outline, on ink.`,
        },
        {
          type: "p",
          html: 'It is where the documents, the apps, and the experiments that deserve a real URL live. <a href="https://www.wizwam.com">wizwam.com</a> is the front door.',
        },
        { type: "h2", id: "omarchy", text: "Maker of small tools for Omarchy" },
        {
          type: "p",
          html: 'I run <a href="https://omarchy.org">Omarchy</a> every day. David Heinemeier Hansson made the system. I make the pieces I kept reaching for.',
        },
        {
          type: "p",
          html: '<a href="https://github.com/lukejmorrison/canvasforge">CanvasForge</a> is a native screenshot annotation canvas for Arch, on the AUR. <a href="https://github.com/lukejmorrison/omawin">OmaWin</a> puts Windows-style title bars on floating Hyprland windows, with a scratchpad to minimize into. I wanted a laptop my mom could recognize. <a href="https://github.com/lukejmorrison/omamusic">OmaMusic</a> plays YouTube Music through Quickshell and a local mpv. <a href="https://github.com/lukejmorrison/omanosey">OmaNosey</a> is the idle screensaver that is also a nosey QR honeypot.',
        },
        {
          type: "p",
          html: 'The same desk has <a href="https://github.com/lukejmorrison/omaremote">OmaRemote</a> for RustDesk, TeamViewer, Tailscale, and VNC, <a href="https://github.com/lukejmorrison/omakeytron">OmaKeytron</a> for a Keychron V6 Max, <a href="https://github.com/lukejmorrison/omasync">OmaSync</a> for carrying a folder across a bad network, and <a href="https://github.com/lukejmorrison/omamount">OmaMount</a>, an opinionated way to mount a NAS. There is <a href="https://github.com/lukejmorrison/teamviewerfix">a one-shot TeamViewer fix</a> for Wayland, and <a href="https://github.com/lukejmorrison/lukesomarchythemes">a set of Quattro themes</a>.',
        },
        {
          type: "p",
          html: '<a href="https://chunder.wizwam.com/">Chunder</a> turns VigiAccess adverse-event dumps into something you can search. The name is British slang for spew, because nausea always charts. <a href="https://github.com/lukejmorrison/VoiceDNA">VoiceDNA</a> is a try at recognizable AI voice fingerprinting. <a href="https://github.com/lukejmorrison/code2md">code2md</a> turns source into Markdown so handing a codebase to an agent costs less. <a href="https://tracker.wizwam.com">Tracker</a> is the open tracker.',
        },
        { type: "h2", id: "helpful", text: "Truly helpful, truth-seeking, and fun" },
        {
          type: "p",
          html: 'That is the line on <a href="https://x.com/lukejmorrison">X</a>, and it is the brief. Be useful to a real person. Say the true thing. Have a good time doing it. I get bored of the same take copied across ten accounts.',
        },
        {
          type: "p",
          html: "I work with coding agents all day. The rule I want is ordinary. If a bot is about to do something privileged, it stops and asks, and I approve it with a fingerprint or a face. I built that for my own machines. Helping includes not letting the machine run off with the keys.",
        },
        { type: "h2", id: "pictures", text: "Pictures" },
        {
          type: "figure",
          src: "/images/helmet.jpg",
          alt: "A steel helmet, photographed close. The brow is engraved: Helping is The Omarchy Way.",
          caption: "Helping is the Omarchy way.",
          variant: "portrait",
        },
        {
          type: "figure",
          src: "/images/wizwam-hat.png",
          alt: "The Wizwam hat, a pixel mark in blue with a gold band and a navy outline.",
          caption: `The ${WIZWAM_WORD} mark.`,
          variant: "mark",
        },
      ],
    },
    pages: [],
    links: [],
    footerHtml: 'Luke Morrison · Canada · <a href="https://luke.gratis/">luke.gratis</a>',
    updatedAt: null,
  };
}

export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function decodeBasic(value) {
  let prev = "";
  let cur = String(value ?? "");
  while (cur !== prev) {
    prev = cur;
    cur = cur
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/&quot;/gi, '"')
      .replace(/&#39;|&apos;/gi, "'")
      .replace(/&amp;/gi, "&")
      .replace(/&nbsp;|&#160;|&#x0*a0;/gi, " ")
      .replace(/\u00a0/g, " ");
  }
  return cur;
}

// The editor saves non-breaking spaces as &nbsp;. Once those are escaped they
// show up as the letters "&nbsp;". Chrome's createLink also leaves the first
// selected letter sitting just outside the new anchor.
function tidyEditableHtml(value) {
  let prev = "";
  let cur = String(value ?? "");
  while (cur !== prev) {
    prev = cur;
    cur = cur
      .replace(/&amp;nbsp;|&#160;|&#x0*a0;/gi, " ")
      .replace(/&nbsp;/gi, " ")
      .replace(/\u00a0/g, " ");
  }
  return cur
    .replace(/(^|[\s])(\p{L})(<a\b[^<>]*>)(\p{L})/gu, (_, boundary, letter, open, next) => `${boundary}${open}${letter}${next}`)
    .replace(/[ \t]+(?=<br\b)/g, "");
}

function attrValue(source, name) {
  const match = String(source || "").match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'>]+))`, "i"));
  return match?.slice(1).find((item) => item != null) || "";
}

function safeTitle(raw) {
  return decodeBasic(String(raw || ""))
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 300);
}

function safeHref(raw) {
  const value = String(raw || "").trim();
  if (!value || value.length > 500) return "";
  const compact = value.toLowerCase().replace(/[\u0000-\u0020]+/g, "");
  if (compact.startsWith("javascript:") || compact.startsWith("data:")) return "";
  if (value.startsWith("#") || value.startsWith("/")) {
    if (value.startsWith("//") || value.includes("\\") || value.includes("..")) return "";
    return value;
  }
  try {
    const url = new URL(value);
    if (url.protocol === "http:" || url.protocol === "https:" || url.protocol === "mailto:") return url.href;
  } catch {
    return "";
  }
  return "";
}

function safeSrc(raw) {
  const value = String(raw || "").trim();
  if (!value || value.length > 500 || value.includes("..") || value.includes("\\")) return "";
  if (value.startsWith("/images/") || value.startsWith("/favicon")) return value;
  try {
    const url = new URL(value);
    if (url.protocol === "https:" || url.protocol === "http:") return url.href;
  } catch {
    return "";
  }
  return "";
}

function emitText(chunk, stack) {
  const text = escapeHtml(decodeBasic(chunk));
  if (stack.includes("abbr")) return text;
  const note = escapeHtml(WIZWAM_NOTE);
  return text.replace(/Wizwām|Wizwam/g, `<abbr title="${note}">Wizwam</abbr>`);
}

export function sanitizeInline(input) {
  const src = tidyEditableHtml(String(input ?? "").slice(0, 8000));
  const re = /<\/?([a-zA-Z0-9]+)(\s[^<>]*)?\s*\/?>/g;
  let out = "";
  let last = 0;
  let match;
  const stack = [];
  while ((match = re.exec(src))) {
    out += emitText(src.slice(last, match.index), stack);
    last = match.index + match[0].length;
    const tag = match[1].toLowerCase();
    const closing = match[0].startsWith("</");
    if (tag !== "a" && tag !== "abbr" && tag !== "strong" && tag !== "em" && tag !== "br") continue;
    if (tag === "br") {
      if (!closing) out += "<br>";
      continue;
    }
    if (closing) {
      if (stack.at(-1) === tag) {
        stack.pop();
        out += `</${tag}>`;
      }
      continue;
    }
    if (tag === "abbr") {
      const title = safeTitle(attrValue(match[2] || "", "title"));
      if (!title) continue;
      stack.push("abbr");
      out += `<abbr title="${escapeHtml(title)}">`;
      continue;
    }
    if (tag === "a") {
      const href = safeHref((match[2] || "").match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|(\S+))/i)?.slice(1).find(Boolean) || "");
      if (!href) continue;
      const rel = /\brel\s*=\s*["']me["']/i.test(match[2] || "") ? ' rel="me"' : "";
      stack.push("a");
      out += `<a href="${escapeHtml(href)}"${rel}>`;
      continue;
    }
    stack.push(tag);
    out += `<${tag}>`;
  }
  out += emitText(src.slice(last), stack);
  while (stack.length) out += `</${stack.pop()}>`;
  return out;
}

export function slugify(value) {
  const slug = String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return slug || "page";
}

function plainText(value, max = 200) {
  return decodeBasic(String(value || "").replace(/<[^>]*>/g, ""))
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function cleanId(value, fallback) {
  const id = String(value || fallback || "")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return id;
}

function cleanBlocks(blocks) {
  if (!Array.isArray(blocks)) return [];
  const cleaned = [];
  for (const block of blocks.slice(0, 80)) {
    if (!block || typeof block !== "object") continue;
    if (block.type === "p") {
      cleaned.push({ type: "p", html: sanitizeInline(block.html) });
    } else if (block.type === "h2") {
      const text = sanitizeInline(block.text);
      const label = plainText(text, 160);
      if (!label) continue;
      cleaned.push({ type: "h2", id: cleanId(block.id, slugify(label)), text });
    } else if (block.type === "figure") {
      const src = safeSrc(block.src);
      if (!src) continue;
      const variant = block.variant === "portrait" || block.variant === "mark" ? block.variant : "";
      cleaned.push({
        type: "figure",
        src,
        alt: plainText(block.alt, 300),
        caption: sanitizeInline(block.caption),
        variant,
      });
    }
  }
  return cleaned;
}

export function normalizeSite(input) {
  const base = defaultSite();
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { error: "The site document has to be an object." };
  }
  const theme = THEMES.some((item) => item.id === input.theme) ? input.theme : "ink";
  const title = plainText(input.title, 80) || base.title;
  const description = plainText(input.description, 300) || base.description;
  const headerIn = input.header && typeof input.header === "object" ? input.header : {};
  const name = plainText(headerIn.name, 80) || base.header.name;
  const avatar = safeSrc(headerIn.avatar) || base.header.avatar;
  const introHtml = sanitizeInline(headerIn.introHtml ?? base.header.introHtml);
  const footerHtml = sanitizeInline(input.footerHtml ?? base.footerHtml);
  const homeBlocks = cleanBlocks(input.home?.blocks ?? base.home.blocks);
  if (!homeBlocks.length) return { error: "The homepage needs at least one block." };

  const pages = [];
  const seen = new Set();
  for (const page of Array.isArray(input.pages) ? input.pages.slice(0, 24) : []) {
    if (!page || typeof page !== "object") continue;
    const titleText = plainText(page.title, 80);
    let slug = slugify(page.slug || titleText);
    if (!titleText || RESERVED_SLUGS.has(slug) || slug.includes(".")) continue;
    while (seen.has(slug)) slug = slugify(`${slug}-2`);
    seen.add(slug);
    pages.push({
      slug,
      title: titleText,
      inNav: Boolean(page.inNav),
      blocks: cleanBlocks(page.blocks),
    });
  }

  const links = [];
  for (const link of Array.isArray(input.links) ? input.links.slice(0, 12) : []) {
    if (!link || typeof link !== "object") continue;
    const label = plainText(link.label, 40);
    const href = safeHref(link.href);
    if (!label || !href) continue;
    links.push({ label, href });
  }

  return {
    site: {
      theme,
      title,
      description,
      header: {
        name,
        avatar,
        avatarAlt: plainText(headerIn.avatarAlt, 200) || name,
        introHtml,
      },
      home: { blocks: homeBlocks },
      pages,
      links,
      footerHtml,
      updatedAt: new Date().toISOString(),
    },
  };
}

export function nameHtml(name) {
  return String(name || "Luke Morrison")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => {
      const chars = [...word];
      const first = chars.shift() || "";
      return `<span class="initial">${escapeHtml(first.toUpperCase())}</span>${escapeHtml(chars.join("").toUpperCase())}`;
    })
    .join(" ");
}

function jsonScript(site) {
  return JSON.stringify(site).replace(/</g, "\\u003c");
}

function blockHtml(block, admin) {
  if (block.type === "p") {
    const editable = admin ? ' contenteditable="true"' : "";
    return `<div class="block"><p data-block="p"${editable}>${sanitizeInline(block.html)}</p></div>`;
  }
  if (block.type === "h2") {
    const editable = admin ? ' contenteditable="true"' : "";
    const id = block.id ? ` id="${escapeHtml(block.id)}" data-id="${escapeHtml(block.id)}"` : "";
    return `<div class="block"><h2 data-block="h2"${id}${editable}>${sanitizeInline(block.text)}</h2></div>`;
  }
  const variant = block.variant ? ` class="${escapeHtml(block.variant)}"` : "";
  const fields = admin
    ? `<label class="fig-field">Image address <input data-src value="${escapeHtml(block.src)}"></label><label class="fig-field">Description <input data-alt value="${escapeHtml(block.alt)}"></label>`
    : "";
  const captionEdit = admin ? ' contenteditable="true"' : "";
  return `<div class="block"><figure data-block="figure" data-variant="${escapeHtml(block.variant || "")}"><img${variant} src="${escapeHtml(block.src)}" alt="${escapeHtml(block.alt)}"><figcaption data-caption${captionEdit}>${sanitizeInline(block.caption)}</figcaption>${fields}</figure></div>`;
}

function tools() {
  return `<div class="block-tools" contenteditable="false"><button type="button" data-move="up">Up</button><button type="button" data-move="down">Down</button><button type="button" data-remove>Delete</button></div>`;
}

function withTools(html, admin) {
  if (!admin) return html;
  return html.replace('<div class="block">', `<div class="block">${tools()}`);
}

function navHtml(site) {
  const items = [];
  for (const page of site.pages) {
    if (page.inNav) items.push(`<a href="/${escapeHtml(page.slug)}">${escapeHtml(page.title)}</a>`);
  }
  for (const link of site.links) {
    items.push(`<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`);
  }
  if (!items.length) return "";
  return `<p class="site-links">${items.join("")}</p>`;
}

function shell({ site, admin, title, description, canonical, bodyClass, main }) {
  const theme = THEMES.some((item) => item.id === site.theme) ? site.theme : "ink";
  const themeColor = theme === "ink" ? "#09111A" : "#f7f5f0";
  const bar = admin
    ? `<div class="admin-bar">
        <span class="admin-mark">Editing</span>
        <span class="admin-themes">${THEMES.map((item) => `<button type="button" data-theme="${item.id}"${item.id === theme ? ' aria-pressed="true"' : ""}>${item.label}</button>`).join("")}</span>
        <button type="button" data-new-page>New page</button>
        <a href="/admin">Pages and links</a>
        <button type="button" data-publish>Publish</button>
        <button type="button" data-logout>Log out</button>
        <span class="admin-status" role="status"></span>
      </div>
      <dialog id="new-page-dialog"><form method="dialog"><h2>New page</h2><label>Title <input name="title" required maxlength="80"></label><div class="dialog-actions"><button value="cancel">Cancel</button><button value="ok">Create</button></div></form></dialog>
      <script type="application/json" id="site-data">${jsonScript(site)}</script>
      <script src="/admin.js" defer></script>`
    : "";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="theme-color" content="${themeColor}">
  <link rel="canonical" href="${escapeHtml(canonical)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${escapeHtml(canonical)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:image" content="https://luke.gratis/images/helmet.jpg">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:site" content="@lukejmorrison">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" href="/favicon-32.png" sizes="32x32">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="stylesheet" href="/styles.css">
</head>
<body class="${bodyClass}${admin ? " is-admin" : ""} theme-${theme}">
  ${bar}
  ${main}
</body>
</html>`;
}

export function renderPage(site, pageKey, { admin = false } = {}) {
  const isHome = pageKey === "home";
  const page = isHome ? site.home : site.pages.find((item) => item.slug === pageKey);
  if (!page) return renderNotFound(site);
  const blocks = (page.blocks || []).map((block) => withTools(blockHtml(block, admin), admin)).join("\n");
  const addRow = admin
    ? `<div class="add-row"><button type="button" data-add="p">Paragraph</button><button type="button" data-add="h2">Heading</button><button type="button" data-add="figure">Picture</button>${isHome ? "" : '<button type="button" data-delete-page>Delete page</button>'}</div>`
    : "";
  const intro = admin ? ' contenteditable="true"' : "";
  const nameEdit = admin ? ' contenteditable="true"' : "";
  const footerEdit = admin ? ' contenteditable="true"' : "";
  const title = isHome ? site.title : `${page.title} — ${site.title}`;
  const description = isHome ? site.description : plainText(page.blocks?.find((block) => block.type === "p")?.html || site.description, 300);
  const canonical = isHome ? "https://luke.gratis/" : `https://luke.gratis/${page.slug}`;
  const header = isHome
    ? `<header>
    <a href="${escapeHtml(site.header.avatar)}"><img src="${escapeHtml(site.header.avatar)}" width="128" height="128" class="avatar" alt="${escapeHtml(site.header.avatarAlt)}"></a>
    <h1 data-name${nameEdit}>${nameHtml(site.header.name)}</h1>
    <p class="header" data-intro${intro}>${sanitizeInline(site.header.introHtml)}</p>
    ${navHtml(site)}
  </header>`
    : `<header>
    <a href="/"><img src="${escapeHtml(site.header.avatar)}" width="128" height="128" class="avatar" alt="${escapeHtml(site.header.avatarAlt)}"></a>
    <p class="kicker"><a href="/">${escapeHtml(site.header.name)}</a></p>
    <h1 data-title${nameEdit}>${escapeHtml(page.title)}</h1>
    ${navHtml(site)}
  </header>`;
  const main = `${header}
  <article data-page="${isHome ? "home" : escapeHtml(page.slug)}">
    ${blocks}
    ${addRow}
  </article>
  <footer><p data-footer${footerEdit}>${sanitizeInline(site.footerHtml)}</p></footer>`;
  return shell({
    site,
    admin,
    title,
    description,
    canonical,
    bodyClass: isHome ? "home" : "page",
    main,
  });
}

export function renderNotFound(site) {
  const main = `<header>
    <a href="/"><img src="${escapeHtml(site.header.avatar)}" width="128" height="128" class="avatar" alt="${escapeHtml(site.header.avatarAlt)}"></a>
    <h1>${nameHtml(site.header.name)}</h1>
    <p>Nothing lives at this address.</p>
  </header>
  <article><p>The page you want is probably <a href="/">the front</a>.</p></article>
  <footer><p>${sanitizeInline(site.footerHtml)}</p></footer>`;
  return shell({
    site,
    admin: false,
    title: `Not found — ${site.title}`,
    description: "That page is not on luke.gratis.",
    canonical: "https://luke.gratis/",
    bodyClass: "page",
    main,
  }).replace("<head>", '<head>\n  <meta name="robots" content="noindex">');
}

export function renderAdmin(site, { email = "" } = {}) {
  const pages = site.pages
    .map(
      (page) => `<li data-slug="${escapeHtml(page.slug)}">
        <a href="/${escapeHtml(page.slug)}">${escapeHtml(page.title)}</a>
        <label><input type="checkbox" data-in-nav${page.inNav ? " checked" : ""}> In the link line</label>
        <button type="button" data-delete-slug="${escapeHtml(page.slug)}">Delete</button>
      </li>`,
    )
    .join("");
  const links = site.links
    .map(
      (link) => `<div class="link-row">
        <input data-label value="${escapeHtml(link.label)}" maxlength="40" aria-label="Link label">
        <input data-href value="${escapeHtml(link.href)}" maxlength="500" aria-label="Link address">
        <button type="button" data-remove-link>Remove</button>
      </div>`,
    )
    .join("");
  const themes = THEMES.map(
    (item) => `<label class="theme-choice"><input type="radio" name="theme" value="${item.id}"${site.theme === item.id ? " checked" : ""}> <span>${item.label}</span> ${escapeHtml(item.note)}</label>`,
  ).join("");
  const main = `<header>
    <a href="/"><img src="/images/helmet.jpg" width="128" height="128" class="avatar" alt="Luke Morrison"></a>
    <h1>Admin</h1>
    <p class="header">Signed in as ${escapeHtml(email)}. The public site does not show any of this.</p>
  </header>
  <article class="admin-desk" data-admin="desk">
    <p><a href="/">Edit the homepage on the page</a>. Words, headings, and pictures save when you press Publish.</p>
    <h2>Theme</h2>
    <fieldset class="themes">${themes}</fieldset>
    <h2>Description</h2>
    <p class="hint">The one-line summary search engines and link previews use.</p>
    <textarea id="site-description" maxlength="300">${escapeHtml(site.description)}</textarea>
    <h2>Footer</h2>
    <textarea id="site-footer" maxlength="500">${escapeHtml(site.footerHtml)}</textarea>
    <h2>Extra links</h2>
    <p class="hint">These sit in a quiet line under the introduction. Leave this empty and the homepage stays as it is.</p>
    <div id="link-list">${links}</div>
    <button type="button" id="add-link">Add a link</button>
    <h2>Pages</h2>
    <ul id="page-list">${pages || "<li class=\"empty\">No extra pages yet.</li>"}</ul>
    <form id="create-page">
      <label>New page title <input name="title" required maxlength="80"></label>
      <button type="submit">Create page</button>
    </form>
    <p class="publish-row"><button type="button" id="publish-desk">Publish</button> <span class="admin-status" role="status"></span></p>
    <p><button type="button" id="logout">Log out</button></p>
  </article>
  <script type="application/json" id="site-data">${jsonScript(site)}</script>
  <script src="/admin.js" defer></script>`;
  return shell({
    site,
    admin: false,
    title: "Admin — Luke Morrison",
    description: "Private editor for luke.gratis.",
    canonical: "https://luke.gratis/admin",
    bodyClass: "page admin-screen",
    main,
  }).replace("<head>", '<head>\n  <meta name="robots" content="noindex">');
}

export function renderLogin() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <title>Admin — Luke Morrison</title>
  <meta name="robots" content="noindex">
  <meta name="theme-color" content="#09111A">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="stylesheet" href="/styles.css">
</head>
<body class="admin-login theme-ink">
  <main class="login-card">
    <img src="/images/helmet.jpg" width="96" height="96" class="avatar" alt="">
    <h1>Admin</h1>
    <p>You know what to do</p>
    <form id="login-form" autocomplete="on">
      <label for="email">Email
        <input id="email" name="email" type="email" autocomplete="username" required>
      </label>
      <label for="password">Password
        <input id="password" name="password" type="password" autocomplete="current-password" required>
      </label>
      <label for="totp">Two-factor code
        <input id="totp" name="totp" type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="6">
      </label>
      <p class="msg" id="login-msg" role="status"></p>
      <button type="submit">Sign in</button>
    </form>
  </main>
  <script src="/admin.js" defer></script>
</body>
</html>`;
}
