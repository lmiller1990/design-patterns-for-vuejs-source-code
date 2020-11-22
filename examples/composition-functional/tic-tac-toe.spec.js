import { render, fireEvent, screen } from '@testing-library/vue'
import TicTacToeApp from './tic-tac-toe-app.vue'
import { useTicTacToe, createGame, makeMove, initialBoard } from './tic-tac-toe.js'

describe('TicTacToeApp', () => {
  it('plays a game', async () => {
    render(TicTacToeApp)

    await fireEvent.click(screen.getByTestId('row-0-col-0'))
    await fireEvent.click(screen.getByTestId('row-0-col-1'))
    await fireEvent.click(screen.getByTestId('row-0-col-2'))

    expect(screen.getByTestId('row-0-col-0').textContent).toContain('o')
    expect(screen.getByTestId('row-0-col-1').textContent).toContain('x')
    expect(screen.getByTestId('row-0-col-2').textContent).toContain('o')
  })
})

describe('useTicTacToe', () => {
  it('initializes state to an empty board', () => {
    const expected = [
      ['-', '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-']
    ]
    expect(createGame(initialBoard)).toEqual(expected)
  })
})

describe('makeMove', () => {
  it('returns a new updated board and counter', () => {
    const board = createGame(initialBoard)
    const { newBoard, newCounter } = makeMove(board, {
      row: 0, 
      col: 0, 
      counter: 'o'
    })

    expect(newCounter).toBe('x')
    expect(newBoard).toEqual([
      ['o', '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-']
    ])
  })
})
