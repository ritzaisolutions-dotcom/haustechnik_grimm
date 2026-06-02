(() => {
  'use strict';

  /* === NAV: Scrolled state ===
     Default: transparent over hero. After leaving hero: solid with depth.
     On subpages (no #hero element) the nav is solid from the first pixel.
  */
  const nav = document.getElementById('mainNav');
  if (nav) {
    const heroForNav = document.getElementById('hero');
    const computeNavThreshold = () => {
      if (!heroForNav) return 0;
      const heroHeight = heroForNav.offsetHeight || 0;
      // Switch to solid roughly when the user has scrolled past 80% of the hero.
      // This matches the hero fade timing so the nav lands cleanly on the next section.
      return Math.max(120, heroHeight * 0.8 - 60);
    };
    let navThreshold = computeNavThreshold();
    const onScroll = () => {
      nav.classList.toggle('nav--scrolled', window.scrollY > navThreshold);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      navThreshold = computeNavThreshold();
      onScroll();
    });
    onScroll();
  }

  /* === NAV: Mobile menu === */
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('navMobile');
  const mobileClose = document.getElementById('navMobileClose');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    });
    const closeMenu = () => {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    if (mobileClose) mobileClose.addEventListener('click', closeMenu);
    mobileMenu.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });
  }

  /* === SCROLL INDICATOR === */
  const scrollIndicator = document.getElementById('scrollIndicator');
  if (scrollIndicator) {
    const hideIndicator = () => {
      if (window.scrollY > 120) {
        scrollIndicator.classList.add('hidden');
        window.removeEventListener('scroll', hideIndicator);
      }
    };
    window.addEventListener('scroll', hideIndicator, { passive: true });
  }

  /* === NAV: Dropdowns (desktop touch + Escape) === */
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('.nav__menu-trigger');
    if (trigger) {
      event.preventDefault();
      const item = trigger.closest('.nav__item--has-menu');
      if (!item) return;
      const open = !item.classList.contains('nav__item--open');
      document.querySelectorAll('.nav__item--has-menu.nav__item--open').forEach((other) => {
        other.classList.remove('nav__item--open');
        const otherTrigger = other.querySelector('.nav__menu-trigger');
        if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
      });
      if (open) {
        item.classList.add('nav__item--open');
        trigger.setAttribute('aria-expanded', 'true');
      } else {
        item.classList.remove('nav__item--open');
        trigger.setAttribute('aria-expanded', 'false');
      }
      return;
    }
    if (!event.target.closest('.nav__item--has-menu')) {
      document.querySelectorAll('.nav__item--has-menu.nav__item--open').forEach((item) => {
        item.classList.remove('nav__item--open');
        const t = item.querySelector('.nav__menu-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    document.querySelectorAll('.nav__item--has-menu.nav__item--open').forEach((item) => {
      item.classList.remove('nav__item--open');
      const trigger = item.querySelector('.nav__menu-trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  });

  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      const navOffset = nav ? nav.offsetHeight + 10 : 84;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
      history.replaceState(null, '', targetId);
    });
  });

  const resolveAssetPath = (path) => {
    if (!path || /^https?:\/\//.test(path)) return [path];
    const normalized = path.replace(/^\.\.\//, '').replace(/^\.\//, '');
    const clean = normalized.replace(/^\/+/, '');
    return [
      path,
      `../${clean}`,
      `/${clean}`,
      `./${clean}`
    ].filter(Boolean);
  };

  const bindFallback = (el, getter, setter) => {
    const candidates = resolveAssetPath(getter(el));
    if (!candidates.length) return;
    let idx = 0;
    setter(el, candidates[idx]);
    el.addEventListener('error', () => {
      idx += 1;
      if (idx < candidates.length) {
        setter(el, candidates[idx]);
      }
    });
  };

  document.querySelectorAll('img[src]').forEach((img) => {
    bindFallback(img, (node) => node.getAttribute('src'), (node, value) => node.setAttribute('src', value));
  });

  const setupHeroVideo = () => {
    const video = document.getElementById('heroVideo');
    if (!video) return;

    const sourceNode = video.querySelector('source');
    if (!sourceNode) return;

    const candidateList = (video.dataset.videoCandidates || '')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .flatMap((item) => resolveAssetPath(item));
    const uniqueCandidates = [...new Set(candidateList)];
    if (!uniqueCandidates.length) return;

    let candidateIndex = 0;
    let settled = false;

    const markFallback = () => {
      video.classList.add('hero__bg-img--fallback');
      video.pause();
      video.removeAttribute('autoplay');
      video.removeAttribute('loop');
      video.removeAttribute('src');
      sourceNode.removeAttribute('src');
      video.load();
    };

    const settleReady = () => {
      if (settled) return;
      settled = true;
      video.classList.remove('hero__bg-img--fallback');
    };

    const attemptPlay = () => {
      const playAttempt = video.play();
      if (playAttempt && typeof playAttempt.catch === 'function') {
        playAttempt.catch(() => {});
      }
    };

    const onVideoReady = () => {
      settleReady();
      attemptPlay();
    };

    const tryNextCandidate = () => {
      if (settled) return;
      candidateIndex += 1;
      if (candidateIndex >= uniqueCandidates.length) {
        markFallback();
        settled = true;
        return;
      }
      sourceNode.setAttribute('src', uniqueCandidates[candidateIndex]);
      video.load();
      attemptPlay();
    };

    /* No time-based fallback — ~2.5 MB hero needs longer than 4s on slow links.
       Until canplay: poster stays visible; fallback only after real load errors. */
    video.addEventListener('canplay', onVideoReady, { once: true });
    video.addEventListener('loadeddata', onVideoReady, { once: true });
    video.addEventListener('error', tryNextCandidate);
    sourceNode.addEventListener('error', tryNextCandidate);

    sourceNode.setAttribute('src', uniqueCandidates[candidateIndex]);
    video.load();
    attemptPlay();
  };

  setupHeroVideo();

  /* === REVEAL ON SCROLL (IntersectionObserver) === */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  }

  /* === CONSENT + BOOKING GATE === */
  const getConsent = (service) => {
    if (!window.klaro || typeof window.klaro.getManager !== 'function') return false;
    const manager = window.klaro.getManager();
    const consents = manager?.consents || {};
    return consents[service] === true;
  };

  const bookingStatus = document.getElementById('bookingConsentStatus');
  const bookingEmbed = document.getElementById('bookingEmbed');
  const bookingBtn = document.getElementById('enableBookingConsent');
  const calEmbedContainer = document.getElementById('calEmbedContainer');

  const getCalEmbedUrl = () => {
    if (calEmbedContainer?.dataset.calEmbedUrl) return calEmbedContainer.dataset.calEmbedUrl;
    if (typeof CLIENT !== 'undefined' && CLIENT.calcomLink && !CLIENT.calcomLink.startsWith('[')) {
      const base = CLIENT.calcomLink;
      return base.includes('?') ? `${base}&embed=true&theme=dark` : `${base}?embed=true&theme=dark`;
    }
    return '';
  };

  const getCalIframeTitle = () => {
    if (typeof CLIENT !== 'undefined' && CLIENT.name && !CLIENT.name.startsWith('[')) {
      return `Termin buchen bei ${CLIENT.name}`;
    }
    return 'Termin buchen bei Sascha Grimm Heizung & Sanitär';
  };

  const mountCalIframe = () => {
    if (!calEmbedContainer || calEmbedContainer.querySelector('iframe')) return;
    const embedUrl = getCalEmbedUrl();
    if (!embedUrl) return;
    const iframe = document.createElement('iframe');
    iframe.src = embedUrl;
    iframe.title = getCalIframeTitle();
    iframe.loading = 'lazy';
    iframe.width = '100%';
    iframe.height = '700';
    iframe.setAttribute('frameborder', '0');
    calEmbedContainer.appendChild(iframe);
  };

  const unmountCalIframe = () => {
    if (!calEmbedContainer) return;
    calEmbedContainer.innerHTML = '';
  };

  const renderBookingState = () => {
    const allowed = getConsent('booking');
    if (bookingStatus) {
      bookingStatus.textContent = allowed
        ? 'Einwilligung aktiv. Der Cal.com-Terminkalender ist geladen.'
        : 'Einwilligung fehlt. Der Terminkalender wird erst nach Aktivierung geladen.';
    }
    if (bookingEmbed) bookingEmbed.hidden = !allowed;
    if (allowed) mountCalIframe();
    else unmountCalIframe();
  };

  /* === GOOGLE MAPS DSGVO GATE === */
  const gatedMapContainer = document.getElementById('gatedMapContainer');
  const mapConsentOverlay = document.getElementById('mapConsentOverlay');
  const acceptMapBtn = document.getElementById('acceptMapBtn');
  const realMapContainer = document.getElementById('realMapContainer');

  const getMapsEmbedUrl = () => {
    if (realMapContainer?.dataset.mapsUrl) return realMapContainer.dataset.mapsUrl;
    if (typeof CLIENT !== 'undefined' && CLIENT.googleMapsEmbedUrl && !CLIENT.googleMapsEmbedUrl.startsWith('[')) {
      return CLIENT.googleMapsEmbedUrl;
    }
    return '';
  };

  const getMapsIframeTitle = () => {
    if (realMapContainer?.dataset.mapsTitle) return realMapContainer.dataset.mapsTitle;
    if (typeof CLIENT !== 'undefined' && CLIENT.name && !CLIENT.name.startsWith('[')) {
      return `Standort ${CLIENT.name} – ${CLIENT.strasse}, ${CLIENT.plz} ${CLIENT.ort}`;
    }
    return 'Standort';
  };

  const mountMapIframe = () => {
    if (!realMapContainer || realMapContainer.querySelector('iframe')) return;
    const embedUrl = getMapsEmbedUrl();
    if (!embedUrl) return;
    const iframe = document.createElement('iframe');
    iframe.src = embedUrl;
    iframe.title = getMapsIframeTitle();
    iframe.loading = 'lazy';
    iframe.allowFullscreen = true;
    iframe.style.border = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    realMapContainer.appendChild(iframe);
  };

  const renderMapState = () => {
    if (!gatedMapContainer || !mapConsentOverlay || !realMapContainer) return;

    const allowed = getConsent('googleMaps');
    if (allowed) {
      mapConsentOverlay.style.display = 'none';
      realMapContainer.style.display = 'block';
      mountMapIframe();
    } else {
      mapConsentOverlay.style.display = 'flex';
      realMapContainer.style.display = 'none';
      realMapContainer.innerHTML = '';
    }
  };

  if (acceptMapBtn) {
    acceptMapBtn.addEventListener('click', () => {
      if (window.klaro && typeof window.klaro.getManager === 'function') {
        const manager = window.klaro.getManager();
        if (manager) {
          manager.updateConsent('googleMaps', true);
          manager.saveAndApplyConsents();
        }
      } else {
        mapConsentOverlay.style.display = 'none';
        realMapContainer.style.display = 'block';
        mountMapIframe();
      }
    });
  }

  if (bookingBtn) {
    bookingBtn.addEventListener('click', () => {
      if (window.klaro && typeof window.klaro.getManager === 'function') {
        const manager = window.klaro.getManager();
        if (manager) {
          manager.updateConsent('booking', true);
          manager.saveAndApplyConsents();
          return;
        }
      }
      if (bookingEmbed) bookingEmbed.hidden = false;
      mountCalIframe();
      if (bookingStatus) {
        bookingStatus.textContent = 'Terminkalender geladen.';
      }
    });
  }

  document.getElementById('withdrawBookingConsent')?.addEventListener('click', () => {
    if (window.klaro && typeof window.klaro.getManager === 'function') {
      const manager = window.klaro.getManager();
      if (manager) {
        manager.updateConsent('booking', false);
        manager.saveAndApplyConsents();
        return;
      }
    }
    unmountCalIframe();
    if (bookingEmbed) bookingEmbed.hidden = true;
    renderBookingState();
  });

  window.klaroConfig = window.klaroConfig || {};
  window.klaroConfig.callback = () => {
    renderBookingState();
    renderMapState();
  };

  renderBookingState();
  renderMapState();

  /* === TERMIN CALLBACK FORM === */
  const terminCallbackForm = document.getElementById('terminCallbackForm');
  if (terminCallbackForm) {
    terminCallbackForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const message = document.getElementById('terminCallbackResult');
      const submitButton = terminCallbackForm.querySelector('button[type="submit"]');
      if (submitButton) submitButton.disabled = true;

      const formData = new FormData(terminCallbackForm);
      const accessKey = String(formData.get('access_key') || '').trim();
      const honeypot = String(formData.get('website') || '').trim();
      if (honeypot) {
        if (message) message.textContent = 'Anfrage blockiert.';
        if (submitButton) submitButton.disabled = false;
        return;
      }
      if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY' || accessKey === 'demo-key-nicht-aktiv') {
        if (message) message.textContent = 'Rückruf im Demo-Modus: Bitte telefonisch melden.';
        if (submitButton) submitButton.disabled = false;
        return;
      }

      try {
        const response = await fetch(terminCallbackForm.action, {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.message || 'Rückruf konnte nicht gesendet werden.');
        }
        if (message) message.textContent = 'Danke! Wir rufen Sie schnellstmöglich zurück.';
        terminCallbackForm.reset();
      } catch (error) {
        if (message) message.textContent = `Fehler: ${error.message}`;
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
    });
  }

  /* === CONTACT FORM === */
  const contactForm = document.getElementById('kontaktForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const message = document.getElementById('kontaktFormResult');
      const submitButton = contactForm.querySelector('button[type="submit"]');
      if (submitButton) submitButton.disabled = true;

      const formData = new FormData(contactForm);
      const accessKey = String(formData.get('access_key') || '').trim();
      const honeypot = String(formData.get('website') || '').trim();
      if (honeypot) {
        if (message) message.textContent = 'Anfrage blockiert.';
        if (submitButton) submitButton.disabled = false;
        return;
      }
      if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY') {
        if (message) message.textContent = 'Bitte zuerst den echten Web3Forms Access Key eintragen.';
        if (submitButton) submitButton.disabled = false;
        return;
      }

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.message || 'Anfrage konnte nicht gesendet werden.');
        }
        if (message) {
          message.textContent = 'Danke! Ihre Anfrage wurde erfolgreich übermittelt.';
        }
        contactForm.reset();
      } catch (error) {
        if (message) {
          message.textContent = `Fehler: ${error.message}`;
        }
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
    });
  }

  /* === FAMILIE DOCUMENT LIGHTBOX === */
  const lightboxTargets = Array.from(document.querySelectorAll('[data-lightbox], .familie-doc img, .referenzen-preview-item'));
  if (lightboxTargets.length) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.innerHTML = `
      <div class="lightbox__content" role="dialog" aria-modal="true" aria-label="Bildvorschau">
        <button type="button" class="lightbox__close" aria-label="Vorschau schließen">×</button>
        <img class="lightbox__img" src="" alt="">
      </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox__img');
    const closeBtn = lightbox.querySelector('.lightbox__close');
    let lastTrigger = null;

    const closeLightbox = () => {
      lightbox.hidden = true;
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastTrigger) lastTrigger.focus();
    };

    const openLightbox = (trigger, src, alt) => {
      if (!lightboxImg) return;
      lastTrigger = trigger;
      lightboxImg.src = src;
      lightboxImg.alt = alt || 'Bildvorschau';
      lightbox.hidden = false;
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    };

    lightboxTargets.forEach((target) => {
      const img = target.tagName === 'IMG' ? target : target.querySelector('img');
      if (!img) return;
      const trigger = target.tagName === 'IMG' ? target : target;

      trigger.setAttribute('role', 'button');
      trigger.setAttribute('tabindex', '0');
      trigger.setAttribute('aria-label', `${img.alt || 'Bild'} vergrößern`);

      trigger.addEventListener('click', () => openLightbox(trigger, img.src, img.alt));
      trigger.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openLightbox(trigger, img.src, img.alt);
        }
      });
    });

    closeBtn?.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (event) => {
      if (!lightbox.hidden && event.key === 'Escape') {
        closeLightbox();
      }
    });
  }

  /* === REFERENZEN FILTER === */
  const filterButtons = Array.from(document.querySelectorAll('.referenzen-filter [data-filter]'));
  const refCards = Array.from(document.querySelectorAll('.ref-card[data-category]'));
  if (filterButtons.length && refCards.length) {
    const applyFilter = (filter) => {
      refCards.forEach((card) => {
        const category = card.dataset.category;
        const visible = filter === 'all' || category === filter;
        card.hidden = !visible;
      });
    };

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter || 'all';
        filterButtons.forEach((b) => b.classList.toggle('is-active', b === button));
        applyFilter(filter);
      });
    });
  }

  /* === REVIEWS CAROUSEL === */
  const initReviewsCarousel = () => {
  const reviewsTrack = document.getElementById('reviewsTrack');
  const reviewsPrev = document.getElementById('reviewsPrev');
  const reviewsNext = document.getElementById('reviewsNext');
  const reviewsDotsContainer = document.getElementById('reviewsDots');
  
  if (!reviewsTrack || !reviewsPrev || !reviewsNext || !reviewsDotsContainer) return;
  if (reviewsTrack.dataset.carouselReady === 'true') return;

  const cards = Array.from(reviewsTrack.querySelectorAll('.google-review-card, .bewertung-card'));
  if (!cards.length) return;
  reviewsTrack.dataset.carouselReady = 'true';
    let currentIndex = 0;
    let autoplayInterval;
    
    const getVisibleCount = () => {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    };
    
    const getMaxIndex = () => Math.max(0, cards.length - getVisibleCount());
    
    const createDots = () => {
      reviewsDotsContainer.innerHTML = '';
      const dotsCount = getMaxIndex() + 1;
      for (let i = 0; i < dotsCount; i++) {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${i === currentIndex ? 'carousel-dot--active' : ''}`;
        dot.setAttribute('aria-label', `Gehe zu Bewertung ${i + 1}`);
        dot.addEventListener('click', () => {
          currentIndex = i;
          updateCarousel();
          resetAutoplay();
        });
        reviewsDotsContainer.appendChild(dot);
      }
    };
    
    const updateCarousel = () => {
      currentIndex = Math.min(currentIndex, getMaxIndex());
      const card = cards[0];
      if (!card) return;
      
      const cardStyle = window.getComputedStyle(card);
      const cardWidth = card.getBoundingClientRect().width;
      const marginRight = parseFloat(cardStyle.marginRight) || 0;
      const stepWidth = cardWidth + marginRight;
      
      reviewsTrack.style.transform = `translateX(${-currentIndex * stepWidth}px)`;
      
      const dots = Array.from(reviewsDotsContainer.querySelectorAll('.carousel-dot'));
      dots.forEach((dot, idx) => {
        dot.classList.toggle('carousel-dot--active', idx === currentIndex);
      });
    };
    
    const slideNext = () => {
      const maxIdx = getMaxIndex();
      if (currentIndex >= maxIdx) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
      updateCarousel();
    };
    
    const slidePrev = () => {
      const maxIdx = getMaxIndex();
      if (currentIndex <= 0) {
        currentIndex = maxIdx;
      } else {
        currentIndex--;
      }
      updateCarousel();
    };
    
    reviewsNext.addEventListener('click', () => {
      slideNext();
      resetAutoplay();
    });
    
    reviewsPrev.addEventListener('click', () => {
      slidePrev();
      resetAutoplay();
    });
    
    let startX = 0;
    let isSwiping = false;
    
    reviewsTrack.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isSwiping = true;
    }, { passive: true });
    
    reviewsTrack.addEventListener('touchmove', (e) => {
      if (!isSwiping) return;
      const diffX = startX - e.touches[0].clientX;
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          slideNext();
        } else {
          slidePrev();
        }
        isSwiping = false;
        resetAutoplay();
      }
    }, { passive: true });
    
    reviewsTrack.addEventListener('touchend', () => {
      isSwiping = false;
    });
    
    const startAutoplay = () => {
      autoplayInterval = setInterval(slideNext, 6000);
    };
    
    const resetAutoplay = () => {
      clearInterval(autoplayInterval);
      startAutoplay();
    };
    
    const carouselContainer = document.querySelector('.bewertungen-carousel-container');
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
      carouselContainer.addEventListener('mouseleave', startAutoplay);
    }
    
    createDots();
    updateCarousel();
    startAutoplay();
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        createDots();
        updateCarousel();
      }, 150);
    });
  };

  document.addEventListener('grimm:reviews-ready', initReviewsCarousel);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReviewsCarousel);
  } else {
    initReviewsCarousel();
  }

  const loadKlaro = () => {
    if (!document.getElementById('klaro') || document.querySelector('script[data-klaro-loader]')) return;
    const script = document.createElement('script');
    script.src = 'https://cdn.kiprotect.com/klaro/v0.7.18/klaro.js';
    script.defer = true;
    script.dataset.klaroLoader = 'true';
    document.body.appendChild(script);
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadKlaro, { timeout: 2500 });
  } else {
    window.addEventListener('load', loadKlaro, { once: true });
  }

})();
