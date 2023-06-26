import "cypress-xpath/src/index";

export class TicketsHomePage {
  // Elements
  cookiesButton = () => cy.getId("onetrust-accept-btn-handler");

  searcher = {
    originInput: () => cy.getId("AvailabilitySearchInputSearchView_TextBoxMarketOrigin1"),
    destinationInput: () => cy.getId("AvailabilitySearchInputSearchView_TextBoxMarketDestination1"),
    options: (cityCode) => cy.get("a[data-id-code=" + cityCode + "]"),
  };

  // Methods

  // Start a function
  acceptCookies() {
    this.cookiesButton().click().should("be.visible");
  }
  selectStations(origin, destination) {
    this.searcher.originInput().click().should("be.visible");
    this.searcher.originInput().clear().type(origin).should("have.value", origin);
    this.searcher.options(origin).click();

    this.searcher.destinationInput().clear().type(destination).should("have.value", destination);
    this.searcher.options(destination).click();
  }
}
