<template>
  <RenderlessPassword
    :password="input.password"
    :confirmation="input.confirmation"
    v-slot="{ matching, complexity, valid }"
  >
    <div class="wrapper">
      <div class="field">
        <label for="password">Password</label>
        <input v-model="input.password" id="password" />
      </div>
      <div class="field">
        <label for="confirmation">Confirmation</label>
        <input v-model="input.confirmation" id="confirmation" />
      </div>
      <div class="field">
        <button :disabled="!valid">Submit</button>
      </div>
    </div>

    <div class="complexity-field">
      <div class="complexity" :class="complexityStyle(complexity)" />
    </div>

    <p>Matches: {{ matching }}</p>
    <p data-testid="complexity">Complexity: {{ complexity }}</p>
  </RenderlessPassword>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import RenderlessPassword from "./RenderlessPassword.vue";

const input = reactive({
  password: "",
  confirmation: "",
});

const complexityStyle = (complexity: number) => {
  if (complexity >= 3) {
    return "high";
  } else if (complexity >= 2) {
    return "mid";
  } else {
    return "low";
  }
};
</script>

<style>
.wrapper {
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.field {
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 1.1rem;
  margin: 5px 0;
}

input {
  height: 30px;
  font-size: 1.5rem;
}

.complexity-field {
  width: 100%;
}

.complexity {
  transition: 0.2s;
  height: 10px;
}

.high {
  width: 100%;
  background: lime;
}

.mid {
  width: 66%;
  background: yellow;
}

.low {
  width: 33%;
  background: red;
}

button {
  height: 30px;
  background: none;
  border: none;
  font-size: 1.5rem;
  background: steelblue;
  color: white;
  padding: 4px 0;
  width: 100%;
  box-sizing: content-box;
}

button:disabled {
  opacity: 0.5;
}
</style>
