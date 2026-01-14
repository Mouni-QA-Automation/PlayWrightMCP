import { DataProvider } from "../utils/dataProvider";
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { TestConfig } from '../test.config';
import { LoginPage } from "../pages/LoginPage";

let homePage: HomePage;
let reg: RegistrationPage;
let myAccountPage: MyAccountPage;
let config: TestConfig;
let login: LoginPage;

const jsonpath = './data/logindata.json';
const jsonTestData = DataProvider.getDataFromJson(jsonpath);


test.beforeEach(async ({ page }) => {
    config = new TestConfig();
    await page.goto(config.appUrl);
    homePage = new HomePage(page);
    reg = new RegistrationPage(page);
    myAccountPage = new MyAccountPage(page);
    login = new LoginPage(page);
});     
test.afterEach(async ({ page }) => {
    await page.waitForTimeout(2000); // just for demo purposes
    await page.close();
});     

for (const data of jsonTestData) {
    test(`Login with valid credentials: ${data.testName} @datadriven`, async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogin();
        await login.login(data.email, data.password);
        if(data.expected.toLowerCase() === 'success') {
            const isMyAccountExists = await myAccountPage.isMyAccountPageDisplayed();
            expect(isMyAccountExists).toBeTruthy();
        } else {
            const errorMessage = await login.getErrorMessage();
            expect(errorMessage).toBe(' Warning: No match for E-Mail Address and/or Password.');
        }               
        
    });
}       
