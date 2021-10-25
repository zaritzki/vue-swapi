<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th @click="$emit('sort-column', 'name')">Name</th>
          <th @click="$emit('sort-column', 'height')">Height</th>
          <th @click="$emit('sort-column', 'mass')">Mass</th>
          <th @click="$emit('sort-column', 'created')">Created</th>
          <th @click="$emit('sort-column', 'edited')">Edited</th>
          <th @click="$emit('sort-column', 'name')">Planet Name</th>
        </tr>
      </thead>
      <tbody>
        <People v-for="people in peoples" :people="people" />
      </tbody>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
import People from '@/components/People.vue'

export default {
  name: 'Table',
  components: {
    People,
  },
  props: {
    peoples: Array,
  },
}
</script>

<style scope>
table {
  width: 100%;
  color: #c8c8c8;
  border-collapse: collapse;
}
table th {
  font-size: 0.7em;
  font-weight: 600;
  padding: 0.8em 1em;
  cursor: pointer;
}
table tr td {
  font-size: 0.8em;
  padding: 1.2em;
  background-color: rgba(41, 44, 48, 0.5);
  border-bottom: 5px solid rgba(0, 0, 0, 0.8);
}
table tr:last-child td {
  border-bottom: 0 none;
}
table tr td:first-child {
  border-radius: 5px 0 0 5px;
}
table tr td:last-child {
  border-radius: 0 5px 5px 0;
}
table tr:hover td {
  background-color: rgba(50, 54, 58, 0.8);
}
footer a {
  color: #fff;
  font-weight: normal;
  text-decoration: none;
}
footer a:hover {
  color: #ffe300;
}
</style>
