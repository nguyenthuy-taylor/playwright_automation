import { mergeTests } from '@playwright/test';
import { test as base } from '@playwright/test'
import { authTest } from './authFixture.js'
import { userTest } from './userFixture.js'

export const My_Test = mergeTests(authTest, userTest);