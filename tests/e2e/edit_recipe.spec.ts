import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[type="text"]', 'admin');
  await page.fill('input[type="password"]', 'adminadmin');
  await page.click('button[type="submit"]');
  await page.waitForURL('/admin', { timeout: 7000 });
  console.log('Logged in as admin');
});

test.describe('Recipe interactions', () => {
    test('UC0-S4 Recipe is successfully updated', async ({ page }) => {
        await page.goto('/submit_recipe');
        await page.waitForLoadState('domcontentloaded');
        console.log('Navigated to /submit_recipe'); // Console log added
    
        // Wait for the recipe name input to be visible
        await page.waitForSelector('input[placeholder="Recipe name"]', { state: 'visible', timeout: 10000 });
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
    
        await page.click('button:has-text("Edit Recipe")');
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
      // 1. Make a new recipe, via add recipe.
      await page.goto('/submit_recipe');
      await page.waitForLoadState('domcontentloaded');
      console.log('Navigated to /submit_recipe');
  
      // Wait for the recipe name input to be visible with a longer timeout

      
      await page.waitForSelector('input[placeholder="Recipe name"]', { state: 'visible', timeout: 10000 });
      console.log('Recipe Name input is visible');
  
      const randomNumber = Math.floor(Math.random() * 1000);
      const recipeName = `Delete Test Recipe ${randomNumber}`;
      console.log(`Generated recipe name: ${recipeName}`);

      await page.waitForSelector('input[placeholder="Recipe name"]', { state: 'visible', timeout: 10000 });
      console.log('Recipe Name input is visible');

      // Add a small delay to allow for any potential background processes
      await page.waitForTimeout(500); // Wait for 500 milliseconds

      await page.fill('input[placeholder="Recipe name"]', recipeName);
      await page.fill('input[placeholder="Servings"]', '2');
      await page.fill('input[placeholder="Price"]', '5');
      await page.fill('input[placeholder="Difficulty"]', '1');
      await page.fill('textarea[placeholder="Instructions"]', 'Instructions for deletion test');

      // Add ingredients
      //await page.fill('input[placeholder="Ingredients (comma-separated)..."]', 'ingredientA, ingredientB');

      // Assuming 'ingredientA' exists in your ingredientsDb and its <option> value is 'ingredientA_value'
      await page.selectOption('select[placeholder="Choose..."]', 'seaweed');
      await page.fill('input[placeholder="Quantity"]', '2');
      await page.click('article:has(h1:text("Add Ingredients")) form button[type="submit"]');

      // Assuming 'ingredientB' exists in your ingredientsDb and its <option> value is 'ingredientB_value'
      await page.selectOption('select[placeholder="Choose..."]', 'rice');
      await page.fill('input[placeholder="Quantity"]', '1');
      await page.click('article:has(h1:text("Add Ingredients")) form button[type="submit"]');

      // Add equipments
      // await page.fill('input[placeholder="Equipment..."]', 'Test utensil');
      await page.fill('input[placeholder="Equipment"]', 'Test utensil');
      await page.click('article:has(h1:text("Add Equipment")) form button[type="submit"]');

      await page.fill('input[placeholder="Equipment"]', 'Another utensil');
      await page.click('article:has(h1:text("Add Equipment")) form button[type="submit"]');

      
      await page.click('button:has-text("Submit Recipe")');
      console.log('Clicked "Submit Recipe" button');
  
      // await page.waitForResponse('http://localhost:8000/api/recipes/create_recipe/');
      // console.log('API response received for adding recipe');
  
      // 2. See that the recipe exists in recipes by searching for it.
      await page.goto('/recipes');
      await page.waitForLoadState('domcontentloaded');
      console.log('Navigated to /recipes');
      await page.waitForTimeout(2000);
  
      await page.waitForSelector('input[type="search"]', { state: 'visible' });
      await page.fill('input[type="search"]', recipeName);
      await page.click('button[type="submit"]');
      console.log(`Searched for the new recipe ${recipeName}`);
  
      // await page.waitForSelector('.RecipeCard', { state: 'visible', timeout: 5000 });
      // const recipeCard = await page.locator('.RecipeCard').filter({ hasText: recipeName });
      // await expect(recipeCard).toBeVisible({ timeout: 5000 });
      // console.log('New recipe found in the list');
      
      // await page.waitForSelector('.RecipeCard', { state: 'visible', timeout: 10000 });
      // await page.waitForSelector('.RecipeCard', { state: 'attached', timeout: 10000 });
      await expect(page.locator('.RecipeCard')).toBeVisible({ timeout: 5000 });
      console.log('Recipe cards are visible'); // Console log added
  
      // Assert that the recipe appears
      await expect(
        page.locator('.RecipeCard').filter({ hasText: recipeName }).locator('div.font-bold.text-xl.mb-2.text-main')
      ).toBeVisible({ timeout: 10000 });
      console.log('Assertion passed: Recipe card is visible'); // Console log added
  
      // 3. Go to edit recipe, type in the recipe, and delete it.
      await page.goto('/edit_recipe');
      await page.waitForLoadState('domcontentloaded');
      console.log('Navigated to /edit_recipe');
      await page.waitForTimeout(1000);

      // await page.waitForSelector('input[placeholder="Enter recipe name..."]', { state: 'visible' });
      // await page.fill('input[placeholder="Enter recipe name..."]', recipeName);
      await page.waitForSelector('#username', { state: 'visible', timeout: 10000 });
      await page.fill('#username', recipeName);
  
      // await page.waitForSelector('button:has-text("Delete")', { state: 'visible', timeout: 5000 });
      // await page.click('button:has-text("Delete")');
      // console.log('Clicked "Delete" button');
      await page.waitForSelector('button.destructive-text', { state: 'visible', timeout: 10000 });
      await page.click('button.destructive-text');
      console.log('Clicked "Delete" button');

      // Check if pop out appears
      // await expect(page.locator(`${recipeName} deleted`)).toBeVisible();
  
      // Wait for the deletion API response
      // await page.waitForResponse(response => response.url().includes('/api/recipes/delete-recipe/') && response.status() === 200);
      // console.log('API response received for deleting recipe');
  
      // 4. See that the recipe does not exist anymore in recipes by searching for it.
      await page.goto('/recipes');
      await page.waitForLoadState('domcontentloaded');
      console.log('Navigated to /recipes again');
      await page.waitForTimeout(1000);
  
      await page.waitForSelector('input[type="search"]', { state: 'visible' });
      await page.fill('input[type="search"]', recipeName);
      await page.click('button[type="submit"]');
      console.log('Searched for the deleted recipe');
  
      // Wait for a short time to allow the search results to update
      await page.waitForTimeout(1000);
  
      // Expect that the recipe card with the deleted name is not visible
      await expect(page.locator('.RecipeCard').filter({ hasText: recipeName })).not.toBeVisible({ timeout: 5000 });
      console.log('Deleted recipe not found in the list');
    });
});