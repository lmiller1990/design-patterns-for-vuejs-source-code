import { ref, readonly, computed } from 'vue'

/**
 * Core Logic
 * Framework agnostic
 */
export const initialBoard = [
  ['-', '-', '-'],
  ['-', '-', '-'],
  ['-', '-', '-']
]

export function createGame(initialState) {
  return [...initialState]
}

export function makeMove(board, { col, row, counter }) {
  const newBoard = board.map((theRow, rowIdx) =>
    theRow.map((cell, colIdx) => 
      rowIdx === row && colIdx === col
      ? counter
      : cell
    )
  )
  const newCounter = counter === 'o' ? 'x' : 'o'

  return {
    newBoard,
    newCounter
  }
}

/**
 * Vue integration layer
 * State is mutable
 */
export function useTicTacToe() {
  const boards = ref([initialBoard])
  const counter = ref('o')
  const move = ({ col, row }) => {
    const { newBoard, newCounter } = makeMove(
      currentBoard.value,
      {
        col,
        row,
        counter: counter.value
      }
    )
    boards.value.push(newBoard)
    counter.value = newCounter
  }

  const currentBoard = computed(() => {
    return boards.value[boards.value.length - 1]
  })

  return {
    currentBoard,
    makeMove: move
  }
}

