import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly logo: Locator;
    readonly myAccountLink: Locator;
    readonly registerLink: Locator;
    readonly loginLink: Locator;
    readonly searchButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('input[name="search"]');
        this.logo = page.locator('a.logo');
        this.myAccountLink = page.locator('span:has-text("My Account")');
        this.registerLink = page.locator('a:has-text("Register")');
        this.loginLink = page.locator('a:has-text("Login")');
        this.searchButton = page.locator('button[type="submit"]');
    }
    async search(term: string) {
        await this.searchInput.fill(term);
        await this.searchInput.press('Enter');
    }

    async isHomepageExists(): Promise<boolean> {
        if ((await this.logo.isVisible().catch(() => false)) || (await this.searchInput.isVisible().catch(() => false))) {
            return true;
        }
        return false;
    }

    async clickMyAccount(): Promise<void> {
        await this.myAccountLink.click();
    }

    async clickRegister(): Promise<void> {
        await this.registerLink.click();
    }

    async clickLogin(): Promise<void> {
        await this.loginLink.click();
    }
}
