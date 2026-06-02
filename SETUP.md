# Handwerker Website Template — Setup-Anleitung

**Ziel:** Neuer Kundendeploy in **4–6 Stunden** (config.js + Texte + Bilder + Rechtliches prüfen).

---

## Schritt 1: Voraussetzungen

- [ ] GitHub-Account (Repo klonen/forken)
- [ ] Vercel-Account (kostenlos auf vercel.com)
- [ ] Web3Forms-Account (kostenlos auf web3forms.com)
- [ ] Cal.com-Account (kostenlos auf cal.com)
- [ ] Kundenmaterialien: Logo, Bilder, Kontaktdaten, Google-Profil-Link

---

## Schritt 2: `website/js/config.js` ausfüllen

Öffne `website/js/config.js` und ersetze **alle** `[PLACEHOLDER]`-Werte.

### Pflichtfelder

| Feld | Beschreibung | Beispiel |
|------|-------------|---------|
| `name` | Vollständiger Firmenname | `"Peter Butz Fliesenfachbetrieb"` |
| `nameKurz` | Nachname oder Kurzform (erscheint groß im Hero) | `"Butz"` |
| `unternehmenstyp` | Betriebsform | `"Fliesenfachbetrieb"` |
| `handwerksbezeichnung` | Berufsbezeichnung singular | `"Fliesenleger"` |
| `berufsbezeichnung` | Vollständiger Meistertitel | `"Fliesenlegermeister"` |
| `gruendungsjahr` | Gründungsjahr (4-stellig) | `"1997"` |
| `slogan` | 1–2 Sätze USP-Aussage | `"Von der Planung bis zur Übergabe."` |
| `heroEyebrow` | Kleine Zeile über H1 | `"Meisterbetrieb · Römerberg · seit 1997"` |
| `strasse` | Straße + Hausnummer | `"Werkstraße 23"` |
| `plz` | Postleitzahl | `"67354"` |
| `ort` | Ort | `"Römerberg"` |
| `telefon` | Tel ohne Leerzeichen für href | `"+4962328311"` |
| `telefonDisplay` | Tel Anzeigeformat | `"+49 (0)6232 83111"` |
| `email` | E-Mail-Adresse | `"info@fliesen-butz.de"` |
| `domain` | Live-Domain ohne trailing slash | `"https://www.fliesen-butz.de"` |
| `web3formsKey` | Web3Forms Access Key (→ Schritt 5) | `"099dd006-..."` |
| `calcomLink` | Cal.com Buchungs-URL (→ Schritt 6) | `"https://cal.com/butz/beratung"` |
| `googleMapsEmbedUrl` | Google Maps Embed-URL (→ Schritt 7) | `"https://www.google.com/maps/embed?..."` |
| `googleBewertungsLink` | Link zum Google-Bewertungsprofil | `"https://g.page/..."` |
| `googleBewertungAnzahl` | Anzahl Bewertungen als String | `"38"` |
| `googleBewertungNote` | Gesamtnote als String | `"5,0"` |
| `geoLat` | GPS Breite (aus Google Maps) | `"49.2996"` |
| `geoLng` | GPS Länge (aus Google Maps) | `"8.4030"` |
| `kammer` | Handwerkskammer | `"Handwerkskammer der Pfalz, Kaiserslautern"` |
| `fachverband` | Branchenverband | `"Fachverband Deutsches Fliesengewerbe"` |
| `jahreErfahrung` | Jahre als String (z.B. "27+") | `"27+"` |
| `teamGroesse` | Mitarbeiteranzahl als String | `"9"` |
| `bewertungenAnzahl` | Anzahl Bewertungen | `"38"` |

### Optionale Felder

| Feld | Beschreibung |
|------|-------------|
| `facebook` | Facebook-Profil-URL (leer lassen wenn nicht vorhanden) |
| `instagram` | Instagram-Profil-URL (leer lassen wenn nicht vorhanden) |
| `fax` / `faxDisplay` | Fax-Nummer (wenn vorhanden) |

### Kostenrechner anpassen

Falls Leistungen/Materialien nicht zur Branche passen:
- `calcProjekte[].label` — Projektkategorien umbenennen
- `calcMaterialien[].label` und `.desc` — Materialbezeichnungen
- `calcExtras[].label` und `.desc` — Zusatzleistungen
- `preise.*` — Preise pro m² anpassen

---

## Schritt 3: Bilder austauschen

Alle Bilder liegen in `website/images/`. Folgende Dateien ersetzen:

