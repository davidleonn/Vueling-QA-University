import { HomePage } from "../webpages/HomePage";

describe("HomePage", () => {
  const homePage = new HomePage();
  let cityOrigin = "Barcelona";
  let cityDestiny = "Buenos Aires";

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
    homePage.selectOrigin(cityOrigin);
    homePage.selectDestiny(cityDestiny);
    homePage.changeTripType();
    homePage.selectMonthInCalendar("agosto");
    homePage.selectFirstDayAvailable();
    homePage.openPax();
    homePage.selectNumberOfAdults("2");
    homePage.selectNumberOfInfants("1");
    homePage.selectPassengers();
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
