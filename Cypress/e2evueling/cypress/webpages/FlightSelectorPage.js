import "cypress-xpath/src/index";

export class FlightSelectorPage {
  //Elements

  selectFlight = {
    vuelingOutbound: () => cy.get('#outboundFlightCardsContainer [codeshare="VY"]'),
    vuelingInbound: () => cy.get('#inboundFlightCardsContainer [codeshare="VY"]'),
    iberiaOutbound: () => cy.get('#outboundFlightCardsContainer [codeshare="IB"]'),
    iberiaInbound: () => cy.get('#inboundFlightCardsContainer [codeshare="IB"]'),
  };

  fare = {
    timeFlex: () => cy.getId("timeFlexFareBox"),
    optima: () => cy.getId("optimaFareBox"),
    basic: () => cy.getId("basicFareBox"),
  };
  btnStvContinue = () => cy.getId("stvContinueButton");

  //Methods
  selectOutboundFlight() {
    this.selectFlight.vuelingOutbound().first().parent().should("be.visible");
    this.selectFlight.vuelingOutbound().first().parent().click();
  }
  selectInboundFlight() {
    this.selectFlight.vuelingInbound().first().parent().should("be.visible");
    this.selectFlight.vuelingInbound().first().parent().click();
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
