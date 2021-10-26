<template>
  <button @click="handleClick()" class="btn">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: String,
  },
  methods: {
    handleClick() {
      this.$emit('btn-click')
    },
  },
}
</script>

<style scoped>
.btn {
  display: inline-block;
  color: #c8c8c8;
  background-color: rgba(41, 44, 48, 0.8);
  border: 2px solid rgba(0, 0, 0, 0.8);
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn-block {
  display: block;
  width: 100%;
}
</style>
