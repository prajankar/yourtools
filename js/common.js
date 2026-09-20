(function () {
  const BASE = document.documentElement.getAttribute("data-base") || "";
  const HEADER_FALLBACK = `
    <header class="site-header">
      <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container py-1">
          <a class="brand" href="${BASE}index.html">
            <span class="brand-mark">Ω</span>
            OnlineTools
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMain" aria-controls="navMain" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navMain">
            <ul class="navbar-nav ms-lg-4 me-auto mb-2 mb-lg-0">
              <li class="nav-item"><a class="nav-link" href="${BASE}index.html">Home</a></li>
              <li class="nav-item"><a class="nav-link" href="${BASE}index.html#image">Image</a></li>
              <li class="nav-item"><a class="nav-link" href="${BASE}index.html#seo">SEO</a></li>
              <li class="nav-item"><a class="nav-link" href="${BASE}index.html#text">Text</a></li>
              <li class="nav-item"><a class="nav-link" href="${BASE}index.html#developer">Developer</a></li>
              <li class="nav-item"><a class="nav-link" href="${BASE}index.html#calculators">Calculators</a></li>
              <li class="nav-item"><a class="nav-link" href="${BASE}index.html#converters">Converters</a></li>
            </ul>
            <form class="search-wrap d-flex" role="search" id="header-search" action="${BASE}index.html">
              <input class="form-control" type="search" name="q" placeholder="Search 100+ tools" aria-label="Search tools">
            </form>
          </div>
        </div>
      </nav>
    </header>`;

  const FOOTER_FALLBACK = `
    <footer class="site-footer">
      <div class="container">
        <div class="ad-slot mb-4">Ad space — footer banner (AdSense)</div>
        <div class="row g-4">
          <div class="col-md-4">
            <h2>OnlineTools</h2>
            <p class="mb-2">A fast, private toolkit that runs in your browser. Most tools never upload your files.</p>
            <p class="small mb-0">Contact: hello@OnlineTools.local</p>
          </div>
          <div class="col-md-4">
            <h3>Explore</h3>
            <a href="${BASE}index.html#image">Image tools</a><br>
            <a href="${BASE}index.html#seo">SEO tools</a><br>
            <a href="${BASE}index.html#developer">Developer tools</a><br>
            <a href="${BASE}index.html#security">Security tools</a>
          </div>
          <div class="col-md-4">
            <h3>Legal</h3>
            <a href="${BASE}privacy-policy.html">Privacy policy</a><br>
            <a href="${BASE}disclaimer.html">Disclaimer</a><br>
            <a href="${BASE}about-us.html">About us</a><br>
            <a href="${BASE}terms-and-conditions.html">Terms and condition</a><br>
            <a href="${BASE}contact-us.html">Contact us</a>
          </div>
        </div>
        <hr class="border-secondary my-4">
        <p class="small mb-0">&copy; <span id="year"></span> OnlineTools. All rights reserved. Ads are placeholders until you add your publisher ID.</p>
      </div>
    </footer>`;

  async function inject(id, file) {
    const host = document.getElementById(id);
    if (!host) return;
    try {
      const res = await fetch(BASE + "partials/" + file);
      if (!res.ok) throw new Error("Fetch failed");
      let html = await res.text();
      html = html.replaceAll("__BASE__", BASE);
      host.outerHTML = html;
    } catch (err) {
      if (file === "header.html") {
        host.outerHTML = HEADER_FALLBACK;
      } else if (file === "footer.html") {
        host.outerHTML = FOOTER_FALLBACK;
      } else {
        host.innerHTML = "";
      }
    }
    const y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  function toolUrl(slug) {
    return BASE + "tools/" + slug + ".html";
  }

  function card(t) {
    return `<div class="col-sm-6 col-lg-4 col-xl-3 tool-item" data-name="${t.name.toLowerCase()}" data-desc="${t.desc.toLowerCase()}" data-cat="${t.cat}">
      <article class="card">
        <div class="card-body">
          <div class="tool-ico">${t.icon}</div>
          <h3><a class="stretched-link" href="${toolUrl(t.slug)}">${t.name}</a></h3>
          <p>${t.desc}</p>
        </div>
      </article>
    </div>`;
  }

  function renderHome(filter) {
    const root = document.getElementById("home-tools");
    if (!root || !window.TOOLS) return;
    const q = (filter || "").trim().toLowerCase();
    const html = window.CATEGORIES.map((cat) => {
      const items = window.TOOLS.filter((t) => t.cat === cat.id && (!q || t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q) || t.slug.includes(q)));
      if (!items.length) return "";
      return `<section id="${cat.id}" class="mb-4">
        <h2 class="section-title">${cat.title} <span class="count">${items.length}</span></h2>
        <div class="row g-3 tool-grid">${items.map(card).join("")}</div>
      </section>`;
    }).join("");
    root.innerHTML = html || `<p class="lead">No tools match “${filter}”.</p>`;
  }

  function related(slug) {
    const box = document.getElementById("related-tools");
    if (!box || !window.TOOLS) return;
    const current = window.TOOLS.find((t) => t.slug === slug);
    if (!current) return;
    const list = window.TOOLS.filter((t) => t.cat === current.cat && t.slug !== slug).slice(0, 8);
    box.innerHTML = list.map((t) => `<a href="${t.slug}.html">${t.icon} ${t.name}</a>`).join("");
  }

  window.OmniPage = { renderHome, related, toolUrl, BASE };

  document.addEventListener("DOMContentLoaded", async () => {
    await inject("site-header", "header.html");
    await inject("site-footer", "footer.html");
    const params = new URLSearchParams(location.search);
    const q = params.get("q") || "";
    const headerForm = document.getElementById("header-search");
    if (headerForm) {
      const input = headerForm.querySelector("input");
      if (q && input) input.value = q;
      if (document.getElementById("home-tools")) {
        headerForm.addEventListener("submit", (e) => {
          e.preventDefault();
          renderHome(input.value);
          history.replaceState(null, "", "?q=" + encodeURIComponent(input.value));
        });
        input.addEventListener("input", () => renderHome(input.value));
      }
    }
    const homeSearch = document.getElementById("home-search");
    if (homeSearch) {
      homeSearch.value = q;
      homeSearch.addEventListener("input", () => renderHome(homeSearch.value));
    }
    if (document.getElementById("home-tools")) renderHome(q);
    const slug = document.documentElement.getAttribute("data-tool");
    if (slug) related(slug);
  });
})();
