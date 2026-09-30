/** Centralized environment/config values used across the test suite. */

export const config = {
  baseUrl: process.env.BASE_URL ?? 'https://www.wellsfargo.com',
  mortgageCalculatorPath: '/mortgage/rates/',
  prequalifiedUrl:
    process.env.PREQUAL_URL ??
    'https://web.secure.wellsfargo.com/mortgage/get-prequalified/?src=buy&refdm=DMIWE7AW9T',
  defaultTimeout: Number(process.env.TEST_TIMEOUT ?? 15_000),
  apiTimeout: Number(process.env.API_TIMEOUT ?? 45_000),
};
