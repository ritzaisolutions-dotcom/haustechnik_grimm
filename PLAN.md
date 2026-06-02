# Plan: Handwerker-Website Template

## Ausgangslage
- **Quelle:** `Fliesenmeister Butz/website/` (fertig, produktionsreif)
- **Ziel:** `Vorlage_Handwerker_Webseite/` → GitHub `Hanwerker_Webseite_Vorlage_RAIS.git`
- **Constraint:** Bilder bleiben als Placeholder, SOP-Dateien kommen mit

---

## Schritt 1 — Verzeichnis aufsetzen (10 min)
Kopiere das komplette `website/`-Verzeichnis aus Butz in den Template-Ordner. Dann:
- `git init`, Remote setzen
- `.gitignore` anpassen (Butz-spezifische Dinge raus, generische Template-Regeln rein)
- `CLAUDE.md` für Template-Kontext neu schreiben

---

## Schritt 2 — `website/js/config.js` (15 min)
Exakt das CLIENT-Objekt wie im Prompt, plus ein paar Felder die im Code gefunden wurden:

```js
const CLIENT = {
  // Firma
  name: "[FIRMENNAME]",
  nameKurz: "[NAMEKURZ]",
  // ... alle Felder als "[PLACEHOLDER]"

  // Kostenrechner Preise
  preise: { standard: 135, premium: 240, xl: 330, ... },

  // Klaro (DSGVO-Banner Storage-Key)
  klaroStorageName: "handwerker-consent-v1",

  // Kammer (für Impressum)
  kammer: "[KAMMER_NAME, KAMMER_ORT]",
  berufsbezeichnung: "[BERUFSBEZEICHNUNG]",
  fachverband: "[FACHVERBAND_NAME]"
};
```

---

## Schritt 3 — `website/js/config-apply.js` (45 min)
Der eigentliche Motor. Läuft auf `DOMContentLoaded` und:

**a) Meta/SEO** — Setzt `<title>`, alle `og:*`, `twitter:*`, `canonical` dynamisch

**b) Schema.org** — Ersetzt das statische JSON-LD `<script>` durch ein dynamisch generiertes aus `CLIENT`-Werten

**c) `data-config="KEY"` → textContent** — z.B.:
```html
<span data-config="name">FIRMENNAME</span>
<!-- JS: el.textContent = CLIENT.name -->
```

**d) `data-config-href="KEY"` → href** — Für Tel-Links, mailto, Social-Links, Cal.com, Maps

**e) `data-config-src="KEY"` → src** — Für Maps-iFrame

**f) Formular-Keys** — Setzt alle `<input name="access_key" value="">` auf `CLIENT.web3formsKey`

**g) Kalkulationspreise** — Aktualisiert die Preis-Texte in den `calc-choice__desc`-Spans

---

## Schritt 4 — `calc.js` anpassen (15 min)
Aktuell hat `calc.js` hardcodierte Preise und Kapazitätsdaten. Umschreiben auf:

```js
const PREISE = CLIENT.preise; // statt 135, 240, etc.
const CAPACITY = CLIENT.kapazitaet || {};
```

Defensive: `if (typeof CLIENT === 'undefined') { ... Fallback-Werte ... }`

---

## Schritt 5 — `index.html` mit `data-config` Attributen (40 min)
Die umfangreichste Datei. Folgende Felder werden mit Attributen versehen:

| HTML-Element | Attribut | Config-Key |
|---|---|---|
| `<span class="trust-item__value">27+` | `data-config="jahreErfahrung"` | `jahreErfahrung` |
| `<span>38 Google-Bewertungen` | `data-config="googleBewertungAnzahl"` | `googleBewertungAnzahl` |
| `<a href="tel:...` | `data-config-href="telefon"` | `telefon` |
| `<input name="access_key"` | JS überschreibt alle direkt | `web3formsKey` |
| Klaro `storageName` | JS-Override | `klaroStorageName` |

Bewertungstexte: Bleiben als HTML-Placeholder-Kommentare `<!-- [BEWERTUNG_1] Vorname + Text -->` — diese müssen pro Kunde manuell eingetragen werden (nicht sinnvoll in config.js).

