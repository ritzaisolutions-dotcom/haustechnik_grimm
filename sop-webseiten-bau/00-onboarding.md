# 00 – Onboarding & Discovery

**Bevor irgendein Code geschrieben wird – diese Liste durchgehen.**

---

## Inputs vom Kunden (Must-Have für Demo)

### Firmen-Basics
- [ ] Firmenname (offiziell)
- [ ] Geschäftsführer / Inhaber Name(n)
- [ ] Gewerbe / Spezialisierung
- [ ] Adresse (Straße, PLZ, Stadt)
- [ ] Telefonnummer
- [ ] E-Mail
- [ ] Öffnungszeiten

### Branding
- [ ] Logo (Vektor wenn möglich – sonst PNG mit Transparenz)
- [ ] Bestehende Website-URL (für Vorher/Nachher Vergleich)
- [ ] Facebook / Instagram URL
- [ ] Google Business Profile Link
- [ ] Bevorzugte Farben (oder aus Logo ableiten)

### Inhalte
- [ ] Über-uns Text (Story, Gründungsjahr, Werdegang)
- [ ] Auszeichnungen / Zertifikate (Meisterbrief, Innungen, etc.)
- [ ] Mindestens 8-12 Referenzfotos
- [ ] 2-3 Vorher/Nachher Bildpaare (für Slider)
- [ ] Teamfoto(s)
- [ ] Kundenbewertungen / Testimonials (Text + Name + ggf. Stadt)

### Leistungs-Portfolio
- [ ] Liste aller angebotenen Leistungen
- [ ] 3-5 Hauptleistungen mit kurzer Beschreibung
- [ ] Preisrahmen pro Leistung (für Kostenrechner)
- [ ] Bediente Region / Postleitzahlen

---

## Inputs vom Kunden (Für Live-Version)

### Rechtliches
- [ ] Vollständige Impressum-Daten (Geschäftsform, HRB-Nr., USt-IdNr.)
- [ ] Berufsbezeichnung & zuständige Kammer
- [ ] Aufsichtsbehörde (falls relevant)
- [ ] Verantwortlicher i.S.d. § 18 Abs. 2 MStV
- [ ] Berufshaftpflichtversicherung (Anbieter + Geltungsbereich)

### Buchungssystem
- [ ] Calendly / Cal.com Account vorhanden? Falls nein – wer richtet ein?
- [ ] Mit welchem Kalender soll synchronisiert werden (Google / Outlook)?
- [ ] Welche Termin-Typen sollen buchbar sein?
- [ ] Pufferzeiten zwischen Terminen?
- [ ] Sperrzeiten / Urlaub?

### Hosting & Domain
- [ ] Domain bereits vorhanden? Wo registriert?
- [ ] Aktuelles Hosting? Soll behalten oder migriert werden?
- [ ] DNS-Zugriff vorhanden?
- [ ] E-Mail über Domain? Soll erhalten bleiben?

---

## Discovery-Fragen für Sales-Call

**Schmerz herausfinden:**
1. Wie kommen aktuell Neukunden zu Ihnen?
2. Was nervt Sie an Ihrer aktuellen Online-Präsenz am meisten?
3. Was würden Sie sich von einer perfekten Website wünschen?

**Ziele klären:**
4. Wollen Sie mehr Anfragen oder bessere Anfragen?
5. Wollen Sie bestimmte Leistungen pushen?
6. Gibt es Auftragstypen die Sie NICHT wollen?

**Differenzierung:**
7. Was machen Sie besser als die Konkurrenz im Umkreis?
8. Welche Bewertungen / Auszeichnungen haben Sie?
9. Gibt es eine Story die Ihre Firma einzigartig macht?

---

## Recherche durch Claude vor dem Termin

```
1. Bestehende Website komplett crawlen
   → Strukturschwächen identifizieren
   → Designschwächen für Screenshots dokumentieren
   → Mobile View Screenshot

2. Social Media checken
   → Facebook, Instagram, ggf. YouTube
   → Bilder sammeln (mit Quellenangabe)
   → Tonalität der Posts analysieren

3. Google Business Profile prüfen
   → Bewertungen lesen
   → Wiederkehrende Lob-Punkte = USPs
   → Wiederkehrende Kritik = Vermeiden

4. Wettbewerber-Analyse (3-5 Konkurrenten im Umkreis)
   → Was machen die besser?
   → Was machen die schlechter?
   → Differenzierungs-Chancen identifizieren
```

---

## Output dieses Onboardings

Erstelle eine `kunde-brief.md` mit:
- Allen gesammelten Daten strukturiert
- Identifizierten USPs
- Empfohlenem Design-Stil (basierend auf Branche)
- Empfohlenen Sektionen
- Offenen Fragen → an Claude weiterleiten

**Erst danach beginnt das Coding.**
