window.Kits = {
  boot(fn) {
    document.addEventListener("DOMContentLoaded", fn);
  },

  imageConvert(mime, ext, label) {
    Omni.setHTML(`
      ${Omni.dropzone("file")}
      ${mime === "image/jpeg" ? Omni.field("Quality", `<input id="q" type="range" min="0.4" max="1" step="0.05" value="0.86" class="form-range"><div id="qv">86%</div>`) : ""}
      <img id="prev" class="preview-img mb-3 d-none" alt="Preview">
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Download ${label}</button>`)}
    `);
    const file = document.getElementById("file");
    const q = document.getElementById("q");
    if (q) q.addEventListener("input", () => (document.getElementById("qv").textContent = Math.round(q.value * 100) + "%"));
    document.getElementById("go").onclick = async () => {
      if (!file.files[0]) return alert("Choose an image first.");
      const img = await Omni.loadImage(file.files[0]);
      const c = Omni.drawImage(img, img.naturalWidth, img.naturalHeight);
      document.getElementById("prev").src = c.toDataURL(mime, q ? +q.value : undefined);
      document.getElementById("prev").classList.remove("d-none");
      const blob = await Omni.canvasBlob(c, mime, q ? +q.value : undefined);
      Omni.download("converted." + ext, blob);
    };
  },

  imageResizer() {
    Omni.setHTML(`${Omni.dropzone("file")}
      <div class="row">
        <div class="col">${Omni.field("Width", `<input id="w" class="form-control" type="number">`)}</div>
        <div class="col">${Omni.field("Height", `<input id="h" class="form-control" type="number">`)}</div>
      </div>
      <div class="form-check mb-3"><input class="form-check-input" type="checkbox" id="lock" checked><label class="form-check-label" for="lock">Keep aspect ratio</label></div>
      <img id="prev" class="preview-img mb-3 d-none" alt="Preview">
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Download PNG</button>`)}`);
    let img, ratio = 1;
    document.getElementById("file").onchange = async (e) => {
      img = await Omni.loadImage(e.target.files[0]);
      ratio = img.naturalWidth / img.naturalHeight;
      document.getElementById("w").value = img.naturalWidth;
      document.getElementById("h").value = img.naturalHeight;
    };
    document.getElementById("w").oninput = () => {
      if (document.getElementById("lock").checked) document.getElementById("h").value = Math.round(document.getElementById("w").value / ratio);
    };
    document.getElementById("go").onclick = async () => {
      if (!img) return alert("Choose an image.");
      const c = Omni.drawImage(img, +document.getElementById("w").value, +document.getElementById("h").value);
      document.getElementById("prev").src = c.toDataURL();
      document.getElementById("prev").classList.remove("d-none");
      Omni.download("resized.png", await Omni.canvasBlob(c, "image/png"));
    };
  },

  imageCompressor() {
    Omni.setHTML(`${Omni.dropzone("file")}
      ${Omni.field("Max width", `<input id="mw" class="form-control" type="number" value="1280">`)}
      ${Omni.field("JPEG quality", `<input id="q" type="range" min="0.3" max="0.95" step="0.05" value="0.7" class="form-range">`)}
      <p id="info" class="small text-muted"></p>
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Compress & download</button>`)}`);
    document.getElementById("go").onclick = async () => {
      const f = document.getElementById("file").files[0];
      if (!f) return alert("Choose an image.");
      const img = await Omni.loadImage(f);
      const max = +document.getElementById("mw").value || 1280;
      const scale = Math.min(1, max / img.naturalWidth);
      const c = Omni.drawImage(img, Math.round(img.naturalWidth * scale), Math.round(img.naturalHeight * scale));
      const blob = await Omni.canvasBlob(c, "image/jpeg", +document.getElementById("q").value);
      document.getElementById("info").textContent = `Original ${(f.size / 1024).toFixed(1)} KB → ${(blob.size / 1024).toFixed(1)} KB`;
      Omni.download("compressed.jpg", blob);
    };
  },

  imageCropper() {
    Omni.setHTML(`${Omni.dropzone("file")}
      <canvas id="cv" class="preview-canvas mb-3 d-none"></canvas>
      <div class="row">
        <div class="col">${Omni.field("X", `<input id="x" class="form-control" type="number" value="0">`)}</div>
        <div class="col">${Omni.field("Y", `<input id="y" class="form-control" type="number" value="0">`)}</div>
        <div class="col">${Omni.field("W", `<input id="w" class="form-control" type="number" value="200">`)}</div>
        <div class="col">${Omni.field("H", `<input id="h" class="form-control" type="number" value="200">`)}</div>
      </div>
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Crop PNG</button>`)}`);
    let img;
    document.getElementById("file").onchange = async (e) => {
      img = await Omni.loadImage(e.target.files[0]);
      const cv = document.getElementById("cv");
      cv.width = img.naturalWidth;
      cv.height = img.naturalHeight;
      cv.getContext("2d").drawImage(img, 0, 0);
      cv.classList.remove("d-none");
      document.getElementById("w").value = img.naturalWidth;
      document.getElementById("h").value = img.naturalHeight;
    };
    document.getElementById("go").onclick = async () => {
      if (!img) return alert("Choose an image.");
      const x = +document.getElementById("x").value, y = +document.getElementById("y").value;
      const w = +document.getElementById("w").value, h = +document.getElementById("h").value;
      const c = document.createElement("canvas");
      c.width = w; c.height = h;
      c.getContext("2d").drawImage(img, x, y, w, h, 0, 0, w, h);
      Omni.download("crop.png", await Omni.canvasBlob(c, "image/png"));
    };
  },

  imageBase64() {
    Omni.setHTML(`${Omni.dropzone("file")}${Omni.btnRow(`<button class="btn btn-teal" id="go">Convert</button><button class="btn btn-outline-dark" id="cp">Copy</button>`)}<textarea id="out" class="form-control" rows="8"></textarea>`);
    document.getElementById("go").onclick = () => {
      const f = document.getElementById("file").files[0];
      if (!f) return alert("Choose an image.");
      const r = new FileReader();
      r.onload = () => (document.getElementById("out").value = r.result);
      r.readAsDataURL(f);
    };
    Omni.bindCopy(document.getElementById("cp"), () => document.getElementById("out").value);
  },

  gifMaker() {
    Omni.setHTML(`${Omni.note("Add 2–12 still frames. They are scaled to the first frame’s size.")}
      <input id="file" class="form-control mb-3" type="file" accept="image/*" multiple>
      ${Omni.field("Delay (ms)", `<input id="delay" class="form-control" type="number" value="400">`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Build GIF</button>`)}`);
    document.getElementById("go").onclick = async () => {
      const files = [...document.getElementById("file").files];
      if (files.length < 2) return alert("Pick at least two images.");
      const imgs = [];
      for (const f of files) imgs.push(await Omni.loadImage(f));
      const w = imgs[0].naturalWidth, h = imgs[0].naturalHeight;
      const frames = imgs.map((im) => Omni.drawImage(im, w, h));
      const delay = Math.max(2, Math.round((+document.getElementById("delay").value || 400) / 10));
      Omni.download("animation.gif", OmniGif.encode(frames, delay));
    };
  },

  qrCode() {
    Omni.setHTML(`${Omni.field("Text or URL", `<textarea id="t" class="form-control" rows="3">https://example.com</textarea>`)}
      ${Omni.field("Size", `<input id="s" class="form-control" type="number" value="240">`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Generate</button>`)}
      <img id="qr" class="preview-img" alt="QR code">`);
    const run = () => {
      const size = +document.getElementById("s").value || 240;
      const data = encodeURIComponent(document.getElementById("t").value);
      document.getElementById("qr").src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${data}`;
    };
    document.getElementById("go").onclick = run;
    run();
  },

  screenshotPdf() {
    Omni.setHTML(`${Omni.note("Images are embedded as JPEG pages. Nothing is uploaded.")}
      <input id="file" class="form-control mb-3" type="file" accept="image/*" multiple>
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Download PDF</button>`)}`);
    document.getElementById("go").onclick = async () => {
      const files = [...document.getElementById("file").files];
      if (!files.length) return alert("Add screenshots.");
      const canvases = [];
      for (const f of files) {
        const img = await Omni.loadImage(f);
        canvases.push(Omni.drawImage(img, img.naturalWidth, img.naturalHeight));
      }
      Omni.download("screenshots.pdf", OmniPdf.fromCanvases(canvases));
    };
  },

  metaTags() {
    Omni.setHTML(`
      ${Omni.field("Title", `<input id="title" class="form-control" maxlength="70">`)}
      ${Omni.field("Description", `<textarea id="desc" class="form-control" rows="2" maxlength="160"></textarea>`)}
      ${Omni.field("Keywords", `<input id="keys" class="form-control">`)}
      ${Omni.field("Canonical URL", `<input id="url" class="form-control" placeholder="https://">`)}
      ${Omni.field("OG image URL", `<input id="og" class="form-control">`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Generate</button><button class="btn btn-outline-dark" id="cp">Copy</button>`)}
      <pre class="output" id="out"></pre>`);
    document.getElementById("go").onclick = () => {
      const t = document.getElementById("title").value;
      const d = document.getElementById("desc").value;
      const k = document.getElementById("keys").value;
      const u = document.getElementById("url").value;
      const og = document.getElementById("og").value;
      document.getElementById("out").textContent = `<!-- Primary -->
