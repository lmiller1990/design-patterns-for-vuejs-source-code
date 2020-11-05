import { ref, readonly, computed } from 'vue'

export function useTicTacToe(initialState) {
  const initialBoard = [
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-']
  ]

  const boards = ref(initialState || [initialBoard])
  const currentPlayer = ref('o')
  const currentMove = ref(0)

  function makeMove({ row, col }) {
    const newBoard = JSON.parse(JSON.stringify(boards.value))[currentMove.value]
    newBoard[row][col] = currentPlayer.value
    currentPlayer.value  = currentPlayer.value === 'o' ? 'x' : 'o'
    boards.value.push(newBoard)
    currentMove.value += 1
  }

  function undo() {
    currentMove.value -= 1
  }

  function redo() {
    currentMove.value += 1
  }

  return {
    makeMove,
    redo,
    undo,
    boards: readonly(boards),
    currentMove,
    currentPlayer: readonly(currentPlayer),
    currentBoard: computed(() => boards.value[currentMove.value])
  }
}

