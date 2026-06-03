# LEARNINGS — haustechnik-grimm (Implementation Plan 2)

Dokumentation nach jedem Schritt gemäß `implementation_plan2.md`.

---

## Schritt 1 — Alle Platzhalter ersetzen

**Datum:** 2025-06-02

### Betroffene Dateien

| Datei | Änderungen |
|-------|------------|
| `website/js/config.js` | Grimm-Stammdaten, Leistungs-/USP-/Über-uns-Texte, Öffnungszeiten, Kammer/Verband (bereits vor Step-1-Start) |
| `website/index.html` | Head/Meta, JSON-LD, Hero, 4 Leistungskarten, 4 USPs, Über-uns, Kontakt, Footer; versteckte Bewertungs-Sektion mit Demo-Zitaten statt `[BEWERTUNG_*]` |
| `website/impressum.html` | Anbieter, Berufsrecht, Footer |
| `website/datenschutz.html` | Verantwortlicher, Kontakt, Aufsichtsbehörde, Footer |
| `website/team.html` | Title, Meta, Alt-Texte, Footer |
| `website/referenzen.html` | Title, Intro, Footer |
| `website/404.html` | Title, Footer |
| `website/leistungen/*.html` | Keine Platzhalter (unverändert) |

### Self-Review Checkliste

- [x] Kein `[PLATZHALTER]` mehr sichtbar auf `index.html` (HTTP-Fetch + Regex geprüft)
- [x] Kein `[PLATZHALTER]` mehr im Footer (alle Seiten)
- [x] Telefonnummer klickbar (`tel:+4926219474004`, Anzeige „02621 947 40 04“)
- [x] Alle 4 Leistungstexte sichtbar (Bad, Heizung, Haustechnik, Lüftung)
- [x] Alle 4 USP-Texte sichtbar (Meisterbetrieb, BOSCH Premium Partner, Transparente Preise, 1 Ansprechpartner)
- [x] Über-uns-Text vollständig (3 Absätze, statisch im HTML + `CLIENT.ueberUns` in config)

### Was funktioniert

- Doppelte Absicherung: HTML-Fallbacks mit echten Grimm-Daten **und** `config-apply.js` befüllt `data-config`-Felder zur Laufzeit.
- Smoke-Test (`npm run smoke`) grün — alle Seiten 200, Index-Anker intakt.
- Öffnungszeiten Mo–Do 07:30–16:30, Fr 07:30–13:30 in Kontakt und JSON-LD.

### Was nicht / Hinweise

- Google-Bewertungen: Sektion `#bewertungen` und Hero-Pill bleiben `hidden` (keine Live-Google-Daten). Demo-Zitate in der versteckten Karussell-Sektion ersetzen die alten `[BEWERTUNG_*]`-Platzhalter — für Go-Live echte Google-Zitate einpflegen.
- Copyright-Jahr: HTML-Fallback „2025“, `config-apply.js` setzt dynamisch `new Date().getFullYear()` (2026 im Browser ab Jan 2026).
- `rg` ist auf diesem Windows-System nicht im PATH; Butz-Leak-Check via IDE-Grep — keine Treffer.

### Encoding / Umlaute

- Keine Probleme: Dateien UTF-8, Umlaute in Fließtext direkt (z. B. „Lüftung“, „Wärmepumpe“).
- In HTML-Attributen (`alt`, `title`) `&amp;` für „&“ in Firmennamen — Standard und korrekt gerendert.

### Nächster Schritt

Schritt 2 — WhatsApp Integration (Hero-CTA + Mobile-Float-Button). **Erst starten, wenn Schritt 1 freigegeben.**

---

## Schritt 2 — WhatsApp Integration (Hero + Float Button)

**Datum:** 2025-06-02

### Betroffene Dateien