| Dateiname | Verwendung | Empf. Dimension | Format |
|-----------|-----------|-----------------|--------|
| `logo-client.png` + `.webp` | Logo in Navigation | min. 800×170px, transparenter Hintergrund | PNG + WebP |
| `favicon-client.png` | Browser-Tab-Icon | 512×512px quadratisch | PNG |
| `hero-poster.jpg` + `.webp` | Hero-Hintergrund (Fallback) | 1920×1080px min. | JPG + WebP |
| `video_hero_section_backround.mp4` | Hero-Video (optional) | 1920×1080px, max. 800KB | MP4 |
| `team-bild.jpg` + `.webp` | Teamfoto (Über uns) | 4:3 Format, min. 1200×900px | JPG + WebP |
| `bild-haus.jpg` + `.webp` | Betriebsbild (Warum wir) | 4:3 Format, min. 1200×900px | JPG + WebP |
| `ref_1.jpg` bis `ref_10.jpg` + `.webp` | Referenzgalerie | 350×350px (quadratisch) | JPG + WebP |
| `vorher_slide.png` + `.webp` | Vorher/Nachher Slider | 1024×571px (16:9) oder 768×1024px (3:4) | PNG + WebP |
| `nachher_slide.png` + `.webp` | Vorher/Nachher Slider | gleiche Dimension wie vorher_slide | PNG + WebP |
| `meisterbrief.jpg` + `.webp` | Urkunden/Zertifikate | Hochformat, min. 400×600px | JPG + WebP |
| `meisterbrief2.jpg` + `.webp` | Urkunden/Zertifikate | Hochformat | JPG + WebP |
| `urkunde.jpg` + `.webp` | Urkunden/Zertifikate | Hochformat | JPG + WebP |

**WebP konvertieren:**
```powershell
# Im Projektordner: (benötigt ffmpeg)
.\scripts\convert-images-webp.ps1
```

**Logo-Dateiname:** Im Template heißen die Dateien fest `logo-client.*` und `favicon-client.png`. Kundenlogo unter diesen Namen in `website/images/` ablegen — **kein** Umbenennen in HTML nötig.

**Weitere Pflichtfelder in config.js (neben Kontakt/SEO):**

| Feld | Beschreibung |
|------|-------------|
| `leistungenKurz` | Kurzliste für Meta-Description |
| `leistung1Titel` … `leistung4Text` | 4 Leistungskarten Startseite |
| `warumLabel`, `warum1Titel` … `warum4Text` | Warum-wir-Sektion |
| `referenzenIntro` | Einleitung auf referenzen.html |
| `team1Name` … `team3Rolle` | Teamseite (optional leer lassen) |
| `pdfSlug` | Dateiname für Kalkulations-PDF |

---

## Schritt 4: Texte in HTML eintragen

Diese Inhalte sind **teilweise** in `config.js`, teilweise in HTML:

| Inhalt | Wo |
|--------|-----|
| Leistungen (4 Karten), Warum-wir (4 Punkte), Team, Referenzen-Intro | `config.js` |
| Über-uns (3 Absätze) | `index.html` → `[ÜBER_UNS_ABSATZ_1]` … |
| Google-Bewertungen (5×) | `index.html` → `[BEWERTUNG_1_…]` |
| Leistungs-Unterseiten | `website/leistungen/*.html` |

### 4a) Über-Uns Text
Suche in `index.html` nach `[ÜBER_UNS_ABSATZ_1]` — ersetze die 3 Absätze mit dem Unternehmenstext des Kunden.

### 4a2) Warum-wir & Leistungen
Die meisten Texte laufen über `config.js` (`leistung1Titel`, `warum1Titel` usw.). Nur wenn die Struktur abweicht: direkt in `index.html` editieren.

### 4b) Google-Bewertungen (5 Stück)
Suche nach `[BEWERTUNG_1_VORNAME_NACHNAME]` — ersetze alle 5 Bewertungen mit echten Google-Bewertungen:
- Name: Echten Namen aus Google verwenden
- Text: Zitat unverändert (verbatim!) aus dem Google-Profil
- Avatar-Initiale: Ersten Buchstaben des Vornamens
- Link: `data-config-href="googleBewertung"` bleibt (wird automatisch gefüllt)

### 4c) Leistungs-Unterseiten
Texte unter `website/leistungen/*.html` anpassen (nicht in config.js).

---

## Schritt 5: Web3Forms einrichten

