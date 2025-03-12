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

// "rounded-2 duration-75 shadow-sm hover:shadow-lg border hover:border-primary overflow-hidden w-full
// hover:bg-gradient-to-br hover:from-white hover:to-amber-50"div class="px-6 py-4"><div class="font-bold text-xl mb-2 text-main">Hotdog</div> <p class="text-gray-600 text-sm mb-2"><span class="font-semibold">Cooking Difficulty:</span> 1</p> <p class="text-gray-700 text-base"><span class="font-semibold">Rating:</span><br> 5</p> <p class="text-gray-700 text-base"><span class="font-semibold">Price:</span><br> 4</p></div> <a href="/recipes/1"><div class="px-6 py-4"><button class="bg-main hover:bg-main_dark text-white font-bold py-2 px-4 rounded">View Recipe</button></div></a></div>

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