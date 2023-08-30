/// <reference types="cypress" />
import PatientForm from "../PatientForm.vue";

describe("Form", () => {
  it("fills out form", () => {
    cy.mount(PatientForm);
    // disabled due to errors
    cy.get('[role="error"]').should("have.length", 2);
    cy.get("button[type='submit']").should("be.disabled");

    cy.get("input[name='name']").type("lachlan");
    cy.get('[role="error"]').should("have.length", 1);
    cy.get("input[name='weight']").type("30");
    cy.get('[role="error"]').should("have.length", 0);

    cy.get("#weight-units")
      .select("lb")
      // 30 lb is not valid! Error shown 
      cy.get('[role="error"]')
        .should("have.length", 1)
        .should("have.text", "Must be between 66 and 440");

    cy.get("input[name='weight']").clear().type("100");
    cy.get("button[type='submit']").should("be.enabled");
  });
});
