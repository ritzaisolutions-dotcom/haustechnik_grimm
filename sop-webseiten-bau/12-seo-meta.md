# 12 – SEO, Meta & Performance

---

## Meta Tags – Pflicht im Head

```html
<head>
  <!-- Charset & Viewport -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta -->
  <title>[Hauptkeyword] [Stadt] | [Firmenname] – [USP]</title>
  <meta name="description" content="[150-160 Zeichen Beschreibung mit Keywords + CTA]">
  
  <!-- Canonical -->
  <link rel="canonical" href="https://firmenname.de/">
  
  <!-- Robots -->
  <meta name="robots" content="index, follow, max-image-preview:large">
  
  <!-- Author & Generator -->
  <meta name="author" content="[Firmenname]">
  
  <!-- Open Graph (Facebook, WhatsApp, LinkedIn) -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="[Title]">
  <meta property="og:description" content="[Description]">
  <meta property="og:image" content="https://firmenname.de/og-preview.jpg">
  <meta property="og:url" content="https://firmenname.de/">
  <meta property="og:site_name" content="[Firmenname]">
  <meta property="og:locale" content="de_DE">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="[Title]">
  <meta name="twitter:description" content="[Description]">
  <meta name="twitter:image" content="https://firmenname.de/og-preview.jpg">
  
  <!-- Favicon -->
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  
  <!-- Color -->
  <meta name="theme-color" content="#2C2A27">
  
  <!-- Preconnects -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</head>
```

---

## Title Tag Formel

```
[Primärkeyword] [Stadt] | [Firmenname] – [USP/Auszeichnung]

BEISPIELE:
✓ Fliesenleger Römerberg | Peter Butz – Meisterbetrieb seit 1997
✓ Baddesign Niersbach | Sebastian Schmitz – Designbäder & XXL-Fliesen  
✓ Heizungsbau Mannheim | Müller GmbH – 24/7 Notdienst

REGELN:
- Max 60 Zeichen
- Wichtigstes Keyword zuerst
- Stadt/Region mit rein
- Firmenname als Marke
- USP als Unterscheidungsmerkmal
```

---

## Meta Description Formel

```
[Beschreibung] [Hauptleistungen]. [USP]. [CTA mit Vorteil].

BEISPIELE:
✓ "Ihr Fliesenleger-Meisterbetrieb in Römerberg & Speyer. 
   Badsanierung, Fliesenverlegung & Renovierung aus einer Hand. 
   ✓ 27 Jahre Erfahrung ✓ Kostenlose Beratung – jetzt Termin online."

REGELN:
- 140-160 Zeichen ideal (Google schneidet nach 160 ab)
- Keywords einbauen (aber natürlich)
- Action-orientiert
- ✓ Checkmarks erhöhen Click-Rate
- CTA am Ende
```

---

## Heading-Hierarchie

```
✓ EINE H1 pro Seite
✓ H2 für Hauptsektionen
✓ H3 für Untersektionen
✓ Logische Verschachtelung

H1: Ihr Fliesenleger-Meister weiß wie's geht.
  H2: Unsere Leistungen
    H3: Badsanierung
    H3: Fliesenverlegung
  H2: Über uns
    H3: Peter Butz
    H3: Maximilian Butz
  H2: Termin buchen
```

**Niemals:** Mehrere H1, Skip von H1 zu H3, H1 als nur ein Logo.

---

## Schema.org – LocalBusiness

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": "https://fliesen-butz.de/#business",
  
  "name": "Peter Butz Fliesenfachbetrieb",
  "alternateName": "Fliesen Butz",
  "description": "Fliesenfachbetrieb in Römerberg. Badsanierung, Fliesenverlegung & Renovierung aus einer Hand.",
  "url": "https://fliesen-butz.de",
  "logo": "https://fliesen-butz.de/logo.png",
  "image": "https://fliesen-butz.de/og-preview.jpg",
  
  "telephone": "+49-6232-83111",
  "email": "info@fliesen-butz.de",
  
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Werkstraße 23",
    "addressLocality": "Römerberg",
    "postalCode": "67354",
    "addressRegion": "Rheinland-Pfalz",
    "addressCountry": "DE"
  },
  
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 49.2995839,
    "longitude": 8.4030156
  },
  
  "areaServed": [
    {
      "@type": "City",
      "name": "Römerberg"
    },
    {
      "@type": "City",
      "name": "Speyer"
    },
    {
      "@type": "City",
      "name": "Germersheim"
    }
  ],
  
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "13:00"
    }
  ],
  
  "priceRange": "€€",
  
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "name": "Meisterbrief Fliesenleger",
      "credentialCategory": "license",
      "recognizedBy": {
        "@type": "Organization",
        "name": "Handwerkskammer der Pfalz"
      }
    }
  ],
  
  "founder": {
    "@type": "Person",
    "name": "Peter Butz"
  },
  
  "foundingDate": "1997",
  
  "sameAs": [
    "https://www.facebook.com/fliesenbutz",
    "https://www.instagram.com/fliesen_butz",
    "https://g.page/fliesen-butz"
  ],
  
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "47"
  }
}
</script>
```

**Validieren:** https://validator.schema.org/

---

## Schema.org – Service Pages

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Badsanierung",
  "provider": {
    "@id": "https://fliesen-butz.de/#business"
  },
  "areaServed": {
    "@type": "City",
    "name": "Römerberg"
  },
  "description": "Komplette Badsanierung aus einer Hand – von der Planung bis zur Übergabe.",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Badsanierungs-Pakete",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Standard-Badsanierung"
        },
        "priceRange": "€€"
      }
    ]
  }
}
```

