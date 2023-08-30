/// <reference types="cypress" />
import TicTacToe from "./TicTacToe.vue";
import { useTicTacToe, Board } from "./TicTacToe.js";

describe("TicTacToe", () => {
  it("plays a game", () => {
    cy.mount(TicTacToe);

    cy.findByTestId("row-0-col-0").click();
    cy.findByTestId("row-0-col-1").click();
    cy.findByTestId("row-0-col-2").click();

    cy.findByTestId("row-0-col-0").contains("o");
    cy.findByTestId("row-0-col-1").contains("x");
    cy.findByTestId("row-0-col-2").contains("o");
  });

  it("undo and redo", () => {
    cy.mount(TicTacToe);
    cy.findByTestId("row-0-col-0").click();
    cy.findByTestId("row-0-col-0").contains("o");
    cy.get("button").contains("Undo").click();
    cy.findByTestId("row-0-col-0").contains("-");
    cy.get("button").contains("Redo").click();
    cy.findByTestId("row-0-col-0").contains("o");
  });
});

describe("useTicTacToe", () => {
  it("supports seeding an initial state", () => {
    const initialState: Board = [
      ["o", "o", "o"],
      ["-", "-", "-"],
      ["-", "-", "-"],
    ];
    const { currentBoard } = useTicTacToe([initialState]);

    expect(currentBoard.value).to.eql(initialState);
  });

  it("initializes state to an empty board", () => {
    const initialBoard: Board = [
      ["-", "-", "-"],
      ["-", "-", "-"],
      ["-", "-", "-"],
    ];
    const { currentBoard } = useTicTacToe();

    expect(currentBoard.value).to.eql(initialBoard);
  });
});

describe("makeMove", () => {
  it("updates the board and adds the new state", () => {
    const { currentBoard, makeMove, boards, currentPlayer } =
      useTicTacToe();
    makeMove({ row: 0, col: 0 });

    expect(boards.value).to.have.length(2);
    expect(currentPlayer.value).to.eql("x");
    expect(currentBoard.value).to.eql([
      ["o", "-", "-"],
      ["-", "-", "-"],
      ["-", "-", "-"],
    ]);
  });
});
