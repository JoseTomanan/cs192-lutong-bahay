import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[type="text"]', 'testuser');
  await page.fill('input[type="password"]', 'thisispw');
  await page.click('button[type="submit"]');
  await page.waitForURL('/home', { timeout: 5000 }); // Wait for navigation after login
});

test.describe('Recipe search', () => {
  test('should show no results when invalid', async ({ page }) => {
    await page.goto('/recipes');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('input[type="search"]');

    await page.fill('input[type="search"]', 'nonexistentrecipe');
    await page.click('button[type="submit"]');

    await page.waitForSelector('.RecipeCard', { state: 'hidden' }); // Ensure no recipes are displayed
  });

  test('should show results when valid', async ({ page }) => {
    await page.goto('/recipes');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('input[type="search"]');

    await page.fill('input[type="search"]', 'Hotdog');
    await page.click('button[type="submit"]');

    await page.waitForLoadState('networkidle'); // Wait for network requests to finish
    await page.waitForSelector('.RecipeCard', { state: 'visible' }); // Ensure recipes are displayed
  });
});


test.describe('Recipe sort', () => {
  const sortOptions = [
    { type: 'cookDifficulty', order: 'ascending' },
    { type: 'cookDifficulty', order: 'descending' },
    { type: 'price', order: 'ascending' },
    { type: 'price', order: 'descending' },
    { type: 'ratings', order: 'ascending' },
    { type: 'ratings', order: 'descending' },
    { type: 'ingredients', order: 'ascending' },
    { type: 'ingredients', order: 'descending' }
  ];

  for (const { type, order } of sortOptions) {
    test(`should properly display sort by ${type}, ${order}`, async ({ page }) => {
      await page.goto('/recipes');
      await page.waitForLoadState('networkidle');
      await page.waitForSelector('input[type="search"]');

      await page.getByRole('combobox').first().selectOption(type);
      await page.getByRole('combobox').nth(1).selectOption(order);

      await page.waitForLoadState('networkidle'); // Wait for sorting request to complete

      const values = await page.$$eval(`.RecipeCard .${type}`, nodes =>
        nodes.map(n => n.textContent?.trim())
      );

      const sortedValues = order === 'ascending' ? [...values].sort() : [...values].sort().reverse();
      expect(values).toEqual(sortedValues);
    });
  }
});