<template>
  <div class="app-root">
    <Navbar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/menu/NavBar.vue'
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0a0e27 0%, #1a1545 50%, #0a0e27 100%);
  background-attachment: fixed;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
}

#app {
  width: 100%;
  min-height: 100vh;
}
</style>

<style scoped>
.app-root {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0e27 0%, #1a1545 50%, #0a0e27 100%);
  background-attachment: fixed;
}
</style>