import { HomePage } from "../webpages/HomePage";

describe("E2E test for flylevel one way flight BCN-BuenosAires 2 adults 1 infant", () => {
  const homePage = new HomePage();
  let dataObject = {};

  before(() => {
    cy.fixture("flightData").then((data) => {
      dataObject = data;
    });
  });

  beforeEach(() => {
    cy.visit("", {
      headers: {
        accept: "application/json, text/plain, */*",
        "user-agent": "axios/0.27.2",
      },
    });
  });

  it("Verify a purchase of a flight OW 2ADT 1INF", () => {
    homePage.acceptCookies();
    homePage.selectOrigin(dataObject.cityOrigin);
    homePage.selectDestiny(dataObject.cityDestiny);
    homePage.changeTripType();
    cy.screenshot("Screenshot_After_Flight_Selection");
    homePage.selectMonthInCalendar(dataObject.month);
    homePage.selectFirstDayAvailable();
    cy.screenshot("Screenshot_After_Date_Picker");
    homePage.openPax();
    homePage.selectNumberOfAdults(dataObject.adults);
    homePage.selectNumberOfInfants(dataObject.infants);
    homePage.selectPassengers();
    cy.screenshot("Screenshot_After_Passengers_Selection");
    homePage.searchFlightClick();
  });

  // This will be executed only once after and for all the tests
  after(() => {});

  // This will be executed after the execution of every test
  afterEach(() => {
    // This will save a screenshot into the screenshots folder
    cy.screenshot("Screenshot_E2E_OW");
    cy.addContext("Screenshot taken. You can see it in ./cypress/screenshots");
  });
});
