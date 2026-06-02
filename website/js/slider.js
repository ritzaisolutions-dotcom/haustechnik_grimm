/* Before/After Slider — Handwerker Template */
(() => {
  'use strict';

  const slider = document.getElementById('vnSlider');
  if (!slider) return;

  const beforeImg = slider.querySelector('.vn-before img');
  const afterWrap = slider.querySelector('.vn-after');
  const afterImg = slider.querySelector('.vn-after img');
  const divider = document.getElementById('vnDivider');
  const tabs = document.querySelectorAll('[data-vn-set]');
  const toggleButtons = document.querySelectorAll('[data-vn-view]');
  const mobileMq = window.matchMedia('(max-width: 768px)');

  if (!afterWrap || !divider) return;

  const imageSets = {
    dusche: {
      before: 'images/ref_6.jpg',
      after: 'images/ref_1.jpg',
      label: 'Badsanierung'
    }
  };

  let isDragging = false;
  let currentPct = 50;
  let toggleMode = mobileMq.matches;

  const resolveCandidates = (path) => {
    if (!path) return [];
    const normalized = path.replace(/^\.\.\//, '').replace(/^\.\//, '');
    const clean = normalized.replace(/^\/+/, '');
    return [path, `../${clean}`, `/${clean}`, `./${clean}`];
  };

  const setImageWithFallback = (img, path) => {
    const candidates = resolveCandidates(path);
    if (!candidates.length) return;
    let idx = 0;
    const apply = () => {
      img.src = candidates[idx];
    };
    img.onerror = () => {
      idx += 1;
      if (idx < candidates.length) {
        apply();
      } else {
        slider.classList.add('vn-slider--error');
      }
    };
    img.onload = () => {
      slider.classList.remove('vn-slider--error');
    };
    apply();
  };

  const applySet = (setKey) => {
    const set = imageSets[setKey];
    if (!set || !beforeImg || !afterImg) return;
    setImageWithFallback(beforeImg, set.before);
    setImageWithFallback(afterImg, set.after);
    slider.setAttribute('aria-label', `Vorher-Nachher Vergleich: ${set.label}`);
    tabs.forEach((tab) => {
      const isActive = tab.getAttribute('data-vn-set') === setKey;
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  };

  const setClipPct = (pct) => {
    const clamped = Math.max(0, Math.min(100, pct));
    currentPct = clamped;
    afterWrap.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
    divider.style.left = `${clamped}%`;
  };

  const setPosition = (clientX) => {
    const rect = slider.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setClipPct(pct);
  };

  const setToggleView = (view) => {
    if (view === 'before') {
      setClipPct(0);
    } else {
      setClipPct(100);
    }
    toggleButtons.forEach((btn) => {
      const active = btn.getAttribute('data-vn-view') === view;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  };

  const applyInteractionMode = () => {
    toggleMode = mobileMq.matches;
    slider.classList.toggle('vn-slider--toggle-mode', toggleMode);
    isDragging = false;

    if (toggleMode) {
      setToggleView('nachher');
    } else {
      setClipPct(currentPct || 50);
    }
  };

  const onMouseDown = (e) => {
    if (toggleMode) return;
    isDragging = true;
    setPosition(e.clientX);
  };

  const onMouseMove = (e) => {
    if (!isDragging || toggleMode) return;
    setPosition(e.clientX);
  };

  const onMouseUp = () => {
    isDragging = false;
  };

  const onTouchStart = (e) => {
    if (toggleMode) return;
    isDragging = true;
    setPosition(e.touches[0].clientX);
  };

  const onTouchMove = (e) => {
    if (!isDragging || toggleMode) return;
    setPosition(e.touches[0].clientX);
  };

  const onTouchEnd = () => {
    isDragging = false;
  };

  slider.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
  slider.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchmove', onTouchMove, { passive: true });
  window.addEventListener('touchend', onTouchEnd);

  slider.setAttribute('tabindex', '0');
  slider.addEventListener('keydown', (e) => {
    if (toggleMode) return;
    const cur = currentPct;
    if (e.key === 'ArrowLeft') {
      setClipPct(Math.max(5, cur - 5));
    }
    if (e.key === 'ArrowRight') {
      setClipPct(Math.min(95, cur + 5));
    }
  });

  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setToggleView(btn.getAttribute('data-vn-view'));
    });
  });

  const initSlider = () => {
    const rect = slider.getBoundingClientRect();
    if (rect.width > 0) {
      applyInteractionMode();
    } else {
      requestAnimationFrame(initSlider);
    }
  };

  if (typeof mobileMq.addEventListener === 'function') {
    mobileMq.addEventListener('change', applyInteractionMode);
  } else {
    mobileMq.addListener(applyInteractionMode);
  }

  requestAnimationFrame(initSlider);
  applySet('dusche');

  window.addEventListener('resize', () => {
    if (toggleMode) return;
    setClipPct(currentPct);
  });

  if (tabs.length) {
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        applySet(tab.getAttribute('data-vn-set'));
      });
    });
  }
})();
