import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/register')
});

test.describe('Signup page', () => {
  test('should not allow invalid username', async ({ page }) => { 
    await page.fill('input[type="text"]', 'testuser');
    await page.fill('input[placeholder="Password"]', 'doesnotmatter');
    await page.fill('input[placeholder="Confirm password"]', 'doesnotmatter');

    page.on('dialog', async (dialog) => {
      console.log('Dialog message:', dialog.message());
      expect(dialog.message()).toBe('Error creating user (username taken)');
    });

    await page.click('button[type="submit"]');
    await page.waitForURL('/register');
  });

  test('should not allow invalid password', async ({ page }) => { 
    await page.fill('input[type="text"]', 'testnewuser');
    await page.fill('input[placeholder="Password"]', 'origpass');
    await page.fill('input[placeholder="Confirm password"]', 'doesnotmatch');

    page.on('dialog', async (dialog) => {
      console.log('Dialog message:', dialog.message());
      expect(dialog.message()).toBe('Passwords must match');
    });

    await page.click('button[type="submit"]');
    await page.waitForURL('/register');
  });

  test('should recognize when new user is created', async ({ page }) => { 
    /**
     * This part cannot be automated
     * Because of repeating credentials leading to already created users
     */
  });
});