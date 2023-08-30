<template>
  <div class="wrapper">
    <form @submit.prevent="handleSubmit">
      <input v-model="username" id="username" />
      <button id="add-user">Add User</button>
    </form>

    <ul>
      <li v-for="user in users" :key="user.id">
        ID: {{ user.id }}. Name: {{ user.name }}
        <button @click="store.removeUser(user)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useStore } from "./store.js";

const store = useStore();
const username = ref("");

const handleSubmit = () => {
  store.addUser({
    name: username.value,
  });
  username.value = "";
};

const users = computed(() => store.getState().users);
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
