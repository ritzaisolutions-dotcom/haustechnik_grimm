# 09 – Kostenrechner + PDF Export

**Lead-Magnet par excellence. User gibt Daten, bekommt PDF, Handwerker bekommt qualifizierten Lead.**

---

## Konzept

```
1. User klickt durch Config-Schritte
2. Sieht laufend Live-Preisindikator
3. Am Ende: E-Mail-Eingabe für PDF
4. PDF wird generiert + per E-Mail geschickt
5. Handwerker bekommt parallel den Lead
6. Disclaimer: "Unverbindlich, ersetzt kein Angebot"
```

**Wichtig:** Der Rechner ist NICHT für exakte Preise. Er ist ein **Lead-Generator mit Mehrwert** für den User.

---

## Beispiel: Badsanierungs-Rechner

### Schritt-Logik

```
SCHRITT 1: Größe des Bades
  ○ Bis 6 m²   → Basis 4.500 €
  ○ 6-10 m²    → Basis 7.500 €
  ○ 10-15 m²   → Basis 11.000 €
  ○ Über 15 m² → "Persönliches Angebot"

SCHRITT 2: Umfang der Arbeiten
  ☐ Komplettsanierung (Wände + Boden + Sanitär)    → +0% (im Basis)
  ☐ Nur Wand-Fliesen erneuern                       → -40%
  ☐ Nur Boden-Fliesen erneuern                      → -50%
  ☐ Dusche/Wanne tauschen                            → +1.500€
  ☐ Bodengleiche Dusche einbauen                    → +2.500€
  ☐ Heizkörper erneuern                              → +800€

SCHRITT 3: Materialqualität
  ○ Standard (Baumarkt-Standard)        → ×1.0
  ○ Mittel (Fachhandel)                  → ×1.3
  ○ Premium (Designfliesen)              → ×1.7
  ○ Luxus (Großformat XXL, Naturstein)   → ×2.2

SCHRITT 4: Extras
  ☐ Beleuchtung neu installieren     → +500€
  ☐ Spiegelschrank inkl. Montage      → +400€
  ☐ Handtuchheizkörper                → +600€
  ☐ Smarte Steuerung (App)            → +1.200€

SCHRITT 5: Zeitlicher Wunsch
  ○ So schnell wie möglich      → +10% Express
  ○ Innerhalb 3 Monaten          → 0%
  ○ Flexibel                     → -5%

SCHRITT 6: PLZ + Kontakt für PDF
```

### Live-Preisanzeige

```
Während User klickt – am Bildschirmrand:

┌──────────────────────────────┐
│   Ihr unverbindlicher        │
│   Richtpreis:                │
│                              │
│   ca. 8.500 €                │
│                              │
│   (Live-Update beim Klicken) │
│                              │
│   * Unverbindlicher Richtwert│
│   * Mwst. enthalten          │
└──────────────────────────────┘
```

---

## HTML Struktur

```html
<section class="calculator">
  
  <!-- Progress Bar -->
  <div class="calc-progress">
    <div class="calc-progress__bar" style="width: 20%"></div>
    <span class="calc-progress__text">Schritt 1 von 6</span>
  </div>
  
  <!-- Steps Container -->
  <div class="calc-steps">
    
    <!-- Step 1 -->
    <div class="calc-step active" data-step="1">
      <h3>Wie groß ist Ihr Badezimmer?</h3>
      <div class="calc-options">
        <label class="calc-option">
          <input type="radio" name="size" value="small" data-price="4500">
          <span>Bis 6 m²</span>
        </label>
        <!-- ... weitere Optionen -->
      </div>
      <button class="btn calc-next">Weiter →</button>
    </div>
    
    <!-- Step 2..6 analog -->
    
  </div>
  
  <!-- Sidebar: Live Price -->
  <aside class="calc-sidebar">
    <div class="calc-price-display">
      <span class="calc-price-label">Ihr Richtpreis:</span>
      <span class="calc-price-value">ca. 0 €</span>
      <span class="calc-price-disclaimer">
        Unverbindlich, ersetzt kein persönliches Angebot
      </span>
    </div>
  </aside>
  
</section>
```

