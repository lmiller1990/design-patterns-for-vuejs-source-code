/// <reference types="cypress" />
import axios from "axios";
import Login from "../with-pinia/Login.vue"
import { createPinia, Pinia, setActivePinia } from "pinia";

describe("login", () => {
  let pinia: Pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
  });

  it("successfully authenticates", () => {
    cy.intercept("/login", (req) => {
      req.reply({
        username: "Lachlan",
      });
    }).as("login");

    cy.mount(Login, { global: { plugins: [pinia] } });

    cy.get("#username").type("Lachlan");
    cy.get("#password").type("secret-password");
    cy.get("button").contains("Click here to sign in").click();

    cy.get("@login")
      .its("request.body")
      .should("eql", {
        username: "Lachlan",
        password: "secret-password",
      });
    cy.contains("Hello, Lachlan");
  });

  it("handles incorrect credentials", () => {
    const error = "Error: please check the details and try again";
    cy.intercept("/login", {
      statusCode: 403,
      body: {
        error,
      },
    });

    cy.mount(Login, { global: { plugins: [pinia] } });

    cy.get("#username").type("Lachlan");
    cy.get("#password").type("secret-password");
    cy.get("button").contains("Click here to sign in").click();

    cy.contains(error);
  });

  it("works by stubbing axios", () => {
    cy.stub(axios, "post").resolves({
      data: {
        username: "Lachlan",
      },
    });

    cy.mount(Login, { global: { plugins: [pinia] } });

    cy.get("#username").type("Lachlan");
    cy.get("#password").type("secret-password");
    cy.get("button").contains("Click here to sign in").click();

    cy.contains("Hello, Lachlan");
  });
});
