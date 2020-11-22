<template>
  <input role="year" :value="date.year" @input="update($event, 'year')" />
  <input role="month" :value="date.month" @input="update($event, 'month')" />
  <input role="day" :value="date.day" @input="update($event, 'day')" />
<pre>
date is:
{{ date }} 
</pre>
</template>

<script>
import { reactive, watch, computed } from 'vue'
import { DateTime } from 'luxon'

export default {
  props: {
    modelValue: {
      type: Object
    },
    serialize: {
      type: Function
    },
    deserialize: {
      type: Function
    }
  },

  setup(props, { emit }) {
    const date = computed(() => {
      return props.deserialize(props.modelValue)
    })
    const update = ($event, field) => {
      const { year, month, day } = props.deserialize(props.modelValue)
      let newValue
      if (field === 'year') {
        newValue = { year: $event.target.value, month, day }
      }
      if (field === 'month') {
        newValue = { year, month: $event.target.value, day }
      }
      if (field === 'day') {
        newValue = { year, month, day: $event.target.value }
      }
      const asObject = props.serialize(newValue)
      if (!asObject) {
        return
      }
      emit('update:modelValue', asObject)
    }

    return {
      update,
      date
    }
  }
}
</script>
