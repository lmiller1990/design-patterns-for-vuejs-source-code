import { describe, it, expect } from "vitest";
import { render, fireEvent, screen } from "@testing-library/vue";
import TicTacToe from "../TicTacToe.vue";

describe("TicTacToeApp", () => {
  it("plays a game", async () => {
    render(TicTacToe);

    await fireEvent.click(screen.getByTestId("row-0-col-0"));
    await fireEvent.click(screen.getByTestId("row-0-col-1"));
    await fireEvent.click(screen.getByTestId("row-0-col-2"));

    expect(screen.getByTestId("row-0-col-0").textContent).toContain(
      "o"
    );
    expect(screen.getByTestId("row-0-col-1").textContent).toContain(
      "x"
    );
    expect(screen.getByTestId("row-0-col-2").textContent).toContain(
      "o"
    );
  });
});
