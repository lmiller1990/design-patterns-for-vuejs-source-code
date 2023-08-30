<template>
  <slot
    :matching="matching"
    :complexity="complexity"
    :valid="valid"
  />
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    password: string;
    confirmation: string;
    minComplexity?: number;
    calcComplexity?: (password: string) => number;
  }>(),
  {
    minComplexity: 2,
  }
);

function isMatching(password: string, confirmation: string) {
  if (!password || !confirmation) {
    return false;
  }
  return password === confirmation;
}

function calcComplexity(val: string) {
  if (!val) {
    return 0;
  }

  if (val.length > 10) {
    return 3;
  } else if (val.length > 7) {
    return 2;
  } else if (val.length > 5) {
    return 1;
  } else {
    return 0;
  }
}

const complexity = computed(
  () =>
    props.calcComplexity?.(props.password) ??
    calcComplexity(props.password)
);

const matching = computed(() =>
  isMatching(props.password, props.confirmation)
);

const valid = computed(() => {
  return matching.value && complexity.value >= props.minComplexity;
});
</script>
