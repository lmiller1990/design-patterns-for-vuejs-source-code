<template>
  <div
    v-for="(row, rowIdx) in currentBoard"
    :key="rowIdx"
    class="row"
  >
    <div
      v-for="(col, colIdx) in row"
      class="col"
      :key="colIdx"
      :data-testid="`row-${rowIdx}-col-${colIdx}`"
      @click="makeMove({ row: rowIdx, col: colIdx })"
    >
      {{ col }}
    </div>
  </div>
  <button @click="undo">Undo</button>
  <button @click="redo">Redo</button>
</template>

<script lang="ts" setup>
import { useTicTacToe } from "./TicTacToe.js";

const { currentBoard, makeMove, undo, redo } = useTicTacToe();
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
