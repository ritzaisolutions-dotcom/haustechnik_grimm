(() => {
  'use strict';

  const _C = (typeof CLIENT !== 'undefined') ? CLIENT : {};

  const PROJECTS = {
    bad:         { label: 'Badsanierung',                    sizeType: 'm2' },
    heizung:     { label: 'Heizungsmodernisierung / Wärmepumpe', sizeType: 'wohnflaeche' },
    haustechnik: { label: 'Haustechnik / Sanitär',           sizeType: 'rooms' },
    lueftung:    { label: 'Lüftung / Klimaanlage',           sizeType: 'wohnflaeche' },
    reparatur:   { label: 'Reparatur & Wartung',             sizeType: 'pauschale' }
  };

  const QUALITY_LABELS = {
    standard: 'Standard',
    komfort:  'Komfort',
    premium:  'Premium'
  };

  const DEFAULT_PREISE = {
    bad:         { standard: 550,  komfort: 750,  premium: 1100 },
    heizung:     { standard: 8000, komfort: 12000, premium: 18000 },
    haustechnik: { standard: 800,  komfort: 1200, premium: 1800 },
    lueftung:    { standard: 6000, komfort: 9000, premium: 14000 },
    reparatur:   { standard: 150,  komfort: 150,  premium: 150 }
  };

  const PREISE = _C.calcShkPreise || DEFAULT_PREISE;
  const RANGE = { minFactor: 0.93, maxFactor: 1.12, roundTo: 10 };

  const form = document.getElementById('calcForm');
  const wizard = document.getElementById('calcWizard');
  const resultWrap = document.getElementById('calcResult');
  const total = document.getElementById('calcTotal');
  const summaryText = document.getElementById('calcSummaryText');
  const nextBtn = document.getElementById('calcNextBtn');
  const backBtn = document.getElementById('calcBackBtn');
  const resetBtn = document.getElementById('calcResetBtn');
  const step2Error = document.getElementById('calcStep2Error');
  const step3Error = document.getElementById('calcStep3Error');
  const callbackForm = document.getElementById('calcCallbackForm');
  const callbackResult = document.getElementById('calcCallbackResult');

  if (!form || !wizard || !resultWrap || !total || !nextBtn || !backBtn) return;

  const euro = (value) =>
    new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);

  const roundRange = (value) => Math.round(value / RANGE.roundTo) * RANGE.roundTo;

  const sizeSliders = {
    bad:         { input: document.getElementById('calcSizeBad'),         out: document.getElementById('calcSizeBadOut') },
    heizung:     { input: document.getElementById('calcSizeHeizung'),     out: document.getElementById('calcSizeHeizungOut') },
    haustechnik: { input: document.getElementById('calcSizeHaustechnik'), out: document.getElementById('calcSizeHaustechnikOut') },
    lueftung:    { input: document.getElementById('calcSizeLueftung'),    out: document.getElementById('calcSizeLueftungOut') }
  };

  const state = {
    step: 1,
    projectType: 'bad',
    quality: 'standard',
    lastResult: null
  };

  const stepPanels = Array.from(wizard.querySelectorAll('.calc-panel'));
  const stepDots = Array.from(wizard.querySelectorAll('.calc-step-dot'));
  const projectChoices = Array.from(form.querySelectorAll('.calc-choice[data-field="projectType"]'));
  const qualityChoices = Array.from(form.querySelectorAll('.calc-choice[data-field="quality"]'));
  const sizePanels = Array.from(document.querySelectorAll('.calc-size-panel'));

  const getSize = () => {
    const type = state.projectType;
    if (type === 'reparatur') return 1;
    const slider = sizeSliders[type];
    return slider?.input ? Number(slider.input.value) : 0;
  };

  const getSizeLabel = () => {
    const size = getSize();
    switch (PROJECTS[state.projectType]?.sizeType) {
      case 'm2':          return `${size} m²`;
      case 'wohnflaeche': return `${size} m² Wohnfläche`;
      case 'rooms':       return `${size} ${size === 1 ? 'Raum' : 'Räume'}`;
      case 'pauschale':   return 'Pauschale';
      default:            return String(size);
    }
  };

  const calculate = () => {
    const projectId = state.projectType;
    const quality = state.quality;
    const size = getSize();
    const rates = PREISE[projectId]?.[quality] ?? PREISE[projectId]?.standard ?? 0;
    const project = PROJECTS[projectId];
    let base = 0;

    switch (project?.sizeType) {
      case 'm2':
        base = size * rates;
        break;
      case 'wohnflaeche':
        base = rates * (size / 100);
        break;
      case 'rooms':
        base = size * rates;
        break;
      case 'pauschale':
        base = rates;
        break;
      default:
        base = rates;
    }

    const sumMin = roundRange(base * RANGE.minFactor);
    const sumMax = roundRange(base * RANGE.maxFactor);
    const sumAvg = Math.round((sumMin + sumMax) / 2);

    return {
      projectId,
      projectLabel: project.label,
      quality,
      qualityLabel: QUALITY_LABELS[quality],
      size,
      sizeLabel: getSizeLabel(),
      sumMin,
      sumMax,
      sumAvg,
      summary: `${project.label} · ${getSizeLabel()} · ${QUALITY_LABELS[quality]}`
    };
  };

  const buildWaHref = (phone, result) => {
    const num = (_C.whatsapp || '+4917621900432').replace(/[^0-9+]/g, '').replace(/^\+/, '');
    const text = [
      'Hallo, ich interessiere mich für ein Angebot.',
      `Projektart: ${result.projectLabel}`,
      `Größe: ${result.sizeLabel}`,
      `Qualität: ${result.qualityLabel}`,
      `Geschätzter Rahmen: ${result.sumMin}€ – ${result.sumMax}€`,
      `Meine Telefonnummer: ${phone.trim()}`
    ].join('\n');
    return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
  };

  const setError = (el, visible) => {
    if (!el) return;
    el.hidden = !visible;
    el.classList.toggle('calc-error--visible', visible);
  };

  const showSizePanel = () => {
    sizePanels.forEach((panel) => {
      panel.hidden = panel.dataset.sizeFor !== state.projectType;
    });
  };

  const syncSliderOutputs = () => {
    Object.values(sizeSliders).forEach(({ input, out }) => {
      if (!input || !out) return;
      out.textContent = input.value;
      input.setAttribute('aria-valuenow', input.value);
    });
  };

  const bindSliders = () => {
    Object.values(sizeSliders).forEach(({ input }) => {
      if (!input) return;
      input.addEventListener('input', syncSliderOutputs);
    });
    syncSliderOutputs();
  };

  const highlightChoices = () => {
    projectChoices.forEach((c) => c.classList.toggle('is-selected', c.dataset.value === state.projectType));
    qualityChoices.forEach((c) => c.classList.toggle('is-selected', c.dataset.value === state.quality));
  };

  const scrollToCalc = () => {
    document.getElementById('kostenrechner')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const renderStep = () => {
    stepPanels.forEach((panel) => {
      panel.hidden = Number(panel.dataset.step) !== state.step;
    });
    stepDots.forEach((dot, idx) => {
      dot.classList.toggle('calc-step-dot--active', idx + 1 === state.step);
    });
    backBtn.hidden = state.step === 1;
    nextBtn.hidden = state.step === 4;
    nextBtn.textContent = state.step === 3 ? 'Berechnen' : 'Weiter';
    if (state.step === 2) showSizePanel();
    highlightChoices();
    if (state.step !== 2) setError(step2Error, false);
    if (state.step !== 3) setError(step3Error, false);
  };

  const validateStep = () => {
    if (state.step === 2 && state.projectType !== 'reparatur') {
      const size = getSize();
      const ok = size >= 1;
      setError(step2Error, !ok);
      return ok;
    }
    if (state.step === 3) {
      const ok = Boolean(state.quality);
      setError(step3Error, !ok);
      return ok;
    }
    return true;
  };

  projectChoices.forEach((choice) => {
    choice.addEventListener('click', () => {
      const value = choice.dataset.value;
      if (!value || !PROJECTS[value]) return;
      state.projectType = value;
      highlightChoices();
      window.setTimeout(() => {
        if (state.step === 1) {
          state.step = 2;
          showSizePanel();
          renderStep();
          scrollToCalc();
        }
      }, 180);
    });
  });

  qualityChoices.forEach((choice) => {
    choice.addEventListener('click', () => {
      const value = choice.dataset.value;
      if (!value) return;
      state.quality = value;
      highlightChoices();
      setError(step3Error, false);
    });
  });

  nextBtn.addEventListener('click', () => {
    if (!validateStep()) return;
    if (state.step === 3) {
      const result = calculate();
      state.lastResult = result;
      summaryText.textContent = result.summary;
      if (state.projectType === 'reparatur') {
        total.textContent = `ab ${euro(result.sumMin)}`;
      } else {
        total.textContent = `${euro(result.sumMin)} – ${euro(result.sumMax)}`;
      }
      resultWrap.hidden = false;
      state.step = 4;
      renderStep();
      scrollToCalc();
      window.lastCalculation = {
        ...result,
        sumMin: result.sumMin,
        sumMax: result.sumMax,
        sumAvg: result.sumAvg,
        projectLabel: result.projectLabel,
        materialLabel: result.qualityLabel,
        area: result.size,
        summary: result.summary,
        generatedAt: new Date().toISOString()
      };
      if (callbackResult) {
        callbackResult.hidden = true;
        callbackResult.textContent = '';
      }
      return;
    }
    state.step = Math.min(4, state.step + 1);
    if (state.step === 2) showSizePanel();
    renderStep();
    scrollToCalc();
  });

  backBtn.addEventListener('click', () => {
    state.step = Math.max(1, state.step - 1);
    renderStep();
    scrollToCalc();
  });

  const resetCalculator = () => {
    state.step = 1;
    state.projectType = 'bad';
    state.quality = 'standard';
    state.lastResult = null;
    Object.entries(sizeSliders).forEach(([key, { input }]) => {
      if (!input) return;
      const defaults = { bad: 8, heizung: 120, haustechnik: 3, lueftung: 120 };
      if (defaults[key] !== undefined) input.value = defaults[key];
    });
    syncSliderOutputs();
    resultWrap.hidden = true;
    setError(step2Error, false);
    setError(step3Error, false);
    if (callbackForm) callbackForm.reset();
    if (callbackResult) callbackResult.hidden = true;
    renderStep();
    scrollToCalc();
  };

  if (resetBtn) resetBtn.addEventListener('click', resetCalculator);

  if (callbackForm) {
    callbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const phone = callbackForm.querySelector('input[name="phone"]')?.value || '';
      const phoneDigits = phone.replace(/\D/g, '');

      if (phoneDigits.length < 6) {
        if (callbackResult) {
          callbackResult.hidden = false;
          callbackResult.textContent = 'Bitte geben Sie eine gültige Telefonnummer an.';
          callbackResult.className = 'calc-callback-result calc-callback-result--error';
        }
        return;
      }

      if (!state.lastResult) {
        state.lastResult = calculate();
      }

      const href = buildWaHref(phone, state.lastResult);
      window.open(href, '_blank', 'noopener,noreferrer');

      if (callbackResult) {
        callbackResult.hidden = false;
        callbackResult.textContent = 'WhatsApp wurde geöffnet — senden Sie die Nachricht ab, um Ihre Anfrage zu übermitteln.';
        callbackResult.className = 'calc-callback-result calc-callback-result--success';
      }
    });
  }

  bindSliders();
  showSizePanel();
  highlightChoices();
  renderStep();
})();
