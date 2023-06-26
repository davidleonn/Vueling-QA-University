import "cypress-xpath/src/index";

export class TicketsHomePage {
  // Elements
  cookiesButton = () => cy.getId("onetrust-accept-btn-handler");

  flightSelector = {
    btnOneWay: () => cy.get("label[for=AvailabilitySearchInputSearchView_OneWay]"),
    btnRoadTrip: () => cy.get("label[for=AvailabilitySearchInputSearchView_RoundTrip"),
  };

  searcher = {
    originInput: () => cy.getId("AvailabilitySearchInputSearchView_TextBoxMarketOrigin1"),
    destinationInput: () => cy.getId("AvailabilitySearchInputSearchView_TextBoxMarketDestination1"),
    options: (cityCode) => cy.get("a[data-id-code=" + cityCode + "]"),
  };

  datePicker = {
    leftMonthCalendar: () => cy.get(`td[data-month]`),
    btnNextMonth: () => cy.get("a.ui-datepicker-next"),
    availableDay: () => cy.get('[data-handler="selectDay"]'),
  };

  paxSelection = {
    ADTSelector: () => cy.getId("DropDownListPassengerType_ADT_PLUS"),
    ADTOption: (adt) => cy.getId("adtSelectorDropdown").select(`${adt}`),
    INFSelector: () => cy.get(".column_4.buscador_pasajeros_childs"),
    INFOption: (inf) => cy.getId("AvailabilitySearchInputSearchView_DropDownListPassengerType_INFANT").select(`${inf}`),
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
    this.searcher.options(origin).click();
    this.searcher.destinationInput().clear().type(destination).should("have.value", destination);
    this.searcher.options(destination).click();
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
  selectPassengers(adt, inf) {
    this.paxSelection.ADTSelector().click();
    this.paxSelection.ADTOption(adt).should("be.visible");
    this.paxSelection.INFSelector().click();
    this.paxSelection.INFOption(inf).should("be.visible");
  }

  confirmSearch() {
    this.btnSearchFlight().should("be.visible").click();
  }
}
