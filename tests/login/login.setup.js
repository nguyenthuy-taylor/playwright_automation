// setup/login.setup.js
import dotenv from 'dotenv';
dotenv.config({ path: '.env.dev' });

import { chromium } from '@playwright/test';
import fs from 'fs';

export default async () => {
  if (!fs.existsSync('storage', { recursive: true })) {
    fs.mkdirSync('storage');
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(process.env.BASE_URL);

  const token = await page.getAttribute('input[name="_token"]', 'value');
  console.log('_token:', token);

  await page.getByPlaceholder('Username').fill(process.env.ADMIN_USER);
  await page.getByPlaceholder('Password').fill(process.env.ADMIN_PASS);

  await page.evaluate((token) => {
    document.querySelector('input[name="_token"]').value = token;
  }, token);
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForLoadState('networkidle');
  await page.waitForSelector("//h6[text()='Dashboard']", { timeout: 3000 });

  await context.storageState({ path: 'storage/authState.json' });
  await browser.close();
};
