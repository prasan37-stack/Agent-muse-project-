# FR001 Mortgage Calculator — Playwright Tests

TypeScript Playwright automated tests generated from
`Detailed_TestCases_FR001_Mortgage_Calculator.xlsx`
(TC_FR001_01 through TC_FR001_25).

## Setup

```bash
npm install
npx playwright install
```

## Run

```bash
npm test              # all browsers (chromium, firefox, webkit)
npm run test:chromium # chromium only
npm run test:headed   # headed mode
```

## Layout

- `tests/mortgage-calculator.spec.ts` — all 25 test cases, grouped by module
- `pages/MortgageCalculatorPage.ts` — page object for the calculator input page
- `playwright.config.ts` — base URL `https://web.secure.wellsfargo.com`, 3 browser projects

## Notes

- Locators use accessible roles/labels first; verify against the live DOM before the first full run.
- TC_FR001_02 (cross-browser) is covered by the three config projects.
- TC_FR001_21 asserts the calculate API payload — adjust the route matcher/payload keys to the real endpoint.
- TC_FR001_22 simulates a 30s+ backend delay to verify the timeout message.
