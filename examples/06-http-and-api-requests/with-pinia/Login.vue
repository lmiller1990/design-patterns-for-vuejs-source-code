<template>
  <h1 v-if="store.user">Hello, {{ store.user.username }}</h1>
  <form @submit.prevent="handleAuth">
    <input v-model="formData.username" id="username" />
    <input
      v-model="formData.password"
      id="password"
      type="password"
    />
    <button>Click here to sign in</button>
  </form>
  <span v-if="error">{{ error }}</span>
</template>

<script lang="ts" setup>
import { AxiosError } from "axios";
import { reactive, ref } from "vue";
import { useUsers } from "./store.js";

const store = useUsers();

const formData = reactive({ username: "", password: "" });
const error = ref("");

const handleAuth = async () => {
  try {
    await store.login(formData.username, formData.password);
  } catch (e) {
    error.value = (
      e as AxiosError<any, { error: string }>
    ).response?.data?.error;
  }
};
</script>
