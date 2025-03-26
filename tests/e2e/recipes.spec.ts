import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[type="text"]', 'admin');
  await page.fill('input[type="password"]', 'adminadmin');
  await page.click('button[type="submit"]');
  await page.waitForURL('/admin', { timeout: 5000 }); // Wait for navigation after login
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
    // { type: 'ingredients', order: 'ascending' },
    // { type: 'ingredients', order: 'descending' }
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

test.describe('Recipe interactions', () => {
  test('UC0-S3: New recipe is successfully added', async ({ page }) => {
    await page.goto('/submit_recipe');
    await page.waitForLoadState('domcontentloaded');

    // Debug: Check if page loaded properly
    // console.log('Page loaded: /submit_recipe');

    // Fill out the form
    await page.waitForSelector('input[id="recipeName"]', { state: 'visible' });
    await page.fill('input[id="recipeName"]', 'Test Recipe');
    await page.fill('input[id="servings"]', '4');
    await page.fill('input[id="price"]', '10');
    await page.fill('input[id="cookDifficulty"]', '2');
    await page.fill('input[id="instructions"]', 'Test instructions');
    await page.selectOption('select', { label: 'hotdog' });

    // Add ingredient
    await page.fill('input[id="ingredientQuantity"]', '2');
    await page.click('input[value="Add Ingredient"]');

    // Add equipment
    await page.fill('input[id="equipmentName"]', 'Test equipment');
    await page.fill('input[id="equipmentQuantity"]', '1');
    await page.click('input[value="Add Equipment"]');

    // Debug: Print field values before submission
    // const recipeName = await page.inputValue('input[id="recipeName"]');
    // console.log('Recipe Name:', recipeName);

    // Submit the recipe
    await page.click('button:has-text("Submit Recipe")');
    // console.log('Clicked submit button.');

    // Capture network activity
    // page.on('request', (request) => console.log('>>', request.method(), request.url()));
    // page.on('response', (response) => console.log('<<', response.status(), response.url()));

    // Ensure the submission is processed
    await page.waitForLoadState('networkidle'); 

    // Navigate to the recipes page
    await page.goto('/recipes');
    await page.waitForLoadState('domcontentloaded');

    // Search for the newly added recipe
    await page.waitForSelector('input[type="search"]', { state: 'visible' });
    await page.fill('input[type="search"]', 'Test Recipe');
    await page.click('button[type="submit"]');

    // Ensure recipes are displayed
    await page.waitForSelector('.RecipeCard', { state: 'visible', timeout: 10000 });

    // Debug: Print all recipe cards
    // const cards = await page.locator('.RecipeCard').allInnerTexts();
    // console.log("Recipe Cards Found: ", cards);

    // Assert that the recipe appears
    await expect(
      page.locator('.RecipeCard')
        .filter({ hasText: 'Test Recipe' })
        .locator('div.font-bold.text-xl.mb-2.text-main')
    ).toBeVisible({ timeout: 10000 });
  });

  test('UC0-S4 Recipe is successfully updated', async ({ page }) => {
  });

  test('UC0-S5 Recipe is successfully deleted', async ({ page }) => {
  });

  test('UC0-S6: Comment by user is successfully deleted', async ({ page }) => {
  });

  test('UC0-S7 User is successfully suspended', async ({ page }) => {
  });

  test('UC3-S1: Rating for current recipe is successfully posted', async ({ page }) => {
  });
 
  test('UC3-S3: Comment for current recipe is successfully posted', async ({ page }) => {
  });



});