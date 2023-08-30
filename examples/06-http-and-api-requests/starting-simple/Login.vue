<template>
  <h1 v-if="user">Hello, {{ user.username }}</h1>
  <form @submit.prevent="handleAuth">
    <input v-model="formData.username" id="username" />
    <input v-model="formData.password" id="password" type="password" />
    <button>Click here to sign in</button>
  </form>
  <span v-if="error">{{ error }}</span>
</template>

<script lang="ts" setup>
import axios, { AxiosError } from "axios";
import { reactive, ref } from "vue";

interface User {
  username: string;
}

const formData = reactive({
  username: "",
  password: "",
});

const user = ref<User>();
const error = ref<string>();

async function handleAuth() {

  try {
    const response = await axios.post<User>("/login");
    user.value = response.data;
  } catch (e) {
    // Axios types aren't fantastic
    error.value = (
      e as AxiosError<any, { error: string }>
    ).response?.data?.error;
  }
}
</script>
