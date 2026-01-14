import { Page, Locator } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly quantityInput: Locator;
    readonly addToCartBtn: Locator;
    readonly priceLabel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.quantityInput = page.locator('input[name="quantity"]');
        this.addToCartBtn = page.locator('button#button-cart');
        this.priceLabel = page.locator('.price');
    }

    async addToCart(quantity = 1) {
        await this.quantityInput.fill(String(quantity));
        await this.addToCartBtn.click();
    }

    async getPrice() {
        return this.priceLabel.textContent();
    }
}
