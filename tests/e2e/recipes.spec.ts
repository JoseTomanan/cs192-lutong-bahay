import { test, expect } from '@playwright/test';

test.describe('Recipe search', ()=>{
    test('should show no results when invalid', async ({ page }) => {
        await page.goto('/login');

        await page.fill('input[type="text"]', 'testuser');
        await page.fill('input[type="password"]', 'thisispw');
        await page.click('button[type="submit"]');

        
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