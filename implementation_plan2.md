# IMPLEMENTATION PLAN 2 — haustechnik-grimm
## Regel: Nach jedem Schritt STOPPEN. Review. Learnings. Bugs fixen. Dann weiter.

---

## WIE DU ARBEITEST

Nach **jedem einzelnen Schritt**:
1. Öffne die Seite im Browser / Preview
2. Prüfe Mobile (375px) UND Desktop (1280px)
3. Schreibe 2–3 Sätze was funktioniert und was nicht
4. Fixe alle gefundenen Bugs bevor du weitermachst
5. Dokumentiere Learnings in `LEARNINGS.md`
6. Dann und nur dann: nächster Schritt

**Fange NIEMALS den nächsten Schritt an bevor der aktuelle 100% funktioniert.**

---

## SCHRITT 1 — Alle Platzhalter ersetzen

**Was zu tun ist:**
Ersetze in allen HTML-Dateien jeden `[PLATZHALTER]` mit echten Daten:

| Platzhalter | Wert |
|---|---|
| [FIRMENNAME] | Sascha Grimm Heizung & Sanitär |
| [ORT] | Lahnstein |
| [STRASSE_NR] | Eulenhorst 38 |
| [PLZ] | 56112 |
| [TELEFON] | 02621 947 40 04 |
| [EMAIL] | info@grimm-sanitaer.de |
| [GRUENDUNGSJAHR] | 1998 |
| [UNTERNEHMENSTYP] | Meisterbetrieb |
| [FACHVERBAND] | SHK-Innung Rhein-Lahn |
| [JAHR] | 2025 |
| [MO-DO ZEITEN] | 07:30 – 16:30 Uhr |
| [FR ZEITEN] | 07:30 – 13:30 Uhr |
| [SLOGAN] | Ihr Fachbetrieb für Heizung, Bad und Haustechnik in Lahnstein und Umgebung. |
| [JAHRE] | 25 |
| [ANZAHL] | 8 |

Betroffene Dateien: index.html, alle Subpages, footer, impressum.html, datenschutz.html

**Leistungstexte (4 Kacheln):**
- Leistung 1 — Bad: "Von der Badmodernisierung bis zum barrierefreien Komfortbad — wir planen und realisieren Ihr Traumbad. Inklusive Förderberatung."
- Leistung 2 — Heizung: "Heizungsmodernisierung, Wärmepumpen und regenerative Systeme. Als BOSCH Premium Partner mit bevorzugter Ersatzteilversorgung."
- Leistung 3 — Haustechnik: "Trinkwasserhygiene, Rohrinstallation und Haustechnik-Service aus einer Hand. Schnell, sauber, zuverlässig."
- Leistung 4 — Lüftung: "Dezentrale und zentrale Wohnraumlüftung sowie Klimaanlagen für Ihr Wohlfühlklima — das ganze Jahr über."

**USP-Texte (4 Punkte):**
- USP 1 — Meisterbetrieb: "Jede Arbeit wird von einem geprüften SHK-Meister geplant und überwacht. Qualität ohne Kompromisse."
- USP 2 — BOSCH Premium Partner: "Exklusiver Zugang zu BOSCH-Systemen, bevorzugte Lieferzeiten und erweiterte Herstellergarantie."
- USP 3 — Transparente Preise: "Kein versteckter Mehraufwand. Sie erhalten eine detaillierte Kostenaufstellung vor Beginn der Arbeiten."
- USP 4 — 1 Ansprechpartner: "Von der Planung bis zur Übergabe haben Sie einen festen Ansprechpartner. Kein Durchstellen, kein Warten."

