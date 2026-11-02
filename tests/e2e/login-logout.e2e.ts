import { expect, test } from "@playwright/test";

const user = {
  customerId: "12345",
  name: "John Doe",
  email: "john.doe@email.com",
  joinDate: "2023-01-15",
  accountType: "premium",
  totalSpent: 15420.5,
  currency: "ZAR",
};

test("user can log in, view the dashboard, and log out", async ({ page }) => {
  await page.route("**/api/users/**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(user),
    });
  });

  const userResponsePromise = page.waitForResponse((response) =>
    response.url().endsWith("/api/users/12345"),
  );
  await page.goto("/");

  const signInButton = page.getByRole("button", {
    name: "Sign in with email",
  });
  await expect(signInButton).toBeVisible();
  const userResponse = await userResponsePromise;
  expect(userResponse.status()).toBe(200);
  expect(await userResponse.json()).toMatchObject(user);
  await expect(signInButton).toBeEnabled();

  await signInButton.click();
  await expect(page).toHaveURL(/\/dashboard\/12345$/);
  await expect(
    page.getByRole("button", { name: /Hi, John/ }),
  ).toBeVisible();

  await page.getByRole("button", { name: /Hi, John/ }).click();
  await page.getByRole("menuitem", { name: "Log out" }).click();

  await expect(page).toHaveURL("/");
  await expect(signInButton).toBeVisible();
});
