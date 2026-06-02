# 14 – Learnings & Past Mistakes

**Fehler die passiert sind — damit sie kein zweites Mal passieren.**

---

## 1. Images und Video laden nicht auf Vercel

### Was passiert ist
Alle `<img>` und `<video>` im Projekt zeigten auf `../images/current/` — ein Pfad relativ zu `website/index.html`, der eine Ebene **nach oben** aus dem `website/`-Verzeichnis geht. Lokal im Dateisystem hat das funktioniert. Auf Vercel nicht, weil Vercel nur das `website/`-Verzeichnis deployed.

### Warum es passiert ist
Der `images/current/`-Ordner lag **außerhalb** des Vercel-Roots (`website/`). Vercel kennt Dateien außerhalb seines Roots nicht — ein Pfad wie `../images/anything.jpg` ist auf Vercel immer ein 404.

### Rückblick
```
Projektordner/
├── website/          ← Vercel-Root — nur das wird deployed
│   └── index.html    ← src="../images/current/foto.jpg" → 404 auf Vercel!
└── images/current/   ← AUSSERHALB des Vercel-Roots
    └── foto.jpg
```

### Fix
Alle Client-Assets in `website/images/` verschieben und alle Pfade von `../images/current/` auf `images/` ändern.

```
website/
├── index.html        ← src="images/foto.jpg" → ✓ funktioniert
└── images/
    └── foto.jpg
```

### Regel für alle zukünftigen Projekte

> **Assets müssen immer INNERHALB des Vercel-Roots liegen.**
> Kein Asset-Ordner außerhalb des deploy-Verzeichnisses — egal wie praktisch es organisatorisch erscheint.

Checkliste vor dem ersten Deploy:
- [ ] Liegen alle `src=`, `href=`, `poster=`-Pfade innerhalb des Deploy-Roots?
- [ ] Kein `../` in Asset-Pfaden (außer bei Sub-Pages zu root-level CSS/JS)?
- [ ] Im Browser geöffnet und Netzwerk-Tab auf 404s geprüft?

---

## 2. Dateiname-Tippfehler bei Video-Datei

### Was passiert ist
Die Videodatei hieß `video_hero_section_backround.mp4` (Tippfehler: „backround" statt „background"). Das `<source>`-Tag im HTML referenzierte aber `video_hero_section_background.mp4` — also die korrekte Schreibweise. Das Video lud nicht.

### Fix
`<source src>` an den echten Dateinamen anpassen, nicht umgekehrt. Tippfehler im Dateinamen so lassen wenn viele Stellen referenzieren — einfacher den HTML-Pfad zu korrigieren als die Datei umzubenennen und alle Referenzen zu aktualisieren.

### Regel
> Immer die **tatsächliche** Dateiname im Dateisystem als Referenz — nicht die „sollte"-Schreibweise im Kopf.
> Nach dem Kopieren von Assets: `ls images/` im Terminal und die Namen mit dem HTML abgleichen.

---

## 3. Absolute URLs in Meta-Tags auf falschen Pfad

### Was passiert ist
OG-Image und Schema.org JSON-LD verwendeten absolute URLs wie `https://www.fliesen-butz.de/images/current/butz_header_2.jpg`. Nachdem die Verzeichnisstruktur geändert wurde (`current/` entfernt), zeigten diese Meta-Tags ins Leere.

### Regel
> Wenn Assets-Pfade umstrukturiert werden, **auch alle absoluten URLs** in `<meta property="og:image">`, `<meta name="twitter:image">` und `<script type="application/ld+json">` aktualisieren.
> Grep nach dem alten Pfad in allen Dateien — nicht nur in `<img src>`.

```bash
# Schnell alle Vorkommen finden:
grep -r "images/current/" website/
```

---

## 4. Demo lokal testen ≠ auf Vercel testen

### Was passiert ist
Das Öffnen von `index.html` direkt im Browser (`file://...`) zeigte alles korrekt — weil der Browser dabei relative Pfade gegen das Dateisystem auflöst, nicht gegen einen Web-Server-Root.

### Regel
> **Nie nur mit `file://` testen.** Immer auch gegen einen lokalen Dev-Server oder Vercel-Preview prüfen, bevor Images/Video als „funktioniert" gilt.

