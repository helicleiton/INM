import { test, expect } from "../playwright-fixture";

test("home carrega e navega", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Instituto Novo Milênio/i);

  await page.getByRole("link", { name: /Projetos|Projects/i }).click();
  await expect(page).toHaveURL(/\/projetos/);
});

test("banner de consentimento aparece e aceita", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.removeItem("inm.cookieConsent.v1");
  });

  await page.goto("/");
  await expect(page.getByText(/Privacidade|Privacy/i)).toBeVisible();
  await page.getByRole("button", { name: /Aceitar|Accept/i }).click();
  await expect(page.getByText(/Privacidade|Privacy/i)).toBeHidden();
});

