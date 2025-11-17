// @ts-check

import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    baseURL: 'http://host.docker.internal/orangehrm/web/index.php',
  },

  globalSetup: './tests/login/login.setup.js',


  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: 'storage/authState.json' },
      testDir: './tests'
    },

    {
      name: 'staging',
      use: {
        ...devices['Desktop Chrome'], storageState: 'storage/authState.json',
        baseURL: 'https://sotatek.udemy.com/course/playwright-with-cucumber-bdd-typescript-beginner-to-pro/learn/lecture/45258747#overview'
      }

    },

    {
      name: 'docker',
      use: {
        ...devices['Desktop Chrome'], storageState: 'storage/authState.json',
        baseURL: 'http://host.docker.internal/orangehrm/web/index.php'
      }

    }

  ],

  webServer: {
    command: '',
    url: 'http://host.docker.internal/orangehrm/web/index.php/dashboard/index',
    reuseExistingServer: true,
    timeout: 120 * 1000
  }



});

