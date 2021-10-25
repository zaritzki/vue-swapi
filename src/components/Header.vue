<template>
  <header>
    <span>{{ title }}</span>
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: String,
  },
}
</script>

<style scope>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #c8c8c8;
  background-color: #272b30;

  padding: 1em;
}
header span {
  display: block;
  font-size: 1em;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.02em;
  box-sizing: border-box;
}
header a {
  color: #fff;
  font-size: 0.8em;
  font-weight: normal;
  text-decoration: none;
  margin: 0 0.5em;
}
header a:hover {
  color: #ffe300;
}
</style>
