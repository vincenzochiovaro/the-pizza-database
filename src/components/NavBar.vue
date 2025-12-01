<template>
  <nav class="navbar navbar-light px-3 shadow-sm rounded-bottom-5" style="background-color:#8F7265;">
    <div class="container-fluid d-flex justify-content-between align-items-center p-0">


      <div class="d-flex flex-column align-items-center">
        <button class="btn p-0 bg-transparent d-flex flex-column align-items-center border rounded-2">
          <img :src="homeImg" alt="Left Logo" class="img-fluid" style="height:55px; object-fit:contain;">
        </button>
      </div>

      <span class="h4 text-white m-0 text-center flex-grow-1 fw-bold fst-italic px-3 py-1  rounded-pill">
        The Pizza Database
      </span>

      <div class="d-flex flex-column align-items-center">
        <button class="btn p-0 bg-transparent d-flex flex-column align-items-center border rounded-4">
          <img :src="createImg" alt="Right Logo" class="img-fluid" style="height:45px; object-fit:contain;">
          <small class="mt-1 fw-bold" style="color:#FF8C42; font-size:0.85rem;">Create</small>
        </button>
      </div>

    </div>
  </nav>
</template>

<script setup lang="ts">
import createImg from '../assets/createimg.png'
import homeImg from '../assets/homeimg.png'
</script>