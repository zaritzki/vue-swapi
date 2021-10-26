<template>
  <input
    @keypress.enter="$emit('keypress-search', term)"
    v-model="term"
    type="text"
    name="search"
    placeholder="Search"
  />
</template>

<script>
export default {
  name: 'Search',
  props: {
    term: String,
  },
}
</script>

<style scoped>
input {
  color: #c8c8c8;
  width: 40%;
  font-size: 0.8em;
  padding: 0.8em 1em;
  background-color: rgba(41, 44, 48, 0.8);
  border: 2px solid rgba(0, 0, 0, 0.8);
  margin-bottom: 1em;
}
</style>
