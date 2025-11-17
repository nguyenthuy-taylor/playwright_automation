import { NotificationHelper } from '../helpers/NotificationHelper.js';
export class BasePage {
    constructor(page) {
        this.page = page;
        this.notificationHelper = new NotificationHelper(page);
    }

    async navigate(url) {
        await this.page.goto(url);
    }

    async click(element) {
        if (typeof element === 'string') {
            await this.page.click(element);
        } else {
            await element.click();
        }
    }

    async fill(element, text) {
        if (typeof element === 'string') {
            await this.page.fill(element, text);
        } else {
            await element.fill(text);
        }
    }
    async getText(element) {
        if (typeof element === 'string') {
            return await this.page.textContent(element);
        } else {
            return await element.textContent();
        }
    }

    async waitForVisible(selector, timeout = 5000) {
        if (typeof selector === 'string') {
            await this.page.waitForSelector(selector, { state: 'visible', timeout });
        } else {
            await selector.waitForElementState('visible', { timeout })
        }
    }

    async waitForHidden(selector, timeout = 5000) {
        if (typeof selector === 'string') {
            await this.page.waitForSelector(selector, { state: 'hidden', timeout });
        } else {
            await selector.waitForElementState('hidden', { timeout })
        }
    }

    async getCurrentURL() {
        return this.page.url();
    }

    async getAttribute(element, attribute) {
        if (typeof element === 'string') {
            return await this.page.getAttribute(element, attribute);
        } else {
            return await element.getAttribute(attribute);
        }
    }

    async getTitle() {
        return this.page.title();
    }

    // Only use with <select/option> elements
    async selectDropdown(element, value) {
        if (typeof element === 'string') {
            await this.page.selectOption(element, value);
        } else {
            await element.selectOption(value);
        }
    }

    async checkToCheckBox(element) {
        if (typeof element === 'string') {
            await this.page.check(element);
        } else {
            await element.check();
        }
    }

    async uncheckToCheckBox(element) {
        if (typeof element === 'string') {
            await this.page.uncheck(element);
        } else {
            await element.uncheck();
        }
    }

    async hoverOver(element) {
        if (typeof element === 'string') {
            await this.page.hover(element);
        } else {
            await element.hover();
        }

    }

    async selectCustomDropdown(parentElement, childElements, expectedText) {
        await parentElement.click({ timeout: 3000 });
        await childElements.first().waitFor({ state: 'visible' });
        const count = await childElements.count();
        if (count < 1) {
            throw new Error('No items found in the dropdown');
        }
        let found = false;
        for (let i = 0; i < count; i++) {
            const text = await childElements.nth(i).innerText();
            if (text.trim() === expectedText) {
                await childElements.nth(i).click();
                found = true;
                break;
            }
        }
        if (!found) {
            throw new Error(`Dropdown item "${expectedText}" not found`);
        }
    }

    async searchAndSelectSuggestedItem(inputElement,textToType, suggestedItems, expectedItem) {
        await this.fill(inputElement, textToType);
        await suggestedItems.first().waitFor({ state: 'visible' });
        const count = await suggestedItems.count();

        if (count < 1) {
            throw new Error('No suggested items found');
        }
        let found = false;
        for (let i = 0; i < count; i++) {
            const text = await suggestedItems.nth(i).innerText();
            if (text.trim() === expectedItem) {
                await suggestedItems.nth(i).click();
                found = true;
                break;
            }
        }
        if (!found) {
            throw new Error(`Suggested item "${expectedItem}" not found`);
        }
    }
}