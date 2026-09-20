$root = "C:\Users\MSI\multi-tools-website"
$calls = @{
  "image-to-png" = 'Kits.imageConvert("image/png","png","PNG")'
  "image-to-jpg" = 'Kits.imageConvert("image/jpeg","jpg","JPG")'
  "image-resizer" = "Kits.imageResizer()"
  "image-compressor" = "Kits.imageCompressor()"
  "image-cropper" = "Kits.imageCropper()"
  "image-to-base64" = "Kits.imageBase64()"
  "webp-to-png" = 'Kits.imageConvert("image/png","png","PNG")'
  "gif-maker" = "Kits.gifMaker()"
  "qr-code-generator" = "Kits.qrCode()"
  "screenshot-to-pdf" = "Kits.screenshotPdf()"
  "meta-tag-generator" = "Kits.metaTags()"
  "keyword-density-checker" = "Kits.keywordDensity()"
  "sitemap-generator" = "Kits.sitemap()"
  "robots-txt-generator" = "Kits.robots()"
  "google-index-checker" = "Kits.googleIndex()"
  "domain-authority-checker" = "Kits.domainAuthority()"
  "backlink-checker" = "Kits.backlinks()"
  "page-speed-checker" = "Kits.pageSpeed()"
  "xml-sitemap-validator" = "Kits.sitemapValidate()"
  "mobile-friendly-test" = "Kits.mobileFriendly()"
  "word-counter" = 'Kits.textStats("words")'
  "character-counter" = 'Kits.textStats("chars")'
  "case-converter" = "Kits.caseConvert()"
  "plagiarism-checker" = "Kits.plagiarism()"
  "grammar-checker" = "Kits.grammar()"
  "text-to-speech" = "Kits.tts()"
  "speech-to-text" = "Kits.stt()"
  "url-encoder-decoder" = "Kits.urlCodec()"
  "fancy-text-generator" = "Kits.fancyText()"
  "random-text-generator" = "Kits.randomText()"
  "json-formatter" = "Kits.jsonFmt()"
  "html-to-markdown" = "Kits.htmlToMd()"
  "css-minifier" = "Kits.minifyCss()"
  "javascript-minifier" = "Kits.minifyJs()"
  "sql-formatter" = "Kits.sqlFmt()"
  "htaccess-redirect-generator" = "Kits.htaccess()"
  "markdown-to-html" = "Kits.mdToHtml()"
  "color-code-picker" = "Kits.colorPicker()"
  "base64-encoder-decoder" = "Kits.base64()"
  "ip-address-lookup" = "Kits.ipLookup()"
  "percentage-calculator" = "Kits.percentage()"
  "age-calculator" = "Kits.age()"
  "bmi-calculator" = "Kits.bmi()"
  "loan-emi-calculator" = "Kits.emi()"
  "scientific-calculator" = "Kits.scientific()"
  "discount-calculator" = "Kits.discount()"
  "currency-converter" = "Kits.currency()"
  "time-zone-converter" = "Kits.timeZone()"
  "binary-to-decimal" = "Kits.bases()"
  "tip-calculator" = "Kits.tip()"
  "length-converter" = 'Kits.linearUnits({meter:1,kilometer:1000,centimeter:0.01,millimeter:0.001,inch:0.0254,foot:0.3048,yard:0.9144,mile:1609.344},"length")'
  "weight-converter" = 'Kits.linearUnits({kilogram:1,gram:0.001,milligram:1e-6,pound:0.45359237,ounce:0.028349523125,ton:1000},"mass")'
  "speed-converter" = 'Kits.linearUnits({"m/s":1,"km/h":1/3.6,mph:0.44704,knot:0.514444},"speed")'
  "temperature-converter" = "Kits.temperature()"
  "volume-converter" = 'Kits.linearUnits({liter:1,milliliter:0.001,"cubic meter":1000,gallon:3.78541,cup:0.236588,pint:0.473176},"volume")'
  "data-storage-converter" = 'Kits.linearUnits({byte:1,bit:0.125,KB:1000,MB:1e6,GB:1e9,KiB:1024,MiB:1048576,GiB:1073741824},"data")'
  "energy-converter" = 'Kits.linearUnits({joule:1,kJ:1000,cal:4.184,kcal:4184,kWh:3.6e6,BTU:1055.06},"energy")'
  "pressure-converter" = 'Kits.linearUnits({pascal:1,bar:1e5,psi:6894.76,atm:101325,torr:133.322},"pressure")'
  "fuel-efficiency-converter" = "Kits.fuel()"
  "angle-converter" = 'Kits.linearUnits({degree:1,radian:180/Math.PI,gradian:0.9,arcminute:1/60},"angle")'
  "md5-hash-generator" = "Kits.md5tool()"
  "sha256-hash-generator" = "Kits.sha256()"
  "password-generator" = "Kits.password()"
  "random-string-generator" = "Kits.randomString()"
  "url-shortener" = "Kits.urlShortener()"
  "ip-geolocation-finder" = "Kits.geoIP()"
  "ssl-certificate-checker" = "Kits.sslCheck()"
  "whois-lookup" = "Kits.whois()"
  "http-headers-checker" = "Kits.httpHeaders()"
  "privacy-policy-generator" = "Kits.privacyPolicy()"
  "youtube-thumbnail-downloader" = "Kits.ytThumb()"
  "instagram-photo-downloader" = 'Kits.localMedia("image")'
  "twitter-video-downloader" = 'Kits.localMedia("video")'
  "facebook-video-downloader" = 'Kits.localMedia("video")'
  "tiktok-video-downloader" = 'Kits.localMedia("video")'
  "youtube-tags-extractor" = "Kits.ytTags()"
  "hashtag-generator" = "Kits.hashtags()"
  "social-media-post-generator" = "Kits.socialPost()"
  "emoji-keyboard" = "Kits.emoji()"
  "twitter-character-counter" = "Kits.twitterCount()"
  "barcode-generator" = "Kits.barcode()"
  "meme-generator" = "Kits.meme()"
  "resume-builder" = "Kits.resume()"
  "invoice-generator" = "Kits.invoice()"
  "business-name-generator" = "Kits.bizName()"
  "lottery-number-generator" = "Kits.lottery()"
  "flip-a-coin" = "Kits.coin()"
  "random-number-generator" = "Kits.randomNum()"
  "dice-roller" = "Kits.dice()"
  "internet-speed-test" = "Kits.speedTest()"
  "daily-planner-creator" = "Kits.planner()"
  "wedding-invitation-generator" = "Kits.wedding()"
  "story-plot-generator" = "Kits.plot()"
  "ebook-creator" = "Kits.ebook()"
  "ai-chatbot-demo" = "Kits.chatbot()"
  "ip-address-tracker" = "Kits.ipTrack()"
  "fake-address-generator" = "Kits.fakeAddress()"
  "electric-bill-calculator" = "Kits.electric()"
  "leap-year-checker" = "Kits.leap()"
  "name-numerology-calculator" = "Kits.numerology()"
}

