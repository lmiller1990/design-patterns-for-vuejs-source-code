<template>
  <div v-for="(row, rowIdx) in currentBoard" :key="rowIdx" class="row">
    <div 
      v-for="(col, colIdx) in row" 
      class="col" 
      :key="colIdx"
      :data-testid="`row-${rowIdx}-col-${colIdx}`"
      :data-test="`row-${rowIdx}-col-${colIdx}`"
      @click="makeMove({ row: rowIdx, col: colIdx })"
    >
      {{ col }}
    </div>
  </div>
  <button @click="undo">Undo</button>
  <button @click="redo">Redo</button>
</template>

<script>
import { useTicTacToe } from './tic-tac-toe.js'

export default {
  setup(props) {
    const { currentBoard, makeMove, undo, redo } = useTicTacToe() 

    return {
      currentBoard,
      makeMove,
      undo,
      redo
    }
  }
}
</script>

<style>
.row {
  display: flex;
}

.col {
  border: 1px solid black;
  height: 50px;
  width: 50px;
}
</style>
