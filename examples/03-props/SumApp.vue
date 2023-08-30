<script lang="ts" setup>
import { ref } from "vue";
import SumWithProps from "./SumWithProps.vue";

const result = ref(0);

async function handleCalculate(payload: { n1: number; n2: number }) {
  // Pretending to make an API request
  const val = await Promise.resolve(payload.n1 + payload.n2);
  result.value = val;
}
</script>

<template>
  <SumWithProps :result="result" @calculate="handleCalculate" />
</template>
