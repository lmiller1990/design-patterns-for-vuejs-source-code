<template>
  <h1 v-if="user">
    Hello, {{ user.name }}
  </h1>
  <form @submit.prevent="handleAuth">
    <input v-model="formData.username" role="username" />
    <input v-model="formData.password" role="password" />
    <button>Click here to sign in</button>
  </form>
  <span v-if="error">{{ error }}</span>
</template>

<script>
import { reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()
    const formData = reactive({
      username: '',
      password: '',
    })
    const error = ref('')
    const user = computed(() => store.state.user)

    const handleAuth = async () => {
      try {
        await store.dispatch('login', {
          username: formData.username,
          password: formData.password
        })
      } catch (e) {
        error.value = e.response.data.error
      }
    }

    return {
      user,
      formData,
      error,
      handleAuth
    }
  }
}
</script>
