/// <reference types='cypress-xpath' />

import "cypress-xpath/src/index";

export class HomePage {
  // Elements
  cookiesButton = () => cy.getId("onetrust-accept-btn-handler"); // Search by ID
  navbarLoginLink = () => cy.getId("login2");
  navbarSignupLink = () => cy.get("[data-target='#signInModal']"); // Search by CSS
  btnSignup = () => cy.xpath("//button[text()='Sign up']"); // Search by XPATH
  signupUsernameInput = () => cy.getId("sign-username");
  signupPasswordInput = () => cy.getId("sign-password");
  loginInputUserName = () => cy.getId("loginusername");
  loginInputPassword = () => cy.getId("loginpassword");
  btnLogin = () => cy.get("button[onclick='logIn()']");
  userIsLogedText = () => cy.getId("nameofuser");
  btnLogout = () => cy.getId("logout2");
  itemTextLink = () => cy.xpath("//a[text()='Samsung galaxy s6']");

  // Methods

  // Start a function

  acceptCookies() {
    this.cookiesButton().click().should("be.visible"); // Action click with an assert
  }

  verificationPage() {
    cy.location("pathname", { timeout: 10000 }).should("eq", "/checkin"); // Assert with timeout
  }

  // Start a function with required args
  registerNewUser(name, pass) {
    this.navbarSignupLink().click();
    this.btnSignup().should("be.visible");
    this.signupUsernameInput().clear().type(name, { force: true }).should("have.value", name); //Type a username and use force in case cypress does not write it all (if its too long)
    this.signupPasswordInput().clear().type(pass).should("have.value", pass);
    this.btnSignup().click({ force: true });
  }
  checkUserIsLogedOut() {
    this.navbarLoginLink().should("be.visible");
    this.loginInputUserName();
  }
  loginUser(username, password) {
    this.navbarLoginLink().click();
    this.loginInputUserName().clear().type(username, { force: true }).should("have.value", username);
    this.loginInputPassword().clear().type(password).should("have.value", password);
    this.btnLogin().click({ force: true }).should("be.visible");
  }
  clickLogout() {
    this.btnLogout().click({ force: true });
  }
  checkUserIsLoged(username) {
    this.userIsLogedText().should("have.text", "Welcome " + username);
  }
  navigateToItem() {
    this.itemTextLink().click();
  }
}
