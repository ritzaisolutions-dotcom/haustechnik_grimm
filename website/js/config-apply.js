(() => {
  'use strict';

  if (typeof CLIENT === 'undefined') {
    console.warn('[Template] config.js fehlt oder CLIENT ist nicht definiert.');
    return;
  }

  // Hilfsfunktion: setzt textContent oder Attribut, überspringt Platzhalter
  const set = (selector, value, attr) => {
    if (value === undefined || value === null || String(value).startsWith('[')) return;
    if (value === '') return;
    document.querySelectorAll(selector).forEach(el => {
      if (attr) el.setAttribute(attr, value);
      else el.textContent = value;
    });
  };

  const init = () => {
    // ── 1. DOCUMENT TITLE ──────────────────────────────────
    const pageTitle = document.querySelector('title');
    if (pageTitle && CLIENT.name && !CLIENT.name.startsWith('[')) {
      pageTitle.textContent = pageTitle.textContent
        .replace(/\[HANDWERKSBEZEICHNUNG\]/g, CLIENT.handwerksbezeichnung)
        .replace(/\[ORT\]/g, CLIENT.ort)
        .replace(/\[FIRMENNAME\]/g, CLIENT.name)
        .replace(/\[UNTERNEHMENSTYP\]/g, CLIENT.unternehmenstyp);
    }

    // ── 2. META TAGS ───────────────────────────────────────
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = metaDesc.content
        .replace(/\[FIRMENNAME\]/g, CLIENT.name)
        .replace(/\[ORT\]/g, CLIENT.ort)
        .replace(/\[HANDWERKSBEZEICHNUNG\]/g, CLIENT.handwerksbezeichnung)
        .replace(/\[BERUFSBEZEICHNUNG\]/g, CLIENT.berufsbezeichnung)
        .replace(/\[LEISTUNGEN_KURZ\]/g, CLIENT.leistungenKurz || '');
    }
    const setMeta = (selector, value) => {
      if (!value || String(value).startsWith('[')) return;
      const el = document.querySelector(selector);
      if (el) el.setAttribute('content', value);
    };
    setMeta('meta[property="og:title"]',       CLIENT.name);
    setMeta('meta[property="og:site_name"]',    CLIENT.name);
    setMeta('meta[property="og:url"]',          CLIENT.domain + '/');
    setMeta('meta[property="og:image"]',        CLIENT.domain + '/images/og-image.jpg');
    setMeta('meta[name="twitter:title"]',       CLIENT.name);
    setMeta('meta[name="twitter:image"]',       CLIENT.domain + '/images/og-image.jpg');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && CLIENT.domain && !CLIENT.domain.startsWith('[')) {
      canonical.href = CLIENT.domain + '/';
    }

    // ── 3. data-config → textContent ──────────────────────
    document.querySelectorAll('[data-config]').forEach(el => {
      const key = el.dataset.config;
      const val = key.split('.').reduce((o, k) => o?.[k], CLIENT);
      if (val !== undefined && val !== null && !String(val).startsWith('[') && String(val) !== '') {
        el.textContent = val;
      }
    });

    // ── 4. data-config-href → href ─────────────────────────
    document.querySelectorAll('[data-config-href]').forEach(el => {
      const key = el.dataset.configHref;
      let val = '';
      switch (key) {
        case 'tel':              val = `tel:${CLIENT.telefon}`; break;
        case 'mailto':           val = `mailto:${CLIENT.email}`; break;
        case 'calcom':           val = CLIENT.calcomLink; break;
        case 'facebook':         val = CLIENT.facebook; break;
        case 'instagram':        val = CLIENT.instagram; break;
        case 'googleBewertung':  val = CLIENT.googleBewertungsLink; break;
        case 'aufsichtsbehoerde': val = CLIENT.aufsichtsbehoerdeUrl; break;
        // WhatsApp wird separat in Sektion 18 behandelt (URL-Konstruktion nötig)
      }
      if (val && !String(val).includes('[') && String(val) !== '') el.href = val;
    });

    // ── 5. data-config-alt → alt attribute ────────────────
    document.querySelectorAll('[data-config-alt]').forEach(el => {
      const val = `${CLIENT.name} ${CLIENT.unternehmenstyp}`;
      if (!val.includes('[')) el.alt = val;
    });

    // ── 6. NAV WORDMARK ────────────────────────────────────
    set('.nav__wordmark-name',    CLIENT.nameKurz || CLIENT.name.split(' ')[0]);
    set('.footer__wordmark-name', CLIENT.nameKurz || CLIENT.name.split(' ')[0]);

    // ── 7. SOCIAL LINKS ────────────────────────────────────
    if (!CLIENT.facebook) {
      document.querySelectorAll('a[data-config-href="facebook"]').forEach(el => {
        el.closest('div, li')?.style.setProperty('display', 'none');
      });
    }
    if (!CLIENT.instagram) {
      document.querySelectorAll('a[data-config-href="instagram"]').forEach(el => {
        el.closest('div, li')?.style.setProperty('display', 'none');
      });
    }

    // ── 8. WEB3FORMS ACCESS KEYS ──────────────────────────
    if (CLIENT.web3formsKey && !CLIENT.web3formsKey.startsWith('[')) {
      document.querySelectorAll('input[name="access_key"]').forEach(el => {
        el.value = CLIENT.web3formsKey;
      });
    }

    // ── 9. KLARO STORAGE NAME ─────────────────────────────
    if (window.klaroConfig && CLIENT.klaroStorageName) {
      window.klaroConfig.storageName = CLIENT.klaroStorageName;
    }

    // ── 10. GOOGLE MAPS EMBED ────────────────────────────
    const mapContainer = document.getElementById('realMapContainer');
    if (mapContainer) {
      if (CLIENT.googleMapsEmbedUrl && !CLIENT.googleMapsEmbedUrl.startsWith('[')) {
        mapContainer.dataset.mapsUrl = CLIENT.googleMapsEmbedUrl;
      }
      if (CLIENT.name && !CLIENT.name.startsWith('[')) {
        mapContainer.dataset.mapsTitle = `Standort ${CLIENT.name} – ${CLIENT.strasse}, ${CLIENT.plz} ${CLIENT.ort}`;
      }
    }

    // ── 11. ÖFFNUNGSZEITEN ────────────────────────────────
    const oz = CLIENT.oeffnungszeiten;
    set('[data-config="oeffMoDoBis"]', `${oz.moDoVon} – ${oz.moDoBis} Uhr`);
    set('[data-config="oeffFrBis"]',   `${oz.frVon} – ${oz.frBis} Uhr`);

    // ── 12. ÖFFNUNGSZEITEN KURZTEXT ───────────────────────
    document.querySelectorAll('[data-config="oeffZeitenKurz"]').forEach(el => {
      el.textContent = `Mo–Do ${oz.moDoVon}–${oz.moDoBis} Uhr, Fr ${oz.frVon}–${oz.frBis} Uhr`;
    });

    // ── 13. FOOTER COPYRIGHT ──────────────────────────────
    document.querySelectorAll('[data-config="copyright"]').forEach(el => {
      el.textContent = `© ${new Date().getFullYear()} ${CLIENT.name}, ${CLIENT.ort}`;
    });

    // ── 14. SCHEMA.ORG JSON-LD ───────────────────────────
    const existingLd = document.querySelector('script[type="application/ld+json"]');
    if (existingLd && CLIENT.name && !CLIENT.name.startsWith('[')) {
      const schema = {
        "@context": "https://schema.org",
        "@type": CLIENT.branche,
        "name": CLIENT.name,
        "telephone": CLIENT.telefon,
        "email": CLIENT.email,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": CLIENT.strasse,
          "postalCode": CLIENT.plz,
          "addressLocality": CLIENT.ort,
          "addressCountry": "DE"
        },
        "url": CLIENT.domain + '/',
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday"],
            "opens": CLIENT.oeffnungszeiten.moDoVon,
            "closes": CLIENT.oeffnungszeiten.moDoBis
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Friday",
            "opens": CLIENT.oeffnungszeiten.frVon,
            "closes": CLIENT.oeffnungszeiten.frBis
          }
        ]
      };
      if (CLIENT.geoLat && !CLIENT.geoLat.startsWith('[')) {
        schema.geo = { "@type": "GeoCoordinates", "latitude": CLIENT.geoLat, "longitude": CLIENT.geoLng };
      }
      existingLd.textContent = JSON.stringify(schema, null, 2);
    }

    // ── 15. CALC: Preise-Labels ───────────────────────────
    const priceSpans = {
      'standard': document.querySelector('[data-field="materialClass"][data-value="standard"] .calc-choice__desc'),
      'premium':  document.querySelector('[data-field="materialClass"][data-value="premium"] .calc-choice__desc'),
      'xl':       document.querySelector('[data-field="materialClass"][data-value="xl"] .calc-choice__desc')
    };
    CLIENT.calcMaterialien.forEach(mat => {
      if (priceSpans[mat.id] && !mat.desc.startsWith('[')) {
        priceSpans[mat.id].textContent = mat.desc;
      }
    });
    const extraSpans = {
      'debris':        document.querySelector('[data-extra="debris"] .calc-choice__desc'),
      'waterproofing': document.querySelector('[data-extra="waterproofing"] .calc-choice__desc'),
      'floorHeating':  document.querySelector('[data-extra="floorHeating"] .calc-choice__desc')
    };
    CLIENT.calcExtras.forEach(ex => {
      if (extraSpans[ex.id] && !ex.desc.startsWith('[')) {
        extraSpans[ex.id].textContent = ex.desc;
      }
    });
    const projTitleSpans = {
      'bath':    document.querySelector('[data-value="bath"] .calc-choice__title'),
      'floor':   document.querySelector('[data-value="floor"] .calc-choice__title'),
      'terrace': document.querySelector('[data-value="terrace"] .calc-choice__title'),
      'repair':  document.querySelector('[data-value="repair"] .calc-choice__title')
    };
    CLIENT.calcProjekte.forEach(proj => {
      if (projTitleSpans[proj.id] && !proj.label.startsWith('[')) {
        projTitleSpans[proj.id].textContent = proj.label;
      }
    });
    const matTitleSpans = {
      'standard': document.querySelector('[data-value="standard"] .calc-choice__title'),
      'premium':  document.querySelector('[data-value="premium"] .calc-choice__title'),
      'xl':       document.querySelector('[data-value="xl"] .calc-choice__title')
    };
    CLIENT.calcMaterialien.forEach(mat => {
      if (matTitleSpans[mat.id] && !mat.label.startsWith('[')) {
        matTitleSpans[mat.id].textContent = mat.label;
      }
    });
    const extraTitleSpans = {
      'debris':        document.querySelector('[data-extra="debris"] .calc-choice__title'),
      'waterproofing': document.querySelector('[data-extra="waterproofing"] .calc-choice__title'),
      'floorHeating':  document.querySelector('[data-extra="floorHeating"] .calc-choice__title')
    };
    CLIENT.calcExtras.forEach(ex => {
      if (extraTitleSpans[ex.id] && !ex.label.startsWith('[')) {
        extraTitleSpans[ex.id].textContent = ex.label;
      }
    });

    // ── 16. CALC RÜCKRUF BETREFF ──────────────────────────
    const callbackSubject = document.getElementById('calcCallbackSubject');
    if (callbackSubject && CLIENT.name && !CLIENT.name.startsWith('[')) {
      callbackSubject.value = `RÜCKRUF Kostenrechner: ${CLIENT.name}`;
    }

    // ═══════════════════════════════════════════════════════
    //  NEUE SEKTIONEN (Template-Erweiterung)
    // ═══════════════════════════════════════════════════════

    // ── 17. FARBEN (CSS Custom Properties) ────────────────
    // Überschreibt variables.css-Defaults mit Kundenwerten aus config.js
    if (CLIENT.colors) {
      const root = document.documentElement;
      const c    = CLIENT.colors;
      const applyColor = (prop, val) => {
        if (val && !val.startsWith('[') && val.trim() !== '') {
          root.style.setProperty(prop, val.trim());
        }
      };
      applyColor('--primary',       c.primary);
      applyColor('--primary-dark',  c.primaryDark);
      applyColor('--primary-mid',   c.primaryMid);
      applyColor('--primary-light', c.primaryLight);
      applyColor('--accent',        c.accent);
      applyColor('--accent-hover',  c.accentHover);
      applyColor('--accent-light',  c.accentLight);
    }

    // ── 18. WHATSAPP FAB & ALLE WA-LINKS ──────────────────
    const buildWaHref = (msg) => {
      if (!CLIENT.whatsapp || CLIENT.whatsapp.startsWith('[') || CLIENT.whatsapp.trim() === '') return null;
      const num  = CLIENT.whatsapp.replace(/[^0-9+]/g, '');
      const text = encodeURIComponent(msg || CLIENT.whatsappVornachricht || 'Hallo, ich interessiere mich für Ihre Leistungen.');
      return `https://wa.me/${num}?text=${text}`;
    };

    const waHref = buildWaHref();
    const waFab  = document.getElementById('waFab');
    if (waFab) {
      if (waHref) {
        waFab.href = waHref;
        waFab.removeAttribute('hidden');
      } else {
        waFab.setAttribute('hidden', '');
      }
    }

    // Alle data-config-href="whatsapp" Elemente + deren Wrapper
    document.querySelectorAll('[data-config-href="whatsapp"]').forEach(el => {
      if (waHref) {
        el.href = waHref;
        el.removeAttribute('hidden');
        const wrapper = el.closest('[data-wa-wrap]');
        if (wrapper) wrapper.removeAttribute('hidden');
      } else {
        el.setAttribute('hidden', '');
        const wrapper = el.closest('[data-wa-wrap]');
        if (wrapper) wrapper.setAttribute('hidden', '');
      }
    });

    // ── 19. TERMIN VARIANTE ───────────────────────────────
    const terminVariante = CLIENT.terminVariante || 'calcom';
    document.querySelectorAll('[data-termin]').forEach(el => {
      if (el.dataset.termin === terminVariante) {
        el.removeAttribute('hidden');
      } else {
        el.setAttribute('hidden', '');
      }
    });

    // WhatsApp-Variante: WA-Href in den Termin-Button setzen
    if (terminVariante === 'whatsapp') {
      const terminWaMsg = encodeURIComponent('Hallo, ich möchte gerne einen Termin vereinbaren.');
      const waTerminHref = buildWaHref('Hallo, ich möchte gerne einen Termin vereinbaren.');
      const terminWaBtn = document.getElementById('terminWaBtn');
      if (terminWaBtn && waTerminHref) {
        terminWaBtn.href = waTerminHref;
      }
    }

    // Formular-Variante: min-Datum auf heute setzen
    const terminDateInput = document.getElementById('termin_date');
    if (terminDateInput) {
      terminDateInput.min = new Date().toISOString().split('T')[0];
    }

    // ── 20. ÜBER-UNS TEXT ────────────────────────────────
    const ueberUnsBody = document.getElementById('ueberUnsBody');
    if (ueberUnsBody && Array.isArray(CLIENT.ueberUns) && CLIENT.ueberUns.length) {
      const paras = CLIENT.ueberUns.filter(p => p && !p.startsWith('['));
      if (paras.length > 0) {
        ueberUnsBody.innerHTML = paras.map(p => `<p>${p}</p>`).join('\n');
      }
    }

    // ── 21. DOK-BILDER ────────────────────────────────────
    [
      { id: 'dokBild1', field: 'dokBild1' },
      { id: 'dokBild2', field: 'dokBild2' },
      { id: 'dokBild3', field: 'dokBild3' }
    ].forEach(({ id, field }) => {
      const wrap = document.getElementById(id);
      if (!wrap) return;
      const val = CLIENT[field];
      // Leerer String → Bild ausblenden
      if (val === '' || val === null || val === undefined) {
        wrap.hidden = true;
        return;
      }
      // Platzhalter → unverändert lassen
      if (String(val).startsWith('[')) return;
      const img    = wrap.querySelector('img');
      const source = wrap.querySelector('source');
      if (img)    img.src       = `images/${val}.jpg`;
      if (source) source.srcset = `images/${val}.webp`;
      if (img && CLIENT.name && !CLIENT.name.startsWith('[')) {
        img.alt = `Zertifikat / Dokument – ${CLIENT.name}`;
      }
    });

    // ── 22. KONTAKT ANLIEGEN SELECT ──────────────────────
    const anliegenSelect = document.getElementById('anfrageart');
    if (anliegenSelect && Array.isArray(CLIENT.kontaktAnliegen) && CLIENT.kontaktAnliegen.length) {
      anliegenSelect.innerHTML = '<option value="">Bitte auswählen</option>';
      CLIENT.kontaktAnliegen.forEach(item => {
        if (item.label && !item.label.startsWith('[')) {
          const opt = document.createElement('option');
          opt.value       = item.value || '';
          opt.textContent = item.label;
          anliegenSelect.appendChild(opt);
        }
      });
    }

    // ── 23. KONTAKTFORMULAR AKTIV ────────────────────────
    if (CLIENT.kontaktformularAktiv === false) {
      const form = document.getElementById('kontaktForm');
      if (form) form.hidden = true;
    }

    // ── 24. KOSTENRECHNER AKTIV ──────────────────────────
    if (CLIENT.kostenrechnerAktiv === false) {
      const calcSection = document.getElementById('kostenrechner');
      if (calcSection) calcSection.hidden = true;
      // Navigationseinträge ausblenden (Desktop + Mobile)
      document.querySelectorAll('[data-nav-calc]').forEach(el => {
        el.setAttribute('hidden', '');
      });
    }

    // ── 25. DATENSCHUTZ: terminVariante-bedingte Listeneinträge
    document.querySelectorAll('[data-datenschutz-termin]').forEach(el => {
      if (el.dataset.datenschutzTermin === terminVariante) {
        el.removeAttribute('hidden');
      } else {
        el.setAttribute('hidden', '');
      }
    });

    // ── 26. DATENSCHUTZ: aufsichtsbehoerde Direktlink ────
    // Hinweis: href wird bereits durch Sektion 4 (data-config-href="aufsichtsbehoerde") gesetzt.
    // Textinhalt wird durch Sektion 3 (data-config="aufsichtsbehoerde") auf dem Kind-Element gesetzt.
    // Diese Sektion dient als Sicherheitsnetz für Seiten, die nur das <a> ohne Span nutzen.
    document.querySelectorAll('[data-config-href="aufsichtsbehoerde"]').forEach(el => {
      if (CLIENT.aufsichtsbehoerdeUrl && !CLIENT.aufsichtsbehoerdeUrl.startsWith('[')) {
        el.href = CLIENT.aufsichtsbehoerdeUrl;
      }
      // textContent nur setzen wenn kein data-config-Kind-Element vorhanden ist
      if (!el.querySelector('[data-config]') && CLIENT.aufsichtsbehoerde && !CLIENT.aufsichtsbehoerde.startsWith('[')) {
        el.textContent = CLIENT.aufsichtsbehoerde;
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
