<template>
  <input
    name="year"
    :value="date.year"
    @input="($event) => update($event, 'year')"
  />
  <input
    name="month"
    :value="date.month"
    @input="($event) => update($event, 'month')"
  />
  <input
    name="day"
    :value="date.day"
    @input="($event) => update($event, 'day')"
  />
  <pre>
Internal date is:
{{ modelValue }} 
</pre
  >
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { InternalDateTime } from "./serializers.js";

const props = defineProps<{
  modelValue: any;
  serialize: (val: InternalDateTime) => any;
  deserialize: (val: any) => InternalDateTime;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", dt: InternalDateTime): void;
}>();

const date = computed(() => {
  return props.deserialize(props.modelValue);
});

function update($event: Event, field: "year" | "month" | "day") {
  const target = $event.target as HTMLInputElement;

  let newValue: InternalDateTime = props.deserialize(
    props.modelValue
  );

  if (field === "year") {
    newValue.year = parseInt(target.value);
  }
  if (field === "month") {
    newValue.month = parseInt(target.value);
  }
  if (field === "day") {
    newValue.day = parseInt(target.value);
  }

  const obj = props.serialize(newValue);

  if (!obj) {
    return;
  }

  emit("update:modelValue", obj);
}
</script>
