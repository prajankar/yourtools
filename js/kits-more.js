Object.assign(window.Kits, {
  percentage() {
    Omni.setHTML(`
      ${Omni.field("Part / amount", `<input id="a" class="form-control" type="number" value="25">`)}
      ${Omni.field("Whole / total", `<input id="b" class="form-control" type="number" value="200">`)}
      ${Omni.field("Percent (for 'percent of')", `<input id="p" class="form-control" type="number" value="15">`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Calculate</button>`)}<pre class="output" id="out"></pre>`);
    document.getElementById("go").onclick = () => {
      const a = +document.getElementById("a").value, b = +document.getElementById("b").value, p = +document.getElementById("p").value;
      document.getElementById("out").textContent = `${a} is ${((a / b) * 100).toFixed(2)}% of ${b}\n${p}% of ${b} = ${(b * p / 100).toFixed(2)}\nIncrease ${a} by ${p}% = ${(a * (1 + p / 100)).toFixed(2)}`;
    };
  },
  age() {
    Omni.setHTML(`${Omni.field("Date of birth", `<input id="d" class="form-control" type="date">`)}${Omni.btnRow(`<button class="btn btn-teal" id="go">Calculate</button>`)}<pre class="output" id="out"></pre>`);
    document.getElementById("go").onclick = () => {
      const dob = new Date(document.getElementById("d").value);
      if (isNaN(dob)) return alert("Pick a date.");
      const now = new Date();
      let y = now.getFullYear() - dob.getFullYear();
      let m = now.getMonth() - dob.getMonth();
      let d = now.getDate() - dob.getDate();
      if (d < 0) { m--; d += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
      if (m < 0) { y--; m += 12; }
      const days = Math.floor((now - dob) / 86400000);
      document.getElementById("out").textContent = `${y} years, ${m} months, ${d} days\n${days} days lived`;
    };
  },
  bmi() {
    Omni.setHTML(`${Omni.field("Height (cm)", `<input id="h" class="form-control" type="number" value="170">`)}
      ${Omni.field("Weight (kg)", `<input id="w" class="form-control" type="number" value="65">`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Calculate</button>`)}<pre class="output" id="out"></pre>`);
    document.getElementById("go").onclick = () => {
      const h = +document.getElementById("h").value / 100, w = +document.getElementById("w").value;
      const bmi = w / (h * h);
      let cat = "Underweight";
      if (bmi >= 18.5) cat = "Normal";
      if (bmi >= 25) cat = "Overweight";
      if (bmi >= 30) cat = "Obese";
      document.getElementById("out").textContent = `BMI ${bmi.toFixed(1)} — ${cat}`;
    };
  },
  emi() {
    Omni.setHTML(`${Omni.field("Principal", `<input id="p" class="form-control" type="number" value="500000">`)}
      ${Omni.field("Annual rate %", `<input id="r" class="form-control" type="number" value="8.5" step="0.1">`)}
      ${Omni.field("Tenure (months)", `<input id="n" class="form-control" type="number" value="60">`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Calculate</button>`)}<pre class="output" id="out"></pre>`);
    document.getElementById("go").onclick = () => {
      const P = +document.getElementById("p").value, n = +document.getElementById("n").value, r = +document.getElementById("r").value / 12 / 100;
      const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
      document.getElementById("out").textContent = `EMI ${emi.toFixed(2)}\nTotal ${ (emi * n).toFixed(2) }\nInterest ${ (emi * n - P).toFixed(2) }`;
    };
  },
  scientific() {
    Omni.setHTML(`<input id="disp" class="form-control mb-3 fs-4" value="0" readonly>
      <div class="calc-grid" id="pad"></div>`);
    const keys = ["C", "(", ")", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "sin", "cos", "tan", "log", "ln", "sqrt", "^", "π", "e", "="];
    const pad = document.getElementById("pad");
    pad.innerHTML = keys.map((k) => `<button data-k="${k}" class="${k === "=" ? "eq" : /[+\-*/^]/.test(k) ? "op" : ""}">${k}</button>`).join("");
    const disp = document.getElementById("disp");
    pad.onclick = (e) => {
      const k = e.target.getAttribute("data-k");
      if (!k) return;
      if (k === "C") disp.value = "0";
      else if (k === "=") {
        try {
          let expr = disp.value.replace(/π/g, "Math.PI").replace(/\be\b/g, "Math.E").replace(/\^/g, "**");
          expr = expr.replace(/sin\(/g, "Math.sin(").replace(/cos\(/g, "Math.cos(").replace(/tan\(/g, "Math.tan(");
          expr = expr.replace(/log\(/g, "Math.log10(").replace(/ln\(/g, "Math.log(").replace(/sqrt\(/g, "Math.sqrt(");
          if (!/^[\d\s()+\-*/.MathPIElogsqrtanc,]*$/.test(expr.replace(/Math\./g, ""))) throw new Error("bad");
          disp.value = String(Function('"use strict"; return (' + expr + ")")());
        } catch { disp.value = "Error"; }
      } else if (["sin", "cos", "tan", "log", "ln", "sqrt"].includes(k)) {
        disp.value = (disp.value === "0" ? "" : disp.value) + k + "(";
      } else {
        disp.value = disp.value === "0" ? k : disp.value + k;
      }
    };
  },
  discount() {
    Omni.setHTML(`${Omni.field("Price", `<input id="p" class="form-control" type="number" value="120">`)}
      ${Omni.field("Discount %", `<input id="d" class="form-control" type="number" value="25">`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Calculate</button>`)}<pre class="output" id="out"></pre>`);
    document.getElementById("go").onclick = () => {
      const p = +document.getElementById("p").value, d = +document.getElementById("d").value;
      const save = p * d / 100;
      document.getElementById("out").textContent = `You pay ${(p - save).toFixed(2)}\nYou save ${save.toFixed(2)}`;
    };
  },
  currency() {
    Omni.setHTML(`${Omni.field("Amount", `<input id="v" class="form-control" type="number" value="100">`)}
      <div class="row"><div class="col">${Omni.field("From", `<select id="from" class="form-select"><option>USD</option><option>EUR</option><option>GBP</option><option>INR</option><option>JPY</option><option>AUD</option><option>CAD</option><option>NPR</option></select>`)}</div>
      <div class="col">${Omni.field("To", `<select id="to" class="form-select"><option>EUR</option><option>USD</option><option>GBP</option><option>INR</option><option>JPY</option><option>NPR</option></select>`)}</div></div>
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Convert</button>`)}<pre class="output" id="out">Uses Frankfurter.app (ECB rates).</pre>`);
    document.getElementById("go").onclick = async () => {
      const from = document.getElementById("from").value, to = document.getElementById("to").value, v = document.getElementById("v").value;
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${v}&from=${from}&to=${to}`);
      const data = await res.json();
      document.getElementById("out").textContent = `${v} ${from} = ${data.rates[to]} ${to}\nDate ${data.date}`;
    };
  },
  timeZone() {
    const zones = ["UTC", "America/New_York", "Europe/London", "Asia/Kathmandu", "Asia/Kolkata", "Asia/Tokyo", "Australia/Sydney", "America/Los_Angeles"];
    Omni.setHTML(`${Omni.field("Local datetime", `<input id="dt" class="form-control" type="datetime-local">`)}
      ${Omni.field("From zone", `<select id="from" class="form-select">${zones.map((z) => `<option>${z}</option>`).join("")}</select>`)}
      ${Omni.field("To zone", `<select id="to" class="form-select">${zones.map((z) => `<option>${z}</option>`).join("")}</select>`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Convert</button>`)}<pre class="output" id="out"></pre>`);
    document.getElementById("to").value = "Asia/Kathmandu";
    document.getElementById("go").onclick = () => {
      const raw = document.getElementById("dt").value;
      if (!raw) return alert("Pick a datetime.");
      const from = document.getElementById("from").value, to = document.getElementById("to").value;
      const asUTC = new Date(raw);
      const fmt = (tz) => new Intl.DateTimeFormat("en-GB", { timeZone: tz, dateStyle: "full", timeStyle: "long" }).format(asUTC);
      document.getElementById("out").textContent = `${from}: ${fmt(from)}\n${to}: ${fmt(to)}`;
    };
  },
  bases() {
    Omni.setHTML(`${Omni.field("Value", `<input id="v" class="form-control" value="1010">`)}
      ${Omni.field("From base", `<select id="from" class="form-select"><option>2</option><option selected>10</option><option>8</option><option>16</option></select>`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Convert</button>`)}<pre class="output" id="out"></pre>`);
    document.getElementById("go").onclick = () => {
      const n = parseInt(document.getElementById("v").value, +document.getElementById("from").value);
      if (Number.isNaN(n)) return alert("Invalid number");
      document.getElementById("out").textContent = `Bin ${n.toString(2)}\nOct ${n.toString(8)}\nDec ${n}\nHex ${n.toString(16).toUpperCase()}`;
    };
  },
  tip() {
    Omni.setHTML(`${Omni.field("Bill", `<input id="b" class="form-control" type="number" value="86">`)}
      ${Omni.field("Tip %", `<input id="p" class="form-control" type="number" value="15">`)}
      ${Omni.field("People", `<input id="n" class="form-control" type="number" value="2">`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Split</button>`)}<pre class="output" id="out"></pre>`);
    document.getElementById("go").onclick = () => {
      const b = +document.getElementById("b").value, p = +document.getElementById("p").value, n = +document.getElementById("n").value;
      const tip = b * p / 100, total = b + tip;
      document.getElementById("out").textContent = `Tip ${tip.toFixed(2)}\nTotal ${total.toFixed(2)}\nPer person ${(total / n).toFixed(2)}`;
    };
  },
  temperature() {
    Omni.setHTML(`${Omni.field("Value", `<input id="v" class="form-control" type="number" value="25">`)}
      ${Omni.field("From", `<select id="from" class="form-select"><option>C</option><option>F</option><option>K</option></select>`)}
      ${Omni.field("To", `<select id="to" class="form-select"><option>F</option><option>C</option><option>K</option></select>`)}
      <pre class="output" id="out"></pre>`);
    const toC = { C: (v) => v, F: (v) => (v - 32) * 5 / 9, K: (v) => v - 273.15 };
    const fromC = { C: (v) => v, F: (v) => v * 9 / 5 + 32, K: (v) => v + 273.15 };
    const run = () => {
      const v = +document.getElementById("v").value;
      const c = toC[document.getElementById("from").value](v);
      const t = document.getElementById("to").value;
      document.getElementById("out").textContent = `${fromC[t](c).toFixed(4)} ${t}`;
    };
    ["v", "from", "to"].forEach((id) => document.getElementById(id).addEventListener("input", run));
    document.getElementById("from").addEventListener("change", run);
    document.getElementById("to").addEventListener("change", run);
    run();
  },
  fuel() {
    Omni.setHTML(`${Omni.field("Value", `<input id="v" class="form-control" type="number" value="30">`)}
      ${Omni.field("From", `<select id="from" class="form-select"><option>mpg (US)</option><option>km/L</option><option>L/100km</option></select>`)}
      ${Omni.field("To", `<select id="to" class="form-select"><option>L/100km</option><option>mpg (US)</option><option>km/L</option></select>`)}
      <pre class="output" id="out"></pre>`);
    const toKml = {
      "mpg (US)": (v) => v * 0.425144,
      "km/L": (v) => v,
      "L/100km": (v) => 100 / v
    };
    const fromKml = {
      "mpg (US)": (v) => v / 0.425144,
      "km/L": (v) => v,
      "L/100km": (v) => 100 / v
    };
    const run = () => {
      const v = +document.getElementById("v").value;
      const k = toKml[document.getElementById("from").value](v);
      const t = document.getElementById("to").value;
      document.getElementById("out").textContent = fromKml[t](k).toFixed(4) + " " + t;
    };
    ["v", "from", "to"].forEach((id) => document.getElementById(id).addEventListener("input", run));
    document.getElementById("from").addEventListener("change", run);
    document.getElementById("to").addEventListener("change", run);
    run();
  },
  md5tool() {
    Omni.setHTML(`${Omni.field("Text", `<textarea id="t" class="form-control" rows="5">hello</textarea>`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Hash</button>`)}<pre class="output" id="out"></pre>`);
    document.getElementById("go").onclick = () => (document.getElementById("out").textContent = md5(document.getElementById("t").value));
  },
  sha256() {
    Omni.setHTML(`${Omni.field("Text", `<textarea id="t" class="form-control" rows="5">hello</textarea>`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Hash</button>`)}<pre class="output" id="out"></pre>`);
    document.getElementById("go").onclick = async () => {
      const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(document.getElementById("t").value));
      document.getElementById("out").textContent = [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
    };
  },
  password() {
    Omni.setHTML(`${Omni.field("Length", `<input id="n" class="form-control" type="number" value="16">`)}
      <div class="form-check"><input class="form-check-input" id="u" type="checkbox" checked><label class="form-check-label" for="u">Uppercase</label></div>
      <div class="form-check"><input class="form-check-input" id="l" type="checkbox" checked><label class="form-check-label" for="l">Lowercase</label></div>
      <div class="form-check"><input class="form-check-input" id="d" type="checkbox" checked><label class="form-check-label" for="d">Digits</label></div>
      <div class="form-check mb-3"><input class="form-check-input" id="s" type="checkbox" checked><label class="form-check-label" for="s">Symbols</label></div>
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Generate</button>`)}<pre class="output" id="out"></pre>`);
    document.getElementById("go").onclick = () => {
      let set = "";
      if (document.getElementById("u").checked) set += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      if (document.getElementById("l").checked) set += "abcdefghijklmnopqrstuvwxyz";
      if (document.getElementById("d").checked) set += "0123456789";
      if (document.getElementById("s").checked) set += "!@#$%^&*_-+=?";
      const n = +document.getElementById("n").value;
      const arr = new Uint32Array(n);
      crypto.getRandomValues(arr);
      document.getElementById("out").textContent = [...arr].map((x) => set[x % set.length]).join("");
    };
  },
  randomString() {
    Omni.setHTML(`${Omni.field("Length", `<input id="n" class="form-control" type="number" value="24">`)}
      ${Omni.field("Charset", `<input id="c" class="form-control" value="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789">`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Generate</button>`)}<pre class="output" id="out"></pre>`);
    document.getElementById("go").onclick = () => {
      const set = document.getElementById("c").value, n = +document.getElementById("n").value;
      const arr = new Uint32Array(n);
      crypto.getRandomValues(arr);
      document.getElementById("out").textContent = [...arr].map((x) => set[x % set.length]).join("");
    };
  },
  urlShortener() {
    Omni.setHTML(`${Omni.note("Short codes are stored in this browser only (localStorage). There is no public redirect server.")}
      ${Omni.field("Long URL", `<input id="u" class="form-control" placeholder="https://">`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Create code</button>`)}<pre class="output" id="out"></pre><div id="list"></div>`);
    const key = "omni-shorts";
    const load = () => JSON.parse(localStorage.getItem(key) || "{}");
    const render = () => {
      const map = load();
      document.getElementById("list").innerHTML = Object.entries(map).map(([c, u]) => `<div><code>${c}</code> → ${u}</div>`).join("") || "<p class='small'>No codes yet.</p>";
    };
    document.getElementById("go").onclick = () => {
      const u = document.getElementById("u").value.trim();
      if (!/^https?:\/\//.test(u)) return alert("URL must start with http(s).");
      const map = load();
      const code = Math.random().toString(36).slice(2, 8);
      map[code] = u;
      localStorage.setItem(key, JSON.stringify(map));
      document.getElementById("out").textContent = `Code: ${code}\nOpen this file with ?r=${code} on a future hosted version, or copy the original URL.`;
      render();
    };
    const r = new URLSearchParams(location.search).get("r");
    const map = load();
    if (r && map[r]) location.href = map[r];
    render();
  },
  geoIP() {
    Omni.setHTML(`${Omni.field("IP", `<input id="ip" class="form-control" placeholder="leave blank for your IP">`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Locate</button>`)}<pre class="output" id="out"></pre>`);
    document.getElementById("go").onclick = async () => {
      const ip = document.getElementById("ip").value.trim();
      const res = await fetch(ip ? `https://ipapi.co/${ip}/json/` : "https://ipapi.co/json/");
      const d = await res.json();
      document.getElementById("out").textContent = `${d.ip}\n${d.city}, ${d.region}, ${d.country_name}\nLat ${d.latitude} Lon ${d.longitude}\nISP ${d.org}`;
    };
  },
  sslCheck() {
    Omni.setHTML(`${Omni.note("Browsers cannot read certificate details. This checks whether HTTPS responds.")}
      ${Omni.field("Host", `<input id="h" class="form-control" placeholder="example.com">`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Check</button>`)}<pre class="output" id="out"></pre>`);
    document.getElementById("go").onclick = async () => {
      let host = document.getElementById("h").value.trim().replace(/^https?:\/\//, "").split("/")[0];
      const url = "https://" + host;
      const t0 = performance.now();
      try {
        await fetch(url, { mode: "no-cors" });
        document.getElementById("out").textContent = `Reached ${url} in ${(performance.now() - t0).toFixed(0)} ms (opaque CORS response).\nCertificate fields are not exposed to JavaScript.`;
      } catch (e) {
        document.getElementById("out").textContent = "Could not reach host: " + e.message;
      }
    };
  },
  whois() {
    Omni.setHTML(`${Omni.field("Domain", `<input id="d" class="form-control" placeholder="example.com">`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">RDAP lookup</button>`)}<pre class="output" id="out"></pre>`);
    document.getElementById("go").onclick = async () => {
      const d = document.getElementById("d").value.trim();
      try {
        const res = await fetch("https://rdap.org/domain/" + encodeURIComponent(d));
        const data = await res.json();
        document.getElementById("out").textContent = JSON.stringify(data, null, 2);
      } catch (e) {
        document.getElementById("out").textContent = "RDAP failed (CORS or unknown TLD). " + e.message;
      }
    };
  },
  httpHeaders() {
    Omni.setHTML(`${Omni.note("Only headers exposed to the browser are shown (CORS).")}
      ${Omni.field("URL", `<input id="u" class="form-control" value="https://httpbin.org/get">`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Fetch</button>`)}<pre class="output" id="out"></pre>`);
    document.getElementById("go").onclick = async () => {
      try {
        const res = await fetch(document.getElementById("u").value);
        const headers = [...res.headers.entries()].map(([k, v]) => k + ": " + v).join("\n");
        document.getElementById("out").textContent = `Status ${res.status}\n${headers}`;
      } catch (e) {
        document.getElementById("out").textContent = "Blocked or failed: " + e.message;
      }
    };
  },
  privacyPolicy() {
    Omni.setHTML(`${Omni.field("Site name", `<input id="n" class="form-control" value="OmniTools">`)}
      ${Omni.field("Contact email", `<input id="e" class="form-control" value="privacy@example.com">`)}
      <div class="form-check"><input class="form-check-input" id="an" type="checkbox" checked><label class="form-check-label" for="an">Analytics</label></div>
      <div class="form-check mb-3"><input class="form-check-input" id="ads" type="checkbox" checked><label class="form-check-label" for="ads">Advertising</label></div>
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Generate</button>`)}<textarea id="out" class="form-control" rows="12"></textarea>`);
    document.getElementById("go").onclick = () => {
      const n = document.getElementById("n").value, e = document.getElementById("e").value;
      document.getElementById("out").value = `Privacy Policy for ${n}\nLast updated: ${new Date().toISOString().slice(0, 10)}\n\n${n} runs in your browser. Files you process are not uploaded unless a tool explicitly calls a third-party API (currency rates, IP lookup, QR images).\n\n${document.getElementById("an").checked ? "We may use analytics cookies to understand traffic.\n" : "We do not use analytics cookies.\n"}${document.getElementById("ads").checked ? "Advertising partners may set cookies for ads.\n" : "No advertising cookies.\n"}\nContact: ${e}\n\nThis draft is not legal advice. Have an attorney review it before publishing.`;
    };
  },
  ytThumb() {
    Omni.setHTML(`${Omni.field("YouTube URL or video ID", `<input id="u" class="form-control" placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ">`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Load thumbnails</button>`)}<div id="out" class="row g-2"></div>`);
    document.getElementById("go").onclick = () => {
      const raw = document.getElementById("u").value.trim();
      const m = raw.match(/[?&]v=([^&]+)/) || raw.match(/youtu\.be\/([^?]+)/) || [null, raw];
      const id = m[1];
      const kinds = ["maxresdefault", "sddefault", "hqdefault", "mqdefault"];
      document.getElementById("out").innerHTML = kinds.map((k) => `<div class="col-md-6"><p class="small mb-1">${k}</p><a href="https://img.youtube.com/vi/${id}/${k}.jpg" target="_blank" rel="noopener"><img class="preview-img" src="https://img.youtube.com/vi/${id}/${k}.jpg" alt="${k}"></a></div>`).join("");
    };
  },
  localMedia(kind) {
    Omni.setHTML(`${Omni.note("Platforms do not allow third-party sites to download private or copyrighted media from a URL. Choose a file you already have the right to save, and this tool will re-download it locally — nothing is uploaded.")}
      <input id="file" class="form-control mb-3" type="file" accept="${kind === "image" ? "image/*" : "video/*"}">
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Save a copy</button>`)}
      <div id="prev"></div>`);
    document.getElementById("go").onclick = () => {
      const f = document.getElementById("file").files[0];
      if (!f) return alert("Choose a file.");
      Omni.download(f.name, f, f.type);
      const url = URL.createObjectURL(f);
      document.getElementById("prev").innerHTML = kind === "image" ? `<img class="preview-img" src="${url}" alt="preview">` : `<video class="w-100" controls src="${url}"></video>`;
    };
  },
  ytTags() {
    Omni.setHTML(`${Omni.note("Paste the video page HTML or a comma-separated keyword list. YouTube blocks live tag scraping from other sites.")}
      ${Omni.field("Source", `<textarea id="t" class="form-control" rows="8"></textarea>`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Extract</button>`)}<pre class="output" id="out"></pre>`);
    document.getElementById("go").onclick = () => {
      const t = document.getElementById("t").value;
      const kw = t.match(/<meta\s+name=["']keywords["']\s+content=["']([^"']+)/i);
      const og = [...t.matchAll(/"tag":"([^"]+)"/g)].map((m) => m[1]);
      const extra = t.split(/[,#\n]/).map((s) => s.trim()).filter((s) => s.length > 2 && s.length < 40);
      const tags = [...new Set([...(kw ? kw[1].split(",").map((s) => s.trim()) : []), ...og, ...extra])].slice(0, 40);
      document.getElementById("out").textContent = tags.join("\n") || "No tags found.";
    };
  },
  hashtags() {
    Omni.setHTML(`${Omni.field("Topic", `<input id="t" class="form-control" value="home coffee brewing">`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Generate</button>`)}<pre class="output" id="out"></pre>`);
    document.getElementById("go").onclick = () => {
      const words = document.getElementById("t").value.toLowerCase().match(/[a-z0-9]+/g) || [];
      const combos = [];
      words.forEach((w) => combos.push("#" + w));
      if (words.length > 1) combos.push("#" + words.join(""));
      for (let i = 0; i < words.length - 1; i++) combos.push("#" + words[i] + words[i + 1]);
      combos.push("#" + words.join("_"));
      document.getElementById("out").textContent = [...new Set(combos)].join(" ");
    };
  },
  socialPost() {
    Omni.setHTML(`${Omni.field("Product or topic", `<input id="t" class="form-control" value="weekend workshop">`)}
      ${Omni.field("Audience", `<input id="a" class="form-control" value="busy professionals">`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Draft posts</button>`)}<pre class="output" id="out"></pre>`);
    document.getElementById("go").onclick = () => {
      const t = document.getElementById("t").value, a = document.getElementById("a").value;
      document.getElementById("out").textContent = `Hook: Tired of guessing your next step, ${a}?\n\nBody: We built ${t} so you can ship in a single sitting. No fluff, just a checklist you can finish.\n\nCTA: Save this post and join the next session.\n\nShort: ${t} for ${a}. Start today.`;
    };
  },
  emoji() {
    const groups = {
      Smileys: "😀 😃 😄 😁 😆 😅 😂 😊 🙂 😉 😍 😘 😜 🤔 😴 😎 🥳 😇",
      Hands: "👍 👎 👏 🙌 🙏 💪 ✌️ 🤝 👋 🤞",
      Hearts: "❤️ 🧡 💛 💚 💙 💜 🖤 🤍 💔 💕",
      Nature: "🌈 ☀️ 🌙 ⭐ 🔥 💧 🌸 🍀 🐱 🐶"
    };
    Omni.setHTML(`<div id="pal"></div><input id="out" class="form-control mt-3" placeholder="Click to copy">`);
    document.getElementById("pal").innerHTML = Object.entries(groups).map(([k, v]) => `<h3 class="h6 mt-3">${k}</h3><div>${v.split(" ").map((e) => `<button class="btn btn-light m-1" data-e="${e}">${e}</button>`).join("")}</div>`).join("");
    document.getElementById("pal").onclick = (e) => {
      const em = e.target.getAttribute("data-e");
      if (!em) return;
      const out = document.getElementById("out");
      out.value += em;
      navigator.clipboard.writeText(em);
    };
  },
  twitterCount() {
    Omni.setHTML(`${Omni.field("Post", `<textarea id="t" class="form-control" rows="5"></textarea>`)}<p id="out" class="fw-bold"></p>`);
    const t = document.getElementById("t");
    const run = () => {
      const n = [...t.value].length;
      document.getElementById("out").textContent = `${n} / 280 ${n > 280 ? "— over limit" : "characters remaining " + (280 - n)}`;
    };
    t.addEventListener("input", run);
    run();
  },
  barcode() {
    Omni.setHTML(`${Omni.field("Text", `<input id="t" class="form-control" value="OMNI-1001">`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Draw Code 128</button>`)}<canvas id="cv" class="preview-canvas"></canvas>`);
    document.getElementById("go").onclick = () => {
      const text = document.getElementById("t").value;
      const patterns = code128b(text);
      const cv = document.getElementById("cv");
      const scale = 2;
      cv.width = patterns.length * scale;
      cv.height = 80;
      const ctx = cv.getContext("2d");
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.fillStyle = "#000";
      patterns.forEach((bit, i) => { if (bit === "1") ctx.fillRect(i * scale, 10, scale, 50); });
      ctx.font = "12px sans-serif";
      ctx.fillText(text, 8, 75);
    };
  },
  meme() {
    Omni.setHTML(`${Omni.dropzone("file")}
      ${Omni.field("Top text", `<input id="top" class="form-control" value="TOP TEXT">`)}
      ${Omni.field("Bottom text", `<input id="bot" class="form-control" value="BOTTOM TEXT">`)}
      <canvas id="cv" class="preview-canvas mb-3"></canvas>
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Download</button>`)}`);
    let img;
    const cv = document.getElementById("cv");
    const draw = () => {
      if (!img) return;
      cv.width = img.naturalWidth;
      cv.height = img.naturalHeight;
      const ctx = cv.getContext("2d");
      ctx.drawImage(img, 0, 0);
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = "#000";
      ctx.lineWidth = cv.width / 80;
      ctx.textAlign = "center";
      ctx.font = `bold ${Math.floor(cv.width / 10)}px Impact, sans-serif`;
      const top = document.getElementById("top").value.toUpperCase();
      const bot = document.getElementById("bot").value.toUpperCase();
      ctx.textBaseline = "top";
      ctx.strokeText(top, cv.width / 2, 16);
      ctx.fillText(top, cv.width / 2, 16);
      ctx.textBaseline = "bottom";
      ctx.strokeText(bot, cv.width / 2, cv.height - 16);
      ctx.fillText(bot, cv.width / 2, cv.height - 16);
    };
    document.getElementById("file").onchange = async (e) => { img = await Omni.loadImage(e.target.files[0]); draw(); };
    document.getElementById("top").oninput = draw;
    document.getElementById("bot").oninput = draw;
    document.getElementById("go").onclick = async () => Omni.download("meme.png", await Omni.canvasBlob(cv, "image/png"));
  },
  resume() {
    Omni.setHTML(`${Omni.field("Name", `<input id="n" class="form-control">`)}
      ${Omni.field("Title", `<input id="t" class="form-control">`)}
      ${Omni.field("Summary", `<textarea id="s" class="form-control" rows="3"></textarea>`)}
      ${Omni.field("Experience", `<textarea id="x" class="form-control" rows="4"></textarea>`)}
      ${Omni.field("Skills", `<input id="k" class="form-control">`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Preview / print</button>`)}<div id="cv" class="tool-shell"></div>`);
    document.getElementById("go").onclick = () => {
      document.getElementById("cv").innerHTML = `<h1>${document.getElementById("n").value}</h1><p><em>${document.getElementById("t").value}</em></p><h3>Summary</h3><p>${document.getElementById("s").value}</p><h3>Experience</h3><pre>${document.getElementById("x").value}</pre><h3>Skills</h3><p>${document.getElementById("k").value}</p>`;
      window.print();
    };
  },
  invoice() {
    Omni.setHTML(`${Omni.field("From", `<input id="from" class="form-control">`)}
      ${Omni.field("Bill to", `<input id="to" class="form-control">`)}
      ${Omni.field("Items (name, qty, price — one per line)", `<textarea id="items" class="form-control" rows="5">Design,1,400\nHosting,12,12</textarea>`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Build</button>`)}<div id="out" class="tool-shell"></div>`);
    document.getElementById("go").onclick = () => {
      const rows = document.getElementById("items").value.split(/\n/).map((l) => l.split(",").map((s) => s.trim())).filter((r) => r.length >= 3);
      let total = 0;
      const tr = rows.map(([n, q, p]) => { const line = (+q) * (+p); total += line; return `<tr><td>${n}</td><td>${q}</td><td>${p}</td><td>${line.toFixed(2)}</td></tr>`; }).join("");
      document.getElementById("out").innerHTML = `<h2>Invoice</h2><p>From ${document.getElementById("from").value}<br>To ${document.getElementById("to").value}</p><table class="table"><thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Line</th></tr></thead><tbody>${tr}</tbody></table><p class="fw-bold">Total ${total.toFixed(2)}</p><button class="btn btn-ink" onclick="print()">Print</button>`;
    };
  },
  bizName() {
    const a = ["Nimbus", "Cedar", "Pixel", "Harbor", "Lumen", "Forge", "Quartz", "Maple", "Orbit", "Velvet"];
    const b = ["Labs", "Works", "Studio", "Collective", "Supply", "Systems", "Garden", "Co"];
    Omni.setHTML(`${Omni.field("Keyword", `<input id="k" class="form-control" value="craft">`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Ideas</button>`)}<ul id="out"></ul>`);
    document.getElementById("go").onclick = () => {
      const k = document.getElementById("k").value;
      const names = new Set();
      for (let i = 0; i < 12; i++) names.add(a[i % a.length] + k.charAt(0).toUpperCase() + k.slice(1) + " " + b[i % b.length]);
      names.add(k + "ly");
      names.add("The " + k + " Room");
      document.getElementById("out").innerHTML = [...names].map((n) => `<li>${n}</li>`).join("");
    };
  },
  lottery() {
    Omni.setHTML(`${Omni.field("Count", `<input id="n" class="form-control" type="number" value="6">`)}
      ${Omni.field("Min", `<input id="min" class="form-control" type="number" value="1">`)}
      ${Omni.field("Max", `<input id="max" class="form-control" type="number" value="49">`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Draw</button>`)}<pre class="output" id="out"></pre>`);
    document.getElementById("go").onclick = () => {
      const n = +document.getElementById("n").value, min = +document.getElementById("min").value, max = +document.getElementById("max").value;
      const pool = [];
      for (let i = min; i <= max; i++) pool.push(i);
      const pick = [];
      while (pick.length < n && pool.length) pick.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
      document.getElementById("out").textContent = pick.sort((a, b) => a - b).join(" • ");
    };
  },
  coin() {
    Omni.setHTML(`${Omni.btnRow(`<button class="btn btn-teal btn-lg" id="go">Flip</button>`)}<p class="display-4" id="out">—</p>`);
    document.getElementById("go").onclick = () => (document.getElementById("out").textContent = Math.random() < 0.5 ? "Heads" : "Tails");
  },
  randomNum() {
    Omni.setHTML(`${Omni.field("Min", `<input id="min" class="form-control" type="number" value="1">`)}
      ${Omni.field("Max", `<input id="max" class="form-control" type="number" value="100">`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Generate</button>`)}<p class="display-5" id="out"></p>`);
    document.getElementById("go").onclick = () => {
      const min = +document.getElementById("min").value, max = +document.getElementById("max").value;
      document.getElementById("out").textContent = Math.floor(Math.random() * (max - min + 1)) + min;
    };
  },
  dice() {
    Omni.setHTML(`${Omni.field("Dice (e.g. 2d6)", `<input id="n" class="form-control" value="2d6">`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Roll</button>`)}<pre class="output" id="out"></pre>`);
    document.getElementById("go").onclick = () => {
      const m = document.getElementById("n").value.match(/(\d+)d(\d+)/i);
      if (!m) return alert("Use NdS such as 3d20");
      const rolls = [];
      for (let i = 0; i < +m[1]; i++) rolls.push(1 + Math.floor(Math.random() * +m[2]));
      document.getElementById("out").textContent = rolls.join(" + ") + " = " + rolls.reduce((a, b) => a + b, 0);
    };
  },
  speedTest() {
    Omni.setHTML(`${Omni.note("Downloads a public CDN file to estimate throughput. Results vary.")}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Run test</button>`)}<pre class="output" id="out"></pre>`);
    document.getElementById("go").onclick = async () => {
      const url = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css?cache=" + Date.now();
      const t0 = performance.now();
      const res = await fetch(url, { cache: "no-store" });
      const buf = await res.arrayBuffer();
      const ms = performance.now() - t0;
      const mb = buf.byteLength / 1e6;
      const mbps = (mb * 8) / (ms / 1000);
      document.getElementById("out").textContent = `${mb.toFixed(2)} MB in ${ms.toFixed(0)} ms\n≈ ${mbps.toFixed(2)} Mbps`;
    };
  },
  planner() {
    Omni.setHTML(`${Omni.field("Date", `<input id="d" class="form-control" type="date">`)}
      ${Omni.field("Tasks (one per line with optional HH:MM prefix)", `<textarea id="t" class="form-control" rows="8">09:00 Deep work\n12:00 Lunch\n14:00 Reviews</textarea>`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Print planner</button>`)}<div id="out" class="tool-shell"></div>`);
    document.getElementById("go").onclick = () => {
      document.getElementById("out").innerHTML = `<h2>Plan — ${document.getElementById("d").value || "today"}</h2><ul>${document.getElementById("t").value.split(/\n/).filter(Boolean).map((l) => `<li>${l}</li>`).join("")}</ul>`;
      print();
    };
  },
  wedding() {
    Omni.setHTML(`${Omni.field("Names", `<input id="n" class="form-control" value="Ava & Milo">`)}
      ${Omni.field("Date & place", `<input id="d" class="form-control" value="12 Oct 2027 · Hill Garden">`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Preview</button>`)}<div id="card" class="tool-shell text-center py-5" style="background:#f7e4d4;font-family:Georgia,serif"></div>`);
    document.getElementById("go").onclick = () => {
      document.getElementById("card").innerHTML = `<p class="small">Together with their families</p><h1>${document.getElementById("n").value}</h1><p>invite you to celebrate</p><p class="fw-bold">${document.getElementById("d").value}</p>`;
    };
  },
  plot() {
    const who = ["a cartographer", "a retired chef", "a radio intern", "an archivist"];
    const want = ["to reopen a closed railway", "to hide a family recipe", "to decode a nightly signal", "to save a failing orchard"];
    const but = ["a rival already bought the land", "memory is unreliable", "the signal is classified", "frost comes early"];
    Omni.setHTML(`${Omni.btnRow(`<button class="btn btn-teal" id="go">New plot</button>`)}<pre class="output" id="out"></pre>`);
    document.getElementById("go").onclick = () => {
      const pick = (a) => a[Math.floor(Math.random() * a.length)];
      document.getElementById("out").textContent = `When ${pick(who)} tries ${pick(want)}, ${pick(but)}. Twist: the antagonist is trying to protect the same thing.`;
    };
  },
  ebook() {
    Omni.setHTML(`${Omni.field("Title", `<input id="t" class="form-control">`)}
      ${Omni.field("Chapters (use a blank line between chapters, first line is the heading)", `<textarea id="c" class="form-control" rows="10">Intro\nHello reader.\n\nChapter 1\nIt began at dusk.</textarea>`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Print book</button>`)}<div id="out"></div>`);
    document.getElementById("go").onclick = () => {
      const parts = document.getElementById("c").value.split(/\n\s*\n/);
      document.getElementById("out").innerHTML = `<h1>${document.getElementById("t").value}</h1>` + parts.map((p) => {
        const [h, ...rest] = p.split(/\n/);
        return `<h2>${h}</h2><p>${rest.join(" ")}</p>`;
      }).join("");
      print();
    };
  },
  chatbot() {
    Omni.setHTML(`<div id="log" class="output-box p-3 mb-3" style="min-height:200px"></div>
      <div class="input-group"><input id="q" class="form-control" placeholder="Ask about these tools…"><button class="btn btn-teal" id="go">Send</button></div>`);
    const log = document.getElementById("log");
    const reply = (q) => {
      q = q.toLowerCase();
      if (/hello|hi/.test(q)) return "Hello. I am a demo bot. Ask me where a tool lives.";
      if (/bmi/.test(q)) return "BMI is under Math & Calculators.";
      if (/json/.test(q)) return "JSON Formatter is a Developer tool.";
      if (/ad|adsense/.test(q)) return "Ad slots are placeholders in the sidebar and footer.";
      return "I only know this site’s categories. Try naming a tool, or browse the home grid.";
    };
    document.getElementById("go").onclick = () => {
      const q = document.getElementById("q").value;
      log.innerHTML += `<div><strong>You:</strong> ${q}</div><div class="mb-2">${reply(q)}</div>`;
      document.getElementById("q").value = "";
    };
  },
  ipTrack() {
    Omni.setHTML(`${Omni.btnRow(`<button class="btn btn-teal" id="go">Track now</button>`)}<pre class="output" id="out"></pre>`);
    document.getElementById("go").onclick = async () => {
      const d = await (await fetch("https://ipapi.co/json/")).json();
      const hist = JSON.parse(localStorage.getItem("omni-ip-hist") || "[]");
      hist.unshift({ t: new Date().toISOString(), ip: d.ip, city: d.city });
      localStorage.setItem("omni-ip-hist", JSON.stringify(hist.slice(0, 20)));
      document.getElementById("out").textContent = JSON.stringify({ current: d, history: hist }, null, 2);
    };
  },
  fakeAddress() {
    const streets = ["Oak Lane", "Cedar Street", "Harbor Road", "Maple Court"];
    const cities = [["Portland", "OR", "97201"], ["Austin", "TX", "78701"], ["Leeds", "LS1", "UK-LS1"]];
    Omni.setHTML(`${Omni.btnRow(`<button class="btn btn-teal" id="go">Generate</button>`)}<pre class="output" id="out"></pre>`);
    document.getElementById("go").onclick = () => {
      const s = streets[Math.floor(Math.random() * streets.length)];
      const c = cities[Math.floor(Math.random() * cities.length)];
      const n = 10 + Math.floor(Math.random() * 90);
      document.getElementById("out").textContent = `${n} ${s}\n${c[0]}, ${c[1]} ${c[2]}\n(for UI testing only)`;
    };
  },
  electric() {
    Omni.setHTML(`${Omni.field("kWh used", `<input id="k" class="form-control" type="number" value="240">`)}
      ${Omni.field("Rate per kWh", `<input id="r" class="form-control" type="number" value="12" step="0.1">`)}
      ${Omni.field("Fixed charge", `<input id="f" class="form-control" type="number" value="50">`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Estimate</button>`)}<pre class="output" id="out"></pre>`);
    document.getElementById("go").onclick = () => {
      const k = +document.getElementById("k").value, r = +document.getElementById("r").value, f = +document.getElementById("f").value;
      document.getElementById("out").textContent = `Energy ${(k * r).toFixed(2)}\nFixed ${f.toFixed(2)}\nTotal ${(k * r + f).toFixed(2)}`;
    };
  },
  leap() {
    Omni.setHTML(`${Omni.field("Year", `<input id="y" class="form-control" type="number" value="2024">`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Check</button>`)}<p id="out" class="fs-4"></p>`);
    document.getElementById("go").onclick = () => {
      const y = +document.getElementById("y").value;
      const leap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
      document.getElementById("out").textContent = leap ? y + " is a leap year" : y + " is not a leap year";
    };
  },
  numerology() {
    Omni.setHTML(`${Omni.field("Name", `<input id="n" class="form-control" value="Ada Lovelace">`)}
      ${Omni.btnRow(`<button class="btn btn-teal" id="go">Calculate</button>`)}<pre class="output" id="out"></pre>`);
    document.getElementById("go").onclick = () => {
      const map = "abcdefghijklmnopqrstuvwxyz";
      const digits = [...document.getElementById("n").value.toLowerCase()].map((ch) => {
        const i = map.indexOf(ch);
        return i < 0 ? 0 : (i % 9) + 1;
      });
      let sum = digits.reduce((a, b) => a + b, 0);
      const total = sum;
      while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) sum = String(sum).split("").reduce((a, b) => a + +b, 0);
      document.getElementById("out").textContent = `Expression number: ${sum}\nDigit sum before reduction: ${total}`;
    };
  }
});

function code128b(text) {
  const patterns = ["11011001100","11001101100","11001100110","10010011000","10010001100","10001001100","10011001000","10011000100","10001100100","11001001000","11001000100","11000100100","10110011100","10011011100","10011001110","10111001100","10011101100","10011100110","11001110010","11001011100","11001001110","11011100100","11001110100","11101101110","11101001100","11100101100","11100100110","11101100100","11100110100","11100110010","11011011000","11011000110","11000110110","10100011000","10001011000","10001000110","10110001000","10001101000","10001100010","11010001000","11000101000","11000100010","10110111000","10110001110","10001101110","10111011000","10111000110","10001110110","11101110110","11010001110","11000101110","11011101000","11011100010","11011101110","11101011000","11101000110","11100010110","11101101000","11101100010","11100011010","11101111010","11001000010","11110001010","10100110000","10100001100","10010110000","10010000110","10000101100","10000100110","10110010000","10110000100","10011010000","10011000010","10000110100","10000110010","11000010010","11001010000","11110111010","11000010100","10001111010","10100111100","10010111100","10010011110","10111100100","10011110100","10011110010","11110100100","11110010100","11110010010","11011011110","11011110110","11110110110","10101111000","10100011110","10001011110","10111101000","10111100010","11110101000","11110100010","10111011110","10111101110","11101011110","11110101110","11010000100","11010010000","11010011100","1100011101011"];
  const start = 104, stop = 106;
  let checksum = start;
  const codes = [start];
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i) - 32;
    codes.push(code);
    checksum += code * (i + 1);
  }
  codes.push(checksum % 103, stop);
  return codes.map((c) => patterns[c] || "").join("").split("");
}
