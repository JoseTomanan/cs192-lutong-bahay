import { test, expect } from '@playwright/test';

test.describe('Recipe search', ()=>{
    test('should show no results when invalid', async ({ page }) => {
        await page.goto('/recipes');
        await page.waitForLoadState('networkidle'); // Wait for page to fully load
        await page.waitForSelector('input[type="search"]'); // Ensure the search input exists before interacting with it
        await page.fill('input[type="search"]', 'nonexistentrecipe');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000); // Give time for API response
        await expect(page.locator('.RecipeCard')).toHaveCount(0); // Expect no recipe cards to be displayed
    });

    test('should show results when valid', async ({ page }) => {
    });
});

test.describe('Recipe sort', ()=>{
    test('should properly display sort by difficulty, ascending', async ({ page }) => {

    });

    test('should properly display sort by difficulty, descending', async ({ page }) => {

    });

    test('should properly display sort by price, ascending', async ({ page }) => {

    });

    test('should properly display sort by price, descending', async ({ page }) => {

    });

    test('should properly display sort by ratings', async ({ page }) => {

    });
});