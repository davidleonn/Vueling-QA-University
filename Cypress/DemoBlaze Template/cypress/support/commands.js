// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })../../screenshots/

import addContext from "mochawesome/addContext";

// Cypress.Commands.add("addContext", (context, imgValue= 'noImgAttached') => {
//   const screenshotsFolder = "../screenshots/";
//   cy.once("test:after:run", (test) => addContext({ test }, context, `${screenshotsFolder}${{test}}/${imgValue}`))
// });
Cypress.Commands.add("addContext", (context) => {
  cy.once("test:after:run", (test) => addContext({ test }, context));
});
Cypress.Commands.add("getId", (id) => {
  // Command 'cy.getId' for search by Id
  cy.get(`#${id}`);
});

Cypress.Commands.add("error", (text) => {
  throw new Error(text);
});

Cypress.Commands.add("addScreshotContext", (text) => {
  cy.screenshot();
  cy.addTestContext(text);
});

//! Create after more commands for cypress