**Über uns Absätze:**
- Absatz 1: "Seit 1998 sind wir Ihr verlässlicher Partner für Heizung, Sanitär und Haustechnik in Lahnstein und der gesamten Region Rhein-Lahn. Was als kleiner Handwerksbetrieb begann, ist heute ein eingespieltes Team aus erfahrenen Fachkräften mit einem klaren Anspruch: saubere Arbeit, transparente Preise, pünktliche Ausführung."
- Absatz 2: "Als zertifizierter BOSCH Premium Partner arbeiten wir ausschließlich mit hochwertigen Markenprodukten — von Geberit über Hansgrohe bis Villeroy & Boch. Das gibt Ihnen die Sicherheit, dass Ihre Investition langfristig hält."
- Absatz 3: "Ob Komplettbad, neue Wärmepumpe oder dringender Reparaturservice — wir kümmern uns. Sprechen Sie uns an."

**SELF-REVIEW SCHRITT 1:**
- [ ] Kein einziger [PLATZHALTER] mehr sichtbar auf index.html
- [ ] Kein einziger [PLATZHALTER] mehr im Footer
- [ ] Telefonnummer ist klickbar (tel: Link)
- [ ] Alle 4 Leistungstexte sichtbar
- [ ] Alle 4 USP-Texte sichtbar
- [ ] Über-uns Text vollständig

**Dokumentiere in LEARNINGS.md:** Welche Dateien waren betroffen, gab es Encoding-Probleme mit Umlauten?

---

## SCHRITT 2 — WhatsApp Integration (Hero + Float Button)

**Was zu tun ist:**

**A) Hero — Sekundärer CTA Button**
Füge direkt unter "Termin vereinbaren" einen WhatsApp Button ein:
```html
<a href="https://wa.me/491762190432?text=Hallo%2C%20ich%20interessiere%20mich%20f%C3%BCr%20eine%20Beratung." 
   target="_blank" 
   rel="noopener"
   class="btn-whatsapp-hero">
  💬 Direkt auf WhatsApp schreiben
</a>
```

Styling:
- Hintergrund: #25D366
- Farbe: weiß
- Mobile: volle Breite, 52px Höhe
- Desktop: inline neben Termin-Button

**B) Sticky Float Button (nur Mobile)**
```html
<a href="https://wa.me/491762190432?text=Hallo%2C%20ich%20interessiere%20mich%20f%C3%BCr%20eine%20Beratung."
   target="_blank"
   rel="noopener" 
   class="whatsapp-float"
   aria-label="WhatsApp schreiben">
  💬
</a>
```

CSS:
```css
.whatsapp-float {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: #25D366;
  color: white;
  border-radius: 50px;
  padding: 14px 20px;
  font-size: 1.1rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}

/* Nur auf Mobile sichtbar */
@media (min-width: 768px) {
  .whatsapp-float { display: none; }
}
```

**SELF-REVIEW SCHRITT 2:**
- [ ] WhatsApp Button im Hero sichtbar auf Mobile (375px)
- [ ] WhatsApp Button im Hero sichtbar auf Desktop
- [ ] Float Button erscheint auf Mobile unten rechts
- [ ] Float Button NICHT sichtbar auf Desktop (768px+)
- [ ] Beide Links öffnen WhatsApp mit vorausgefülltem Text
- [ ] Kein Overflow / kein Layout-Bruch durch neue Buttons

**Dokumentiere in LEARNINGS.md:** Hat der WhatsApp Link korrekt geöffnet? Gab es z-index Konflikte?

---

## SCHRITT 3 — Kostenrechner fixen und befüllen

**Problem:** Der bestehende Rechner gibt 404 weil er auf externe Seite verlinkt.
**Lösung:** Komplett als Inline-Komponente in index.html neu bauen.

**Struktur (4 Schritte, Vanilla JS):**

```
Schritt 1 — Projektart wählen (Kacheln)
  → Badsanierung
  → Heizungsmodernisierung / Wärmepumpe  
  → Haustechnik / Sanitär
  → Lüftung / Klimaanlage
  → Reparatur & Wartung

Schritt 2 — Projektgröße (dynamisch je nach Auswahl)
  → Bad: Slider 4–20 m²
  → Heizung: Slider Wohnfläche 60–300 m²
  → Haustechnik: Anzahl Räume 1–10
  → Lüftung: Slider Wohnfläche 60–300 m²
  → Reparatur: Pauschale (kein Slider)

Schritt 3 — Ausstattung / Qualitätsstufe
  → Standard (solide, funktional)
  → Komfort (hochwertig, modern)
  → Premium (Design, Markenprodukte)

Schritt 4 — Ergebnis + Lead Capture
  → Preisspanne anzeigen (nicht bindend)
  → Pflichtfeld: Telefonnummer
  → CTA: "Kostenloses Angebot anfordern"
  → Bei Submit: WhatsApp öffnen mit vorausgefüllten Daten
```

