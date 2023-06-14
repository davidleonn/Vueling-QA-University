/// <reference types='cypress-xpath' />

export class ProductPage {
  //Locators
  btnAddToCart = () => cy.get("[onclick='addToCart(1)']");
  btnNavigateToCart = () => cy.getId("cartur");

  //Functions
  addAndNavigateToCart() {
    this.btnAddToCart().should("exist");
    this.btnAddToCart().click();
    this.btnNavigateToCart().click();
  }
}
