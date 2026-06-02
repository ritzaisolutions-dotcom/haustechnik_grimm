# 14 – Backlog & Erkenntnisse (laufend pflegen)

**Zwei Projekt-Root-Dateien begleiten jedes Projekt von der Demo bis zum Livegang.**
Beide müssen **bei jeder Arbeitssession** aktuell gehalten werden – nicht einmalig anlegen und vergessen.

---

## Pflicht-Dateien im Projekt-Root

| Datei | Zweck |
|---|---|
| `backlog.md` | Offene Punkte bis zum Livegang (Was fehlt? Was blockiert? Was kommt in Phase Live?) |
| `erkenntnisse.md` | Laufendes Log: Erkenntnisse, Entscheidungen, Stolpersteine, Learnings während der Arbeit |

**Speicherort:** Direkt im Projekt-Root (gleiche Ebene wie `index.html`), nicht in `docs/` und nicht in Git-Instructions.

---

## Wann anlegen?

```
□ Beim ersten Coding-Schritt (spätestens nach 00-onboarding)
□ Beide Dateien mit Minimal-Template aus diesem Doc anlegen
□ Ab dann: bei JEDEM Commit / JEDEM größeren Arbeitsschritt aktualisieren
```

---

## `backlog.md` – Regeln

### Inhalt

Alles, was **vor dem Livegang** noch erledigt werden muss:

- Fehlende Kunden-Inputs (Texte, Bilder, Rechtsdaten)
- Demo → Live Umbauten (echtes Booking, echte Bilder, Domain, SSL)
- Rechtliches, SEO, Performance, QA
- Offene Fragen an den Kunden
- Bekannte Bugs oder bewusst verschobene Features

### Nicht rein

- Bereits erledigte Aufgaben (→ abhaken oder in „Erledigt“-Abschnitt mit Datum verschieben)
- Allgemeine SOP-Wiederholungen (stehen in den Instructions)
- Code-Kommentare statt Backlog-Einträge

### Format (Vorlage)

```markdown
# Backlog – [Projektname]

> Stand: YYYY-MM-DD | Ziel-Livegang: [Datum oder „offen“]

## Blocker (braucht Kunde / extern)

- [ ] …

## Vor Livegang – Must-Have

- [ ] …

## Vor Livegang – Should-Have

- [ ] …

## Nach Livegang / Wartung

- [ ] …

## Erledigt

- [x] … (YYYY-MM-DD)
```

### Pflege-Routine

```
VOR dem Arbeiten:   backlog.md lesen → heutigen Fokus wählen
WÄHREND der Arbeit: neue offene Punkte sofort eintragen
NACH dem Arbeiten:  erledigte Punkte abhaken oder nach „Erledigt“ verschieben
                    Stand-Datum oben aktualisieren
```

**Leeres oder veraltetes Backlog = Fehler.** Lieber 3 kurze Bulletpoints als gar kein Eintrag.

---

## `erkenntnisse.md` – Regeln

### Inhalt

Alles, was beim Bauen **gelernt** wurde und später hilft (für dich, für Claude, für Übergabe):

- Technische Entscheidungen und warum (z. B. Cal.com statt Calendly)
- Was beim Kunden / in der Branche ungewöhnlich war
- Bugs, Workarounds, Browser-Quirks
- Performance- oder DSGVO-Hinweise konkret zu diesem Projekt
- Was beim nächsten ähnlichen Projekt anders gemacht werden sollte

### Nicht rein

- Copy-Paste aus Instructions (nur Verweis + projektspezifische Abweichung)
- Triviale Notizen („Padding angepasst“)
- Geheime Zugangsdaten (nur „Zugang in Passwort-Manager“, nie Passwörter)

### Format (Vorlage)

```markdown
# Erkenntnisse – [Projektname]

> Laufendes Log | Neueste Einträge oben

## YYYY-MM-DD – [Kurztitel]

**Kontext:** …
**Erkenntnis:** …
**Folge / nächstes Mal:** …

---

## YYYY-MM-DD – …
```

### Pflege-Routine

```
Nach jeder relevanten Erkenntnis: sofort einen Eintrag (1–5 Sätze reichen)
Nach größeren Phasen: kurz zusammenfassen, was sich geändert hat
Neueste Einträge immer OBEN (chronologisch absteigend)
```

---

## Verknüpfung mit anderen Instructions

| Situation | Aktion |
|---|---|
| Neuer offener Punkt aus 08–12 | In `backlog.md` eintragen, nicht nur im Code TODO lassen |
| Kunde liefert Input | Backlog-Punkt abhaken + ggf. Erkenntnis loggen |
| Demo fertig, Live startet | Backlog neu strukturieren (Demo-Punkte archivieren, Live-Phasen aus 13-claude-rules übernehmen) |
| Übergabe an Kunde | `erkenntnisse.md` als Basis für `docs/deployment.md` / Anleitung nutzen |
| Learning gilt für **alle** Handwerker-Demos | In `sop-webseiten-bau/15-handwerker-demo-learnings.md` eintragen |

---

## Branchen-Learnings (übertragbar)

Datei: **`sop-webseiten-bau/15-handwerker-demo-learnings.md`** (Handwerker-Demos-Ordner, eine Ebene über dem Projekt)

---

## Checkliste für Claude (jede Session)

```
□ backlog.md gelesen?
□ backlog.md nach der Session aktualisiert (Stand-Datum)?
□ Mindestens bei nicht-trivialen Entscheidungen: erkenntnisse.md ergänzt?
□ Keine doppelten TODOs nur im HTML – wichtige Punkte stehen im Backlog?
```

---

## Wichtigste Regel

**Beide Dateien sind lebende Dokumente – Pflicht bei jedem Build, nicht optional.**

Wenn unsicher ob etwas ins Backlog oder in Erkenntnisse gehört:

- **Noch zu tun vor Go-Live?** → `backlog.md`
- **Wissen für später / Warum so entschieden?** → `erkenntnisse.md`