**Preismatrix:**
```javascript
const preise = {
  bad: { standard: 550, komfort: 750, premium: 1100 }, // €/m²
  heizung: { standard: 8000, komfort: 12000, premium: 18000 }, // Pauschale
  haustechnik: { standard: 800, komfort: 1200, premium: 1800 }, // pro Raum
  lueftung: { standard: 6000, komfort: 9000, premium: 14000 }, // Pauschale
  reparatur: { standard: 150, komfort: 150, premium: 150 } // ab Preis
};
```

**WhatsApp Submit-Text:**
```javascript
const text = `Hallo, ich interessiere mich für ein Angebot.
Projektart: ${projektart}
Größe: ${groesse}
Qualität: ${qualitaet}
Geschätzter Rahmen: ${preisVon}€ – ${preisBis}€
Meine Telefonnummer: ${telefon}`;

window.open(`https://wa.me/491762190432?text=${encodeURIComponent(text)}`);
```

**SELF-REVIEW SCHRITT 3:**
- [ ] Alle 5 Projektarten auswählbar
- [ ] Slider funktioniert auf Mobile (Touch)
- [ ] Preisspanne erscheint korrekt in Schritt 4
- [ ] WhatsApp öffnet sich mit vorausgefülltem Text
- [ ] Zurück-Button funktioniert zwischen allen Schritten
- [ ] Kein 404 mehr
- [ ] Rechner bricht nicht auf 375px

**Dokumentiere in LEARNINGS.md:** Slider Touch-Probleme? Preisberechnung korrekt?

---

## SCHRITT 4 — Cal.com einbinden (Calendly ersetzen)

**Was zu tun ist:**
Ersetze alle alten Calendly-Referenzen mit Cal.com:

```
URL: https://cal.com/ritzaisolutions/15min
```

Einbettung als Inline-Embed nach DSGVO-Consent:
```html
<div id="cal-embed-wrapper" style="display:none;">
  <iframe 
    src="https://cal.com/ritzaisolutions/15min?embed=true&theme=dark"
    width="100%" 
    height="700px"
    frameborder="0"
    loading="lazy"
    title="Termin buchen bei Sascha Grimm Heizung & Sanitär">
  </iframe>
</div>
```

Consent-Button Text anpassen:
- Alt: "Terminbereich freischalten"
- Neu: "Terminkalender laden (Cal.com)"

DSGVO-Hinweis anpassen:
- Alt: Calendly erwähnt
- Neu: "Die Terminbuchung nutzt Cal.com. Mit Aktivierung willigen Sie in die Datenübertragung an Cal.com ein."

**SELF-REVIEW SCHRITT 4:**
- [ ] Cal.com lädt nach Consent-Klick
- [ ] Kein Calendly mehr erwähnt (grep über alle Dateien)
- [ ] Iframe responsive auf Mobile
- [ ] Datenschutzhinweis korrekt auf Cal.com aktualisiert

**Dokumentiere in LEARNINGS.md:** Hat das Embed korrekt geladen? CORS-Probleme?

---

## SCHRITT 5 — Partner Carousel (animiert, hover-stop, klickbar)

**Was zu tun ist:**
Baue ein endlos-laufendes CSS Carousel ohne externe Libraries.

**HTML Struktur:**
```html
<div class="partner-carousel-wrapper">
  <div class="partner-track">
    <!-- Logos 1x -->
    <a href="https://www.bosch-thermotechnology.com" target="_blank" rel="noopener">
      <img src="images/IP_bosch.webp" alt="Bosch Thermotechnik" loading="lazy">
    </a>
    <!-- ... alle anderen Logos ... -->
    <!-- Logos nochmal dupliziert für nahtlosen Loop -->
    <a href="https://www.bosch-thermotechnology.com" target="_blank" rel="noopener">
      <img src="images/IP_bosch.webp" alt="Bosch Thermotechnik" loading="lazy">
    </a>
    <!-- ... alle anderen Logos nochmal ... -->
  </div>
