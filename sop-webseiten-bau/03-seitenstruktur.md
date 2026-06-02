# 03 – Seitenstruktur

---

## Standard Sitemap für Handwerker

```
INDEX.HTML (One-Pager mit Anker)
├─ #hero
├─ #vorher-nachher
├─ #leistungen
├─ #warum
├─ #familie
├─ #referenzen
├─ #bewertungen
├─ #termin
└─ #kontakt

UNTERSEITEN
├─ /referenzen.html              ← Galerie
├─ /kostenrechner.html           ← Tool
├─ /leistungen/
│   ├─ /[leistung-1].html
│   ├─ /[leistung-2].html
│   └─ /[leistung-3].html
├─ /impressum.html
├─ /datenschutz.html
└─ /404.html
```

---

## Entscheidungs-Matrix

| Frage | Wenn Ja | Wenn Nein |
|---|---|---|
| Hat Kunde < 5 Leistungen? | One-Pager reicht | Multi-Page mit Leistungs-Unterseiten |
| Hat Kunde >50 Referenzen? | Eigene Galerie-Seite | One-Pager Grid reicht |
| Will Kunde Preise zeigen? | Kostenrechner-Tool | Nur "auf Anfrage" |
| Hat Kunde Karriere-Bedarf? | /karriere.html später | Skip |
| Hat Kunde Blog-Content? | NEIN, niemals | ✓ |

---

## URL-Struktur Regeln

```
✓ /leistungen/badsanierung
✓ /referenzen
✓ /kostenrechner

✗ /seite-3
✗ /index.php?p=12
✗ /leistungen/Badsanierung-GmbH-Mannheim-2024
```

**Regeln:**
- Kleinbuchstaben
- Bindestrich statt Unterstrich
- Keine Dateiendungen sichtbar (.html versteckt durch Hosting)
- Maximal 3 Levels tief
- Deutsche Begriffe (SEO!)
- Keine Sonderzeichen, keine Umlaute

---

## Navigation Hierarchie

**Desktop Nav (max 5 Items):**
```
Logo | Leistungen | Referenzen | Über uns | Kontakt | [CTA: Termin buchen]
```

**Mobile Nav:**
```
Logo + Hamburger
↓ Slide-In Menu
- Leistungen
- Referenzen  
- Über uns
- Kontakt
- [CTA: Termin buchen]
- Telefonnummer (klickbar)
```

**Sticky Nav:**
Ja, immer. Aber:
- Höhe reduziert sich nach 100px Scroll
- Logo wird kleiner
- Background bekommt Blur

---

## Footer Struktur

```
┌─────────────────────────────────────────┐
│  LOGO                                    │
│  Kurzer Claim                           │
│                                          │
│  KONTAKT          LINKS         RECHTLICH│
│  Adresse          Leistungen    Impressum│
│  Telefon          Referenzen    Datensch.│
│  E-Mail           Über uns      AGB      │
│  Öffnungszeiten   Termin                 │
│                                          │
│  ── Trennlinie ──                       │
│                                          │
│  © 2025 Firmenname  Mitglied Innung XY  │
│  Made with care • Built by [Agentur]    │
└─────────────────────────────────────────┘
```

---

## 404 Seite – Pflicht

```html
- Großes "404" / "Seite nicht gefunden"
- Charmanter Text (passend zur Branche)
- 3 CTAs:
  → Zur Startseite
  → Zu den Leistungen
  → Termin buchen
- KEINE generische Fehlerseite
```

Beispiel für Fliesenleger:
> "Diese Seite liegt nicht richtig.
> Aber unsere Fliesen schon."

---

## Subpage Templates

**Jede Unterseite hat:**
```
1. Nav (sticky, dieselbe wie Hauptseite)
2. Page Hero (kleiner als Startseite-Hero)
   - H1 = Seitenname
   - Breadcrumb
   - Optional: Hero Image
3. Main Content
4. CTA Section am Ende (immer!)
   - "Termin buchen" oder "Anrufen"
5. Footer (immer derselbe)
```

---

## Breadcrumbs

```
Startseite > Leistungen > Badsanierung
```

**Pflicht auf allen Unterseiten.**
**Schema.org BreadcrumbList Markup mitliefern.**

---

## Page Weight Budget pro Seitentyp

| Seitentyp | Max. Größe | Bilder Max |
|---|---|---|
| index.html (One-Pager) | 1.5 MB | 10 |
| /leistungen/* | 800 KB | 5 |
| /referenzen.html | 2 MB | 30 (lazy load) |
| /kostenrechner.html | 600 KB | 2 |
| /impressum, /datenschutz | 300 KB | 0 |
| /404.html | 200 KB | 1 |

---

## Mandatory Internal Linking

```
Von Hero:
→ #leistungen
→ #termin

Von jeder Leistung-Card:
→ /leistungen/[name].html

Von Footer:
→ Alle Hauptseiten

Von Leistungs-Unterseiten:
→ /referenzen.html (relevante gefilterte Sicht)
→ #termin (Anchor zur Startseite)
```
