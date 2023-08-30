import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import { Store } from "./store.js";
import Users from "./users.vue";

describe("store", () => {
  it("seeds the initial state", () => {
    const store = new Store({
      users: [],
    });

    expect(store.getState()).toEqual({ users: [] });
  });

  it("adds a user", () => {
    const store = new Store({
      users: [],
    });

    store.addUser({ name: "Alice" });

    expect(store.getState()).toEqual({
      users: [{ id: 1, name: "Alice" }],
    });
  });

  it("removes a user", () => {
    const store = new Store({
      users: [{ id: 1, name: "Alice" }],
    });

    store.removeUser({ id: 1, name: "Alice" });

    expect(store.getState()).toEqual({
      users: [],
    });
  });

  it.skip("renders a user", () => {
    cy.mount(Users, {
      global: {
        provide: {
          store: new Store({
            users: [],
          }),
        },
      },
    });

    cy.get('[role="username"]').type("Alice");
    cy.get("button").contains("Add User").click();
    cy.contains("ID: 1. Name: Alice");

    cy.get('[role="username"]').type("Bob");
    cy.get("button").contains("Add User").click();
    cy.get("div").contains("ID: 2. Name: Bob");
  });
});

describe("store", () => {
  it("renders a user", async () => {
    const { container } = render(Users, {
      global: {
        provide: {
          store: new Store({ users: [] }),
        },
      },
    });
    await fireEvent.update(container.querySelector("#username")!, "Alice");
    await fireEvent.click(container.querySelector("#add-user")!);
    await screen.findByText("ID: 1. Name: Alice");
  });
});