1. Gehe zu [web3forms.com](https://web3forms.com)
2. "Create your Access Key" — E-Mail-Adresse eingeben (die des Kunden)
3. Bestätigungs-Mail öffnen, Access Key kopieren
4. In `config.js`: `web3formsKey: "DEIN_KEY_HIER"`
5. Im Web3Forms Dashboard: Empfänger-E-Mail auf Kunden-Mail setzen

---

## Schritt 6: Cal.com einrichten

1. Gehe zu [cal.com](https://cal.com) — kostenlosen Account anlegen
2. Event-Typ anlegen: "Kostenloses Beratungsgespräch" (30–60 min)
3. Buchungs-URL kopieren (z.B. `https://cal.com/meinbetrieb/beratung`)
4. In `config.js`: `calcomLink: "https://cal.com/..."`

---

## Schritt 7: Google Maps Embed-URL holen

1. Gehe zu [maps.google.com](https://maps.google.com)
2. Adresse des Kunden suchen
3. "Teilen" → "Karte einbetten" → HTML-Code kopieren
4. Aus dem `<iframe src="...">` nur die URL extrahieren
5. In `config.js`: `googleMapsEmbedUrl: "https://www.google.com/maps/embed?..."`

---

## Schritt 8: Farben anpassen

Öffne `website/css/variables.css` und passe an:

```css
--primary:       #1a2b4c;   /* Hauptfarbe aus Kundenlogo */
--accent:        #2980b9;   /* CTA-Akzentfarbe — oft aus Logo */
--accent-hover:  #2471a3;   /* ~10% dunkler als accent */
--accent-light:  #d6eaf8;   /* sehr helle Version von accent */
```

Tipp: [coolors.co](https://coolors.co) → Logo-Farbe eingeben → Palette generieren.

---

## Schritt 9: Vercel Deployment

> **Wichtig:** Alle Deploy-Fehler aus früheren Projekten sind hier bereits berücksichtigt.

### 9a) Repo auf GitHub pushen
```bash
git init
git add .
git commit -m "init: Handwerker Template für [KUNDE]"
git remote add origin https://github.com/DEIN_ORG/REPO.git
git push -u origin main
```

### 9b) Vercel Projekt anlegen
1. Vercel Dashboard → "Add New Project" → GitHub Repo importieren
2. **Root Directory:** `website` eintippen (genau so, kleingeschrieben)
3. **Build Command:** **LEER LASSEN** (kein Framework = kein Build nötig)
4. **Output Directory:** **LEER LASSEN**
5. Framework Preset: **Other**
6. "Deploy" klicken

### 9c) Deployment prüfen
```bash
# 1. Preview-URL im Browser öffnen
# 2. Im Netzwerk-Tab prüfen: /css/style.css → 200
# 3. Im HTML prüfen: id="kostenrechner" vorhanden
# 4. Kein "TODO" oder "[PLACEHOLDER]" sichtbar
```

### 9d) Custom Domain setzen
Vercel Dashboard → Project → Settings → Domains → Domain hinzufügen.
DNS-Einträge beim Hoster laut Vercel-Anweisung setzen.

---

## Schritt 10: Rechtliches freigeben

- [ ] Impressum: Alle Daten vollständig (USt-IdNr, Kammer, Fachverband)
- [ ] Datenschutz: Auf Vollständigkeit prüfen (evtl. Datenschutz-Generator nutzen)
- [ ] Cookie-Banner: Klaro-Texte auf korrekten Firmennamen prüfen
- [ ] Impressum und Datenschutz von jeder Seite erreichbar (Footer-Links)

---

## Go-Live Checkliste

### Gate A — Inputs
- [ ] Alle `[PLACEHOLDER]` in config.js ausgefüllt
- [ ] Alle Pflichtbilder ausgetauscht und in `website/images/`
- [ ] Bewertungen eingetragen (5×)
- [ ] Über-Uns-Text eingetragen

### Gate B — Legal
- [ ] Impressum vollständig und rechtlich geprüft
- [ ] Datenschutz vollständig
- [ ] Cookie-Banner funktioniert (Ablehnen gleichwertig zu Akzeptieren)

### Gate C — No Errors
- [ ] Browser-Konsole: keine JS-Fehler
- [ ] Netzwerk-Tab: keine 404-Fehler auf Assets
- [ ] Kostenrechner komplett durchklickbar
- [ ] Kontaktformular erfolgreich absenden (Test mit echten Daten)

### Gate D — SEO
- [ ] `<title>` korrekt auf allen Seiten
- [ ] `<meta description>` sinnvoll
- [ ] Schema.org im DOM korrekt (Browser-Inspektor → script[type="application/ld+json"])
- [ ] `og:image` gesetzt (website/images/og-image.jpg vorhanden)
- [ ] sitemap.xml aktualisiert (domain + URLs)

### Gate E — HTTPS + Mobile
- [ ] HTTPS aktiv (Vercel macht das automatisch)
- [ ] CTA-Buttons auf Mobile tappbar (44×44px)
- [ ] Kontaktformular auf 375px bedienbar
- [ ] Hero-Video / Poster lädt auf Mobile
- [ ] Impressum + Datenschutz Links im Footer sichtbar

---

## Hilfe & Referenzen

- Web3Forms Docs: https://docs.web3forms.com
- Cal.com Docs: https://cal.com/docs
- Vercel Docs: https://vercel.com/docs
- Klaro Docs: https://heyklaro.com/docs
- SOP-Playbook: `sop-webseiten-bau/` (vollständige Entwicklungs-SOP)
