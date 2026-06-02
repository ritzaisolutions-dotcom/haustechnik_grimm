# 04 – Sektionen Detail

**Was auf jeder Sektion drin sein MUSS.**

---

## #hero (siehe auch 05-hero-animation.md)

```
PFLICHT:
□ Badge / Eyebrow Text (z.B. "Meisterbetrieb seit 1997")
□ H1 (Hauptaussage, max 8 Wörter)
□ Subline (1 Satz, max 20 Wörter)
□ 2 CTAs (Primary + Secondary)
□ Trust Bar (3-4 Zahlen/Fakten)
□ Hero Visual (Bild/Video/Grid)

OPTIONAL:
□ Marquee Ticker
□ Scroll Indicator
□ Animierter Hintergrund
```

**Don't:**
- Slider mit auto-rotation (Conversion-Killer)
- Mehr als 2 CTAs
- Mehr als 12 Wörter H1
- Pre-rolled Video mit Sound

---

## #vorher-nachher (siehe auch 06-vorher-nachher.md)

```
PFLICHT:
□ Section-Headline
□ 1 Slider mit min 2 Bildpaaren
□ Tab-Switch wenn mehrere Kategorien
□ CTA unten ("Ihr Projekt besprechen")

OPTIONAL:
□ Kurze Beschreibung pro Bildpaar
□ Zeit-Info ("3 Tage Arbeit")
```

---

## #leistungen

```
PFLICHT:
□ Section-Label + H2
□ 3-6 Service Cards (max!)
□ Pro Card:
  → Icon oder Nummer
  → Title (max 4 Wörter)
  → 1-2 Sätze Beschreibung
  → Link auf Unterseite ODER Anker

OPTIONAL:
□ Hover-Animationen (subtil)
□ Hintergrundbilder pro Card
```

**Anti-Pattern:** Über 6 Cards. Lieber 4 gut als 8 mittelmäßig.

---

## #warum / #vorteile

```
PFLICHT:
□ 3-5 USPs
□ Pro USP:
  → Icon oder Checkmark
  → Title (max 4 Wörter)
  → 1 Satz Erklärung

OPTIONAL:
□ Großes Bild daneben (z.B. Team)
□ Statistik-Boxes ("27 Jahre")
□ Quote-Block vom Inhaber
```

**Beispiel USPs für Handwerker:**
- Termingerecht & verbindlich
- Sauber & respektvoll  
- Festpreisgarantie
- Meisterbrief + Innung
- Ein Ansprechpartner

---

## #familie / #über-uns (siehe auch 10-story.md)

```
PFLICHT:
□ Section-Label + H2
□ Story-Text (2-4 Absätze)
□ 1-2 Team-Fotos
□ Pro Person:
  → Name
  → Position / Titel
  → Optional: Auszeichnung / Jahr

OPTIONAL:
□ Meisterbrief / Urkunden als Thumbnails
□ Award-Badges (z.B. "Landessieger 2011")
□ Gründungsjahr-Hervorhebung
```

---

## #referenzen

```
PFLICHT:
□ Section-Label + H2
□ Mindestens 8 Bilder im Grid
□ Hover-Effekt mit Projektname
□ Link auf vollständige Galerie

OPTIONAL:
□ Filter-Tabs nach Kategorie
□ Lightbox bei Klick
□ Vorher/Nachher Toggle pro Bild
```

**Grid:**
- Desktop: 4 Spalten
- Tablet: 2 Spalten
- Mobile: 1 Spalte oder 2 mit kleineren Bildern

---

## #bewertungen / #stimmen

```
PFLICHT:
□ 3 Featured Reviews
□ Pro Review:
  → 5 Sterne (gelb/gold)
  → Text (max 3 Sätze)
  → Name (Vorname, Nachname-Initial)
  → Optional: Stadt / Projekt

OPTIONAL:
□ Echtes Google-Widget eingebettet
□ Gesamt-Rating prominent
□ "X Bewertungen" Zähler
□ "Auf Google bewerten" CTA
```

**Wichtig:** Echte Reviews verwenden, nicht erfinden. Wenn Kunde keine hat → diese Section weglassen.

---

## #termin

```
PFLICHT:
□ Section-Header zentriert
□ 2 Booking-Cards:
  → Card 1: "Kostenloses Beratungsgespräch" (Featured)
  → Card 2: "Reparatur anfragen" oder "Vor-Ort-Termin"
□ Pro Card:
  → Icon
  → Title
  → Beschreibung
  → Meta-Info (Dauer, Ort, Kosten)
  → CTA Button
□ Telefon-Fallback unter den Cards

OPTIONAL:
□ Inline Calendar-Widget unter den Cards
□ Vertrauenshinweise ("Bestätigung in 24h")
```

---

## #kontakt

```
PFLICHT:
□ Section-Header
□ Adresse (mit Schema.org Markup)
□ Telefon (klickbar tel:)
□ E-Mail (klickbar mailto:)
□ Öffnungszeiten
□ Karte (Google Maps oder OpenStreetMap)

OPTIONAL:
□ Kontaktformular daneben (siehe 08-kontaktformular.md)
□ Anfahrtsbeschreibung
□ Parkplatz-Hinweis
```

---

## FOOTER

```
PFLICHT:
□ Logo
□ Adresse + Kontakt
□ Quick Links
□ Impressum-Link
□ Datenschutz-Link
□ Copyright + Jahr

OPTIONAL:
□ Social Media Icons
□ Innungs-/Verbands-Badges
□ Newsletter-Signup (nur wenn aktiv genutzt)
□ "Made by [Agentur]"
```

---

## Sektions-Reihenfolge (Optimal)

```
1. Hero              → Erster Eindruck
2. Vorher/Nachher    → Beweis (Wow-Effekt)
3. Leistungen        → Was ich bekomme
4. Warum wir         → Warum nicht Konkurrenz
5. Über uns / Familie → Vertrauen aufbauen
6. Referenzen        → Mehr Beweis
7. Bewertungen       → Social Proof
8. Termin            → Conversion
9. Kontakt           → Notfall-CTA
```

**Logik:** AIDA - Attention → Interest → Desire → Action.

---

## Mobile Section Heights

```
Hero:           min 100vh, max 110vh
Vorher/Nachher: min 80vh
Andere:         auto, padding 70px oben/unten
```

**Niemals:** Sektionen unter 60vh auf Mobile – wirkt gehetzt.

---

## Section Hierarchy Fail-Safe

Wenn Inhalte fehlen, Reihenfolge NICHT zufaellig umstellen. Verwende diesen Fallback:

```
1. Hero
2. Vorher/Nachher (falls keine Bildpaare: Section ausblenden)
3. Leistungen
4. Kostenrechner (frueh im Flow, vor Referenzen/Bewertungen)
5. Warum wir
6. Referenzen
7. Bewertungen
8. Termin
9. Kontakt
```

**Regel:** Der Kostenrechner ist bei Handwerker-Landingpages ein starker USP und darf nicht erst kurz vor Footer erscheinen.

## Kontakt Full-Frame Vorgabe

```
Desktop:
□ Kontaktinfo + Karte + Formular als klare Gesamtkomposition
□ Karte nicht als Nebenelement verstecken
□ Formular bleibt ohne horizontales Scrollen nutzbar

Mobile:
□ Reihenfolge: Info → Karte → Formular
□ Karte mit sinnvoller Mindesthoehe (>= 300px)
```
