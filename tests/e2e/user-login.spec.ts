import { test, expect } from '@playwright/test';

test.describe('Login page', () => {
  test('should show user is not registered', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('input[type="text"]', 'nonexistentuser@gmail.com');
    await page.fill('input[type="password"]', 'wrongpassword');

    page.on('dialog', async (dialog) => {
      console.log('Dialog message:', dialog.message());
      expect(dialog.message()).toBe('Invalid credentials');
      await dialog.dismiss();
    });

    await page.click('button[type="submit"]');
    
    await page.waitForURL('/login'); // Replace "await page.waitForTimeout(2000);" with actual redirected URL
    
  });

  test('should disallow wrong password', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[type="text"]', 'john123@gmail.com');
    await page.fill('input[type="password"]', 'wrongpassword'); 
    
    page.on('dialog', async (dialog) => {
      console.log('Dialog message:', dialog.message());
      expect(dialog.message()).toBe('Invalid credentials');
      await dialog.dismiss();
    });
    
    await page.click('button[type="submit"]');
  
    await page.waitForURL('/login'); // Replace "await page.waitForTimeout(2000);" with actual redirected URL
    
  });

  test('should show success when valid credentials are entered', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[type="text"]', 'testuser');
    await page.fill('input[type="password"]', 'thisispw');

    page.on('dialog', async (dialog) => {
      console.log('Dialog message:', dialog.message());
      expect(dialog.message()).toBe('Login successful');
      await dialog.dismiss();
    });
    
    await page.click('button[type="submit"]');
  
    await page.waitForURL('/home'); // Replace "await page.waitForTimeout(2000);" with actual redirected URL

  });
});