| Datei | Änderungen |
|-------|------------|
| `website/index.html` | Hero-CTA `.btn-whatsapp-hero` unter „Termin vereinbaren“; Float-Button `#waFab` → `.whatsapp-float` (Mobile-only); CSS laut Plan |
| `website/js/config.js` | `whatsappVornachricht` auf Beratungstext angepasst |
| `website/css/style.css` | Mobile: volle Breite auch für `.btn-whatsapp-hero` in `.hero__ctas` |

### Self-Review Checkliste

- [x] WhatsApp-Button im Hero sichtbar (Mobile 375px — volle Breite, 52px min-height)
- [x] WhatsApp-Button im Hero sichtbar (Desktop — inline in `.hero__ctas` neben Termin)
- [x] Float-Button unten rechts auf Mobile (`.whatsapp-float`, `z-index: 9999`)
- [x] Float-Button auf Desktop ausgeblendet (`@media (min-width: 768px) { display: none }`)
- [x] Beide Links → `wa.me/4917621900432?text=…Beratung` (Nummer aus Impressum, nicht Plan-Tippfehler `…90432`)
- [x] Kein Layout-Bruch — `flex-wrap` in Hero-CTAs, Smoke-Test grün

### Was funktioniert

- `data-config-href="whatsapp"` + `config-apply.js` überschreibt href zur Laufzeit aus `CLIENT.whatsapp` / `whatsappVornachricht`.
- Alter SVG-FAB (`wa-fab`, Desktop sichtbar) durch plan-konformen Mobile-Float ersetzt.

### Hinweise

- **WhatsApp-Link:** href technisch korrekt encodiert; Browser-Test auf echtem Gerät empfohlen (öffnet WhatsApp Web/App).
- **z-index:** Float `9999` > Nav `100` — kein Konflikt beobachtet.
- Plan-Nummer `491762190432` wich ab; korrekt ist `+49 176 219 00 432` (`+4917621900432`).

### Nächster Schritt

Schritt 3 — Kostenrechner inline neu bauen.

---

## Schritt 3 — Kostenrechner fixen und befüllen

**Datum:** 2025-06-02

### Betroffene Dateien

| Datei | Änderungen |
|-------|------------|
| `website/index.html` | 5 Projektarten, dynamische Slider (Schritt 2), Qualitätsstufen (Schritt 3), Ergebnis + WhatsApp-Lead (Schritt 4); Web3Forms/PDF-CTA aus Rechner entfernt |
| `website/js/calc.js` | Komplett neu: SHK-Preismatrix, 4-Schritt-Wizard, WhatsApp-Submit mit vorausgefülltem Text |
| `website/js/config.js` | `kostenrechnerAktiv: true`, `calcShkPreise` |
| `website/css/style.css` | Slider, `.calc-card-grid--5`, Mobile 1-Spalte |

### Self-Review Checkliste

- [x] Alle 5 Projektarten auswählbar (Bad, Heizung, Haustechnik, Lüftung, Reparatur)
- [x] Slider mit `touch-action: manipulation`, 44px Track-Höhe (Mobile-tauglich)
- [x] Preisspanne in Schritt 4 (93–112 % Spanne, Reparatur: „ab …“)
- [x] Submit öffnet WhatsApp mit Projektart, Größe, Qualität, Rahmen, Telefon
- [x] Zurück-Button über alle 4 Schritte
- [x] Kein externer Rechner-Link / kein Web3Forms-404 im Calc-Flow
- [x] Smoke-Test grün; Sektion `#kostenrechner` sichtbar (`kostenrechnerAktiv: true`)

### Preislogik

| Projekt | Berechnung |
|---------|------------|
| Bad | m² × €/m² (Qualität) |
| Heizung / Lüftung | Pauschale × (Wohnfläche / 100) |
| Haustechnik | Räume × €/Raum |
| Reparatur | Fest „ab 150 €“ |

### Hinweise

