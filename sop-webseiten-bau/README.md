# 📋 SOP – Kunden-Webseite Bau

Dieses Doc-Pack ist die Grundlage für jede Demo und jede Live-Webseite.
Claude liest diese Files **vor** jedem Build und arbeitet sie systematisch ab.

---

## Reihenfolge der Bearbeitung

```
1. 00-onboarding.md         → Discovery & Inputs vom Kunden
2. 01-architektur.md        → Tech Stack, Datei-Struktur, Konventionen
3. 02-design-system.md      → Farben, Fonts, Logo-Extraktion
4. 03-seitenstruktur.md     → Sitemap und Subpages
5. 04-sektionen.md          → Was auf jeder Seite drin sein muss
6. 05-hero-animation.md     → Animierter Hero + Scroll-Effekte
7. 06-vorher-nachher.md     → Before/After Slider
8. 07-terminbuchung.md      → Calendly / Cal.com Setup
9. 08-kontaktformular.md    → Form + Spam-Schutz + DSGVO
10. 09-kostenrechner.md     → Config Tool + PDF-Generator
11. 10-story.md             → Über-uns / Familien-Story
12. 11-rechtliches.md       → Impressum & Datenschutz
13. 12-seo-meta.md          → SEO, Schema.org, Performance
14. 13-claude-rules.md      → Wie Claude arbeitet, wann er fragt
```

---

## Wichtigste Regel

**Wenn Claude unsicher ist – fragen, nicht raten.**

Mitten im Coding fragen ist erlaubt und erwünscht.
Lieber 3 Minuten klären als 30 Minuten falsch bauen.

---

## Workflow für jedes Projekt

```
Phase 1: Onboarding (00) → Inputs sammeln
Phase 2: Setup (01-02)  → Stack & Design System fixieren
Phase 3: Demo bauen     → 03-07 minimal viable
Phase 4: Verkauf        → Sales-Termin
Phase 5: Live           → Alles Restliche (08-12)
Phase 6: Übergabe       → SEO, Hosting, Schulung
```

---

## Anti-Patterns – Was Claude NIE tun darf

- Designs aus Templates kopieren statt am Kunden-Branding orientieren
- npm install ohne explizite Freigabe
- Stock-Fotos verwenden wenn Kunde eigene Bilder hat
- Komplexe Frameworks für einfache Handwerker-Sites
- Cookie-Banner ohne echte Consent-Logik
- Calendly-Embed ohne DSGVO-Hinweis
- Farben raten – immer aus Logo extrahieren
- Texte erfinden – immer Kunde fragen

---

## Failure Prevention Index

- Asset-Pfade und Medien-Fallbacks: `01-architektur.md`
- Icon-Standards und visuelle Konsistenz: `02-design-system.md`
- Section-Hierarchie und Kontakt-Full-Frame: `04-sektionen.md`
- Vorher/Nachher Robustness: `06-vorher-nachher.md`
- Multi-Step Kostenrechner UX-Gates: `09-kostenrechner.md`
- Karten-/Consent-Rechtsabgleich: `11-rechtliches.md`

---

## Lessons Learned (2026-05-28, Demo Fliesenmeister Butz)

- Kostenrechner: Ergebnis-Step darf außerhalb vom `<form>` liegen, wenn der Submit-Button sauber per `form="calcForm"` referenziert ist.
- JS-Gate: Vor jedem Commit von produktivem Frontend-JavaScript muss `node --check` auf den geänderten Dateien laufen.
- Nav-Pattern für Video-Hero: Transparent im Hero, solide erst beim Verlassen der Hero-Sektion (Hero-gebundener Trigger statt fixer Pixelwert).
- Asset-Pipeline: Nur Assets aus dem deploybaren Root (`website/images/`) referenzieren; Quellordner außerhalb des Roots ignorieren.
- Karten-Embedding DSGVO: Google Maps ausschließlich über Consent-Gate laden und erst nach aktiver Einwilligung initialisieren.
