import "cypress-xpath/src/index";

export class PassengersInfoPage {
  // Elements
  adultInfo = {
    firstName: (number) =>
      cy.getId(`ContactViewControlGroupMainContact_BoxPassengerInformationView_TextBoxFirstName_${number}`),
    lastName: (number) =>
      cy.getId(`ContactViewControlGroupMainContact_BoxPassengerInformationView_TextBoxLastName_${number}`),
  };

  infantInfo = {
    firstName: (number) =>
      cy.getId(`ContactViewControlGroupMainContact_BoxPassengerInformationView_TextBoxFirstName_${number}_${number}`),
    lastName: (number) =>
      cy.getId(`ContactViewControlGroupMainContact_BoxPassengerInformationView_TextBoxLastName_${number}_${number}`),
    birthDate: (number) => cy.getId(`birthDate${number}_${number}`),
  };
  btnReady = (btnPosition) => cy.get(`[position=${btnPosition}]`);

  contactForm = {
    selectCountry: () =>
      cy.getId(
        `ContactViewControlGroupMainContact_BoxPassengerInformationView_BoxContactInformationView_DropDownListCountry`
      ),
    phone: () =>
      cy.getId(
        `ContactViewControlGroupMainContact_BoxPassengerInformationView_BoxContactInformationView_TextBoxHomePhone`
      ),
    email: () =>
      cy.getId(
        `ContactViewControlGroupMainContact_BoxPassengerInformationView_BoxContactInformationView_TextBoxEmailAddress`
      ),
  };

  checkboxPrivacyPolicy = () => cy.getId(`checkboxAcceptsPrivPolLabel`);

  btnSubmit = () => cy.getId(`ContactViewControlGroupMainContact_BoxPassengerInformationView_LinkButtonSubmit`);

  //Methods

  fillPassengersForm(passengers, adultFirstName, adultLastName, infants, infantName, infantLastName) {
    let btnPosition = 0;
    for (let number = 0; number < passengers; number++) {
      this.adultInfo.firstName(number).should("be.visible").type(adultFirstName);
      this.adultInfo.lastName(number).should("be.visible").type(adultLastName);

      if (infants > 0) {
        this.infantInfo.firstName(number).should("be.visible").type(infantName);
        this.infantInfo.lastName(number).should("be.visible").type(infantLastName);
        this.infantInfo
          .birthDate(number + 1)
          .should("be.visible")
          .type("25/08/2022");
        infants--;
      }
      btnPosition++;
      this.btnReady(btnPosition).should("be.visible").click();
    }
  }
  fillContactForm(country, phone, email) {
    this.contactForm.selectCountry().should("be.visible");
    this.contactForm.selectCountry().select(country);
    this.contactForm.phone().type(phone);
    this.contactForm.email().type(email);
  }
  acceptPolicyAndContinue() {
    this.checkboxPrivacyPolicy().should("be.visible").click();
    this.btnSubmit().should("be.visible").click();
  }
}
