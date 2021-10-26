<template>
  <section>
    <header>
      <span>{{ title }}</span>
      <div id="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
      </div>
    </header>
    <main>
      <img src="@/assets/logo.png" class="logo" alt="SWAPI" />
    </main>
  </section>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: String,
  },
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #eee;
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
  color: #ffe81f;
}
main {
  text-align: center;
  flex: 1 0 auto;
  margin-top: 1em;
}
.logo {
  max-width: 200px;
  animation: MoveUpDown 2s linear infinite;
  position: relative;
}
@keyframes MoveUpDown {
  0%,
  100% {
    bottom: 0;
  }
  50% {
    bottom: 8px;
  }
}
</style>
