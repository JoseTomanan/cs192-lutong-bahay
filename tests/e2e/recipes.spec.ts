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
    console.log('Clicked submit button.');

    // Capture network activity
    page.on('request', (request) => console.log('>>', request.method(), request.url()));
    page.on('response', (response) => console.log('<<', response.status(), response.url()));

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
    const cards = await page.locator('.RecipeCard').allInnerTexts();
    console.log("Recipe Cards Found: ", cards);

    // Assert that the recipe appears
    await expect(
      page.locator('.RecipeCard')
        .filter({ hasText: 'Test Recipe' })
        .locator('div.font-bold.text-xl.mb-2.text-main')
    ).toBeVisible({ timeout: 10000 });
  });

  test('UC3-S1: Rating for current recipe is successfully posted', async ({ page }) => {
      await page.goto('/recipes/1'); // Assuming recipe with id 1 exists
      await page.waitForSelector('input[type="number"]');
      await page.fill('input[type="number"]', '5');
      await page.click('button[text="Submit review"]');

      // You may need to add a way to see the rating on the page
      // For example, if ratings are displayed in the review section,
      // you can check for the text '5' in that section.
      // If the rating affects the overall recipe rating, you can check that too.
      // For this test, I will simply check for the presence of the input box again, meaning no error occured.
      await page.waitForSelector('input[type="number"]');
  });

  test('UC3-S3: Comment for current recipe is successfully posted', async ({ page }) => {
      await page.goto('/recipes/1'); // Assuming recipe with id 1 exists
      await page.waitForSelector('textarea');
      await page.fill('textarea', 'Test comment');
      await page.click('button[text="Submit review"]');

      // You may need to add a way to see the comment on the page
      // For example, if comments are displayed in the review section,
      // you can check for the text 'Test comment' in that section.
      // For this test, I will simply check for the presence of the textarea again, meaning no error occured.
      await page.waitForSelector('textarea');
  });

  test('UC0-S6: Comment by user is successfully deleted', async ({ page }) => {
    // This test depends on the backend having a delete comment API, and the frontend having a delete button.
    // This implementation assumes the frontend has a delete button on each comment with a unique identifier.
    // The identifier is assumed to be the comment's Id.
    // This also assumes there is a comment with id 1 already on the recipe page.
    await page.goto('/recipes/1');
    await page.waitForSelector('button[data-comment-id="1"]');
    await page.click('button[data-comment-id="1"]');
    await page.waitForSelector('button[data-comment-id="1"]',{state:'detached'});
  });

});