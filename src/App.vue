<template>
  <section>
    <!-- The video -->
    <video autoplay muted loop id="video-background">
      <source src="@/assets/video.mp4" type="video/mp4" />
    </video>

    <div class="app">
      <Header title="Vue with SWAPI" />
      <div class="container">
        <router-view></router-view>
      </div>
      <Footer />
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html,
body {
  width: 100%;
  height: 100%;
  font-size: 18px;
  color: #eee;
  background: #1c1e22 url('./assets/bg.jpg') center;
  background-size: cover;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #eee;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.app {
  position: relative;
  z-index: 2;
}
#video-background {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: 1;
  opacity: 0.3;
}
.container {
  width: 80%;
  max-width: 1200px;
  min-height: 680px;
  padding: 1.5em;
  margin: 1em auto 1.5em auto;
  overflow: auto;
}
.loading {
  color: #eee;
  text-align: center;
}
.error-box {
  color: #eee;
  background-color: rgba(255, 0, 0, 0.3);
  padding: 1.5em;
  text-align: center;
  border-radius: 5px;
}
.text-center {
  text-align: center;
}
</style>
