# Vercel Deploy-Architektur — Fliesenmeister Butz

**Eine Wahrheit:** Die öffentliche Website lebt nur in `website/`. Das Repo-Root ist Tooling + Archiv.

---

## Ordner-Rollen

| Pfad | Rolle | Auf Vercel? |
|------|--------|-------------|
| `website/` | **Deploy-Root** — `index.html`, CSS, JS, Bilder | Ja |
| `website/images/` | Alle `<img>`, Video, Favicon-Pfade in HTML | Ja |
| `images/current/` | Quell-Archiv lokal (optional), gitignored | Nein |
| `server.js`, `package.json` | Lokaler Preview (`npm run preview`) | Nein |
| `scripts/` | Smoke-Tests, WebP-Konvertierung | Nein |
| `sop-webseiten-bau/` | Playbook | Nein |

**Regel:** In HTML nie `../images/current/` — nur `images/…` (relativ zu `website/`).

---

## Vercel Dashboard (Pflicht)

Projekt: `fliesenmeister-butz`

| Einstellung | Wert |
|-------------|------|
| **Root Directory** | `website` |
| **Framework Preset** | Other (Static) |
| **Build Command** | leer |
| **Output Directory** | leer (nicht `website` — das wäre doppelt!) |
| **Install Command** | leer |

`vercel link` nur ausführen mit:

```bash
cd website
vercel link
```

Nicht parallel im Repo-Root verlinken (vermeidet doppelte `.vercel/`-Ordner).

---

## Konfigurationsdateien

| Datei | Status |
|-------|--------|
| `website/vercel.json` | **Einzige** Vercel-Config (Headers, Cache) |
| `/vercel.json` (Repo-Root) | **Entfernt** — verursachte Konflikt mit Root Directory |
| `website/.vercelignore` | Minimal (`docs/`, `.vercel`) |
| `/.vercelignore` | Nur relevant, falls jemand Root Directory leer lässt |

### Warum kein `outputDirectory` im Repo-Root?

Wenn Dashboard **Root Directory = `website`** und zusätzlich Root-`vercel.json` mit `"outputDirectory": "website"`:

→ Vercel sucht effektiv `website/website/` → **404 NOT_FOUND**.

---

## Fehler: `website: command not found` (Exit 127)

**Häufige Ursachen (beide vorkamen bei diesem Projekt):**

1. **`website` im Build Command** — Vercel führt es als Shell-Befehl aus, nicht als Ordner.
2. **Tippfehler Root Directory `webite`** statt `website` — Ordner existiert nicht; Build Command blieb fälschlich `website`.

Prüfen: `vercel project inspect fliesenmeister-butz` → Root Directory muss exakt **`website`** heißen.

**Fix im Dashboard** (Settings → General → Build & Development Settings):

| Feld | Falsch | Richtig |
|------|--------|---------|
| Root Directory | leer, Build = `website` | **`website`** |
| Build Command | `website` | **leer** (Override aus) |
| Install Command | `website` | **leer** |
| Output Directory | `website` | **leer** |

Leere `buildCommand` in `vercel.json` überschreibt Dashboard-Overrides **nicht zuverlässig** — Einstellungen im Dashboard leeren oder per API patchen (siehe unten).

### API / CLI prüfen und reparieren

```bash
vercel project inspect fliesenmeister-butz
vercel pull --yes   # aus website/ — zeigt rootDirectory in .vercel/project.json
```

Einmalig korrigieren (CLI eingeloggt), z. B. `patch.json`:
```json
{"rootDirectory":"website","buildCommand":null,"installCommand":null,"outputDirectory":null}
```
```bash
vercel api /v9/projects/fliesenmeister-butz -X PATCH --input patch.json
```

Fehlerhaftes Deployment analysieren:
```bash
vercel api /v13/deployments/<deployment-id> -X GET --raw
# → projectSettings.buildCommand
```

---

## `vercel.json`: ungültige Header-Patterns

Diese `source`-Werte **brechen** den Deploy:
- `/(.*\\.(ico|png|…))` — Extension-Regex
- `/(.*\\.html)` — HTML-Regex

**Erlaubt:** Ordner wie `/images/(.*)`, `/css/(.*)`, `/js/(.*)`, Security auf `/(.*)`.

Nach Änderung testen: `vercel deploy --prod` aus **Repo-Root** (nicht `cd website`).

---

## CLI: Deploy vom Repo-Root

| Dashboard Root Directory | `vercel deploy` ausführen in |
|--------------------------|------------------------------|
| `website` | **Repo-Root** (`Fliesenmeister Butz/`) |
| leer + `outputDirectory: website` in Root-`vercel.json` | Repo-Root (Legacy — nicht mehr für Butz) |

`cd website && vercel deploy` → Fehler `website/website` existiert nicht.

`vercel link` weiterhin nur aus `website/` (ein Link).

---

## Abnahme nach Deploy

1. `https://fliesenmeister-butz.vercel.app/` → **200**
2. Seitenquelltext enthält `id="kostenrechner"` und `calcCallbackForm`
3. `https://…vercel.app/css/style.css` → **200**
4. `https://…vercel.app/js/main.js` → **200**

**Nicht verwechseln:** `www.fliesen-butz.de` kann noch die **alte Hoster-Site** zeigen, bis DNS auf Vercel zeigt → siehe `launch-domain-seo.md`.

---

## Lokal testen

```bash
npm run preview    # http://127.0.0.1:4173 — simuliert website/ als Root
npm run smoke
```

Nicht mit `file://` auf `index.html` testen.

---

## Changelog

| Datum | Änderung |
|-------|----------|
| 2026-05-28 | Root-`vercel.json` entfernt; eine Config in `website/`; Doku vereinheitlicht |
| 2026-05-28 | Root `webite`→`website`, Build Command geleert, ungültige Header entfernt; Production READY auf fliesenmeister-butz.vercel.app |
