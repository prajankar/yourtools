(function () {
  const $ = (sel, el) => (el || document).querySelector(sel);
  const $$ = (sel, el) => [...(el || document).querySelectorAll(sel)];

  function download(filename, data, type) {
    const blob = data instanceof Blob ? data : new Blob([data], { type: type || "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1500);
  }

  async function copyText(text) {
    await navigator.clipboard.writeText(text);
  }

  function field(label, inner) {
    return `<div class="mb-3"><label class="form-label">${label}</label>${inner}</div>`;
  }

  function btnRow(buttons) {
    return `<div class="d-flex flex-wrap gap-2 mb-3">${buttons}</div>`;
  }

  function loadImage(file) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = reject;
      img.src = url;
    });
  }

  function drawImage(img, w, h) {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    c.getContext("2d").drawImage(img, 0, 0, w, h);
    return c;
  }

  async function canvasBlob(canvas, type, quality) {
    return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
  }

  window.Omni = {
    $, $$, download, copyText, loadImage, drawImage, canvasBlob, field, btnRow,

    setHTML(html) {
      document.getElementById("tool-root").innerHTML = html;
    },

    note(text) {
      return `<p class="notice mb-3">${text}</p>`;
    },

    dropzone(id) {
      return `<label class="dropzone d-block mb-3" for="${id}">Drop a file or click to choose<input class="hidden-file" id="${id}" type="file"></label>`;
    },

    bindCopy(btn, getText) {
      btn.addEventListener("click", async () => {
        await copyText(getText());
        btn.textContent = "Copied";
        setTimeout(() => (btn.textContent = "Copy"), 1200);
      });
    }
  };
})();

/* GIF encoder (GIF89a, 256-color, looping) */
window.OmniGif = (function () {
  function lzw(pixels, minCode) {
    const clear = 1 << minCode;
    const end = clear + 1;
    let codeSize = minCode + 1;
    let next = end + 1;
    const dict = new Map();
    const out = [];
    let buf = 0;
    let bits = 0;
    function emit(code) {
      buf |= code << bits;
      bits += codeSize;
      while (bits >= 8) {
        out.push(buf & 255);
        buf >>= 8;
        bits -= 8;
      }
    }
    emit(clear);
    let w = [pixels[0]];
    for (let i = 1; i < pixels.length; i++) {
      const k = pixels[i];
      const wk = w.concat(k);
      const key = wk.join(",");
      if (dict.has(key)) w = wk;
      else {
        const wkey = w.join(",");
        emit(w.length === 1 ? w[0] : dict.get(wkey));
        if (next < 4096) {
          dict.set(key, next++);
          if (next >= 1 << codeSize && codeSize < 12) codeSize++;
        } else {
          emit(clear);
          dict.clear();
          next = end + 1;
          codeSize = minCode + 1;
        }
        w = [k];
      }
    }
    emit(w.length === 1 ? w[0] : dict.get(w.join(",")));
    emit(end);
    if (bits) out.push(buf & 255);
    return out;
  }

  function quantize(data) {
    const colors = [[0, 0, 0]];
    const map = new Map([["0,0,0", 0]]);
    const idx = new Uint8Array(data.length / 4);
    for (let i = 0, p = 0; i < data.length; i += 4, p++) {
      const r = data[i] & 248;
      const g = data[i + 1] & 248;
      const b = data[i + 2] & 248;
      const key = r + "," + g + "," + b;
      let id = map.get(key);
      if (id === undefined) {
        if (colors.length < 256) {
          id = colors.length;
          colors.push([r, g, b]);
          map.set(key, id);
        } else id = 0;
      }
      idx[p] = id;
    }
    while (colors.length < 256) colors.push([0, 0, 0]);
    return { colors, idx };
  }

  return {
    encode(frames, delayCs) {
      const w = frames[0].width;
      const h = frames[0].height;
      const bytes = [71, 73, 70, 56, 57, 97, w & 255, w >> 8, h & 255, h >> 8, 0x70, 0, 0];
      bytes.push(33, 255, 11, 78, 69, 84, 83, 67, 65, 80, 69, 50, 46, 48, 3, 1, 0, 0, 0);
      frames.forEach((canvas) => {
        const ctx = canvas.getContext("2d");
        const { colors, idx } = quantize(ctx.getImageData(0, 0, w, h).data);
        bytes.push(33, 249, 4, 4, delayCs & 255, delayCs >> 8, 0, 0);
        bytes.push(44, 0, 0, 0, 0, w & 255, w >> 8, h & 255, h >> 8, 0x87);
        colors.forEach((c) => bytes.push(c[0], c[1], c[2]));
        const compressed = lzw(idx, 8);
        bytes.push(8);
        for (let i = 0; i < compressed.length; i += 255) {
          const chunk = compressed.slice(i, i + 255);
          bytes.push(chunk.length, ...chunk);
        }
        bytes.push(0);
      });
      bytes.push(59);
      return new Blob([new Uint8Array(bytes)], { type: "image/gif" });
    }
  };
})();

