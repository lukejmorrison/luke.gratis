import assert from "node:assert/strict";
import test from "node:test";
import { readSession, signSession } from "./auth.js";
import { defaultSite, normalizeSite, renderLogin, renderPage, sanitizeInline } from "./site.js";

test("public homepage keeps the story and hides the editor", () => {
  const html = renderPage(defaultSite(), "home");
  assert.match(html, /Mr\. Major/);
  assert.match(html, /fire your ass/);
  assert.match(html, /href="https:\/\/github.com\/lukejmorrison\/canvasforge"/);
  assert.match(html, /rel="me"/);
  assert.match(html, /<span class="initial">L<\/span>UKE/);
  assert.doesNotMatch(html, /contenteditable/);
  assert.doesNotMatch(html, /admin-bar/);
  assert.doesNotMatch(html, /<script/);
});

test("admin render is editable and still has the story", () => {
  const html = renderPage(defaultSite(), "home", { admin: true });
  assert.match(html, /contenteditable="true"/);
  assert.match(html, /data-publish/);
  assert.match(html, /Mr\. Major/);
});

test("inline html keeps links and drops scripts", () => {
  const clean = sanitizeInline('Hello <a href="https://luke.gratis/">there</a> <script>alert(1)</script> <a href="javascript:alert(1)">no</a>');
  assert.match(clean, /href="https:\/\/luke\.gratis\/"/);
  assert.doesNotMatch(clean, /script/);
  assert.doesNotMatch(clean, /javascript/);
  assert.equal(sanitizeInline(clean), clean);
});

test("a saved site round-trips without losing a paragraph", () => {
  const site = defaultSite();
  site.theme = "paper";
  site.pages = [{ slug: "Notes!", title: "Field Notes", inNav: true, blocks: [{ type: "p", html: "A & B <b onclick=\"x\">kept</b>" }] }];
  site.links = [{ label: "X", href: "https://x.com/lukejmorrison" }, { label: "bad", href: "javascript:alert(1)" }];
  const saved = normalizeSite(site).site;
  assert.equal(saved.theme, "paper");
  assert.equal(saved.pages[0].slug, "notes");
  assert.match(saved.pages[0].blocks[0].html, /A &amp; B/);
  assert.doesNotMatch(saved.pages[0].blocks[0].html, /onclick/);
  assert.equal(saved.links.length, 1);
  const again = normalizeSite(saved).site;
  assert.equal(again.pages[0].blocks[0].html, saved.pages[0].blocks[0].html);
});

test("published intro keeps spaces and whole linked words", () => {
  const broken = 'I\'m a naturally born Canadian&amp;nbsp;<a href="https://luke.gratis/#canada">🇨🇦</a>&amp;nbsp;with British, Welsh, Norse and Scottish roots<br><br>🦎 A p<a href="#inspector">rofessional fruit inspector</a>&amp;nbsp;🖖&amp;nbsp;The f<a href="#wizwam">ounder of Wizwam</a>&amp;nbsp;💌&amp;nbsp;M<a href="#omarchy">aker of tools for Omarchy</a>&amp;nbsp;🦦&amp;nbsp;<br><br>🦝&amp;nbsp;🦝&amp;nbsp;🦝 Self professed AI enthusiast. User of 🦞n 🤖 and water of 🚂&amp;nbsp;<br><br>I aspire to be <a href="#helpful">truly helpful, truth-seeking, and fun</a>!';
  const fixed = sanitizeInline(broken);
  assert.equal(fixed, 'I\'m a naturally born Canadian <a href="https://luke.gratis/#canada">🇨🇦</a> with British, Welsh, Norse and Scottish roots<br><br>🦎 A <a href="#inspector">professional fruit inspector</a> 🖖 The <a href="#wizwam">founder of Wizwam</a> 💌 <a href="#omarchy">Maker of tools for Omarchy</a> 🦦<br><br>🦝 🦝 🦝 Self professed AI enthusiast. User of 🦞n 🤖 and water of 🚂<br><br>I aspire to be <a href="#helpful">truly helpful, truth-seeking, and fun</a>!');
  assert.equal(sanitizeInline(fixed), fixed);
  assert.equal(sanitizeInline('See <a href="#x">more</a>'), 'See <a href="#x">more</a>');
  assert.doesNotMatch(fixed, /nbsp/);
});

test("the password box is not grouped with the two-factor label", () => {
  const html = renderLogin();
  assert.match(html, /autocomplete="on"/);
  assert.match(html, /<label for="password">Password\s*<input id="password" name="password" type="password" autocomplete="current-password"/);
  assert.match(html, /<label for="totp">Two-factor code\s*<input id="totp" name="totp" type="text"/);
  assert.doesNotMatch(html, /id="password"[^>]*>\s*<label for="totp"/);
});

test("session cookie round-trips only before it expires", async () => {
  const secret = "test-secret-test-secret-test-secret";
  const token = await signSession(secret, "luke@wizwam.com", 60);
  const session = await readSession(secret, token);
  assert.equal(session.email, "luke@wizwam.com");
  assert.equal(await readSession("other-secret-other-secret-other", token), null);
  assert.equal(await readSession(secret, `${token}x`), null);
});
