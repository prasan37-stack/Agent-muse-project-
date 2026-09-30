import { Page, Response } from '@playwright/test';

/** Waits for the next POST response matching the given URL substring/regex. */
export async function waitForApiResponse(
  page: Page,
  urlMatch: string | RegExp,
  action: () => Promise<void>
): Promise<Response> {
  const [response] = await Promise.all([
    page.waitForResponse(
      (r) =>
        r.request().method() === 'POST' &&
        (typeof urlMatch === 'string' ? r.url().includes(urlMatch) : urlMatch.test(r.url()))
    ),
    action(),
  ]);
  return response;
}

/** Formats a number as a US currency string, e.g. 450000.5 -> "450,000.50". */
export function formatCurrency(value: number): string {
  return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/** Collects console/page errors observed while `action` runs; returns the messages. */
export async function collectConsoleErrors(page: Page, action: () => Promise<void>): Promise<string[]> {
  const errors: string[] = [];
  const onPageError = (e: Error) => errors.push(e.message);
  const onConsole = (m: { type(): string; text(): string }) => {
    if (m.type() === 'error') errors.push(m.text());
  };
  page.on('pageerror', onPageError);
  page.on('console', onConsole);
  try {
    await action();
  } finally {
    page.off('pageerror', onPageError);
    page.off('console', onConsole);
  }
  return errors;
}
