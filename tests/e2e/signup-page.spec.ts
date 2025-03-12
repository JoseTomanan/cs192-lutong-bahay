import { test, expect } from '@playwright/test';

test.describe('Signup page', () => {
	test('should not be able to log in with ', async ({ page }) => { 
		await page.goto('/register')

		
	});
});