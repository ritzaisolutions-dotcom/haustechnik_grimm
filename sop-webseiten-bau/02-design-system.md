# 02 – Design System

---

## Farbschema-Extraktion aus Logo

**Process:**

```
1. Logo Datei vom Kunden holen (SVG > PNG > JPG)
2. Tool: coolors.co/image-picker ODER imagecolorpicker.com
3. Dominante 3-5 Farben extrahieren
4. Hex-Werte notieren
5. Helligkeits-Varianten ableiten (light/dark)
```

**Wenn Kunde kein Logo hat:**

Frage Claude an User: "Welche Farbwelt passt zur Branche?"

| Branche | Farb-Empfehlung |
|---|---|
| Premium Handwerk / Baddesign | Schwarz + Gold + Cream |
| Klassisches Handwerk (Maler, Fliesen) | Stone-Grey + Akzentfarbe |
| Sanitär / Heizung | Blau + Weiß + Grau |
| Elektriker | Gelb + Schwarz |
| Garten/Außenarbeit | Grün + Erdtöne |
| Friseur / Beauty | Rosé / Schwarz / Weiß |
| Auto / KFZ | Schwarz + Rot oder Gold |

---

## CSS Variables Template

```css
:root {
  /* === BRAND COLORS === */
  --primary: #2C2A27;          /* Aus Logo */
  --primary-mid: #4A4640;
  --primary-light: #8C857A;
  --accent: #B8935A;           /* Aus Logo */
  --accent-light: #D4AA72;
  
  /* === SEMANTIC === */
  --bg: #FDFAF5;
  --bg-alt: #F5F0E8;
  --text: #2C2A27;
  --text-light: #8C857A;
  --border: #E8DFD0;
  
  /* === STATE === */
  --success: #2D6A4F;
  --error: #C53030;
  --warning: #D69E2E;
  
  /* === SPACING === */
  --space-1: 0.25rem;   /*  4px */
  --space-2: 0.5rem;    /*  8px */
  --space-3: 1rem;      /* 16px */
  --space-4: 1.5rem;    /* 24px */
  --space-5: 2rem;      /* 32px */
  --space-6: 3rem;      /* 48px */
  --space-7: 4rem;      /* 64px */
  --space-8: 6rem;      /* 96px */
  
  /* === RADIUS === */
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 8px;
  --radius-full: 9999px;
  
  /* === SHADOWS === */
  --shadow-sm: 0 2px 4px rgba(0,0,0,0.08);
  --shadow-md: 0 8px 24px rgba(0,0,0,0.12);
  --shadow-lg: 0 16px 48px rgba(0,0,0,0.16);
  
  /* === TRANSITIONS === */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 200ms;
  --duration-base: 300ms;
  --duration-slow: 600ms;
}
```

---

## Typography System

**Default Combo: Serif für Headlines + Sans für Body**

```css
/* Headlines: Cormorant Garamond (premium feel) */
font-family: 'Cormorant Garamond', Georgia, serif;
font-weight: 700;
font-style: normal; /* normal oder italic für Akzente */

/* Body: DM Sans (clean, readable) */
font-family: 'DM Sans', -apple-system, sans-serif;
font-weight: 300, 400, 500;
```

**Alternative Combos je nach Branche:**

| Branche | Headline | Body |
|---|---|---|
| Premium Handwerk | Cormorant Garamond | DM Sans |
| Modern Handwerk | Manrope | Inter |
| Tech-affin | Space Grotesk | Inter |
| Klassisch | Playfair Display | Lato |
| Auto / Tuning | Bebas Neue | Inter |

---

## Type Scale (Fluid)

```css
:root {
  --text-xs:   clamp(0.75rem,  1.5vw + 0.5rem, 0.85rem);
  --text-sm:   clamp(0.85rem,  1.5vw + 0.6rem, 0.95rem);
  --text-base: clamp(1rem,     2vw + 0.5rem,   1.1rem);
  --text-lg:   clamp(1.15rem,  2.5vw + 0.5rem, 1.3rem);
  --text-xl:   clamp(1.4rem,   3vw + 0.5rem,   1.75rem);
  --text-2xl:  clamp(1.75rem,  3vw + 0.8rem,   2.4rem);
  --text-3xl:  clamp(2.2rem,   4vw + 0.5rem,   3.4rem);
  --text-4xl:  clamp(3rem,     5vw + 1rem,     5.2rem);
}
```

---

## Logo Placement & Sizing

```
Nav Logo:        max-height 40px desktop, 32px mobile
Footer Logo:     max-height 32px
Hero Watermark:  max-width 120px (subtil im Hintergrund)
Favicon:         32x32, 16x16, apple-touch-icon 180x180
OG Image:        1200x630 mit Logo + Claim
```

---

## Bild-Behandlung

```css
/* Konsistente Bildbehandlung */
.image-styled {
  filter: saturate(0.85);  /* leicht entsättigt = premium */
  transition: filter var(--duration-base);
}

.image-styled:hover {
  filter: saturate(1);
}

/* Aspect Ratios */
.aspect-portrait  { aspect-ratio: 3/4; }
.aspect-square    { aspect-ratio: 1/1; }
.aspect-landscape { aspect-ratio: 16/9; }
.aspect-wide      { aspect-ratio: 21/9; }
```

---

## Komponenten-Bibliothek (Minimal)

**Buttons:**
```css
.btn-primary  { /* Hauptaktion */ }
.btn-secondary { /* Sekundär */ }
.btn-ghost   { /* Tertiär, nur Text */ }
```

**Cards:**
```css
.card         { /* Standard */ }
.card--feature { /* Hervorgehoben (Booking-CTA) */ }
.card--minimal { /* Schlicht */ }
```

**Section Labels:**
```css
.section-label { /* Kleiner Text über H2 */ }
.section-h2   { /* Hauptüberschrift Sektion */ }
```

**Niemals:** Custom-Buttons in jeder Section neu erfinden. Immer Klassen wiederverwenden.

---

## Premium-Look Checkliste

```
□ Weißraum großzügig (mind. 96px zwischen Sektionen)
□ Serif-Italic für Akzent-Wörter
□ Dünne Hairlines (1px) statt fette Borders
□ Subtile Schatten, keine 3D-Effekte
□ Dezente Animations (0.3-0.6s, ease-out)
□ Bilder leicht entsättigt
□ Konsistente Border-Radius (alle 2px oder alle 4px)
□ Nur EIN Akzent-Farbton, nicht 5 verschiedene
□ Keine Emojis als Hauptdesign-Element (nur supportiv)
```

**Anti-Premium:**
```
✗ Comic Sans, Papyrus
✗ Drop Shadows mit großem Blur
✗ Gradient-Overload
✗ Verlauf von 3+ Farben
✗ Bullet Points mit Emojis als Hauptcontent
✗ Center-aligned Body Text
✗ Auto-rotierende Carousels
```

---

## Iconography Standards

```
□ Eine Icon-Familie pro Projekt (nicht mischen)
□ Einheitliche Linie/Flaeche (stroke oder fill)
□ Einheitliche Groesse (z.B. 20/24px) in Card-Layouts
□ Farben nur aus Design-Tokens (primary/accent/text)
□ Dekorative Icons: aria-hidden="true"
□ Informations-Icons: mit lesbarer Text-Alternative
```

**Pflichtbereiche mit Icons:**
- Leistungen (pro Servicekarte)
- Warum wir / Vorteile
- Terminbuchung-Karten

**Verboten:**
- Emoji-Mix statt konsistenter Icons
- Pro Section andere Icon-Stile