---

## JavaScript Engine

```javascript
(() => {
  'use strict';
  
  const state = {
    currentStep: 1,
    totalSteps: 6,
    selections: {},
    basePrice: 0,
    finalPrice: 0
  };
  
  const priceConfig = {
    size: {
      small: 4500,
      medium: 7500,
      large: 11000,
      xlarge: 'custom'
    },
    scope: {
      complete: 0,
      walls_only: -0.4,  // -40%
      floor_only: -0.5,
      shower_swap: 1500,
      walk_in_shower: 2500,
      heater: 800
    },
    quality: {
      standard: 1.0,
      mid: 1.3,
      premium: 1.7,
      luxury: 2.2
    },
    extras: {
      lighting: 500,
      mirror_cabinet: 400,
      towel_heater: 600,
      smart_control: 1200
    },
    timing: {
      asap: 0.1,
      three_months: 0,
      flexible: -0.05
    }
  };
  
  function calculatePrice() {
    let base = priceConfig.size[state.selections.size] || 0;
    if (base === 'custom') {
      state.finalPrice = 'custom';
      return updateDisplay();
    }
    
    // Scope adjustments
    const scope = state.selections.scope || [];
    let scopeAddOns = 0;
    scope.forEach(s => {
      const val = priceConfig.scope[s];
      if (typeof val === 'number') {
        if (val < 1 && val > -1) {
          // Percentage adjustment
          base = base * (1 + val);
        } else {
          scopeAddOns += val;
        }
      }
    });
    
    // Quality multiplier
    const qMultiplier = priceConfig.quality[state.selections.quality] || 1;
    base = base * qMultiplier;
    
    // Extras
    const extras = state.selections.extras || [];
    const extrasTotal = extras.reduce((sum, e) => 
      sum + (priceConfig.extras[e] || 0), 0);
    
    // Timing adjustment
    const tAdjust = priceConfig.timing[state.selections.timing] || 0;
    
    let final = (base + scopeAddOns + extrasTotal) * (1 + tAdjust);
    
    // Round to nearest 100
    state.finalPrice = Math.round(final / 100) * 100;
    
    updateDisplay();
  }
  
  function updateDisplay() {
    const display = document.querySelector('.calc-price-value');
    if (state.finalPrice === 'custom') {
      display.textContent = 'Persönliches Angebot';
    } else {
      display.textContent = `ca. ${state.finalPrice.toLocaleString('de-DE')} €`;
    }
  }
  
  // ... Step Navigation Logic
})();
```

---

## PDF Generierung

