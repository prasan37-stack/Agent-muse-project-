/** Random valid/invalid test data generators for the mortgage calculator forms. */

const STATES = ['New Jersey', 'California', 'Texas', 'New York', 'Florida'];
const COUNTIES: Record<string, string[]> = {
  'New Jersey': ['Gloucester', 'Camden', 'Bergen'],
  California: ['Los Angeles', 'Orange', 'San Diego'],
  Texas: ['Harris', 'Dallas', 'Travis'],
  'New York': ['Kings', 'Queens', 'Erie'],
  Florida: ['Miami-Dade', 'Broward', 'Orange'],
};

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomState(): string {
  return STATES[randomInt(0, STATES.length - 1)];
}

export function randomCounty(state: string): string {
  const counties = COUNTIES[state] ?? ['Gloucester'];
  return counties[randomInt(0, counties.length - 1)];
}

/** Returns a home value within Playwright's supported minimum/maximum bounds. */
export function randomValidHomeValue(): number {
  return randomInt(50_000, 10_000_000);
}

/** Returns a loan amount strictly less than the given home value. */
export function randomValidLoanAmount(homeValue: number): number {
  return randomInt(1_000, homeValue - 1_000);
}

export function randomInvalidAmount(): string {
  const invalid = ['FourHundredK', '$500,000!', '-10000', '0', 'abc123'];
  return invalid[randomInt(0, invalid.length - 1)];
}
