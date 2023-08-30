<template>
  <DateTimeC
    v-model="dateLuxon"
    :deserialize="deserialize"
    :serialize="serialize"
  />
  {{ dateLuxon.toISODate() }}
</template>

<script lang="ts" setup>
import { ref } from "vue";
import DateTimeC from "./date-time.vue";
import { DateTime } from "luxon";

function deserialize(value: DateTime) {
  return {
    year: value.get("year"),
    month: value.get("month"),
    day: value.get("day"),
  };
}

function serialize(value: DateTime) {
  try {
    const obj = DateTime.fromObject(value);
    if (!obj.isValid) {
      return;
    }
  } catch {
    return;
  }

  return DateTime.fromObject(value);
}

const dateLuxon = ref(
  DateTime.fromObject({
    year: 2019,
    month: 1,
    day: 1,
  })
);
</script>