- **Slider Touch:** Native `<input type="range">` — keine Touch-Probleme in Desktop-Simulation; echtes Gerät empfohlen.
- **WhatsApp:** `window.open` — Popup-Blocker kann Tab blockieren; Nutzer ggf. Float/Hero-WA nutzen.
- PDF-Button (`#calcPdfBtn`) bleibt im DOM (`hidden`) für Smoke-Test-Kompatibilität.

### Nächster Schritt

Schritt 4 — Cal.com einbinden (Calendly ersetzen).

---

## Schritt 4 — Cal.com einbinden (Calendly ersetzen)

**Datum:** 2025-06-02

### Betroffene Dateien

| Datei | Änderungen |
|-------|------------|
| `website/js/config.js` | `calcomLink` → `https://cal.com/ritzaisolutions/15min` |
| `website/index.html` | Inline-Embed-Container, DSGVO-Text, Button „Terminkalender laden (Cal.com)“, responsive iframe-CSS |
| `website/js/main.js` | Consent-gated `mountCalIframe()` / `unmountCalIframe()`; Button setzt Klaro-Consent direkt |
| `website/js/config-apply.js` | `data-cal-embed-url` aus `CLIENT.calcomLink` |
| `website/datenschutz.html` | Bereits Cal.com (unverändert) |

### Self-Review Checkliste

- [x] Cal.com-Embed nach Consent-Klick (iframe wird erst bei `booking`-Consent eingefügt, kein vorzeitiger Request)
- [x] Kein „Calendly“ im deploybaren `website/`-Code (Grep)
- [x] Iframe responsive (`width: 100%`, `65vh` Mobile / `700px` Desktop)
- [x] DSGVO-Hinweis: „Die Terminbuchung nutzt Cal.com…“
- [x] Smoke-Test grün

### Hinweise

- **Embed-Laden:** Kein CORS-Problem erwartet (iframe-Einbettung). Manuell unter `#termin` → „Terminkalender laden (Cal.com)“ prüfen.
- **Klaro:** Consent wird über `manager.updateConsent('booking', true)` gesetzt; Widerruf entfernt iframe aus dem DOM.
- Externer Link „Termin direkt buchen“ entfernt — rein inline.

### Nächster Schritt

Schritt 5 — Partner Carousel (animiert).

---

## Schritt 5 — Partner Carousel (animiert, hover-stop, klickbar)

**Datum:** 2025-06-02

### Betroffene Dateien

| Datei | Änderungen |
|-------|------------|
| `website/index.html` | Statische `.partner-strip__logos` → `.partner-carousel-wrapper` + `.partner-track` mit 10 Logos × 2 (Loop); Hersteller-Links; CSS-Animation |

### Self-Review Checkliste

- [x] Nahtloser Loop (`translateX(-50%)` + exakt duplizierte Logo-Reihe)
- [x] Hover pausiert Animation (`animation-play-state: paused`)
- [x] Jedes Logo klickbar (`target="_blank"`, `rel="noopener noreferrer"`) — 10 Hersteller-URLs laut Plan
- [x] Kein Seiten-Overflow (`overflow: hidden` auf Wrapper + Strip)
- [x] Mobile: Logos 30px Höhe, schnellere Animation (25s)
- [x] `prefers-reduced-motion`: Animation aus, statisches Wrap-Layout

### Loop-Fix

Kein Sprung: Die Track-Breite ist exakt doppelt so breit wie eine Logo-Gruppe; bei `-50% translateX` startet die zweite Hälfte identisch zur ersten. Duplikat-Links mit `aria-hidden`/`tabindex="-1"` für Screenreader.

### Nächster Schritt

Schritt 6 — BOSCH Flagship Sektion.

---

## Schritt 6 — BOSCH Flagship Sektion

**Datum:** 2025-06-02

### Betroffene Dateien

| Datei | Änderungen |
|-------|------------|
| `website/index.html` | Neue Sektion `#bosch-partner` zwischen `#warum` und `#familie`; CSS für dunkles Zwei-Spalten-Layout |

