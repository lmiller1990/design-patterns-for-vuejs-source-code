<script lang="ts" setup>
const emits = defineEmits<{
  (event: "greet", message: string): void
  (event: "signup", username: string, password: string): void
  (event: "signup", user: { username: string, password: string }): void
}>();

function count(...args: unknown[]) {
  console.log(args);
}
</script>

<template>
  <button @click="count">Count</button>
  <button :onclick="count">Count</button>
  <button @click="count()">Count</button>
  <button @click="$event => count($event)">Count</button>
</template>
