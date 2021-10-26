<template>
  <footer>
    <span
      >Created by <a href="https://github.com/zaritzki/">Zaritzki</a> using
      <a href="https://swapi.dev/">SWAPI</a> &copy; 2021</span
    >
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped>
footer {
  color: #c8c8c8;
  background-color: #272b30;

  padding: 0.5em 1em;
}
footer span {
  display: block;
  line-height: 1;
  letter-spacing: 0.02em;
  box-sizing: border-box;
}
footer {
  flex-shrink: 0;
  padding: 1em 1.5em;
  font-size: 0.7em;
  text-align: center;
}
footer a {
  color: #fff;
  font-weight: bold;
  text-decoration: none;
}
footer a:hover {
  color: #ffe300;
}
</style>
