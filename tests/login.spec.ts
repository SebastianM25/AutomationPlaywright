import { test, expect } from '@playwright/test';

const LOGIN_URL = '/web/index.php/auth/login';
const DASHBOARD_URL = '/web/index.php/dashboard/index';

test.describe('OrangeHRM Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL);
  });

  test('login valid - cu credențiale corecte utilizatorul ajunge pe dashboard', async ({
    page,
  }) => {
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: /login/i }).click();

    await expect(page).toHaveURL(new RegExp(DASHBOARD_URL));
    await expect(
      page.getByRole('heading', { name: /dashboard/i })
    ).toBeVisible();
  });

  test('login invalid - parolă greșită afișează mesaj de eroare', async ({
    page,
  }) => {
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('parolaGresita');
    await page.getByRole('button', { name: /login/i }).click();

    await expect(page).toHaveURL(LOGIN_URL);
    await expect(page.getByRole('alert')).toContainText(/invalid credentials/i);
  });

  test('login invalid - câmpuri goale afișează mesaj de eroare', async ({
    page,
  }) => {
    await page.getByRole('button', { name: /login/i }).click();

    await expect(page).toHaveURL(LOGIN_URL);
    await expect(page.getByText('Required').first()).toBeVisible();
  });
});
