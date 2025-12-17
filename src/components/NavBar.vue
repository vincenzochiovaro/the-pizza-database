<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-gradient shadow-sm">
    <div class="container-fluid d-flex justify-content-between align-items-center px-4">

      <div class="d-flex align-items-center cursor-pointer" @click="goToHome">
        <img :src="homeImgSrc" alt="Home Logo" class="me-3"
          style="height:45px; cursor:pointer; transition: transform 0.3s;">
        <div style="width:2px; height:40px; background:rgba(255,255,255,0.3); margin-right: 1rem;"></div>
        <div style="line-height:1.1;">
          <div class="text-white fw-bold" style="font-size:1.1rem;">The Pizza</div>
          <div class="text-white fw-bold" style="font-size:1.1rem;">Database</div>
        </div>
      </div>

      <div class="d-flex align-items-center">
        <button @click="goToDoughGenerator"
          class="btn btn-light btn-sm d-flex flex-column align-items-center gap-1 rounded-pill px-3 py-2 fw-bold"
          style="transition: all 0.3s;">
          <img :src="createImgSrc" alt="Create" style="height:24px; object-fit:contain;">
          <small class="text-dark" style="font-size:0.75rem;">Create</small>
        </button>
      </div>

    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import createImg from '../assets/createimg.png'
import homeImg from '../assets/homeimg.png'

const homeImgSrc = homeImg
const createImgSrc = createImg

const router = useRouter()

function goToDoughGenerator() {
  router.push('/dough-generator')
}

function goToHome() {
  router.push('/')
}
</script>


<style scoped>
nav {
  background: linear-gradient(135deg, #5a6268 0%, #495057 100%) !important;
  position: sticky;
  top: 0;
  z-index: 1030;
}

.cursor-pointer {
  cursor: pointer;
  transition: opacity 0.3s;
}

.cursor-pointer:hover {
  opacity: 0.9;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>