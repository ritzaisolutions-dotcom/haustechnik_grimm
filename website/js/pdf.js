(() => {
  'use strict';

  const pdfBtn = document.getElementById('calcPdfBtn');
  const exportHost = document.getElementById('pdfExportHost');
  if (!pdfBtn || !exportHost) return;

  const TEMPLATE_URL = 'templates/pdf-kalkulation.html';
  let templateCache = null;

  const cfg = (key, fallback = '') => {
    if (typeof CLIENT === 'undefined') return fallback;
    const value = CLIENT[key];
    if (value == null || value === '') return fallback;
    if (typeof value === 'string' && value.startsWith('[')) return fallback;
    return value;
  };

  const euro = (value) =>
    new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);

  const escapeHtml = (text) =>
    String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  const formatDateTime = (iso) =>
    new Date(iso).toLocaleString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

  const formatDateShort = (iso) =>
    new Date(iso).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

  const parseLineItems = (lineItems) => {
    const wrapper = document.createElement('ul');
    wrapper.innerHTML = lineItems.join('');
    return [...wrapper.querySelectorAll('li')].map((item) => ({
      label: item.querySelector('.calc-breakdown-label')?.textContent?.trim() || '',
      price: item.querySelector('.calc-breakdown-price')?.textContent?.trim() || ''
    }));
  };

  const buildLineItemRows = (lineItems) =>
    parseLineItems(lineItems)
      .map(
        (row) =>
          `<tr><td>${escapeHtml(row.label)}</td><td>${escapeHtml(row.price)}</td></tr>`
      )
      .join('');

  const loadTemplate = async () => {
    if (templateCache) return templateCache;
    const response = await fetch(TEMPLATE_URL, { cache: 'force-cache' });
    if (!response.ok) throw new Error(`PDF-Template nicht geladen (${response.status})`);
    templateCache = await response.text();
    return templateCache;
  };

  const preloadLogo = (src) =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });

  const fillTemplate = (template, data) =>
    Object.entries(data).reduce(
      (html, [key, value]) => html.replaceAll(`{{${key}}}`, value),
      template
    );

  const buildPdfHtml = async (calc) => {
    const template = await loadTemplate();
    const logoSrc = new URL('images/logo-client.png', window.location.href).href;
    const logoOk = await preloadLogo(logoSrc);

    const clientName = cfg('name', 'Handwerker');
    const ort = cfg('ort', '');
    const handwerk = cfg('handwerksbezeichnung', cfg('berufsbezeichnung', 'Meisterbetrieb'));
    const telefon = cfg('telefonDisplay', cfg('telefon', ''));
    const email = cfg('email', '');
    const strasse = cfg('strasse', '');
    const plz = cfg('plz', '');
    const domain = cfg('domain', window.location.origin).replace(/\/$/, '');

    const adresse = [strasse, `${plz} ${ort}`.trim()].filter(Boolean).join(', ') || '—';

    return fillTemplate(template, {
      LOGO_SRC: logoSrc,
      LOGO_HIDDEN_CLASS: logoOk ? '' : 'pdf-doc__logo--hidden',
      CLIENT_NAME: escapeHtml(clientName),
      HANDWERKSBEZEICHNUNG: escapeHtml(handwerk),
      ORT: escapeHtml(ort || '—'),
      DATUM: escapeHtml(formatDateTime(calc.generatedAt)),
      DATUM_KURZ: escapeHtml(formatDateShort(calc.generatedAt)),
      SUMMARY: escapeHtml(calc.summary || ''),
      PROJECT_LABEL: escapeHtml(calc.projectLabel || '—'),
      MATERIAL_LABEL: escapeHtml(calc.materialLabel || '—'),
      AREA: escapeHtml(String(calc.area)),
      LINE_ITEMS_ROWS: buildLineItemRows(calc.lineItems),
      TOTAL_RANGE: escapeHtml(`${euro(calc.sumMin)} – ${euro(calc.sumMax)}`),
      TOTAL_AVG: escapeHtml(euro(calc.sumAvg)),
      TELEFON: escapeHtml(telefon || '—'),
      EMAIL: escapeHtml(email || '—'),
      ADRESSE: escapeHtml(adresse),
      DOMAIN: escapeHtml(domain.replace(/^https?:\/\//, ''))
    });
  };

  const ensureHtml2Pdf = () => {
    if (typeof html2pdf !== 'undefined') return Promise.resolve();
    return new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-pdf-lib="html2pdf"]');
      if (existing) {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new Error('html2pdf konnte nicht geladen werden')), {
          once: true
        });
        return;
      }

      const script = document.createElement('script');
      script.src =
        'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.2/html2pdf.bundle.min.js';
      script.defer = true;
      script.dataset.pdfLib = 'html2pdf';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('html2pdf konnte nicht geladen werden'));
      document.head.appendChild(script);
    });
  };

  const generatePdf = async (calc) => {
    await ensureHtml2Pdf();

    const pdfSlug =
      cfg('pdfSlug', 'kalkulation') || 'kalkulation';

    exportHost.innerHTML = await buildPdfHtml(calc);
    const doc = exportHost.querySelector('.pdf-doc');
    if (!doc) throw new Error('PDF-Dokument konnte nicht erstellt werden');

    await html2pdf()
      .set({
        margin: [0, 0, 0, 0],
        filename: `${pdfSlug}.pdf`,
        image: { type: 'jpeg', quality: 0.96 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      })
      .from(doc)
      .save();

    exportHost.innerHTML = '';
  };

  pdfBtn.addEventListener('click', async () => {
    const calc = window.lastCalculation;
    if (!calc) return;

    const originalLabel = pdfBtn.textContent;
    pdfBtn.disabled = true;
    pdfBtn.textContent = 'PDF wird erstellt …';

    try {
      await generatePdf(calc);
    } catch (err) {
      console.error('PDF export failed', err);
      window.alert(
        'Das PDF konnte gerade nicht erstellt werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.'
      );
    } finally {
      pdfBtn.disabled = false;
      pdfBtn.textContent = originalLabel;
    }
  });
})();
