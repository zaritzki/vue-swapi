<template>
  <tr @dblclick="$emit('open-planet', people.id)" :key="people.id">
    <td>
      <strong>{{ people.name }}</strong>
    </td>
    <td>{{ people.height }}</td>
    <td>{{ people.mass }}</td>
    <td>
      {{ moment(String(people.created)).format('Do MMM YYYY hh:mm A') }}
    </td>
    <td>
      {{ moment(String(people.edited)).format('Do MMM YYYY hh:mm  A') }}
    </td>
    <td @click="toggleModal">
      {{ people.planet.name }}
    </td>
  </tr>
</template>

<script>
import moment from 'moment'

export default {
  name: 'People',
  props: {
    people: Object,
  },
  methods: {
    moment,
  },
}
</script>
