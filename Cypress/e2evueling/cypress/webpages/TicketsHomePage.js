import "cypress-xpath/src/index";

export class TicketsHomePage {
  // Elements
  cookiesButton = () => cy.getId("onetrust-accept-btn-handler");

  flightSelector = {
    btnOneWay: () => cy.get("[for=AvailabilitySearchInputSearchView_OneWay]"),
    btnRoadTrip: () => cy.get("[for=AvailabilitySearchInputSearchView_RoundTrip]"),
  };

  searcher = {
    originInput: () => cy.getId("AvailabilitySearchInputSearchView_TextBoxMarketOrigin1"),
    destinationInput: () => cy.getId("AvailabilitySearchInputSearchView_TextBoxMarketDestination1"),
    selectCity: (cityCode) => cy.get(`[data-id-code="${cityCode}"]`),
  };

  datePicker = {
    leftMonthCalendar: () => cy.get(`td[data-month]`),
    btnNextMonth: () => cy.get("a.ui-datepicker-next"),
    availableDay: () => cy.get('[data-handler="selectDay"]'),
  };

  paxSelection = {
    ADTSelector: () => cy.get(".adt_select_button#DropDownListPassengerType_ADT_PLUS"),
    ADTOption: () => cy.getId("adtSelectorDropdown"),
    INFSelector: () => cy.get(".column_4.buscador_pasajeros_childs"),
    INFOption: () => cy.getId("AvailabilitySearchInputSearchView_DropDownListPassengerType_INFANT"),
  };

  btnSearchFlight = () => cy.getId("AvailabilitySearchInputSearchView_btnClickToSearchNormal");

  // Methods

  acceptCookies() {
    this.cookiesButton().click().should("be.visible");
  }
  selectOneWay() {
    this.flightSelector.btnOneWay().click();
  }
  selectRoadTrip() {
    this.flightSelector.btnRoadTrip().click();
  }
  selectStations(origin, destination) {
    this.searcher.originInput().click().should("be.visible");
    this.searcher.originInput().clear().type(origin).should("have.value", origin);
    this.searcher.selectCity(origin).click();
    this.searcher.destinationInput().clear().type(destination).should("have.value", destination);
    this.searcher.selectCity(destination).click();
  }
  setLeftMonth(month) {
    this.datePicker
      .leftMonthCalendar()
      .invoke("attr", "data-month")
      .then(($dataMonth) => {
        if ($dataMonth != month) {
          this.datePicker.btnNextMonth().click();
          this.setLeftMonth(month);
        }
      });
  }
  selectAvailableDay() {
    this.datePicker.availableDay().first().should("be.visible").click();
  }
  selectArrivalandDeparture(tripDays) {
    this.datePicker.availableDay().first().click({ force: true });
    this.datePicker.availableDay().eq(tripDays).click({ force: true });
  }
  selectPassengers(adt, inf) {
    this.paxSelection.ADTSelector().click();
    this.paxSelection.ADTOption().select(adt).should("be.visible");
    this.paxSelection.INFSelector().click();
    this.paxSelection.INFOption().select(inf).should("be.visible");
  }
  confirmSearch() {
    this.btnSearchFlight().should("be.visible").click();
  }
}
