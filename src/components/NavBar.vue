<template>
  <nav class="navbar navbar-light bg-secondary shadow-sm rounded-bottom">
    <div class="center-wrap container-fluid d-flex justify-content-between align-items-center p-1 flex-nowrap">

      <div class="d-flex align-items-center">

        <img :src="homeImgSrc" alt="Home Logo" @click="goToHome" style="height:40px; cursor:pointer;">

        <div style="width:1px; height:35px; background:white; margin:0 10px;">
        </div>

        <div @click="goToHome" style="cursor:pointer; line-height:1;">
          <div class="text-white fw-bold" style="font-size:1rem;">The Pizza</div>
          <div class="text-white fw-bold" style="font-size:1rem;">Database</div>
        </div>

      </div>

      <div class="d-flex align-items-center">
        <button @click="goToDoughGenerator"
          class="btn btn-outline-light d-flex flex-column align-items-center rounded-pill p-2">
          <img :src="createImgSrc" alt="Right Logo" class="img-fluid" style="height:30px; object-fit:contain;">
          <small class="mt-1 fw-bold text-white" style="font-size:0.75rem; white-space:nowrap;">Create</small>
        </button>
      </div>

    </div>
  </nav>
</template>

<style>
.center-wrap {
  max-width: 600px;
  margin: 0 auto;
}
</style>

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