import { HomePage } from "../webpages/HomePage"; // Webpage Import

// The container of the tests (must contain the same name as the file)
describe("Flylevel Test Cases", () => {
  const homePage = new HomePage();

  // This will be executed before the execution of every test
  beforeEach(() => {
    // Must be included to go to the specified URL
    cy.visit("", {
      headers: {
        accept: "application/json, text/plain, */*",
        "user-agent": "axios/0.27.2",
      },
    });
  });

  // Independent Test Case
  it("Verify the E2E flux OW BCN-EZE 2ADT 1INF 1st day available August", () => {
    homePage.acceptCookies();
    homePage.selectOW();
  });
});
