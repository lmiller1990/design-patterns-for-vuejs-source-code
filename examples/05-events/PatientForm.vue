<template>
  <h1>Create Patient</h1>
  <form>
    <input v-model="patient.firstName" />
    <input v-model="patient.familyName" />
    <button @click="handleCreate">
      Submit
    </button>
  </form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import type { Patient } from './patient.js';

const emits = defineEmits<{
  (event: 'createPatient', patient: Patient): void
}>()

const patient = reactive({
  firstName: '',
  familyName: ''
})

function handleCreate () {
  emits('createPatient', patient)
}
</script>