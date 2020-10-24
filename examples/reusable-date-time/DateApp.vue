<template>
  <h3>Luxon</h3>
  <date-time 
    v-model="dateLuxon" 
    :deserialize="deserialize"
    :serialize="serialize"
  />
  {{ dateLuxon }}

  <h3>Moment</h3>
  <date-time 
    v-model="dateMoment" 
    :deserialize="deserializeMoment"
    :serialize="serializeMoment"
  />
  {{ dateMoment.format ? dateMoment.format('YYYY-MM-DD') : dateMoment }}
  <hr />
</template>

<script>
import { ref } from 'vue'
import { DateTime } from 'luxon'
import { 
  serialize, 
  deserialize,
  serializeMoment,
  deserializeMoment
} from './date-time-serializers.js'
import moment from 'moment'
import dateTime from './date-time.vue'

export default {
  components: { dateTime },

  setup() {
    const dateLuxon = ref(DateTime.fromObject({
      year: '2019',
      month: '01',
      day: '01',
    }))
    const dateMoment = ref(moment('2019-02-02', 'YYYY-MM-DD'))

    return {
      dateLuxon,
      serialize,
      deserialize,
      dateMoment,
      serializeMoment,
      deserializeMoment
    }
  }
}
</script>
