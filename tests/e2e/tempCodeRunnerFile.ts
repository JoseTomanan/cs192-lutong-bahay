  // test('should show results when valid', async ({ page }) => {
  //   await page.goto('/recipes');
  //   await page.waitForLoadState('networkidle');
  //   await page.waitForSelector('input[type="search"]');

  //   await page.fill('input[type="search"]', 'Hotdog');
  //   await page.click('button[type="submit"]');

  //   await page.waitForLoadState('networkidle'); // Wait for network requests to finish
  //   await page.waitForSelector('.RecipeCard', { state: 'visible' }); // Ensure recipes are displayed
  // });