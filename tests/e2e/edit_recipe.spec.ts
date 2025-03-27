import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[type="text"]', 'admin');
  await page.fill('input[type="password"]', 'adminadmin');
  await page.click('button[type="submit"]');
  await page.waitForURL('/admin', { timeout: 5000 });
  console.log('Logged in as admin');
});

test.describe('Recipe interactions', () => {
    test('UC0-S4 Recipe is successfully updated', async ({ page }) => {
        await page.goto('/submit_recipe');
        await page.waitForLoadState('domcontentloaded');
        console.log('Navigated to /submit_recipe'); // Console log added
    
        // Wait for the recipe name input to be visible
        await page.waitForSelector('input[placeholder="Recipe Name..."]', { state: 'visible' });
        console.log('Recipe Name input is visible'); // Console log added
    
        // Generate a random number for the recipe name
        const randomNumber = Math.floor(Math.random() * 1000);
        const recipeName = `Test Recipe ${randomNumber}`;
        console.log(`Generated recipe name: ${recipeName}`); // Console log added
    
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
        await page.waitForSelector('.RecipeCard', { state: 'visible', timeout: 5000 });
        console.log('Recipe cards are visible'); // Console log added


        // Update Recipe
      
        // Navigate to the edit recipe page
        await page.click('a:has-text("Edit recipe")');
        await page.waitForLoadState('domcontentloaded');
        console.log('Navigated to Edit Recipe page');
      
        // Update the recipe
        await page.fill('input[placeholder="Recipe Name..."]', recipeName);
        await page.fill('input[placeholder="Servings..."]', '6');
        await page.fill('input[placeholder="Price..."]', '15');
        await page.fill('input[placeholder="Cooking Difficulty..."]', '3');
        await page.fill('input[placeholder="Instructions"]', 'Updated instructions');
        await page.fill('input[placeholder="Ingredients (comma-separated)..."]', 'ingredient3, ingredient4');
        await page.fill('input[placeholder="Equipment..."]', 'Updated equipment');
        await page.click('button:has-text("Edit Recipe")');
      
        // Wait for the API response
        await page.waitForResponse('http://localhost:8000/api/recipes/update-recipe/');
      
        // Verify the update
        await page.goto('/recipes');
        await page.waitForLoadState('networkidle');
        await page.waitForSelector('input[type="search"]');
      
        await page.fill('input[type="search"]', recipeName);
        await page.click('button[type="submit"]');
      
        await page.waitForLoadState('networkidle'); // Wait for network requests to finish
        await page.waitForSelector('.RecipeCard', { state: 'visible', timeout: 5000 });
      
        // Log recipe cards for debugging
        const recipeCards = await page.locator('.RecipeCard').allInnerTexts();
        console.log('All recipe cards:', await recipeCards);
      
        await expect(page.locator('.RecipeCard').filter({ hasText: recipeName })).toBeVisible({ timeout: 5000 });
      });

    test('UC0-S5 Recipe is successfully deleted', async ({ page }) => {
        await page.goto('/submit_recipe');
        await page.waitForLoadState('domcontentloaded');
        console.log('Navigated to /submit_recipe'); // Console log added
    
        // Wait for the recipe name input to be visible
        await page.waitForSelector('input[placeholder="Recipe Name..."]', { state: 'visible' });
        console.log('Recipe Name input is visible'); // Console log added
    
        // Generate a random number for the recipe name
        const randomNumber = Math.floor(Math.random() * 1000);
        const recipeName = `Test Recipe ${randomNumber}`;
        console.log(`Generated recipe name: ${recipeName}`); // Console log added
    
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
        await page.waitForSelector('.RecipeCard', { state: 'visible', timeout: 5000 });
        console.log('Recipe cards are visible'); // Console log added


        // Update Recipe
      
        // Navigate to the edit recipe page
        await page.click('a:has-text("Edit recipe")');
        await page.waitForLoadState('domcontentloaded');
        console.log('Navigated to Edit Recipe page');
      
        // Update the recipe
        await page.fill('input[placeholder="Recipe Name..."]', recipeName);
        await page.fill('input[placeholder="Servings..."]', '6');
        await page.fill('input[placeholder="Price..."]', '15');
        await page.fill('input[placeholder="Cooking Difficulty..."]', '3');
        await page.fill('input[placeholder="Instructions"]', 'Updated instructions');
        await page.fill('input[placeholder="Ingredients (comma-separated)..."]', 'ingredient3, ingredient4');
        await page.fill('input[placeholder="Equipment..."]', 'Updated equipment');
        await page.click('button:has-text("Edit Recipe")');
      
        // Wait for the API response
        await page.waitForResponse('http://localhost:8000/api/recipes/update-recipe/');
      
        // Verify the update
        await page.goto('/recipes');
        await page.waitForLoadState('networkidle');
        await page.waitForSelector('input[type="search"]');
      
        await page.fill('input[type="search"]', recipeName);
        await page.click('button[type="submit"]');
      
        await page.waitForLoadState('networkidle'); // Wait for network requests to finish
        await page.waitForSelector('.RecipeCard', { state: 'visible', timeout: 5000 });
      
        // Log recipe cards for debugging
        const recipeCards = await page.locator('.RecipeCard').allInnerTexts();
        console.log('All recipe cards:', await recipeCards);
      
        await expect(page.locator('.RecipeCard').filter({ hasText: recipeName })).toBeVisible({ timeout: 5000 });

        // Deletion of Recipe

        // Navigate to the edit recipe page
        await page.click('a:has-text("Edit recipe")');
        await page.waitForLoadState('domcontentloaded');
        console.log('Navigated to Edit Recipe page');

        // Delete

        // Setup alert listener
        const alertPromise = new Promise(resolve => {
            page.on('dialog', dialog => {
                if (dialog.message() === `${recipeName} deleted`) {
                    resolve(true);
                    dialog.accept(); // Optionally accept the alert
                } else {
                    resolve(false);
                    dialog.dismiss(); // Optionally dismiss the alert
                }
            });
        });

        // Delete Recipe
        await page.fill('input[placeholder="Enter Recipe"]', recipeName);
        await page.click('button:has-text("Delete Recipe")');

        await page.waitForResponse('http://localhost:8000/api/recipes/delete-recipe/');

        // Wait for the specific alert message
        const alertResult = await alertPromise;
        expect(alertResult).toBe(true);

        // Look at Recipes to see that recipe disappeared
        await page.goto('/recipes');
        await page.waitForLoadState('networkidle');
        await page.waitForSelector('input[type="search"]');

        // Clear the search input
        await page.fill('input[type="search"]', '');
        await page.fill('input[type="search"]', recipeName);
        await page.click('button[type="submit"]');

        // Retry the assertion
        await expect(page.locator('.RecipeCard').filter({ hasText: recipeName })).not.toBeVisible({ timeout: 5000 });
      });
    
});