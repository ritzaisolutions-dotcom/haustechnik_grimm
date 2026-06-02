# 06 – Vorher/Nachher Slider

**Der emotionale Hook. Hier kauft er.**

---

## Anatomie

```
┌─────────────────────────────────────┐
│  [VORHER]              [NACHHER]    │  ← Labels
│                                     │
│  ████████████│░░░░░░░░░░░░░░░░░    │
│  Altes Bild  ◁▷  Neues Bild        │  ← Slider Handle
│  ████████████│░░░░░░░░░░░░░░░░░    │
│                                     │
└─────────────────────────────────────┘

  Tab 1   Tab 2   Tab 3                 ← Kategorie-Tabs
```

---

## HTML Struktur

```html
<section id="vorher-nachher" class="vn-section">
  <div class="container">
    <!-- Header -->
    <header class="section-header">
      <span class="section-label">Unsere Arbeit</span>
      <h2 class="section-h2">Sehen Sie den Unterschied selbst.</h2>
      <p class="section-sub">Ziehen Sie den Regler – von alt zu neu.</p>
    </header>

    <!-- Tabs -->
    <nav class="vn-tabs" role="tablist">
      <button class="vn-tab active" 
              role="tab" 
              data-set="0"
              aria-selected="true">
        Badezimmer
      </button>
      <button class="vn-tab" 
              role="tab" 
              data-set="1"
              aria-selected="false">
        Außenbereich
      </button>
      <button class="vn-tab" 
              role="tab" 
              data-set="2"
              aria-selected="false">
        Wohnbereich
      </button>
    </nav>

    <!-- Slider -->
    <div class="vn-slider" 
         id="vn-slider"
         role="region"
         aria-label="Vorher Nachher Vergleich">
      
      <!-- Before Image -->
      <div class="vn-img vn-before">
        <img src="./bilder/vn/bad-vorher.jpg" 
             alt="Badezimmer vor der Sanierung">
        <span class="vn-label vn-label-before">Vorher</span>
      </div>

      <!-- After Image (clipped) -->
      <div class="vn-img vn-after">
        <img src="./bilder/vn/bad-nachher.jpg" 
             alt="Badezimmer nach der Sanierung">
        <span class="vn-label vn-label-after">Nachher</span>
      </div>

      <!-- Divider Handle -->
      <div class="vn-divider" id="vn-divider">
        <div class="vn-handle">
          <span class="vn-handle-icon">◁ ▷</span>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="vn-cta">
      <a href="#termin" class="btn-primary">
        Ihr Projekt besprechen
      </a>
    </div>
  </div>
</section>
```

---

## CSS

```css
.vn-section {
  background: var(--primary);
  color: white;
  padding: var(--space-8) 0;
}

/* Tabs */
.vn-tabs {
  display: flex;
  gap: var(--space-2);
  justify-content: center;
  margin-bottom: var(--space-6);
  flex-wrap: wrap;
}

.vn-tab {
  padding: 10px 22px;
  border-radius: var(--radius-full);
  border: 1px solid rgba(255,255,255,0.15);
  background: transparent;
  color: rgba(255,255,255,0.6);
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all var(--duration-fast);
}

.vn-tab.active {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
}

/* Slider Container */
.vn-slider {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  aspect-ratio: 16/9;
  overflow: hidden;
  border-radius: var(--radius-md);
  cursor: col-resize;
  user-select: none;
  box-shadow: var(--shadow-lg);
}

@media (max-width: 768px) {
  .vn-slider {
    aspect-ratio: 4/3;
  }
}

/* Images */
.vn-img {
  position: absolute;
  inset: 0;
}

.vn-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  pointer-events: none;
}

.vn-after {
  clip-path: inset(0 40% 0 0);
  transition: clip-path 0.05s linear;
}

/* Labels */
.vn-label {
  position: absolute;
  top: 16px;
  padding: 6px 14px;
  border-radius: var(--radius-full);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-weight: 600;
  color: white;
}

.vn-label-before {
  left: 16px;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(8px);
}

.vn-label-after {
  right: 16px;
  background: var(--accent);
}

/* Divider */
.vn-divider {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 60%;
  width: 2px;
  background: white;
  z-index: 10;
  pointer-events: none;
}

.vn-handle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  background: var(--accent);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  cursor: col-resize;
  pointer-events: auto;
}

.vn-handle-icon {
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: -2px;
}

/* CTA */
.vn-cta {
  text-align: center;
  margin-top: var(--space-6);
}
```

---

## JavaScript

