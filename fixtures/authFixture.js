import { test as base } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.dev' });

export const authTest = base.extend({
    loggedInPage: async ({ }, use) => {
        const browser = await base.chromium.launch({ headless: true });
        const context = await browser.newContext({ storageState: 'storage/authState.json' });
        const page = await context.newPage();
        await page.goto(process.env.BASE_URL);
        await page.waitForLoadState('networkidle');
        await use(page);
        await context.close();
    }

});


export { expect } from '@playwright/test';