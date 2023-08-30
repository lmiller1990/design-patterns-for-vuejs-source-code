import { describe, it, beforeEach, afterEach } from "vitest";
import { render, fireEvent, screen } from "@testing-library/vue";
import { rest } from "msw";
import { SetupServer, setupServer } from "msw/node";
import Login from "../with-pinia/Login.vue"
import { createPinia, Pinia, setActivePinia } from "pinia";

describe("login", () => {
  let pinia: Pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
  });

  let server: SetupServer;

  afterEach(() => {
    server.close();
  });

  it("successfully authenticates", async () => {
    server = setupServer(
      rest.post("/login", (req, res, ctx) => {
        return res(
          ctx.json({
            username: "Lachlan",
          })
        );
      })
    );
    server.listen();

    const { container } = render(Login, {
      global: { plugins: [pinia] },
    });

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

  it("handles incorrect credentials", async () => {
    const error = "Error: please check the details and try again";
    server = setupServer(
      rest.post("/login", (req, res, ctx) => {
        return res(
          ctx.json({
            username: "Lachlan",
          })
        );
      })
    );
    server.use(
      rest.post("/login", (req, res, ctx) => {
        return res(ctx.status(403), ctx.json({ error }));
      })
    );
    server.listen();

    const { container } = render(Login, {
      global: { plugins: [pinia] },
    });

    await fireEvent.update(
      container.querySelector("#username")!,
      "Lachlan"
    );
    await fireEvent.update(
      container.querySelector("#password")!,
      "secret-password"
    );
    await fireEvent.click(screen.getByText("Click here to sign in"));

    await screen.findByText(error);
  });
});
