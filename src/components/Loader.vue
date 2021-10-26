<template>
  <div class="loader">
    <img src="@/assets/loader3.gif" />
    <span>Loading...</span>
  </div>
</template>

<script>
export default {
  name: 'Loader',
}
</script>

<style scoped>
.loader {
  margin: 30px auto;
  opacity: 0.5;
}
.loader img {
  width: 100%;
  max-width: 480px;
  margin: auto;
  border-radius: 20%;
}
.loader span {
  margin-top: 10px;
  display: none;
}
</style>
