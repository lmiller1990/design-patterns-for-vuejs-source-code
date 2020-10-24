<template>
  <input :value="name" @input="handleUpdate" />
</template>

<script>
export default {
  emits: ['update'],

  props: {
    name: {
      type: String
    }
  },

  setup(props, { emit }) {
    const handleUpdate = (evt) => {
      emit('update:name', evt.target.value) 
    }

    return {
      handleUpdate
    }
  }
}
</script>
