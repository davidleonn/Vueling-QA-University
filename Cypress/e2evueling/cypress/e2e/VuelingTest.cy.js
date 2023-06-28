import { VuelingHomePage } from "../webpages/VuelingHomePage";
// The container of the tests (must contain the same name as the file)
describe("Vueling  test", () => {
  const vuelingHomePage = new VuelingHomePage(); // Object of the webpage

  beforeEach(() => {
    /*   Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    }); */
    cy.visit("https://www.vueling.com/es");
  });

  it("OW BCN-ATH 2ADT 1INF 1st Available in August", () => {
    vuelingHomePage.acceptCookies();
    vuelingHomePage.fillDestination("Madrid");
    vuelingHomePage.setMonthToLeft("Octubre");
    vuelingHomePage.selectFirstAvailableDay();
    vuelingHomePage.selectReturnDay("10");
    vuelingHomePage.selectNumberOfAdults("3");
    vuelingHomePage.selectNumberOfChilds("2");
  });
});
