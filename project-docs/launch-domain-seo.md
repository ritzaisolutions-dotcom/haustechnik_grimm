# Launch: Domain, SEO, Google & Bing

Ziel-URL: `https://www.fliesen-butz.de`  
Hosting: Vercel (Projekt `fliesenmeister-butz`, **Root Directory = `website`**) — siehe `project-docs/vercel-deploy-architecture.md`  
Ausgang: Domain liegt noch beim **alten Hoster** – Umzug mit 301-Redirects erforderlich.

**Vercel Preview vor DNS-Umzug:** `https://fliesenmeister-butz.vercel.app/` muss die neue Site zeigen (Marker: `kostenrechner` im HTML). Sonst zuerst Deploy-Architektur prüfen, nicht DNS.

---

## 1. Domain-Umzug (alter Hoster → Vercel)

### Vorbereitung
- [ ] Vercel-Projekt: Domain `fliesen-butz.de` und `www.fliesen-butz.de` hinzufügen
- [ ] DNS-Einträge aus Vercel-Dashboard notieren (A/CNAME)
- [ ] Inventar alter URLs (Startseite, Impressum, Kontakt, ggf. Unterseiten)
- [ ] Cutover-Termin mit Kunde abstimmen (TTL vorher auf 300s senken)

### DNS beim Registrar
- [ ] `www` → CNAME auf Vercel (`cname.vercel-dns.com` o. ä. laut Dashboard)
- [ ] Apex `@` → A-Record auf Vercel-IP oder ALIAS/ANAME falls unterstützt
- [ ] SSL-Zertifikat in Vercel auf „Ready“ warten

### Redirects alte Site
- [ ] 301 von allen relevanten alten URLs auf neue Pfade
- [ ] Mapping dokumentieren (Tabelle unten)
- [ ] Bis Cutover: am alten Hoster Weiterleitung auf `https://www.fliesen-butz.de` oder minimale „Umzug“-Seite

### Redirect-Matrix (Vorlage)

| Alte URL | Neue URL | Status |
|----------|----------|--------|
| `/` | `/` | offen |
| `/impressum` (falls abweichend) | `/impressum.html` | offen |
| … | … | offen |

### Abnahme
- [ ] `https://www.fliesen-butz.de` lädt Startseite (HTTPS, kein Mixed Content)
- [ ] Apex `fliesen-butz.de` → www (301)
- [ ] Gate E: CTAs mobil/desktop getestet

---

## 2. Google Search Console

- [ ] Property-Typ: **URL-Präfix** `https://www.fliesen-butz.de/` oder Domain-Property
- [ ] Verifizierung: DNS-TXT oder HTML-Tag in `index.html`
- [ ] Sitemap einreichen: `https://www.fliesen-butz.de/sitemap.xml`
- [ ] Indexierung der Startseite beantragen
- [ ] Nach 1–2 Wochen: Coverage/CWV prüfen

---

## 3. Bing Webmaster Tools

- [ ] Account: https://www.bing.com/webmasters
- [ ] Site hinzufügen: `https://www.fliesen-butz.de`
- [ ] Optional: Import aus Google Search Console
- [ ] Sitemap einreichen: `https://www.fliesen-butz.de/sitemap.xml`

---

## 4. Google Business Profile (Handwerker)

- [ ] Profil suchen/anfordern: „Peter Butz Fliesenfachbetrieb“, Römerberg
- [ ] **NAP** identisch zu Impressum:
  - Werkstraße 23, 67354 Römerberg
  - +49 6232 83111
  - info@fliesen-butz.de
- [ ] Kategorie: Fliesenleger / Badsanierung (passend wählen)
- [ ] Öffnungszeiten: Mo–Do 08–17, Fr 08–13
- [ ] Website-URL: `https://www.fliesen-butz.de`
- [ ] Verifizierung (Postkarte/Telefon/Video) durch Kunde
- [ ] Referenzfotos nur mit Kundenfreigabe

---

## 5. SEO-Technik (Gate D)

- [ ] `robots.txt` → Sitemap-URL auf Prod-Domain
- [ ] `sitemap.xml` → alle Kern-URLs mit `https://www.fliesen-butz.de`
- [ ] Canonical in `index.html` und Unterseiten
- [ ] JSON-LD LocalBusiness prüfen
- [ ] OG/Twitter-Image final (nicht Platzhalter)

---

## Kunden-Zugänge (Checkliste)

- [ ] Registrar / DNS
- [ ] Alter Hoster (Redirects)
- [ ] Google-Konto (GBP + ggf. GSC)
- [ ] Web3Forms-Empfänger `info@fliesen-butz.de`
