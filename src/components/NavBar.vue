<template>
  <div class="container-fluid p-0" style="font-family: Palatino, serif;">
    <!-- Navbar -->
    <nav class="navbar navbar-light py-3 px-2" style="background-color: #fdf6e3;">
      <a class="navbar-brand" href="#">
        <img src="" alt="Left Logo" class="img-fluid" style="height: 40px;">
      </a>

      <span class="h4 text-dark mx-3 m-0">EV Database</span>

      <a class="navbar-brand" href="#">
        <img src="" alt="Right Logo" class="img-fluid" style="height: 40px;">
      </a>
    </nav>

    <!-- Filters area -->
    <div class="d-flex flex-wrap justify-content-start gap-2 py-3 px-2 bg-white">
      <select v-model="selectedBrand" class="form-select w-auto text-dark">
        <option v-for="opt in brandOptions" :key="opt.value" :value="opt.value">
          {{ opt.text }}
        </option>
      </select>

      <select v-model="selectedRange" class="form-select w-auto text-dark">
        <option v-for="opt in rangeOptions" :key="opt.value" :value="opt.value">
          {{ opt.text }}
        </option>
      </select>

      <select v-model="selectedPrice" class="form-select w-auto text-dark">
        <option v-for="opt in priceOptions" :key="opt.value" :value="opt.value">
          {{ opt.text }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

export default defineComponent({
  name: "NavbarWithFilters",
  setup() {
    const selectedBrand = ref("")
    const selectedRange = ref("")
    const selectedPrice = ref("")

    const brandOptions = [
      { value: "", text: "Brand" },
      { value: 1, text: "Tesla" },
      { value: 2, text: "Nissan" },
      { value: 3, text: "MG" },
    ]

    const rangeOptions = [
      { value: "", text: "Range" },
      { value: 1, text: "0-200 km" },
      { value: 2, text: "200-400 km" },
      { value: 3, text: "400+ km" },
    ]

    const priceOptions = [
      { value: "", text: "Price" },
      { value: 1, text: "Under $30k" },
      { value: 2, text: "$30k-$50k" },
      { value: 3, text: "Above $50k" },
    ]

    return {
      selectedBrand,
      selectedRange,
      selectedPrice,
      brandOptions,
      rangeOptions,
      priceOptions,
    }
  },
})
</script>