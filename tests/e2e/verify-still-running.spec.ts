import { test, expect } from '@playwright/test';

test.describe('All loading pages', () => {
    test('should load login page', async ({ page }) => {
        await page.goto(
            '/login',
            { waitUntil: 'domcontentloaded' }
            );

        // Verify title
        await expect(page).toHaveTitle('');

        // Verify login form is present
        await expect(page.locator('input[type="text"]'))
            .toBeVisible();
        await expect(page.locator('input[type="password"]'))
            .toBeVisible();
        await expect(page.getByRole('button', { name: 'Log in' }))
            .toBeVisible();
    });

    test('should load dashboard page', async ({ page }) => {
        await page.goto(
            '/dashboard',
            { waitUntil: 'domcontentloaded' }
            );

        // Verify title
        // await expect(page).toHaveTitle('');

        // Verify the dashboard contains a key element (e.g., a greeting or navigation)
        // await expect(page.locator('h1')).toHaveText(/Welcome|Dashboard/i);

        // Verify the dashboard contains an h1 element with the text "Dashboard"
        await expect(page.locator('h1'))
            .toHaveText('Dashboard');
    });


    test('should load search page', async ({ page }) => {
        await page.goto(
            '/search',
            { waitUntil: 'domcontentloaded' }
            );

        // Verify title
        await expect(page)
            .toHaveTitle('');

        // Verify the search input is present
        // await expect(page.locator('input[type="search"]')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Search' }))
            .toBeVisible();

        // Check if search results container exists
        // await expect(page.locator('#search-results')).toBeVisible();
    });
});

