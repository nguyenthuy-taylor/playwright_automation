// @ts-nocheck
import { expect } from '@playwright/test';
import { My_Test as test } from '../../fixtures/baseFixture.js';
import { AdminPage } from '../../pages/admin/AdminPage.js';
import { generateUserData } from '../../utils/dataGenerator.js';

const newUser = generateUserData()

test.describe.serial('User Management Tests', () => {
  test('Add New User', async ({ loggedInPage }) => {
    const adminPage = new AdminPage(loggedInPage);
    const userPage = await adminPage.goToUserManagement();
    await userPage.addNewUser(newUser);
  });

  test('Delete User', async ({ loggedInPage }) => {
    const adminPage = new AdminPage(loggedInPage);
    const userPage = await adminPage.goToUserManagement();
    await userPage.deleteUser(newUser.username);

  });
})
