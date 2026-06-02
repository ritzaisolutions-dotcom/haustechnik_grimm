# Backlog

Status-Werte: `open` | `ready` | `in_progress` | `blocked` | `done`

---

## Jetzt / Demo-Deploy (P0 technisch)

### Rückruf-Lead deployen (Commit + Push + Vercel)
- **Status**: done
- **Owner**: RAIS
- **Abhängigkeit**: —
- **Definition of done**: Rückruf-Formular + Kapazitätsprüfung live auf Vercel-Preview/Prod-URL

### `.gitignore` fix: nur `images/current/`, nicht `website/images/`
- **Status**: done
- **Owner**: RAIS
- **Abhängigkeit**: —
- **Definition of done**: Neue Assets unter `website/images/` werden ohne `git add -f` versioniert

### Smoke-Test: `calcCallbackForm`, `calcAvailabilityMsg`
- **Status**: done
- **Owner**: RAIS
- **Abhängigkeit**: Rückruf-HTML deployed
- **Definition of done**: `scripts/smoke-test.js` prüft Callback-IDs in `index.html`

### Web3Forms-Response in `calc.js` wie `main.js` parsen
- **Status**: done
- **Owner**: RAIS
- **Abhängigkeit**: —
- **Definition of done**: Fehlertexte aus Web3Forms-JSON, kein stilles `response.ok` ohne Body-Check

### `vercel.json` Security-Header (Basis)
- **Status**: done
- **Owner**: RAIS
- **Abhängigkeit**: Vercel-Deploy-Root `website/`
- **Definition of done**: `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` gesetzt

### Klaro-CDN Version pinnen
- **Status**: done
- **Owner**: RAIS
- **Abhängigkeit**: —
- **Definition of done**: Kein `klaro/latest` mehr; feste Version in `index.html`

### `website/docs/README.md` auf Rückruf-Modell aktualisieren
- **Status**: done
- **Owner**: RAIS
- **Abhängigkeit**: —
- **Definition of done**: Doku = Ist-Stand Code (Weber-Preislogik, Rückruf, kein PDF-E-Mail-Gate)

### Launch-Checkliste Domain/SEO (`project-docs/launch-domain-seo.md`)
- **Status**: done
- **Owner**: RAIS
- **Abhängigkeit**: —
- **Definition of done**: Checklisten für DNS, 301, GSC, Bing, GBP dokumentiert

---

## SEO, Domain & Suchmaschinen (prod)

### Domain-Umzug alter Hoster → Vercel
- **Status**: blocked
- **Owner**: RAIS + Kunde
- **Abhängigkeit**: Registrar-Zugang, DNS beim alten Hoster
- **Definition of done**: `www.fliesen-butz.de` zeigt auf Vercel, SSL aktiv, keine Mixed-Content-Fehler

### Apex + www: Canonical konsistent
- **Status**: open
- **Owner**: RAIS
- **Abhängigkeit**: Domain-Umzug
- **Definition of done**: Eine kanonische URL (`https://www.fliesen-butz.de`), Apex leitet auf www

### 301-Redirects von alter Website
- **Status**: blocked
- **Owner**: RAIS + Kunde
- **Abhängigkeit**: URL-Inventar alter Site, Hoster-Redirect-Regeln
- **Definition of done**: Alle indexierten/relevanten alten URLs → neue Pfade; Mapping in `project-docs/launch-domain-seo.md`

### Alte Site bis Cutover: Redirect oder „Moved“-Seite
- **Status**: open
- **Owner**: RAIS + Kunde
- **Abhängigkeit**: Cutover-Termin
- **Definition of done**: Kein Parallel-Betrieb mit Duplicate Content

### Google Search Console Property + Sitemap
- **Status**: blocked
- **Owner**: RAIS
- **Abhängigkeit**: Domain live auf Vercel
- **Definition of done**: Property verifiziert, `sitemap.xml` eingereicht, Indexierung beantragt

### Bing Webmaster Tools + Sitemap
- **Status**: blocked
- **Owner**: RAIS
- **Abhängigkeit**: GSC optional (Import möglich)
- **Definition of done**: Site verifiziert, Sitemap eingereicht

### Google Business Profile (Römerberg)
- **Status**: blocked
- **Owner**: Kunde + RAIS
- **Abhängigkeit**: Google-Konto Kunde, Verifizierung
- **Definition of done**: Profil verifiziert, NAP = Impressum, Website-URL = neue Site, Öffnungszeiten korrekt

### `robots.txt` / `sitemap.xml` / Canonical auf Prod-URL
- **Status**: ready
- **Owner**: RAIS
- **Abhängigkeit**: Domain live
- **Definition of done**: Gate D bestanden, alle URLs `https://www.fliesen-butz.de`

