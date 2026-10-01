import { test, expect } from '@playwright/test';
import { MortgageCalculatorPage } from './pages/MortgageCalculatorPage';
import { config } from './utils/config';
import { waitForApiResponse, collectConsoleErrors } from './utils/helpers';

test.describe('FR001 - Mortgage Calculator', () => {
  let calc: MortgageCalculatorPage;

  test.beforeEach(async ({ page }) => {
    calc = new MortgageCalculatorPage(page);
    await calc.goto();
  });

  // ---------------------------------------------------------------- Page Load
  test('TC_FR001_01 - Verify calculator URL loads successfully', async ({ page }) => {
    const response = await page.goto(calc.url, { waitUntil: 'load' });
    expect(response?.status()).toBe(200);
    await expect(calc.pageHeader).toBeVisible();
    await expect(calc.calculateButton).toBeVisible();
  });

  test('TC_FR001_02 - Verify page elements render on supported browsers', async () => {
    // Runs on chromium, firefox and webkit via playwright.config.ts projects.
    await expect(calc.pageHeader).toBeVisible();
    await expect(calc.loanPurpose).toBeVisible();
    await expect(calc.homeValue).toBeVisible();
    await expect(calc.loanAmount).toBeVisible();
    await expect(calc.stateSelect).toBeVisible();
    await expect(calc.calculateButton).toBeVisible();
  });

  // ------------------------------------------------------------ Loan Purpose
  test('TC_FR001_03 - Verify Loan Purpose dropdown displays Purchase option', async () => {
    const options = await calc.selectOptions(calc.loanPurpose);
    expect(options).toContain('Purchase');
    await calc.loanPurpose.selectOption({ label: 'Purchase' });
    await expect(calc.loanPurpose).toHaveValue(/purchase/i);
  });

  test('TC_FR001_04 - Verify Loan Purpose dropdown displays Refinance option', async () => {
    const options = await calc.selectOptions(calc.loanPurpose);
    expect(options).toContain('Refinance');
    await calc.loanPurpose.selectOption({ label: 'Refinance' });
    await expect(calc.loanPurpose).toHaveValue(/refinance/i);
  });

  test('TC_FR001_05 - Verify Loan Purpose is mandatory field', async ({ page }) => {
    await calc.homeValue.fill('500000');
    await calc.loanAmount.fill('400000');
    await calc.stateSelect.selectOption({ label: 'New Jersey' });
    await calc.countySelect.selectOption({ label: 'Gloucester' });
    await calc.calculateButton.click();
    await expect(page.getByText(/loan purpose is required/i)).toBeVisible();
  });

  // -------------------------------------------------------------- Home Value
  test('TC_FR001_06 - Verify Home Value accepts minimum valid amount', async ({ page }) => {
    await calc.homeValue.fill('50000');
    await calc.homeValue.press('Tab');
    await expect(page.getByText(/valid number/i)).toBeHidden();
  });

  test('TC_FR001_07 - Verify Home Value accepts maximum valid amount', async ({ page }) => {
    await calc.homeValue.fill('10000000');
    await calc.homeValue.press('Tab');
    await expect(page.getByText(/valid number|exceeds/i)).toBeHidden();
  });

  test('TC_FR001_08 - Verify Home Value accepts decimal values', async () => {
    await calc.homeValue.fill('450000.50');
    await calc.homeValue.press('Tab');
    await expect(calc.homeValue).toHaveValue(/450,?000\.50/);
  });

  test('TC_FR001_09 - Verify Home Value rejects alphabetic characters', async ({ page }) => {
    await calc.homeValue.fill('FourHundredK');
    await calc.homeValue.press('Tab');
    await expect(page.getByText(/please enter a valid number/i)).toBeVisible();
  });

  test('TC_FR001_10 - Verify Home Value rejects special characters & symbols', async ({ page }) => {
    await calc.homeValue.fill('$500,000!');
    await calc.homeValue.press('Tab');
    await expect(page.getByText(/please enter a valid number/i)).toBeVisible();
  });

  // ------------------------------------------------------------- Loan Amount
  test('TC_FR001_11 - Verify Loan Amount accepts valid amount < Home Value', async ({ page }) => {
    await calc.homeValue.fill('500000');
    await calc.loanAmount.fill('400000');
    await calc.loanAmount.press('Tab');
    await expect(page.getByText(/valid number|exceed/i)).toBeHidden();
  });

  test('TC_FR001_12 - Verify Loan Amount rejects 0 or negative values', async ({ page }) => {
    for (const value of ['0', '-10000']) {
      await calc.loanAmount.fill(value);
      await calc.loanAmount.press('Tab');
      await expect(page.getByText(/loan amount must be greater than \$0/i)).toBeVisible();
    }
  });

  test('TC_FR001_13 - Verify Loan Amount rejects value > Home Value (LTV > 100%)', async ({ page }) => {
    await calc.loanPurpose.selectOption({ label: 'Purchase' });
    await calc.homeValue.fill('300000');
    await calc.loanAmount.fill('350000');
    await calc.stateSelect.selectOption({ label: 'New Jersey' });
    await calc.countySelect.selectOption({ label: 'Gloucester' });
    await calc.calculateButton.click();
    await expect(page.getByText(/loan amount cannot exceed home value|ltv/i)).toBeVisible();
  });

  test('TC_FR001_14 - Verify Loan Amount accepts decimal values', async () => {
    await calc.homeValue.fill('500000');
    await calc.loanAmount.fill('399999.99');
    await calc.loanAmount.press('Tab');
    await expect(calc.loanAmount).toHaveValue(/399,?999\.99/);
  });

  test('TC_FR001_15 - Verify Loan Amount mandatory field validation', async ({ page }) => {
    await calc.loanPurpose.selectOption({ label: 'Purchase' });
    await calc.homeValue.fill('500000');
    await calc.stateSelect.selectOption({ label: 'New Jersey' });
    await calc.countySelect.selectOption({ label: 'Gloucester' });
    await calc.calculateButton.click();
    await expect(page.getByText(/loan amount is required/i)).toBeVisible();
  });

  // ---------------------------------------------------------------- Location
  test('TC_FR001_16 - Verify State dropdown contains all 50 US states + DC', async () => {
    const options = (await calc.selectOptions(calc.stateSelect))
      .map((o) => o.trim())
      .filter((o) => o && !/select/i.test(o));
    expect(options).toHaveLength(51);
    expect(options).toContain('New Jersey');
    const sorted = [...options].sort((a, b) => a.localeCompare(b));
    expect(options).toEqual(sorted);
  });

  test('TC_FR001_17 - Verify State dropdown defaults to blank/Select State', async () => {
    const value = await calc.stateSelect.inputValue();
    expect(value === '' || /select/i.test(value)).toBeTruthy();
  });

  test('TC_FR001_18 - Verify County dropdown disabled until State selected', async () => {
    await expect(calc.countySelect).toBeDisabled();
  });

  test('TC_FR001_19 - Verify County list filters correctly for selected State', async () => {
    await calc.stateSelect.selectOption({ label: 'New Jersey' });
    await expect(calc.countySelect).toBeEnabled();
    const counties = await calc.selectOptions(calc.countySelect);
    expect(counties).toContain('Gloucester');
    expect(counties.join(' ')).not.toMatch(/Los Angeles|Cook County/i);
  });

  // ---------------------------------------------------------- Calculate Flow
  test('TC_FR001_20 - Verify Calculate button enabled only when all required fields filled', async () => {
    await expect(calc.calculateButton).toBeDisabled();
    await calc.fillValidForm();
    await expect(calc.calculateButton).toBeEnabled();
  });

  test('TC_FR001_21 - Verify Calculate button triggers API call with valid data', async ({ page }) => {
    await calc.fillValidForm();
    const response = await waitForApiResponse(page, /calculate|rates/i, () => calc.calculateButton.click());
    const payload = response.request().postDataJSON();
    expect(payload).toMatchObject({
      purpose: 'Purchase',
      homeValue: 500000,
      loanAmount: 400000,
      state: 'NJ',
      county: 'Gloucester',
    });
    await expect(page.getByText(/estimated rate/i)).toBeVisible();
  });

  test('TC_FR001_22 - Verify system handles API timeout gracefully', async ({ page }) => {
    // Simulate a >30s backend delay; adjust the route matcher to the real endpoint.
    await page.route('**/get-prequalified/**', async (route) => {
      await new Promise((r) => setTimeout(r, 35_000));
      await route.abort();
    });
    await calc.fillValidForm();
    await calc.calculateButton.click();
    await expect(calc.loadingSpinner).toBeVisible();
    await expect(page.getByText(/request timed out/i)).toBeVisible({ timeout: config.apiTimeout });
  });

  test('TC_FR001_23 - Verify results page shows estimated rate range', async ({ page }) => {
    await calc.fillValidForm();
    await calc.calculateButton.click();
    const rate = page.getByText(/estimated rate/i);
    await expect(rate).toBeVisible();
    await expect(page.getByText(/%.*apr|apr.*%/i)).toBeVisible();
    await expect(page.getByText(/disclaimer/i)).toBeVisible();
  });

  test('TC_FR001_24 - Verify results page shows monthly payment breakdown', async ({ page }) => {
    await calc.fillValidForm();
    await calc.calculateButton.click();
    await expect(page.getByText(/monthly payment/i)).toBeVisible();
    await expect(page.getByText(/principal.*interest|p&i/i)).toBeVisible();
    await expect(page.getByText(/taxes/i)).toBeVisible();
    await expect(page.getByText(/insurance/i)).toBeVisible();
  });

  test("TC_FR001_25 - Verify 'Start Over' or 'Edit' option returns to input page", async ({ page }) => {
    await calc.fillValidForm();
    await calc.calculateButton.click();
    await expect(page.getByText(/estimated rate/i)).toBeVisible();
    await page.getByRole('button', { name: /start over|edit/i }).first().click();
    await expect(page).toHaveURL(/input_page/);
    await expect(calc.calculateButton).toBeVisible();
  });
});

