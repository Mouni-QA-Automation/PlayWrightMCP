import { Page, Locator } from '@playwright/test';

export class ShoppingCartPage {
    readonly page: Page;
    readonly totalLabel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.totalLabel = page.locator('.cart-total');
    }
    async getTotal() {
        return this.totalLabel.textContent();
    }

    async updateQuantity(productName: string, qty: number) {
        const row = this.page.locator(`text=${productName}`).locator('xpath=..');
        const qtyInput = row.locator('input[name*="quantity"]');
        if (await qtyInput.count()) {
            await qtyInput.fill(String(qty));
            await row.locator('button.update').click();
        }
    }
}