Über-Uns-Text: Bleibt als `<!-- [ÜBER_UNS_TEXT] -->` Placeholder.

---

## Schritt 6 — Restliche HTML-Dateien (30 min)
Für `impressum.html`, `datenschutz.html`, `team.html`, `referenzen.html`, alle 4 Leistungs-Unterseiten:
- Nav Logo `alt`-Attribut → `data-config="name"`
- Footer Copyright → `data-config="name"`
- Adresse/Kontakt in Impressum/Datenschutz → `data-config` für alle Felder
- Logo-Breite/Höhe-Attribute (aktuell noch `1024×217` in Subpages) → auf `200×42` korrigieren

---

## Schritt 7 — `variables.css` kommentieren (5 min)
Keine Logik-Änderung, nur Kommentare:

```css
--primary: #1a2b4c; /* [PRIMÄRFARBE] — aus Logo/Branding */
--accent:  #2980b9; /* [AKZENTFARBE] — aus Logo/Branding */
```

So weiß der nächste Entwickler sofort wo die Farben zu tauschen sind.

---

## Schritt 8 — `SETUP.md` (30 min)
Vollständige Kundenübergabe-Anleitung, Struktur:

```
1. VORAUSSETZUNGEN
   - GitHub + Vercel Account, Node optional für Localtest

2. config.js AUSFÜLLEN
   - Jedes Feld erklärt mit Beispiel

3. BILDER AUSTAUSCHEN
   - Tabelle: Dateiname | Beschreibung | Empf. Dimension
   - images/logo-[KUNDE].png      — Logo, 800×170px min.
   - images/favicon-[KUNDE].png   — Quadratisch, 512×512px
   - images/butz_header_2.webp    — Hero-Bild, 1920×1080px min.
   - images/team-bild.webp        — Teamfoto, 4:3
   - images/ref_1..10.webp        — Referenzen, 350×350px
   - images/vorher_slide.webp     — Vorher, 1024×571
   - images/nachher_slide.webp    — Nachher, 1024×571
   - images/meisterbrief.webp     — Urkunde, Hochformat

4. BEWERTUNGEN + ÜBER-UNS EINTRAGEN
   - Wo in index.html die Placeholder-Kommentare sind

5. WEB3FORMS EINRICHTEN
   - Account anlegen, Key kopieren → config.js

6. CAL.COM EINRICHTEN
   - Account anlegen, Link → config.js

7. VERCEL DEPLOYMENT
   - Root Directory = "website" (NICHT Build Command!)
   - Aus REPO-ROOT deployen, nicht aus website/
   - Alle Learnings §17–19 eingearbeitet

8. FARBEN ANPASSEN
   - variables.css: --primary, --accent ändern

9. RECHTLICHES FREIGEBEN
   - Impressum prüfen/ergänzen
   - Datenschutz prüfen

10. GO-LIVE CHECKLISTE
    - Gate A (Inputs), B (Legal), C (No JS errors),
      D (SEO tags), E (HTTPS + CTA flows)
```

---

## Schritt 9 — SOP-Dateien + Git Push (10 min)
- SOP-Ordner aus Butz in Template kopieren (mit Lernhistorie §14)
- `CLAUDE.md` für das Template schreiben (verweist auf SOPs)
- Alles committen, zu GitHub pushen

---

## Zeitschätzung gesamt: ~3 Std

---

## Offene Fragen (vor Start klären)

1. **Branchenname im Template:** Generisch (`[FIRMENNAME] Fliesenfachbetrieb`) oder komplett branchenagnostisch (`[FIRMENNAME] [HANDWERKSBEZEICHNUNG]`)? Beeinflusst wie viel Fließtext als Placeholder markiert wird.

2. **Bewertungen:** Butz-Bewertungen als echte Beispiele stehen lassen (mit Kommentar `<!-- BEISPIEL — durch echte Kundenbewertungen ersetzen -->`) oder komplett mit `[BEWERTUNG_TEXT]` Platzhaltern leeren?

3. **Leistungstexte:** Badsanierung, Fliesenverlegung etc. sind Fliesen-spezifisch. Für Template lassen oder durch generische `[LEISTUNG_1_TITEL]` / `[LEISTUNG_1_TEXT]` ersetzen?
