/// <reference types='cypress-xpath' />

export class CartPage {
  //Locators
  btnPlaceOrder = () => cy.get("[data-target='#orderModal']");
  formName = () => cy.get("#name");
  formCountry = () => cy.get("#country");
  formCity = () => cy.get("#city");
  formCard = () => cy.get("#card");
  formMonth = () => cy.get("#month");
  formYear = () => cy.get("#year");
  btnPurchase = () => cy.get("[onclick ='purchaseOrder()']");
  imgSuccess = () => cy.get(".sa-success");
  tableBody = () => cy.get("#tbodyid");
  deleteItemButton = () => cy.xpath("(//a[contains(@onclick , 'delete')])[1]");

  //Functions
  placeOrder() {
    this.tableBody().should("not.to.be.empty");
    this.btnPlaceOrder().click();
  }

  fillPurchaseForm() {
    cy.fixture("formData").then((formData) => {
      this.formName().type(formData.name);
      this.formCountry().type(formData.country);
      this.formCity().type(formData.city);
      this.formCard().type(formData.credit_card);
      this.formMonth().type(formData.month);
      this.formYear().type(formData.year);
      this.btnPurchase().click();
    });
  }

  assertPurchaseCompleted() {
    this.imgSuccess().should("exist").and("be.visible");
  }
}
