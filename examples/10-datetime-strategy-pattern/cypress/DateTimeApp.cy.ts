/// <reference types="cypress" />
import DateTimeApp from "../DateTimeApp.vue";

describe("<DateTimeApp />", () => {
  it("renders", () => {
    cy.mount(DateTimeApp);

    function fillDate() {
      cy.get('[name="year"]').clear().type("2020");
      cy.get('[name="month"]').clear().type("2");
      cy.get('[name="day"]').clear().type("28");
    }

    fillDate();
    cy.contains("2020-02-28T00:00:00.000");
  });
});
