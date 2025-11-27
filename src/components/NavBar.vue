<template>
  <nav class="navbar navbar-light px-3 shadow-sm rounded-bottom-4" style="background-color:#fdf6e3;">
    <div class="container-fluid d-flex justify-content-between align-items-center p-0">

      <div class="d-flex flex-column align-items-center">
        <img :src="createImg" alt="Left Logo" class="img-fluid" style="height:45px; object-fit:contain;">
      </div>

      <span class="h4 text-dark m-0 text-center flex-grow-1 fw-bold fst-italic px-3 py-1  rounded-pill">
        The Pizza Database
      </span>

      <div class="d-flex flex-column align-items-center">
        <img :src="thePizzaDbImg" alt="Right Logo" class="img-fluid" style="height:45px; object-fit:contain;">
        <small class="text-dark mt-1">Create</small>
      </div>

    </div>
  </nav>
  <div class="d-flex flex-wrap justify-content-start gap-2 py-3 px-2 bg-white">
    <select>
      <option>option1</option>
    </select>
    <select class="form-select w-auto text-dark">
      <option>option2</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import createImg from '../assets/createimg.png'
import thePizzaDbImg from '../assets/thepizzadbimg.png'
</script>