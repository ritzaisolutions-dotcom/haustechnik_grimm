# 10 – Story / Über uns

**Menschen kaufen von Menschen, nicht von Firmen.**

---

## Was eine starke Story enthält

```
1. ANFANG
   → Wer hat angefangen, wann, warum?
   → Gibt es eine "Grund-Erzählung"?
   
2. ENTWICKLUNG
   → Was hat sich verändert?
   → Familie? Generationenwechsel?
   → Auszeichnungen, Meisterbriefe?
   
3. HEUTE
   → Wer arbeitet aktuell?
   → Wie viele? Was ist die Kultur?
   
4. WERTE
   → Wofür stehen wir?
   → Was machen wir anders?
   
5. VISION
   → Wo wollen wir hin?
   → Was treibt uns an?
```

---

## Story-Archetypen

### Archetyp A: Familienbetrieb / Generationenwechsel

**Beispiel:** Vater Peter, Sohn Maximilian, beide Meister.

```
"Es begann 1997, als Peter Butz seinen eigenen Meisterbetrieb 
in Römerberg gründete. Heute, fast drei Jahrzehnte später, 
arbeiten Vater und Sohn Seite an Seite. Maximilian – selbst 
Meister und Landessieger – führt die Tradition fort, die 
sein Vater begonnen hat: Handwerk mit Anspruch, Verlässlichkeit, 
und ein Ansprechpartner für alles."
```

**Visuell:**
- Großes Teamfoto Vater + Sohn
- Meisterbriefe als Thumbnails
- Generations-Timeline

### Archetyp B: Quereinsteiger mit Mission

**Beispiel:** Ex-Banker wird Schreiner.

```
"15 Jahre lang saß ich in einem Großraumbüro und träumte 
davon, etwas mit meinen Händen zu schaffen. 2019 habe ich 
gekündigt und meine Meisterausbildung als Schreiner begonnen. 
Heute baue ich, was ich mir damals immer gewünscht habe: 
Möbel, die nicht aus dem Lager kommen, sondern aus einem 
Gespräch entstehen."
```

### Archetyp C: Spezialist mit Nische

**Beispiel:** Sebastian Schmitz – Designbäder, Großformat XXL.

```
"Während andere Fliesen verlegen, gestalten wir Bäder. 
Jedes unserer Projekte ist ein Designentwurf – von der ersten 
Skizze bis zur letzten Fuge. Großformatige XXL-Fliesen, 
Naturstein, bodengleiche Duschen: Hier entstehen Bäder, 
die wie Hotels aussehen, aber sich wie Zuhause anfühlen."
```

### Archetyp D: Tradition + Moderne

**Beispiel:** 4. Generation Bäckerei.

```
"Mein Urgroßvater eröffnete diese Bäckerei 1923. Vier 
Generationen später nutzen wir die gleichen Rezepte – und 
trotzdem ist nichts mehr wie damals. Wir mahlen unser Getreide 
selbst, fermentieren unseren Sauerteig 72 Stunden, und 
nutzen moderne Öfen, die genau die Temperaturen halten, 
die mein Urgroßvater nur erahnen konnte."
```

---

## Was Story NICHT sein darf

```
✗ "Wir sind ein hochmotiviertes, innovatives Unternehmen..."
✗ "Qualität ist unser höchstes Gut..."
✗ "Kundenzufriedenheit steht für uns an erster Stelle..."
✗ "Seit Jahren erfolgreich tätig..."

Das sagt jeder. Es bedeutet nichts.
```

**Stattdessen:**

```
✓ Konkrete Jahreszahlen
✓ Konkrete Namen  
✓ Konkrete Geschichten
✓ Konkrete Auszeichnungen
✓ Konkrete Werte mit Beispielen
```

---

## Discovery-Fragen an Kunden

**Im Sales-Termin diese Fragen stellen:**

```
1. Wann und warum haben Sie begonnen?
2. Gibt es eine Geschichte, wie Sie zu diesem Beruf kamen?
3. Wer arbeitet aktuell mit Ihnen?
4. Sind Sie Familie? Wie lange schon?
5. Was war Ihr stolzester Moment in der Karriere?
6. Welche Auszeichnungen / Meisterbriefe haben Sie?
7. Was macht Sie anders als die Konkurrenz?
8. Was würden Sie nie ändern an Ihrer Arbeitsweise?
9. Welcher Kunde hat Sie am meisten beeindruckt – und warum?
10. Was sagen Ihre Kunden über Sie?
```

**Aus den Antworten Story bauen.**

---

## Section HTML Struktur

