import { test, expect } from '@playwright/test';

test.describe('Login page', () => {
    test('should show user is not registered', async ({ page }) => {
        await page.goto('/login');
        
        await page.fill('input[type="text"]', 'nonexistentuser@gmail.com');
        await page.fill('input[type="password"]', 'wrongpassword');
      
        // Listen for dialog immediately after button click
        page.on('dialog', async (dialog) => {
          console.log('Dialog message:', dialog.message()); // Log the message to check if the dialog is triggered
          expect(dialog.message()).toBe('User does not exist'); // Check if the message matches
          await dialog.dismiss(); // Dismiss the dialog
        });
      
        await page.click('button[type="submit"]'); // Trigger the alert
      
        // Add a timeout to ensure that Playwright waits long enough
        await page.waitForTimeout(2000);
      });

    test('should disallow wrong password', async ({ page }) => {
        await page.goto('/login');

        await page.fill('input[type="text"]', 'john123@gmail.com');
        await page.fill('input[type="password"]', 'wrongpassword'); 
        // Listen for dialog immediately after button click
        page.on('dialog', async (dialog) => {
            console.log('Dialog message:', dialog.message()); // Log the message to check if the dialog is triggered
            expect(dialog.message()).toBe('Invalid password'); // Check if the message matches
            await dialog.dismiss(); // Dismiss the dialog
          });
        
          await page.click('button[type="submit"]'); // Trigger the alert
        
          // Add a timeout to ensure that Playwright waits long enough
          await page.waitForTimeout(2000);
    });

    test('should show success when valid credentials are entered', async ({ page }) => {
        await page.goto('/login');
    
        await page.fill('input[type="text"]', 'testuser');
        await page.fill('input[type="password"]', 'thisispw');

        // Listen for dialog immediately after button click
        page.on('dialog', async (dialog) => {
            console.log('Dialog message:', dialog.message()); // Log the message to check if the dialog is triggered
            expect(dialog.message()).toBe('Login successful'); // Check if the message matches
            await dialog.dismiss(); // Dismiss the dialog
          });
        
        await page.click('button[type="submit"]'); // Trigger the alert
      
        // Add a timeout to ensure that Playwright waits long enough
        await page.waitForTimeout(2000);

    });
});
