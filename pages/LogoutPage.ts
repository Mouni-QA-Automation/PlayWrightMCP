import { Page, Locator } from '@playwright/test';

export class LogoutPage {
    readonly page: Page;
    readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoutLink = page.locator('a:text("Logout")');
    }

    async logout() {
        await this.logoutLink.click();
    }
}