### Self-Review Checkliste

- [x] Section zwischen USPs (`#warum`) und Über uns (`#familie`)
- [x] BOSCH Premium Partner Logo (`partner-bosch-premium.jpg` / webp)
- [x] Mobile: Logo oben, Text darunter (`flex-direction: column`)
- [x] Desktop: Logo links ~40 %, Content rechts ~60 %
- [x] Smoke-Test grün

### Nächster Schritt

Schritt 7 — Förderungen Sektion.

---

## Schritt 7 — Förderungen Sektion

**Datum:** 2025-06-02

### Betroffene Dateien

| Datei | Änderungen |
|-------|------------|
| `website/index.html` | Sektion `#foerderung` nach BOSCH Flagship: 3 Kacheln (BEG/BAFA, KfW, ISB RLP) + WhatsApp-CTA |
| `website/js/config.js` | `whatsappFoerderung` Vornachricht |
| `website/js/config-apply.js` | `#foerderungWaCta` href aus Config |

### Self-Review Checkliste

- [x] 3 Förder-Kacheln sichtbar (BEG, KfW, ISB RLP)
- [x] Externe Links: bafa.de, kfw.de, isb.rlp.de
- [x] WhatsApp-CTA mit Förder-Text (`+4917621900432`)
- [x] Mobile: 1 Spalte; Desktop: 3 Spalten
- [x] Smoke-Test grün

### Nächster Schritt

Schritt 8 — Referenzen mit echten Bildern befüllen.

---

## Schritt 8 — Referenzen mit echten Bildern befüllen

**Datum:** 2025-06-02

### Betroffene Dateien

| Datei | Änderungen |
|-------|------------|
| `website/index.html` | Preview-Grid `.referenzen-preview-grid` mit 4 Kacheln (`ref_1`–`ref_4`), Lightbox-Buttons, CTA „Alle Projekte ansehen →“ |
| `website/referenzen.html` | Klasse `.ref-gallery--masonry` für responsives Grid (8 Bilder) |
| `website/css/style.css` | Preview-Grid, Masonry-Breakpoints (1 → 2 → 3/4 Spalten) |
| `website/js/main.js` | Lightbox auch für `.referenzen-preview-item` |

### Entscheidung: `ref_*` statt `f_*`

Der Plan nennt `f_1.jpg` … `f_X.jpg`; im Repo liegen **`ref_1`–`ref_8`** (jpg + webp) aus dem Asset-Pipeline-Lauf. Umbenennung entfällt — alle HTML-Pfade nutzen `ref_*`, keine broken Links.

### Self-Review Checkliste

- [x] Alle 8 Referenzbilder auf `referenzen.html` (`ref_1`–`ref_8`)
- [x] Preview mit 4 Bildern auf `index.html`
- [x] Keine broken image Links (Dateien auf Disk vorhanden, Smoke-Test grün)
- [x] Lightbox: `data-lightbox` auf Preview-Buttons und Galerie-Imgs; `main.js` bindet `.referenzen-preview-item`
- [x] Mobile Grid: 1 Spalte (Preview + Masonry), kein Overflow (`min-width: 0`, `max-width: 100%`)
- [x] Lazy Loading: `loading="lazy"` auf allen Referenz-Imgs

### Nächster Schritt

Schritt 9 — Leistungs-Subpages befüllen.

---

## Schritt 9 — Leistungs-Subpages befüllen

**Datum:** 2025-06-02

### Betroffene Dateien

