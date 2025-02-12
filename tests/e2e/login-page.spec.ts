import { test, expect } from '@playwright/test';

test.describe('Login page', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/login');
    });

    test('should show user is not registered', async ({ page }) => {
        await page.fill('input[type="email"]', 'unregistered@example.com');
        await page.fill('input[type="password"]', 'password123');
        await page.click('button[type="submit"]');

        // Expect an error message to appear
        await expect(page.locator('text=Login failed')).toBeVisible();
    });

    test('should disallow wrong password', async ({ page }) => {
        await page.fill('input[type="email"]', 'registered@example.com');
        await page.fill('input[type="password"]', 'wrongpassword');
        await page.click('button[type="submit"]');

        // Expect an error message to appear
        await expect(page.locator('text=Login failed')).toBeVisible();
    });

    test('should show success when valid credentials are entered', async ({ page }) => {
        await page.fill('input[type="email"]', 'registered@example.com');
        await page.fill('input[type="password"]', 'correctpassword');
        await page.click('button[type="submit"]');

        // Wait for localStorage token to be set
        await page.waitForFunction(() => localStorage.getItem('token') !== null);

        // Check if user is redirected to the dashboard
        await expect(page).toHaveURL('http://localhost:5173/dashboard');
    });

});