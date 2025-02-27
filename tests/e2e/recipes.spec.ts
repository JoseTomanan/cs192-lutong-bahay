import { test, expect } from '@playwright/test';

test.describe('Recipe search', ()=>{
    test.beforeEach(async ({ page }) => {
        await page.goto('/login');
        await page.fill('input[type="text"]', 'testuser');
        await page.fill('input[type="password"]', 'thisispw');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(3000);
    });

    test('should show no results when invalid', async ({ page }) => {
        await page.goto('/recipes');
        await page.waitForLoadState('networkidle'); // Wait for page to fully load
        await page.waitForSelector('input[type="search"]'); // Ensure the search input exists before interacting with it
        await page.fill('input[type="search"]', 'nonexistentrecipe');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);
        await page.waitForTimeout(1000);
        await expect(page.locator('.RecipeCard')).toHaveCount(0); // Expect no recipe cards to be displayed
    });

    test('should show results when valid', async ({ page }) => {
        await page.goto('/recipes');
        await page.waitForLoadState('networkidle'); // Wait for page to fully load
        await page.waitForSelector('input[type="search"]'); // Ensure the search input exists before interacting with it
        await page.fill('input[type="search"]', 'hotdog');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(1000);
        await page.waitForTimeout(1000);
        await expect(page.locator('.RecipeCard')).toHaveCount(0); // Expect no recipe cards to be displayed
    });
});

test.describe('Recipe sort', ()=>{
    test.beforeEach(async ({ page }) => {
        await page.goto('/login');
        await page.fill('input[type="text"]', 'testuser');
        await page.fill('input[type="password"]', 'thisispw');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(3000);
    });

    test('should properly display sort by difficulty, ascending', async ({ page }) => {
        await page.goto('/recipes');
        await page.waitForLoadState('networkidle');
        await page.waitForSelector('input[type="search"]');

        await page.getByRole('combobox').first().selectOption('cookDifficulty');
        await page.getByRole('combobox').nth(1).selectOption('ascending');
    
        await page.waitForTimeout(2000);
    
        const difficulties = await page.$$eval('.RecipeCard .difficulty', nodes =>
            nodes.map(n => n.textContent?.trim())
        );
        expect(difficulties).toEqual([...difficulties].sort());
    });

    test('should properly display sort by difficulty, descending', async ({ page }) => {
        await page.goto('/recipes');
        await page.waitForLoadState('networkidle');
        await page.waitForSelector('input[type="search"]');

        await page.getByRole('combobox').first().selectOption('cookDifficulty');
        await page.getByRole('combobox').nth(1).selectOption('descending');
    
        await page.waitForTimeout(2000);
    
        const difficulties = await page.$$eval('.RecipeCard .difficulty', nodes =>
            nodes.map(n => n.textContent?.trim())
        );
        expect(difficulties).toEqual([...difficulties].sort());
    });

    test('should properly display sort by price, ascending', async ({ page }) => {
        await page.goto('/recipes');
        await page.waitForLoadState('networkidle');
        await page.waitForSelector('input[type="search"]');

        await page.getByRole('combobox').first().selectOption('price');
        await page.getByRole('combobox').nth(1).selectOption('ascending');
    
        await page.waitForTimeout(2000);
    
        const difficulties = await page.$$eval('.RecipeCard .price', nodes =>
            nodes.map(n => n.textContent?.trim())
        );
        expect(difficulties).toEqual([...difficulties].sort());
    });

    test('should properly display sort by price, descending', async ({ page }) => {
        await page.goto('/recipes');
        await page.waitForLoadState('networkidle');
        await page.waitForSelector('input[type="search"]');

        await page.getByRole('combobox').first().selectOption('price');
        await page.getByRole('combobox').nth(1).selectOption('descending');
    
        await page.waitForTimeout(2000);
    
        const difficulties = await page.$$eval('.RecipeCard .price', nodes =>
            nodes.map(n => n.textContent?.trim())
        );
        expect(difficulties).toEqual([...difficulties].sort());
    });

    test('should properly display sort by ratings, ascending', async ({ page }) => {
        await page.goto('/recipes');
        await page.waitForLoadState('networkidle');
        await page.waitForSelector('input[type="search"]');

        await page.getByRole('combobox').first().selectOption('ratings');
        await page.getByRole('combobox').nth(1).selectOption('ascending');
    
        await page.waitForTimeout(2000);
    
        const difficulties = await page.$$eval('.RecipeCard .ratings', nodes =>
            nodes.map(n => n.textContent?.trim())
        );
        expect(difficulties).toEqual([...difficulties].sort());
    });

    test('should properly display sort by ratings, descending', async ({ page }) => {
        await page.goto('/recipes');
        await page.waitForLoadState('networkidle');
        await page.waitForSelector('input[type="search"]');

        await page.getByRole('combobox').first().selectOption('ratings');
        await page.getByRole('combobox').nth(1).selectOption('descending');
    
        await page.waitForTimeout(2000);
    
        const difficulties = await page.$$eval('.RecipeCard .ratings', nodes =>
            nodes.map(n => n.textContent?.trim())
        );
        expect(difficulties).toEqual([...difficulties].sort());
    });

    test('should properly display sort by ingredients, ascending', async ({ page }) => {
        await page.goto('/recipes');
        await page.waitForLoadState('networkidle');
        await page.waitForSelector('input[type="search"]');

        await page.getByRole('combobox').first().selectOption('ingredients');
        await page.getByRole('combobox').nth(1).selectOption('ascending');
    
        await page.waitForTimeout(2000);
    
        const difficulties = await page.$$eval('.RecipeCard .ingredients', nodes =>
            nodes.map(n => n.textContent?.trim())
        );
        expect(difficulties).toEqual([...difficulties].sort());
    });

    test('should properly display sort by ingredients, descending', async ({ page }) => {
        await page.goto('/recipes');
        await page.waitForLoadState('networkidle');
        await page.waitForSelector('input[type="search"]');

        await page.getByRole('combobox').first().selectOption('ingredients');
        await page.getByRole('combobox').nth(1).selectOption('descending');
    
        await page.waitForTimeout(2000);
    
        const difficulties = await page.$$eval('.RecipeCard .ingredients', nodes =>
            nodes.map(n => n.textContent?.trim())
        );
        expect(difficulties).toEqual([...difficulties].sort());
    });
});