import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly confirmButton: Locator;
    readonly orderTotal: Locator;

    constructor(page: Page) {
        this.page = page;
        this.confirmButton = page.locator('button#button-confirm');
        this.orderTotal = page.locator('.order-total');
    }
    async placeOrder() {
        await this.confirmButton.click();
    }

    async getOrderTotal() {
        return this.orderTotal.textContent();
    }
}

