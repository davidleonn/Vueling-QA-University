import "cypress-xpath/src/index";

export class VuelingHomePage {
  //Elements

  btnCookies = () => cy.getId("onetrust-accept-btn-handler");

  searcher = {
    destinationInput: () => cy.getId("destinationInput"),
    destinationList: () => cy.getId("popup-list"),
  };

  datePicker = {
    month: () => cy.get("span.ui-datepicker-month"),
    btnNextMonth: () => cy.getId("nextButtonCalendar"),
    firstDayAvailable: () => cy.get(".ui-datepicker-calendar [tabindex='0']"),
    returnDay: (day) => cy.getId(`calendarDaysTable20239${day}`),
  };

  paxSelector = {
    adultsText: () => cy.get("[aria-label='Adultos A partir de 16 años cuando vueles'] [class='number']"),
    btnSelectAdults: () => cy.getId("adultsIncrease"),
    childsText: () => cy.get(`[aria-label='Niños 2 - 15 años cuando vueles'] [class='number']`),
    btnSelectChilds: () => cy.getId("childrenIncrease"),
  };

  //Methods
  acceptCookies() {
    this.btnCookies().should("be.visible").click();
  }
  fillDestination(destination) {
    this.searcher.destinationInput().type(destination);
    this.searcher.destinationList().first().should("be.visible");
    this.searcher.destinationList().first().click();
  }
  setMonthToLeft(month) {
    this.datePicker.month().should("be.visible");
    this.datePicker
      .month()
      .first()
      .invoke("text")
      .then((monthName) => {
        Cypress.on("uncaught:exception", (err, runnable) => {
          return false;
        });
        if (monthName !== month) {
          this.datePicker.btnNextMonth().click();
          return this.setMonthToLeft(month);
        }
      });
  }
  selectFirstAvailableDay() {
    this.datePicker.firstDayAvailable().click();
  }
  selectReturnDay(day) {
    this.datePicker.returnDay(day).should("be.visible");
    this.datePicker.returnDay(day).click();
  }
  selectNumberOfAdults(adultsQuantity) {
    this.paxSelector.adultsText().should("be.visible");
    this.paxSelector
      .adultsText()
      .first()
      .invoke("text")
      .then((numberOfAdults) => {
        if (numberOfAdults !== adultsQuantity) {
          this.paxSelector.btnSelectAdults().click();
          return this.selectNumberOfAdults(adultsQuantity);
        }
      });
  }
  selectNumberOfChilds(childsQuantity) {
    this.paxSelector.childsText().should("be.visible");
    this.paxSelector
      .childsText()
      .invoke("text")
      .then((numberOfChilds) => {
        if (numberOfChilds !== childsQuantity) {
          this.paxSelector.btnSelectChilds().click();
          return this.selectNumberOfChilds(childsQuantity);
        }
      });
  }
}
