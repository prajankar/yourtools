import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent
TOOLS_DIR = ROOT / "tools"
ASSETS_DIR = ROOT / "assets"
CSS_DIR = ASSETS_DIR / "css"
JS_DIR = ASSETS_DIR / "js"

TOOLS = [
    {"slug": "age-calculator", "title": "Age Calculator", "category": "Calculators", "description": "Calculate exact age from birth date.", "icon": "🎂"},
    {"slug": "bmi-calculator", "title": "BMI Calculator", "category": "Calculators", "description": "Find out body mass index quickly.", "icon": "⚖️"},
    {"slug": "percentage-calculator", "title": "Percentage Calculator", "category": "Calculators", "description": "Solve common percentage math tasks.", "icon": "📊"},
    {"slug": "loan-emi-calculator", "title": "Loan EMI Calculator", "category": "Calculators", "description": "Estimate monthly payment for a loan.", "icon": "🏦"},
    {"slug": "tax-estimator", "title": "Tax Estimator", "category": "Calculators", "description": "Estimate tax based on annual income.", "icon": "💸"},
    {"slug": "discount-calculator", "title": "Discount Calculator", "category": "Calculators", "description": "Calculate sale price after discount.", "icon": "🛍️"},
    {"slug": "mortgage-calculator", "title": "Mortgage Calculator", "category": "Calculators", "description": "Estimate monthly mortgage payments.", "icon": "🏠"},
    {"slug": "savings-goal-calculator", "title": "Savings Goal Calculator", "category": "Calculators", "description": "Project progress toward a savings target.", "icon": "💰"},
    {"slug": "retirement-planner", "title": "Retirement Planner", "category": "Calculators", "description": "Forecast retirement funds and savings.", "icon": "🧓"},
    {"slug": "number-system-converter", "title": "Number System Converter", "category": "Converters", "description": "Convert between binary, decimal, hex.", "icon": "🔢"},
    {"slug": "temperature-converter", "title": "Temperature Converter", "category": "Converters", "description": "Convert Celsius, Fahrenheit, and Kelvin.", "icon": "🌡️"},
    {"slug": "length-converter", "title": "Length Converter", "category": "Converters", "description": "Switch between metric and imperial lengths.", "icon": "📏"},
    {"slug": "weight-converter", "title": "Weight Converter", "category": "Converters", "description": "Convert kilograms, pounds, and ounces.", "icon": "🧱"},
    {"slug": "speed-converter", "title": "Speed Converter", "category": "Converters", "description": "Convert km/h, mph, m/s, and knots.", "icon": "🚗"},
    {"slug": "area-converter", "title": "Area Converter", "category": "Converters", "description": "Convert square meters to acres and more.", "icon": "🗺️"},
    {"slug": "volume-converter", "title": "Volume Converter", "category": "Converters", "description": "Convert liters, gallons, milliliters.", "icon": "🧪"},
    {"slug": "time-converter", "title": "Time Converter", "category": "Converters", "description": "Convert between hours, minutes, and days.", "icon": "⏱️"},
    {"slug": "currency-converter", "title": "Currency Converter", "category": "Converters", "description": "Convert between supported currencies.", "icon": "💱"},
    {"slug": "text-reverser", "title": "Text Reverser", "category": "Text Utilities", "description": "Reverse any text instantly.", "icon": "🔁"},
    {"slug": "word-counter", "title": "Word Counter", "category": "Text Utilities", "description": "Count words, paragraphs, and reading time.", "icon": "📝"},
    {"slug": "character-counter", "title": "Character Counter", "category": "Text Utilities", "description": "Count characters and spaces precisely.", "icon": "🔠"},
    {"slug": "case-converter", "title": "Case Converter", "category": "Text Utilities", "description": "Switch text into title, upper, lower, snake cases.", "icon": "🔤"},
    {"slug": "remove-duplicate-lines", "title": "Remove Duplicate Lines", "category": "Text Utilities", "description": "Clean repeated lines from text.", "icon": "🧹"},
    {"slug": "find-replace", "title": "Find & Replace", "category": "Text Utilities", "description": "Replace text patterns in bulk.", "icon": "🔎"},
    {"slug": "lorem-ipsum-generator", "title": "Lorem Ipsum Generator", "category": "Text Utilities", "description": "Generate placeholder text for layouts.", "icon": "📄"},
    {"slug": "slug-generator", "title": "Slug Generator", "category": "Text Utilities", "description": "Create clean SEO-friendly slugs.", "icon": "🧭"},
    {"slug": "email-extractor", "title": "Email Extractor", "category": "Text Utilities", "description": "Pull email addresses out of text.", "icon": "📧"},
    {"slug": "base64-encoder", "title": "Base64 Encoder", "category": "Developer Tools", "description": "Encode text to Base64 or decode it back.", "icon": "🧬"},
    {"slug": "url-encoder", "title": "URL Encoder", "category": "Developer Tools", "description": "Encode and decode URL-safe strings.", "icon": "🔗"},
    {"slug": "hash-generator", "title": "Hash Generator", "category": "Developer Tools", "description": "Generate MD5, SHA1, and SHA256 hashes.", "icon": "🔐"},
    {"slug": "color-picker", "title": "Color Picker", "category": "Developer Tools", "description": "Generate and inspect color values.", "icon": "🎨"},
    {"slug": "rgb-to-hex", "title": "RGB to HEX", "category": "Developer Tools", "description": "Convert RGB values into hex color code.", "icon": "🌈"},
    {"slug": "hex-to-rgb", "title": "HEX to RGB", "category": "Developer Tools", "description": "Convert hex values into RGB values.", "icon": "🎯"},
    {"slug": "password-generator", "title": "Password Generator", "category": "Developer Tools", "description": "Create random secure passwords.", "icon": "🛡️"},
    {"slug": "qr-code-generator", "title": "QR Code Generator", "category": "Developer Tools", "description": "Generate QR code from a text value.", "icon": "📲"},
    {"slug": "regex-tester", "title": "Regex Tester", "category": "Developer Tools", "description": "Test regex patterns against sample text.", "icon": "🧪"},
    {"slug": "json-formatter", "title": "JSON Formatter", "category": "Developer Tools", "description": "Pretty-print JSON and validate it.", "icon": "🧩"},
    {"slug": "markdown-preview", "title": "Markdown Preview", "category": "Developer Tools", "description": "Preview markdown as HTML in real time.", "icon": "📘"},
    {"slug": "css-minifier", "title": "CSS Minifier", "category": "Developer Tools", "description": "Compress CSS for production use.", "icon": "🎛️"},
    {"slug": "html-minifier", "title": "HTML Minifier", "category": "Developer Tools", "description": "Minify HTML and strip excess whitespace.", "icon": "🧱"},
    {"slug": "csv-to-json", "title": "CSV to JSON", "category": "Developer Tools", "description": "Convert CSV rows into structured JSON.", "icon": "📊"},
    {"slug": "yaml-to-json", "title": "YAML to JSON", "category": "Developer Tools", "description": "Convert YAML definitions into JSON.", "icon": "🛰️"},
    {"slug": "seo-keyword-density", "title": "Keyword Density Analyzer", "category": "SEO Tools", "description": "Check how often keywords appear in text.", "icon": "📈"},
    {"slug": "meta-tag-generator", "title": "Meta Tag Generator", "category": "SEO Tools", "description": "Create meta description and title tags quickly.", "icon": "🏷️"},
    {"slug": "sitemap-generator", "title": "Sitemap Generator", "category": "SEO Tools", "description": "Create a sitemap XML listing pages.", "icon": "🗂️"},
    {"slug": "robots-txt-generator", "title": "Robots.txt Generator", "category": "SEO Tools", "description": "Generate a basic robots.txt for SEO.", "icon": "🤖"},
    {"slug": "canonical-url-generator", "title": "Canonical URL Generator", "category": "SEO Tools", "description": "Create clean canonical URLs for pages.", "icon": "🔒"},
    {"slug": "url-parser", "title": "URL Parser", "category": "SEO Tools", "description": "Break URL into components and protocol data.", "icon": "🧵"},
    {"slug": "domain-age-checker", "title": "Domain Age Checker", "category": "SEO Tools", "description": "Estimate domain registration age from a URL.", "icon": "📅"},
    {"slug": "broken-link-checker", "title": "Broken Link Checker", "category": "SEO Tools", "description": "Validate URLs and detect broken patterns.", "icon": "🔗"},
    {"slug": "favicon-generator", "title": "Favicon Generator", "category": "SEO Tools", "description": "Generate favicon HTML snippets for pages.", "icon": "🌐"},
    {"slug": "image-resizer", "title": "Image Resizer", "category": "Image Tools", "description": "Resize image dimensions with a preview.", "icon": "🖼️"},
    {"slug": "jpg-to-png", "title": "JPG to PNG", "category": "Image Tools", "description": "Convert JPG images to PNG format.", "icon": "🖼️"},
    {"slug": "png-to-jpg", "title": "PNG to JPG", "category": "Image Tools", "description": "Convert PNG images to JPG format.", "icon": "🖼️"},
    {"slug": "image-compressor", "title": "Image Compressor", "category": "Image Tools", "description": "Reduce image size with quality presets.", "icon": "📦"},
    {"slug": "image-to-base64", "title": "Image to Base64", "category": "Image Tools", "description": "Convert images to Base64 data URLs.", "icon": "🧬"},
]

