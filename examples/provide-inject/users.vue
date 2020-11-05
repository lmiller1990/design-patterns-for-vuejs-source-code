<template>
  <div class="wrapper">
    <form @submit.prevent="handleSubmit">
      <input v-model="username" />
      <button>Add User</button>
    </form>

    <ul>
      <li 
        v-for="user in users"
        :key="user"
      >
        {{ user.name }}
        <button @click="removeUser(user)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from './store.js'

export default {
  setup() {
    const store = useStore()
    const username = ref('')

    const handleSubmit = () => {
      store.addUser({ name: username.value })
      username.value = ''
    }

    const removeUser = (user) => {
      store.removeUser(user)
    }


    return {
      username,
      handleSubmit,
      removeUser,
      users: computed(() => store.getState().users)
    }
  }
}
</script>

<style>
.wrapper {
  width: 300px;
}

h3 {
  text-align: center;
}

ul {
  width: 100%;
}

form {
  display: flex;
  flex-direction: column;
}

input {
  margin: 5px 0;
}
</style>
