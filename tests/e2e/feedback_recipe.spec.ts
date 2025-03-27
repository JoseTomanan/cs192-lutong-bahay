// import { test, expect } from '@playwright/test';

// test.beforeEach(async ({ page }) => {
//   await page.goto('/login');
//   await page.fill('input[type="text"]', 'admin');
//   await page.fill('input[type="password"]', 'adminadmin');
//   await page.click('button[type="submit"]');
//   await page.waitForURL('/admin', { timeout: 5000 });
//   console.log('Logged in as admin'); // Console log added
// });

// test.describe('Recipe interactions', () => {

//   test('UC3-S3: Comment for current recipe is successfully posted', async ({ page }) => {
//     await page.goto('/recipes');
//     await page.waitForLoadState('domcontentloaded');
//     console.log('Navigated to /recipes'); // Console log added

//     // Search for the newly added recipe
//     await page.waitForSelector('input[type="search"]', { state: 'visible' });
//     console.log('Search input is visible'); // Console log added
//     await page.fill('input[type="search"]', 'Recipe_For_Testing');
//     await page.click('button[type="submit"]');
//     console.log('Searched for recipe'); // Console log added

//     // Ensure recipes are displayed
//     await expect(page.locator('.RecipeCard').filter({ hasText: 'Recipe_For_Testing' })).toBeVisible({ timeout: 5000 });
//     console.log('Recipe_For_Testing is visible'); // Console log added

//     // Navigate to the Recipe  page
//     await page.click('a:has-text("View Recipe")');
//     await page.waitForLoadState('domcontentloaded');
//     await page.waitForURL('/recipes/140', { timeout: 5000 });
//     console.log('Recipe_For_Testing to page');

//     // Generate a random number for the review name
//     const randomNumber = Math.floor(Math.random() * 1000);
//     const reviewName = `Test Review ${randomNumber}`;
//     console.log(`Generated review name: ${reviewName}`); // Console log added
    
//     // Fill out the form
//     await page.fill('input[placeholder=""]', reviewName);
//     await page.click('button:has-text("Submit review")');
//     console.log('Clicked "Submit review" button'); // Console log added
//     await page.waitForURL('/recipes/140', { timeout: 5000 });

//     // Search for the newly added recipe
//     await expect(page.locator('.RecipeReview').filter({ hasText: reviewName })).toBeVisible({ timeout: 5000 });
//     console.log('Comment for current recipe is successfully posted'); // Console log added
        
//   });
//   test('UC0-S6: Comment by user is successfully deleted', async ({ page }) => {
//     // ...
//   });

// });