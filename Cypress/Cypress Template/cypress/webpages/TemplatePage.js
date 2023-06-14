/// <reference types='cypress-xpath' />

import "cypress-xpath/src/index";

export class TemplatePage {
  // Elements
  cookiesButton = () => cy.getId("onetrust-accept-btn-handler"); // Search by ID
  alertBanner = () => cy.get("div.alert__message div"); // Search by CSS
  btnLogin = () => cy.get('[data-testid="submit_button"]'); // Search by XPATH
  inputErrorTextPNR = () => cy.get("#emailForm_recordlocator p.validation-info--error");

  // Methods

  // Start a function
  acceptCookies() {
    this.cookiesButton().click().should("be.visible"); // Action click with an assert
  }

  verificationPage() {
    cy.location("pathname", { timeout: 10000 }).should("eq", "/checkin"); // Assert with timeout
  }

  // Start a function with required args
  loginEmail(pnr, email) {
    this.inputPNR().clear().type(pnr).should("have.value", pnr); // Clear the field, type something into it and assert the text inserted
    this.inputEmail().type(email).should("have.value", email); // Do the same as above, but without clearing the field
  }
}