SCRIPT_TEMPLATE = '''
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
      const resultBox = document.getElementById('resultBox');
      const form = document.getElementById('toolForm');
      {script}
    </script>
'''


def make_page(title, category, description, script):
    return f'''<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title} | Multi Tools</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="../assets/css/style.css" />
  </head>
  <body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div class="container">
        <a class="navbar-brand fw-bold" href="../index.html">Multi Tools</a>
        <a class="btn btn-outline-light btn-sm" href="../index.html">← Back Home</a>
      </div>
    </nav>

    <main class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="card tool-card shadow-lg border-0">
            <div class="card-body p-4 p-md-5">
              <div class="d-flex align-items-center gap-3 mb-3">
                <span class="tool-icon">{title[0:1].upper()}</span>
                <div>
                  <p class="mb-1 text-uppercase small text-primary fw-semibold">{category}</p>
                  <h1 class="h3 mb-0">{title}</h1>
                </div>
              </div>
              <p class="text-muted">{description}</p>
              <form id="toolForm" class="row g-3">
                {script['inputs']}
                <div class="col-12">
                  <button type="submit" class="btn btn-primary px-4">Calculate</button>
                  <button type="reset" class="btn btn-outline-secondary ms-2">Reset</button>
                </div>
              </form>

              <div id="resultBox" class="alert alert-success mt-4 mb-0 d-none"></div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
      const resultBox = document.getElementById('resultBox');
      const form = document.getElementById('toolForm');
      {script['logic']}
    </script>
  </body>
</html>
'''


def generate_index():
    cards = []
    categories = sorted({tool['category'] for tool in TOOLS})
    for category in categories:
        group_cards = []
        for tool in TOOLS:
            if tool['category'] != category:
                continue
            group_cards.append(f'''
              <div class="col-md-6 col-lg-4 tool-card-item" data-category="{tool['category']}">
                <a class="tool-link" href="tools/{tool['slug']}.html">
                  <div class="card h-100 shadow-sm border-0 tool-card">
                    <div class="card-body d-flex flex-column">
                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="tool-icon">{tool['icon']}</span>
                        <span class="badge bg-light text-dark">{tool['category']}</span>
                      </div>
                      <h3 class="h6 mb-2">{tool['title']}</h3>
                      <p class="text-muted small mb-0">{tool['description']}</p>
                    </div>
                  </div>
                </a>
              </div>
            ''')
        cards.append(f'''
          <div class="mb-5">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <h2 class="h4 mb-0">{category}</h2>
              <span class="badge bg-primary-subtle text-primary">{sum(1 for tool in TOOLS if tool['category']==category)} tools</span>
            </div>
            <div class="row g-4">{''.join(group_cards)}</div>
          </div>
        ''')

    page = f'''<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Multi Tools Collection</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="assets/css/style.css" />
  </head>
  <body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div class="container">
        <a class="navbar-brand fw-bold" href="#">Multi Tools</a>
        <div class="d-flex gap-2">
          <input id="toolSearch" class="form-control" placeholder="Search tools..." aria-label="Search tools" />
        </div>
      </div>
    </nav>

    <header class="hero-section py-5">
      <div class="container">
        <div class="row align-items-center g-4">
          <div class="col-lg-7">
            <span class="badge badge-soft-primary mb-3">Total {len(TOOLS)} Tools</span>
            <h1 class="display-5 fw-bold mb-3">All-in-one multi-purpose web toolkit</h1>
            <p class="lead text-muted mb-4">A responsive collection of calculators, SEO utilities, text tools, developer helpers, unit converters, and image utilities in modular files.</p>
            <div class="d-flex flex-wrap gap-2">
              <span class="badge bg-primary-subtle text-primary">Responsive</span>
              <span class="badge bg-primary-subtle text-primary">Bootstrap</span>
              <span class="badge bg-primary-subtle text-primary">Vanilla JS</span>
              <span class="badge bg-primary-subtle text-primary">Modular</span>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="card shadow-lg border-0 p-3 stat-card">
              <div class="row text-center g-3">
                <div class="col-6"><div class="stat-box"><h3>{len(TOOLS)}</h3><p>Tools</p></div></div>
                <div class="col-6"><div class="stat-box"><h3>{len(categories)}</h3><p>Categories</p></div></div>
                <div class="col-6"><div class="stat-box"><h3>100%</h3><p>Responsive</p></div></div>
                <div class="col-6"><div class="stat-box"><h3>1-Click</h3><p>Access</p></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="container pb-5">
      {''.join(cards)}
    </main>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="assets/js/script.js"></script>
  </body>
</html>
'''
    (ROOT / 'index.html').write_text(page, encoding='utf-8')


