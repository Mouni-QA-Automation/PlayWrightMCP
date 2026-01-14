import { Page, Locator } from '@playwright/test';
import { LogoutPage } from './LogoutPage';

export class MyAccountPage {
    readonly page: Page;
    readonly msgHeading: Locator; 
    readonly lnkLogout: Locator;  


    constructor(page: Page) {
        this.page = page;
        this.msgHeading = page.locator('h2:text("My Account")');
        this.lnkLogout = page.locator('a:text("Logout")');
       
    }

    async isMyAccountPageDisplayed() {
        return await this.msgHeading.isVisible();
    }   

    async clickLogout() {
        const logoutPage = new LogoutPage(this.page);
        await this.lnkLogout.click();
    }

    async getPageTitle(): Promise<string> {
        return this.page.title();
    }   
}