### OG-Image final (nicht Platzhalter-Header)
- **Status**: blocked
- **Owner**: Kunde + RAIS
- **Abhängigkeit**: finales Bild/Logo
- **Definition of done**: Social Preview zeigt freigegebenes OG-Bild

---

## Security & Forms (prod)

### Web3Forms produktiver Access-Key (Vercel Env)
- **Status**: blocked
- **Owner**: RAIS + Kunde
- **Abhängigkeit**: Vercel-Projekt, Web3Forms-Account
- **Definition of done**: Demo-Key aus Repo entfernt/rotiert; Key nur in Vercel Env; Empfänger `info@fliesen-butz.de`

### Web3Forms DPA / Drittland in Datenschutz freigegeben
- **Status**: blocked
- **Owner**: Legal/RAIS
- **Abhängigkeit**: Web3Forms-Vertrag/AVV
- **Definition of done**: Juristisch abgenommen, Datenschutz aktualisiert

### CSP (report-only → enforce)
- **Status**: open
- **Owner**: RAIS
- **Abhängigkeit**: Security-Header-Baseline live
- **Definition of done**: CSP ohne Breaking Changes (Klaro, Maps, Web3Forms)

### `server.js` `/api/contact` klären
- **Status**: done
- **Owner**: RAIS
- **Abhängigkeit**: —
- **Definition of done**: Entweder entfernt oder in Doku als „nur lokaler Preview“ markiert; kein Konflikt mit Web3Forms

---

## Production-only (nach Kaufvertrag)

### Social Media Einblendungen/Videos (prod)
- **Status**: open
- **Owner**: RAIS / Kunde
- **Abhängigkeit**: finale Contentfreigabe, Rechte am Video-Material
- **Definition of done**: freigegebene Social/Video-Assets eingebunden, mobil optimiert, Consent-konform

### Hero-Video ohne Watermark (prod)
- **Status**: blocked
- **Owner**: Kunde
- **Abhängigkeit**: finales Video-Asset in Web-optimierter Fassung
- **Definition of done**: watermark-freies Hero-Video aktiv, Fallback-Poster vorhanden, keine Ladefehler

### Cal.com final produktiv einbinden
- **Status**: blocked
- **Owner**: Kunde + RAIS
- **Abhängigkeit**: produktives Booking-Setup, finaler Consent-Text
- **Definition of done**: Terminbuchung nach Consent live, Events korrekt konfiguriert, Tracking/DSGVO abgestimmt

---

## Legal Hardening

### Datenschutzerklärung Hard Stress Test (prod)
- **Status**: open
- **Owner**: Legal/RAIS
- **Abhängigkeit**: finale Tool-/Datenflussliste (inkl. Kostenrechner-Rückruf: PLZ, Monat, Telefon)
- **Definition of done**: Datenschutzerklärung vollständig gegen echten Datenfluss geprüft, keine Lücken

### Finale juristische Abnahme Datenschutz/Consent
- **Status**: blocked
- **Owner**: Kunde + externe Rechtsprüfung
- **Abhängigkeit**: finale Drittservices, finale Consent-Konfiguration
- **Definition of done**: schriftlich freigegebene Datenschutz- und Consent-Texte

### USt-IdNr + Berufshaftpflicht final in Impressum
- **Status**: blocked
- **Owner**: Kunde
- **Abhängigkeit**: fehlende Stammdaten vom Kunden
- **Definition of done**: vollständige Pflichtangaben in `website/impressum.html` eingetragen und geprüft

---

## Kostenrechner (Production)

