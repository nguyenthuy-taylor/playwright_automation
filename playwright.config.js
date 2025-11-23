// @ts-check

import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }], ['list']],
  use: {
    trace: 'retain-on-failure',
    baseURL: 'http://localhost/orangehrm/web/index.php/auth/login',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  globalSetup: './tests/login/login.setup.js',


  projects: [
    {
      name: 'dev',
      use: {
        ...devices['Desktop Chrome'], storageState: 'storage/authState.json',
        baseURL: 'http://host.docker.internal/orangehrm/web/index.php/auth/login'
      }

    },

    {
      name: 'test',
      use: {
        ...devices['Desktop Chrome'], storageState: 'storage/authState.json',
        baseURL: 'http://localhost/orangehrm/web/index.php/dashboard/index'
      }

    },

    {
      name: 'staging',
      use: {
        ...devices['Desktop Chrome'], storageState: 'storage/authState.json',
        baseURL: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
      }

    }

  ],

  webServer: {
    command: '',
    url: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
    reuseExistingServer: true,
    timeout: 120 * 1000
  }



});

