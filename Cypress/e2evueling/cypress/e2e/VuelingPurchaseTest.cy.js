import { TicketsHomePage } from "../webpages/TicketsHomePage"; // Webpage Import
import { FlightSelectorPage } from "../webpages/FlightSelectorPage"; // Webpage Import
import { PassengersInfoPage } from "../webpages/PassengersInfoPage";

// The container of the tests (must contain the same name as the file)
describe("Vueling e2e purchase test", () => {
  const ticketsHomePage = new TicketsHomePage(); // Object of the webpage
  const flightSelectorPage = new FlightSelectorPage();
  const passengersInfoPage = new PassengersInfoPage();

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
    let month = data.month;
    month = month - 1;
    const adultFirstName = cy.getRandomFirstName();
    const adultLastName = cy.getRandomLastName();
    const infantName = cy.getRandomFirstName();
    const infantLastName = cy.getRandomLastName();
    const email = adultFirstName + "@mailinator.com";

    ticketsHomePage.acceptCookies();
    ticketsHomePage.selectRoadTrip();
    ticketsHomePage.selectStations(data.origin, data.destination);
    ticketsHomePage.setLeftMonth(month);
    ticketsHomePage.selectArrivalandDeparture(data.days);
    ticketsHomePage.selectPassengers(data.adults, data.infants);
    ticketsHomePage.confirmSearch();

    cy.url().should("equal", "https://skysales-bilbo.vueling.com/ScheduleSelectNew.aspx");
    flightSelectorPage.selectOutboundFlight();
    flightSelectorPage.selectInboundFlight();
    flightSelectorPage.selectFare();
    flightSelectorPage.continuePurchase();

    cy.url().should("equal", "https://skysales-bilbo.vueling.com/PassengersInformation.aspx");
    passengersInfoPage.fillPassengersForm(
      data.adults,
      adultFirstName,
      adultLastName,
      data.infants,
      infantName,
      infantLastName
    );
    passengersInfoPage.fillContactForm(data.country, data.phone, email);
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    passengersInfoPage.acceptPolicyAndContinue();
  });
});
