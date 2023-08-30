import { ref, computed } from "vue";

/**
 * Core Logic
 * Framework agnostic
 */
export const initialBoard: Board = [
  ["-", "-", "-"],
  ["-", "-", "-"],
  ["-", "-", "-"],
];

type Marker = "x" | "o" | "-";

export type Board = Marker[][];

export function createGame(initialState: Board[]) {
  return [...initialState];
}

export function makeMove(
  board: Board,
  { col, row, counter }: { col: number; row: number; counter: Marker }
) {
  const newBoard = board.map((theRow, rowIdx) => {
    return theRow.map((cell, colIdx) =>
      rowIdx === row && colIdx === col ? counter : cell
    );
  });

  const newCounter: Marker = counter === "o" ? "x" : "o";

  return {
    newBoard,
    newCounter,
  };
}

/**
 * Vue integration layer
 * State is mutable
 */
export function useTicTacToe() {
  const boards = ref<Board[]>([initialBoard]);
  const counter = ref<Marker>("o");

  const move = ({ col, row }: { col: number; row: number }) => {
    const { newBoard, newCounter } = makeMove(currentBoard.value, {
      col,
      row,
      counter: counter.value,
    });
    boards.value.push(newBoard);
    counter.value = newCounter;
  };

  const currentBoard = computed(() => {
    return boards.value[boards.value.length - 1];
  });

  return {
    currentBoard,
    makeMove: move,
  };
}
