import { TicketsHomePage } from "../webpages/TicketsHomePage"; // Webpage Import
import { FlightSelectorPage } from "../webpages/FlightSelectorPage"; // Webpage Import

// The container of the tests (must contain the same name as the file)
describe("Vueling e2e purchase test", () => {
  const ticketsHomePage = new TicketsHomePage(); // Object of the webpage
  const flightSelectorPage = new FlightSelectorPage();

  let data = {};
  // This will be executed only once before and for all the tests
  before(() => {
    cy.fixture("flightData").then((jsonData) => {
      data = jsonData;
    });
  });

  beforeEach(() => {
    /*   Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    }); */
    cy.visit("/");
  });

  it("OW BCN-ATH 2ADT 1INF 1st Available in August", () => {
    const origin = data.origin;
    const destination = data.destination;
    let month = data.month;
    month = month - 1;
    const days = data.days;
    const adt = data.adt;
    const inf = data.inf;

    ticketsHomePage.acceptCookies();
    ticketsHomePage.selectRoadTrip();
    ticketsHomePage.selectStations(origin, destination);
    ticketsHomePage.setLeftMonth(month);
    ticketsHomePage.selectArrivalandDeparture(days);
    ticketsHomePage.selectPassengers(adt, inf);
    ticketsHomePage.confirmSearch();

    cy.url().should("equal", "https://skysales-bilbo.vueling.com/ScheduleSelectNew.aspx");
    flightSelectorPage.selectInboundFlight();
    flightSelectorPage.selectOutboundFlight();
    flightSelectorPage.selectFare();
    flightSelectorPage.continuePurchase();
  });
});
