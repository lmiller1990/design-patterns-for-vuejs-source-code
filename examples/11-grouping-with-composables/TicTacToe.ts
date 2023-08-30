import { ref, readonly, computed } from "vue";

type Marker = "x" | "o" | "-";

export type Board = Array<Marker[]>;

export function useTicTacToe(initialState?: Board[]) {
  const initialBoard: Board = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ];

  const boards = ref<Board[]>(initialState || [initialBoard]);
  const currentPlayer = ref<Marker>("o");
  const currentMove = ref(0);

  function makeMove(move: { row: number; col: number }) {
    const newBoard = JSON.parse(JSON.stringify(boards.value))[
      currentMove.value
    ] as Board;
    newBoard[move.row][move.col] = currentPlayer.value;
    currentPlayer.value = currentPlayer.value === "o" ? "x" : "o";
    boards.value.push(newBoard);
    currentMove.value += 1;
  }

  function undo() {
    currentMove.value -= 1;
  }

  function redo() {
    currentMove.value += 1;
  }

  return {
    makeMove,
    redo,
    undo,
    boards: readonly(boards),
    currentMove,
    currentPlayer: readonly(currentPlayer),
    currentBoard: computed(() => boards.value[currentMove.value]),
  };
}
