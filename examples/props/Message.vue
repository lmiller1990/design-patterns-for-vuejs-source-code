<template>
  <div :class="variant">Message</div>
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
      type: String,
      required: true,
      validator: validateVariant
    }
  }
}
</script>
