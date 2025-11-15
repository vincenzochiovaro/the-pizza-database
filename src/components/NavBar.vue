<template>
  <div class="container-fluid p-0" style="font-family: Palatino, serif;">
    <!-- Navbar -->
    <b-navbar type="light" variant="light" class="py-3 px-2" style="background-color: #fdf6e3;">
      <b-navbar-brand href="#">
        <img src="" alt="Left Logo" class="img-fluid" style="height: 40px;">
      </b-navbar-brand>

      <span class="h4 text-dark mx-3 m-0">EV Database</span>

      <b-navbar-brand href="#">
        <img src="" alt="Right Logo" class="img-fluid" style="height: 40px;">
      </b-navbar-brand>
    </b-navbar>

    <!-- Filters area -->
    <div class="d-flex flex-wrap justify-content-start gap-2 py-3 px-2 bg-white">
      <b-form-select
        v-model="selectedBrand"
        :options="brandOptions"
        class="w-auto text-dark"
      ></b-form-select>

      <b-form-select
        v-model="selectedRange"
        :options="rangeOptions"
        class="w-auto text-dark"
      ></b-form-select>

      <b-form-select
        v-model="selectedPrice"
        :options="priceOptions"
        class="w-auto text-dark"
      ></b-form-select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "NavbarWithFilters",
  setup() {
    const selectedBrand = ref(null);
    const selectedRange = ref(null);
    const selectedPrice = ref(null);

    const brandOptions = [
      { value: null, text: "Brand" },
      { value: 1, text: "Tesla" },
      { value: 2, text: "Nissan" },
      { value: 3, text: "MG" },
    ];

    const rangeOptions = [
      { value: null, text: "Range" },
      { value: 1, text: "0-200 km" },
      { value: 2, text: "200-400 km" },
      { value: 3, text: "400+ km" },
    ];

    const priceOptions = [
      { value: null, text: "Price" },
      { value: 1, text: "Under $30k" },
      { value: 2, text: "$30k-$50k" },
      { value: 3, text: "Above $50k" },
    ];

    return {
      selectedBrand,
      selectedRange,
      selectedPrice,
      brandOptions,
      rangeOptions,
      priceOptions,
    };
  },
});
</script>