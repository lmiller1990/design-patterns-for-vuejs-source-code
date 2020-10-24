import { ref, readonly, computed } from 'vue'

function createNewGame(initialState) {
  const initialBoard = [
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-']
  ]

  const boards = ref(initialState || [initialBoard])
  const currentPlayer = ref('o')

  function makeMove({ row, col }) {
    const newBoard = [...boards.value[boards.value.length - 1]]
    newBoard[row][col] = currentPlayer.value
    currentPlayer.value  = currentPlayer.value === 'o' ? 'x' : 'o'
    boards.value.push(newBoard)
  }

  return {
    makeMove,
    boards: readonly(boards),
    currentPlayer: readonly(currentPlayer),
    currentBoard: computed(() => boards.value[boards.value.length - 1])
  }
}

const games = {}

export function useGame(id) {
  return games[id]
}

export function createGame(id, initialState) {
  if (!id) {
    throw Error('Please provide an id for the game')
  }

  games[id] = createNewGame(initialState)
  return games[id]
}

export function useTicTacToe() {
  return {
    useGame,
    createGame
  }
}