test.describe('FR001 - Get Prequalified flow (6 steps)', () => {
  const prequalUrl = config.prequalifiedUrl;

  test.beforeEach(async ({ page }) => {
    await page.goto(prequalUrl, { waitUntil: 'domcontentloaded' });
  });

  // ------------------------------------------------------- Step 1 - Landing
  test('TC_FR001_26 - Prequal page loads with HTTP 200 and shows Step 1 of 6', async ({ page }) => {
    const response = await page.goto(prequalUrl, { waitUntil: 'load' });
    expect(response?.status()).toBe(200);
    await expect(page.getByText(/step 1 of 6/i)).toBeVisible();
    await expect(page.getByText(/get your personalized purchase rate quote/i).first()).toBeVisible();
  });

  test('TC_FR001_27 - Credit-impact disclaimer is visible before starting', async ({ page }) => {
    await expect(page.getByText(/credit will not be affected/i)).toBeVisible();
  });

  test('TC_FR001_28 - Prequal vs full application explainer is shown', async ({ page }) => {
    await expect(
      page.getByText(/prequalification isn.t the same as.*full loan application/i)
    ).toBeVisible();
  });

  test('TC_FR001_29 - Mortgage consultant phone CTA is present and dialable', async ({ page }) => {
    const callLink = page.getByRole('link', { name: /1-888-446-2350/ });
    await expect(callLink).toBeVisible();
    await expect(callLink).toHaveAttribute('href', /tel:/i);
  });

  test('TC_FR001_30 - Equal Housing Lender disclosure is present', async ({ page }) => {
    await expect(page.getByText(/equal housing lender/i)).toBeVisible();
    await expect(page.getByText(/wells fargo home mortgage.*division/i)).toBeVisible();
  });

  // ------------------------------------------------- Step navigation basics
  test('TC_FR001_31 - Answering Step 1 question advances to Step 2', async ({ page }) => {
    const step1 = page.getByText(/question 1/i).first();
    await expect(step1).toBeVisible();
    const firstOption = page.getByRole('button', { name: /just starting my search|ready to make an offer|need a loan now/i }).first();
    await expect(firstOption).toBeVisible();
    await firstOption.click();
    await expect(page.getByText(/step 2 of 6/i)).toBeVisible({ timeout: 15_000 });
  });

  test('TC_FR001_32 - Progress indicator advances as steps complete', async ({ page }) => {
    const progress = page.getByText(/step \d of 6/i).first();
    await expect(progress).toBeVisible();
    const before = await progress.textContent();
    const firstOption = page.getByRole('button', { name: /just starting my search|ready to make an offer|need a loan now/i }).first();
    await firstOption.click();
    await expect(page.getByText(/step 2 of 6/i)).toBeVisible({ timeout: 15_000 });
    const after = await page.getByText(/step \d of 6/i).first().textContent();
    expect(after).not.toBe(before);
  });

  test('TC_FR001_33 - Back navigation returns to the previous step', async ({ page }) => {
    const firstOption = page.getByRole('button', { name: /just starting my search|ready to make an offer|need a loan now/i }).first();
    await firstOption.click();
    await expect(page.getByText(/step 2 of 6/i)).toBeVisible({ timeout: 15_000 });
    await page.getByRole('button', { name: /back/i }).click();
    await expect(page.getByText(/step 1 of 6/i)).toBeVisible({ timeout: 15_000 });
  });

  test('TC_FR001_34 - Previous answer is retained after back navigation', async ({ page }) => {
    const firstOption = page.getByRole('button', { name: /just starting my search|ready to make an offer|need a loan now/i }).first();
    await firstOption.click();
    await expect(page.getByText(/step 2 of 6/i)).toBeVisible({ timeout: 15_000 });
    await page.getByRole('button', { name: /back/i }).click();
    await expect(page.getByText(/step 1 of 6/i)).toBeVisible({ timeout: 15_000 });
    // DEF-06: app does not visually retain the selected answer after Back navigation
    await expect(page.getByRole('button', { name: /just starting my search/i })).toHaveAttribute('aria-pressed', 'true');
  });

  // ------------------------------------------------- Validation and errors
  test('TC_FR001_35 - Cannot advance without answering the current question', async ({ page }) => {
    const nextButton = page.getByRole('button', { name: /next|continue/i });
    if (await nextButton.count()) {
      await nextButton.click();
      await expect(page.getByText(/step 1 of 6/i)).toBeVisible();
      await expect(page.getByText(/required|select an option|please answer/i).first()).toBeVisible();
    }
  });

  // ------------------------------------------------- Resilience
  test('TC_FR001_36 - Page works with tracking params stripped', async ({ page }) => {
    const response = await page.goto('https://web.secure.wellsfargo.com/mortgage/get-prequalified/?src=buy', { waitUntil: 'load' });
    expect(response?.status()).toBe(200);
    await expect(page.getByText(/step 1 of 6/i)).toBeVisible();
  });

  test('TC_FR001_37 - Refresh mid-flow keeps the user in the flow', async ({ page }) => {
    const firstOption = page.getByRole('button', { name: /just starting my search|ready to make an offer|need a loan now/i }).first();
    await firstOption.click();
    await expect(page.getByText(/step 2 of 6/i)).toBeVisible({ timeout: 15_000 });
    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(page.getByText(/step \d of 6/i).first()).toBeVisible({ timeout: 15_000 });
  });

  // ------------------------------------------------- Accessibility
  test('TC_FR001_38 - Step questions are keyboard navigable', async ({ page }) => {
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus');
    await expect(focused).toBeVisible();
  });

  test('TC_FR001_39 - Page has no console errors on load', async ({ page }) => {
    const errors = await collectConsoleErrors(page, async () => {
      await page.goto(prequalUrl, { waitUntil: 'domcontentloaded' });
    });
    expect(errors).toEqual([]);
  });

  // ------------------------------------------------- Cross-browser
  test('TC_FR001_40 - Prequal landing renders on supported browsers', async ({ page }) => {
    // Runs on chromium, firefox and webkit via playwright.config.ts projects.
    await expect(page.getByText(/get your personalized purchase rate quote/i).first()).toBeVisible();
    await expect(page.getByText(/step 1 of 6/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /just starting my search|ready to make an offer|need a loan now/i }).first()).toBeVisible();
  });
});
