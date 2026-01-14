import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductPage } from '../pages/ProductPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';
import { TestConfig } from '../test.config';

let homePage: HomePage;
let searchResultsPage: SearchResultsPage;
let productPage: ProductPage;
let shoppingCartPage: ShoppingCartPage;
let config: TestConfig;

test.beforeEach(async ({ page }) => {
    config = new TestConfig();
    await page.goto(config.appUrl);
    homePage = new HomePage(page);
    searchResultsPage = new SearchResultsPage(page);
    productPage = new ProductPage(page);
    shoppingCartPage = new ShoppingCartPage(page);
});

test('should add product to cart and verify total @master @sanity @regression', async ({ page }) => {
    await homePage.search(config.productName);
    await searchResultsPage.openProductByName(config.productName);
    await productPage.addToCart(Number(config.productQuantity));
    // Navigate to cart page (assume /cart or via UI, update as needed)
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=checkout/cart');
    const total = await shoppingCartPage.getTotal();
    expect(total).toContain(config.totalPrice);
});
