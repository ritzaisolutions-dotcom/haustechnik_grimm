(() => {
  'use strict';

  /**
   * Preislogik für Handwerker-Template.
   * Alle Werte werden aus CLIENT (config.js) gezogen — Fallbacks für den Fall,
   * dass config.js noch nicht ausgefüllt wurde.
   */
  const _C = (typeof CLIENT !== 'undefined') ? CLIENT : {};
  const _PREISE = _C.preise || {};

  const CONFIG = {
    projects: (_C.calcProjekte && _C.calcProjekte.length)
      ? _C.calcProjekte
      : [
          { id: 'bath',    label: 'Projekttyp 1', multi: 1.3 },
          { id: 'floor',   label: 'Projekttyp 2', multi: 1.0 },
          { id: 'terrace', label: 'Projekttyp 3', multi: 1.15 },
          { id: 'repair',  label: 'Projekttyp 4', multi: 0.9 }
        ],
    materials: [
      { id: 'standard', label: (_C.calcMaterialien?.[0]?.label || 'Standard'),  pricePerM2: _PREISE.standard  || 135 },
      { id: 'premium',  label: (_C.calcMaterialien?.[1]?.label || 'Premium'),   pricePerM2: _PREISE.premium   || 240 },
      { id: 'xl',       label: (_C.calcMaterialien?.[2]?.label || 'Großformat'),pricePerM2: _PREISE.xl        || 330 }
    ],
    extras: [
      { id: 'debris',        label: (_C.calcExtras?.[0]?.label || 'Extra 1'), pricePerM2: _PREISE.altbelagEntfernen || 45 },
      { id: 'waterproofing', label: (_C.calcExtras?.[1]?.label || 'Extra 2'), pricePerM2: _PREISE.abdichtung       || 60 },
      { id: 'floorHeating',  label: (_C.calcExtras?.[2]?.label || 'Extra 3'), pricePerM2: _PREISE.fussbodenheizung || 28 }
    ],
    range: { minFactor: 0.93, maxFactor: 1.12, roundTo: 10 }
  };

  const form = document.getElementById('calcForm');
  const wizard = document.getElementById('calcWizard');
  const resultWrap = document.getElementById('calcResult');
  const breakdown = document.getElementById('calcBreakdown');
  const total = document.getElementById('calcTotal');
  const summaryText = document.getElementById('calcSummaryText');
  const pdfBtn = document.getElementById('calcPdfBtn');
  const nextBtn = document.getElementById('calcNextBtn');
  const backBtn = document.getElementById('calcBackBtn');
  const resetBtn = document.getElementById('calcResetBtn');
  const step2Error = document.getElementById('calcStep2Error');
  const callbackForm = document.getElementById('calcCallbackForm');
  const callbackSubject = document.getElementById('calcCallbackSubject');
  const callbackResult = document.getElementById('calcCallbackResult');

  if (!form || !wizard || !resultWrap || !breakdown || !total || !nextBtn || !backBtn) return;

  const euro = (value) =>
    new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);

  const roundRange = (value) => {
    const step = CONFIG.range.roundTo;
    return Math.round(value / step) * step;
  };

  const findProject = (id) => CONFIG.projects.find((p) => p.id === id) || CONFIG.projects[0];
  const findMaterial = (id) => CONFIG.materials.find((m) => m.id === id) || CONFIG.materials[0];

  const createLine = (label, amount) =>
    `<li><span class="calc-breakdown-label">${label}</span><span class="calc-breakdown-price">${euro(amount)}</span></li>`;

  const calculate = (data) => {
    const area = Number(data.area || 0);
    const project = findProject(data.projectType);
    const material = findMaterial(data.materialClass);

    const baseCore = area * material.pricePerM2 * project.multi;
    const lineItems = [];
    lineItems.push(createLine(`${project.label} · ${material.label} (${area} m²)`, baseCore));

    let baseTotal = baseCore;
    CONFIG.extras.forEach((extra) => {
      if (!data[extra.id]) return;
      const extraTotal = area * extra.pricePerM2;
      baseTotal += extraTotal;
      lineItems.push(createLine(extra.label, extraTotal));
    });

    const sumMin = roundRange(baseTotal * CONFIG.range.minFactor);
    const sumMax = roundRange(baseTotal * CONFIG.range.maxFactor);
    const sumAvg = Math.round((sumMin + sumMax) / 2);

    const extrasLabel = CONFIG.extras
      .filter((e) => data[e.id])
      .map((e) => e.label)
      .join(', ');

    const summary = `${project.label} · ${area} m² · ${material.label}${extrasLabel ? ' · inkl. Zusatzleistungen' : ''}`;

    return {
      lineItems,
      sumMin,
      sumMax,
      sumAvg,
      area,
      project: data.projectType,
      projectLabel: project.label,
      materialLabel: material.label,
      summary
    };
  };

  const resetCallbackForm = () => {
    if (!callbackForm) return;
    callbackForm.reset();
    if (callbackResult) {
      callbackResult.hidden = true;
      callbackResult.textContent = '';
      callbackResult.className = 'calc-callback-result';
    }
    const submitBtnEl = document.getElementById('calcCallbackSubmitBtn');
    if (submitBtnEl) {
      submitBtnEl.disabled = false;
      submitBtnEl.textContent = 'Rückruf anfordern';
    }
    callbackForm.querySelectorAll('input, button').forEach((el) => {
      el.disabled = false;
    });
  };

  const state = {
    step: 1,
    projectType: 'bath',
    materialClass: 'standard',
    extras: []
  };

  const stepPanels = Array.from(wizard.querySelectorAll('.calc-panel'));
  const stepDots = Array.from(wizard.querySelectorAll('.calc-step-dot'));
  const projectChoices = Array.from(form.querySelectorAll('.calc-choice[data-field="projectType"]'));
  const materialChoices = Array.from(form.querySelectorAll('.calc-choice[data-field="materialClass"]'));
  const extraChoices = Array.from(form.querySelectorAll('.calc-choice[data-extra]'));

  const setStep2Error = (visible) => {
    if (!step2Error) return;
    step2Error.hidden = !visible;
    step2Error.classList.toggle('calc-error--visible', visible);
  };

  const highlightChoices = () => {
    projectChoices.forEach((choice) => {
      choice.classList.toggle('is-selected', choice.dataset.value === state.projectType);
    });
    materialChoices.forEach((choice) => {
      choice.classList.toggle('is-selected', choice.dataset.value === state.materialClass);
    });
    extraChoices.forEach((choice) => {
      choice.classList.toggle('is-selected', state.extras.includes(choice.dataset.extra));
    });
  };

  const syncHiddenFields = () => {
    ['projectType', 'materialClass'].forEach((name) => {
      let hidden = form.querySelector(`input[type="hidden"][name="${name}"]`);
      if (!hidden) {
        hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.name = name;
        form.appendChild(hidden);
      }
      hidden.value = state[name];
    });
  };

  const scrollToCalc = () => {
    const anchor = document.getElementById('kostenrechner');
    if (anchor) anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const renderStep = () => {
    stepPanels.forEach((panel) => {
      const panelStep = Number(panel.dataset.step || 1);
      panel.hidden = panelStep !== state.step;
    });
    stepDots.forEach((dot, idx) => {
      dot.classList.toggle('calc-step-dot--active', idx + 1 === state.step);
    });
    backBtn.hidden = state.step === 1;
    nextBtn.hidden = state.step === 4;
    nextBtn.textContent = state.step === 3 ? 'Berechnen' : 'Weiter';
    if (resetBtn) resetBtn.hidden = state.step !== 4;
    highlightChoices();
    syncHiddenFields();
    if (state.step !== 2) setStep2Error(false);
  };

  const validateStep = () => {
    if (state.step !== 2) return true;
    const areaInput = form.querySelector('input[name="area"]');
    const area = Number(areaInput?.value || 0);
    const valid = area >= 1 && Boolean(state.materialClass);
    setStep2Error(!valid);
    return valid;
  };

  projectChoices.forEach((choice) => {
    choice.addEventListener('click', () => {
      const value = choice.dataset.value;
      if (!value) return;
      state.projectType = value;
      highlightChoices();
      window.setTimeout(() => {
        if (state.step === 1) {
          state.step = 2;
          renderStep();
          scrollToCalc();
        }
      }, 180);
    });
  });

  materialChoices.forEach((choice) => {
    choice.addEventListener('click', () => {
      const value = choice.dataset.value;
      if (!value) return;
      state.materialClass = value;
      highlightChoices();
      setStep2Error(false);
    });
  });

  extraChoices.forEach((choice) => {
    choice.addEventListener('click', () => {
      const id = choice.dataset.extra;
      if (!id) return;
      const idx = state.extras.indexOf(id);
      if (idx === -1) state.extras.push(id);
      else state.extras.splice(idx, 1);
      highlightChoices();
    });
  });

  nextBtn.addEventListener('click', () => {
    if (!validateStep()) return;
    if (state.step === 3) {
      form.requestSubmit();
      return;
    }
    state.step = Math.min(3, state.step + 1);
    renderStep();
    scrollToCalc();
  });

  backBtn.addEventListener('click', () => {
    state.step = Math.max(1, state.step - 1);
    renderStep();
    scrollToCalc();
  });

  const buildPayload = () => {
    const formData = new FormData(form);
    const data = {
      area: formData.get('area'),
      projectType: state.projectType,
      materialClass: state.materialClass
    };
    CONFIG.extras.forEach((extra) => {
      data[extra.id] = state.extras.includes(extra.id);
    });
    return data;
  };

  const showResult = () => {
    if (pdfBtn) pdfBtn.disabled = false;
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateStep()) return;

    const result = calculate(buildPayload());
    breakdown.innerHTML = result.lineItems.join('');
    total.textContent = `${euro(result.sumMin)} – ${euro(result.sumMax)}`;
    if (summaryText) summaryText.textContent = result.summary;

    resultWrap.hidden = false;
    state.step = 4;
    renderStep();
    scrollToCalc();

    window.lastCalculation = {
      ...result,
      generatedAt: new Date().toISOString()
    };

    resetCallbackForm();
    showResult();
  });

  const resetCalculator = () => {
    state.step = 1;
    state.projectType = 'bath';
    state.materialClass = 'standard';
    state.extras = [];
    const areaInput = form.querySelector('input[name="area"]');
    if (areaInput) areaInput.value = '12';
    resultWrap.hidden = true;
    setStep2Error(false);
    resetCallbackForm();
    renderStep();
    scrollToCalc();
  };

  if (resetBtn) resetBtn.addEventListener('click', resetCalculator);

  if (callbackForm) {
    callbackForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitButton = document.getElementById('calcCallbackSubmitBtn');
      const originalBtnText = submitButton ? submitButton.textContent : '';
      const phoneRaw = callbackForm.querySelector('input[name="phone"]')?.value || '';
      const phoneDigits = phoneRaw.replace(/\D/g, '');
      const dsgvoChecked = callbackForm.querySelector('input[name="dsgvo_consent"]')?.checked;

      if (phoneDigits.length < 6) {
        if (callbackResult) {
          callbackResult.hidden = false;
          callbackResult.textContent = 'Bitte geben Sie eine gültige Telefonnummer für den Rückruf an.';
          callbackResult.className = 'calc-callback-result calc-callback-result--error';
        }
        return;
      }

      if (!dsgvoChecked) {
        if (callbackResult) {
          callbackResult.hidden = false;
          callbackResult.textContent = 'Bitte bestätigen Sie die Datenschutz-Einwilligung.';
          callbackResult.className = 'calc-callback-result calc-callback-result--error';
        }
        return;
      }

      const honeypot = callbackForm.querySelector('input[name="website"]')?.value;
      if (honeypot) {
        if (callbackResult) {
          callbackResult.hidden = false;
          callbackResult.textContent = 'Vielen Dank – wir melden uns in Kürze bei Ihnen.';
          callbackResult.className = 'calc-callback-result calc-callback-result--success';
        }
        return;
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Wird gesendet …';
      }

      const leadData = new FormData(callbackForm);
      const calcDetails = window.lastCalculation;

      if (callbackSubject) {
        const priceHint = calcDetails ? `${euro(calcDetails.sumMin)} – ${euro(calcDetails.sumMax)}` : '';
        callbackSubject.value = `RÜCKRUF Kostenrechner – ${phoneRaw.trim()}${priceHint ? ` – ${priceHint}` : ''}`;
        leadData.set('subject', callbackSubject.value);
      }

      leadData.set('Telefon', phoneRaw.trim());

      if (calcDetails) {
        const messageBody = [
          `Telefon: ${phoneRaw.trim()}`,
          `Zusammenfassung: ${calcDetails.summary}`,
          `Preisspanne: ${euro(calcDetails.sumMin)} – ${euro(calcDetails.sumMax)}`,
          `Projekt: ${calcDetails.projectLabel}`,
          `Material: ${calcDetails.materialLabel}`,
          `Fläche: ${calcDetails.area} m²`
        ].join('\n');
        leadData.set('message', messageBody);
        leadData.append('Fläche_m2', calcDetails.area);
        leadData.append('Projekt_Art', calcDetails.projectLabel);
        leadData.append('Material', calcDetails.materialLabel);
        leadData.append('Zusammenfassung', calcDetails.summary);
        leadData.append('Preisspanne_Min', euro(calcDetails.sumMin));
        leadData.append('Preisspanne_Max', euro(calcDetails.sumMax));
        leadData.append('Preisspanne_Mittel', euro(calcDetails.sumAvg));
      }

      let success = false;
      let errorMessage = '';
      try {
        const response = await fetch(callbackForm.action, {
          method: callbackForm.method,
          body: leadData,
          headers: { Accept: 'application/json' }
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(data?.message || 'Anfrage konnte nicht gesendet werden.');
        }
        if (!data?.success) {
          throw new Error(data?.message || 'Anfrage konnte nicht gesendet werden.');
        }
        success = true;
      } catch (err) {
        console.error('Callback submission failed', err);
        errorMessage = err?.message || 'Unbekannter Fehler';
      }

      if (callbackResult) {
        callbackResult.hidden = false;
        if (success) {
          callbackResult.textContent =
            `Vielen Dank! Ihre Rückruf-Anfrage ist eingegangen – ${_C.nameKurz || 'Wir melden uns'} in der Regel innerhalb von 24 Stunden.`;
          callbackResult.className = 'calc-callback-result calc-callback-result--success';
          callbackForm.querySelectorAll('input, button').forEach((el) => {
            el.disabled = true;
          });
        } else {
          callbackResult.textContent = errorMessage
            ? `Fehler: ${errorMessage} – Alternativ: ${_C.telefonDisplay || ''}`
            : `Die Anfrage konnte gerade nicht gesendet werden. Bitte rufen Sie uns an: ${_C.telefonDisplay || ''}.`;
          callbackResult.className = 'calc-callback-result calc-callback-result--error';
          if (submitButton) submitButton.disabled = false;
        }
      }

      if (submitButton && !success) submitButton.textContent = originalBtnText;
      else if (submitButton && success) submitButton.textContent = 'Anfrage gesendet';
    });
  }

  renderStep();
})();
