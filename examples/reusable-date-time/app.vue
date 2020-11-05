<template>
  <date-time 
    v-model="dateLuxon" 
    :deserialize="deserialize"
    :serialize="serialize"
  />
  {{ dateLuxon.toISODate() }}
</template>

<script>
import { ref } from 'vue'
import dateTime from './date-time.vue'
import { DateTime } from 'luxon'

export function deserialize(value) {
  return {
    year: value.get('year'),
    month: value.get('month'),
    day: value.get('day')
  }
}

export function serialize(value) {
  try {
    const obj = DateTime.fromObject(value)
    if (obj.invalid) {
      return 
    }
  } catch {
    return 
  }

  return DateTime.fromObject(value)
}

export default {
  components: { dateTime },

  setup() {
    const dateLuxon = ref(DateTime.fromObject({
      year: '2019',
      month: '01',
      day: '01',
    }))

    return {
      dateLuxon,
      deserialize,
      serialize
    }
  }
}
</script>
