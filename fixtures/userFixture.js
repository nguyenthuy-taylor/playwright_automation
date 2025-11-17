import { test as base } from '@playwright/test'
import { generateUserData, generateWorkShiftData } from '../utils/dataGenerator'

export const userTest = base.extend({
    newUser: async ({ }, use) => {
        const user = generateUserData();
        await use(user)
    },
    newWorkShiftData: async ({ }, use) => {
        const newWorkShift = generateWorkShiftData();
        await use(newWorkShift)
    }
});