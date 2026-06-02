# 13 – Claude Rules

**Wie Claude arbeitet wenn er an einer Webseite baut.**

---

## Grundprinzipien

### 1. Fragen statt raten

**Wenn unklar – fragen. Nicht raten.**

```
✓ "Welche Farben sind im Logo dominant?"
✓ "Gibt es ein Teamfoto?"
✓ "Soll die Buchung über Cal.com oder Calendly?"
✓ "Wie lautet die exakte Berufsbezeichnung?"

✗ Annahmen treffen und losbauen
✗ "Ich nehme einfach mal Blau-Weiß"
✗ Stock-Photos einbauen ohne nachzufragen
```

### 2. Konservatives Coding

**Bewährtes vor Fancy.**

```
✓ Vanilla HTML/CSS/JS first
✓ Standards die seit Jahren funktionieren
✓ Browser-native APIs vor Bibliotheken
✓ Progressive Enhancement

✗ Bleeding-Edge Features ohne Polyfill
✗ Frameworks wenn nicht nötig
✗ Trendy Libraries die in 6 Monaten tot sind
✗ Über-Engineering simpler Probleme
```

### 3. Inkremental bauen

**Phase für Phase. Nicht alles auf einmal.**

```
Phase 1: HTML-Struktur ohne Style
Phase 2: CSS-Layout grob
Phase 3: CSS-Detail-Polish
Phase 4: JS-Interaktionen
Phase 5: Performance & Accessibility
Phase 6: Test auf echten Geräten
```

### 4. Defensive Coding

```javascript
// IMMER:
const element = document.getElementById('xyz');
if (!element) return; // Defensive

// NICHT:
document.getElementById('xyz').addEventListener(...);
// → Crash wenn Element fehlt
```

---

## Wann Claude FRAGT (mitten im Coding!)

**Diese Fragen MÜSSEN gestellt werden:**

```
□ Wenn eine Farbe gewählt werden muss und kein Logo da ist
□ Wenn ein Text erfunden werden müsste statt vom Kunden zu kommen
□ Wenn eine Auszeichnung erwähnt werden soll ohne Beleg
□ Wenn Telefonnummer/Adresse/Mail nicht eindeutig sind
□ Wenn ein Drittanbieter eingebunden werden soll (DSGVO)
□ Wenn eine Animation evtl. ablenkt statt zu helfen
□ Wenn Mobile/Desktop unterschiedlich gehandhabt werden soll
□ Wenn das Budget für ein Feature gesprengt würde
□ Wenn eine technische Entscheidung Langzeit-Folgen hat
□ Wenn Inhalte fehlen die für die Sektion essentiell sind
```

**Fragen am Stück, nicht einzeln:**

```
✓ "Drei Fragen bevor ich weitermache:
   1. Logo-Datei in welchem Format vorhanden?
   2. Sind alle 3 Vorher/Nachher-Paare verfügbar?
   3. Cal.com oder Calendly?"

✗ Einzeln tröpfeln, jeden Tag eine Frage
```

---

## Wann Claude NICHT fragt

```
✗ Bei Detail-Pixeln (Padding 16 oder 18?)
   → Selbst entscheiden, Standards verwenden

✗ Bei Animation-Timings (300ms oder 350ms?)
   → Selbst entscheiden, var(--duration) nutzen

✗ Bei semantischen HTML-Entscheidungen
   → Standards einhalten, niemand muss das diskutieren

✗ Bei CSS-Architektur
   → SOP-Docs einhalten

✗ Bei Cross-Browser-Kompatibilität
   → Test it, fix it
```

---

## Bei Konflikt: User über SOP

**Wenn User etwas verlangt das gegen SOP verstößt:**

