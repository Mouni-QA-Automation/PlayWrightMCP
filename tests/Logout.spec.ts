import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { LogoutPage } from '../pages/LogoutPage';
import { TestConfig } from '../test.config';

let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;
let logoutPage: LogoutPage;
let config: TestConfig;

test.beforeEach(async ({ page }) => {
    config = new TestConfig();
    await page.goto(config.appUrl);
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    myAccountPage = new MyAccountPage(page);
    logoutPage = new LogoutPage(page);
});

test.afterEach(async ({ page }) => {
    await page.waitForTimeout(2000); // just for demo purposes
    await page.close();
});

test('should logout successfully @master @regression', async ({ page }) => {
    await homePage.clickMyAccount();
    await homePage.clickLogin();
    await loginPage.login(config.email, config.password);
    const isMyAccountExists = await myAccountPage.isMyAccountPageDisplayed();
    expect(isMyAccountExists).toBeTruthy();

    await myAccountPage.clickLogout();
    // Optionally, verify that the user is redirected to the login page or sees a logout confirmation
    // For example, check if the login link is visible again
    const loginLinkVisible = await homePage.loginLink.isVisible();
    expect(loginLinkVisible).toBeTruthy();
});