```javascript
(() => {
  'use strict';
  
  const slider = document.getElementById('vn-slider');
  if (!slider) return;
  
  const imgAfter = slider.querySelector('.vn-after');
  const divider = document.getElementById('vn-divider');
  const tabs = document.querySelectorAll('.vn-tab');
  const beforeImg = slider.querySelector('.vn-before img');
  const afterImg = slider.querySelector('.vn-after img');
  
  let isDragging = false;
  let currentSet = 0;
  
  // Bildsets (vom Kunden)
  const imageSets = [
    {
      label: 'Badezimmer',
      before: './bilder/vn/bad-vorher.jpg',
      after: './bilder/vn/bad-nachher.jpg',
      beforeAlt: 'Badezimmer vor der Sanierung',
      afterAlt: 'Badezimmer nach der Sanierung'
    },
    {
      label: 'Außenbereich',
      before: './bilder/vn/aussen-vorher.jpg',
      after: './bilder/vn/aussen-nachher.jpg',
      beforeAlt: 'Außenbereich vorher',
      afterAlt: 'Außenbereich nachher'
    },
    {
      label: 'Wohnbereich',
      before: './bilder/vn/wohnen-vorher.jpg',
      after: './bilder/vn/wohnen-nachher.jpg',
      beforeAlt: 'Wohnbereich vorher',
      afterAlt: 'Wohnbereich nachher'
    }
  ];
  
  function setSliderPosition(clientX) {
    const rect = slider.getBoundingClientRect();
    let pct = ((clientX - rect.left) / rect.width) * 100;
    pct = Math.max(5, Math.min(95, pct));
    
    imgAfter.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    divider.style.left = `${pct}%`;
  }
  
  // Mouse Events
  slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    setSliderPosition(e.clientX);
  });
  
  window.addEventListener('mousemove', (e) => {
    if (isDragging) setSliderPosition(e.clientX);
  });
  
  window.addEventListener('mouseup', () => {
    isDragging = false;
  });
  
  // Touch Events
  slider.addEventListener('touchstart', (e) => {
    isDragging = true;
    setSliderPosition(e.touches[0].clientX);
  }, { passive: true });
  
  window.addEventListener('touchmove', (e) => {
    if (isDragging) setSliderPosition(e.touches[0].clientX);
  }, { passive: true });
  
  window.addEventListener('touchend', () => {
    isDragging = false;
  });
  
  // Keyboard Accessibility
  slider.addEventListener('keydown', (e) => {
    const rect = slider.getBoundingClientRect();
    const currentLeft = parseFloat(divider.style.left || '60');
    let newPct = currentLeft;
    
    if (e.key === 'ArrowLeft') newPct = Math.max(5, currentLeft - 5);
    if (e.key === 'ArrowRight') newPct = Math.min(95, currentLeft + 5);
    
    if (newPct !== currentLeft) {
      imgAfter.style.clipPath = `inset(0 ${100 - newPct}% 0 0)`;
      divider.style.left = `${newPct}%`;
    }
  });
  slider.setAttribute('tabindex', '0');
  
  // Tab Switching
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const setIndex = parseInt(tab.dataset.set);
      switchSet(setIndex);
      
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
    });
  });
  
  function switchSet(index) {
    const set = imageSets[index];
    if (!set) return;
    
    // Crossfade
    slider.style.opacity = '0.4';
    setTimeout(() => {
      beforeImg.src = set.before;
      beforeImg.alt = set.beforeAlt;
      afterImg.src = set.after;
      afterImg.alt = set.afterAlt;
      slider.style.opacity = '1';
      
      // Reset position
      setSliderPosition(slider.getBoundingClientRect().left + slider.offsetWidth * 0.6);
    }, 200);
    
    currentSet = index;
  }
  
  // Init position
  setSliderPosition(slider.getBoundingClientRect().left + slider.offsetWidth * 0.6);
})();
```

---

## Bildanforderungen (an Kunden)

```
PRO BILDPAAR:
✓ Identische Kameraposition
✓ Identische Beleuchtung (so weit möglich)
✓ Identischer Bildausschnitt
✓ Mindestens 1920x1080 px
✓ JPG oder WebP, max 500 KB pro Bild
✓ Gut belichtet, scharf, professionell

ANZAHL:
- Minimum: 2 Bildpaare
- Optimal: 3-5 Bildpaare
- Maximum: 5 (mehr verwirrt)

KATEGORIEN (Beispiele Fliesenleger):
- Badezimmer Sanierung
- Außenbereich (Terrasse)
- Wohnbereich (Bodenbelag)
- Gewerbe (Friseur, Restaurant)
```

---

## Anti-Patterns

```
✗ Vorher/Nachher mit unterschiedlicher Beleuchtung
   (sieht nach Photoshop aus, nicht nach Handwerk)

✗ "Vorher" mit Möbeln drin, "Nachher" leer
   (kein fairer Vergleich)

✗ Mehr als 5 Bildpaare
   (Choice Paralysis)

✗ Auto-Slide ohne User-Aktion
   (User soll INTERAGIEREN, nicht zuschauen)

✗ Sehr lange Animationen beim Tab-Wechsel
   (> 400ms wirkt träge)
```

---

## Wenn Kunde noch keine Bilder hat

**Demo-Modus:**
```
- Placeholder mit Gradient + Text "Vorher-Foto folgt"
- TODO-Kommentar im Code
- Im Sales-Termin Bilder einfordern
- Sage explizit: "Sobald wir 3 Bildpaare haben, ist die Section live"
```

**Live-Modus:**
```
- Section komplett ausblenden bis Bilder da sind
- ODER: Stock-Photo mit Disclaimer (suboptimal)
```

---

## Robustness & Failure Handling (Pflicht)

```
□ Vor dem Aktivieren eines Bildsets beide Bilder preloaden
□ Falls ein Bild fehlt: sichtbare Fehlermeldung/Placeholder anzeigen
□ Slider-Handle auf Resize/Orientation behalten (Position nicht verlieren)
□ Touch, Maus und Keyboard (Arrow Left/Right) immer funktionsfaehig halten
□ No-JS Fall: Vorher/Nachher Bilder als statischer Block sichtbar
```

**QA-Minimum vor Launch:**
- Langsames Netz simulieren
- Mobile Touch-Drag pruefen
- Desktop Keyboard-Steuerung pruefen
- Beide Richtungen Drag bis Rand (5-95%) testen

---

## Update 2026-05-28 (Demo Fliesenmeister Butz)

- Für Bad-Slider standardmäßig Hochformat verwenden: `aspect-ratio: 9/16`.
- Desktop-Maxbreite begrenzen (`max-width`), damit der Slider hochwertig wirkt und nicht zu breit wird.
- Touch-Handle mindestens 44x44px, besser 48x48px für sichere Bedienung auf Mobile.
