<template>
  <renderless-password 
    :password="input.password"
    :confirmation="input.confirmation"
    v-slot="{ 
      matching,
      complexity,
      valid
    }"
  >
    <div class="wrapper">
      <div class="field">
        <label for="password">Password</label>
        <input type="password" v-model="input.password" id="password" />
      </div>
      <div class="field">
        <label for="confirmation">Confirmation</label>
        <input v-model="input.confirmation" id="confirmation" />
      </div>
      <div  class="field">
        <label for="confirmation" style="color: white; width: 100px">_</label>
      <button style="width: 100%" :disabled="!valid">Go</button>
    </div>
    </div>

    <div class="rating">
      <div v-for="i in complexity" :key="i">
        ✅
      </div>
      <div v-for="i in (3 - complexity)" :key="i">
        ☑️
      </div>
    </div>
  </renderless-password>
</template>

<style>
.rating {
  display: flex;
  width: 100px;
  justify-content: space-around;
}
</style>

<script>
import { reactive } from 'vue'
import RenderlessPassword from './renderless-password.js'

export default {
  components: { 
    RenderlessPassword
  },

  setup(props) {
    const input = reactive({
      password: '',
      confirmation: ''
    })

    const complexityStyle = (complexity) => {
      if (complexity >= 3) {
        return 'high'
      }
      if (complexity >= 2) {
        return 'mid'
      }
      if (complexity >= 1) {
        return 'low'
      }
    }

    return {
      input,
      complexityStyle
    }
  }
}
</script>

<style>
.wrapper {
  width: 300px;
  display: flex;
  align-items: center;
}

.field:nth-child(1), .field:nth-child(2) {
  padding-right: 5px;
}

.field {
  width: 50%;
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
