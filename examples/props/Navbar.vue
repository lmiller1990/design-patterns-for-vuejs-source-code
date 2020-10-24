<template>
  <a>{{ `${authenticated ? 'Logout' : 'Login'}` }}</a>
</template>

<script>
export default {
  props: {
    authenticated: {
      type: Boolean,
      default: false
    }
  }
}
</script>