Schnelltest lokal:
```bash
# Im website/-Verzeichnis:
npx serve .
# → öffnet http://localhost:3000 — simuliert Vercel-Verhalten korrekt
```

Oder direkt eine Vercel-Preview deployen und im Browser-Netzwerktab auf 404s prüfen.

Projekt-Preview lokal (Butz): `npm run preview` → `http://127.0.0.1:4173` (nicht `file://`).

---

## 5. `.gitignore` blockierte deploy-relevante Assets

### Was passiert ist
`website/images/` war per `.gitignore` ausgeschlossen. Neue Bilder/WebP landeten lokal, wurden aber nicht mit committed — Vercel-Deploy blieb ohne Assets oder veraltet.

### Fix
Nur Quell-Assets außerhalb des Roots ignorieren (`/images/` oder `images/current/`), **nicht** `website/images/`.

### Regel
> Vor jedem Push: `git status` prüfen, ob neue Dateien unter `website/images/` als *untracked* hängen.
> Smoke-Test + Netzwerk-Tab auf der Preview-URL, nicht nur lokal.

---

## 6. Vercel 404 NOT_FOUND — widersprüchliche Deploy-Roots (nicht `.vercelignore`)

### Was passiert ist
`fliesenmeister-butz.vercel.app` → `404: NOT_FOUND`. `index.html` liegt nur unter `website/`.

Zusätzlich: **zwei** Deploy-Strategien gleichzeitig:
- Vercel Dashboard vermutlich **Root Directory = `website`**
- Repo-Root **`vercel.json`** mit `"outputDirectory": "website"`

→ Risiko Pfad `website/website/` (leer) = 404. Dazu doppelte `.vercel/`-Links (Repo-Root + `website/`).

### `.vercelignore` geprüft
Blockiert **nicht** `website/` — nur Archiv `images/`, Tooling, Docs.

### Fix (Butz, 2026-05-28)
1. **Root-`/vercel.json` gelöscht** — nur noch `website/vercel.json`
2. Dashboard: **Root Directory = `website`**, Output Directory **leer**
3. `project-docs/vercel-deploy-architecture.md` als Single Source of Truth
4. `vercel link` nur aus `website/`

### Regel
> **Genau eine** Deploy-Wurzel: entweder Dashboard Root Directory = `website` **oder** Root-`outputDirectory` — nie beides.
> Keine zweite `vercel.json` im Repo-Root, wenn Config in `website/` liegt.
> 404 debuggen: HTML-Marker (`kostenrechner`) + `/css/style.css` 200 — nicht nur `.vercelignore`.

---

## 7. „Deployment down“ ≠ Code kaputt — Domain vs. Vercel

### Was passiert ist (Fliesenmeister Butz, 05/2026)
- `fliesenmeister-butz.vercel.app` → **404** (Projekt/Root/Deployment prüfen)
- `www.fliesen-butz.de` → **200**, aber **alte** Hoster-Site (~12 KB HTML, kein Kostenrechner, `/css/style.css` → 404)

### Rückblick
Lighthouse und Feature-Tests auf der **falschen URL** messen die alte Site — Ergebnisse sind wertlos.

### Regel
> Vor Performance-/Feature-Audit **drei Checks**:
> 1. Response-HTML enthält erwartete Marker (z. B. `id="kostenrechner"`, `calcCallbackForm`)
> 2. Statische Assets (`/css/style.css`, `/js/main.js`) liefern **200**
> 3. Vercel-Deployment-Log + Root Directory = `website/`

Domain-Umzug: `project-docs/launch-domain-seo.md` (301, GSC, Bing, GBP).

---

## 8. Hero-Video dominiert Performance (LCP)

### Was passiert ist (Lighthouse lokal, neuer Build)
- Performance **75** (Desktop) / **79** (Mobile)
- **~4,5 MB** Gesamt-Transfer; Hero-MP4 **~2,5 MB** (~87 %)
- LCP Desktop **24,5 s** (Video als LCP-Element), Mobile **~4,0 s**
- CLS **0**, TBT niedrig, SEO/Best Practices **100**

