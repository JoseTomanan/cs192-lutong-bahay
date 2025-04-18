import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[type="text"]', 'testuser');
  await page.fill('input[type="password"]', 'thisispw');
  await page.click('button[type="submit"]');
  await page.waitForURL('/home', { timeout: 5000 }); // Wait until redirected after login
});

test.afterEach(async ({ page }) => {
  await page.unroute('/api/recipes/get-recipes/');
});

test.describe('Database connection', () => {
  test('should alert when cannot connect to database', async ({ page, browserName }) => {
    await page.goto('/recipes');
    await page.waitForLoadState('networkidle'); // Ensure the page fully loads before proceeding

    await page.route('/api/recipes/get-recipes/', route => route.abort());

    page.on('dialog', async (dialog) => {
      console.log(`Alert message: ${dialog.message()}`);

      // if (browserName === 'firefox')
      //   expect(dialog.message()).toBe('No recipes found');
      // else
      expect(dialog.message()).toBe('No database connection');

      await dialog.accept();
    });

    await page.fill('input[type="search"]', 'Hotdog');
    await page.click('button[type="submit"]');

    await page.waitForLoadState('networkidle'); // Ensure request completes before proceeding
  });
});
