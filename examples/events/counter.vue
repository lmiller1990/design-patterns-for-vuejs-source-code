<template>
  <button role="increment" @click="increment" />
  <button role="submit" @click="submit" />
</template>

<script>
export function submitValidator(count) {
  if (typeof count !== 'number' || isNaN(count)) {
    throw Error(`
        Count should have been a number.
        Got: ${count}
    `)
  }
  return true
}

import { ref } from 'vue'

export default {
  emits: {
    submit: submitValidator
  },
  setup(props, { emit }) {
    const count = ref(0)
    const increment = () => {
      count.value +=  1
    }
    const submit = () => {
      emit('submit', count.value)
    }

    return {
      count,
      increment,
      submit
    }
  }
}
</script>