---

## Schema.org – Breadcrumbs

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Startseite",
      "item": "https://fliesen-butz.de/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Leistungen",
      "item": "https://fliesen-butz.de/leistungen/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Badsanierung",
      "item": "https://fliesen-butz.de/leistungen/badsanierung"
    }
  ]
}
```

---

## Lokales SEO – Beyond the Website

```
□ Google Business Profile vollständig ausfüllen
  - Alle Felder
  - Kategorien (Hauptkategorie + bis zu 9 Nebenkategorien)
  - Servicegebiete (PLZ-genau)
  - Öffnungszeiten + Sonderzeiten
  - Beschreibung mit Keywords
  - Mind. 10 Fotos
  - 3+ Beiträge pro Monat
  
□ Bewertungen
  - "Bewerten Sie uns" Link in:
    → E-Mail Signatur
    → Auf der Webseite
    → QR-Code auf Visitenkarte
    → Nach Auftragsabschluss aktiv anfragen
  
□ NAP Konsistenz (Name, Address, Phone)
  - GLEICHE Schreibweise überall:
    → Website
    → Google Business
    → Facebook
    → Branchenverzeichnisse
    → Rechnungen
  
□ Branchenverzeichnisse
  - Das Örtliche
  - Gelbe Seiten
  - Stadtbranchenbuch
  - 11880.com
  - meinestadt.de
  - lokale Handwerks-Innung
```

---

## Keyword-Strategie für Handwerker

### Long-Tail über Short-Tail

```
✗ "Fliesenleger" (Mass-Term, brutaler Wettbewerb)
✓ "Fliesenleger Römerberg" (Local Intent)
✓ "Badsanierung Speyer Festpreis"
✓ "bodengleiche Dusche Mannheim"
```

### Buyer-Intent

```
Information: "Wie verlege ich Fliesen?"
              → Nicht unser Ziel (Blog wäre nötig)

Comparison:  "Fliesenleger oder Großbaufirma?"
              → Sekundär

Local:       "Fliesenleger in der Nähe"
              → ZIEL ✓

Commercial:  "Badsanierung Angebot Römerberg"
              → ZIEL ✓ (Hottest Lead)

