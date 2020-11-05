import { mount } from '@vue/test-utils'
import { createGame, makeMove, initialBoard } from './tic-tac-toe.js'

xdescribe('TicTacToeApp', () => {
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
  it('returns a new updaed board', () => {
    const board = createGame(initialBoard)
    const updatedBoard = makeMove(board, {
      row: 0, 
      col: 0, 
      counter: 'o'
    })

    expect(updatedBoard).toEqual([
      ['o', '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-']
    ])
  })
})
