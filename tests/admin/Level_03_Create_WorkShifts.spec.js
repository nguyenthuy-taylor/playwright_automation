import { My_Test as test } from '../../fixtures/baseFixture.js';
import { expect } from '@playwright/test';
import { AdminPage } from '../../pages/admin/AdminPage.js';


test('Add New WorkShift', async ({ loggedInPage, newWorkShiftData }) => {
    const adminPage = new AdminPage(loggedInPage);
    const workShift = await adminPage.goToWorkShift();
    await workShift.addNewWorkShift(newWorkShiftData);
    await expect(await workShift.veriFyHourDurationPerDay(newWorkShiftData.shiftName)).toBeTruthy();

})