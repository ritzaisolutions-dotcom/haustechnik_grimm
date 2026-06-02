# 01 – Architektur & Tech Stack

---

## Tech Stack – Default

**Konservativ. Bewährt. Wartbar.**

```
HTML5             → semantisch, accessible
CSS3              → CSS Variables, Grid, Flexbox
Vanilla JavaScript → keine Frameworks für simple Sites
```

**Kein React. Kein Vue. Kein Next.js.**
Außer der Kunde verlangt es ausdrücklich oder Komplexität rechtfertigt es (z.B. Mehrsprachigkeit + 50+ Seiten + Headless CMS).

---

## Wann welcher Stack?

| Use Case | Stack |
|---|---|
| Handwerker One-Pager | Vanilla HTML/CSS/JS |
| Handwerker Multi-Page (< 10 Seiten) | Vanilla HTML/CSS/JS |
| Multi-Page mit häufigen Updates durch Kunde | WordPress + Custom Theme |
| Buchungs-heavy (Friseur, Therapeut) | WordPress + LatePoint / Amelia |
| E-Commerce | WooCommerce oder Shopify |
| Komplex + Skalierung erwartet | Next.js + Headless CMS (Sanity/Strapi) |

**Default-Annahme: Vanilla HTML/CSS/JS** – das deckt 80% der Cases ab.

---

## Erlaubte Dependencies (per CDN)

```html
<!-- Fonts: nur Google Fonts oder self-hosted -->
<link href="https://fonts.googleapis.com/css2?family=...">

<!-- Calendar: Cal.com bevorzugt vor Calendly (DSGVO) -->
<script src="https://app.cal.com/embed/embed.js"></script>

<!-- Maps: OpenStreetMap statt Google Maps wenn möglich -->
<iframe src="https://www.openstreetmap.org/export/embed.html...">

<!-- Cookie Consent: Klaro (Open Source, DSGVO-konform) -->
<script src="https://cdn.kiprotect.com/klaro/latest/klaro.js"></script>
```

**Niemals ohne Rückfrage:** Bootstrap, Tailwind, jQuery, GSAP, AOS, Swiper, irgendein npm-Package.

**Klaro auf Live-Sites:** Version pinnen; laden per `requestIdleCallback` oder self-host — nicht `latest` aus CDN im kritischen Pfad (siehe `14-learnings.md` §9).

---

## Vercel-Deploy & Git

```
website/              ← Dashboard: Root Directory = website (einziger Deploy-Root)
website/vercel.json   ← EINZIGE Vercel-Config (kein /vercel.json im Repo-Root)
website/images/       ← alle deployten Client-Assets (JPG/PNG/WebP/MP4)
images/current/       ← optional lokales Archiv (gitignored), vor Deploy nach website/images/ kopieren
```

**Verboten:** Gleichzeitig Dashboard Root Directory = `website` **und** Root-`vercel.json` mit `"outputDirectory": "website"` → sucht `website/website/` → 404.

**`.gitignore`:** niemals `website/images/` ignorieren — sonst fehlen Assets auf Vercel (`14-learnings.md` §5).

**CLI:** `vercel link` nur aus `website/`, nicht zusätzlich im Repo-Root.

**Lokaler Preview:** `npm run preview` → Port 4173; Smoke: `npm run smoke`.

**Referenz:** `project-docs/vercel-deploy-architecture.md` (Butz-Projekt).

---

## Datei-Struktur

