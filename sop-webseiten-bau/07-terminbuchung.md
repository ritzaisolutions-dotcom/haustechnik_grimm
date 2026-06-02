# 07 – Terminbuchung

---

## Tool-Empfehlung

| Tool | Wann |
|---|---|
| **Cal.com** | Default. Open Source, DSGVO-stark, EU-Server |
| **Calendly** | Wenn Kunde bereits hat |
| **TuCalendi** | Spanisch sprechende Märkte |
| **LatePoint** | Bei WordPress, eigener Server |

---

## Cal.com Setup (Default)

### Schritt 1: Account anlegen lassen

```
Vom Kunden machen lassen, NICHT selbst:
1. cal.com → Sign up
2. Username wählen (Firmenname)
3. E-Mail bestätigen
4. Kalender verbinden:
   - Google Calendar (am häufigsten)
   - Outlook
   - iCloud
```

### Schritt 2: Event Types einrichten

**Standard Setup für Handwerker:**

```yaml
Event 1: Kostenloses Beratungsgespräch
  Dauer: 45 Minuten
  Ort: Bei Kunde vor Ort
  Pufferzeit vorher: 15 Min (Anfahrt)
  Pufferzeit nachher: 30 Min (Heimfahrt)
  Verfügbarkeit: Mo-Fr 8-18 Uhr
  Max pro Tag: 3
  Vorlaufzeit: 24h
  Buchungsfenster: 4 Wochen
  
Event 2: Reparatur-Termin
  Dauer: 60 Minuten
  Ort: Bei Kunde vor Ort
  Verfügbarkeit: Mo-Sa 8-18 Uhr
  Vorlaufzeit: 48h
  
Event 3 (optional): Telefonberatung
  Dauer: 15 Minuten
  Ort: Telefon (automatischer Anruf)
  Verfügbarkeit: Mo-Fr 12-13 Uhr
```

### Schritt 3: Custom Questions

```
Pflicht-Felder bei Buchung:
- Name *
- E-Mail *
- Telefon *
- Adresse (PLZ + Stadt) *
- Was wollen Sie umsetzen? (Dropdown)
  □ Badsanierung
  □ Fliesenverlegung neu
  □ Reparatur
  □ Beratung allgemein
- Beschreibung Ihres Projekts (Textarea)
- Wie sind Sie auf uns aufmerksam geworden? (optional)
```

### Schritt 4: Embed in Website

**Option A: Inline Embed (volles Calendar in der Seite)**

```html
<!-- Cal.com Inline Embed -->
<div id="cal-inline"
     style="width:100%; height:600px; overflow:scroll"
     data-cal-link="firmenname/beratung"
     data-cal-namespace=""
     data-cal-config='{"layout":"month_view","theme":"auto"}'>
</div>

<script type="text/javascript">
(function (C, A, L) { 
  let p = function (a, ar) { a.q.push(ar); }; 
  let d = C.document; 
  C.Cal = C.Cal || function () { 
    let cal = C.Cal; let ar = arguments; 
    if (!cal.loaded) { 
      cal.ns = {}; cal.q = cal.q || []; 
      d.head.appendChild(d.createElement("script")).src = A; 
      cal.loaded = true; 
    } 
    if (ar[0] === L) { 
      const api = function () { p(api, arguments); }; 
      const namespace = ar[1]; 
      api.q = api.q || []; 
      if(typeof namespace === "string"){
        cal.ns[namespace] = cal.ns[namespace] || api;
        p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]);
      } else p(cal, ar); 
      return; 
    } 
    p(cal, ar); 
  }; 
})(window, "https://app.cal.com/embed/embed.js", "init");

Cal("init", { origin: "https://cal.com" });
Cal("inline", {
  elementOrSelector: "#cal-inline",
  calLink: "firmenname/beratung",
  layout: "month_view"
});
</script>
```

**Option B: Popup Embed (Button öffnet Modal)**

```html
<button data-cal-link="firmenname/beratung"
        data-cal-namespace=""
        data-cal-config='{"layout":"month_view"}'>
  Termin buchen
</button>

<script>
// Wie oben, mit Cal("init", ...)
</script>
```

**Option C: Link öffnet in neuem Tab (Fallback)**

```html
<a href="https://cal.com/firmenname/beratung"
   target="_blank"
   rel="noopener noreferrer"
   class="btn-primary">
  Termin buchen →
</a>
```

---

## DSGVO-Anforderungen

```
PFLICHT vor Embed:
□ Datenschutzerklärung erwähnt Cal.com als Drittanbieter
□ Cookie-Banner mit Opt-In für Cal.com
□ Embed wird erst nach Consent geladen
□ Disclaimer-Text neben dem Embed:
  "Mit der Nutzung des Buchungstools werden Daten an Cal.com 
   übermittelt. Mehr Infos in unserer Datenschutzerklärung."
```

