/// <reference types='cypress-xpath' />

import "cypress-xpath/src/index";

export class HomePage {
  // Elements
  cookiesButton = () => cy.getId("ensCloseBanner"); // Search by ID
  selectTripDropdown = () => cy.get("[data-target='dropdown-trip']");
  oneWayTrip = () => {
    cy.get("a[value='OW']");
  };

  // Methods
  acceptCookies() {
    this.cookiesButton().should("be.visible"); // Action click with an assert
    this.cookiesButton().click(); // Action click with an assert
  }

  selectOW = () => {
    this.selectTripDropdown().click();
    this.oneWayTrip().click();
  };
}
