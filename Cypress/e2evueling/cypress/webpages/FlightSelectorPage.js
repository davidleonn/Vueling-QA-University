import "cypress-xpath/src/index";

export class FlightSelectorPage {
  //Elements

  selectFlight = {
    vuelingInbound: () => cy.get('#inboundFlightCardsContainer [codeshare="VY"]'),
    vuelingOutbound: () => cy.get('#outboundFlightCardsContainer [codeshare="VY"]'),
    iberiaInbound: () => cy.get('#inboundFlightCardsContainer [codeshare="IB"]'),
    iberiaOutbound: () => cy.get('#outboundFlightCardsContainer [codeshare="IB"]'),
  };

  fare = {
    timeFlex: () => cy.getId("timeFlexFareBox"),
    optima: () => cy.getId("optimaFareBox"),
    basic: () => cy.getId("basicFareBox"),
  };
  btnStvContinue = () => cy.getId("stvContinueButton");

  //Methods
  selectInboundFlight() {
    this.selectFlight.vuelingInbound().first().parent().should("be.visible");
    this.selectFlight.vuelingInbound().first().parent().click();
  }
  selectOutboundFlight() {
    this.selectFlight.vuelingOutbound().first().parent().should("be.visible");
    this.selectFlight.vuelingOutbound().first().parent().click();
  }
  selectFare() {
    cy.wait(2000);
    this.fare.basic().should("be.visible");
    this.fare.basic().click();
  }
  // Blows up, wait required
  continuePurchase() {
    this.btnStvContinue().should("be.visible");
    this.btnStvContinue().click();
  }
}
