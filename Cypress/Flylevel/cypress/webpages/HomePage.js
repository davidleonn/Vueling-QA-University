/// <reference types='cypress-xpath' />

import "cypress-xpath/src/index";

export class HomePage {
  // ELEMENTS

  btnAcceptCookies = () => cy.getId("ensCloseBanner");
  btnOrigin = () => cy.get("[data-field='origin']");
  inputOrigin = () => cy.get("input[placeholder='¿Desde dónde?']");
  btnOriginSearched = () => cy.get(".origin .group-info:not(.hidden)");
  inputDestiny = () => cy.get("input[placeholder='¿A dónde?']");
  btnDestinySearched = () => cy.get(".destination .group-info:not(.hidden)");
  toogleTripType = () => cy.get(".switch .lever");
  firstMonthName = () => cy.get(".datepicker__month:first-of-type .month");
  btnNextMonth = () => cy.get(".icon-chevron-green-arrow");
  firstDayAvailable = () => cy.get(".datepicker__day:not(.is-previous-month)").first();
  passengersInput = () => cy.get(".pax-dropdown").first();
  btnSelectAdults = () => cy.get(".pax-item[data-field='adult'] .js-plus");
  numberOfAdultsText = () => cy.get(".pax-item[data-field='adult'] .pax-count");
  btnSelectInfants = () => cy.get(".pax-item[data-field='infant'] .js-plus");
  numberOfInfantsText = () => cy.get(".pax-item[data-field='infant'] .pax-count");
  btnPassengersSubmit = () => cy.get(".btn-pax.large");

  btnSearchFlight = () => cy.getId("searcher_submit_buttons");
  // FUNCTIONS

  acceptCookies() {
    this.btnAcceptCookies().should("be.visible");
    this.btnAcceptCookies().click();
  }

  selectOrigin(city) {
    this.btnOrigin().click().should("be.visible");
    this.inputOrigin().clear().type(city, { force: true }).should("have.value", city);
    this.btnOriginSearched().click();
  }

  selectDestiny(city) {
    this.inputDestiny().clear().type(city, { force: true }).should("have.value", city);
    this.btnDestinySearched().click();
  }

  changeTripType() {
    this.toogleTripType().should("be.visible");
    this.toogleTripType().click();
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  }

  selectMonthInCalendar(month) {
    this.firstMonthName().should("be.visible");
    this.firstMonthName()
      .invoke("text")
      .then((monthName) => {
        Cypress.on("uncaught:exception", (err, runnable) => {
          return false;
          // returning false here prevents Cypress from
          // failing the test
        });
        if (monthName !== month) {
          this.btnNextMonth().click();
          return this.selectMonthInCalendar(month);
        }
      });
    cy.scrollTo("top");
  }
  selectFirstDayAvailable() {
    this.firstDayAvailable().should("be.visible");
    this.firstDayAvailable().click();
  }

  openPax() {
    this.passengersInput().should("be.visible");
    this.passengersInput().click();
  }

  selectNumberOfAdults(adultsQuantity) {
    this.numberOfAdultsText().should("be.visible");
    this.numberOfAdultsText()
      .invoke("text")
      .then((numberOfAdults) => {
        if (numberOfAdults !== adultsQuantity) {
          this.btnSelectAdults().click();
          return this.selectNumberOfAdults(adultsQuantity);
        }
      });
  }

  selectNumberOfInfants(infantsQuantity) {
    this.numberOfInfantsText().should("be.visible");
    this.numberOfInfantsText()
      .invoke("text")
      .then((numberOfInfants) => {
        if (numberOfInfants !== infantsQuantity) {
          this.btnSelectInfants().click();
          return this.selectNumberOfInfants(infantsQuantity);
        }
      });
  }

  selectPassengers() {
    this.btnPassengersSubmit().should("be.visible");
    this.btnPassengersSubmit().click();
  }

  searchFlightClick() {
    this.btnSearchFlight().should("be.visible");
    this.btnSearchFlight().click({ force: true });
  }
}
