<template>
  <div class="container-fluid filter-sticky mt-4 mb-4 px-0">
    <div class="container p-3 rounded-3 shadow-sm bg-light border">

      <div class="d-flex justify-content-between align-items-center gap-3 flex-wrap">

        <h4 class="text-dark fw-bold m-0" style="font-size: 1.1rem; white-space: nowrap;">
          {{ selectedFilter === 'Favourites' ? '❤️ Your Favourites' : '🍕 ' + selectedFilter }}
        </h4>

        <div class="d-flex justify-content-center gap-2 flex-wrap">
          <button @click="selectFilter('Favourites', 'Favourites')" class="btn btn-outline-danger fw-bold"
            :class="{ 'btn-danger text-white': selectedFilter === 'Favourites' }"
            style="width:140px; transition: all 0.3s;">
            ❤️ Favourites
          </button>

          <div class="dropdown">
            <button class="btn btn-outline-secondary fw-bold dropdown-toggle" type="button" id="filterDropdown"
              data-bs-toggle="dropdown" aria-expanded="false" style="width:140px; transition: all 0.3s;">
              {{ filterDisplayName }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="filterDropdown">
              <li><button class="dropdown-item" @click="selectFilter('All pizzas', 'All Pizzas')">🍕 All
                  Pizzas</button></li>
              <li><button class="dropdown-item" @click="selectFilter('Preparation time', 'Time')">⏱️
                  Time</button></li>
              <li><button class="dropdown-item" @click="selectFilter('Most popular', 'Popular')">⭐
                  Popular</button></li>

            </ul>
          </div>
        </div>

        <button @click="resetFilter" class="btn btn-link text-secondary p-0 fw-bold"
          style="font-size:0.9rem; text-decoration:underline; transition: all 0.3s; white-space: nowrap;">
          ↻ Reset
        </button>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['update-filter'])

const selectedFilter = ref('All pizzas')
const filterDisplayName = ref('All Pizzas')

function selectFilter(filterValue: string, displayValue: string) {
  selectedFilter.value = filterValue
  filterDisplayName.value = displayValue
  emit('update-filter', filterValue)
}

function resetFilter() {
  selectedFilter.value = 'All pizzas'
  filterDisplayName.value = 'All Pizzas'
  emit('update-filter', 'All pizzas')
}

</script>


<style scoped>
.filter-sticky {
  position: sticky;
  top: 74px;
  z-index: 1020;
  background-color: transparent;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.dropdown-item:hover {
  background-color: #f8f9fa;
  color: #dc3545;
  padding-left: 1.5rem;
}
</style>