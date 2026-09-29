const statusNode = () => document.querySelector(".admin-status");

function readSite() {
  const node = document.getElementById("site-data");
  return node ? JSON.parse(node.textContent) : null;
}

function setStatus(message, isError) {
  const node = statusNode();
  if (!node) return;
  node.textContent = message;
  node.classList.toggle("is-error", Boolean(isError));
}

async function publish(site) {
  const response = await fetch("/api/admin/site", {
    method: "PUT",
    headers: { "content-type": "application/json", "x-luke-admin": "1" },
    body: JSON.stringify({ site }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Publish failed.");
  return data.site;
}

async function logout() {
  await fetch("/api/admin/logout", { method: "POST" });
  location.href = "/admin";
}

function wireLogin() {
  const form = document.getElementById("login-form");
  if (!form) return;
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = document.getElementById("login-msg");
    message.textContent = "Checking with Wizwam…";
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: form.email.value,
        password: form.password.value,
        twoFactorCode: form.totp.value,
      }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      message.textContent = data.error || "Sign-in failed.";
      if (data.requiresTwoFactor) form.totp.focus();
      return;
    }
    location.href = "/";
  });
}

function blockTemplate(kind) {
  const tools = `<div class="block-tools" contenteditable="false"><button type="button" data-move="up">Up</button><button type="button" data-move="down">Down</button><button type="button" data-remove>Remove</button></div>`;
  if (kind === "h2") return `<div class="block">${tools}<h2 data-block="h2" contenteditable="true">New heading</h2></div>`;
  if (kind === "figure") {
    return `<div class="block">${tools}<figure data-block="figure" data-variant=""><img src="/images/helmet.jpg" alt=""><figcaption data-caption contenteditable="true">Caption</figcaption><label class="fig-field">Image address <input data-src value="/images/helmet.jpg"></label><label class="fig-field">Description <input data-alt value=""></label></figure></div>`;
  }
  return `<div class="block">${tools}<p data-block="p" contenteditable="true"></p></div>`;
}

function rememberSelection() {
  const selection = getSelection();
  if (!selection?.rangeCount) return;
  const node = selection.anchorNode;
  if (node?.parentElement?.closest("[contenteditable='true']")) {
    document.__savedRange = selection.getRangeAt(0).cloneRange();
  }
}

function collectPage(site) {
  const article = document.querySelector("article[data-page]");
  if (!article) return site;
  const blocks = [...article.querySelectorAll("[data-block]")].map((element) => {
    if (element.dataset.block === "p") return { type: "p", html: element.innerHTML };
    if (element.dataset.block === "h2") return { type: "h2", id: element.dataset.id || "", text: element.innerText };
    return {
      type: "figure",
      src: element.querySelector("[data-src]")?.value || element.querySelector("img")?.getAttribute("src") || "",
      alt: element.querySelector("[data-alt]")?.value || "",
      caption: element.querySelector("[data-caption]")?.innerText || "",
      variant: element.dataset.variant || "",
    };
  });
  if (article.dataset.page === "home") {
    site.home.blocks = blocks;
    const name = document.querySelector("[data-name]");
    const intro = document.querySelector("[data-intro]");
    if (name) site.header.name = name.innerText;
    if (intro) site.header.introHtml = intro.innerHTML;
  } else {
    const page = site.pages.find((item) => item.slug === article.dataset.page);
    if (page) {
      page.blocks = blocks;
      const title = document.querySelector("[data-title]");
      if (title) page.title = title.innerText;
    }
  }
  const footer = document.querySelector("[data-footer]");
  if (footer) site.footerHtml = footer.innerHTML;
  return site;
}

