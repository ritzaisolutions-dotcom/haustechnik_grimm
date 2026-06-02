# 15 – Handwerker-Demo Learnings (übertragbar)

> **Stand:** 2026-05-29  
> **Quellen:** Tekin Gebäudereinigung (Demo), Vorlage Handwerker-Webseite  
> **Pflege:** Nach jeder Demo-Session neue übertragbare Punkte hier ergänzen (neueste oben). Projektspezifisches bleibt in `erkenntnisse.md` im jeweiligen Projekt-Root.

---

## Wann hier eintragen vs. projekt-lokal

| Inhalt | Datei |
|--------|--------|
| Gilt für **alle** Handwerker-/Gewerbe-Demos | **Diese Datei** (`15-handwerker-demo-learnings.md`) |
| Nur dieser Kunde / diese Demo | `[projekt]/erkenntnisse.md` |
| Noch offen vor Livegang | `[projekt]/backlog.md` |

---

## Bilder & Hero

### Hero-Slideshow

- **Reihenfolge ≠ Dateiname:** `hero-01.jpg` ist nicht automatisch Slide 1. Reihenfolge und Auswahl stehen in `js/config.js` → `heroSlides` (Desktop) und `heroSlidesMobile` (≤768px). **Erstes Array-Element = erstes sichtbares Bild.**
- **Stärkstes Vertrauensmotiv zuerst** (z. B. Bahnhof, Großkunde, Vorher/Nachher-Ergebnis) — **gleiche Slide 1 auf Desktop und Mobile**, wenn möglich.
- **Mobile eigene Liste:** Weniger Slides (3–4), nicht dieselbe 6er-Rotation wie Desktop. `hero-slideshow.js` wechselt per `matchMedia('(max-width: 768px)')`.
- **`objectPosition` pro Slide** setzen (`center 35%` = Fokus weiter oben). Auf schmalen Screens schneidet `object-fit: cover` aggressiv zu.
- **Preload** in `index.html` muss **dieselbe Datei** sein wie Slide 1 (`<link rel="preload" as="image" href="…">`).

### Was **nicht** in den Hero

- Instagram-Posts mit **zwei Hälften** (Logo links, Projekt rechts) — auf Mobile unleserlich.
- **Sponsoring / Pullover / Vereins-Motive** — gehören in Partner oder Referenzen, nicht Hero.
- Generische **Stock-Fotos**, wenn der Kunde Instagram/eigene Bilder hat.
- Team-Selfies mit großem Logo-Overlay.

### Bild-Pipeline (Instagram / Kunde)

- Roh-Saves liegen in `images/*_files/` und `images/*.html` → **gitignore + vercelignore**, nicht deployen.
- Deploy-Ziele: `hero-*.jpg`, `ref_*.jpg`, `vn-vorher.jpg`, `vn-nachher.jpg` usw.
- **Sprechende Quellnamen** erleichtern Zuordnung: `bahnhof.jpg`, `vorher_slide.jpg` → Import-Skript mappt auf Zieldateien.
- Nach Umbenennung: `python scripts/import_tekin_photos.py` (oder projekt-spezifisches Pendant) ausführen, dann JPGs committen.
- **Import-Skript:** Hero-Slots nicht aus Vereins/Sponsoring-Ordnern füllen (`hero-06` aus `bild_verein` = Fehler).
- **Unsplash-Fallback:** Viele IDs liefern **404 ohne** `Referer: unsplash.com` + Browser-`User-Agent`. Immer einzeln testen; Kundenfotos haben Priorität.

### Referenzen & Vorher/Nachher

- Referenz-**Texte** müssen zum **Motiv** passen (Bahnsteig ≠ Dusche). VN-Slider und Alt-Texte konsistent halten.
- **Mobile VN-Slider:** Initialzustand muss zum **aktiven Button** passen (`before`, nicht heimlich `after`). Sonst wirkt Mobile wie „andere Bilder“ als Desktop.

---

## Conversion & UX (Handwerker-Demos)

### Preise

- **Gebäudereinigung / preissensibles Gewerbe:** Keine öffentliche **Preissektion** / Richtwerte auf der Demo — niedrige Einstiegshürde, kein Preisvergleich. Angebot nach Besichtigung in FAQ/Copy kommunizieren.
- Kostenrechner optional; PDF/Cal.com erst für Live.