**Klaro Consent Configuration:**

```javascript
const klaroConfig = {
  services: [{
    name: 'cal',
    title: 'Cal.com Buchungstool',
    purposes: ['booking'],
    cookies: [/^_cal/],
    callback: function(consent, service) {
      if (consent) {
        loadCalEmbed();
      } else {
        showFallbackLink();
      }
    },
    required: false,
    optOut: false,
    default: false
  }],
  translations: {
    de: {
      cal: {
        description: 'Buchungstool für Termine. Es werden Daten an cal.com übermittelt.'
      }
    }
  }
};
```

---

## Visuelles Layout

```
┌──────────────────────────────────────┐
│       Jetzt Termin buchen            │  ← Section Header
│   Kein Warten in der Leitung.        │
└──────────────────────────────────────┘

┌──────────────┐  ┌──────────────┐
│   🏡         │  │   🔧         │
│  BERATUNG    │  │  REPARATUR   │
│              │  │              │
│  Beschreibung│  │  Beschreibung│
│              │  │              │
│  ⏱ 45 Min    │  │  ⏱ Variabel  │
│  📍 Vor Ort  │  │  📍 Vor Ort  │
│  ✅ Kostenlos │  │  💰 Auf Anfr.│
│              │  │              │
│ [TERMIN →]   │  │ [ANFRAGE →]  │
└──────────────┘  └──────────────┘
   ↑ Featured

       Oder rufen Sie an:
       +49 (0)1234 567890
```

---

## Card Component HTML

```html
<div class="termin-grid">
  
  <!-- Featured Card -->
  <article class="booking-card booking-card--featured">
    <div class="booking-card__icon" aria-hidden="true">🏡</div>
    <h3 class="booking-card__title">Kostenloses Beratungsgespräch</h3>
    <p class="booking-card__desc">
      Wir besprechen Ihr Projekt, nehmen Maß und erstellen 
      ein unverbindliches Angebot.
    </p>
    <ul class="booking-card__meta">
      <li>⏱ 45 Min.</li>
      <li>📍 Vor Ort</li>
      <li>✅ Kostenlos</li>
    </ul>
    <button class="btn btn-primary" 
            data-cal-link="firmenname/beratung">
      Termin buchen →
    </button>
  </article>
  
  <!-- Standard Card -->
  <article class="booking-card">
    <div class="booking-card__icon" aria-hidden="true">🔧</div>
    <h3 class="booking-card__title">Reparatur anfragen</h3>
    <p class="booking-card__desc">
      Schnelle Hilfe bei kleinen Problemen – termingerecht 
      und sauber wie immer.
    </p>
    <ul class="booking-card__meta">
      <li>⏱ Nach Aufwand</li>
      <li>📍 Vor Ort</li>
      <li>💰 Auf Anfrage</li>
    </ul>
    <button class="btn btn-primary" 
            data-cal-link="firmenname/reparatur">
      Anfrage stellen →
    </button>
  </article>
  
</div>

<p class="termin-fallback">
  Oder rufen Sie uns direkt an: 
  <a href="tel:+491234567890">+49 (0)1234 567890</a>
</p>
```

---

## Bestätigungs-E-Mails (Cal.com Einstellung)

```
KUNDE bekommt:
1. Bestätigungsmail mit Termin + Adresse + Telefon
2. Reminder 24h vor Termin
3. Reminder 1h vor Termin (SMS optional)
4. ICS-Anhang für eigenen Kalender

HANDWERKER bekommt:
1. Sofort Benachrichtigung (E-Mail)
2. Eintrag im Google/Outlook Kalender
3. Bei No-Show: Follow-Up-Vorlage
```

---

## Anti-Patterns

```
✗ Kalender direkt above the fold im Hero
  (überfordert, lieber Card mit CTA)

✗ Zu viele Event-Types (mehr als 3)
  (Choice Paralysis)

✗ Ohne Pufferzeiten
  (Handwerker hetzt durchs Land)

✗ Buchung ohne Telefon-Pflichtfeld
  (Anrufen falls Adresse unklar)

✗ Generic Calendly-Branding sichtbar
  (Custom Domain einrichten: termin.firmenname.de)

✗ Embed ohne Consent
  (DSGVO-Verstoß, Abmahnrisiko)
```

---

## Premium-Move: Custom Subdomain

```
Statt: cal.com/firmenname
Besser: termin.firmenname.de

Setup:
1. DNS CNAME Record: termin → app.cal.com
2. In Cal.com Settings: Custom Domain eintragen
3. SSL wird automatisch ausgestellt

Effekt: Professioneller, höheres Vertrauen
Aufwand: 15 Minuten, gehört in Live-Version
```
