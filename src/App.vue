<template>
  <div>
    <Navbar />      
    <router-view />
  </div>
</template>

<script lang="ts">
import Navbar from './components/NavBar.vue'

export default {
  components: {
    Navbar
  }
}
</script>