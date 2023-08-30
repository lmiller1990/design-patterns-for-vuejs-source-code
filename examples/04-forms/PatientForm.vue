<template>
  <div class="form-wrapper">
    <h3>Patient Data</h3>
    <form @submit.prevent="submit">
      <div class="field">
        <div
          v-if="!validatedForm.name.valid"
          class="error"
          role="error"
        >
          {{ validatedForm.name.message }}
        </div>
        <label for="name">Name</label>
        <input id="name" name="name" v-model="form.name" />
      </div>
      <div class="field">
        <div
          v-if="!validatedForm.weight.valid"
          class="error"
          role="error"
        >
          {{ validatedForm.weight.message }}
        </div>
        <label for="weight">Weight</label>
        <input
          id="weight"
          name="weight"
          v-model.number="form.weight.value"
        />
        <select id="weight-units" v-model="form.weight.units">
          <option value="kg">kg</option>
          <option value="lb">lb</option>
        </select>
      </div>
      <div class="field">
        <button type="submit" :disabled="!valid">Submit</button>
      </div>
    </form>
  </div>

  <pre>  
    Patient Data {{ form }} 
  </pre>
  <pre>
    Form State 
    {{ validatedForm }} 
  </pre>
</template>

<script lang="ts" setup>
import { reactive, computed } from "vue";
import { isFormValid, patientForm, Patient } from "./form.js";

const emit = defineEmits<{
  (e: "submit", patient: Patient): void;
}>();

const form = reactive<Patient>({
  name: "",
  weight: {
    value: 0,
    units: "kg",
  },
});

const validatedForm = computed(() => {
  return patientForm(form);
});

const submit = () => {
  emit("submit", form);
};
const valid = computed(() => isFormValid(validatedForm.value));
</script>

<style>
.field>label {
  display: inline-block;
  width: 50px;
  margin: 0 0 20px 0;
}

.field>input {
  display: inline-block;
  margin: 2px;
}

.error {
  color: red;
}

pre {
  display: flex;
  justify-content: flex-start;
}

.form-wrapper {
  width: 500px;
}
</style>