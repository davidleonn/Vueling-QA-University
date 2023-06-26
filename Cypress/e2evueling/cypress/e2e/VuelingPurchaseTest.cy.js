import { TicketsHomePage } from "../webpages/TicketsHomePage"; // Webpage Import

// The container of the tests (must contain the same name as the file)
describe("purchaseTest", () => {
  // * let/const for all the tests

  const ticketsHomePage = new TicketsHomePage(); // Object of the webpage
  let data = {};
  // This will be executed only once before and for all the tests
  before(() => {
    cy.fixture("flightData").then((jsonData) => {
      data = jsonData;
    });
  });

  beforeEach(() => {
    cy.visit("/");
  });

  it("OW BCN-ATH 2ADT 1INF 1st Available in August", () => {
    const origin = data.origin;
    const destination = data.destination;

    ticketsHomePage.acceptCookies();
    ticketsHomePage.selectStations(origin, destination);
  });
});
