import { BasePage } from '../BasePage.js';
export class SidebarComponent extends BasePage {
    constructor(page) {
        super(page);
        this.adminOption = page.locator('.oxd-main-menu-item-wrapper span:has-text("Admin")');
    }

    async goToAdmin() {
        await this.click(this.adminOption);
    }
}
