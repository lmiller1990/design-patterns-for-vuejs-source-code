<script lang="ts" setup>
import { ref, watchEffect } from "vue";
defineProps<{
  result: number;
}>();

const emits = defineEmits<{
  (e: "calculate", payload: { n1: number; n2: number }): void;
}>();

const n1 = ref(0);
const n2 = ref(0);

watchEffect(() => {
  emits("calculate", { n1: n1.value, n2: n2.value });
});
</script>

<template>
  <input v-model.number="n1" />
  <input v-model.number="n2" />
  <div>{{ n1 }} + {{ n2 }} is {{ result }}.</div>
</template>
