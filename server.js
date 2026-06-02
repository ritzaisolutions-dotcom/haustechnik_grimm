/** Lokaler Preview-Server nur. Produktion: statisches `website/` auf Vercel; Formulare via Web3Forms, nicht POST /api/contact. */
const http = require('node:http');
const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');
const { URL } = require('node:url');

const HOST = '127.0.0.1';
const PORT = Number(process.env.PORT || 4173);
const WEBSITE_DIR = path.join(__dirname, 'website');
const LOG_DIR = path.join(__dirname, 'logs');
const LOG_FILE = path.join(LOG_DIR, 'contact.log');
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT = 10;
const rateStore = new Map();

const mimeByExt = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

function getClientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (typeof xff === 'string' && xff.length) return xff.split(',')[0].trim();
  return req.socket.remoteAddress || 'unknown';
}

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateStore.get(ip) || [];
  const valid = entry.filter((ts) => now - ts < RATE_WINDOW_MS);
  if (valid.length >= RATE_LIMIT) return false;
  valid.push(now);
  rateStore.set(ip, valid);
  return true;
}

async function appendLog(record) {
  await fsp.mkdir(LOG_DIR, { recursive: true });
  await fsp.appendFile(LOG_FILE, `${JSON.stringify(record)}\n`, 'utf8');
}

function sendJson(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks).toString('utf8');
}

function validatePayload(payload) {
  const required = ['vorname', 'nachname', 'telefon', 'email', 'anfrageart', 'dsgvo'];
  for (const key of required) {
    if (!String(payload[key] || '').trim()) {
      return `Feld fehlt: ${key}`;
    }
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(payload.email)) return 'Ungueltige E-Mail-Adresse';
  if (String(payload.website || '').trim()) return 'Spam erkannt';
  return null;
}

async function handleContact(req, res) {
  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return sendJson(res, 429, { ok: false, message: 'Zu viele Anfragen. Bitte spaeter erneut versuchen.' });
  }

  try {
    const body = await readBody(req);
    const payload = JSON.parse(body || '{}');
    const validationError = validatePayload(payload);
    if (validationError) {
      await appendLog({ ts: new Date().toISOString(), ip, type: 'validation_error', detail: validationError });
      return sendJson(res, 400, { ok: false, message: validationError });
    }

    const record = {
      ts: new Date().toISOString(),
      ip,
      vorname: payload.vorname,
      nachname: payload.nachname,
      telefon: payload.telefon,
      email: payload.email,
      anfrageart: payload.anfrageart,
      nachricht: payload.nachricht || ''
    };
    await appendLog(record);
    return sendJson(res, 200, { ok: true, message: 'Anfrage gespeichert' });
  } catch (error) {
    await appendLog({ ts: new Date().toISOString(), ip, type: 'server_error', detail: error.message });
    return sendJson(res, 500, { ok: false, message: 'Serverfehler bei der Verarbeitung.' });
  }
}

function resolvePath(urlPathname) {
  const cleaned = urlPathname === '/' ? '/index.html' : urlPathname;
  const abs = path.normalize(path.join(WEBSITE_DIR, cleaned));
  if (!abs.startsWith(WEBSITE_DIR)) return null;
  return abs;
}

async function handleStatic(req, res, pathname) {
  const filePath = resolvePath(pathname);
  if (!filePath) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  let targetPath = filePath;
  try {
    const stat = await fsp.stat(targetPath);
    if (stat.isDirectory()) targetPath = path.join(targetPath, 'index.html');
  } catch {
    targetPath = path.join(WEBSITE_DIR, '404.html');
  }

  const ext = path.extname(targetPath).toLowerCase();
  const mime = mimeByExt[ext] || 'application/octet-stream';
  const stream = fs.createReadStream(targetPath);
  stream.on('error', () => {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
  });
  res.writeHead(targetPath.endsWith('404.html') ? 404 : 200, { 'Content-Type': mime });
  stream.pipe(res);
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

  if (req.method === 'POST' && requestUrl.pathname === '/api/contact') {
    return handleContact(req, res);
  }

  if (req.method === 'GET' || req.method === 'HEAD') {
    let pathname = requestUrl.pathname;
    try {
      pathname = decodeURIComponent(pathname);
    } catch {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Bad Request');
    }
    return handleStatic(req, res, pathname);
  }

  res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Method Not Allowed');
});

server.listen(PORT, HOST, () => {
  console.log(`Preview server running on http://${HOST}:${PORT}`);
});