$data = Get-Content "$root\js\tools-data.js" -Raw
$matches = [regex]::Matches($data, 'slug: "([^"]+)", name: "([^"]+)", cat: "([^"]+)", desc: "([^"]+)"')
if ($matches.Count -lt 100) { throw "Expected 100 tools, found $($matches.Count)" }

$htmlTpl = @'
<!DOCTYPE html>
<html lang="en" data-base="../" data-tool="SLUG">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>NAME — OmniTools</title>
  <meta name="description" content="DESC">
  <meta name="keywords" content="NAME, online tool, free">
  <link rel="canonical" href="./SLUG.html">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>
  <div id="site-header"></div>
  <main class="container py-4">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="../index.html">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">NAME</li>
      </ol>
    </nav>
    <div class="ad-slot leader">Ad space — tool leaderboard (AdSense)</div>
    <div class="row g-4">
      <div class="col-lg-8">
        <article class="tool-shell">
          <h1>NAME</h1>
          <p class="text-muted">DESC Runs locally in your browser where possible.</p>
          <div id="tool-root"></div>
        </article>
      </div>
      <aside class="col-lg-4">
        <div class="ad-slot sidebar mb-4">Ad space — sidebar (AdSense)</div>
        <div class="tool-shell related">
          <h2 class="h5">Related tools</h2>
          <div id="related-tools"></div>
        </div>
      </aside>
    </div>
  </main>
  <div id="site-footer"></div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="../js/tools-data.js"></script>
  <script src="../js/common.js"></script>
  <script src="../js/helpers.js"></script>
  <script src="../js/kits.js"></script>
  <script src="../js/kits-more.js"></script>
  <script src="../js/tools/SLUG.js"></script>
</body>
</html>
'@

foreach ($m in $matches) {
  $slug = $m.Groups[1].Value
  $name = $m.Groups[2].Value
  $desc = $m.Groups[3].Value
  # wait groups: 1 slug 2 name 3 cat 4 desc
  $name = $m.Groups[2].Value
  $desc = $m.Groups[4].Value
  if (-not $calls.ContainsKey($slug)) { throw "No call for $slug" }
  $html = $htmlTpl.Replace("SLUG", $slug).Replace("NAME", $name).Replace("DESC", $desc)
  Set-Content -Path "$root\tools\$slug.html" -Value $html -Encoding UTF8
  $js = "Kits.boot(function () { $($calls[$slug]); });`r`n"
  Set-Content -Path "$root\js\tools\$slug.js" -Value $js -Encoding UTF8
}

Write-Output "Wrote $($matches.Count) tools"
