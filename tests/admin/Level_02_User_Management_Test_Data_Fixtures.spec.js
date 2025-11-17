// @ts-nocheck
import { expect } from '@playwright/test';
import { My_Test as test } from '../../fixtures/baseFixture.js';
import { AdminPage } from '../../pages/admin/AdminPage.js';
import { generateUserData } from '../../utils/dataGenerator.js';

test('Add and Delete User', async ({ loggedInPage, newUser }) => {
  const adminPage = new AdminPage(loggedInPage);
  const userPage = await adminPage.goToUserManagement();

  await test.step('Add New User', async () => {
    await userPage.addNewUser(newUser);
  })

    await test.step('Delete Added User', async () => {
    await userPage.deleteUser(newUser.username);
  })

});