### Finale Preisvariablen Butz einpflegen
- **Status**: blocked
- **Owner**: Kunde + RAIS
- **Abhängigkeit**: Kaufvertrag, Butz-Kalkulationsgrundlage (Stundensätze, Materialaufschläge, regionale Preise)
- **Definition of done**: In `website/js/calc.js` → `CONFIG` alle Demo-Werte (derzeit Weber-Referenz) durch freigegebene Butz-Preise ersetzt:
  - **Projekt-Multiplikatoren** (`projects[].multi`): z. B. Badsanierung, Wohnräume, Terrasse, Reparatur
  - **Material €/m²** (`materials[].pricePerM2`): Feinsteinzeug, Premium/Naturstein, Großformat
  - **Zusatzleistungen €/m²** (`extras[].pricePerM2`): Altbelag, Abdichtung, FBH
  - **Spanne** (`range.minFactor`, `range.maxFactor`, `range.roundTo`)
  - HTML-Hinweistexte in `website/index.html` (#kostenrechner) an dieselben Werte angepasst
  - PDF-Ausgabe (`website/js/pdf.js`) und Lead-Felder (Web3Forms) geprüft
- **Referenz Demo**: `C:\RAIS_VAULT\Websites\Fliesen_Weber\calculator.js` (nur bis Live-Freigabe)

### Kostenrechner Kapazität & Rückruf-Leads (prod) – Betrieb
- **Status**: open
- **Owner**: Kunde + RAIS
- **Abhängigkeit**: Code deployed, Web3Forms prod-Key
- **Definition of done**:
  - `CONFIG.capacity.months` in `website/js/calc.js` bei Auslastung aktualisiert
  - `CONFIG.capacity.serviceAreaPrefixes` mit Kunde abgestimmt (aktuell 67/68)
  - Test-Rückruf: E-Mail mit PLZ, Monat, Verfügbarkeit, Telefon, Kalkulation
  - Optional Phase 2: Cal.com-Slots statt manueller Monatsliste

---

## Performance (ohne Hero-Video)

### Hero-Video komprimieren (bewusst zurückgestellt)
- **Status**: open
- **Owner**: RAIS
- **Definition of done**: `video_hero_section_backround.mp4` &lt;800 KB oder Mobile nur Poster; LCP Mobile &lt;2,5 s

### WebP + picture (Startseite, Team, Referenzen)
- **Status**: done
- **Owner**: RAIS
- **Definition of done**: WebP in `website/images/`, `<picture>` in HTML; Regenerierung via `scripts/convert-images-webp.ps1`

### Cache-Header Vercel
- **Status**: done
- **Owner**: RAIS
- **Definition of done**: `website/vercel.json` — lange Cache für `/images`, `/css`, `/js`; HTML `must-revalidate`

### Vercel Deploy-Architektur (Root Directory)
- **Status**: done
- **Owner**: RAIS
- **Definition of done**: Kein `/vercel.json` im Repo-Root; Dashboard Root Directory = `website`; `project-docs/vercel-deploy-architecture.md`; Preview-URL liefert neue Site

### Klaro verzögert laden
- **Status**: done
- **Owner**: RAIS
- **Definition of done**: Klaro via `requestIdleCallback` in `main.js`, nicht render-blocking im `<head>`

### Lighthouse Gate nach Domain-Cutover
- **Status**: open
- **Owner**: RAIS
- **Abhängigkeit**: Vercel live auf `www.fliesen-butz.de`
- **Definition of done**: Performance Mobile ≥90, Accessibility ≥90 (Video-Optimierung optional für letzte Punkte)

---

## Media/Brand Assets

### Logo/Favicon/OG final ersetzen
- **Status**: blocked
- **Owner**: Kunde + RAIS
- **Abhängigkeit**: finale Logo-Datei
- **Definition of done**: Logo, Favicon und OG-Bild auf allen Seiten konsistent

### Zweites Vorher/Nachher-Bildpaar
- **Status**: blocked
- **Owner**: Kunde
- **Abhängigkeit**: zusätzliches freigegebenes Bildpaar
- **Definition of done**: zweites Paar im Slider auswählbar, korrektes Cropping mobil/desktop

### Bildpipeline auf finale WebP/AVIF Assets
- **Status**: ready
- **Owner**: RAIS
- **Abhängigkeit**: finale Bildauswahl
- **Definition of done**: produktive Bilder komprimiert und in modernen Formaten mit sinnvollen Fallbacks

---

## Infra/Release

### Finales Key- und Secret-Management für Drittservices
- **Status**: blocked
- **Owner**: RAIS + Kunde
- **Abhängigkeit**: Domain, Produktivkonten und Rollenrechte
- **Definition of done**: Web3Forms-Key in Vercel Env; Demo-Keys entfernt; Rotationsprozess dokumentiert

### Lighthouse/CWV Production Baseline
- **Status**: ready
- **Owner**: RAIS
- **Abhängigkeit**: Domain live, Lighthouse-CLI
- **Definition of done**: mobile Lighthouse-Reports für Kernseiten dokumentiert, Maßnahmenliste bei Abweichungen

### Performance-Härtung nach echtem Content
- **Status**: ready
- **Owner**: RAIS
- **Abhängigkeit**: finaler Medien- und Textstand
- **Definition of done**: priorisierte Performance-Fixes umgesetzt (Critical Path, Medien, JS/CSS)

---

## Open Data Required From Client

### Fehlende Stammdaten und Freigaben
- **Status**: blocked
- **Owner**: Kunde
- **Abhängigkeit**: interner Freigabeprozess Kunde
- **Definition of done**: geliefert und schriftlich freigegeben:
  - Logo-Datei (SVG/PNG)
  - USt-IdNr
  - Berufshaftpflichtdaten
  - finaler Über-uns-Text
  - optional zweites Vorher/Nachher-Paar
  - Registrar-/Hoster-Zugang für Domain-Umzug
  - Google-Konto für Business Profile
