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

  const getNavContext = () => {
    const path = window.location.pathname.replace(/\\/g, '/');
    const inLeistungen = path.includes('/leistungen/');
    const base = inLeistungen ? '../' : '';
    const file = path.split('/').pop() || '';
    const isHome = !inLeistungen && (file === '' || file === 'index.html');
    const pageLink = (anchor) => (isHome ? `#${anchor}` : `${base}index.html#${anchor}`);
    const pathLink = (relPath) => {
      if (inLeistungen && relPath.startsWith('leistungen/')) {
        return relPath.replace('leistungen/', '');
      }
      return `${base}${relPath}`;
    };
    return { base, inLeistungen, isHome, pageLink, pathLink };
  };

  const resolveNavHref = (item, ctx) => {
    if (item.hrefKey === 'tel' && CLIENT.telefon) return `tel:${CLIENT.telefon}`;
    if (item.hrefKey === 'mailto' && CLIENT.email) return `mailto:${CLIENT.email}`;
    if (item.hrefKey === 'whatsapp' && CLIENT.whatsapp) {
      const num = CLIENT.whatsapp.replace(/[^0-9+]/g, '');
      const text = encodeURIComponent(CLIENT.whatsappVornachricht || '');
      return `https://wa.me/${num}?text=${text}`;
    }
    if (item.anchor) return ctx.pageLink(item.anchor);
    if (item.path) return ctx.pathLink(item.path);
    return '#';
  };

  const renderSiteNav = () => {
    const desktopHost = document.querySelector('[data-nav-desktop]');
    const mobileHost = document.querySelector('[data-nav-mobile]');
    if (!desktopHost && !mobileHost) return;

    const ctx = getNavContext();
    const leistungen = Array.isArray(CLIENT.navLeistungen) ? CLIENT.navLeistungen : [];
    const kontakt = Array.isArray(CLIENT.navKontakt) ? CLIENT.navKontakt : [];
    const calcHidden = CLIENT.kostenrechnerAktiv === false ? ' hidden' : '';
    const calcAttr = CLIENT.kostenrechnerAktiv === false ? '' : ' data-nav-calc';

    if (desktopHost) {
      const leistungenItems = leistungen.map((item) => {
        const href = ctx.pathLink(item.path);
        return `<li><a href="${href}">${item.label}</a></li>`;
      }).join('');

      const kontaktItems = kontakt.map((item) => {
        const href = resolveNavHref(item, ctx);
        const target = item.hrefKey === 'whatsapp' ? ' target="_blank" rel="noopener noreferrer"' : '';
        return `<li><a href="${href}"${target}>${item.label}</a></li>`;
      }).join('');

      desktopHost.innerHTML = `
        <li class="nav__item nav__item--has-menu">
          <button type="button" class="nav__menu-trigger" aria-expanded="false" aria-haspopup="true">Leistungen</button>
          <ul class="nav__dropdown" role="menu">${leistungenItems}</ul>
        </li>
        <li${calcAttr}><a href="${ctx.pageLink('kostenrechner')}">Kostenrechner</a></li>
        <li><a href="${ctx.pathLink('referenzen.html')}">Referenzen</a></li>
        <li><a href="${ctx.pathLink('team.html')}">Team</a></li>
        <li><a href="${ctx.pageLink('familie')}">Über uns</a></li>
        <li class="nav__item nav__item--has-menu">
          <button type="button" class="nav__menu-trigger" aria-expanded="false" aria-haspopup="true">Kontakt</button>
          <ul class="nav__dropdown" role="menu">${kontaktItems}</ul>
        </li>`;
    }

    if (mobileHost) {
      const leistungenMobile = leistungen.map((item) => {
        const href = ctx.pathLink(item.path);
        return `<a href="${href}" class="nav__mobile-link">${item.label}</a>`;
      }).join('');

      const navMobile = `
        <a href="${ctx.pathLink('referenzen.html')}" class="nav__mobile-link">Referenzen</a>
        <a href="${ctx.pathLink('team.html')}" class="nav__mobile-link">Team</a>
        <a href="${ctx.pageLink('familie')}" class="nav__mobile-link">Über uns</a>
        <a href="${ctx.pageLink('kostenrechner')}" class="nav__mobile-link"${calcAttr}>Kostenrechner</a>`;

      const kontaktMobile = kontakt.map((item) => {
        const href = resolveNavHref(item, ctx);
        const target = item.hrefKey === 'whatsapp' ? ' target="_blank" rel="noopener noreferrer"' : '';
        return `<a href="${href}" class="nav__mobile-link nav__mobile-link--sub"${target}>${item.label}</a>`;
      }).join('');

      mobileHost.innerHTML = `
        <div class="nav__mobile-group">
          <span class="nav__mobile-group-title">Leistungen</span>
          ${leistungenMobile}
        </div>
        <div class="nav__mobile-group">
          <span class="nav__mobile-group-title">Navigation</span>
          ${navMobile}
        </div>
        <div class="nav__mobile-group">
          <span class="nav__mobile-group-title">Kontakt</span>
          ${kontaktMobile}
        </div>
        <a href="tel:${CLIENT.telefon}" class="btn btn--primary nav__mobile-cta" data-config-href="tel">Anrufen</a>
        <span class="nav__mobile-phone">
          <a href="tel:${CLIENT.telefon}" data-config-href="tel" data-config="telefonDisplay">${CLIENT.telefonDisplay || ''}</a>
        </span>`;
    }

    const navCta = document.querySelector('[data-nav-cta]');
    if (navCta && CLIENT.telefon) {
      navCta.href = `tel:${CLIENT.telefon}`;
      navCta.textContent = 'Anrufen';
    }

    const wordmark = document.querySelector('.nav__wordmark');
    if (wordmark) {
      wordmark.href = ctx.isHome ? '#hero' : `${ctx.base}index.html#hero`;
    }
  };

  const avatarColorClass = (initialen) => {
    const key = String(initialen || 'A').slice(0, 2).toUpperCase();
    const palette = ['avatar--cz', 'avatar--mm', 'avatar--ht', 'avatar--ma', 'avatar--mb'];
    let sum = 0;
    for (let i = 0; i < key.length; i += 1) sum += key.charCodeAt(i);
    return palette[sum % palette.length];
  };

  const renderGoogleReviews = () => {
    const track = document.getElementById('reviewsTrack');
    const carousel = document.getElementById('googleReviewsCarousel');
    if (!track || !Array.isArray(CLIENT.googleReviews)) return;

    const reviews = CLIENT.googleReviews.filter((r) => r && r.text && r.autor);
    if (!reviews.length) {
      if (carousel) carousel.setAttribute('hidden', '');
      return;
    }

    const profileLink = CLIENT.googleBewertungsLink && !String(CLIENT.googleBewertungsLink).startsWith('[')
      ? CLIENT.googleBewertungsLink
      : '';

    track.innerHTML = reviews.map((review) => {
      const stars = '★'.repeat(Math.min(5, Math.max(0, Number(review.sterne) || 5)));
      const initials = review.initialen || review.initial || (review.autor ? review.autor.charAt(0) : 'G');
      const avatarHtml = review.avatar
        ? `<img class="google-review-card__avatar-img" src="${review.avatar}" alt="" width="48" height="48" loading="lazy" decoding="async">`
        : `<span class="google-review-card__avatar ${avatarColorClass(initials)}" aria-hidden="true">${initials}</span>`;
      const moreLink = profileLink
        ? `<a class="google-review-card__more" href="${profileLink}" target="_blank" rel="noopener noreferrer">Mehr auf Google</a>`
        : '';
      return `
        <article class="google-review-card">
          <div class="google-review-card__header">
            ${avatarHtml}
            <div class="google-review-card__meta">
              <p class="google-review-card__author">${review.autor}</p>
              <span class="google-review-card__stars" aria-label="${review.sterne || 5} von 5 Sternen">${stars}</span>
              ${review.datum ? `<span class="google-review-card__date">${review.datum}</span>` : ''}
            </div>
          </div>
          <p class="google-review-card__text">${review.text}</p>
          ${moreLink}
        </article>`;
    }).join('\n');

    if (carousel) carousel.removeAttribute('hidden');
    document.dispatchEvent(new CustomEvent('grimm:reviews-ready'));
  };

  const init = () => {
    renderSiteNav();
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
    const seoTitle = CLIENT.seoTitle || CLIENT.name;
    setMeta('meta[property="og:title"]',       seoTitle);
    setMeta('meta[property="og:site_name"]',    CLIENT.name);
    setMeta('meta[property="og:url"]',          CLIENT.domain + '/');
    setMeta('meta[property="og:image"]',        CLIENT.domain + '/images/og-image.jpg');
    setMeta('meta[name="twitter:title"]',       seoTitle);
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

    // ── 10b. CAL.COM EMBED URL ─────────────────────────────
    const calEmbedContainer = document.getElementById('calEmbedContainer');
    if (calEmbedContainer && CLIENT.calcomLink && !CLIENT.calcomLink.startsWith('[')) {
      const base = CLIENT.calcomLink;
      const embedUrl = base.includes('?')
        ? `${base}&embed=true&theme=dark`
        : `${base}?embed=true&theme=dark`;
      calEmbedContainer.dataset.calEmbedUrl = embedUrl;
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

    const foerderungWaCta = document.getElementById('foerderungWaCta');
    const foerderungWaHref = buildWaHref(CLIENT.whatsappFoerderung || 'Ich möchte meine Fördermöglichkeiten prüfen lassen.');
    if (foerderungWaCta && foerderungWaHref) {
      foerderungWaCta.href = foerderungWaHref;
    }

    // ── 18b. BEWERTUNGS-PROOF (nur wenn vollständig konfiguriert) ───────
    const hasRatingProof = Boolean(
      CLIENT.googleBewertungsLink &&
      CLIENT.googleBewertungNote &&
      CLIENT.googleBewertungAnzahl &&
      !String(CLIENT.googleBewertungsLink).startsWith('[') &&
      !String(CLIENT.googleBewertungNote).startsWith('[') &&
      !String(CLIENT.googleBewertungAnzahl).startsWith('[')
    );
    document.querySelectorAll('[data-rating-proof]').forEach((el) => {
      if (hasRatingProof) {
        el.removeAttribute('hidden');
      } else {
        el.setAttribute('hidden', '');
      }
    });

    renderGoogleReviews();

    const reviewsProofCards = document.getElementById('reviewsProofCards');
    if (reviewsProofCards && Array.isArray(CLIENT.googleReviews) && CLIENT.googleReviews.length > 0) {
      reviewsProofCards.hidden = true;
    } else if (reviewsProofCards && Array.isArray(CLIENT.bewertungenCards) && CLIENT.bewertungenCards.length > 0) {
      const cards = CLIENT.bewertungenCards.filter((card) => {
        if (!card) return false;
        const title = String(card.titel || '');
        const text = String(card.text || '');
        return title && text && !title.startsWith('[') && !text.startsWith('[');
      });
      if (cards.length > 0) {
        reviewsProofCards.innerHTML = cards.map((card, idx) => `
          <article class="review-proof-card">
            <span class="review-proof-card__num">${String(idx + 1).padStart(2, '0')}</span>
            <h3>${card.titel}</h3>
            <p>${card.text}</p>
          </article>
        `).join('\n');
      }
    }

    // ── 19. TERMIN VARIANTE (Cal.com nur im Accordion auf Startseite) ──
    const terminVariante = CLIENT.terminVariante || 'calcom';
    document.querySelectorAll('[data-termin]').forEach(el => {
      if (el.closest('#termin-buchung')) return;
      if (el.dataset.termin === terminVariante) {
        el.removeAttribute('hidden');
      } else {
        el.setAttribute('hidden', '');
      }
    });
    const calAccordion = document.getElementById('termin-buchung');
    if (calAccordion && terminVariante === 'calcom' && CLIENT.calcomLink && !String(CLIENT.calcomLink).startsWith('[')) {
      calAccordion.removeAttribute('hidden');
    } else if (calAccordion && terminVariante !== 'calcom') {
      calAccordion.setAttribute('hidden', '');
    }

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