```
projekt-name/
├── index.html
├── impressum.html
├── datenschutz.html
├── 404.html
├── referenzen.html
├── kostenrechner.html
│
├── leistungen/
│   ├── [leistung-1].html
│   ├── [leistung-2].html
│   └── [leistung-3].html
│
├── assets/
│   ├── bilder/
│   │   ├── hero/
│   │   ├── referenzen/
│   │   ├── team/
│   │   ├── vorher-nachher/
│   │   └── og-preview.jpg
│   ├── icons/
│   ├── fonts/ (falls self-hosted)
│   └── dokumente/
│
├── css/
│   ├── style.css           ← Haupt-Stylesheet
│   ├── animations.css      ← Alle Animationen separat
│   └── variables.css       ← CSS Variables (Farben, Spacing)
│
├── js/
│   ├── main.js             ← Hauptlogik
│   ├── slider.js           ← Vorher/Nachher
│   ├── calc.js             ← Kostenrechner
│   └── pdf.js              ← PDF-Generator
│
└── docs/                   ← Übergabe an Kunde
    ├── README.md
    ├── kunde-anleitung.pdf
    └── deployment.md
```

---

## CSS Konventionen

```css
/* CSS Variables in :root – immer */
:root {
  --primary: #2C2A27;
  --accent: #B8935A;
  --text: #4A4640;
  --bg: #FDFAF5;
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 2rem;
}

/* BEM-Light Naming */
.hero { }
.hero__title { }
.hero__title--gold { }

/* Mobile First – immer */
.element { /* mobile styles */ }
@media (min-width: 768px) { /* tablet+ */ }
@media (min-width: 1024px) { /* desktop+ */ }
```

---

## JavaScript Konventionen

```javascript
// Vanilla, ES6+
// IIFE wrapping um globalen Scope sauber zu halten
(() => {
  'use strict';
  
  // DOM nur einmal abfragen, cachen
  const slider = document.getElementById('comparison-slider');
  if (!slider) return; // Defensive coding
  
  // Event Listener immer mit Cleanup-Möglichkeit
  const handleResize = () => { /* ... */ };
  window.addEventListener('resize', handleResize);
})();
```

**Regeln:**
- Defensive Coding: nie davon ausgehen dass Element existiert
- Passive Event Listener für Touch/Scroll Performance
- requestAnimationFrame für Animationen statt setInterval
- IntersectionObserver statt scroll-event-listening

---

## Performance Targets

```
Lighthouse Scores (Mobile):
- Performance: ≥ 90
- Accessibility: ≥ 90
- Best Practices: ≥ 95
- SEO: ≥ 95

Total Page Weight: < 1.5 MB
Largest Contentful Paint: < 2.5s
First Input Delay: < 100ms
Cumulative Layout Shift: < 0.1
```

---

## Browser Support

```
Chrome / Edge: Letzte 2 Versionen
Firefox: Letzte 2 Versionen
Safari: Letzte 2 Versionen (iOS + macOS)
```

**Nicht unterstützt:** IE11, Opera Mini.
**Graceful Degradation:** Site muss ohne JS lesbar sein.

---

## Hosting Empfehlungen

| Hosting | Wann | Preis |
|---|---|---|
| **Netlify** | Statische Sites, kostenlos | 0€ |
| **Hetzner** | DE-Hosting, DSGVO-stark | ~5€/Mo |
| **All-Inkl** | Kunde will deutschen Anbieter | ~5€/Mo |
| **Vercel** | Bei Next.js | 0€-20€/Mo |

**SSL: Immer Let's Encrypt – automatisch, kostenlos.**

---

## Asset Path Reliability (Pflicht)

**Ziel:** Kein Broken Media nach Deployment.

```
1. Vor Build eine Asset-Inventarliste führen (Dateiname + finaler Pfad).
2. Keine Misch-Strategie bei Pfaden:
   - Entweder root-relative (/images/...)
   - oder konsequent seitenrelativ (../images/...)
3. Für Subpages IMMER prüfen, ob Bilder/Videos aus deren Ordnerkontext erreichbar sind.
4. Vor Launch: jede Seite auf 404 bei img/video/source prüfen.
```

**Fail-Safe für Medien:**

```html
<img src="..." loading="lazy" decoding="async" alt="...">
<video poster="..." muted playsinline>
  <source src="..." type="video/mp4">
</video>
```

- Bei Video-Fehler muss ein Poster sichtbar bleiben.
- Bei fehlendem Asset muss ein sichtbarer Placeholder statt „kaputtes Bild“ erscheinen.
