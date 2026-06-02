/**
 * Site audit — writes NDJSON to debug-fb5b57.log
 */
const fs = require('node:fs');
const path = require('node:path');

const LOG_PATH = path.join(__dirname, '..', 'debug-fb5b57.log');
const WEBSITE_DIR = path.join(__dirname, '..', 'website');
const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const SESSION_ID = 'fb5b57';

function log(hypothesisId, location, message, data = {}) {
  const line = JSON.stringify({
    sessionId: SESSION_ID,
    hypothesisId,
    location,
    message,
    data,
    timestamp: Date.now(),
    runId: 'audit'
  });
  fs.appendFileSync(LOG_PATH, `${line}\n`, 'utf8');
}

function walkHtmlFiles(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) acc = walkHtmlFiles(full, acc);
    else if (entry.name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

function extractAssetRefs(content) {
  const refs = [];
  const patterns = [
    /(?:src|href|srcset|poster|data-video-candidates)=["']([^"']+)["']/gi,
    /url\(["']?([^"')]+)["']?\)/gi
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(content)) !== null) {
      const ref = m[1].split(',')[0].trim().split(/\s+/)[0];
      if (ref && !ref.startsWith('http') && !ref.startsWith('#') && !ref.startsWith('mailto:') && !ref.startsWith('tel:')) {
        refs.push(ref);
      }
    }
  }
  return refs;
}

async function main() {
  fs.writeFileSync(LOG_PATH, '', 'utf8');

  const issues = [];
  const htmlFiles = walkHtmlFiles(WEBSITE_DIR);
  const allIds = new Map();

  for (const file of htmlFiles) {
    const rel = path.relative(WEBSITE_DIR, file).replace(/\\/g, '/');
    const html = fs.readFileSync(file, 'utf8');
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
    ids.forEach((id) => {
      if (!allIds.has(id)) allIds.set(id, []);
      allIds.get(id).push(rel);
    });
  }

  const duplicateIds = [...allIds.entries()].filter(([, files]) => files.length > 1);
  log('H-STRUCT', 'audit-site.js:dupIds', 'Duplicate id scan', { count: duplicateIds.length, samples: duplicateIds.slice(0, 5) });
  duplicateIds.forEach(([id, files]) => issues.push({ type: 'duplicate-id', id, files }));

  const assetRefs = new Set();
  const scanDirs = [WEBSITE_DIR];
  for (const dir of scanDirs) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory() && entry.name !== 'images') continue;
      if (entry.isFile() && /\.(html|css|js)$/.test(entry.name)) {
        extractAssetRefs(fs.readFileSync(full, 'utf8')).forEach((r) => assetRefs.add(r));
      }
    }
  }
  walkHtmlFiles(WEBSITE_DIR).forEach((f) => extractAssetRefs(fs.readFileSync(f, 'utf8')).forEach((r) => assetRefs.add(r)));

  const missingAssets = [];
  for (const ref of assetRefs) {
    const clean = ref.replace(/^\//, '').split('?')[0];
    const disk = path.join(WEBSITE_DIR, clean.replace(/\//g, path.sep));
    if (!fs.existsSync(disk)) missingAssets.push({ ref: clean, disk });
  }
  log('H-ASSETS', 'audit-site.js:assets', 'Missing local assets', { count: missingAssets.length, samples: missingAssets.slice(0, 8) });
  missingAssets.forEach((m) => issues.push({ type: 'missing-asset', ...m }));

  const indexHtml = fs.readFileSync(path.join(WEBSITE_DIR, 'index.html'), 'utf8');
  const anchors = [...indexHtml.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
  const indexIds = new Set([...indexHtml.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  const brokenAnchors = anchors.filter((a) => !indexIds.has(a));
  log('H-ANCHORS', 'audit-site.js:anchors', 'Broken index anchors', { count: brokenAnchors.length, brokenAnchors });

  try {
    const indexRes = await fetch(`${BASE_URL}/`);
    const body = await indexRes.text();
    log('H-RUNTIME', 'audit-site.js:fetch', 'Index fetch', { status: indexRes.status, length: body.length });

    const imgRefs = [...body.matchAll(/src="images\/([^"]+)"/g)].map((m) => m[1]);
    let img404 = 0;
    for (const img of imgRefs.slice(0, 15)) {
      const r = await fetch(`${BASE_URL}/images/${encodeURI(img)}`);
      if (!r.ok) {
        img404 += 1;
        issues.push({ type: 'image-404', img, status: r.status });
      }
    }
    log('H-ASSETS', 'audit-site.js:imgHttp', 'Image HTTP check sample', { checked: Math.min(15, imgRefs.length), img404 });
  } catch (e) {
    log('H-RUNTIME', 'audit-site.js:fetchErr', 'Fetch failed', { error: e.message });
  }

  const calcJs = fs.readFileSync(path.join(WEBSITE_DIR, 'js', 'calc.js'), 'utf8');
  const step4OutsideForm = calcJs.includes('stepPanels = Array.from(wizard.querySelectorAll') &&
    indexHtml.includes('</form>') && indexHtml.indexOf('data-step="4"') > indexHtml.indexOf('</form>');
  log('H-CALC', 'audit-site.js:calcStruct', 'Step 4 outside calcForm', { step4OutsideForm });

  const sliderJs = fs.readFileSync(path.join(WEBSITE_DIR, 'js', 'slider.js'), 'utf8');
  const sliderMapping = {
    before: sliderJs.match(/before:\s*'([^']+)'/)?.[1],
    after: sliderJs.match(/after:\s*'([^']+)'/)?.[1]
  };
  log('H-SLIDER', 'audit-site.js:slider', 'Slider image mapping', sliderMapping);

  log('H-SUMMARY', 'audit-site.js:done', 'Audit complete', {
    issueCount: issues.length,
    issueTypes: [...new Set(issues.map((i) => i.type))]
  });

  console.log(`Audit done: ${issues.length} issues. See debug-fb5b57.log`);
  if (issues.length) {
    issues.slice(0, 20).forEach((i) => console.log(JSON.stringify(i)));
    process.exitCode = issues.length > 0 ? 0 : 0;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
