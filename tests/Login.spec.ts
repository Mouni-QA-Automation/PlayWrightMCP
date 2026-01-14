import {test,expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';       
import { MyAccountPage } from '../pages/MyAccountPage';
import { TestConfig } from '../test.config';

let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;
let config: TestConfig; 

test.beforeEach(async ({page})=>{
    config = new TestConfig();
    await page.goto(config.appUrl);
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    myAccountPage = new MyAccountPage(page);
});

test.afterEach(async ({page})=>{
    await page.waitForTimeout(2000); // just for demo purposes
    await page.close();
}); 

test('should login with valid credentials @master @sanity @regression', async ({page})=>{
    await homePage.clickMyAccount();
    await homePage.clickLogin();   
    
    await loginPage.login(config.email,config.password);
    const isMyAccountExists = await myAccountPage.isMyAccountPageDisplayed();
    expect(isMyAccountExists).toBeTruthy();
});
