import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[type="text"]', 'admin');
  await page.fill('input[type="password"]', 'adminadmin');
  await page.click('button[type="submit"]');
  await page.waitForURL('/admin', { timeout: 5000 });
  console.log('Logged in as admin'); // Console log added
});

test.describe('Recipe interactions', () => {
  test('UC0-S3: New recipe is successfully added', async ({ page }) => {
    await page.goto('/submit_recipe');
    await page.waitForLoadState('domcontentloaded');
    console.log('Navigated to /submit_recipe'); // Console log added

    // Wait for the recipe name input to be visible
    await page.waitForSelector('input[placeholder="Recipe Name..."]', { state: 'visible' });
    console.log('Recipe Name input is visible'); // Console log added

    // Generate a random number for the recipe name
    const randomNumber = Math.floor(Math.random() * 1000);
    const recipeName = 'Test Recipe ${randomNumber}';
    console.log('Generated recipe name: ${recipeName}'); // Console log added

    // Fill out the form
    await page.fill('input[placeholder="Recipe Name..."]', recipeName);
    await page.fill('input[placeholder="Servings..."]', '4');
    await page.fill('input[placeholder="Price..."]', '10');
    await page.fill('input[placeholder="Cooking Difficulty..."]', '2');
    await page.fill('input[placeholder="Instructions"]', 'Test instructions');
    await page.fill('input[placeholder="Ingredients (comma-separated)..."]', 'ingredient1, ingredient2');
    await page.fill('input[placeholder="Equipment..."]', 'Test equipment');

    await page.click('button:has-text("Add Recipe")');
    console.log('Clicked "Add Recipe" button'); // Console log added

    // Wait for the API response
    await page.waitForResponse('http://localhost:8000/api/recipes/add-recipe/');
    console.log('API response received');

    // Navigate to the recipes page
    await page.goto('/recipes');
    await page.waitForLoadState('domcontentloaded');
    console.log('Navigated to /recipes'); // Console log added

    // Search for the newly added recipe
    await page.waitForSelector('input[type="search"]', { state: 'visible' });
    console.log('Search input is visible'); // Console log added
    await page.fill('input[type="search"]', recipeName);
    await page.click('button[type="submit"]');
    console.log('Searched for recipe'); // Console log added

    // Ensure recipes are displayed
    await page.waitForSelector('.RecipeCard', { state: 'visible', timeout: 10000 });
    console.log('Recipe cards are visible'); // Console log added

    // Assert that the recipe appears
    await expect(
      page.locator('.RecipeCard').filter({ hasText: recipeName }).locator('div.font-bold.text-xl.mb-2.text-main')
    ).toBeVisible({ timeout: 10000 });
    console.log('Assertion passed: Recipe card is visible'); // Console log added
  });

});