/* Minimal single-image or multi-image PDF */
window.OmniPdf = {
  fromCanvases(canvases) {
    return this._build(canvases);
  },
  _build(canvases) {
    const chunks = [];
    function strBuf(s) {
      const u = new Uint8Array(s.length);
      for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i);
      return u;
    }
    const parts = [];
    const offsets = [];
    function addObj(num, contentBytes) {
      offsets[num] = parts.reduce((a, b) => a + b.length, 0);
      const header = strBuf(`${num} 0 obj\n`);
      const footer = strBuf("\nendobj\n");
      parts.push(header, contentBytes, footer);
    }
    const pageNums = [];
    canvases.forEach((c, i) => {
      const dataUrl = c.toDataURL("image/jpeg", 0.85);
      const bin = atob(dataUrl.split(",")[1]);
      const img = new Uint8Array(bin.length);
      for (let n = 0; n < bin.length; n++) img[n] = bin.charCodeAt(n);
      const imgNum = 10 + i * 3;
      const contentNum = imgNum + 1;
      const pageNum = imgNum + 2;
      pageNums.push(pageNum);
      const streamHead = `<< /Type /XObject /Subtype /Image /Width ${c.width} /Height ${c.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${img.length} >>\nstream\n`;
      const streamTail = "\nendstream";
      const imgObj = new Uint8Array(streamHead.length + img.length + streamTail.length);
      imgObj.set(strBuf(streamHead), 0);
      imgObj.set(img, streamHead.length);
      imgObj.set(strBuf(streamTail), streamHead.length + img.length);
      addObj(imgNum, imgObj);
      const content = `<< /Length ${24 + String(c.width).length + String(c.height).length} >>\nstream\nq ${c.width} 0 0 ${c.height} 0 0 cm /Im${i} Do Q\nendstream`;
      addObj(contentNum, strBuf(content));
      addObj(pageNum, strBuf(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${c.width} ${c.height}] /Resources << /XObject << /Im${i} ${imgNum} 0 R >> >> /Contents ${contentNum} 0 R >>`));
    });
    addObj(2, strBuf(`<< /Type /Pages /Kids [${pageNums.map((n) => n + " 0 R").join(" ")}] /Count ${pageNums.length} >>`));
    addObj(1, strBuf("<< /Type /Catalog /Pages 2 0 R >>"));
    const header = strBuf("%PDF-1.3\n");
    const bodyLen = header.length + parts.reduce((a, b) => a + b.length, 0);
    const xrefPos = bodyLen;
    let xref = "xref\n0 1\n0000000000 65535 f \n";
    const maxObj = Math.max(...Object.keys(offsets).map(Number));
    /* write full xref from 1 */
    const allNums = Object.keys(offsets).map(Number).sort((a, b) => a - b);
    let xrefStr = `xref\n0 ${maxObj + 1}\n0000000000 65535 f \n`;
    for (let i = 1; i <= maxObj; i++) {
      const off = offsets[i] != null ? offsets[i] + header.length : 0;
      xrefStr += String(off).padStart(10, "0") + " 00000 n \n";
    }
    const trailer = `trailer\n<< /Size ${maxObj + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF`;
    const out = new Uint8Array(bodyLen + xrefStr.length + trailer.length);
    let p = 0;
    function put(u) {
      out.set(u, p);
      p += u.length;
    }
    put(header);
    parts.forEach(put);
    put(strBuf(xrefStr));
    put(strBuf(trailer));
    return new Blob([out], { type: "application/pdf" });
  }
};

window.md5 = function (str) {
  function cmn(q, a, b, x, s, t) {
    a = (a + q + x + t) | 0;
    return (((a << s) | (a >>> (32 - s))) + b) | 0;
  }
  function ff(a, b, c, d, x, s, t) {
    return cmn((b & c) | (~b & d), a, b, x, s, t);
  }
  function gg(a, b, c, d, x, s, t) {
    return cmn((b & d) | (c & ~d), a, b, x, s, t);
  }
  function hh(a, b, c, d, x, s, t) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function ii(a, b, c, d, x, s, t) {
    return cmn(c ^ (b | ~d), a, b, x, s, t);
  }
  function toUtf8(s) {
    return unescape(encodeURIComponent(s));
  }
  const msg = toUtf8(str);
  const n = msg.length;
  const words = [];
  for (let i = 0; i < n; i++) words[i >> 2] |= msg.charCodeAt(i) << ((i % 4) * 8);
  words[n >> 2] |= 0x80 << ((n % 4) * 8);
  const len = ((n + 8) >> 6) + 1;
  words[len * 16 - 2] = n * 8;
  let a = 1732584193,
    b = -271733879,
    c = -1732584194,
    d = 271733878;
  for (let i = 0; i < words.length; i += 16) {
    const oa = a,
      ob = b,
      oc = c,
      od = d;
    const w = [];
    for (let j = 0; j < 16; j++) w[j] = words[i + j] | 0;
    a = ff(a, b, c, d, w[0], 7, -680876936);
    d = ff(d, a, b, c, w[1], 12, -389564586);
    c = ff(c, d, a, b, w[2], 17, 606105819);
    b = ff(b, c, d, a, w[3], 22, -1044525330);
    a = ff(a, b, c, d, w[4], 7, -176418897);
    d = ff(d, a, b, c, w[5], 12, 1200080426);
    c = ff(c, d, a, b, w[6], 17, -1473231341);
    b = ff(b, c, d, a, w[7], 22, -45705983);
    a = ff(a, b, c, d, w[8], 7, 1770035416);
    d = ff(d, a, b, c, w[9], 12, -1958414417);
    c = ff(c, d, a, b, w[10], 17, -42063);
    b = ff(b, c, d, a, w[11], 22, -1990404162);
    a = ff(a, b, c, d, w[12], 7, 1804603682);
    d = ff(d, a, b, c, w[13], 12, -40341101);
    c = ff(c, d, a, b, w[14], 17, -1502002290);
    b = ff(b, c, d, a, w[15], 22, 1236535329);
    a = gg(a, b, c, d, w[1], 5, -165796510);
    d = gg(d, a, b, c, w[6], 9, -1069501632);
    c = gg(c, d, a, b, w[11], 14, 643717713);
    b = gg(b, c, d, a, w[0], 20, -373897302);
    a = gg(a, b, c, d, w[5], 5, 701558691);
    d = gg(d, a, b, c, w[10], 9, -660478335);
    c = gg(c, d, a, b, w[15], 14, -405537848);
    b = gg(b, c, d, a, w[4], 20, 76029189);
    a = gg(a, b, c, d, w[9], 5, -268488499);
    d = gg(d, a, b, c, w[14], 9, 1700485571);
    c = gg(c, d, a, b, w[3], 14, -1094730640);
    b = gg(b, c, d, a, w[8], 20, -57434055);
    a = gg(a, b, c, d, w[13], 5, 530742520);
    d = gg(d, a, b, c, w[2], 9, -995338651);
    c = gg(c, d, a, b, w[7], 14, -198630844);
    b = gg(b, c, d, a, w[12], 20, 1126891415);
    a = hh(a, b, c, d, w[5], 4, -1416354905);
    d = hh(d, a, b, c, w[8], 11, -57434055);
    c = hh(c, d, a, b, w[11], 16, 1163530241);
    /* remaining rounds simplified via loop below */
    a = oa;
    b = ob;
    c = oc;
    d = od;
    const ffn = [
      [ff, 0, 7, -680876936],
      [ff, 1, 12, -389564586],
      [ff, 2, 17, 606105819],
      [ff, 3, 22, -1044525330],
      [ff, 4, 7, -176418897],
      [ff, 5, 12, 1200080426],
      [ff, 6, 17, -1473231341],
      [ff, 7, 22, -45705983],
      [ff, 8, 7, 1770035416],
      [ff, 9, 12, -1958414417],
      [ff, 10, 17, -42063],
      [ff, 11, 22, -1990404162],
      [ff, 12, 7, 1804603682],
      [ff, 13, 12, -40341101],
      [ff, 14, 17, -1502002290],
      [ff, 15, 22, 1236535329],
      [gg, 1, 5, -165796510],
      [gg, 6, 9, -1069501632],
      [gg, 11, 14, 643717713],
      [gg, 0, 20, -373897302],
      [gg, 5, 5, 701558691],
      [gg, 10, 9, -660478335],
      [gg, 15, 14, -405537848],
      [gg, 4, 20, 76029189],
      [gg, 9, 5, -268488499],
      [gg, 14, 9, 1700485571],
      [gg, 3, 14, -1094730640],
      [gg, 8, 20, -57434055],
      [gg, 13, 5, 530742520],
      [gg, 2, 9, -995338651],
      [gg, 7, 14, -198630844],
      [gg, 12, 20, 1126891415],
      [hh, 5, 4, -1416354905],
      [hh, 8, 11, -57434055],
      [hh, 11, 16, 1163530241],
      [hh, 14, 23, -1444681467],
      [hh, 1, 4, -51403784],
      [hh, 4, 11, 1735328473],
      [hh, 7, 16, -1926607734],
      [hh, 10, 23, -378558],
      [hh, 13, 4, -2022574463],
      [hh, 0, 11, 1839030562],
      [hh, 3, 16, -35309556],
      [hh, 6, 23, -1530992060],
      [hh, 9, 4, 1272893353],
      [hh, 12, 11, -155497632],
      [hh, 15, 16, -1094730640],
      [hh, 2, 23, 681279174],
      [ii, 0, 6, -198630844],
      [ii, 7, 10, 1126891415],
      [ii, 14, 15, -1416354905],
      [ii, 5, 21, -57434055],
      [ii, 12, 6, 1700485571],
      [ii, 3, 10, -1894986606],
      [ii, 10, 15, -1051523],
      [ii, 1, 21, -2054922799],
      [ii, 8, 6, 1873313359],
      [ii, 15, 10, -30611744],
      [ii, 6, 15, -1560198380],
      [ii, 13, 21, 1309151649],
      [ii, 4, 6, -145523070],
      [ii, 11, 10, -1120210379],
      [ii, 2, 15, 718787259],
      [ii, 9, 21, -343485551]
    ];
    /* The duplicated first rounds above are discarded; run the table instead */
    a = oa;
    b = ob;
    c = oc;
    d = od;
    ffn.forEach((step, idx) => {
      const fn = step[0];
      const x = w[step[1]];
      const s = step[2];
      const t = step[3];
      const res = fn(a, b, c, d, x, s, t);
      a = d;
      d = c;
      c = b;
      b = res;
    });
    a = (a + oa) | 0;
    b = (b + ob) | 0;
    c = (c + oc) | 0;
    d = (d + od) | 0;
  }
  function rhex(n) {
    let s = "";
    for (let j = 0; j < 4; j++) s += ("0" + ((n >> (j * 8)) & 255).toString(16)).slice(-2);
    return s;
  }
  return rhex(a) + rhex(b) + rhex(c) + rhex(d);
};
