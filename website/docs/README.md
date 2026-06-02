# Website Betrieb und Launch-Check

## Qualitäts-Gates (vor Live-Schaltung)

- Gate A (Inputs): B1 Logo, B2 Über-uns-Freigabe, B4 USt-IdNr, B5 Berufshaftpflicht, B6 Buchungstool, B7 Hosting/DNS.
- Gate B (Legal): `impressum.html` und `datenschutz.html` final juristisch geprüft, Klaro-Services deckungsgleich zur Technik.
- Gate C (Tech): Keine JS-Fehler auf Startseite, Rechtsseiten, Referenzen und Leistungsseiten.
- Gate D (SEO): `robots.txt`, `sitemap.xml`, Canonical, OG/Twitter, gültiges JSON-LD.
- Gate E (Release): HTTPS aktiv, kein Mixed Content, CTA-Flows auf Mobile/Desktop getestet.

## Offene TODOs für Live

- Logo/Favicon und finales OG-Bild in `index.html` ersetzen.
- USt-IdNr in `impressum.html` ergänzen (Gate B4).
- Berufshaftpflicht (Versicherer, Anschrift, Geltungsraum) in `impressum.html` ergänzen (Gate B5).
- Echten Klaro-Text und finale Servicebeschreibung juristisch abstimmen.
- Cal.com-Embed final einbauen (nur nach Consent).
- Web3Forms produktiver Access-Key (Empfänger = Kunden-E-Mail aus config.js).
- Über-uns-Text final vom Kunden freigeben und Platzhalter entfernen.
- Zweites Vorher/Nachher-Paar inkl. Tab in Slider aktivieren.
- Weitere Unterseiten-Bilder auf WebP (Leistungsseiten); Hero-Video komprimieren (bewusst zurückgestellt).
- WebP-Regenerierung: `scripts/convert-images-webp.ps1` (ffmpeg).
- Domain-Umzug alter Hoster → Vercel, 301-Redirects, GSC, Bing, Google Business Profile (siehe `project-docs/launch-domain-seo.md`).

## Kostenrechner (Stand: 2026-05-28)

- **4 Schritte:** Projektart → Fläche + Material → Zusatzleistungen → Ergebnis.
- **Preislogik:** Orientierung Fliesen-Weber-Demo – `Fläche × €/m² (Material) × Projekt-Multiplikator` + Extras pro m², Spanne 93–112 % (gerundet 10 €). Konfiguration in `website/js/calc.js` → `CONFIG`.
- **Ergebnis:** Preisrahmen, Aufschlüsselung und **PDF sofort** ohne E-Mail-Gate.
- **Rückruf-Lead:** PLZ, Wunschmonat, clientseitige Kapazitätsanzeige (`CONFIG.capacity`), Telefon, Checkbox „Rückruf gewünscht“, DSGVO → Web3Forms an GF.
- **Kapazität:** Nur Anzeige + E-Mail – keine Speicherung auf der Website; Monatsauslastung manuell in `CONFIG.capacity.months` pflegen.
- **Disclaimer:** Unverbindlicher Richtwert; Endpreis nach Besichtigung. Im PDF wiederholt.

## Vercel Deploy (Pflicht)

- **Root Directory (Dashboard):** `website` — nicht leer, **kein** Output Directory `website` (doppelt = 404).
- **Config:** nur `website/vercel.json` (keine `/vercel.json` im Repo-Root).
- **Doku:** `../../project-docs/vercel-deploy-architecture.md`
- **Abnahme:** Preview-URL liefert HTML mit `kostenrechner`; `/css/style.css` → 200.

## Implementierungs-Handoff Reihenfolge

1. Inputs B1–B8 gegen Kundenstand abhaken (`../../project-docs/Backlog.md`).
2. **Jetzt-Welle:** Deploy-Architektur, Rückruf, Smoke-Tests, `website/vercel.json` Security-Header.
3. Legal/Consent finalisieren (inkl. Kostenrechner-Rückruf).
4. Domain-Umzug + 301 + GSC + Bing + GBP (`project-docs/launch-domain-seo.md`).
5. Web3Forms prod-Key + Booking (Cal.com) produktiv.
6. Branding/Content finalisieren.
7. Lighthouse/CWV nach Domain-Cutover.

## Lokaler Preview-Server

- `npm run preview` startet `server.js` (nur lokal, nicht auf Vercel).
- Kontaktformular und Kostenrechner nutzen **Web3Forms** (`https://api.web3forms.com/submit`).
- `POST /api/contact` in `server.js` ist nur für lokale Tests – nicht der Produktionsweg.

## Mobile Audit und Struktur

- Auditreport: `../../project-docs/mobile-audit-report.md`
- Launch Domain/SEO: `../../project-docs/launch-domain-seo.md`
- Vercel-Architektur: `../../project-docs/vercel-deploy-architecture.md`
- Demo-zu-Production Sammelbacklog: `../../project-docs/Backlog.md`
