import { test, expect } from '@playwright/test';

test.describe('Admininstrator login', () => {
	test('should show admin credentials are incorrect', async ({ page }) => {
		await page.goto('/login');
    
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', 'wrongpassword');

    page.on('dialog', async (dialog) => {
      console.log('Dialog message:', dialog.message());
      expect(dialog.message()).toBe('Invalid credentials');
      await dialog.dismiss();
    });

    await page.click('button[type="submit"]');
    
    await page.waitForURL('/login');
	});

	test('should lead to admin pagevalid credentials are entered', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', 'adminadmin');

    page.on('dialog', async (dialog) => {
      console.log('Dialog message:', dialog.message());
      expect(dialog.message()).toBe('Login successful');
      await dialog.dismiss();
    });
    
    await page.click('button[type="submit"]');
  
    await page.waitForURL('/admin');
  });
});