```
Schritt 1: Aufmerksam machen
  "Das widerspricht der SOP-Empfehlung weil [GRUND]. 
   Soll ich trotzdem so umsetzen?"

Schritt 2: User entscheidet
  Wenn User bestätigt: machen
  Wenn User unsicher: SOP folgen + erklären warum

Niemals: Stillschweigend SOP brechen
Niemals: Stillschweigend User ignorieren
```

---

## Code-Qualität Standards

### HTML

```html
<!-- ✓ Semantic -->
<article>
  <header>
    <h2>Title</h2>
  </header>
  <p>Content</p>
</article>

<!-- ✗ Div-Suppe -->
<div class="article">
  <div class="header">
    <div class="title">Title</div>
  </div>
  <div>Content</div>
</div>
```

### CSS

```css
/* ✓ Variables verwenden */
.btn {
  padding: var(--space-3);
  color: var(--primary);
  border-radius: var(--radius-sm);
}

/* ✗ Magic Numbers */
.btn {
  padding: 14px;
  color: #2C2A27;
  border-radius: 3px;
}
```

### JS

```javascript
// ✓ Modern, Modular
(() => {
  'use strict';
  
  const init = () => {
    // ...
  };
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// ✗ Global Pollution
var x = 1;
function init() { ... }
init();
```

---

## Was Claude NICHT tun darf

```
✗ Fake-Daten erfinden
  "Über 5000 zufriedene Kunden"
  → Niemals ohne Beleg

✗ Bilder von anderen Sites klauen
  → DSGVO-Verstoß + Urheberrechtsverletzung

✗ KI-generierte Bilder als Team-Fotos
  → Vertrauensverlust wenn entdeckt

✗ Tracking-Pixel ohne Consent
  → Abmahnrisiko

✗ Auto-Play Videos mit Sound
  → Schlechte UX + Browser blockt eh

✗ Pop-Ups beim Page-Load
  → Conversion-Killer + Google bestraft

✗ Newsletter ohne Opt-In
  → DSGVO-Verstoß

✗ Affiliate-Links ohne Kennzeichnung
  → Wettbewerbsrechtlich problematisch
```

---

## Workflow: Demo bauen

```
PHASE 1: BRIEFING (30 Min)
  → 00-onboarding.md durchgehen
  → Kunden-Basics sammeln
  → Branding extrahieren (Logo, Farben, Ton)
  → Bestehende Web-Präsenz analysieren

PHASE 2: STRUKTUR (30 Min)
  → 03-seitenstruktur.md → Sitemap fixieren
  → 04-sektionen.md → Welche Sections rein?
  → Skip nicht relevante (z.B. kein Kostenrechner für Demo)

PHASE 3: HTML SKELETT (45 Min)
  → Alle Sections als HTML
  → Semantic markup
  → Placeholder-Content wo Inhalte fehlen
  → TODO-Kommentare für offene Punkte

PHASE 4: STYLING (60 Min)
  → 02-design-system.md → Variables setzen
  → Sektion für Sektion stylen
  → Mobile First
  → Auf Konsistenz achten

PHASE 5: HERO-MAGIC (45 Min)
  → 05-hero-animation.md → Anim. einbauen
  → Test auf Mobile
  → Performance prüfen

PHASE 6: VORHER/NACHHER (30 Min)
  → 06-vorher-nachher.md → Slider einbauen
  → Touch + Mouse testen
  → Mit Placeholdern wenn keine Bilder

PHASE 7: BOOKING DEMO (15 Min)
  → Cards mit Alert "In Live-Version Calendly"
  → 07-terminbuchung.md als Referenz für Live

PHASE 8: FINISH (15 Min)
  → Footer
  → Cookie-Banner (kosmetisch für Demo)
  → Impressum/Datenschutz als Placeholder-Links
  → Letzter Test

PHASE 9: TODO-BLOCK
  → Großer Kommentar am Anfang der Datei
  → Was muss für Live-Version noch gemacht werden
  → Strukturiert in Phases mit Aufwand

GESAMT: ~4-5 Stunden für eine starke Demo
```

---

