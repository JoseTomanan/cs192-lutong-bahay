import { test, expect } from '@playwright/test';

test.describe('Recipe interactions', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/login');
      await page.fill('input[type="text"]', 'admin');
      await page.fill('input[type="password"]', 'adminadmin');
      await page.click('button[type="submit"]');
      await page.waitForURL('/admin', { timeout: 7000 });
      console.log('Logged in as admin');
    });

    test('UC3-S5 Recipe is successfully added to Saved', async ({ page }) => {
      await page.goto('/saved');
      await page.waitForTimeout(1000);
      await page.waitForLoadState('domcontentloaded');
      console.log('Navigated to /saved');
      await page.waitForSelector(`.RecipeCard:has-text("Filipino Spaghetti")`, { state: 'visible', timeout: 30000 });
    });
});