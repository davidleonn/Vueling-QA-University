import { TemplatePage } from "../webpages/TemplatePage"; // Webpage Import

// The container of the tests (must contain the same name as the file)
describe("TemplateTest", () => {
  // * let/const for all the tests

  const templatePage = new TemplatePage(); // Object of the webpage

  // This will be executed only once before and for all the tests
  before(() => {});

  // This will be executed before the execution of every test
  beforeEach(() => {
    // Must be included to go to the specified URL
    cy.visit("");
  });

  // Independent Test Case
  it("Verify the error - Invalid PNR (PNR + Email)", () => {
    // Path added to the base URL
    cy.visit("/index.html");
  });

  // This will be executed only once after and for all the tests
  after(() => {});

  // This will be executed after the execution of every test
  afterEach(() => {
    // This will save a screenshot into the screenshots folder
    cy.screenshot(`Screenshot_PNR_${pnr}`);
  });
});