<title>${t}</title>
<meta name="description" content="${d}">
<meta name="keywords" content="${k}">
<link rel="canonical" href="${u}">
<!-- Open Graph -->
<meta property="og:title" content="${t}">
<meta property="og:description" content="${d}">
<meta property="og:url" content="${u}">
<meta property="og:image" content="${og}">
<meta property="og:type" content="website">
<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${t}">
<meta name="twitter:description" content="${d}">
<meta name="twitter:image" content="${og}">`;
    };
    Omni.bindCopy(document.getElementById("cp"), () => document.getElementById("out").textContent);
  },

  keywordDensity() {
    Omni.setHTML(`${Omni.field("Text", `<textarea id="t" class="form-control" rows="8"></textarea>`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Analyze</button>`)}<div id="out"></div>`);
    document.getElementById("go").onclick = () => {
      const words = document.getElementById("t").value.toLowerCase().match(/[a-z0-9']+/g) || [];
      const stop = new Set("the a an and or of to in on for with is it this that as at by from be are was".split(" "));
      const map = {};
      words.forEach((w) => {
        if (!stop.has(w) && w.length > 2) map[w] = (map[w] || 0) + 1;
      });
      const rows = Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 25);
      document.getElementById("out").innerHTML = `<p>${words.length} words</p><table class="table table-sm"><thead><tr><th>Keyword</th><th>Count</th><th>Density</th></tr></thead><tbody>${rows.map(([w, c]) => `<tr><td>${w}</td><td>${c}</td><td>${((c / words.length) * 100).toFixed(2)}%</td></tr>`).join("")}</tbody></table>`;
    };
  },

  sitemap() {
    Omni.setHTML(`${Omni.field("URLs (one per line)", `<textarea id="t" class="form-control" rows="8" placeholder="https://example.com/"></textarea>`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Build XML</button><button class="btn btn-ink" id="dl">Download</button>`)}<pre class="output" id="out"></pre>`);
    const build = () => {
      const urls = document.getElementById("t").value.split(/\n/).map((s) => s.trim()).filter(Boolean);
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u.replace(/&/g, "&amp;")}</loc></url>`).join("\n")}\n</urlset>`;
      document.getElementById("out").textContent = xml;
      return xml;
    };
    document.getElementById("go").onclick = build;
    document.getElementById("dl").onclick = () => Omni.download("sitemap.xml", build(), "application/xml");
  },

  robots() {
    Omni.setHTML(`${Omni.field("Sitemap URL", `<input id="sm" class="form-control" value="https://example.com/sitemap.xml">`)}
      <div class="form-check mb-2"><input class="form-check-input" id="all" type="checkbox" checked><label class="form-check-label" for="all">Allow all user-agents</label></div>
      ${Omni.field("Disallow paths (one per line)", `<textarea id="dis" class="form-control" rows="4">/admin/</textarea>`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Generate</button><button class="btn btn-ink" id="dl">Download</button>`)}<pre class="output" id="out"></pre>`);
    const build = () => {
      const dis = document.getElementById("dis").value.split(/\n/).map((s) => s.trim()).filter(Boolean);
      let out = "User-agent: *\n";
      out += document.getElementById("all").checked && !dis.length ? "Allow: /\n" : dis.map((p) => "Disallow: " + p).join("\n") + "\n";
      out += "Sitemap: " + document.getElementById("sm").value;
      document.getElementById("out").textContent = out;
      return out;
    };
    document.getElementById("go").onclick = build;
    document.getElementById("dl").onclick = () => Omni.download("robots.txt", build(), "text/plain");
  },

  googleIndex() {
    Omni.setHTML(`${Omni.note("Google does not expose index status to browsers. This opens a <code>site:</code> search so you can inspect coverage.")}
      ${Omni.field("Page or domain", `<input id="u" class="form-control" placeholder="https://example.com/page">`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Open Google search</button>`)}<p id="out"></p>`);
    document.getElementById("go").onclick = () => {
      let u = document.getElementById("u").value.trim();
      u = u.replace(/^https?:\/\//, "");
      const q = "site:" + u;
      document.getElementById("out").innerHTML = `Query: <strong>${q}</strong>`;
      window.open("https://www.google.com/search?q=" + encodeURIComponent(q), "_blank", "noopener");
    };
  },

  domainAuthority() {
    Omni.setHTML(`${Omni.note("This is a local heuristic, not Moz Domain Authority. Use it as a checklist.")}
      ${Omni.field("URL", `<input id="u" class="form-control" placeholder="https://example.com">`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Score</button>`)}<pre class="output" id="out"></pre>`);
    document.getElementById("go").onclick = () => {
      const u = document.getElementById("u").value.trim();
      let score = 40;
      const reasons = [];
      try {
        const url = new URL(u.includes("://") ? u : "https://" + u);
        if (url.protocol === "https:") { score += 10; reasons.push("+10 HTTPS"); }
        if (!url.hostname.startsWith("www.")) { score += 2; }
        if (url.hostname.split(".").length === 2) { score += 8; reasons.push("+8 root domain"); }
        if (url.pathname === "/" ) { score += 5; reasons.push("+5 homepage"); }
        if (url.hostname.length < 15) { score += 5; reasons.push("+5 short host"); }
        if (/blog|shop|news/.test(url.hostname)) { score += 6; reasons.push("+6 topical host"); }
      } catch {
        reasons.push("Could not parse URL");
        score = 0;
      }
      document.getElementById("out").textContent = `Estimated strength: ${Math.min(99, score)} / 100\n${reasons.join("\n")}`;
    };
  },

  backlinks() {
    Omni.setHTML(`${Omni.note("Paste HTML source. Outbound <code>a href</code> links are listed. Live crawl APIs are not used.")}
      ${Omni.field("HTML", `<textarea id="t" class="form-control" rows="8"></textarea>`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Extract links</button>`)}<ol id="out"></ol>`);
    document.getElementById("go").onclick = () => {
      const html = document.getElementById("t").value;
      const hrefs = [...html.matchAll(/href\s*=\s*["']([^"']+)["']/gi)].map((m) => m[1]);
      const uniq = [...new Set(hrefs)].filter((h) => /^https?:/i.test(h));
      document.getElementById("out").innerHTML = uniq.map((h) => `<li><a href="${h}" target="_blank" rel="noopener">${h}</a></li>`).join("") || "<li>No absolute links found.</li>";
    };
  },

  pageSpeed() {
    Omni.setHTML(`${Omni.field("Paste HTML", `<textarea id="t" class="form-control" rows="8"></textarea>`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Audit</button>`)}<ul id="out"></ul>`);
    document.getElementById("go").onclick = () => {
      const h = document.getElementById("t").value;
      const tips = [];
      const imgs = (h.match(/<img/gi) || []).length;
      const imgsNoW = (h.match(/<img(?![^>]*\bwidth=)/gi) || []).length;
      if (imgsNoW) tips.push(`${imgsNoW} image(s) missing width — can cause layout shift.`);
      if ((h.match(/<script/gi) || []).length > 8) tips.push("Many script tags; consider defer/async and bundling.");
      if (!/viewport/i.test(h)) tips.push("No viewport meta tag.");
      if (!/preload/i.test(h)) tips.push("No preload hints for fonts or hero images.");
      if ((h.match(/https?:\/\/[^"' ]+\.(png|jpg)/gi) || []).length) tips.push("Raster images found — consider WebP and compression.");
      if (!tips.length) tips.push("No obvious issues in this snapshot. Also test on PageSpeed Insights for lab data.");
      tips.push(`Image tags: ${imgs}`);
      document.getElementById("out").innerHTML = tips.map((t) => `<li>${t}</li>`).join("");
    };
  },

  sitemapValidate() {
    Omni.setHTML(`${Omni.field("Sitemap XML", `<textarea id="t" class="form-control" rows="10"></textarea>`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Validate</button>`)}<pre class="output" id="out"></pre>`);
    document.getElementById("go").onclick = () => {
      const xml = document.getElementById("t").value;
      const issues = [];
      try {
        const doc = new DOMParser().parseFromString(xml, "application/xml");
        if (doc.querySelector("parsererror")) issues.push("XML parse error.");
        const locs = [...doc.getElementsByTagName("loc")];
        if (!locs.length) issues.push("No <loc> entries.");
        locs.forEach((n, i) => {
          if (!/^https?:\/\//.test(n.textContent.trim())) issues.push(`Row ${i + 1}: loc is not an absolute URL.`);
        });
        if (locs.length > 50000) issues.push("More than 50,000 URLs (sitemap spec limit).");
        document.getElementById("out").textContent = issues.length ? issues.join("\n") : `Valid structure. ${locs.length} URLs.`;
      } catch (e) {
        document.getElementById("out").textContent = String(e);
      }
    };
  },

  mobileFriendly() {
    Omni.setHTML(`${Omni.field("HTML", `<textarea id="t" class="form-control" rows="8"></textarea>`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Test hints</button>`)}<ul id="out"></ul>`);
    document.getElementById("go").onclick = () => {
      const h = document.getElementById("t").value;
      const tips = [];
      if (!/name=["']viewport["']/i.test(h)) tips.push("Add <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">.");
      if (/user-scalable\s*=\s*no/i.test(h)) tips.push("Avoid user-scalable=no (accessibility).");
      if (/font-size:\s*[0-9]px/i.test(h)) tips.push("Some px font sizes may be small on phones.");
      if ((h.match(/<table/gi) || []).length) tips.push("Tables may overflow; wrap in a scroll container.");
      if (!tips.length) tips.push("Viewport looks present. Preview at 375px width to confirm tap targets.");
      document.getElementById("out").innerHTML = tips.map((t) => `<li>${t}</li>`).join("");
    };
  },

  textStats(mode) {
    Omni.setHTML(`${Omni.field("Text", `<textarea id="t" class="form-control" rows="10"></textarea>`)}<div class="row g-2" id="stats"></div>`);
    const t = document.getElementById("t");
    const render = () => {
      const v = t.value;
      const chars = v.length;
      const charsNo = v.replace(/\s/g, "").length;
      const words = (v.trim().match(/\S+/g) || []).length;
      const sentences = (v.match(/[.!?]+/g) || []).length;
      const paras = v.split(/\n\s*\n/).filter((p) => p.trim()).length;
      const read = Math.max(1, Math.round(words / 200));
      const items = mode === "chars"
        ? [["Characters", chars], ["Without spaces", charsNo], ["Words", words]]
        : [["Words", words], ["Characters", chars], ["Sentences", sentences], ["Paragraphs", paras], ["Est. minutes", read]];
      document.getElementById("stats").innerHTML = items.map(([k, val]) => `<div class="col-6 col-md-4"><div class="tool-shell py-3 text-center"><div class="fs-3 fw-bold">${val}</div><div class="small text-muted">${k}</div></div></div>`).join("");
    };
    t.addEventListener("input", render);
    render();
  },

  caseConvert() {
    Omni.setHTML(`${Omni.field("Text", `<textarea id="t" class="form-control" rows="6"></textarea>`)}
      <div class="d-flex flex-wrap gap-2 mb-3" id="btns"></div>
      <textarea id="out" class="form-control" rows="6"></textarea>`);
    const t = document.getElementById("t");
    const out = document.getElementById("out");
    const ops = {
      UPPER: (s) => s.toUpperCase(),
      lower: (s) => s.toLowerCase(),
      Title: (s) => s.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase()),
      Sentence: (s) => s.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()),
      "snake_case": (s) => s.trim().toLowerCase().replace(/\s+/g, "_"),
      "kebab-case": (s) => s.trim().toLowerCase().replace(/\s+/g, "-"),
      camelCase: (s) => s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
    };
    document.getElementById("btns").innerHTML = Object.keys(ops).map((k) => `<button class="btn btn-outline-dark btn-sm" data-k="${k}">${k}</button>`).join("");
    document.getElementById("btns").onclick = (e) => {
      const k = e.target.getAttribute("data-k");
      if (k) out.value = ops[k](t.value);
    };
  },

  plagiarism() {
    Omni.setHTML(`${Omni.note("Compares two texts locally (Jaccard similarity on word shingles). It does not search the web.")}
      <div class="row"><div class="col-md-6">${Omni.field("Text A", `<textarea id="a" class="form-control" rows="8"></textarea>`)}</div>
      <div class="col-md-6">${Omni.field("Text B", `<textarea id="b" class="form-control" rows="8"></textarea>`)}</div></div>
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Compare</button>`)}<pre class="output" id="out"></pre>`);
    document.getElementById("go").onclick = () => {
      const shingles = (s) => {
        const w = (s.toLowerCase().match(/[a-z0-9']+/g) || []);
        const set = new Set();
        for (let i = 0; i < w.length - 2; i++) set.add(w.slice(i, i + 3).join(" "));
        return set;
      };
      const A = shingles(document.getElementById("a").value);
      const B = shingles(document.getElementById("b").value);
      let inter = 0;
      A.forEach((x) => { if (B.has(x)) inter++; });
      const union = A.size + B.size - inter;
      const pct = union ? Math.round((inter / union) * 100) : 0;
      document.getElementById("out").textContent = `Overlap score: ${pct}%\nShared 3-word phrases: ${inter}`;
    };
  },

  grammar() {
    Omni.setHTML(`${Omni.field("Text", `<textarea id="t" class="form-control" rows="8"></textarea>`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Check</button>`)}<ul id="out"></ul>`);
    document.getElementById("go").onclick = () => {
      const t = document.getElementById("t").value;
      const issues = [];
      if (/  +/.test(t)) issues.push("Double spaces found.");
      if (/[a-z]\.[A-Z]/.test(t)) issues.push("Missing space after a period.");
      if (/\bi\b/.test(t)) issues.push("Lowercase standalone “i” — capitalize I.");
      if (/\tyour welcome\b/i.test(t)) issues.push("Did you mean “you're welcome”?");
      if (/\bits it's\b/i.test(t)) issues.push("Check its vs it's.");
      if (/\bteh\b/i.test(t)) issues.push("Possible typo: teh → the.");
      if (/\brecieve\b/i.test(t)) issues.push("Possible typo: recieve → receive.");
      if (!/[.!?]"?$/.test(t.trim()) && t.trim().length > 40) issues.push("Last sentence may be missing end punctuation.");
      if (!issues.length) issues.push("No basic issues found. This is not a full grammar engine.");
      document.getElementById("out").innerHTML = issues.map((i) => `<li>${i}</li>`).join("");
    };
  },

  tts() {
    Omni.setHTML(`${Omni.field("Text", `<textarea id="t" class="form-control" rows="5">Hello from OmniTools.</textarea>`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Speak</button><button class="btn btn-outline-dark" id="st">Stop</button>`)}`);
    document.getElementById("go").onclick = () => {
      const u = new SpeechSynthesisUtterance(document.getElementById("t").value);
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
    };
    document.getElementById("st").onclick = () => speechSynthesis.cancel();
  },

  stt() {
    Omni.setHTML(`${Omni.note("Uses the Web Speech API in Chromium-based browsers.")}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Start listening</button><button class="btn btn-outline-dark" id="st">Stop</button>`)}
      <textarea id="out" class="form-control" rows="8"></textarea>`);
    const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Rec) {
      document.getElementById("out").value = "Speech recognition is not supported in this browser.";
      return;
    }
    const rec = new Rec();
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (e) => {
      let t = "";
      for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript + " ";
      document.getElementById("out").value = t.trim();
    };
    document.getElementById("go").onclick = () => rec.start();
    document.getElementById("st").onclick = () => rec.stop();
  },

  urlCodec() {
    Omni.setHTML(`${Omni.field("Input", `<textarea id="t" class="form-control" rows="4"></textarea>`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="en">Encode</button><button class="btn btn-ink" id="de">Decode</button>`)}
      <textarea id="out" class="form-control" rows="4"></textarea>`);
    document.getElementById("en").onclick = () => (document.getElementById("out").value = encodeURIComponent(document.getElementById("t").value));
    document.getElementById("de").onclick = () => {
      try { document.getElementById("out").value = decodeURIComponent(document.getElementById("t").value); }
      catch { alert("Invalid encoded string"); }
    };
  },

  fancyText() {
    const maps = {
      Bold: { a: "𝗮", b: "𝗯", c: "𝗰", d: "𝗱", e: "𝗲", f: "𝗳", g: "𝗴", h: "𝗵", i: "𝗶", j: "𝗷", k: "𝗸", l: "𝗹", m: "𝗺", n: "𝗻", o: "𝗼", p: "𝗽", q: "𝗾", r: "𝗿", s: "𝘀", t: "𝘁", u: "𝘂", v: "𝘃", w: "𝘄", x: "𝘅", y: "𝘆", z: "𝘇" },
      Italic: null
    };
    Omni.setHTML(`${Omni.field("Text", `<input id="t" class="form-control" value="OmniTools">`)}
      <div class="d-flex flex-wrap gap-2 mb-3">
        <button class="btn btn-outline-dark btn-sm" data-s="bold">Bold</button>
        <button class="btn btn-outline-dark btn-sm" data-s="full">Fullwidth</button>
        <button class="btn btn-outline-dark btn-sm" data-s="small">Small caps</button>
      </div><textarea id="out" class="form-control" rows="4"></textarea>`);
    const t = document.getElementById("t");
    const convert = (style) => {
      const s = t.value;
      if (style === "full") return [...s].map((ch) => {
        const c = ch.charCodeAt(0);
        if (c >= 33 && c <= 126) return String.fromCharCode(c + 65248);
        return ch;
      }).join("");
      if (style === "small") return s.toUpperCase();
      const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const a = "abcdefghijklmnopqrstuvwxyz";
      const B = "𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭";
      const b = "𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇";
      return [...s].map((ch) => {
        let i = A.indexOf(ch); if (i >= 0) return [...B][i];
        i = a.indexOf(ch); if (i >= 0) return [...b][i];
        return ch;
      }).join("");
    };
    document.querySelector("[data-s='bold']").onclick = () => (document.getElementById("out").value = convert("bold"));
    document.querySelector("[data-s='full']").onclick = () => (document.getElementById("out").value = convert("full"));
    document.querySelector("[data-s='small']").onclick = () => (document.getElementById("out").value = convert("small"));
  },

  randomText() {
    const words = "lumen bridge orchard quartz velvet meadow lantern harbor cedar pebble aurora canyon ripple ember willow harbor silent copper pebble".split(" ");
    Omni.setHTML(`${Omni.field("Paragraphs", `<input id="n" class="form-control" type="number" value="3">`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Generate</button>`)}<textarea id="out" class="form-control" rows="10"></textarea>`);
    document.getElementById("go").onclick = () => {
      const n = +document.getElementById("n").value || 1;
      const paras = [];
      for (let i = 0; i < n; i++) {
        const sent = [];
        for (let s = 0; s < 4; s++) {
          const ws = [];
          for (let w = 0; w < 12; w++) ws.push(words[Math.floor(Math.random() * words.length)]);
          ws[0] = ws[0][0].toUpperCase() + ws[0].slice(1);
          sent.push(ws.join(" ") + ".");
        }
        paras.push(sent.join(" "));
      }
      document.getElementById("out").value = paras.join("\n\n");
    };
  },

  jsonFmt() {
    Omni.setHTML(`${Omni.field("JSON", `<textarea id="t" class="form-control" rows="10"></textarea>`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="pretty">Pretty</button><button class="btn btn-ink" id="mini">Minify</button>`)}<pre class="output" id="out"></pre>`);
    const parse = () => JSON.parse(document.getElementById("t").value);
    document.getElementById("pretty").onclick = () => {
      try { document.getElementById("out").textContent = JSON.stringify(parse(), null, 2); }
      catch (e) { document.getElementById("out").textContent = e.message; }
    };
    document.getElementById("mini").onclick = () => {
      try { document.getElementById("out").textContent = JSON.stringify(parse()); }
      catch (e) { document.getElementById("out").textContent = e.message; }
    };
  },

  htmlToMd() {
    Omni.setHTML(`${Omni.field("HTML", `<textarea id="t" class="form-control" rows="8"><h1>Title</h1><p>Hello <strong>world</strong></p></textarea>`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Convert</button>`)}<textarea id="out" class="form-control" rows="8"></textarea>`);
    document.getElementById("go").onclick = () => {
      let h = document.getElementById("t").value;
      h = h.replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n\n");
      h = h.replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n\n");
      h = h.replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n\n");
      h = h.replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**");
      h = h.replace(/<b[^>]*>(.*?)<\/b>/gi, "**$1**");
      h = h.replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*");
      h = h.replace(/<i[^>]*>(.*?)<\/i>/gi, "*$1*");
      h = h.replace(/<a[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi, "[$2]($1)");
      h = h.replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n");
      h = h.replace(/<br\s*\/?>/gi, "\n");
      h = h.replace(/<p[^>]*>(.*?)<\/p>/gi, "$1\n\n");
      h = h.replace(/<[^>]+>/g, "");
      document.getElementById("out").value = h.trim();
    };
  },

  minifyCss() {
    Omni.setHTML(`${Omni.field("CSS", `<textarea id="t" class="form-control" rows="10"></textarea>`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Minify</button>`)}<textarea id="out" class="form-control" rows="8"></textarea>`);
    document.getElementById("go").onclick = () => {
      let s = document.getElementById("t").value;
      s = s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}:;,])\s*/g, "$1").replace(/;}/g, "}");
      document.getElementById("out").value = s.trim();
    };
  },

  minifyJs() {
    Omni.setHTML(`${Omni.note("Removes comments and extra whitespace. Not a full compressor (no mangling).")}
      ${Omni.field("JavaScript", `<textarea id="t" class="form-control" rows="10"></textarea>`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Minify</button>`)}<textarea id="out" class="form-control" rows="8"></textarea>`);
    document.getElementById("go").onclick = () => {
      let s = document.getElementById("t").value;
      s = s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
      s = s.replace(/\s+/g, " ").replace(/\s*([=+\-*/{}();,:<>])\s*/g, "$1");
      document.getElementById("out").value = s.trim();
    };
  },

  sqlFmt() {
    Omni.setHTML(`${Omni.field("SQL", `<textarea id="t" class="form-control" rows="8">select id,name from users where active=1 order by name</textarea>`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Format</button>`)}<pre class="output" id="out"></pre>`);
    document.getElementById("go").onclick = () => {
      const keys = ["select", "from", "where", "and", "or", "order by", "group by", "left join", "inner join", "on", "limit", "values", "insert into", "update", "set"];
      let s = document.getElementById("t").value.replace(/\s+/g, " ").trim();
      keys.forEach((k) => {
        const re = new RegExp("\\b" + k.replace(" ", "\\s+") + "\\b", "gi");
        s = s.replace(re, "\n" + k.toUpperCase());
      });
      document.getElementById("out").textContent = s.trim();
    };
  },

  htaccess() {
    Omni.setHTML(`${Omni.field("From path", `<input id="a" class="form-control" value="/old-page">`)}
      ${Omni.field("To URL", `<input id="b" class="form-control" value="https://example.com/new-page">`)}
      <select id="c" class="form-select mb-3"><option value="301">301 permanent</option><option value="302">302 temporary</option></select>
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Generate</button>`)}<pre class="output" id="out"></pre>`);
    document.getElementById("go").onclick = () => {
      const a = document.getElementById("a").value.replace(/^\//, "");
      const b = document.getElementById("b").value;
      const c = document.getElementById("c").value;
      document.getElementById("out").textContent = `RewriteEngine On\nRedirect ${c} /${a} ${b}`;
    };
  },

  mdToHtml() {
    Omni.setHTML(`${Omni.field("Markdown", `<textarea id="t" class="form-control" rows="8"># Hello\n\nThis is **bold** and a [link](https://example.com).</textarea>`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Convert</button>`)}<textarea id="out" class="form-control" rows="8"></textarea>`);
    document.getElementById("go").onclick = () => {
      let s = document.getElementById("t").value
        .replace(/^### (.*)$/gm, "<h3>$1</h3>")
        .replace(/^## (.*)$/gm, "<h2>$1</h2>")
        .replace(/^# (.*)$/gm, "<h1>$1</h1>")
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
        .replace(/^\- (.*)$/gm, "<li>$1</li>")
        .replace(/^(?!<[hl]|<li)(.+)$/gm, "<p>$1</p>");
      document.getElementById("out").value = s;
    };
  },

  colorPicker() {
    Omni.setHTML(`${Omni.field("Color", `<input id="c" type="color" value="#0b6e6a" class="form-control form-control-color">`)}
      <pre class="output" id="out"></pre>`);
    const hexToRgb = (hex) => {
      const n = parseInt(hex.slice(1), 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    };
    const run = () => {
      const hex = document.getElementById("c").value;
      const [r, g, b] = hexToRgb(hex);
      const max = Math.max(r, g, b) / 255, min = Math.min(r, g, b) / 255;
      let h = 0, s = 0, l = (max + min) / 2;
      const d = max - min;
      if (d) {
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        const rr = r / 255, gg = g / 255, bb = b / 255;
        switch (max) {
          case rr: h = (gg - bb) / d + (gg < bb ? 6 : 0); break;
          case gg: h = (bb - rr) / d + 2; break;
          default: h = (rr - gg) / d + 4;
        }
        h /= 6;
      }
      document.getElementById("out").textContent = `HEX ${hex}\nRGB ${r}, ${g}, ${b}\nHSL ${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`;
    };
    document.getElementById("c").oninput = run;
    run();
  },

  base64() {
    Omni.setHTML(`${Omni.field("Input", `<textarea id="t" class="form-control" rows="5"></textarea>`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="en">Encode</button><button class="btn btn-ink" id="de">Decode</button>`)}
      <textarea id="out" class="form-control" rows="5"></textarea>`);
    document.getElementById("en").onclick = () => {
      document.getElementById("out").value = btoa(unescape(encodeURIComponent(document.getElementById("t").value)));
    };
    document.getElementById("de").onclick = () => {
      try { document.getElementById("out").value = decodeURIComponent(escape(atob(document.getElementById("t").value))); }
      catch { alert("Invalid Base64"); }
    };
  },

  ipLookup() {
    Omni.setHTML(`${Omni.btnRow(`<button class="btn btn-teal" id="me">My IP</button>`)}
      ${Omni.field("Or lookup IP", `<input id="ip" class="form-control" placeholder="8.8.8.8">`)}
      ${Omni.btnRow(`<button class="btn btn-ink" id="go">Lookup</button>`)}<pre class="output" id="out"></pre>`);
    const show = async (ip) => {
      const url = ip ? `https://ipapi.co/${ip}/json/` : "https://ipapi.co/json/";
      const res = await fetch(url);
      const data = await res.json();
      document.getElementById("out").textContent = JSON.stringify(data, null, 2);
    };
    document.getElementById("me").onclick = () => show();
    document.getElementById("go").onclick = () => show(document.getElementById("ip").value.trim());
  },

  unitConverter(units, label) {
    const keys = Object.keys(units);
    Omni.setHTML(`${Omni.field("Value", `<input id="v" class="form-control" type="number" value="1">`)}
      <div class="row"><div class="col">${Omni.field("From", `<select id="from" class="form-select">${keys.map((k) => `<option>${k}</option>`).join("")}</select>`)}</div>
      <div class="col">${Omni.field("To", `<select id="to" class="form-select">${keys.map((k) => `<option>${k}</option>`).join("")}</select>`)}</div></div>
      <pre class="output" id="out"></pre>`);
    document.getElementById("to").selectedIndex = Math.min(1, keys.length - 1);
    const run = () => {
      const v = +document.getElementById("v").value;
      const f = document.getElementById("from").value;
      const t = document.getElementById("to").value;
      const base = units[f](v, true);
      const out = units[t](base, false);
      document.getElementById("out").textContent = `${v} ${f} = ${Number(out.toFixed(8))} ${t}  (${label})`;
    };
    ["v", "from", "to"].forEach((id) => document.getElementById(id).addEventListener("input", run));
    document.getElementById("from").addEventListener("change", run);
    document.getElementById("to").addEventListener("change", run);
    run();
  },

  linearUnits(map, label) {
    const units = {};
    Object.entries(map).forEach(([k, factor]) => {
      units[k] = (v, toBase) => (toBase ? v * factor : v / factor);
    });
    this.unitConverter(units, label);
  }
};