### Option A: Client-Side (jsPDF)

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
```

```javascript
function generatePDF(data) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    unit: 'mm',
    format: 'a4'
  });
  
  // Header
  doc.setFontSize(20);
  doc.setTextColor(184, 147, 90); // accent gold
  doc.text('Ihre unverbindliche Kostenschätzung', 20, 25);
  
  // Logo
  doc.addImage(logoBase64, 'PNG', 150, 15, 40, 15);
  
  // Section: Ihre Auswahl
  doc.setFontSize(14);
  doc.setTextColor(44, 42, 39);
  doc.text('Ihre Konfiguration:', 20, 50);
  
  doc.setFontSize(11);
  let y = 60;
  
  Object.entries(data.selections).forEach(([key, value]) => {
    doc.text(`${key}: ${value}`, 25, y);
    y += 7;
  });
  
  // Price Box
  y += 10;
  doc.setFillColor(245, 240, 232); // cream
  doc.rect(20, y, 170, 30, 'F');
  doc.setFontSize(16);
  doc.setTextColor(44, 42, 39);
  doc.text('Geschätzter Preisrahmen:', 25, y + 12);
  doc.setFontSize(22);
  doc.setTextColor(184, 147, 90);
  doc.text(`ca. ${data.finalPrice.toLocaleString('de-DE')} €`, 25, y + 23);
  
  // Disclaimer
  y += 40;
  doc.setFontSize(8);
  doc.setTextColor(140, 133, 122);
  const disclaimer = [
    'WICHTIG – BITTE BEACHTEN:',
    '',
    'Diese Kostenschätzung ist UNVERBINDLICH und basiert auf Standardwerten.',
    'Der tatsächliche Preis kann nach Besichtigung vor Ort abweichen.',
    'Diese Schätzung ersetzt KEIN persönliches Angebot.',
    '',
    'Für ein verbindliches Angebot vereinbaren Sie bitte einen',
    'kostenlosen Beratungstermin unter:',
    '',
    '+49 (0)1234 567890',
    'termin.firmenname.de'
  ];
  
  doc.text(disclaimer, 20, y);
  
  // Footer
  doc.setFontSize(7);
  doc.text(
    `Erstellt am ${new Date().toLocaleDateString('de-DE')} – ` +
    `Gültigkeit: 30 Tage`, 
    20, 285
  );
  
  // Speichern
  doc.save(`kostenschaetzung-${data.name.replace(/\s/g, '-')}.pdf`);
}
```

### Option B: Server-Side (besser für E-Mail-Versand)

```
Backend: Node.js + Puppeteer ODER PHP + Dompdf
Vorteil: Schönere PDFs, einfacher per E-Mail zu senden
Aufwand: 4-6 Stunden Setup
```

---

## DSGVO-konformer Workflow

```
1. User füllt Rechner aus (kein E-Mail nötig bisher)
2. Bei Schritt 6: E-Mail erforderlich für PDF
3. Vor Submit: DSGVO-Checkbox
   "Ich stimme zu dass meine Anfrage gespeichert wird
   und ich das PDF per E-Mail erhalte"
4. PDF wird generiert + an Kunde geschickt
5. Parallel: Lead-E-Mail an Handwerker mit:
   - Vollständiger Konfiguration
   - Geschätztem Preis
   - Kontaktdaten
   - Hinweis: "User wartet auf Rückruf binnen 24h"
```

---

## Lead-Notification an Handwerker

```
Betreff: 🔥 HEISSER LEAD: Kostenrechner-Anfrage [PRICE] €

────────────────────────────────────
NEUER QUALIFIZIERTER LEAD
────────────────────────────────────

Geschätzter Auftragswert: 8.500 €
PLZ:                       67354

────────────────────────────────────
KONTAKT
────────────────────────────────────
Name:    Max Mustermann
E-Mail:  max@beispiel.de  
Telefon: 0151 12345678

────────────────────────────────────
KONFIGURATION
────────────────────────────────────
Größe:        6-10 m²
Umfang:       Komplettsanierung + 
              bodengleiche Dusche
Material:     Premium
Extras:       Beleuchtung, Spiegel
Zeitwunsch:   Innerhalb 3 Monaten

────────────────────────────────────
EMPFEHLUNG
────────────────────────────────────
✓ Innerhalb 24h zurückrufen
✓ Vor-Ort-Termin anbieten
✓ Sein PDF wurde an ihn geschickt

────────────────────────────────────
Eingegangen: 27.05.2026 14:32
────────────────────────────────────
```

---

## UI Patterns

```
✓ Progressbar oben (zeigt Fortschritt)
✓ Großere Touch-Targets auf Mobile (min 44px)
✓ Live-Preis IMMER sichtbar (right rail desktop, sticky bottom mobile)
✓ Multi-Select Checkboxen klar erkennbar
✓ "Weiter" / "Zurück" Navigation
✓ Anim. Übergänge zwischen Steps (slide)
✓ Bei letztem Step: deutlich machen "Jetzt PDF erhalten"
```

---

## Anti-Patterns

```
✗ Preis exakt darstellen (8.347,55 €) 
   → Lieber Spannen oder "ca."

✗ E-Mail VOR dem Konfigurieren abfragen
   → Konversion bricht ein

✗ Komplexe Felder (Quadratmeter selbst eingeben)
   → User weiß seine eigene Quadratmeter nicht

✗ Mehr als 8 Schritte
   → Drop-Off steigt exponentiell