</div>
```

**CSS:**
```css
.partner-carousel-wrapper {
  overflow: hidden;
  width: 100%;
  padding: 20px 0;
}

.partner-track {
  display: flex;
  gap: 48px;
  align-items: center;
  width: max-content;
  animation: scroll-partners 35s linear infinite;
}

.partner-track:hover {
  animation-play-state: paused;
}

.partner-track a {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.partner-track img {
  height: 40px;
  width: auto;
  filter: grayscale(100%);
  opacity: 0.6;
  transition: filter 0.3s ease, opacity 0.3s ease;
}

.partner-track a:hover img {
  filter: grayscale(0%);
  opacity: 1;
}

@keyframes scroll-partners {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* Mobile: etwas schneller wegen kleinerem Viewport */
@media (max-width: 767px) {
  .partner-track {
    gap: 32px;
    animation-duration: 25s;
  }
  .partner-track img {
    height: 30px;
  }
}
```

**Logos mit Links (alle 10):**
| Logo | Link |
|---|---|
| IP_bosch.webp | https://www.bosch-thermotechnology.com/de/de/wohngebaeude/start/ |
| IP_geberit.webp | https://www.geberit.de/home/ |
| IP_viega.webp | https://www.viega.de/de/homepage.html |
| IP_Villeroy.webp | https://www.villeroy-boch.de/ |
| IP_grohe.webp | https://www.grohe.de/de_de/ |
| IP_hansgrohe.webp | https://www.hansgrohe.de/ |
| IP_Buderus.webp | https://www.buderus.de/de |
| IP_kermi.webp | https://www.kermi.de/ |
| IP_tece.webp | https://www.tece.com/de |
| IP_weishaupt.webp | https://www.weishaupt.de/ |

**SELF-REVIEW SCHRITT 5:**
- [ ] Carousel läuft nahtlos (kein Sprung am Ende)
- [ ] Hover stoppt die Animation
- [ ] Jedes Logo ist klickbar, öffnet in neuem Tab
- [ ] Auf Mobile: kein horizontaler Overflow der Seite
- [ ] Logos auf Mobile noch erkennbar (min 30px Höhe)

**Dokumentiere in LEARNINGS.md:** Gab es einen Sprung im Loop? Wie wurde er gefixt?

---

## SCHRITT 6 — BOSCH Flagship Sektion

**Was zu tun ist:**
Neue Section nach den USPs einfügen.

```html
<section class="bosch-flagship">
  <div class="container">
    <div class="bosch-flagship__inner">
      <div class="bosch-flagship__logo">
        <img src="images/partner-bosch-premium.jpg" 
             alt="BOSCH Premium Partner" 
             loading="lazy">
      </div>
      <div class="bosch-flagship__content">
        <p class="bosch-flagship__label">Zertifizierte Partnerschaft</p>
        <h2>BOSCH Premium Partner —<br>Ihr Vorteil.</h2>
        <p>Als zertifizierter BOSCH Premium Partner erhalten Sie exklusiven Zugang 
        zu den neuesten Heizungssystemen, bevorzugte Lieferzeiten und erweiterte 
        Garantieleistungen — weit über den gesetzlichen Standard hinaus.</p>
        <ul class="bosch-flagship__vorteile">
          <li>✓ Erweiterte Herstellergarantie auf alle BOSCH Systeme</li>
          <li>✓ Bevorzugte Ersatzteil- und Geräteversorgung</li>
          <li>✓ Zertifizierte Fachinstallation nach BOSCH-Standard</li>
        </ul>
      </div>
    </div>
  </div>
</section>
```

Styling:
- Hintergrund: #1a1a1a (dunkel, plakativ)
- Text: weiß
- Mobile: Logo oben, Content darunter (flex-direction: column)
- Desktop: Logo links (40%), Content rechts (60%)

**SELF-REVIEW SCHRITT 6:**
- [ ] Section sichtbar zwischen USPs und Über uns
- [ ] BOSCH Logo wird angezeigt
- [ ] Mobile: Logo oben, Text darunter, kein Overflow
- [ ] Desktop: Zwei-Spalten-Layout

---

## SCHRITT 7 — Förderungen Sektion

**Was zu tun ist:**
Neue Section nach BOSCH Flagship einfügen.

**Inhalt:**
```
Headline: "Bis zu 70% Förderung für Ihre neue Heizung."
Subtext: "Wir prüfen Ihre Förderfähigkeit kostenlos — und helfen bei der Antragstellung."

3 Kacheln:

1. BEG — Bundesförderung für effiziente Gebäude
   Bis zu 70% Zuschuss für Wärmepumpen und Pelletheizungen.
   Gefördert durch: Bundesamt für Wirtschaft (BAFA)
   Link: https://www.bafa.de/

2. KfW Heizungsförderung
   Zinsgünstige Kredite und Tilgungszuschüsse für Heizungsmodernisierung.
   Link: https://www.kfw.de/

3. ISB Rheinland-Pfalz
   Ergänzende Landesförderung für Gebäudeeffizienz in RLP.
   Link: https://www.isb.rlp.de/

CTA Button (grün): "Förderung prüfen lassen — kostenlos auf WhatsApp"
→ href: https://wa.me/491762190432?text=Ich%20m%C3%B6chte%20meine%20F%C3%B6rderm%C3%B6glichkeiten%20pr%C3%BCfen%20lassen.
```

**SELF-REVIEW SCHRITT 7:**
- [ ] Alle 3 Förder-Kacheln sichtbar
- [ ] Links öffnen korrekte externe Seiten
- [ ] WhatsApp CTA funktioniert
- [ ] Mobile: Kacheln gestapelt (1 Spalte)
- [ ] Desktop: 3 Kacheln nebeneinander

---

## SCHRITT 8 — Referenzen mit echten Bildern befüllen

**Was zu tun ist:**

**index.html:** Preview-Grid mit ersten 4 Bildern (f_1 bis f_4)
```html
<div class="referenzen-preview-grid">
  <img src="images/f_1.jpg" alt="Referenz Projekt 1" loading="lazy">
  <img src="images/f_2.jpg" alt="Referenz Projekt 2" loading="lazy">
  <img src="images/f_3.jpg" alt="Referenz Projekt 3" loading="lazy">
  <img src="images/f_4.jpg" alt="Referenz Projekt 4" loading="lazy">
</div>
<a href="referenzen.html" class="btn-secondary">Alle Projekte ansehen →</a>
```

**referenzen.html:** Alle f_X Bilder in Masonry Grid
- Prüfe zuerst wie viele f_X Bilder existieren (ls images/f_*.jpg)
- Grid: Mobile 1 Spalte → Tablet 2 Spalten → Desktop 3 Spalten
- Lightbox bei Klick (vanilla JS, kein jQuery)
- Lazy Loading für alle Bilder

**SELF-REVIEW SCHRITT 8:**
- [ ] Alle verfügbaren f_X Bilder werden angezeigt
- [ ] Keine broken image Links
- [ ] Lightbox öffnet beim Klick
- [ ] Mobile Grid: 1 Spalte, kein Overflow
- [ ] Lazy Loading aktiv (Network Tab prüfen)

---

## SCHRITT 9 — Leistungs-Subpages befüllen

**Was zu tun ist:**
Jede der 4 Subpages bekommt echten Content:

**/leistungen/bad.html**
- Leistungen: Badmodernisierung, Barrierefreies Bad, Komplettbad, Trockenbau
- Förderhinweis: BEG-Förderung für barrierefreie Bäder
- Bilder aus /images wenn verfügbar

**/leistungen/heizung.html**
- Leistungen: Wärmepumpe, Gas/Öl, Regenerativ, Wartung
- Förderhinweis: BEG bis 70%, KfW Kredit
- BOSCH Premium Partner Badge

**/leistungen/haustechnik.html**
- Leistungen: Trinkwasser, Rohrsanierung, Service & Reparatur
- Kein Förderhinweis

**/leistungen/lueftung.html**
- Leistungen: Dezentrale Lüftung, Zentrale Lüftung, Klimaanlage
- BOSCH Split-Klima Badge

Jede Subpage hat:
- Zurück-Link zu index.html
- WhatsApp CTA am Ende
- Cal.com Termin-Button

**SELF-REVIEW SCHRITT 9:**
- [ ] Alle 4 Subpages laden ohne 404
- [ ] Jede Seite hat echten Text (kein Platzhalter)
- [ ] Navigation zurück zu index funktioniert
- [ ] WhatsApp Link auf jeder Subpage vorhanden

---

## SCHRITT 10 — Mobile First Final Check

**Was zu tun ist:**
Gehe durch die komplette Seite auf 375px Breite und prüfe:

```
CHECKLISTE MOBILE FINAL:

Navigation:
- [ ] Hamburger Menu öffnet und schließt
- [ ] Alle Nav-Links funktionieren
- [ ] Kein horizontales Scrollen auf irgendeiner Seite

Hero:
- [ ] Video lädt und läuft als Background
- [ ] Headline lesbar (min. 28px)
- [ ] Beide CTAs sichtbar (Termin + WhatsApp)
- [ ] Video-Overlay dunkel genug für Text

Leistungen:
- [ ] 1-spaltig auf Mobile
- [ ] Icons/Bilder nicht abgeschnitten

Kostenrechner:
- [ ] Slider per Touch bedienbar
- [ ] Buttons min. 48px Tappable Area
- [ ] Kein Content außerhalb Viewport

Partner Carousel:
- [ ] Carousel läuft
- [ ] Kein horizontaler Overflow der Seite

BOSCH Sektion:
- [ ] Logo oben, Text darunter

Förderungen:
- [ ] 1-spaltig auf Mobile

Referenzen:
- [ ] 1-spaltig auf Mobile
- [ ] Bilder nicht zu groß (max-width: 100%)

Kontakt & Karte:
- [ ] Formular vollständig sichtbar
- [ ] WhatsApp Float Button sichtbar
- [ ] Tel-Link klickbar

Footer:
- [ ] Keine Links abgeschnitten
- [ ] Copyright korrekt
```

**SELF-REVIEW SCHRITT 10:**
Dokumentiere jeden Fehler der gefunden wurde und wie er gefixt wurde.

---

## LEARNINGS.md TEMPLATE

Erstelle diese Datei im Root des Projekts und fülle sie nach jedem Schritt aus:

```markdown
# LEARNINGS — haustechnik-grimm

## Schritt 1 — Platzhalter
- Was hat funktioniert:
- Was war problematisch:
- Bugs gefunden und gefixt:

## Schritt 2 — WhatsApp
- Was hat funktioniert:
- Was war problematisch:
- Bugs gefunden und gefixt:

## Schritt 3 — Kostenrechner
...
```

---

## ABSCHLUSS — Deployment Checklist

Bevor du pushst und deployed:
- [ ] Kein einziger [PLATZHALTER] mehr vorhanden (grep -r "\[" . --include="*.html")
- [ ] Alle Links funktionieren (keine 404)
- [ ] WhatsApp Links getestet
- [ ] Cal.com Embed getestet
- [ ] Kostenrechner vollständig durchgeklickt
- [ ] Mobile auf 375px getestet
- [ ] Desktop auf 1280px getestet
- [ ] Alle Bilder laden (keine broken images)
- [ ] git push → Vercel Deploy → Live-URL prüfen
