/**
 * Mobile / desktop layout audit for Step 10 (implementation_plan2.md)
 * Usage: node scripts/mobile-audit.js
 */
const { chromium } = require('playwright');

const BASE = process.env.PREVIEW_URL || 'http://127.0.0.1:4173';
const PAGES = [
  '/',
  '/referenzen.html',
  '/team.html',
  '/impressum.html',
  '/datenschutz.html',
  '/leistungen/bad.html',
  '/leistungen/heizung.html',
  '/leistungen/haustechnik.html',
  '/leistungen/lueftung.html',
];

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'desktop', width: 1280, height: 900 },
];

async function auditPage(page, url, viewportName) {
  const issues = [];
  const checks = {};

  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

  const base = await page.evaluate(() => {
    const doc = document.documentElement;
    const body = document.body;
    const overflowX = Math.max(doc.scrollWidth, body ? body.scrollWidth : 0) - doc.clientWidth;
    return {
      overflowX,
      title: document.title,
    };
  });

  checks.noHorizontalScroll = base.overflowX <= 1;
  if (!checks.noHorizontalScroll) {
    issues.push(`Horizontal overflow ${base.overflowX}px`);
  }

  if (url.endsWith('/') || url.endsWith('/index.html') || url === `${BASE}/`) {
    const hero = await page.evaluate(() => {
      const h1 = document.querySelector('.hero__h1');
      const video = document.querySelector('.hero video, .hero__bg-video video, video.hero__video');
      const overlay = document.querySelector('.hero__overlay');
      const heroCta = document.querySelector('.hero__primary-cta');
      const boschBadge = document.querySelector('.hero__bosch-badge img');
      const waFab = document.querySelector('.whatsapp-float');
      const h1Size = h1 ? parseFloat(getComputedStyle(h1).fontSize) : 0;
      const overlayOpacity = overlay ? getComputedStyle(overlay).opacity : null;
      const leistungenCols = document.querySelector('.leistungen-grid')
        ? getComputedStyle(document.querySelector('.leistungen-grid')).gridTemplateColumns
        : '';
      const foerderungCols = document.querySelector('.foerderung__grid')
        ? getComputedStyle(document.querySelector('.foerderung__grid')).gridTemplateColumns
        : '';
      const refCols = document.querySelector('.referenzen-preview-grid')
        ? getComputedStyle(document.querySelector('.referenzen-preview-grid')).gridTemplateColumns
        : '';
      const boschFlex = document.querySelector('.bosch-flagship__inner')
        ? getComputedStyle(document.querySelector('.bosch-flagship__inner')).flexDirection
        : '';
      const carousel = document.querySelector('.partner-track');
      const carouselRunning = carousel
        ? getComputedStyle(carousel).animationName !== 'none'
        : false;
      const calcBtn = document.querySelector('.calc-choice, .calc-nav .btn');
      const calcBtnH = calcBtn ? calcBtn.getBoundingClientRect().height : 0;
      const tel = document.querySelector('[data-config-href="tel"]');
      return {
        h1Size,
        hasVideo: !!video,
        videoPaused: video ? video.paused : null,
        overlayOpacity,
        heroCtaVisible: heroCta ? heroCta.offsetParent !== null : false,
        heroCtaHref: heroCta ? heroCta.getAttribute('href') : null,
        heroCtaCount: document.querySelectorAll('.hero__primary-cta').length,
        boschBadgeVisible: boschBadge ? boschBadge.offsetParent !== null : false,
        waFabVisible: waFab ? getComputedStyle(waFab).display !== 'none' : false,
        leistungenCols,
        foerderungCols,
        refCols,
        boschFlex,
        carouselRunning,
        calcBtnH,
        telHref: tel ? tel.getAttribute('href') : null,
      };
    });

    checks.heroHeadlineMin28 = hero.h1Size >= 28;
    checks.heroVideoPresent = hero.hasVideo;
    checks.heroPrimaryCta = hero.heroCtaVisible
      && hero.heroCtaCount === 1
      && !!(hero.heroCtaHref && hero.heroCtaHref.startsWith('tel:'));
    checks.heroTelCta = !!(hero.heroCtaHref && hero.heroCtaHref.startsWith('tel:'));
    checks.heroBoschBadge = hero.boschBadgeVisible;
    checks.waFabMobile = viewportName === 'mobile' ? hero.waFabVisible : !hero.waFabVisible;
    checks.leistungenSingleCol = hero.leistungenCols.split(' ').length <= 1 || hero.leistungenCols.includes('1fr');
    checks.foerderungSingleCol = viewportName === 'mobile'
      ? hero.foerderungCols.split(' ').length <= 1
      : true;
    checks.referenzenSingleCol = viewportName === 'mobile'
      ? hero.refCols.split(' ').length <= 1
      : true;
    checks.boschStackedMobile = viewportName === 'mobile' ? hero.boschFlex === 'column' : hero.boschFlex === 'row';
    checks.partnerCarousel = hero.carouselRunning;
    if (checks.partnerCarousel) {
      await page.evaluate(() => {
        document.querySelector('.partner-carousel-wrapper')?.scrollIntoView({ block: 'center' });
      });
      await page.waitForTimeout(100);
      await page.locator('.partner-carousel-wrapper a:not([aria-hidden="true"])').first().focus();
      await page.waitForTimeout(100);
      checks.partnerCarouselPauses = await page.evaluate(() => {
        const carousel = document.querySelector('.partner-track');
        return carousel ? getComputedStyle(carousel).animationPlayState === 'paused' : false;
      });
      await page.mouse.move(0, 0);
    } else {
      checks.partnerCarouselPauses = false;
    }
    checks.calcTapTarget = hero.calcBtnH >= 44;
    checks.telLink = !!(hero.telHref && hero.telHref.startsWith('tel:'));

    if (!checks.heroHeadlineMin28) issues.push(`Hero H1 ${hero.h1Size}px < 28px`);
    if (!checks.heroVideoPresent) issues.push('Hero video missing');
    if (!checks.heroPrimaryCta) issues.push(`Hero primary CTA invalid (count=${hero.heroCtaCount}, href=${hero.heroCtaHref || 'none'})`);
    if (!checks.heroTelCta) issues.push(`Hero primary CTA is not tel: (${hero.heroCtaHref || 'missing'})`);
    if (!checks.heroBoschBadge) issues.push('Hero BOSCH badge not visible');
    if (!checks.waFabMobile) issues.push('WhatsApp float visibility wrong for viewport');
    if (viewportName === 'mobile' && !checks.leistungenSingleCol) issues.push(`Leistungen not 1-col: ${hero.leistungenCols}`);
    if (viewportName === 'mobile' && !checks.foerderungSingleCol) issues.push(`Förderung not 1-col: ${hero.foerderungCols}`);
    if (viewportName === 'mobile' && !checks.referenzenSingleCol) issues.push(`Referenzen not 1-col: ${hero.refCols}`);
    if (!checks.boschStackedMobile) issues.push(`BOSCH layout flex-direction=${hero.boschFlex}`);
    if (!checks.partnerCarousel) issues.push('Partner carousel animation not running');
    if (!checks.partnerCarouselPauses) issues.push('Partner carousel does not pause on hover/focus');
    if (!checks.calcTapTarget) issues.push(`Calc button height ${hero.calcBtnH}px`);
    if (!checks.telLink) issues.push('Tel link missing');
  }

  if (!url.endsWith('/') && !url.endsWith('/index.html') && url !== `${BASE}/`) {
    const navCheck = await page.evaluate(() => {
      const mobileHost = document.querySelector('[data-nav-mobile]');
      const leistungenLinks = mobileHost
        ? mobileHost.querySelectorAll('.nav__mobile-group:first-of-type .nav__mobile-link').length
        : 0;
      const desktopDropdowns = document.querySelectorAll('.nav__item--has-menu').length;
      const telCta = document.querySelector('[data-nav-cta]');
      return {
        leistungenLinks,
        desktopDropdowns,
        telCtaHref: telCta ? telCta.getAttribute('href') : null,
      };
    });
    checks.navLeistungenMobile = navCheck.leistungenLinks >= 4;
    checks.navDropdownsDesktop = viewportName === 'desktop' ? navCheck.desktopDropdowns >= 2 : true;
    checks.navTelCta = !!(navCheck.telCtaHref && navCheck.telCtaHref.startsWith('tel:'));
    if (!checks.navLeistungenMobile) issues.push(`Mobile nav Leistungen links=${navCheck.leistungenLinks}`);
    if (!checks.navDropdownsDesktop) issues.push(`Desktop nav dropdowns=${navCheck.desktopDropdowns}`);
    if (!checks.navTelCta) issues.push('Nav CTA tel link missing');
  }

  return { url, viewportName, checks, issues, pass: issues.length === 0 };
}

