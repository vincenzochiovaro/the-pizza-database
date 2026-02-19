<template>
  <div class="container-fluid filter-sticky mt-4 mb-4 px-0"
    :class="{ 'favourites-mode': selectedFilter === 'Favourites' }">
    <div class="container p-3 rounded-3 shadow-sm bg-light border">

      <div class="d-flex justify-content-between align-items-center gap-3 flex-wrap">

        <h4 class="filter-title fw-bold m-0" style="font-size: 1.1rem; white-space: nowrap;">
          {{ selectedFilter === 'Favourites' ? t.yourFavourites : '🍕 ' + displayFilter }}
        </h4>

        <div class="d-flex justify-content-center gap-2 flex-wrap">
          <button @click="selectFilter('Favourites')" class="btn fw-bold btn-favourite"
            :class="{ 'btn-favourite-active': selectedFilter === 'Favourites' }"
            style="width:140px; transition: all 0.3s;">
            ❤️ {{ t.favourites }}
          </button>

          <div class="dropdown">
            <button class="btn btn-filter fw-bold dropdown-toggle" type="button" id="filterDropdown"
              data-bs-toggle="dropdown" aria-expanded="false" style="width:140px; transition: all 0.3s;">
              {{ displayFilter }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="filterDropdown">
              <li><button class="dropdown-item" @click="selectFilter('All pizzas')">🍕 {{ t.allPizzas }}</button></li>
              <li><button class="dropdown-item" @click="selectFilter('Vegetarian Pizzas')">🥦 {{ t.vegPizzas }}</button>
              </li>

            </ul>
          </div>
        </div>

        <button @click="resetFilter" class="btn btn-reset p-0 fw-bold"
          style="font-size:0.9rem; text-decoration:underline; transition: all 0.3s; white-space: nowrap;">
          {{ t.reset }}
        </button>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLanguageStore } from '../stores/LanguageStore'

const emit = defineEmits(['update-filter'])
const languageStore = useLanguageStore()

const selectedFilter = ref('All pizzas')

const translations = {
  en: {
    favourites: 'Favourites',
    allPizzas: 'All Pizzas',
    vegPizzas: 'Veg Pizzas',
    reset: '↻ Reset',
    yourFavourites: '❤️ Your Favourites'
  },
  it: {
    favourites: 'Preferiti',
    allPizzas: 'Tutte le Pizze',
    vegPizzas: 'Pizze Veg',
    reset: '↻ Ripristina',
    yourFavourites: '❤️ I tuoi preferiti'
  }
}

const t = computed(() => translations[languageStore.currentLanguage as keyof typeof translations] || translations.en)

const displayFilter = computed(() => {
  if (selectedFilter.value === 'All pizzas') return t.value.allPizzas
  if (selectedFilter.value === 'Vegetarian Pizzas') return t.value.vegPizzas
  if (selectedFilter.value === 'Favourites') return t.value.favourites
  return selectedFilter.value
})

function selectFilter(filterValue: string) {
  selectedFilter.value = filterValue
  emit('update-filter', filterValue)
}

function resetFilter() {
  selectedFilter.value = 'All pizzas'
  emit('update-filter', 'All pizzas')
}
</script>


<style scoped>
.filter-sticky {
  position: sticky;
  top: 74px;
  z-index: 1020;
  background-color: transparent;
  transition: all 0.3s ease;
}

.filter-title {
  color: #5C3A21;
}

.btn-favourite {
  border: 2px solid #CC7722;
  color: #CC7722;
  background-color: #F8F4E9;
}

.btn-favourite:hover {
  background-color: rgba(204, 119, 34, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(92, 58, 33, 0.25);
}

.btn-favourite-active {
  background: linear-gradient(135deg, #CC7722 0%, #E1A95F 100%);
  color: #5C3A21;
  border-color: #CC7722;
}

.btn-favourite-active:hover {
  background: linear-gradient(135deg, #E1A95F 0%, #CC7722 100%);
  border-color: #CC7722;
  box-shadow: 0 4px 12px rgba(92, 58, 33, 0.3);
}

.btn-filter {
  border: 2px solid #7A8F63;
  color: #5C3A21;
  background-color: #F8F4E9;
}

.btn-filter:hover {
  background-color: rgba(122, 143, 99, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(92, 58, 33, 0.25);
  border-color: #5C3A21;
}

.btn-filter:focus {
  border-color: #5C3A21;
  box-shadow: 0 0 0 0.25rem rgba(122, 143, 99, 0.35);
}

.btn-reset {
  color: #6B4F3A;
}

.btn-reset:hover {
  color: #CC7722;
  transform: scale(1.1);
}

.dropdown-item {
  color: #5C3A21;
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  background-color: #7A8F63;
  color: #F8F4E9;
  padding-left: 1.5rem;
}

.dropdown-item.active,
.dropdown-item:active {
  background-color: #5C3A21;
  color: #F8F4E9;
}

.favourites-mode .container {
  background-color: #fff3cd !important;
  border-color: #cc7722 !important;
  box-shadow: 0 6px 0 #cc7722;
}

.favourites-mode .filter-title {
  color: #cc7722;
}
</style>