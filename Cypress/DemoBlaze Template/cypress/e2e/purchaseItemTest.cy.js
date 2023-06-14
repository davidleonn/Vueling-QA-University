import { CartPage } from "../webpages/CartPage";
import { HomePage } from "../webpages/HomePage"; // Webpage Import
import { ProductPage } from "../webpages/ProductPage";

describe("TemplateTest", () => {
  // * let/const for all the tests
  const username = "david93";
  const password = "test";

  const homePage = new HomePage(); // Object of the webpage
  const productPage = new ProductPage();
  const cartPage = new CartPage();

  // This will be executed only once before and for all the tests
  before(() => {});

  // This will be executed before the execution of every test
  beforeEach(() => {
    // Must be included to go to the specified URL
    cy.visit(""); //Url taken from environment json
  });

  it("Buy a phone", () => {
    homePage.loginUser(username, password);
    homePage.checkUserIsLoged(username);
    homePage.navigateToItem();
    productPage.addAndNavigateToCart();
    cartPage.placeOrder();
    cartPage.fillPurchaseForm();
    cartPage.assertPurchaseCompleted();
    homePage.clickLogout();
    homePage.checkUserIsLogedOut();
  });
});
