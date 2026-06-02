# Mobile-First Audit Report

## Audit Setup

- **Scope**: `website/index.html`, `website/referenzen.html`, `website/team.html`, `website/impressum.html`, `website/datenschutz.html`, `website/leistungen/*.html`
- **Device Profiles**:
  - iPhone SE/13 class (small/medium viewport)
  - Android midrange class (`360x800`)
  - Large mobile class (`430x932`)
- **Audit Axes**:
  - Core Web Vitals (mobile)
  - Navigation/findability
  - Touch target quality
  - Calculator and form flow
  - Readability/typography
  - CTA visibility in first viewport

## Technical Measurement Output

- **Smoke Suite** (`npm run smoke`): passed
  - `/`, `/referenzen.html`, `/team.html`, `/impressum.html`, `/datenschutz.html`, and all `leistungen` pages return expected status.
- **Runtime Proxy Metrics** (local preview on `127.0.0.1:4173`):
  - `/`: `200`, `108.76ms`, `56574` bytes
  - `/referenzen.html`: `200`, `10.81ms`, `5176` bytes
  - `/team.html`: `200`, `9.88ms`, `3897` bytes
  - `/impressum.html`: `200`, `9.59ms`, `4100` bytes
  - `/datenschutz.html`: `200`, `13ms`, `6790` bytes
- **Asset/Bundle sizes**:
  - `website/js/main.js`: `21275` bytes
  - `website/js/calc.js`: `9327` bytes
  - `website/css/style.css`: `46167` bytes

## Lighthouse/Core-Web-Vitals Note

- No local Lighthouse CLI was available in this environment (`lighthouse` command not installed).
- A full numeric CWV scorecard remains **open** for production validation and is listed in `project-docs/Backlog.md` under legal/performance hardening.

## UX/CRO Findings (P0/P1/P2)

### P0 (Conversion or Function Blocker)

1. **Calculator step progression can dead-end on invalid area input without visible hint**
   - **Location**: `website/js/calc.js`, step validation for area in step 2.
   - **Impact**: Users can press "Weiter"/"Berechnen" and see no progress if value is invalid, causing form abandonment.
   - **Fix recommendation**: add inline validation state + error copy near `input[name="area"]`; scroll/focus to field on failure.
   - **Effort**: S

### P1 (Strong Mobile Friction)

1. **Hero section still consumes extended vertical scroll before primary content**
   - **Location**: `website/css/style.css` (`.hero`, `.hero__sticky`) and `website/js/main.js` hero progress mapping.
   - **Impact**: Slower entry into USP sections (`Vorher/Nachher`, `Kostenrechner`) on mobile.
   - **Fix recommendation**: reduce hero scroll range further for <=768px and accelerate fade/scale interpolation.
   - **Effort**: M

2. **Review cards are text-heavy and can overload one-screen reading on mobile**
   - **Location**: `website/index.html` reviews content + carousel behavior in `website/js/main.js`.
   - **Impact**: High cognitive load and lower progression toward booking CTA.
   - **Fix recommendation**: clamp preview text with "mehr lesen" expansion, keep CTA visible after each card.
   - **Effort**: M

3. **Inline style usage across social/link blocks reduces maintainability**
   - **Location**: `website/index.html`, `website/referenzen.html`, `website/team.html`.
   - **Impact**: harder consistency control, higher risk of drift in mobile polish updates.
   - **Fix recommendation**: move inline style blocks to reusable CSS utility classes.
   - **Effort**: S

### P2 (Quality/Polish)

1. **Subpage navigation is reduced vs homepage IA**
   - **Location**: `website/referenzen.html`, `website/team.html`.
   - **Impact**: slightly lower findability for calculator and booking from subpages.
   - **Fix recommendation**: align key links (`Kostenrechner`, `Termin`) in subpage nav/footer.
   - **Effort**: S

2. **Footer social links on subpages are text-only while homepage uses icon treatment**
   - **Location**: `website/referenzen.html`, `website/team.html`.
   - **Impact**: visual inconsistency and weaker trust signal continuity.
   - **Fix recommendation**: reuse homepage social icon pattern and hover states.
   - **Effort**: S

## Prioritized Fix Order

1. P0 calculator validation feedback
2. P1 hero mobile scroll compression
3. P1 review readability and CTA persistence
4. P1 inline style cleanup
5. P2 navigation/footer consistency polish