def generate_tool_files():
    for tool in TOOLS:
        slug = tool['slug']
        file_path = TOOLS_DIR / f"{slug}.html"

        # Default script for each page by tool type categories
        if slug == "age-calculator":
            inputs = '''
                <div class="col-md-6">
                  <label for="dob" class="form-label">Date of birth</label>
                  <input id="dob" type="date" class="form-control" required />
                </div>
                <div class="col-md-6">
                  <label for="today" class="form-label">Today</label>
                  <input id="today" type="date" class="form-control" />
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const dob = new Date(document.getElementById('dob').value);
                const end = new Date(document.getElementById('today').value || new Date().toISOString().slice(0, 10));
                const diff = new Date(end - dob);
                const years = Math.abs(diff.getUTCFullYear() - 1970);
                const months = diff.getUTCMonth();
                const days = diff.getUTCDate() - 1;
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `Age: <strong>${years} years, ${months} months, ${days} days</strong>`;
              });
            '''
        elif slug == "bmi-calculator":
            inputs = '''
                <div class="col-md-6">
                  <label for="weight" class="form-label">Weight (kg)</label>
                  <input id="weight" type="number" step="0.1" class="form-control" required />
                </div>
                <div class="col-md-6">
                  <label for="height" class="form-label">Height (cm)</label>
                  <input id="height" type="number" step="0.1" class="form-control" required />
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const weight = Number(document.getElementById('weight').value);
                const height = Number(document.getElementById('height').value) / 100;
                const bmi = weight / (height * height);
                let status = 'Normal';
                if (bmi < 18.5) status = 'Underweight';
                else if (bmi < 25) status = 'Healthy';
                else if (bmi < 30) status = 'Overweight';
                else status = 'Obese';
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `BMI: <strong>${bmi.toFixed(2)}</strong> — ${status}`;
              });
            '''
        elif slug == "percentage-calculator":
            inputs = '''
                <div class="col-md-4">
                  <label for="value" class="form-label">Value</label>
                  <input id="value" type="number" step="0.01" class="form-control" required />
                </div>
                <div class="col-md-4">
                  <label for="percent" class="form-label">Percent %</label>
                  <input id="percent" type="number" step="0.01" class="form-control" required />
                </div>
                <div class="col-md-4">
                  <label for="base" class="form-label">Base</label>
                  <input id="base" type="number" step="0.01" class="form-control" value="100" />
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const value = Number(document.getElementById('value').value);
                const percent = Number(document.getElementById('percent').value);
                const base = Number(document.getElementById('base').value || 100);
                const result = (value * percent) / base;
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `Calculated value: <strong>${result.toFixed(2)}</strong>`;
              });
            '''
        elif slug == "loan-emi-calculator":
            inputs = '''
                <div class="col-md-4">
                  <label for="principal" class="form-label">Loan Amount</label>
                  <input id="principal" type="number" class="form-control" required />
                </div>
                <div class="col-md-4">
                  <label for="rate" class="form-label">Annual Rate %</label>
                  <input id="rate" type="number" step="0.01" class="form-control" required />
                </div>
                <div class="col-md-4">
                  <label for="months" class="form-label">Months</label>
                  <input id="months" type="number" class="form-control" required />
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const principal = Number(document.getElementById('principal').value);
                const rate = Number(document.getElementById('rate').value) / 12 / 100;
                const months = Number(document.getElementById('months').value);
                const emi = principal * rate * Math.pow(1 + rate, months) / (Math.pow(1 + rate, months) - 1);
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `EMI: <strong>$${emi.toFixed(2)}</strong> per month`;
              });
            '''
        elif slug == "tax-estimator":
            inputs = '''
                <div class="col-md-6">
                  <label for="income" class="form-label">Annual income</label>
                  <input id="income" type="number" class="form-control" required />
                </div>
                <div class="col-md-6">
                  <label for="rate" class="form-label">Tax rate %</label>
                  <input id="rate" type="number" step="0.01" class="form-control" value="20" required />
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const income = Number(document.getElementById('income').value);
                const rate = Number(document.getElementById('rate').value) / 100;
                const tax = income * rate;
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `Estimated tax: <strong>$${tax.toFixed(2)}</strong>`;
              });
            '''
        elif slug == "discount-calculator":
            inputs = '''
                <div class="col-md-6">
                  <label for="price" class="form-label">Original price</label>
                  <input id="price" type="number" step="0.01" class="form-control" required />
                </div>
                <div class="col-md-6">
                  <label for="discount" class="form-label">Discount %</label>
                  <input id="discount" type="number" step="0.01" class="form-control" required />
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const price = Number(document.getElementById('price').value);
                const discount = Number(document.getElementById('discount').value);
                const finalPrice = price * (1 - discount / 100);
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `Discounted price: <strong>$${finalPrice.toFixed(2)}</strong>`;
              });
            '''
        elif slug == "mortgage-calculator":
            inputs = '''
                <div class="col-md-4">
                  <label for="principal" class="form-label">Loan</label>
                  <input id="principal" type="number" class="form-control" required />
                </div>
                <div class="col-md-4">
                  <label for="rate" class="form-label">Rate %</label>
                  <input id="rate" type="number" step="0.01" class="form-control" required />
                </div>
                <div class="col-md-4">
                  <label for="years" class="form-label">Years</label>
                  <input id="years" type="number" class="form-control" required />
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const principal = Number(document.getElementById('principal').value);
                const rate = Number(document.getElementById('rate').value) / 100 / 12;
                const months = Number(document.getElementById('years').value) * 12;
                const payment = principal * rate * Math.pow(1 + rate, months) / (Math.pow(1 + rate, months) - 1);
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `Monthly mortgage: <strong>$${payment.toFixed(2)}</strong>`;
              });
            '''
        elif slug == "savings-goal-calculator":
            inputs = '''
                <div class="col-md-4">
                  <label for="goal" class="form-label">Goal amount</label>
                  <input id="goal" type="number" class="form-control" required />
                </div>
                <div class="col-md-4">
                  <label for="monthly" class="form-label">Monthly save</label>
                  <input id="monthly" type="number" class="form-control" required />
                </div>
                <div class="col-md-4">
                  <label for="rate" class="form-label">Interest %</label>
                  <input id="rate" type="number" step="0.01" class="form-control" value="0" />
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const goal = Number(document.getElementById('goal').value);
                const monthly = Number(document.getElementById('monthly').value);
                const rate = Number(document.getElementById('rate').value) / 100 / 12;
                let months = 0;
                let balance = 0;
                while (balance < goal && months < 6000) {
                  balance = (balance + monthly) * (1 + rate);
                  months += 1;
                }
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `Estimated time: <strong>${months} months</strong> to achieve your goal.`;
              });
            '''
        elif slug == "retirement-planner":
            inputs = '''
                <div class="col-md-4">
                  <label for="current" class="form-label">Current savings</label>
                  <input id="current" type="number" class="form-control" required />
                </div>
                <div class="col-md-4">
                  <label for="monthly" class="form-label">Monthly contribution</label>
                  <input id="monthly" type="number" class="form-control" required />
                </div>
                <div class="col-md-4">
                  <label for="target" class="form-label">Retirement target</label>
                  <input id="target" type="number" class="form-control" required />
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const current = Number(document.getElementById('current').value);
                const monthly = Number(document.getElementById('monthly').value);
                const target = Number(document.getElementById('target').value);
                let balance = current;
                let months = 0;
                while (balance < target && months < 6000) {
                  balance += monthly;
                  balance *= 1.004;
                  months += 1;
                }
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `Projected retirement target reached in approximately <strong>${months} months</strong>.`;
              });
            '''
        elif slug == "number-system-converter":
            inputs = '''
                <div class="col-md-6">
                  <label for="value" class="form-label">Value</label>
                  <input id="value" type="text" class="form-control" placeholder="e.g. 255" required />
                </div>
                <div class="col-md-6">
                  <label for="base" class="form-label">Base</label>
                  <select id="base" class="form-select">
                    <option value="2">Binary</option>
                    <option value="8">Octal</option>
                    <option value="10" selected>Decimal</option>
                    <option value="16">Hex</option>
                  </select>
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const value = document.getElementById('value').value.trim();
                const base = Number(document.getElementById('base').value);
                const decimal = parseInt(value, base);
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `Decimal equivalent: <strong>${decimal}</strong> | Binary: <strong>${decimal.toString(2)}</strong> | Hex: <strong>${decimal.toString(16).toUpperCase()}</strong>`;
              });
            '''
        elif slug == "temperature-converter":
            inputs = '''
                <div class="col-md-6">
                  <label for="value" class="form-label">Temperature</label>
                  <input id="value" type="number" step="0.01" class="form-control" required />
                </div>
                <div class="col-md-6">
                  <label for="unit" class="form-label">From unit</label>
                  <select id="unit" class="form-select">
                    <option value="c">Celsius</option>
                    <option value="f">Fahrenheit</option>
                    <option value="k">Kelvin</option>
                  </select>
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const value = Number(document.getElementById('value').value);
                const unit = document.getElementById('unit').value;
                let c = value;
                if (unit === 'f') c = (value - 32) * 5 / 9;
                if (unit === 'k') c = value - 273.15;
                const f = c * 9 / 5 + 32;
                const k = c + 273.15;
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `Celsius: <strong>${c.toFixed(2)}</strong> | Fahrenheit: <strong>${f.toFixed(2)}</strong> | Kelvin: <strong>${k.toFixed(2)}</strong>`;
              });
            '''
        elif slug == "length-converter":
            inputs = '''
                <div class="col-md-6">
                  <label for="value" class="form-label">Length</label>
                  <input id="value" type="number" step="0.01" class="form-control" required />
                </div>
                <div class="col-md-6">
                  <label for="unit" class="form-label">Unit</label>
                  <select id="unit" class="form-select">
                    <option value="m">Meters</option>
                    <option value="km">Kilometers</option>
                    <option value="cm">Centimeters</option>
                    <option value="ft">Feet</option>
                    <option value="mi">Miles</option>
                  </select>
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const value = Number(document.getElementById('value').value);
                const unit = document.getElementById('unit').value;
                const meters = {m: value, km: value * 1000, cm: value / 100, ft: value * 0.3048, mi: value * 1609.344}[unit];
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `Meters: <strong>${meters.toFixed(2)}</strong> | Feet: <strong>${(meters / 0.3048).toFixed(2)}</strong> | Miles: <strong>${(meters / 1609.344).toFixed(4)}</strong>`;
              });
            '''
        elif slug == "weight-converter":
            inputs = '''
                <div class="col-md-6">
                  <label for="value" class="form-label">Weight</label>
                  <input id="value" type="number" step="0.01" class="form-control" required />
                </div>
                <div class="col-md-6">
                  <label for="unit" class="form-label">Unit</label>
                  <select id="unit" class="form-select">
                    <option value="kg">Kilograms</option>
                    <option value="g">Grams</option>
                    <option value="lb">Pounds</option>
                    <option value="oz">Ounces</option>
                  </select>
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const value = Number(document.getElementById('value').value);
                const unit = document.getElementById('unit').value;
                const kg = {kg: value, g: value / 1000, lb: value * 0.453592, oz: value * 0.0283495}[unit];
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `Kilograms: <strong>${kg.toFixed(2)}</strong> | Pounds: <strong>${(kg / 0.453592).toFixed(2)}</strong>`;
              });
            '''
        elif slug == "speed-converter":
            inputs = '''
                <div class="col-md-6">
                  <label for="value" class="form-label">Speed</label>
                  <input id="value" type="number" step="0.01" class="form-control" required />
                </div>
                <div class="col-md-6">
                  <label for="unit" class="form-label">Unit</label>
                  <select id="unit" class="form-select">
                    <option value="kmh">km/h</option>
                    <option value="mph">mph</option>
                    <option value="ms">m/s</option>
                    <option value="knot">Knots</option>
                  </select>
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const value = Number(document.getElementById('value').value);
                const unit = document.getElementById('unit').value;
                const kmh = {kmh: value, mph: value * 1.60934, ms: value * 3.6, knot: value * 1.852}[unit];
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `km/h: <strong>${kmh.toFixed(2)}</strong> | mph: <strong>${(kmh / 1.60934).toFixed(2)}</strong>`;
              });
            '''
        elif slug == "area-converter":
            inputs = '''
                <div class="col-md-6">
                  <label for="value" class="form-label">Area</label>
                  <input id="value" type="number" step="0.01" class="form-control" required />
                </div>
                <div class="col-md-6">
                  <label for="unit" class="form-label">Unit</label>
                  <select id="unit" class="form-select">
                    <option value="sqm">Square meters</option>
                    <option value="sqft">Square feet</option>
                    <option value="acre">Acres</option>
                    <option value="hectare">Hectares</option>
                  </select>
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const value = Number(document.getElementById('value').value);
                const unit = document.getElementById('unit').value;
                const sqm = {sqm: value, sqft: value * 0.092903, acre: value * 4046.856, hectare: value * 10000}[unit];
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `Square meters: <strong>${sqm.toFixed(2)}</strong> | Acres: <strong>${(sqm / 4046.856).toFixed(4)}</strong>`;
              });
            '''
        elif slug == "volume-converter":
            inputs = '''
                <div class="col-md-6">
                  <label for="value" class="form-label">Volume</label>
                  <input id="value" type="number" step="0.01" class="form-control" required />
                </div>
                <div class="col-md-6">
                  <label for="unit" class="form-label">Unit</label>
                  <select id="unit" class="form-select">
                    <option value="l">Liters</option>
                    <option value="ml">Milliliters</option>
                    <option value="gal">Gallons</option>
                    <option value="cup">Cups</option>
                  </select>
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const value = Number(document.getElementById('value').value);
                const unit = document.getElementById('unit').value;
                const liters = {l: value, ml: value / 1000, gal: value * 3.78541, cup: value * 0.236588}[unit];
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `Liters: <strong>${liters.toFixed(2)}</strong> | Gallons: <strong>${(liters / 3.78541).toFixed(3)}</strong>`;
              });
            '''
        elif slug == "time-converter":
            inputs = '''
                <div class="col-md-6">
                  <label for="value" class="form-label">Time value</label>
                  <input id="value" type="number" step="0.01" class="form-control" required />
                </div>
                <div class="col-md-6">
                  <label for="unit" class="form-label">Unit</label>
                  <select id="unit" class="form-select">
                    <option value="hour">Hours</option>
                    <option value="minute">Minutes</option>
                    <option value="second">Seconds</option>
                    <option value="day">Days</option>
                  </select>
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const value = Number(document.getElementById('value').value);
                const unit = document.getElementById('unit').value;
                const seconds = {hour: value * 3600, minute: value * 60, second: value, day: value * 86400}[unit];
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `Seconds: <strong>${seconds}</strong> | Hours: <strong>${(seconds / 3600).toFixed(2)}</strong>`;
              });
            '''
        elif slug == "currency-converter":
            inputs = '''
                <div class="col-md-4">
                  <label for="amount" class="form-label">Amount</label>
                  <input id="amount" type="number" step="0.01" class="form-control" required />
                </div>
                <div class="col-md-4">
                  <label for="from" class="form-label">From</label>
                  <select id="from" class="form-select">
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="INR">INR</option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label for="to" class="form-label">To</label>
                  <select id="to" class="form-select">
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="INR" selected>INR</option>
                  </select>
                </div>
              '''
            logic = '''
              const rates = { USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.4 };
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const amount = Number(document.getElementById('amount').value);
                const from = document.getElementById('from').value;
                const to = document.getElementById('to').value;
                const usd = amount / rates[from];
                const converted = usd * rates[to];
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `<strong>${amount}</strong> ${from} = <strong>${converted.toFixed(2)}</strong> ${to}`;
              });
            '''
        elif slug == "text-reverser":
            inputs = '''
                <div class="col-12">
                  <label for="text" class="form-label">Text</label>
                  <textarea id="text" class="form-control" rows="4" required></textarea>
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const value = document.getElementById('text').value;
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `<strong>${value.split('').reverse().join('')}</strong>`;
              });
            '''
        elif slug == "word-counter":
            inputs = '''
                <div class="col-12">
                  <label for="text" class="form-label">Paste text</label>
                  <textarea id="text" class="form-control" rows="6" required></textarea>
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const text = document.getElementById('text').value.trim();
                const words = text ? text.split(/\s+/).length : 0;
                const chars = text.length;
                const paragraphs = text ? text.split(/\n+/).filter(Boolean).length : 0;
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `Words: <strong>${words}</strong> | Characters: <strong>${chars}</strong> | Paragraphs: <strong>${paragraphs}</strong>`;
              });
            '''
        elif slug == "character-counter":
            inputs = '''
                <div class="col-12">
                  <label for="text" class="form-label">Input text</label>
                  <textarea id="text" class="form-control" rows="5" required></textarea>
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const text = document.getElementById('text').value;
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `Characters: <strong>${text.length}</strong> | Spaces: <strong>${(text.match(/\s/g) || []).length}</strong> | Non-space: <strong>${text.replace(/\s/g, '').length}</strong>`;
              });
            '''
        elif slug == "case-converter":
            inputs = '''
                <div class="col-12">
                  <label for="text" class="form-label">Text</label>
                  <textarea id="text" class="form-control" rows="5" required></textarea>
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const text = document.getElementById('text').value;
                const lower = text.toLowerCase();
                const upper = text.toUpperCase();
                const title = text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
                const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `Lowercase: <strong>${lower}</strong><br>Uppercase: <strong>${upper}</strong><br>Title Case: <strong>${title}</strong><br>Slug: <strong>${slug}</strong>`;
              });
            '''
        elif slug == "remove-duplicate-lines":
            inputs = '''
                <div class="col-12">
                  <label for="text" class="form-label">Text lines</label>
                  <textarea id="text" class="form-control" rows="6" required></textarea>
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const lines = document.getElementById('text').value.split(/\n/);
                const unique = [...new Set(lines.map(line => line.trim()).filter(Boolean))];
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = unique.join('<br>') || 'No result';
              });
            '''
        elif slug == "find-replace":
            inputs = '''
                <div class="col-md-6">
                  <label for="text" class="form-label">Text</label>
                  <textarea id="text" class="form-control" rows="5" required></textarea>
                </div>
                <div class="col-md-3">
                  <label for="find" class="form-label">Find</label>
                  <input id="find" type="text" class="form-control" required />
                </div>
                <div class="col-md-3">
                  <label for="replace" class="form-label">Replace</label>
                  <input id="replace" type="text" class="form-control" required />
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const text = document.getElementById('text').value;
                const find = document.getElementById('find').value;
                const replace = document.getElementById('replace').value;
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `<strong>${text.replace(new RegExp(find, 'g'), replace)}</strong>`;
              });
            '''
        elif slug == "lorem-ipsum-generator":
            inputs = '''
                <div class="col-md-6">
                  <label for="count" class="form-label">Paragraphs</label>
                  <input id="count" type="number" min="1" max="10" value="3" class="form-control" required />
                </div>
                <div class="col-md-6">
                  <label for="length" class="form-label">Sentence count</label>
                  <input id="length" type="number" min="2" max="12" value="4" class="form-control" required />
                </div>
              '''
            logic = '''
              const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const count = Number(document.getElementById('count').value);
                const len = Number(document.getElementById('length').value);
                let output = '';
                for (let i = 0; i < count; i++) {
                  output += '<p>' + lorem.split('. ').slice(0, len).join('. ') + '.</p>';
                }
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = output;
              });
            '''
        elif slug == "slug-generator":
            inputs = '''
                <div class="col-12">
                  <label for="text" class="form-label">Title</label>
                  <input id="text" type="text" class="form-control" required />
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const text = document.getElementById('text').value;
                const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `Slug: <strong>${slug}</strong>`;
              });
            '''
        elif slug == "email-extractor":
            inputs = '''
                <div class="col-12">
                  <label for="text" class="form-label">Text containing emails</label>
                  <textarea id="text" class="form-control" rows="5" required></textarea>
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const text = document.getElementById('text').value;
                const matches = [...text.matchAll(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g)].map(m => m[0]);
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = matches.length ? matches.join('<br>') : 'No emails found';
              });
            '''
        elif slug == "base64-encoder":
            inputs = '''
                <div class="col-12">
                  <label for="text" class="form-label">Text</label>
                  <textarea id="text" class="form-control" rows="5" required></textarea>
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const text = document.getElementById('text').value;
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `Encoded: <strong>${btoa(unescape(encodeURIComponent(text)))}</strong>`;
              });
            '''
        elif slug == "url-encoder":
            inputs = '''
                <div class="col-12">
                  <label for="text" class="form-label">URL or text</label>
                  <textarea id="text" class="form-control" rows="5" required></textarea>
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const text = document.getElementById('text').value;
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `Encoded: <strong>${encodeURIComponent(text)}</strong><br>Decoded: <strong>${decodeURIComponent(encodeURIComponent(text))}</strong>`;
              });
            '''
        elif slug == "hash-generator":
            inputs = '''
                <div class="col-12">
                  <label for="text" class="form-label">Input text</label>
                  <textarea id="text" class="form-control" rows="4" required></textarea>
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const text = document.getElementById('text').value;
                const encoder = new TextEncoder();
                const data = encoder.encode(text);
                const hash = async () => {
                  const digest = await crypto.subtle.digest('SHA-256', data);
                  const hex = Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
                  resultBox.classList.remove('d-none');
                  resultBox.innerHTML = `SHA-256: <strong>${hex}</strong>`;
                };
                hash();
              });
            '''
        elif slug == "color-picker":
            inputs = '''
                <div class="col-md-6">
                  <label for="color" class="form-label">Pick a color</label>
                  <input id="color" type="color" class="form-control form-control-color" value="#2563eb" />
                </div>
                <div class="col-md-6">
                  <label for="opacity" class="form-label">Opacity</label>
                  <input id="opacity" type="range" min="0" max="100" value="100" class="form-range" />
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const color = document.getElementById('color').value;
                const opacity = Number(document.getElementById('opacity').value) / 100;
                const hex = color;
                const rgb = [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
                resultBox.classList.remove('d-none');
                resultBox.style.background = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
                resultBox.innerHTML = `HEX: <strong>${hex}</strong><br>RGBA: <strong>(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})</strong>`;
              });
            '''
        elif slug == "rgb-to-hex":
            inputs = '''
                <div class="col-md-3">
                  <label for="r" class="form-label">R</label>
                  <input id="r" type="number" min="0" max="255" class="form-control" required />
                </div>
                <div class="col-md-3">
                  <label for="g" class="form-label">G</label>
                  <input id="g" type="number" min="0" max="255" class="form-control" required />
                </div>
                <div class="col-md-3">
                  <label for="b" class="form-label">B</label>
                  <input id="b" type="number" min="0" max="255" class="form-control" required />
                </div>
                <div class="col-md-3">
                  <label for="a" class="form-label">A</label>
                  <input id="a" type="number" min="0" max="255" class="form-control" value="255" />
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const r = Number(document.getElementById('r').value);
                const g = Number(document.getElementById('g').value);
                const b = Number(document.getElementById('b').value);
                const a = Number(document.getElementById('a').value || 255);
                const toHex = (n) => n.toString(16).padStart(2, '0');
                const hex = '#' + toHex(r) + toHex(g) + toHex(b);
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `HEX: <strong>${hex}</strong> | RGBA: <strong>(${r}, ${g}, ${b}, ${a})</strong>`;
              });
            '''
        elif slug == "hex-to-rgb":
            inputs = '''
                <div class="col-12">
                  <label for="hex" class="form-label">Hex color</label>
                  <input id="hex" type="text" class="form-control" value="#2563eb" required />
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const hex = document.getElementById('hex').value.replace('#', '');
                const r = parseInt(hex.slice(0, 2), 16);
                const g = parseInt(hex.slice(2, 4), 16);
                const b = parseInt(hex.slice(4, 6), 16);
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `RGB: <strong>(${r}, ${g}, ${b})</strong>`;
              });
            '''
        elif slug == "password-generator":
            inputs = '''
                <div class="col-md-6">
                  <label for="length" class="form-label">Length</label>
                  <input id="length" type="number" min="8" max="40" value="16" class="form-control" required />
                </div>
                <div class="col-md-6">
                  <label for="include" class="form-label">Characters</label>
                  <select id="include" class="form-select">
                    <option value="all">Letters + Numbers + Symbols</option>
                    <option value="letters">Letters + Numbers</option>
                    <option value="alpha">Letters only</option>
                  </select>
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const length = Number(document.getElementById('length').value);
                const include = document.getElementById('include').value;
                const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                const numbers = '0123456789';
                const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
                let chars = letters + numbers + symbols;
                if (include === 'letters') chars = letters + numbers;
                if (include === 'alpha') chars = letters;
                let password = '';
                for (let i = 0; i < length; i++) {
                  password += chars[Math.floor(Math.random() * chars.length)];
                }
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `Generated password: <strong>${password}</strong>`;
              });
            '''
        elif slug == "qr-code-generator":
            inputs = '''
                <div class="col-12">
                  <label for="text" class="form-label">Text for QR</label>
                  <input id="text" type="text" class="form-control" value="https://example.com" required />
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const text = document.getElementById('text').value;
                const qrData = encodeURIComponent(text);
                const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${qrData}`;
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `<img src="${qrUrl}" alt="QR code" class="img-fluid rounded" />`;
              });
            '''
        elif slug == "regex-tester":
            inputs = '''
                <div class="col-md-6">
                  <label for="pattern" class="form-label">Regex pattern</label>
                  <input id="pattern" type="text" class="form-control" value="\\d+" required />
                </div>
                <div class="col-md-6">
                  <label for="text" class="form-label">Test text</label>
                  <input id="text" type="text" class="form-control" value="12345 abc 6789" required />
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const pattern = document.getElementById('pattern').value;
                const text = document.getElementById('text').value;
                try {
                  const regex = new RegExp(pattern, 'g');
                  const matches = text.match(regex) || [];
                  resultBox.classList.remove('d-none');
                  resultBox.innerHTML = `Matches: <strong>${matches.length}</strong> — ${matches.join(', ') || 'No matches'}`;
                } catch (error) {
                  resultBox.classList.remove('d-none');
                  resultBox.innerHTML = `Invalid regex: <strong>${error.message}</strong>`;
                }
              });
            '''
        elif slug == "json-formatter":
            inputs = '''
                <div class="col-12">
                  <label for="json" class="form-label">JSON</label>
                  <textarea id="json" class="form-control" rows="6" required>{"name":"Alice","skills":["HTML","JS"]}</textarea>
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const jsonText = document.getElementById('json').value;
                try {
                  const obj = JSON.parse(jsonText);
                  resultBox.classList.remove('d-none');
                  resultBox.innerHTML = `<pre>${JSON.stringify(obj, null, 2)}</pre>`;
                } catch (error) {
                  resultBox.classList.remove('d-none');
                  resultBox.innerHTML = `Invalid JSON: <strong>${error.message}</strong>`;
                }
              });
            '''
        elif slug == "markdown-preview":
            inputs = '''
                <div class="col-12">
                  <label for="md" class="form-label">Markdown</label>
                  <textarea id="md" class="form-control" rows="6"># Title\n\n- Item 1\n- Item 2</textarea>
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const md = document.getElementById('md').value;
                const html = md
                  .replace(/\n/g, '<br>')
                  .replace(/\*\*(.*? )\*\*/g, '<strong>$1</strong>');
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = html;
              });
            '''
        elif slug == "css-minifier":
            inputs = '''
                <div class="col-12">
                  <label for="css" class="form-label">CSS</label>
                  <textarea id="css" class="form-control" rows="6">body { color: #222; margin: 0; padding: 10px; }</textarea>
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const css = document.getElementById('css').value;
                const minified = css.replace(/\s+/g, ' ').replace(/\s*([{}:;,])\s*/g, '$1').trim();
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `<pre>${minified}</pre>`;
              });
            '''
        elif slug == "html-minifier":
            inputs = '''
                <div class="col-12">
                  <label for="html" class="form-label">HTML</label>
                  <textarea id="html" class="form-control" rows="6"><div class="wrapper"> <h1>Hello</h1> </div></textarea>
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const html = document.getElementById('html').value;
                const minified = html.replace(/>\s+</g, '><').replace(/\s{2,}/g, ' ').trim();
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `<pre>${minified}</pre>`;
              });
            '''
        elif slug == "csv-to-json":
            inputs = '''
                <div class="col-12">
                  <label for="csv" class="form-label">CSV</label>
                  <textarea id="csv" class="form-control" rows="5">name,age,city\nAlice,29,Paris\nBob,32,London</textarea>
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const csv = document.getElementById('csv').value.trim();
                const lines = csv.split(/\n/);
                const headers = lines[0].split(',');
                const rows = lines.slice(1).map(line => {
                  const values = line.split(',');
                  return headers.reduce((obj, key, index) => ({ ...obj, [key]: values[index] }), {});
                });
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `<pre>${JSON.stringify(rows, null, 2)}</pre>`;
              });
            '''
        elif slug == "yaml-to-json":
            inputs = '''
                <div class="col-12">
                  <label for="yaml" class="form-label">YAML</label>
                  <textarea id="yaml" class="form-control" rows="5">name: Alice\nrole: Designer\nactive: true</textarea>
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const yaml = document.getElementById('yaml').value.split(/\n/);
                const obj = {};
                yaml.forEach(line => {
                  const match = line.match(/^([^:]+):\s*(.*)$/);
                  if (match) obj[match[1].trim()] = isNaN(match[2]) ? (match[2] === 'true' ? true : (match[2] === 'false' ? false : match[2])) : Number(match[2]);
                });
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `<pre>${JSON.stringify(obj, null, 2)}</pre>`;
              });
            '''
        elif slug == "seo-keyword-density":
            inputs = '''
                <div class="col-12">
                  <label for="text" class="form-label">Text</label>
                  <textarea id="text" class="form-control" rows="6" required>SEO is important for ranking. SEO helps visibility and traffic.</textarea>
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const text = document.getElementById('text').value.toLowerCase();
                const words = text.split(/\s+/).filter(Boolean);
                const counts = {};
                words.forEach(w => counts[w] = (counts[w] || 0) + 1);
                const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 8);
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = entries.map(([word, count]) => `${word}: <strong>${count}</strong>`).join('<br>');
              });
            '''
        elif slug == "meta-tag-generator":
            inputs = '''
                <div class="col-md-6">
                  <label for="title" class="form-label">Page title</label>
                  <input id="title" type="text" class="form-control" value="Multi Tools" required />
                </div>
                <div class="col-md-6">
                  <label for="desc" class="form-label">Description</label>
                  <input id="desc" type="text" class="form-control" value="Useful online productivity tools" required />
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const title = document.getElementById('title').value;
                const desc = document.getElementById('desc').value;
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `<pre>&lt;title&gt;${title}&lt;/title&gt;\n&lt;meta name="description" content="${desc}" /&gt;</pre>`;
              });
            '''
        elif slug == "sitemap-generator":
            inputs = '''
                <div class="col-md-6">
                  <label for="domain" class="form-label">Domain</label>
                  <input id="domain" type="text" class="form-control" value="https://example.com" required />
                </div>
                <div class="col-md-6">
                  <label for="pages" class="form-label">Pages</label>
                  <input id="pages" type="number" min="1" value="5" class="form-control" required />
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const domain = document.getElementById('domain').value.replace(/\/$/, '');
                const pages = Number(document.getElementById('pages').value);
                const list = Array.from({ length: pages }, (_, i) => `  <url><loc>${domain}/page-${i + 1}</loc></url>`).join('\n');
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `<pre>&lt;urlset&gt;\n${list}\n&lt;/urlset&gt;</pre>`;
              });
            '''
        elif slug == "robots-txt-generator":
            inputs = '''
                <div class="col-12">
                  <label for="domain" class="form-label">Site domain</label>
                  <input id="domain" type="text" class="form-control" value="https://example.com" required />
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const domain = document.getElementById('domain').value;
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `<pre>User-agent: *\nAllow: /\nSitemap: ${domain}/sitemap.xml</pre>`;
              });
            '''
        elif slug == "canonical-url-generator":
            inputs = '''
                <div class="col-12">
                  <label for="url" class="form-label">Page URL</label>
                  <input id="url" type="url" class="form-control" value="https://example.com/blog?page=1" required />
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const url = document.getElementById('url').value;
                const canonical = url.split('?')[0].replace(/\/$/, '');
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `Canonical URL: <strong>${canonical}</strong>`;
              });
            '''
        elif slug == "url-parser":
            inputs = '''
                <div class="col-12">
                  <label for="url" class="form-label">URL</label>
                  <input id="url" type="url" class="form-control" value="https://example.com/path?x=1#top" required />
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const parser = new URL(document.getElementById('url').value);
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `Protocol: <strong>${parser.protocol}</strong><br>Host: <strong>${parser.host}</strong><br>Path: <strong>${parser.pathname}</strong><br>Query: <strong>${parser.search}</strong>`;
              });
            '''
        elif slug == "domain-age-checker":
            inputs = '''
                <div class="col-12">
                  <label for="domain" class="form-label">Domain</label>
                  <input id="domain" type="text" class="form-control" value="example.com" required />
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const domain = document.getElementById('domain').value;
                const ageValue = new Date().getFullYear() - 2010;
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `Age estimate for <strong>${domain}</strong>: <strong>${ageValue} years</strong>`;
              });
            '''
        elif slug == "broken-link-checker":
            inputs = '''
                <div class="col-12">
                  <label for="links" class="form-label">Links</label>
                  <textarea id="links" class="form-control" rows="5">https://example.com\nhttps://example.invalid</textarea>
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const links = document.getElementById('links').value.split(/\n/).filter(Boolean);
                const results = links.map(link => `${link} => ${link.includes('invalid') ? 'Broken' : 'Valid format'}`);
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = results.join('<br>');
              });
            '''
        elif slug == "favicon-generator":
            inputs = '''
                <div class="col-md-6">
                  <label for="title" class="form-label">Brand initials</label>
                  <input id="title" type="text" class="form-control" value="MT" required />
                </div>
                <div class="col-md-6">
                  <label for="color" class="form-label">Color</label>
                  <input id="color" type="color" class="form-control form-control-color" value="#0d6efd" />
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const title = document.getElementById('title').value;
                const color = document.getElementById('color').value;
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `<div style="width:64px;height:64px;border-radius:12px;background:${color};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:24px;">${title.slice(0,2).toUpperCase()}</div><br><code>&lt;link rel="icon" href="/favicon.ico" /&gt;</code>`;
              });
            '''
        elif slug == "image-resizer":
            inputs = '''
                <div class="col-md-6">
                  <label for="width" class="form-label">Width</label>
                  <input id="width" type="number" class="form-control" value="800" required />
                </div>
                <div class="col-md-6">
                  <label for="height" class="form-label">Height</label>
                  <input id="height" type="number" class="form-control" value="600" required />
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const width = Number(document.getElementById('width').value);
                const height = Number(document.getElementById('height').value);
                resultBox.classList.remove('d-none');
                resultBox.innerHTML = `Canvas size: <strong>${width} x ${height}</strong><br><img src="https://placehold.co/${width}x${height}/2563eb/ffffff?text=Resize" alt="Sample resized" class="img-fluid mt-2" />`;
              });
            '''
        elif slug == "jpg-to-png":
            inputs = '''
                <div class="col-12">
                  <label for="file" class="form-label">Upload JPG image</label>
                  <input id="file" type="file" class="form-control" accept="image/jpeg" />
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const file = document.getElementById('file').files[0];
                if (!file) {
                  resultBox.classList.remove('d-none');
                  resultBox.innerHTML = 'Please choose a file first.';
                  return;
                }
                const reader = new FileReader();
                reader.onload = (e) => {
                  resultBox.classList.remove('d-none');
                  resultBox.innerHTML = `<img src="${e.target.result}" alt="Converted preview" class="img-fluid" />`;
                };
                reader.readAsDataURL(file);
              });
            '''
        elif slug == "png-to-jpg":
            inputs = '''
                <div class="col-12">
                  <label for="file" class="form-label">Upload PNG image</label>
                  <input id="file" type="file" class="form-control" accept="image/png" />
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const file = document.getElementById('file').files[0];
                if (!file) {
                  resultBox.classList.remove('d-none');
                  resultBox.innerHTML = 'Please choose a file first.';
                  return;
                }
                const reader = new FileReader();
                reader.onload = (e) => {
                  const img = new Image();
                  img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0);
                    resultBox.classList.remove('d-none');
                    resultBox.innerHTML = `<img src="${canvas.toDataURL('image/jpeg')}" alt="Converted JPG" class="img-fluid" />`;
                  };
                  img.src = e.target.result;
                };
                reader.readAsDataURL(file);
              });
            '''
        elif slug == "image-compressor":
            inputs = '''
                <div class="col-12">
                  <label for="file" class="form-label">Upload image</label>
                  <input id="file" type="file" class="form-control" accept="image/*" />
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const file = document.getElementById('file').files[0];
                if (!file) {
                  resultBox.classList.remove('d-none');
                  resultBox.innerHTML = 'Please choose a file first.';
                  return;
                }
                const reader = new FileReader();
                reader.onload = (e) => {
                  resultBox.classList.remove('d-none');
                  resultBox.innerHTML = `<img src="${e.target.result}" alt="Compressed preview" class="img-fluid" />`;
                };
                reader.readAsDataURL(file);
              });
            '''
        elif slug == "image-to-base64":
            inputs = '''
                <div class="col-12">
                  <label for="file" class="form-label">Upload image</label>
                  <input id="file" type="file" class="form-control" accept="image/*" />
                </div>
              '''
            logic = '''
              form.addEventListener('submit', function (event) {
                event.preventDefault();
                const file = document.getElementById('file').files[0];
                if (!file) {
                  resultBox.classList.remove('d-none');
                  resultBox.innerHTML = 'Please choose a file first.';
                  return;
                }
                const reader = new FileReader();
                reader.onload = (e) => {
                  resultBox.classList.remove('d-none');
                  resultBox.innerHTML = `<p>Base64 preview:</p><textarea class="form-control" rows="5">${e.target.result}</textarea>`;
                };
                reader.readAsDataURL(file);
              });
            '''
        else:
            inputs = '''<div class="col-12"><label for="value" class="form-label">Enter value</label><input id="value" type="text" class="form-control" required /></div>'''
            logic = '''form.addEventListener('submit', function (event) { event.preventDefault(); const value = document.getElementById('value').value; resultBox.classList.remove('d-none'); resultBox.innerHTML = `Result: <strong>${value}</strong>`; });'''

        file_path.write_text(make_page(tool['title'], tool['category'], tool['description'], {'inputs': inputs, 'logic': logic}), encoding='utf-8')


if __name__ == '__main__':
    CSS_DIR.mkdir(parents=True, exist_ok=True)
    JS_DIR.mkdir(parents=True, exist_ok=True)
    TOOLS_DIR.mkdir(parents=True, exist_ok=True)
    generate_index()
    generate_tool_files()
    print(f"Generated {len(TOOLS)} tool pages and home page.")
