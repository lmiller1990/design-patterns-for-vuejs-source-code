/// <reference types="cypress" />
import TicTacToe from "../TicTacToe.vue"
import { createGame, makeMove, initialBoard, Board } from "../TicTacToe.js"

/**
 * UI Tests.
 * 
 * Same as the previous chapter - so they should be, no change
 * in behavior.
 */
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

  // TODO: Try implementing undo/redo in the business layer
  // And wire it up!
  it.skip('undo and redo', () => {
    cy.mount(TicTacToe);
    cy.findByTestId("row-0-col-0").click();
    cy.findByTestId("row-0-col-0").contains("o");
    cy.get('button').contains('Undo').click()
    cy.findByTestId("row-0-col-0").contains("-");
    cy.get('button').contains('Redo').click()
    cy.findByTestId("row-0-col-0").contains("o");
  })
});

/**
 * Can test / iterate on business logic in isolation.
 */
describe('useTicTacToe', () => {
  it('initializes state to an empty board', () => {
    const expected: Board = [
      ['-', '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-']
    ]
    expect(createGame([initialBoard])).to.eql([expected])
  })
})

describe('makeMove', () => {
  it('returns a new updated board and counter', () => {
    const board = createGame([initialBoard])
    const { newBoard, newCounter } = makeMove(board[0], {
      row: 0, 
      col: 0, 
      counter: 'o'
    })

    expect(newCounter).to.eql('x')
    expect(newBoard).to.eql([
      ['o', '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-']
    ])
  })
})
