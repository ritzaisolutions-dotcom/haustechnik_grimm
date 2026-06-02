# CLAUDE.md — Handwerker Website Template

Dieses Repository ist ein **wiederverwendbares Template** für Handwerker-Websites (Fliesen, Bad, Handwerk allgemein).

## Schnellstart
1. `SETUP.md` lesen und befolgen
2. `website/js/config.js` ausfüllen (Kontakt, SEO, Leistungen, Warum-wir, Preise)
3. Bilder in `website/images/` als `logo-client.*`, `favicon-client.png`, `hero-poster.*` ablegen
4. Verbleibende HTML-Platzhalter: Über-uns, Bewertungen, Leistungs-Unterseiten
5. Vercel: Root Directory = `website`

## Konfiguration
| Datei | Zweck |
|-------|--------|
| `website/js/config.js` | Alle kundespezifischen Werte |
| `website/js/config-apply.js` | Befüllt DOM, Meta, Schema.org, Kalkulator-Labels |
| `website/css/variables.css` | Farben aus Kundenlogo |

## Tech Stack
Vanilla HTML5 / CSS3 / ES6+. Kein Framework. Keine npm-Laufzeit-Abhängigkeiten.

## SOP
`sop-webseiten-bau/` — Playbook (inkl. Learnings §14).

## Qualitäts-Check vor Kunden-Demo
```powershell
# Keine Butz-Leaks im deploybaren Code:
rg -i "butz|römerberg|fliesen-butz" website --glob "*.{html,js,css,xml}"
```
