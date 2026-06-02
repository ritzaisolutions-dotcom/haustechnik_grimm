# 05 – Hero Animation

**Der Hero entscheidet ob er weiterscrollt oder schließt.**

---

## Animations-Schichten (Layered)

```
Layer 1: Background (subtil, kontinuierlich)
Layer 2: Text Reveal (einmalig, beim Load)
Layer 3: Image/Visual Reveal (einmalig, beim Load)
Layer 4: Cursor Interactions (kontinuierlich auf Desktop)
Layer 5: Scroll-Triggered Effekte (parallax/fade)
```

---

## Layer 1: Background Animation

**Option A – Subtle Gradient Drift (Default)**
```css
@keyframes bgDrift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.hero {
  background: linear-gradient(
    135deg,
    var(--bg) 0%,
    var(--bg-alt) 50%,
    var(--bg) 100%
  );
  background-size: 200% 200%;
  animation: bgDrift 20s ease infinite;
}
```

**Option B – Grain Texture (Premium Feel)**
```css
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,...grain.svg");
  opacity: 0.04;
  pointer-events: none;
  mix-blend-mode: multiply;
}
```

**Option C – Animated Lines/Particles**
Nur für Tech/Premium-Branding. Bei klassischem Handwerk skippen.

---

## Layer 2: Text Reveal Animation

**Word-by-Word Reveal (Empfohlen):**

```html
<h1 class="hero-h1">
  <span class="word">Ihr</span>
  <span class="word">Fliesen&shy;leger-</span>
  <span class="word"><em>Meister</em></span>
  <span class="word">weiß</span>
  <span class="word">wie's</span>
  <span class="word">geht.</span>
</h1>
```

```css
.word {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px);
  animation: wordReveal 0.7s var(--ease-out) forwards;
}

.word:nth-child(1) { animation-delay: 0.1s; }
.word:nth-child(2) { animation-delay: 0.2s; }
.word:nth-child(3) { animation-delay: 0.3s; }
.word:nth-child(4) { animation-delay: 0.4s; }
.word:nth-child(5) { animation-delay: 0.5s; }
.word:nth-child(6) { animation-delay: 0.6s; }

@keyframes wordReveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Tipp:** Akzent-Wort (in `<em>`) ist GROßER und in Akzentfarbe.

---

## Layer 3: Image/Visual Reveal

**Image Grid Reveal:**
```css
.hero-img-cell {
  opacity: 0;
  transform: scale(1.1);
  animation: imageReveal 1s var(--ease-out) forwards;
}

.hero-img-cell:nth-child(1) { animation-delay: 0.6s; }
.hero-img-cell:nth-child(2) { animation-delay: 0.7s; }
.hero-img-cell:nth-child(3) { animation-delay: 0.8s; }
.hero-img-cell:nth-child(4) { animation-delay: 0.9s; }

@keyframes imageReveal {
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

**Video Loop (Alternative):**
```html
<video autoplay muted loop playsinline poster="hero-poster.jpg">
  <source src="hero-loop.mp4" type="video/mp4">
  <source src="hero-loop.webm" type="video/webm">
</video>
```

Regeln:
- Muted (sonst blockt Browser autoplay)
- playsinline (iOS)
- Max 8 Sekunden Loop
- Max 2 MB Dateigröße
- Poster-Bild für Ladephase

---

## Layer 4: Cursor Follower (Desktop only)

```javascript
const cursor = document.createElement('div');
cursor.className = 'cursor-follower';
document.body.appendChild(cursor);

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  cursorX += (mouseX - cursorX) * 0.15;
  cursorY += (mouseY - cursorY) * 0.15;
  cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
  requestAnimationFrame(animate);
}

if (window.matchMedia('(min-width: 1024px)').matches) {
  animate();
}
```

```css
.cursor-follower {
  position: fixed;
  top: -8px;
  left: -8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--accent);
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.1s ease-out;
  mix-blend-mode: difference;
}

/* Größer über Buttons */
button:hover ~ .cursor-follower,
a:hover ~ .cursor-follower {
  transform: scale(3);
}
```

---

## Layer 5: Scroll Effekte

**Parallax (vorsichtig):**
```javascript
const heroImg = document.querySelector('.hero-img');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  heroImg.style.transform = `translateY(${scrolled * 0.3}px)`;
}, { passive: true });
```

**Fade-Out beim Scroll:**
```javascript
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
  const opacity = 1 - (window.scrollY / 600);
  hero.style.opacity = Math.max(0.3, opacity);
}, { passive: true });
```

**Nicht:** Übertriebener Parallax wo alles wild fliegt. Subtil.

---

## Scroll Indicator (Bottom of Hero)

```html
<div class="scroll-indicator">
  <span>Scroll</span>
  <div class="scroll-arrow">↓</div>
</div>
```

```css
.scroll-indicator {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  animation: scrollBob 2s ease-in-out infinite;
}

.scroll-indicator.hidden {
  opacity: 0;
  transition: opacity 0.5s;
}

@keyframes scrollBob {
  0%, 100% { transform: translate(-50%, 0); }
  50% { transform: translate(-50%, 8px); }
}
```

JS: Versteckt sich nach erstem Scroll.

---

## Marquee Ticker (Premium Feel)

```html
<div class="marquee">
  <div class="marquee-track">
    <span>BADSANIERUNG · FLIESEN · MEISTERBETRIEB · </span>
    <span>BADSANIERUNG · FLIESEN · MEISTERBETRIEB · </span>
  </div>
</div>
```

```css
.marquee {
  overflow: hidden;
  white-space: nowrap;
}

.marquee-track {
  display: inline-block;
  animation: marquee 18s linear infinite;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
```

---

## Performance Rules

```
✓ Alle Animationen über transform und opacity (GPU-accelerated)
✓ will-change: transform sparsam einsetzen
✓ requestAnimationFrame statt setInterval
✓ Passive Event Listener für scroll/touch
✓ IntersectionObserver für scroll-triggered
✓ prefers-reduced-motion respektieren

✗ Animationen über width/height/margin (Reflow!)
✗ Mehr als 5 gleichzeitige Animationen
✗ Synchrone JS-Logik im scroll-Handler
```

```css
/* User mit reduzierter Bewegung respektieren */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Hero Animation Budget

```
Initial Page Load:
- Background fade-in: 0s, dauer 0.3s
- Badge eyebrow: 0.1s delay
- H1 words: 0.2-0.6s staggered
- Subline: 0.7s delay
- CTAs: 0.8s delay
- Trust Bar: 0.9s delay
- Hero Images: 0.6-0.9s staggered

GESAMT: Hero komplett geladen nach ~1.5s
```

Schneller wirkt gehetzt. Langsamer wirkt langweilig.

---

## Anti-Patterns

```
✗ Vollbild-Video mit Sound (autoplay blockiert)
✗ Animationen die länger als 1.5s dauern
✗ Bouncing Buttons / Wackel-Effekte
✗ Glitch-Animationen (Trend ist tot)
✗ "Typewriter" Effekt mit Cursor (sieht 2010 aus)
✗ Rotating Words wenn Geschwindigkeit zu schnell
✗ Particles über den ganzen Hero verteilt
✗ Mausgesteuerte 3D-Tilt-Effekte
```

---

## Update 2026-05-28 (Demo Fliesenmeister Butz)

- Top-Navigation bei Video-Hero nicht permanent massiv anzeigen.
- Best Practice: Nav auf Hero transparent halten und erst nach Verlassen der Hero in den soliden Zustand wechseln.
- Der Schwellwert sollte an die Hero-Höhe gebunden werden, nicht an einen fixen Scroll-Pixelwert.
