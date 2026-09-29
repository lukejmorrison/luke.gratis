const encoder = new TextEncoder();

function bytesToBinary(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return binary;
}

function binaryToBytes(binary) {
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export function base64UrlEncode(bytes) {
  return btoa(bytesToBinary(bytes)).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/g, "");
}

export function base64UrlDecode(value) {
  const normalized = String(value).replaceAll("-", "+").replaceAll("_", "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  return binaryToBytes(atob(padded));
}

async function hmac(secret, data) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(data)));
}

function timingSafeEqual(left, right) {
  if (left.length !== right.length) return false;
  let mismatch = 0;
  for (let i = 0; i < left.length; i += 1) mismatch |= left[i] ^ right[i];
  return mismatch === 0;
}

export async function signSession(secret, email, ttlSeconds) {
  const payload = base64UrlEncode(encoder.encode(JSON.stringify({
    email,
    exp: Math.floor(Date.now() / 1000) + ttlSeconds,
  })));
  const signature = base64UrlEncode(await hmac(secret, payload));
  return `${payload}.${signature}`;
}

export async function readSession(secret, token) {
  if (!secret || !token || !token.includes(".")) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = await hmac(secret, payload);
  let actual;
  try {
    actual = base64UrlDecode(signature);
  } catch {
    return null;
  }
  if (!timingSafeEqual(expected, actual)) return null;
  try {
    const data = JSON.parse(new TextDecoder().decode(base64UrlDecode(payload)));
    if (!data?.email || Number(data.exp) < Math.floor(Date.now() / 1000)) return null;
    return data;
  } catch {
    return null;
  }
}

export function sessionCookie(token, maxAge) {
  const parts = [
    `luke_admin=${token}`,
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    "Path=/",
    `Max-Age=${maxAge}`,
  ];
  return parts.join("; ");
}

export function clearCookie() {
  return "luke_admin=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0";
}

export function cookieValue(header, name) {
  const cookies = String(header || "").split(";").map((part) => part.trim());
  const prefix = `${name}=`;
  const found = cookies.find((part) => part.startsWith(prefix));
  return found ? found.slice(prefix.length) : "";
}
