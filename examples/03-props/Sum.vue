<script lang="ts" setup>
import { ref, computed } from "vue";

const n1 = ref(0);
const n2 = ref(0);

function sum(a: number, b: number) {
  return a + b;
}
const result = computed(() => sum(n1.value, n2.value));
</script>

<template>
  <input v-model.number="n1" />
  <input v-model.number="n2" />
  <div>{{ n1 }} + {{ n2 }} is {{ result }}.</div>
</template>
