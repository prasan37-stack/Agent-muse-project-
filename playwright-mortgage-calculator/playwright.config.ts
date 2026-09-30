import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 1,
  reporter: 'html',
  use: {
    baseURL: 'https://www.wellsfargo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  // TC_FR001_02 (cross-browser rendering) runs across all three projects.
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
