import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const UI_URL = 'http://localhost:5173';

// Read the JSON file
const data = fs.readFileSync(path.resolve('../data/test-users.json'), 'utf-8');
const user = JSON.parse(data);

test('Should allow user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  // Get the sign in button
  await page.getByRole('link', { name: 'Sign in' }).click();

  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible(); 

  await page.locator('[name="email"]').fill(user.email);
  await page.locator('[name="password"]').fill(user.password);

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Signed in successfully')).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible();
});

test('Should allow user to register', async ({ page }) => {
  const testEmail = `test_register_${Date.now()}@test.com`;
  await page.goto(UI_URL);

  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Create your account here' }).click();

  await expect(page.getByRole('heading', { name: 'Create an Account' })).toBeVisible();

  await page.locator('[name="firstName"]').fill('test_firstName');
  await page.locator('[name="lastName"]').fill('test_lastName');
  await page.locator('[name="email"]').fill(testEmail);
  await page.locator('[name="password"]').fill('password123');
  await page.locator('[name="confirmPassword"]').fill('password123');

  await page.getByRole('button', { name: 'Create an Account' }).click();

  await expect(page.getByText('Account created successfully')).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible();
});
