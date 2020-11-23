import { render, fireEvent, screen } from '@testing-library/vue'
import TicTacToeApp from './tic-tac-toe-app.vue'
import { useTicTacToe } from './tic-tac-toe.js'

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
  it('supports seeding an initial state', () => {
    const initialState = [
      ['o', 'o', 'o'],
      ['-', '-', '-'],
      ['-', '-', '-']
    ]
    const { currentBoard } = useTicTacToe([initialState])

    expect(currentBoard.value).toEqual(initialState)
  })

  it('initializes state to an empty board', () => {
    const initialBoard = [
      ['-', '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-']
    ]
    const { currentBoard } = useTicTacToe()

    expect(currentBoard.value).toEqual(initialBoard)
  })
})

describe('makeMove', () => {
  it('updates the board and adds the new state', () => {
    const { currentBoard, makeMove, boards, currentPlayer } = useTicTacToe()
    makeMove({ row: 0, col: 0 })

    expect(boards.value).toHaveLength(2)
    expect(currentPlayer.value).toBe('x')
    expect(currentBoard.value).toEqual([
      ['o', '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-']
    ])
  })
})

import { mount } from '@vue/test-utils'

describe('TicTacToeApp', () => {
  it('plays a game', async () => {
    const wrapper = mount(TicTacToeApp)

    await wrapper.find('[data-test=row-0-col-0]').trigger('click')
    await wrapper.find('[data-test=row-0-col-1]').trigger('click')
    await wrapper.find('[data-test=row-0-col-2]').trigger('click')

    expect(wrapper.html()).toContain('data-test="row-0-col-0">o</div>')
    expect(wrapper.html()).toContain('data-test="row-0-col-1">x</div>')
    expect(wrapper.html()).toContain('data-test="row-0-col-2">o</div>')
  })
})

describe('useTicTacToe', () => {
  it('supports seeding an initial state', () => {
    const initialState = [
      ['o', 'o', 'o'],
      ['-', '-', '-'],
      ['-', '-', '-']
    ]
    const { currentBoard } = useTicTacToe([initialState])

    expect(currentBoard.value).toEqual(initialState)
  })

  it('initializes state to an empty board', () => {
    const initialBoard = [
      ['-', '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-']
    ]
    const { currentBoard } = useTicTacToe()

    expect(currentBoard.value).toEqual(initialBoard)
  })
})

describe('makeMove', () => {
  it('updates the board and adds the new state', () => {
    const { currentBoard, makeMove, boards, currentPlayer } = useTicTacToe()
    makeMove({ row: 0, col: 0 })

    expect(boards.value).toHaveLength(2)
    expect(currentPlayer.value).toBe('x')
    expect(currentBoard.value).toEqual([
      ['o', '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-']
    ])
  })
})
