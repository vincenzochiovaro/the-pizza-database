<template>
  <main class="sign-in-view">
    <h1>Sign in</h1>
    <GoogleSignInButton />
  </main>
</template>

<script setup lang="ts">
import GoogleSignInButton from '../components/auth/GoogleSignInButton.vue'
</script>

<style scoped>
.sign-in-view {
  display: grid;
  justify-items: center;
  gap: 1rem;
  padding: 3rem 1rem;
  color: var(--color-text-primary, #fff);
}
</style>
