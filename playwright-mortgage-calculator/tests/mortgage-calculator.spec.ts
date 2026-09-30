import { test, expect } from '@playwright/test';
import { MortgageCalculatorPage } from '../pages/MortgageCalculatorPage';

test.describe('FR001 - Mortgage Calculator', () => {
  let calc: MortgageCalculatorPage;

  test.beforeEach(async ({ page }) => {
    calc = new MortgageCalculatorPage(page);
    await calc.goto();
  });

  // ---------------------------------------------------------------- Page Load
  test('TC_FR001_01 - calculator URL loads successfully', async ({ page }) => {
    const response = await page.goto(calc.url, { waitUntil: 'load' });
    expect(response?.status()).toBe(200);
    await expect(calc.pageHeader).toBeVisible();
    await expect(calc.calculateButton).toBeVisible();
  });

  test('TC_FR001_02 - page elements render on supported browsers', async () => {
    // Runs on chromium, firefox and webkit via playwright.config.ts projects.
    await expect(calc.pageHeader).toBeVisible();
    await expect(calc.loanPurpose).toBeVisible();
    await expect(calc.homeValue).toBeVisible();
    await expect(calc.loanAmount).toBeVisible();
    await expect(calc.stateSelect).toBeVisible();
    await expect(calc.calculateButton).toBeVisible();
  });

  // ------------------------------------------------------------ Loan Purpose
  test('TC_FR001_03 - Loan Purpose dropdown shows Purchase option', async () => {
    const options = await calc.selectOptions(calc.loanPurpose);
    expect(options).toContain('Purchase');
    await calc.loanPurpose.selectOption({ label: 'Purchase' });
    await expect(calc.loanPurpose).toHaveValue(/purchase/i);
  });

  test('TC_FR001_04 - Loan Purpose dropdown shows Refinance option', async () => {
    const options = await calc.selectOptions(calc.loanPurpose);
    expect(options).toContain('Refinance');
    await calc.loanPurpose.selectOption({ label: 'Refinance' });
    await expect(calc.loanPurpose).toHaveValue(/refinance/i);
  });

  test('TC_FR001_05 - Loan Purpose is mandatory', async ({ page }) => {
    await calc.homeValue.fill('500000');
    await calc.loanAmount.fill('400000');
    await calc.stateSelect.selectOption({ label: 'New Jersey' });
    await calc.countySelect.selectOption({ label: 'Gloucester' });
    await calc.calculateButton.click();
    await expect(page.getByText(/loan purpose is required/i)).toBeVisible();
  });

  // -------------------------------------------------------------- Home Value
  test('TC_FR001_06 - Home Value accepts minimum valid amount', async ({ page }) => {
    await calc.homeValue.fill('50000');
    await calc.homeValue.press('Tab');
    await expect(page.getByText(/valid number/i)).toBeHidden();
  });

  test('TC_FR001_07 - Home Value accepts maximum valid amount', async ({ page }) => {
    await calc.homeValue.fill('10000000');
    await calc.homeValue.press('Tab');
    await expect(page.getByText(/valid number|exceeds/i)).toBeHidden();
  });

  test('TC_FR001_08 - Home Value accepts decimal values', async () => {
    await calc.homeValue.fill('450000.50');
    await calc.homeValue.press('Tab');
    await expect(calc.homeValue).toHaveValue(/450,?000\.50/);
  });

  test('TC_FR001_09 - Home Value rejects alphabetic characters', async ({ page }) => {
    await calc.homeValue.fill('FourHundredK');
    await calc.homeValue.press('Tab');
    await expect(page.getByText(/please enter a valid number/i)).toBeVisible();
  });

  test('TC_FR001_10 - Home Value rejects special characters', async ({ page }) => {
    await calc.homeValue.fill('$500,000!');
    await calc.homeValue.press('Tab');
    await expect(page.getByText(/please enter a valid number/i)).toBeVisible();
  });

  // ------------------------------------------------------------- Loan Amount
  test('TC_FR001_11 - Loan Amount accepts valid amount below Home Value', async ({ page }) => {
    await calc.homeValue.fill('500000');
    await calc.loanAmount.fill('400000');
    await calc.loanAmount.press('Tab');
    await expect(page.getByText(/valid number|exceed/i)).toBeHidden();
  });

  test('TC_FR001_12 - Loan Amount rejects zero and negative values', async ({ page }) => {
    for (const value of ['0', '-10000']) {
      await calc.loanAmount.fill(value);
      await calc.loanAmount.press('Tab');
      await expect(page.getByText(/loan amount must be greater than \$0/i)).toBeVisible();
    }
  });

  test('TC_FR001_13 - Loan Amount rejects value greater than Home Value', async ({ page }) => {
    await calc.loanPurpose.selectOption({ label: 'Purchase' });
    await calc.homeValue.fill('300000');
    await calc.loanAmount.fill('350000');
    await calc.stateSelect.selectOption({ label: 'New Jersey' });
    await calc.countySelect.selectOption({ label: 'Gloucester' });
    await calc.calculateButton.click();
    await expect(page.getByText(/loan amount cannot exceed home value|ltv/i)).toBeVisible();
  });

  test('TC_FR001_14 - Loan Amount accepts decimal values', async () => {
    await calc.homeValue.fill('500000');
    await calc.loanAmount.fill('399999.99');
    await calc.loanAmount.press('Tab');
    await expect(calc.loanAmount).toHaveValue(/399,?999\.99/);
  });

  test('TC_FR001_15 - Loan Amount is mandatory', async ({ page }) => {
    await calc.loanPurpose.selectOption({ label: 'Purchase' });
    await calc.homeValue.fill('500000');
    await calc.stateSelect.selectOption({ label: 'New Jersey' });
    await calc.countySelect.selectOption({ label: 'Gloucester' });
    await calc.calculateButton.click();
    await expect(page.getByText(/loan amount is required/i)).toBeVisible();
  });

  // ---------------------------------------------------------------- Location
  test('TC_FR001_16 - State dropdown lists all 50 states plus DC, sorted A-Z', async () => {
    const options = (await calc.selectOptions(calc.stateSelect))
      .map((o) => o.trim())
      .filter((o) => o && !/select/i.test(o));
    expect(options).toHaveLength(51);
    expect(options).toContain('New Jersey');
    const sorted = [...options].sort((a, b) => a.localeCompare(b));
    expect(options).toEqual(sorted);
  });

  test('TC_FR001_17 - State dropdown defaults to blank / Select State', async () => {
    const value = await calc.stateSelect.inputValue();
    expect(value === '' || /select/i.test(value)).toBeTruthy();
  });

  test('TC_FR001_18 - County dropdown disabled until State is selected', async () => {
    await expect(calc.countySelect).toBeDisabled();
  });

  test('TC_FR001_19 - County list filters to the selected state', async () => {
    await calc.stateSelect.selectOption({ label: 'New Jersey' });
    await expect(calc.countySelect).toBeEnabled();
    const counties = await calc.selectOptions(calc.countySelect);
    expect(counties).toContain('Gloucester');
    expect(counties.join(' ')).not.toMatch(/Los Angeles|Cook County/i);
  });

  // ---------------------------------------------------------- Calculate Flow
  test('TC_FR001_20 - Calculate enables only when all required fields are valid', async () => {
    await expect(calc.calculateButton).toBeDisabled();
    await calc.fillValidForm();
    await expect(calc.calculateButton).toBeEnabled();
  });

  test('TC_FR001_21 - Calculate triggers API call with valid payload', async ({ page }) => {
    await calc.fillValidForm();
    const [response] = await Promise.all([
      page.waitForResponse((r) => r.request().method() === 'POST' && r.status() === 200),
      calc.calculateButton.click(),
    ]);
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

  test('TC_FR001_22 - API timeout is handled gracefully', async ({ page }) => {
    // Simulate a >30s backend delay; adjust the route matcher to the real endpoint.
    await page.route('**/rate_calc/**', async (route) => {
      await new Promise((r) => setTimeout(r, 35_000));
      await route.abort();
    });
    await calc.fillValidForm();
    await calc.calculateButton.click();
    await expect(calc.loadingSpinner).toBeVisible();
    await expect(page.getByText(/request timed out/i)).toBeVisible({ timeout: 45_000 });
  });

  test('TC_FR001_23 - results page shows estimated rate range', async ({ page }) => {
    await calc.fillValidForm();
    await calc.calculateButton.click();
    const rate = page.getByText(/estimated rate/i);
    await expect(rate).toBeVisible();
    await expect(page.getByText(/%.*apr|apr.*%/i)).toBeVisible();
    await expect(page.getByText(/disclaimer/i)).toBeVisible();
  });

  test('TC_FR001_24 - results page shows monthly payment breakdown', async ({ page }) => {
    await calc.fillValidForm();
    await calc.calculateButton.click();
    await expect(page.getByText(/monthly payment/i)).toBeVisible();
    await expect(page.getByText(/principal.*interest|p&i/i)).toBeVisible();
    await expect(page.getByText(/taxes/i)).toBeVisible();
    await expect(page.getByText(/insurance/i)).toBeVisible();
  });

  test('TC_FR001_25 - Start Over / Edit returns to the input page', async ({ page }) => {
    await calc.fillValidForm();
    await calc.calculateButton.click();
    await expect(page.getByText(/estimated rate/i)).toBeVisible();
    await page.getByRole('button', { name: /start over|edit/i }).first().click();
    await expect(page).toHaveURL(/input_page/);
    await expect(calc.calculateButton).toBeVisible();
  });
});