async function testHamburger(page) {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    localStorage.setItem('grimm-consent-v1', JSON.stringify({ necessary: true, booking: false, googleMaps: false }));
  });
  await page.reload({ waitUntil: 'networkidle' });
  const btn = page.locator('#navHamburger');
  const menu = page.locator('#navMobile');
  await btn.click();
  await page.waitForTimeout(300);
  const open = await menu.evaluate((el) => el.classList.contains('open'));
  await page.locator('#navMobileClose').click();
  await page.waitForTimeout(300);
  const closed = await menu.evaluate((el) => !el.classList.contains('open'));
  return { pass: open && closed, open, closed };
}

async function testReducedMotion(browser) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  const state = await page.evaluate(() => {
    const hero = document.querySelector('.hero__sticky');
    const bg = document.querySelector('.hero__bg-img');
    const carousel = document.querySelector('.partner-track');
    return {
      heroPosition: hero ? getComputedStyle(hero).position : '',
      heroTransform: hero ? getComputedStyle(hero).transform : '',
      heroClip: hero ? getComputedStyle(hero).clipPath : '',
      bgAnimation: bg ? getComputedStyle(bg).animationName : '',
      carouselAnimation: carousel ? getComputedStyle(carousel).animationName : '',
    };
  });
  await context.close();
  const heroTransformReset = state.heroTransform === 'none' || state.heroTransform === 'matrix(1, 0, 0, 1, 0, 0)';
  const heroStatic = state.heroPosition === 'relative' && (state.heroClip === 'none' || state.heroClip === '');
  return {
    ...state,
    pass: heroStatic && heroTransformReset && state.bgAnimation === 'none' && state.carouselAnimation === 'none',
  };
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const results = [];
  let failed = 0;

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();
    for (const path of PAGES) {
      const url = `${BASE}${path}`;
      try {
        const r = await auditPage(page, url, vp.name);
        results.push(r);
        if (!r.pass) failed += r.issues.length;
        console.log(`${vp.name} ${path}: ${r.pass ? 'OK' : 'FAIL'}${r.issues.length ? ' — ' + r.issues.join('; ') : ''}`);
      } catch (e) {
        failed++;
        console.log(`${vp.name} ${path}: ERROR — ${e.message}`);
        results.push({ url, viewportName: vp.name, pass: false, issues: [e.message] });
      }
    }
    await context.close();
  }

  const hPage = await browser.newPage();
  try {
    const ham = await testHamburger(hPage);
    console.log(`mobile hamburger: ${ham.pass ? 'OK' : 'FAIL'} open=${ham.open} closed=${ham.closed}`);
    if (!ham.pass) failed++;
  } catch (e) {
    console.log(`mobile hamburger: ERROR — ${e.message}`);
    failed++;
  }

  try {
    const rm = await testReducedMotion(browser);
    console.log(`reduced motion: ${rm.pass ? 'OK' : 'FAIL'} heroTransform=${rm.heroTransform} bgAnimation=${rm.bgAnimation} carouselAnimation=${rm.carouselAnimation}`);
    if (!rm.pass) failed++;
  } catch (e) {
    console.log(`reduced motion: ERROR — ${e.message}`);
    failed++;
  }

  await browser.close();
  console.log(failed ? `\n${failed} issue(s) found` : '\nAll mobile audit checks passed');
  process.exit(failed ? 1 : 0);
})();
