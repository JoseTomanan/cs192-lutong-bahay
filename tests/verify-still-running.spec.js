// @ts-check
import { test, expect } from '@playwright/test';


test('verify login page still running', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    const title = await page.title();
    expect(title).toBe('localhost:5173/login');
});


test('verify dashboard page still running', async ({ page }) => {
  
});


test('verify search page still running', async ({ page }) => {
  
});