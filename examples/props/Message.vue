<template>
  <div :class="variant">Message! {{ variant }}?</div>
</template>

<script>
export function validateVariant(variant) {
  if (!['success', 'warning', 'error'].includes(variant)) {
    throw Error(`variant is required and must be either 'success', 'warning' or 'error'. You passed: ${variant}`)
  }

  return true
}

export default {
  props: {
    variant: {
      required: true,
      validator: validateVariant
    }
  }
}
</script>
