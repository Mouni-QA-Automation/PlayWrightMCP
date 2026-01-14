import { Page, Locator } from '@playwright/test';

export class SearchResultsPage {
    readonly page: Page;
    readonly results: Locator;

    constructor(page: Page) {
        this.page = page;
        this.results = page.locator('.product-layout');
    }

    async resultsCount() {
        return this.results.count();
    }

    async openProductByName(name: string) {
        const productLink = this.page.locator(`a:has-text("${name}")`);
        await productLink.first().click();
    }
}
