<template>
  <nav class="navbar navbar-light px-3 shadow-sm rounded-bottom-5" style="background-color:#A68A7B;">
    <div class="container-fluid d-flex justify-content-between align-items-center p-0 flex-nowrap">

      <div class="d-flex align-items-center">
        <button class="btn p-2 d-flex flex-column align-items-center rounded-pill" style="
                  background: linear-gradient(145deg, #BFA58B, #8F7265);
                  color: #fff;
                  box-shadow: 0 3px 6px rgba(0,0,0,0.15);
                ">
          <img :src="homeImg" alt="Home Logo" class="img-fluid" style="height:30px; object-fit:contain;">
        </button>
      </div>

      <span class="h4 text-white m-0 text-center flex-grow-1 fw-bold fst-italic px-3 py-1 rounded-pill text-truncate">
        The Pizza Database
      </span>

      <div class="d-flex align-items-center">
        <button class="btn p-2 d-flex flex-column align-items-center rounded-pill" style="
            background: linear-gradient(145deg, #BFA58B, #8F7265);
            color: #fff;
            box-shadow: 0 3px 6px rgba(0,0,0,0.15);
          ">
          <img :src="createImg" alt="Right Logo" class="img-fluid" style="height:30px; object-fit:contain;">
          <small class="mt-1 fw-bold" style="font-size:0.75rem; white-space:nowrap;">Create</small>
        </button>
      </div>

    </div>
  </nav>
</template>

<script setup lang="ts">
import createImg from '../assets/createimg.png'
import homeImg from '../assets/homeimg.png'
</script>