import { HomePage } from "../webpages/HomePage"; // Webpage Import

// The container of the tests (must contain the same name as the file)
describe("TemplateTest", () => {
  // * let/const for all the tests
  let newUsername = cy.getRandomFirstName();
  let newPassword = cy.getRandomString(4);
  const username = "david93";
  const password = "test";

  const homePage = new HomePage(); // Object of the webpage

  // This will be executed only once before and for all the tests
  before(() => {});

  // This will be executed before the execution of every test
  beforeEach(() => {
    // Must be included to go to the specified URL
    cy.visit(""); //Url taken from environment json
  });

  // Independent Test Case
  it("Verify new user signup", () => {
    homePage.registerNewUser(newUsername, newPassword);
    homePage.clickLogout();
    homePage.checkUserIsLogedOut();
  });

  it("Verify login and check if user is logged in", () => {
    homePage.loginUser(username, password);
    homePage.checkUserIsLoged(username);
    homePage.clickLogout();
    homePage.checkUserIsLogedOut();
  });

  it("Verify logout and check if user is logged out ", () => {
    homePage.loginUser(username, password);
    homePage.checkUserIsLoged(username);
    homePage.clickLogout();
    homePage.checkUserIsLogedOut();
  });

  // This will be executed only once after and for all the tests
  after(() => {});

  // This will be executed after the execution of every test
  afterEach(() => {
    // This will save a screenshot into the screenshots folder
    cy.addContext("Screenshot taken. You can see it in ./cypress/screenshots");
  });
});
