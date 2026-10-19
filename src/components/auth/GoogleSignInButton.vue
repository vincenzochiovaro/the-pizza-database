<template>
  <button class="google-sign-in-button" type="button" @click="handleSignIn">
    Continue with Google
  </button>
</template>

<script setup lang="ts">
function handleSignIn() {
  console.log("click");
  // Google Identity Services integration will be added here.
}
</script>

<style scoped>
.google-sign-in-button {
  padding: 0.65rem 1rem;
  border: 1px solid #dadce0;
  border-radius: 4px;
  background: #fff;
  color: #3c4043;
  cursor: pointer;
  font: inherit;
}
</style>