## Workflow: Production-Live

```
PHASE 1: Demo → Live umbauen
  → Buchungs-Alerts durch echte Cal.com-Embeds ersetzen
  → Bilder von base64 auf externe Files
  → Domain & Hosting setup

PHASE 2: Rechtliches
  → 11-rechtliches.md komplett umsetzen
  → Impressum mit echten Daten
  → Datenschutz via Generator
  → Cookie-Banner Klaro einrichten

PHASE 3: SEO Foundation
  → 12-seo-meta.md komplett umsetzen
  → Schema.org einbauen
  → Sitemap.xml + robots.txt
  → Google Search Console
  → Google Business Profile verknüpfen

PHASE 4: Performance
  → Lighthouse Audit
  → WebP für alle Bilder
  → Lazy Loading
  → Font Optimization
  → JS deferred

PHASE 5: Subpages
  → /impressum.html
  → /datenschutz.html
  → /404.html
  → Leistungs-Unterseiten
  → /referenzen.html

PHASE 6: QA
  → Mobile auf echtem Gerät
  → Tablet
  → Desktop
  → Cross-Browser (Chrome, Safari, Firefox)
  → Accessibility-Audit

PHASE 7: Launch
  → DNS umstellen
  → SSL aktivieren
  → 301-Redirects von alter URL-Struktur
  → Search Console Submission
  → Erste Posts auf Social Media

PHASE 8: Übergabe
  → /docs/README.md mit Anleitung
  → Login-Daten dokumentieren
  → Kunden-Schulung Termin
  → Wartungsvertrag aktivieren

GESAMT: ~30-40 Stunden für gute Live-Version
```

---

## Status-Updates an User

```
JEDE ABGESCHLOSSENE PHASE:
  "✓ Phase X fertig. 
   Nächste: Phase Y.
   Brauche ich [INPUT] dafür."

BEI BLOCKERN:
  "✗ Blocker: [WAS]
   Ich brauche von dir: [WAS GENAU]
   Bis dahin: [WAS MACHE ICH STATTDESSEN]"

BEI ENTSCHEIDUNGEN:
  "Frage: Option A oder Option B?
   A: [PRO/CONTRA]
   B: [PRO/CONTRA]
   Mein Vorschlag: [WAS]"
```

---

## Anti-Patterns für Claude

```
✗ Endloser Code-Output ohne Pause
  → Lieber Sektion für Sektion zeigen, Feedback einholen

✗ Über-Erklärung was getan wird
  → Code spricht für sich. Kurze Updates reichen.

✗ Annahmen ohne Verifizierung
  → "Ich nehme an du willst..."

✗ Featuritis (immer mehr Features)
  → Skip wo möglich. Less is more.

✗ Stillschweigend Best Practices brechen
  → Lieber 2 Sätze erklären als später Refactoring

✗ Zu früh in Production-Mode bei Demo
  → Demo ≠ Live. Demos brauchen Speed + Wow, keine Perfektion.

✗ Zu spät den User involvieren
  → Lieber 3x klein fragen als 1x komplett falsch sein.
```

---

## Learnings dokumentieren

Nach jedem größeren Meilenstein (Deploy, Performance-Audit, neues Feature wie Kostenrechner) **Einträge in `14-learnings.md`** ergänzen — nummeriert, mit Was/Warum/Fix/Regel.

Querschnittsthemen in die passende SOP:
- Performance → `12-seo-meta.md`
- Rechner/Leads → `09-kostenrechner.md`
- Deploy/Struktur → `01-architektur.md`

Nicht nur im Chat festhalten — die SOP ist die Wissensbasis für das nächste Handwerker-Projekt.

---

## Letzte Regel

**Wenn unsicher: User fragen.**
**Wenn dringend: Best Guess + sofort kommunizieren.**
**Wenn klar: Einfach machen.**

Diese drei Regeln decken 99% aller Situationen ab.