### Was ohne Video schon half
WebP + `<picture>`, `loading="lazy"`, deferred JS, Klaro idle-load — verbessern Scroll-Bilder, reichen für Score **≥90** oft **nicht**, solange Video unkomprimiert autoplay lädt.

### Regel
> Hero-Video **vor Go-Live** budgetieren: Ziel **&lt;800 KB** (720p, starke Kompression) oder **Mobile nur Poster** (`<img>`), Desktop Video.
> `preload="metadata"` reicht nicht — bei LCP-Problemen: `preload="none"` + IntersectionObserver oder Poster als LCP-Element (`fetchpriority="high"` auf Poster-WebP).
> **Nicht** Video und Poster gleichzeitig als Heavy-Load starten.

### Bewusst zurückgestellt (Butz)
Video-Kompression bewusst übersprungen — Ticket in `project-docs/Backlog.md` „Performance (ohne Hero-Video)“.

---

## 9. WebP: Konvertierung + `<picture>`-Muster

### Umsetzung (Butz)
- Konvertierung: `ffmpeg -c:v libwebp -quality 82` → `scripts/convert-images-webp.ps1`
- HTML: `<picture><source srcset="…webp" type="image/webp"><img src="…jpg" …></picture>`
- JPG/PNG als Fallback behalten (ältere Browser, Lightbox mit `data-lightbox` auf `<img>`)

### Typische Ersparnis
| Asset | Vorher | WebP (ca.) |
|-------|--------|------------|
| logo-butz.png | 96 KB | 16 KB |
| bild haus.jpg | 3134 KB | 1037 KB |
| ref_1.jpg | 12 KB | 8 KB |

### Regel
> WebP **immer** mit Fallback-Bild; Pfade in `website/images/` (im Vercel-Root).
> Nach Konvertierung: `width` + `height` auf `<img>` setzen (CLS, Lighthouse „unsized images“).
> Galerie-CSS: `.ref-item picture { display:block; width/height 100% }` — sonst bricht `object-fit` am falschen Element.

### Anti-Pattern
```
✗ Nur WebP ausliefern ohne Fallback
✗ WebP in images/current/ außerhalb website/ — Vercel 404
✗ Lighthouse nur auf alter Live-Domain messen
```

---

## 10. Third-Party: Klaro nicht render-blocking

### Was passiert ist
`<script defer src="cdn.kiprotect.com/klaro/...">` im Footer blockierte trotzdem den kritischen Pfad (~59 KB, Third-Party-Latenz).

### Fix (Butz)
- Klaro-Version **pinnen** (`v0.7.18`, nicht `latest`)
- Laden per `requestIdleCallback` (Fallback: `window.load`) aus `main.js`
- `#klaro` + `window.klaroConfig` bleiben im HTML

### Regel
> Consent-Banner DSGVO-konform **und** performance-bewusst: Version pinnen, idle/deferred laden, self-host optional für Live.
> Nie `latest` auf Produktions-Sites.

---

## 11. `vercel.json`: Cache-Header für statische Assets

### Umsetzung (Butz, gültige Muster)
```json
"/images/(.*)" → Cache-Control: public, max-age=31536000, immutable
"/css/(.*)", "/js/(.*)", "/fonts/(.*)" → gleich
```

Security-Header auf `/(.*)` (X-Content-Type-Options, Referrer-Policy, …).

### Ungültige `source`-Patterns (Deploy-Fehler)
Diese Regex-Varianten brachen den Deploy mit:
`Header at index N has invalid source pattern`:

```
✗ "/(.*\\.(ico|png|webp|jpg|jpeg|svg|woff2?))"
✗ "/(.*\\.html)"
```

Vercel nutzt **path-to-regexp**, keine volle POSIX-Regex in `source`. Extension-Catch-alls und `\.html`-Gruppen weglassen — stattdessen Ordner-Pfade (`/images/`, `/css/`, `/js/`) oder einzelne statische Dateien benennen.

### Regel
> Security-Header **und** Cache in `website/vercel.json` — nur **validierte** `source`-Patterns.
> Nach Änderung an `vercel.json`: `vercel deploy --prod` aus **Repo-Root** testen (nicht aus `website/`, siehe §18).

---

## 12. Kostenrechner: Rückruf-Lead statt PDF-E-Mail-Gate