### Kontakt

- **Demo mit WhatsApp-Fokus:** Kontaktformulare **komplett entfernen** (nicht nur auf Mobile ausblenden). Anrufen + WhatsApp + `#kontakt-cta` + Sticky-Leiste reichen.
- Zielgruppen-Karten → `#kontakt-cta`, nicht totem Formular-Prefill.
- `bindWeb3Form` / Web3Forms erst bei Live + echtem Key.

### Mobile

- Hero: kein Sticky-Scale-Scroll-out (statischer Block, ~92svh).
- Sticky Contact Bar unten; `body`-Padding berücksichtigen.
- VN: Toggle-Buttons statt Regler unter ~720px.

### Vertrauen

- **Partner-Logos** (DB, Verein …) nur mit **schriftlicher Freigabe** — in Demo nur Text oder Initialen.
- DB-/Großkunden-Showcase in Kontakt-CTA wirkt stärker als Badge-Floskeln ohne Beleg.
- Bewertungen: **nicht erfinden** — Platzhalter klar als Demo kennzeichnen oder nur freigegebene Zitate.

---

## Inhalt & Sektionen

- Vorlage oft **Fliesenleger/Meisterbetrieb** — bei Reinigung/Hausmeister: Meister-/Generationen-Story, falsche Leistungs-Unterseiten und Branchen-Bilder **entfernen**.
- **Über uns:** Logo statt generischem Stock oder Vereins-Pullover, wenn Kunde das so will.
- Alle Leistungen auf **einer** Demo-Startseite (`#leistungen`) — `/leistungen/*.html` nur wenn bewusst gewünscht.
- `llms.txt` + `sitemap.xml` + `robots.txt` für Demo-URL mitdenken.

---

## Technik & Deploy

- **Stack:** Vanilla HTML/CSS/JS, `config.js` + `config-apply.js` für Kundendaten.
- **Git:** Instagram-Roharchive nicht committen; nur kuratierte JPG/PNG.
- **Vercel:** `main` → auto-deploy; Ziel-URL in README/CLAUDE notieren.
- **Klaro:** `storageName` pro Kunde (`tekin-consent-v1`), nicht Vorlagen-Default.
- **Karten:** SOP bevorzugt OpenStreetMap (DSGVO); Google Maps nur mit Consent-Gate — in Backlog für Live notieren.
- **Debug-/Audit-Skripte** nicht mit deployen.

---

## Typische Bugs (Checkliste nächste Demo)

```
□ Hero Slide 1 Desktop = Slide 1 Mobile (Config prüfen)
□ Kein Logo-Split / Pullover in heroSlides
□ Preload = erstes Hero-Bild
□ VN-Slider Mobile startet auf „Vorher“ wenn Button „Vorher“ aktiv
□ Keine totale Formular-Logik ohne HTML-Formular
□ Referenz-Bilder existieren (ref_2 etc.) — Import-Skript laufen lassen
□ Partner-Claims ohne Freigabe nur als Text
□ erkenntnisse.md + backlog.md Stand aktualisiert
□ Übertragbare Punkte in diese Datei (15) nachgetragen
```

---

## Projekt-Log (Quelle)

| Datum | Projekt | Kurz |
|-------|---------|------|
| 2026-05-29 | Tekin Gebäudereinigung | Hero Mobile/Desktop, keine Preise, WhatsApp-only, Instagram-Import, VN Bahnsteig, Über-uns-Logo |

---

## Nächste Demo: Quick-Start aus Tekin

1. Vorlage kopieren → `backlog.md` + `erkenntnisse.md` anlegen  
2. `CLIENT` in `config.js` befüllen  
3. Instagram-Saves lokal → Import-Skript / manuelle JPGs  
4. `heroSlides` + `heroSlidesMobile` **vor** erstem Deploy kuratieren  
5. Preissektion weglassen, wenn Branche preissensibel  
6. Kontakt: Demo = Telefon + WhatsApp  
7. Nach Session: Learnings hier + projekt-lokal dokumentieren  