```html
<section id="story" class="story">
  <div class="container">
    
    <div class="story-grid">
      
      <!-- LEFT: Text -->
      <div class="story-text">
        <span class="section-label">Über uns</span>
        <h2 class="section-h2">
          Vater & Sohn.<br>
          Zwei Meister.<br>
          Ein Versprechen.
        </h2>
        
        <p class="story-intro">
          Peter Butz legte 1997 den Grundstein. Sohn Maximilian 
          trat in seine Fußstapfen – nicht nur mit dem Meistertitel, 
          sondern als 3. Landessieger beim praktischen 
          Leistungswettbewerb der Handwerksjugend. Römerberg 
          vertraut Familie Butz seit fast 30 Jahren.
        </p>
        
        <!-- Team Members -->
        <div class="story-team">
          <article class="team-member">
            <div class="team-member__icon">👨</div>
            <div class="team-member__info">
              <strong>Peter Butz</strong>
              <span>Fliesenlegermeister · Meisterbrief 1994</span>
              <span>Gründer & Inhaber</span>
            </div>
          </article>
          
          <article class="team-member">
            <div class="team-member__icon">👦</div>
            <div class="team-member__info">
              <strong>Maximilian Butz</strong>
              <span>Fliesenlegermeister · Meisterbrief 2014</span>
              <span class="team-member__badge">
                🥉 3. Landessieger 2011
              </span>
            </div>
          </article>
        </div>
        
      </div>
      
      <!-- RIGHT: Visual -->
      <div class="story-visual">
        <img src="./bilder/team/team-foto.jpg" 
             alt="Peter und Maximilian Butz"
             class="story-photo">
        
        <!-- Stat Box overlay -->
        <div class="story-stat">
          <span class="story-stat__num">27</span>
          <span class="story-stat__label">Jahre Erfahrung</span>
        </div>
        
        <!-- Meisterbrief Thumbnails -->
        <div class="story-credentials">
          <a href="#" class="credential-thumb">
            <img src="./bilder/team/meisterbrief-peter.jpg" 
                 alt="Meisterbrief Peter Butz">
            <span>Meisterbrief Peter</span>
          </a>
          <a href="#" class="credential-thumb">
            <img src="./bilder/team/landessieger-max.jpg" 
                 alt="Urkunde Maximilian">
            <span>Landessieger Max</span>
          </a>
        </div>
      </div>
      
    </div>
  </div>
</section>
```

---

## Was tun wenn Kunde "keine Story" hat?

**Schritt 1: Vertieft fragen.**

Jeder Handwerker hat eine Geschichte. Sie ist oft nicht bewusst.

```
"Warum sind Sie Fliesenleger geworden?"
→ "Mein Onkel war einer."

"Was war Ihr erster Kunde, an den Sie sich erinnern?"
→ "Eine alte Dame, deren Mann gerade gestorben war..."

DAS ist die Story.
```

**Schritt 2: Werte über Story.**

Wenn keine Story rauszubekommen ist, fokus auf Werte:

```
"Was würden Sie NIE machen, auch wenn der Kunde es will?"
"Wofür sind Ihre Kunden Ihnen dankbar?"
"Was machen Sie anders?"
```

**Schritt 3: Story durch Show statt Tell.**

```
Wenn Worte schwer fallen, dann VIELE Fotos:
- Team bei der Arbeit
- Werkstatt-Detail-Aufnahmen
- Werkzeug, Hände, Material
- Behind-the-Scenes

Bilder erzählen die Story dann.
```

---

## Premium-Move: Inhaberzitat

```html
<blockquote class="owner-quote">
  <p>
    "Ein Bad ist mehr als nur eine Funktion. Es ist der Ort, 
    an dem unsere Kunden morgens den Tag beginnen. Das ist 
    Grund genug, jedes Detail richtig zu machen."
  </p>
  <footer>
    <img src="./bilder/team/peter-butz.jpg" alt="Peter Butz">
    <cite>
      <strong>Peter Butz</strong>
      <span>Gründer & Meister seit 1994</span>
    </cite>
  </footer>
</blockquote>
```

**Wirkt persönlich, vertrauensbildend, einzigartig.**

---

## Visual Storytelling Patterns

```
PATTERN A: Timeline horizontal
1997 ──── 2014 ──── 2024
Gründung  Sohn Max  Heute

PATTERN B: Photo + Quote Side-by-Side
[Photo of Owner] | "Quote about values"

PATTERN C: Behind-the-Scenes Galerie
Werkstatt | Arbeit | Detail | Übergabe

PATTERN D: Team Card Grid
[Peter]   [Maximilian]   [Lehrling]
Meister   Meister        Aspirant
```

---

## Anti-Patterns

```
✗ Generic Stock-Foto eines Handwerkers
   → Niemand glaubt das ist der echte Inhaber

✗ KI-generierte Bilder vom Team
   → Wirkt unecht, zerstört Vertrauen

✗ Zu lange Story (>500 Wörter)
   → Niemand liest

✗ Selbst-Lob ohne Beweise
   "Wir sind die besten" ohne Auszeichnung

✗ Story die nicht zur Marke passt
   Premium-Bäder + "Wir sind die günstigsten"

✗ Story nur in Text, keine Bilder
   Always show, don't just tell
```

---

## Story-Länge

```
Hero One-Liner:     1 Satz (Tagline)
Über-uns Section:   2-4 Absätze (200-300 Wörter)
Eigene /ueber-uns:  500-800 Wörter mit Bildern
Owner-Quote:        1-2 Sätze
```

**Mehr ist nicht besser. Klar ist besser.**