### Entscheidung (Butz, bestätigt)
- **PDF + Breakdown sofort** nach Berechnung (kein Name/E-Mail-Gate)
- **Rückruf-Formular** darunter: PLZ, Wunschmonat, Telefon, Checkboxen, Web3Forms → GF
- **Kapazität** nur clientseitig (`CONFIG.capacity`), Anzeige + E-Mail — **kein** `localStorage` für PLZ/Monat

### Technik
- `getAvailability(plz, monthKey)` → Prefix `67`/`68`, Monats-Map `full`/`available`
- Web3Forms: `fetch` + JSON `{ success }` prüfen (wie Kontaktformular in `main.js`)
- Hidden: `subject`, `replyto` (Telefon), Kalkulationsfelder aus `window.lastCalculation`
- Honeypot `website` → freundliche Success-UI, kein Mail

### DSGVO
`datenschutz.html`: Zweck Rückruf/Angebot, Web3Forms, keine Kapazitäts-Datenbank auf der Website.

### Regel
> Lead-Gate nur wenn Kunde es **explizit** will. Standard für Handwerker-Demo: **sofortiges Ergebnis** + optionaler Rückruf-CTA.
> Monatskapazität in `CONFIG.capacity.months` manuell pflegen (`project-docs/Backlog.md`).

### Anti-Pattern (aus 09-kostenrechner.md überholt)
```
✗ E-Mail VOR Ergebnis/PDF erzwingen (Konversion, Vertrauen)
✗ PDF-Button dauerhaft disabled bis Lead-Formular
✗ Kapazität in localStorage speichern (DSGVO-Aufwand, falscher Eindruck „Live-Kalender“)
```

---

## 13. Vorher/Nachher-Slider: Bild-Zuordnung & Format

### Was passiert ist
- Kunde lieferte Paar mit vertauschter Semantik (Dateiname ≠ „Vorher/Nachher“ im Kopf)
- Hochformat **9:16** → Slider `aspect-ratio: 3/4`, `object-fit: contain` (nicht 16:9)

### Regel
> Vorher/Nachher-Beschriftung **mit Kunde** abgleichen, nicht nur Dateinamen.
> Hochformat-Paare: Container-Ratio anpassen, sonst brutal beschnitten.
> `slider.js`: defensive Checks (`if (!el) return`).

---

## 14. Web3Forms & Secrets

### Ist-Stand Demo
- `access_key` als Hidden Field in HTML (Demo-Key)
- Dashboard: Empfänger auf **info@fliesen-butz.de** setzen

### Live
- Produktiver Key über **Vercel Env**, nicht im Repo committen
- `calc.js` + `main.js`: Fehler aus API-JSON anzeigen, nicht nur `response.ok`

### Regel
> Platzhalter `YOUR_WEB3FORMS_ACCESS_KEY` in `main.js` als Guard — vor Deploy prüfen.
> `server.js` `/api/contact` nur lokal — Produktion = Web3Forms direkt.

---

## 15. Qualitätssicherung vor Push

### Automatisiert (Butz)
```bash
npm run smoke          # alle HTML-Routen + index-Integrität (calcCallbackForm, …)
node --check website/js/calc.js
node --check website/js/main.js
```

### Manuell (Kostenrechner)
1. Durchklicken → PDF ohne Formular
2. PLZ `67354` + freier Monat → Kapazitätshinweis
3. PLZ außerhalb / Monat `full` → Warnhinweis
4. Rückruf absenden → Web3Forms 200
5. Mobile 375px bedienbar

### Lighthouse
```bash
npx lighthouse http://127.0.0.1:4173/ --only-categories=performance,accessibility --form-factor=mobile
```
Nach Domain-Cutover auf **echter** Produktions-URL wiederholen.

---

## 16. Logo, Favicon, Branding

### Was passiert ist
- Breites Logo als Favicon → verzerrt; Fix: quadratischer Crop 512×512
- Nav: transparentes PNG; OG/Twitter noch auf alte Pfade achten bei Umbenennungen

### Regel
> Favicon immer **quadratisch** aus Markenzeichen, nicht Banner.
> Logo ohne finale Datei: dokumentieren (kein erfundenes Logo), Akzentfarbe provisorisch in CSS-Variablen.

