import { BasePage } from "../BasePage";
import { expect } from '@playwright/test';

export class HeaderComponent extends BasePage {
    constructor(page) {
        super(page);
        this.mainTitle = page.locator('.orangehrm-main-title');
    }

    async goToMenuOption(menuGroup, option) {
        const tgtMenuOption = this.page.locator('span.oxd-topbar-body-nav-tab-item', { hasText: menuGroup });
        await tgtMenuOption.waitFor({ state: 'visible' });
        await tgtMenuOption.click();

        const targetOption = this.page.locator('.oxd-dropdown-menu a', { hasText: option });
        await targetOption.waitFor({ state: 'visible' });
        await targetOption.click();

        await expect(this.mainTitle).toHaveText(option);
    }

}