function wireEditor() {
  if (!document.body.classList.contains("is-admin")) return;
  const site = readSite();
  let dirty = false;
  const mark = () => {
    dirty = true;
    setStatus("Unpublished changes");
  };
  document.addEventListener("selectionchange", rememberSelection);
  document.addEventListener("input", (event) => {
    if (event.target.closest("[contenteditable='true'], .fig-field")) mark();
    const src = event.target.closest("[data-src]");
    if (src) {
      const image = src.closest("figure")?.querySelector("img");
      if (image) image.src = src.value;
    }
  });
  window.addEventListener("beforeunload", (event) => {
    if (!dirty) return;
    event.preventDefault();
    event.returnValue = "";
  });

  document.querySelector(".admin-bar")?.addEventListener("click", async (event) => {
    const theme = event.target.closest("[data-theme]")?.dataset.theme;
    if (theme) {
      site.theme = theme;
      document.body.className = document.body.className.replace(/theme-\w+/, `theme-${theme}`);
      try {
        await publish(collectPage(site));
        dirty = false;
        location.reload();
      } catch (error) {
        setStatus(error.message, true);
      }
      return;
    }
    if (event.target.closest("[data-publish]")) {
      try {
        setStatus("Publishing…");
        await publish(collectPage(site));
        dirty = false;
        location.reload();
      } catch (error) {
        setStatus(error.message, true);
      }
      return;
    }
    if (event.target.closest("[data-logout]")) {
      dirty = false;
      logout();
      return;
    }
    if (event.target.closest("[data-new-page]")) document.getElementById("new-page-dialog")?.showModal();
    if (event.target.closest("[data-link]")) openLinkDialog();
  });

  document.getElementById("new-page-dialog")?.addEventListener("close", async () => {
    const dialog = document.getElementById("new-page-dialog");
    if (dialog.returnValue !== "ok") return;
    const title = dialog.querySelector("input[name=title]").value.trim();
    if (!title) return;
    site.pages.push({ slug: "", title, inNav: true, blocks: [{ type: "p", html: "Start writing." }] });
    try {
      const saved = await publish(collectPage(site));
      dirty = false;
      const created = saved.pages.at(-1);
      location.href = created ? `/${created.slug}` : "/admin";
    } catch (error) {
      setStatus(error.message, true);
    }
  });

  document.querySelector("article")?.addEventListener("click", (event) => {
    const block = event.target.closest(".block");
    if (event.target.closest("[data-remove]") && block) {
      block.remove();
      mark();
    }
    const direction = event.target.closest("[data-move]")?.dataset.move;
    if (direction && block) {
      const sibling = direction === "up" ? block.previousElementSibling : block.nextElementSibling;
      if (sibling?.classList.contains("block")) {
        block.parentElement.insertBefore(block, direction === "up" ? sibling : sibling.nextElementSibling);
        mark();
      }
    }
    const kind = event.target.closest("[data-add]")?.dataset.add;
    if (kind) {
      const row = document.querySelector(".add-row");
      row.insertAdjacentHTML("beforebegin", blockTemplate(kind));
      mark();
    }
    if (event.target.closest("[data-delete-page]")) {
      const slug = document.querySelector("article")?.dataset.page;
      site.pages = site.pages.filter((page) => page.slug !== slug);
      publish(site).then(() => {
        dirty = false;
        location.href = "/";
      }).catch((error) => setStatus(error.message, true));
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || event.shiftKey) return;
    const editable = event.target.closest("p[contenteditable='true'], figcaption[contenteditable='true'], [data-intro], [data-footer]");
    if (!editable) return;
    event.preventDefault();
    document.execCommand("insertLineBreak");
  });

  const linkDialog = document.createElement("dialog");
  linkDialog.id = "link-dialog";
  linkDialog.innerHTML = `<form method="dialog"><h2>Link the selected words</h2><label>Address <input name="href" required placeholder="https://"></label><div class="dialog-actions"><button value="cancel">Cancel</button><button value="ok">Add link</button></div></form>`;
  document.body.append(linkDialog);
  const linkButton = document.createElement("button");
  linkButton.type = "button";
  linkButton.dataset.link = "1";
  linkButton.textContent = "Link";
  document.querySelector("[data-publish]")?.before(linkButton);

  function openLinkDialog() {
    linkDialog.showModal();
  }
  linkDialog.addEventListener("close", () => {
    if (linkDialog.returnValue !== "ok" || !document.__savedRange) return;
    const href = linkDialog.querySelector("input").value.trim();
    const selection = getSelection();
    selection.removeAllRanges();
    selection.addRange(document.__savedRange);
    document.execCommand("createLink", false, href);
    mark();
  });
}

function wireDesk() {
  const desk = document.querySelector("[data-admin='desk']");
  if (!desk) return;
  const site = readSite();
  document.getElementById("add-link")?.addEventListener("click", () => {
    const row = document.createElement("div");
    row.className = "link-row";
    row.innerHTML = `<input data-label maxlength="40" aria-label="Link label" placeholder="Label"><input data-href maxlength="500" aria-label="Link address" placeholder="https://"><button type="button" data-remove-link>Remove</button>`;
    document.getElementById("link-list").append(row);
  });
  desk.addEventListener("click", (event) => {
    if (event.target.closest("[data-remove-link]")) event.target.closest(".link-row")?.remove();
    const slug = event.target.closest("[data-delete-slug]")?.dataset.deleteSlug;
    if (slug) {
      site.pages = site.pages.filter((page) => page.slug !== slug);
      event.target.closest("li")?.remove();
    }
    if (event.target.id === "logout") logout();
  });
  document.getElementById("create-page")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = new FormData(event.target).get("title").toString().trim();
    if (!title) return;
    site.pages.push({ slug: "", title, inNav: true, blocks: [{ type: "p", html: "Start writing." }] });
    try {
      setStatus("Creating…");
      const saved = await publish(collectDesk(site));
      const created = saved.pages.at(-1);
      location.href = created ? `/${created.slug}` : "/admin";
    } catch (error) {
      setStatus(error.message, true);
    }
  });
  document.getElementById("publish-desk")?.addEventListener("click", async () => {
    try {
      setStatus("Publishing…");
      await publish(collectDesk(site));
      location.reload();
    } catch (error) {
      setStatus(error.message, true);
    }
  });

  function collectDesk(current) {
    current.theme = desk.querySelector("input[name=theme]:checked")?.value || current.theme;
    current.description = document.getElementById("site-description").value;
    current.footerHtml = document.getElementById("site-footer").value;
    current.links = [...desk.querySelectorAll(".link-row")].map((row) => ({
      label: row.querySelector("[data-label]").value,
      href: row.querySelector("[data-href]").value,
    }));
    for (const item of desk.querySelectorAll("[data-slug]")) {
      const page = current.pages.find((entry) => entry.slug === item.dataset.slug);
      if (page) page.inNav = item.querySelector("[data-in-nav]").checked;
    }
    return current;
  }
}

wireLogin();
wireEditor();
wireDesk();
