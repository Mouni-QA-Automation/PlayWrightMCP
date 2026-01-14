import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductPage } from '../pages/ProductPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { TestConfig } from '../test.config';

let homePage: HomePage;
let searchResultsPage: SearchResultsPage;
let productPage: ProductPage;
let shoppingCartPage: ShoppingCartPage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;
let checkoutPage: CheckoutPage;
let config: TestConfig;

test.beforeEach(async ({ page }) => {
    config = new TestConfig();
    await page.goto(config.appUrl);
    homePage = new HomePage(page);
    searchResultsPage = new SearchResultsPage(page);
    productPage = new ProductPage(page);
    shoppingCartPage = new ShoppingCartPage(page);
    loginPage = new LoginPage(page);
    myAccountPage = new MyAccountPage(page);
    checkoutPage = new CheckoutPage(page);
});

test('end-to-end: login, search, add to cart, checkout @e2e', async ({ page }) => {
    // Login
    await homePage.clickMyAccount();
    await homePage.clickLogin();
    await loginPage.login(config.email, config.password);
    expect(await myAccountPage.isMyAccountPageDisplayed()).toBeTruthy();

    // Search and add product to cart
    await homePage.search(config.productName);
    expect(await searchResultsPage.resultsCount()).toBeGreaterThan(0);
    await searchResultsPage.openProductByName(config.productName);
    await productPage.addToCart(Number(config.productQuantity));

    // Go to cart (assume cart icon/link is available in header)
    await page.click('a[title="Shopping Cart"], #cart, .cart-icon, .fa-shopping-cart');
    const total = await shoppingCartPage.getTotal();
    expect(total).toContain(config.totalPrice);

    // Proceed to checkout (assume button/link exists)
    await page.click('a:has-text("Checkout"), button:has-text("Checkout")');
    // Place order (if possible)
    // await checkoutPage.placeOrder();
    // Optionally, verify order confirmation
    // const orderTotal = await checkoutPage.getOrderTotal();
    // expect(orderTotal).toContain(config.totalPrice);
});
