import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductPage } from '../pages/ProductPage';
import { TestConfig } from '../test.config';

let homePage: HomePage;
let searchResultsPage: SearchResultsPage;
let productPage: ProductPage;
let config: TestConfig;

test.beforeEach(async ({ page }) => {
  config = new TestConfig();
  await page.goto(config.appUrl);
  homePage = new HomePage(page);
  searchResultsPage = new SearchResultsPage(page);
  productPage = new ProductPage(page);
});

test('should search for a product and open its details @master @sanity @regression', async ({ page }) => {
  await homePage.search(config.productName);
  const count = await searchResultsPage.resultsCount();
  expect(count).toBeGreaterThan(0);

  await searchResultsPage.openProductByName(config.productName);
  const price = await productPage.getPrice();
  expect(price).toBeTruthy();
});
