<template>
  <td colspan="6">
    <div class="loader">
      <img src="@/assets/loading.gif" />
      <span>Loading...</span>
    </div>
  </td>
</template>

<script>
export default {
  name: 'SimpleLoader',
}
</script>

<style scoped>
.loader {
  margin: 80px auto;
  text-align: center;
  opacity: 0.6;
}
.loader img {
  width: 80px;
  margin: auto;
  border-radius: 20%;
}
.loader span {
  margin-top: 10px;
  display: none;
}
</style>
