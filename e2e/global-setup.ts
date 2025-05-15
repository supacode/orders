import { chromium } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch();

  // Any global setup can go here
  // For example, setting up authentication, database state, etc.

  await browser.close();
}

export default globalSetup;
