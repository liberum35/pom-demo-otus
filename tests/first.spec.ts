import { test, expect } from '@playwright/test';

// дефолтный паттерн "простыня"

test('Add user', async ({ page }) => {
  await page.goto('https://demoqa.com/webtables/');
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByPlaceholder('First Name').fill('FirstName');
  await page.getByPlaceholder('Last Name').fill('LastName');
  await page.getByPlaceholder('name@example.com').fill('mytestemail@mail.ru');
  await page.getByPlaceholder('Age').fill('30');
  await page.getByPlaceholder('Salary').fill('200000');
  await page.getByPlaceholder('Department').fill('QA');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.locator('.rt-tbody').getByRole('row' , { name: 'FirstName' })).toHaveText('FirstNameLastName30mytestemail@mail.ru200000QA ');
});

test('Delete user', async ({ page }) => {
  await page.goto('https://demoqa.com/webtables/');
  await page.locator('.rt-tbody').getByRole('row' , { name: 'Cierra' }).getByTitle('Delete').click();
  await expect(page.locator('.rt-tbody').getByRole('row' , { name: 'Cierra' })).not.toBeVisible();
});

test('Add user with different data', async ({ page }) => {
  await page.goto('https://demoqa.com/webtables/');
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByPlaceholder('First Name').fill('FirstName');
  await page.getByPlaceholder('Last Name').fill('LastName');
  await page.getByPlaceholder('name@example.com').fill('mytestemail@mail.ru');
  await page.getByPlaceholder('Age').fill('30');
  await page.getByPlaceholder('Salary').fill('200000');
  await page.getByPlaceholder('Department').fill('QA');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.locator('.rt-tbody').getByRole('row' , { name: 'FirstName' })).toHaveText('FirstNameLastName30mytestemail@mail.ru200000QA ');

  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByPlaceholder('First Name').fill('FirstName2');
  await page.getByPlaceholder('Last Name').fill('LastName2');
  await page.getByPlaceholder('name@example.com').fill('mytestemail2@mail.ru');
  await page.getByPlaceholder('Age').fill('32');
  await page.getByPlaceholder('Salary').fill('200001');
  await page.getByPlaceholder('Department').fill('QA2');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.locator('.rt-tbody').getByRole('row' , { name: 'FirstName2' })).toHaveText('FirstName2LastName232mytestemail2@mail.ru200001QA2 ');

  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByPlaceholder('First Name').fill('FirstName3');
  await page.getByPlaceholder('Last Name').fill('LastName3');
  await page.getByPlaceholder('name@example.com').fill('mytestemail3@mail.ru');
  await page.getByPlaceholder('Age').fill('33');
  await page.getByPlaceholder('Salary').fill('200003');
  await page.getByPlaceholder('Department').fill('QA3');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.locator('.rt-tbody').getByRole('row' , { name: 'FirstName3' })).toHaveText('FirstName3LastName333mytestemail3@mail.ru200003QA3 ');
});
