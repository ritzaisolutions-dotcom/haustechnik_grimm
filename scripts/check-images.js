const fs = require('node:fs');
const path = require('node:path');
const BASE = process.env.BASE_URL || 'http://127.0.0.1:4173';
const ROOT = path.join(__dirname, '..', 'website');

function collectRefs(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const dir = path.dirname(path.relative(ROOT, filePath));
  const refs = [];
  for (const m of content.matchAll(/(?:src|href|srcset|poster)=["']([^"']+)["']/gi)) {
    let ref = m[1].split(',')[0].trim();
    if (ref.startsWith('http') || ref.startsWith('#') || ref.startsWith('mailto:') || ref.startsWith('tel:')) continue;
    if (!ref.includes('.')) continue;
    const resolved = path.normalize(path.join(ROOT, dir, ref)).replace(/\\/g, '/');
    const rel = path.relative(ROOT, resolved).replace(/\\/g, '/');
    refs.push({ ref, rel, from: path.relative(ROOT, filePath).replace(/\\/g, '/') });
  }
  return refs;
}

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (/\.html$/.test(e.name)) acc.push(p);
  }
  return acc;
}

(async () => {
  const all = walk(ROOT);
  const missing = [];
  const httpFail = [];
  for (const file of all) {
    for (const { ref, rel, from } of collectRefs(file)) {
      const disk = path.join(ROOT, rel);
      if (!fs.existsSync(disk)) missing.push({ from, ref, rel });
      else {
        const url = `${BASE}/${rel.split('/').map(encodeURIComponent).join('/').replace(/%2F/g, '/')}`;
        const enc = rel.split('/').map(encodeURIComponent).join('/');
        const res = await fetch(`${BASE}/${enc}`);
        if (!res.ok) httpFail.push({ from, rel, status: res.status });
      }
    }
  }
  console.log('MISSING ON DISK:', missing.length);
  missing.forEach((x) => console.log(JSON.stringify(x)));
  console.log('HTTP FAIL:', httpFail.length);
  httpFail.forEach((x) => console.log(JSON.stringify(x)));
})();
