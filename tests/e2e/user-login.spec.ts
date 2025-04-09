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

  // test('UC1-S2 Customer logs in successfully using Google', async ({ page }) => {
  //   await page.goto('/login');
  //   // await page.fill('input[type="text"]', 'testuser');
  //   // await page.fill('input[type="password"]', 'thisispw');

  //   // page.on('dialog', async (dialog) => {
  //   //   console.log('Dialog message:', dialog.message());
  //   //   expect(dialog.message()).toBe('Login successful');
  //   //   await dialog.dismiss();
  //   // });
  //   await page.click('button:has-text("Sign in with Google")');
  //   await page.waitForTimeout(1000);
  //   await page.fill('input[type="email"]', '...@gmail.com');
  //   await page.waitForTimeout(1000);
  //   await page.fill('input[aria-label="Enter your password"]', '...');
  //   await page.waitForTimeout(1000);
  //   await page.click('button:has-text("Next")');
  //   await page.waitForTimeout(1000);
  //   await page.click('button:has-text("Continue")');
  //   await page.waitForTimeout(5000);
  //   await page.waitForURL('/recipes'); // Replace "await page.waitForTimeout(2000);" with actual redirected URL

  // });
});
