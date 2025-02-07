// @ts-check
import { test, expect } from '@playwright/test';

test('Assure webpages still working', () => {
    test('should load login page', async ({ page }) => {
        await page.goto('http://localhost:5173/login');

        const title = await page.title();
        expect(title).toBe('Lutong Bahay | Login');
    });

    test('should load dashboard page', async ({ page }) => {
    
    });

    test('should load search page', async ({ page }) => {
    
    });
});

test('Login function', () => {
    test('should show user is not registered', () => {
        // FILL THIS
    });

    test('should disallow wrong password', () => {
        // FILL THIS
    });

    test('should show success when valid credentials are entered', () => {
        // FILL THIS
    })
});