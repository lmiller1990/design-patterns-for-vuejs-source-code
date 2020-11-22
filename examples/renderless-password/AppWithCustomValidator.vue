<template>
  <renderless-password 
    :password="input.password"
    :confirmation="input.confirmation"
    :validator="customValidator"
    v-slot="{ valid }"
  >
    <input v-model="input.password" role="password" />
    <input v-model="input.confirmation" role="confirmation" />
    <button role="submit" :disabled="!valid">Submit</button>
  </renderless-password>
</template>

<script>
import { reactive } from 'vue'
import RenderlessPassword from './renderless-password.js'

function customValidator({ 
  complexity, 
  password,
  confirmation,
  matching,
}) {
  return false
}

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
      customValidator
    }
  }
}
</script>

<style>
.wrapper {
  width: 400px;
}

.field {
  display: flex;
  flex-direction: column;
  font-size: 1.1rem;
  margin: 5px 0;
}

input {
  height: 30px;
  font-size: 1.5rem;
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
