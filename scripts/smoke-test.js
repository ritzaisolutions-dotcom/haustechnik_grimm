const pages = [
  '/',
  '/referenzen.html',
  '/team.html',
  '/impressum.html',
  '/datenschutz.html',
  '/404.html',
  '/leistungen/bad.html',
  '/leistungen/heizung.html',
  '/leistungen/haustechnik.html',
  '/leistungen/lueftung.html'
];

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:4173';

async function checkPage(pathname) {
  const response = await fetch(`${baseUrl}${pathname}`);
  if (!response.ok && pathname !== '/404.html') {
    throw new Error(`${pathname} returned ${response.status}`);
  }
  return `${pathname} -> ${response.status}`;
}

function extractIds(html) {
  return [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
}

function extractAnchors(html) {
  return [...html.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
}

async function checkIndexIntegrity() {
  const response = await fetch(`${baseUrl}/`);
  const html = await response.text();
  const ids = new Set(extractIds(html));
  const anchors = extractAnchors(html);

  for (const anchor of anchors) {
    if (!ids.has(anchor)) {
      throw new Error(`Missing anchor target id="${anchor}" in index.html`);
    }
  }

  const requiredStrings = [
    'id="kostenrechner"',
    'id="calcForm"',
    'id="calcPdfBtn"',
    'id="calcCallbackForm"',
    'id="calc_callback_phone"',
    'js/calc.js',
    'js/pdf.js'
  ];

  requiredStrings.forEach((token) => {
    if (!html.includes(token)) {
      throw new Error(`Missing required token in index.html: ${token}`);
    }
  });
}

async function main() {
  const results = [];
  for (const page of pages) {
    const result = await checkPage(page);
    results.push(result);
  }
  await checkIndexIntegrity();
  console.log('Smoke test passed');
  results.forEach((line) => console.log(line));
  console.log('index.html integrity checks passed');
}

main().catch((error) => {
  console.error(`Smoke test failed: ${error.message}`);
  process.exit(1);
});
