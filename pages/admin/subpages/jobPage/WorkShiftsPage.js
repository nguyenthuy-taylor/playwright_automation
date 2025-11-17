import { BasePage } from "../../../BasePage";
import { expect } from "@playwright/test";
import { NotificationHelper } from '../../../../helpers/NotificationHelper'

export class WorkShiftsPage extends BasePage {
    constructor(page) {
        super(page)
        this.addButton = page.locator('.oxd-button', { hasText: 'Add' });
        this.mainTitle = page.locator('h6.orangehrm-main-title')
        this.shiftNameTextbox = page.locator("//label[normalize-space()='Shift Name']/parent::div/following-sibling::div/input");
        this.assignedEmployeesTextBox = page.locator("//label[normalize-space()='Assigned Employees']/parent::div/following-sibling::div//input")
        this.assignedSuggestBox = page.locator('div[role="listbox"] span')
        this.fromWorkingHours = page.locator("//label[normalize-space()='From']/parent::div/following-sibling::div//i")
        this.toWorkingHours = page.locator("//label[normalize-space()='To']/parent::div/following-sibling::div//i")
        this.timePicker = page.locator('.oxd-time-picker')
        this.hourInput = page.locator('.oxd-time-picker input.oxd-time-hour-input-text')
        this.minuteInput = page.locator('.oxd-time-picker input.oxd-time-minute-input-text')
        this.amTimePeriod = page.locator('.oxd-time-period-input input[name="am"]')
        this.pmTimePeriod = page.locator('.oxd-time-period-input input[name="pm"]')
        this.saveButton = page.locator('button[type="submit"]');
        this.container = page.locator('.orangehrm-container')
        this.rows = page.locator('.oxd-table-body .oxd-table-row')
    }

    async addNewWorkShift({ shiftName, startHour, startMinute, toHour, toMinute, employeeName }) {
        await this.click(this.addButton);
        await expect(this.mainTitle).toHaveText('Add Work Shift')
        await this.fill(this.shiftNameTextbox, shiftName)
        await this.fromWorkingHours.click();
        await this.fill(this.hourInput, startHour)
        await this.fill(this.minuteInput, startMinute)
        await this.click(this.amTimePeriod)
        await this.toWorkingHours.click();
        await this.fill(this.hourInput, toHour)
        await this.fill(this.minuteInput, toMinute)
        await this.click(this.amTimePeriod)
        await this.searchAndSelectSuggestedItem(this.assignedEmployeesTextBox, employeeName, this.assignedSuggestBox, employeeName)
        await this.click(this.saveButton)
        await this.notificationHelper.waitForLoadingFired()
        await this.container.waitFor({ state: 'visible' })
    }

    async veriFyHourDurationPerDay(shiftName) {
        const targetRow = this.rows.filter({
            has: this.page.locator('.oxd-table-cell div', { hasText: `${shiftName}` })
        });

        const targetCells = targetRow.locator('.oxd-table-cell > div');

        const fromTimeText = (await targetCells.nth(2).textContent())?.trim();
        const toTimeText = (await targetCells.nth(3).textContent())?.trim();
        const hourPerDayText = (await targetCells.nth(4).textContent())?.trim();

        const expectedHours = parseFloat(hourPerDayText);

        // --- Parse FROM ---
        const [fromHM, fromPeriod] = fromTimeText.split(" ");
        const [fromHour, fromMinute] = fromHM.split(":").map(Number);

        // --- Parse TO ---
        const [toHM, toPeriod] = toTimeText.split(" ");
        const [toHour, toMinute] = toHM.split(":").map(Number);

        // Convert to 24h format
        const fromH24 = fromPeriod === "PM" && fromHour !== 12 ? fromHour + 12 :
            fromPeriod === "AM" && fromHour === 12 ? 0 : fromHour;

        const toH24 = toPeriod === "PM" && toHour !== 12 ? toHour + 12 :
            toPeriod === "AM" && toHour === 12 ? 0 : toHour;

        // Total minutes
        const fromTotalMin = fromH24 * 60 + fromMinute;
        const toTotalMin = toH24 * 60 + toMinute;

        // Duration in hours (float)
        const durationHours = (toTotalMin - fromTotalMin) / 60;

        // Compare with expected
        return Math.abs(durationHours - expectedHours) < 0.01;
    }


}