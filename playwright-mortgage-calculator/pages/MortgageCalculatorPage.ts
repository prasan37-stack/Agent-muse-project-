import { Page, Locator } from '@playwright/test';

/**
 * Page Object for the FR001 Mortgage Calculator input page.
 *
 * NOTE: Locators below use accessible roles/labels first with CSS fallbacks.
 * Verify them against the live DOM before the first full run and adjust as needed.
 */
export class MortgageCalculatorPage {
  readonly page: Page;
  readonly url = '/mortgage/get-prequalified/?src=buy&refdm=DMIWE7AW9T';

  readonly pageHeader: Locator;
  readonly loanPurpose: Locator;
  readonly homeValue: Locator;
  readonly loanAmount: Locator;
  readonly stateSelect: Locator;
  readonly countySelect: Locator;
  readonly calculateButton: Locator;
  readonly loadingSpinner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeader = page.locator('header').first();
    this.loanPurpose = page.getByLabel(/loan purpose/i);
    this.homeValue = page.getByLabel(/home value/i);
    this.loanAmount = page.getByLabel(/loan amount/i);
    this.stateSelect = page.getByLabel(/^state$/i);
    this.countySelect = page.getByLabel(/county/i);
    this.calculateButton = page.getByRole('button', { name: /calculate rates and payments/i });
    this.loadingSpinner = page.getByRole('progressbar');
  }

  async goto() {
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
  }

  /** Fills every required field with the canonical valid data set (TC_FR001_21). */
  async fillValidForm() {
    await this.loanPurpose.selectOption({ label: 'Purchase' });
    await this.homeValue.fill('500000');
    await this.loanAmount.fill('400000');
    await this.stateSelect.selectOption({ label: 'New Jersey' });
    await this.countySelect.selectOption({ label: 'Gloucester' });
  }

  /** Returns the option labels of a <select>; override if the app uses custom dropdowns. */
  async selectOptions(select: Locator): Promise<string[]> {
    return select.locator('option').allTextContents();
  }
}