---

## 17. Build Command `website` → Exit 127

### Was passiert ist
Deploy-Log:
```
sh: line 1: website: command not found
Error: Command "website" exited with 127
```

`website` stand im Feld **Build Command** (Override an) — Vercel führt es als Shell-Befehl aus, **nicht** als Ordner.

### Rückblick
| Feld | Falsch | Richtig |
|------|--------|---------|
| Root Directory | leer oder Tippfehler | `website` |
| Build Command | `website` | **leer** |
| Output Directory | `website` (zusätzlich) | **leer** |

`buildCommand: ""` in `vercel.json` hat das **nicht** zuverlässig überschrieben — Dashboard-Override blieb in `projectSettings.buildCommand`.

### Fix (Butz, 2026-05-28)
1. Vercel API: `buildCommand: null`, `rootDirectory: "website"` (siehe §18)
2. Dashboard: Build / Install / Output **leer**, Framework **Other**
3. Abnahme: `vercel project inspect fliesenmeister-butz` → Root Directory = `website`

### Regel
> **Root Directory** = Ordnername. **Build Command** = Shell-Befehl (`npm run build` oder leer).
> Nie `website` in Build Command eintragen, um den Deploy-Ordner zu „wählen“.
> Bei Exit 127: Deployment-JSON prüfen — `projectSettings.buildCommand` zeigt den echten Wert.

```bash
vercel api /v13/deployments/<deployment-id> -X GET --raw
# → "projectSettings":{"buildCommand":"website", ...}
```

---

## 18. Root Directory Tippfehler `webite`

### Was passiert ist
Im Vercel-Projekt stand `"rootDirectory": "webite"` (fehlendes **s**). Ordner existiert nicht. Parallel lief fälschlich `buildCommand: "website"`.

`vercel pull` / `website/.vercel/project.json` zeigt den gespeicherten Wert — nicht nur das Dashboard aus dem Kopf ablesen.

### Fix
Dashboard → Root Directory exakt **`website`** (kleingeschrieben, voller Ordnername im Repo).

API-Fix (einmalig, wenn CLI eingeloggt):
```bash
# JSON-Datei: {"rootDirectory":"website","buildCommand":null,"installCommand":null,"outputDirectory":null}
vercel api /v9/projects/fliesenmeister-butz -X PATCH --input patch.json
```

### Regel
> Nach jeder manuellen Dashboard-Änderung: `vercel project inspect <name>` oder `vercel pull`.
> Typo-Check: `webite`, `websit`, `Website` (Großschreibung) — alle brechen oder liefern falsche Pfade.

---

## 19. `vercel deploy` — Repo-Root vs. `website/`

### Was passiert ist
Mit Dashboard **Root Directory = `website`**:
- `cd website && vercel deploy` → Fehler: Pfad `…/website/website` existiert nicht
- `cd repo-root && vercel deploy` → **korrekt**

### Regel
> **Production-Deploy per CLI:** immer aus **Repo-Root**, wenn Root Directory im Dashboard auf `website` steht.
> `vercel link` weiterhin nur einmal aus `website/` (ein `.vercel/`-Ordner), Deploy-Befehl trotzdem vom Root.

### Erfolgs-Check (Butz, 2026-05-28)
- https://fliesenmeister-butz.vercel.app/ → **200**, HTML enthält `kostenrechner`
- `/css/style.css` → **200**

---

## Changelog (SOP)

| Datum | Projekt | Kurz |
|-------|---------|------|
| 2026-05-28 | Fliesenmeister Butz | Rückruf-Lead, WebP, Klaro idle, vercel.json Cache, Performance-Baseline, Domain/Vercel-Split dokumentiert |
| 2026-05-28 | Fliesenmeister Butz | Deploy-Architektur vereinheitlicht: Root-vercel.json entfernt, nur `website/vercel.json`, `vercel-deploy-architecture.md` |
| 2026-05-28 | Fliesenmeister Butz | Exit 127 (`buildCommand: website`), Root `webite`-Typo, ungültige vercel.json-Header, CLI-Deploy vom Repo-Root — Production READY auf vercel.app |
