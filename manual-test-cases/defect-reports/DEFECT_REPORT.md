# Defect Report — FR001 Mortgage Calculator & Get Prequalified Flow

**Test Run Date:** 2026-09-30
**Suite:** [playwrighttypescripts.ts](../../playwrighttypescripts.ts) (40 test cases × 3 browsers = 120 runs)
**Result:** 104 failed / 16 passed
**Environment:** chromium, firefox, webkit (Playwright)

---

## DEF-01 — Mortgage Calculator page locators do not resolve (Blocker)

- **Affected TCs:** TC_FR001_01, 02, 05–15, 18, 20–25 (~22 cases × 3 browsers)
- **Symptom:** `locator.fill`, `locator.selectOption`, `locator.inputValue` all fail with `Test timeout of 30000ms exceeded`; `expect(locator).toBeVisible()` / `toBeDisabled()` also fail.
- **Root cause:** [pages/MortgageCalculatorPage.ts](../../pages/MortgageCalculatorPage.ts) locates fields via `page.getByLabel(/home value/i)`, `getByLabel(/loan amount/i)`, etc. These accessible-label patterns don't match the live `wellsfargo.com/mortgage/rates/` DOM — the locators resolve to 0 elements, so every action against them times out waiting for the element to appear.
- **Evidence:**
  ```
  Error: locator.fill: Test timeout of 30000ms exceeded.
  Error: expect(locator).toBeVisible() failed
  ```
- **Fix:** Inspect the live page DOM (or a captured trace) and update the locators in `MortgageCalculatorPage.ts` to match real `id`/`name`/`aria-label` attributes.

---

## DEF-02 — Loan Purpose / State dropdown content mismatch

- **Affected TCs:** TC_FR001_03, 04, 16
- **Symptom:** `expect(received).toContain(expected)` and `expect(received).toHaveLength(expected)` fail.
- **Root cause:** Tests assume the Loan Purpose `<select>` has options labeled exactly `Purchase` / `Refinance`, and the State `<select>` has exactly 51 options (50 states + DC). The live dropdown's actual option text/count differs (likely tied to DEF-01 — same locator not resolving to the true element).
- **Fix:** Re-verify actual option labels/count on the live page and update assertions, or confirm once DEF-01 locators are corrected.

---

## DEF-03 — Get Prequalified flow uses buttons, not radio inputs

- **Affected TCs:** TC_FR001_31–35, 37, 40
- **Symptom:** `expect(locator).toBeVisible()` fails on `page.getByRole('radio').first()`; cascading `locator.click: Target page, context or browser has been closed` on subsequent steps in the same file after timeout.
- **Root cause:** The captured page snapshot shows the "Where are you in your journey?" question renders as `button "Just starting my search"`, `button "Ready to make an offer"`, `button "Need a loan now"` — not `<input type="radio">`. `page.getByRole('radio')` never matches, so the test times out, and the worker/context is torn down, causing later `.click()` calls in the same test to report "Target page, context or browser has been closed".
- **Fix:** Replace `page.getByRole('radio').first()` with `page.getByRole('button', { name: /just starting|ready to make an offer|need a loan now/i }).first()` (or the correct role per live DOM).

---

## DEF-04 — Prequal page never reaches `networkidle`

- **Affected TCs:** TC_FR001_39 (both describe-block occurrences)
- **Symptom:** `page.goto: Test timeout of 30000ms exceeded` while waiting until `networkidle`.
- **Root cause:** The live prequal page likely has persistent background requests (analytics/heartbeat/polling) that prevent the network from ever going fully idle within 30s.
- **Fix:** Use `waitUntil: 'domcontentloaded'` (consistent with `beforeEach`) instead of `networkidle`, and rely on `collectConsoleErrors` timing from a fixed-duration listen window instead.

---

## Summary

| Defect | Severity | Root Cause Type | Est. Runs Affected |
|---|---|---|---|
| DEF-01 | Blocker | Incorrect locators (test/page-object) | ~66 |
| DEF-02 | Major | Incorrect assertions (test) | ~9 |
| DEF-03 | Blocker | Incorrect role selector (test) | ~18 |
| DEF-04 | Major | Unrealistic wait condition (test) | ~6 |

**Conclusion:** All identified defects are in the test automation (locators/assertions/wait strategy), not confirmed application defects — the test suite was scaffolded before validating against the live Wells Fargo DOM. Recommend capturing a real Playwright trace/codegen session against the live pages to correct locators before re-running.

---

## Manual Execution Findings (live site, prequal flow TC_26–TC_40)

The following were confirmed by manually driving the actual page at
`https://web.secure.wellsfargo.com/mortgage/get-prequalified/?src=buy...` — these are genuine application-side observations, not automation defects.

### DEF-05 — "Get Prequalified" text not visible on page body (Minor)

- **Affected TC:** TC_FR001_26
- **Observed:** The visible H1 reads "Get your personalized purchase rate quote". The phrase "Get Prequalified" only appears in the browser tab title, not in on-page visible text.
- **Impact:** Low — cosmetic/content mismatch vs. test expectation; page still functions correctly.

### DEF-06 — Previously selected Step 1 answer is not visually retained after Back navigation (Major)

- **Affected TC:** TC_FR001_34
- **Steps:** Select "Just starting my search" → advance to Step 2 → click Back → Step 1 re-renders.
- **Observed:** All three options ("Just starting my search", "Ready to make an offer", "Need a loan now") render identically with no selected/highlighted state. Confirmed visually via screenshot — no aria-pressed, checked, or visual indicator on the previously chosen option.
- **Impact:** Users returning to a prior step cannot tell which answer they previously gave, which is a usability/data-transparency gap.

### DEF-07 — Console errors present on every page load (Major)

- **Affected TC:** TC_FR001_39
- **Observed:** Multiple browser console errors fire on load, independent of any test interaction:
  - OneTrust consent-management CSP violations (`connect-src`, `img-src`, `child-src` directives blocking cookies-data.onetrust.io, ad/tracking pixels, and a blob: worker).
  - A failed fetch to the OneTrust session endpoint (`TypeError: Failed to fetch`).
  - Several `Failed to load resource: 404` entries for unspecified resources.
- **Impact:** While these don't break the visible user flow, they indicate misconfigured CSP headers relative to third-party tracking scripts, and untracked 404s. Should be triaged by the web/analytics team — not blocking, but worth logging as technical debt.

### Notes on already-known automation defects, confirmed still valid on live site

- **DEF-03 still confirmed:** Step 1 options are real `<button>` elements, not `<input type="radio">` — verified again in this session's DOM snapshot. Playwright's `getByRole('radio')` usage should be corrected to `getByRole('button', { name: /.../ })`.
