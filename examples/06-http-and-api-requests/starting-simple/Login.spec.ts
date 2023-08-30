import { describe, it, beforeEach, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/vue";
import Login from "./Login.vue";

vi.mock("axios", () => {
  return {
    default: {
      post: () =>
        Promise.resolve({
          data: {
            username: "Lachlan",
            password: "this-is-the-password",
          },
        }),
    },
  };
});

describe("login", () => {
  it("successfully authenticates", async () => {
    const { container } = render(Login);

    await fireEvent.update(
      container.querySelector("#username")!,
      "Lachlan"
    );

    await fireEvent.update(
      container.querySelector("#password")!,
      "secret-password"
    );

    await fireEvent.click(screen.getByText("Click here to sign in"));
    await screen.findByText("Hello, Lachlan");
  });
});
