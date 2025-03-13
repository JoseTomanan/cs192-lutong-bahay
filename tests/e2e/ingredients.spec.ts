import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[type="text"]', 'testuser');
  await page.fill('input[type="password"]', 'thisispw');
  await page.click('button[type="submit"]');
  await page.waitForURL('/home', { timeout: 5000 }); // Wait for navigation after login
});

test.describe('Ingredients filter', () => {
  test('Sort according to available ingredients returns results', async ({ page }) => {
    await page.goto('/recipes');
    await page.waitForLoadState('networkidle');

    // Find the second input field (for ingredients filtering)
    const ingredientFilterInput = page.locator('input[type="search"]').nth(1); 
    await ingredientFilterInput.fill('egg');

    // Click the correct "Filter" button (second form's button)
    const filterButton = page.locator('button', { hasText: 'Filter' });
    await filterButton.click();

    // Wait for network requests to complete and for RecipeCard to appear
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('.RecipeCard', { state: 'visible' });

    // Ensure at least one recipe appears
    const count = await page.locator('.RecipeCard').count();
    expect(count).toBeGreaterThan(0);
  });

  test('Sort according to available ingredients returns invalid ingredients', async ({ page }) => {
    await page.goto('/recipes');
    await page.waitForLoadState('networkidle');

    // Find the second input field (for ingredients filtering)
    const ingredientFilterInput = page.locator('input[type="search"]').nth(1);
    await ingredientFilterInput.fill('martian wonderfruit'); // Use an ingredient that doesn't exist

    // Click the correct "Filter" button (second form's button)
    const filterButton = page.locator('button', { hasText: 'Filter' });
    await filterButton.click();

    // Wait for network requests to complete
    await page.waitForLoadState('networkidle');

    // Ensure no recipe cards appear
    const count = await page.locator('.RecipeCard').count();
    expect(count).toBe(0);
  });

  test('Sort according to available ingredients shows no recipes with chosen ingredients', async ({ page }) => {
    await page.goto('/recipes');
    await page.waitForLoadState('networkidle');

    const ingredientFilterInput = page.locator('input[type="search"]').nth(1);
    await ingredientFilterInput.fill('egg, vinegar, salt, hotdog'); // Use an ingredient that doesn't exist

    const filterButton = page.locator('button', { hasText: 'Filter' });
    await filterButton.click();

    await page.waitForLoadState('networkidle');

    const count = await page.locator('.RecipeCard').count();
    expect(count).toBe(0);
  });

});
