import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { RandomDataGenerator } from '../utils/randomDataGenerator';
import { TestConfig } from '../test.config';

let homePage: HomePage;
let reg: RegistrationPage;
let config: TestConfig;

test.beforeEach(async ({ page }) => {
    config = new TestConfig();
    await page.goto(config.appUrl);
    homePage = new HomePage(page);
    reg = new RegistrationPage(page);
});

test.afterEach(async ({ page }) => {
    await page.waitForTimeout(2000); // just for demo purposes
    await page.close();
});

test('should register a new account with generated data @master @sanity @regression', async () => {

    await homePage.clickMyAccount();
    await homePage.clickRegister();
    // fill form using page methods
    await reg.fillFirstName(RandomDataGenerator.generateFirstName());
    await reg.fillLastName(RandomDataGenerator.generateLastName());
    await reg.fillEmail(RandomDataGenerator.generateEmail());
    await reg.fillTelephone(RandomDataGenerator.generateTelephone());
    const password = RandomDataGenerator.generatePassword();
    await reg.fillPassword(password);
    await reg.fillPasswordConfirm(password);
    await reg.setPrivacyPolicy();
    await reg.submit();

    const conformationMsg = await reg.msgConfirmation.textContent();
    expect(conformationMsg).toContain('Your Account Has Been Created!');


});