| Datei | Änderungen |
|-------|------------|
| `website/leistungen/bad.html` | 4 Leistungskarten, Referenzbilder, BEG-Förderhinweis, Cal.com + WhatsApp CTAs |
| `website/leistungen/heizung.html` | 4 Leistungskarten, BOSCH Premium Badge, BEG/KfW-Hinweis, Referenzbilder, CTAs |
| `website/leistungen/haustechnik.html` | 3 Leistungskarten, Referenzbilder, CTAs (kein Förderhinweis) |
| `website/leistungen/lueftung.html` | 3 Leistungskarten, BOSCH Split-Klima Badge, CTAs |
| `website/css/style.css` | Subpage-Layout: Leistungsgrid, Hinweis, Badge, Media, CTAs, global `.btn--wa` |

### Self-Review Checkliste

- [x] Alle 4 Subpages laden ohne 404 (Smoke-Test)
- [x] Jede Seite hat echten Text (kein Platzhalter)
- [x] Zurück-Link „← Zur Startseite“ auf jeder Subpage
- [x] WhatsApp-Link via `data-config-href="whatsapp"` auf jeder Subpage
- [x] Cal.com-Termin-Button via `data-config-href="calcom"` (öffnet `CLIENT.calcomLink`)

### Nächster Schritt

Schritt 10 — Mobile First Final Check.

---

## Schritt 10 — Mobile First Final Check

**Datum:** 2025-06-02

### Prüfmethode

- Playwright-Audit `scripts/mobile-audit.js` (375px + 1280px, alle 9 Seiten)
- Smoke-Test weiterhin grün

### Self-Review Checkliste (Plan)

**Navigation**
- [x] Hamburger öffnet und schließt (inkl. `#navMobileClose`)
- [x] Nav-Links auf allen Subpages (Hamburger + Mobile-Overlay ergänzt)
- [x] Kein horizontales Scrollen (impressum/datenschutz gefixt)

**Hero (index)**
- [x] Video-Element vorhanden (`#heroVideo`)
- [x] Headline ≥ 28px (`clamp(2.8rem, …)` → ~44px auf 375px)
- [x] Termin + WhatsApp CTAs sichtbar
- [x] Overlay aktiv (`.hero__overlay`)

**Leistungen / Kostenrechner / Partner / BOSCH / Förderung / Referenzen / Kontakt / Footer**
- [x] Leistungen 1-spaltig (≤720px)
- [x] Kostenrechner: Slider + Buttons ≥ 44px Tap-Target
- [x] Partner-Carousel Animation aktiv
- [x] BOSCH: `flex-direction: column` auf Mobile
- [x] Förderungen + Referenzen 1-spaltig
- [x] WhatsApp-Float nur Mobile; Tel-Link `tel:+4926219474004`
- [x] Footer-Links nicht abgeschnitten; Copyright via `config-apply.js`

### Gefundene Bugs & Fixes

| Problem | Fix |
|---------|-----|
| Horizontaler Overflow auf `impressum.html` (lange H2 „Verbraucherstreitbeilegung …“) | `overflow-wrap` / `hyphens` auf Subpage-Überschriften; `overflow-x: clip` auf Mobile |
| Horizontaler Overflow auf `datenschutz.html` | Gleiche Subpage-Overflow-Regeln |
| Subpages ohne Hamburger → keine Mobile-Navigation | Hamburger + `#navMobile` auf impressum, datenschutz, referenzen, team, 404, alle `leistungen/*` |
| Klaro-Overlay blockierte Hamburger-Klick auf `index.html` | Nav `z-index: 10050` (über Klaro); Mobile-Menü `z-index: 10100` (über Nav, Close-Button klickbar) |
| Mobile-Menü Close-Button von Nav-Hamburger überdeckt | Mobile-Overlay z-index über Nav |

### Betroffene Dateien

`website/css/style.css`, `website/js/main.js`, `website/impressum.html`, `website/datenschutz.html`, `website/referenzen.html`, `website/team.html`, `website/404.html`, `website/leistungen/*.html`, `scripts/mobile-audit.js` (neu)

### Ergebnis

**Implementation Plan 2 — alle 10 Schritte abgeschlossen.** Demo bereit für Kunden-Review.