Branded:     "Fliesen Butz"
              → ZIEL ✓ (sollte #1 sein)
```

### Keyword-Platzierung

```
TITLE:        Primärkeyword + Stadt
H1:           Variante des Titles, natürlicher
H2 (3-5):     Sekundärkeywords (Leistungs-Begriffe)
Body:         Keywords natürlich verteilt (1-2% Dichte)
Alt-Text:     Bildbeschreibung + relevante Keywords
URL:          Slug auf deutsch (badsanierung, nicht bath-renovation)
Meta Desc:    Primärkeyword + USP + CTA
```

---

## Performance Optimierung

```
LIGHTHOUSE-CHECKLISTE:

PERFORMANCE (Ziel: 90+)
□ Bilder als WebP (40% kleiner als JPG)
□ Lazy Loading: loading="lazy" auf alle below-fold Bilder
□ Hero-Bild preload: <link rel="preload" as="image">
□ Fonts: font-display: swap
□ CSS minified (manuell oder Build-Tool)
□ JS deferred: <script defer>
□ Externe Resources mit preconnect/dns-prefetch
□ Keine render-blocking Resources im critical path
□ Total Page Weight < 1.5 MB

ACCESSIBILITY (Ziel: 90+)
□ Alle Bilder haben alt-Attribut
□ Form-Felder haben Labels
□ Kontrastverhältnis ≥ 4.5:1
□ Tastatur-Navigation funktioniert
□ Focus-States sichtbar
□ ARIA-Labels wo nötig
□ Semantic HTML (header, main, footer, nav)
□ Skip-Link "Zum Hauptinhalt"

BEST PRACTICES (Ziel: 95+)
□ HTTPS überall
□ Keine console.log() in Production
□ Keine ungenutzten Imports
□ Keine deprecated APIs
□ CSP Header (optional)

SEO (Ziel: 95+)
□ Meta Description vorhanden
□ Title-Tag vorhanden
□ Canonical-URL
□ Crawlable Links
□ robots.txt
□ sitemap.xml
```

### Learnings aus Projekt-Praxis (Fliesenmeister Butz, 2026-05-28)

**Messung nur auf dem echten neuen Build** — alte Domain kann noch den Hoster zeigen (kleines HTML, Assets 404). Marker im HTML prüfen: z. B. `calcCallbackForm`, neuer `<title>`.

| Maßnahme | Wirkung | Hinweis |
|----------|---------|--------|
| WebP + `<picture>` | Große Einsparung bei Bildern (Logo, Galerie, Team) | Fallback JPG/PNG behalten; Script: `scripts/convert-images-webp.ps1` |
| Hero-Video unkomprimiert | **Dominierender** LCP-/Transfer-Blocker (~2,5 MB) | Ziel &lt;800 KB oder Mobile nur Poster — siehe `14-learnings.md` §7 |
| Klaro `requestIdleCallback` | Weniger render-blocking als CDN-Script im Footer | Version pinnen (`v0.7.18`), nicht `latest` |
| `animations.css` non-blocking | `media="print" onload="this.media='all'"` + `<noscript>` | |
| Poster preload WebP | `rel="preload" as="image"` + `fetchpriority="high"` | LCP-Element oft Poster, nicht Video |
| `vercel.json` Cache | Repeat visits schneller | Assets 1y immutable, HTML `must-revalidate` |
| Lighthouse lokal | Perf ~75–79 solange Video groß | Gate E erst nach Video **oder** Mobile-Poster-Only |

**Ziel Page Weight &lt;1,5 MB** bei Handwerker-One-Pager ohne Video realistisch; **mit** unkomprimiertem Hero-Video typisch 4+ MB — in Backlog/Angebot separat ausweisen.

---

## robots.txt

```
User-agent: *
Allow: /

Disallow: /admin/
Disallow: /api/
Disallow: /tmp/

Sitemap: https://firmenname.de/sitemap.xml
```

---

## sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
  <url>
    <loc>https://firmenname.de/</loc>
    <lastmod>2026-05-27</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <url>
    <loc>https://firmenname.de/leistungen/badsanierung</loc>
    <lastmod>2026-05-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>https://firmenname.de/referenzen</loc>
    <lastmod>2026-05-27</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://firmenname.de/impressum</loc>
    <lastmod>2026-05-27</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  
</urlset>
```

---

## Submit & Monitoring

```
LAUNCH-TAG:
□ Google Search Console Property anlegen
□ sitemap.xml einreichen
□ Erste URL-Inspektion durchführen
□ robots.txt validieren
□ Schema.org validieren
□ Mobile-Friendly Test
□ Pagespeed Insights (Mobile + Desktop)

NACH 30 TAGEN:
□ Search Console: Welche Keywords ranken?
□ Welche Seiten haben Probleme?
□ CTR optimieren (Title/Description anpassen)
□ Backlinks aufbauen (Innung, Kooperationen)

NACH 90 TAGEN:
□ Ranking-Tracking starten
□ Optimization-Loops
□ Content erweitern bei Ranking-Plateaus
```

---

## Anti-Patterns

```
✗ Keyword-Stuffing 
  "Fliesenleger Mannheim, Fliesenleger Heidelberg, Fliesenleger..."

✗ Hidden Text in Footer
  Google bestraft das hart

✗ Duplicate Content über mehrere Seiten
  Eigene Texte pro Service

✗ Title und Meta Description identisch

✗ <h1> als reines Logo-Bild

✗ Domain mit Bindestrichen + Keywords
  ✗ fliesenleger-mannheim-baddesign.de
  ✓ butz-fliesen.de

✗ Mehrere h1 pro Seite

✗ Bilder ohne alt-Text

✗ Generisches og-image (Logo auf Weiß)
  → Lieber: Mit Claim, schön gestaltet
```