✗ Disclaimer im 3pt Fußzeile verstecken
   → Rechtlich riskant

✗ PDF ohne Logo / Branding
   → Wirkt unseriös

✗ Keine Validierung der Eingaben
   → Garbage In, Garbage Out
```

---

## Branchen-Varianten

Der Rechner muss zur Branche passen:

| Branche | Variablen |
|---|---|
| **Fliesenleger** | m², Material, Bereiche |
| **Maler** | m² Wand, Anstrich-Typ, Vorarbeiten |
| **Elektriker** | Anzahl Räume, Smart Home Level |
| **Dachdecker** | m² Dach, Material, Dämmung |
| **Sanitär** | Bad-Größe, Komponenten |
| **Garten** | m² Fläche, Anlage-Typ |

**Jeder Rechner ist Branchenspezifisch zu konzipieren.**
Erst Workshop mit Kunde: Was sind realistische Preisspannen?

---

## Multi-Step UX Mindeststandard

```
□ 3-6 klare Schritte, keine Ueberladung
□ Pro Schritt eindeutige Aktion (auswaehlen, eingeben, bestaetigen)
□ Zurueck-Button ohne Datenverlust
□ Weiter nur bei validen Eingaben
□ Ergebnisstep mit klarer Spanne (min/avg/max oder ca.-Wert)
□ PDF-Button erst aktiv, wenn Ergebnis berechnet wurde
```

## Zustands- und Fehlerhandling

```
□ Empty State (noch nichts ausgewaehlt)
□ Validation State (Pflichtangaben fehlen)
□ Success State (Berechnung + naechste Conversion-CTA)
□ Error State (Rechen-/Renderingfehler, nutzerfreundliche Meldung)
```

**Lead-Logik:** Rechner darf niemals so bauen, dass User aus Versehen ohne Ergebnis/PDF im Flow endet.

---

## Update 2026-05-28 (Demo Fliesenmeister Butz)

### Wizard / PDF
- Ergebnis-Step kann außerhalb des Form-Elements liegen. Wichtig ist die korrekte Formular-Referenz des Submit-Buttons (`form="calcForm"`).
- `Weiter`/`Zurück`/`Berechnen` strikt step-abhängig schalten, damit der User nie in einen toten Zustand läuft.
- Disclaimer muss sichtbar im Ergebnis stehen und inhaltlich 1:1 im PDF wiederholt werden.
- Pflicht-Check vor Release: `node --check website/js/calc.js` und `node --check website/js/pdf.js`.
- `#calcPdfBtn` nach Berechnung sofort aktiv — **kein** Lead-Gate mehr vor PDF.

### Rückruf-Lead (Production-Pattern, bevorzugt vor E-Mail-Gate)
- Separates Formular `#calcCallbackForm` unter Ergebnis (Web3Forms).
- Felder: PLZ (5-stellig), Wunschmonat (12 Monate dynamisch), Telefon, Checkbox „Rückruf“, DSGVO, Honeypot.
- `CONFIG.capacity` in `calc.js`: `serviceAreaPrefixes` + `months['YYYY-MM']` → `full` | `available`.
- `#calcAvailabilityMsg` live bei PLZ/Monat; Wert zusätzlich in E-Mail (`Verfuegbarkeit`).
- Kalkulationsdaten aus `window.lastCalculation` an Web3Forms anhängen.
- `subject` dynamisch: `RÜCKRUF Kostenrechner – PLZ … – Monat … – Preisspanne`.
- Validierung: Telefon ≥6 Ziffern, beide Checkboxen, Web3Forms-JSON `success` prüfen.

### Preislogik Demo
- Orientierung Fliesen-Weber: `Fläche × €/m² × Projekt-Multi` + Extras, Spanne 93–112 %.
- Finale Butz-Preise erst nach Kaufvertrag in `CONFIG` — siehe `project-docs/Backlog.md`.

### Referenz-Implementierung
`website/index.html` (#kostenrechner), `website/js/calc.js`, `website/js/pdf.js`, `website/datenschutz.html`.

Details & Fehler: `14-learnings.md` §11.
