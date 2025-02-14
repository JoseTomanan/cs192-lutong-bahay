import { test, expect } from '@playwright/test';

test.describe('Login page', () => {
    test('should show user is not registered', async ({ page }) => {
        const consoleMessages: string[] = [];

        page.on('console', (msg) => {
            consoleMessages.push(msg.text());
        });

        await page.goto('/login');

        await page.fill('input[type="email"]', 'nonexistentuser@gmail.com');
        await page.fill('input[type="password"]', 'wrongpassword');
        await page.click('button[type="submit"]');

        await page.waitForTimeout(1000); // Ensure logs are captured
        console.log('Captured console messages:', consoleMessages);

        expect(consoleMessages.some(msg => msg.includes('Invalid username'))).toBeTruthy();
    });

    test('should disallow wrong password', async ({ page }) => {
        const consoleMessages: string[] = [];

        page.on('console', (msg) => {
            consoleMessages.push(msg.text());
        });

        await page.goto('/login');

        await page.fill('input[type="email"]', 'john123@gmail.com');
        await page.fill('input[type="password"]', 'wrongpassword');
        await page.click('button[type="submit"]');

        await page.waitForTimeout(1000);
        console.log('Captured console messages:', consoleMessages);

        expect(consoleMessages.some(msg => msg.includes('Invalid password'))).toBeTruthy();
    });

    test('should show success when valid credentials are entered', async ({ page }) => {
        const consoleMessages: string[] = [];

        page.on('console', (msg) => {
            consoleMessages.push(msg.text());
        });

        await page.goto('http://localhost:5173/login');

        await page.fill('input[type="email"]', 'john123@gmail.com');
        await page.fill('input[type="password"]', 'password');
        await page.click('button[type="submit"]');

        await page.waitForTimeout(1000);
        console.log('Captured console messages:', consoleMessages);

        expect(consoleMessages.some(msg => msg.includes('Login successful'))).toBeTruthy();
    });
});
