<template>
  <div class="filter-bar" :class="{ 'favourites-mode': selectedFilter === 'Favourites' }">
    <div class="filter-glow"></div>
    <div class="filter-content">
      <div class="filter-left">
        <div class="filter-label">{{ t.filterTitle }}</div>
        <h5 class="filter-title">
          {{ selectedFilter === 'Favourites' ? t.yourFavourites : displayFilter }}
        </h5>
      </div>

      <div class="filter-divider"></div>

      <div class="filter-controls">
        <button @click="selectFilter('Favourites')" class="filter-btn btn-favourite"
          :class="{ active: selectedFilter === 'Favourites' }">
          <span class="btn-icon">❤️</span>
          <span class="btn-text">{{ t.favourites }}</span>
        </button>

        <div class="dropdown">
          <button class="filter-btn btn-filter dropdown-toggle" type="button" id="filterDropdown"
            data-bs-toggle="dropdown" aria-expanded="false">
            <span class="btn-icon">🍕</span>
            <span class="btn-text">{{ displayFilter }}</span>
          </button>
          <ul class="dropdown-menu dropdown-dark" aria-labelledby="filterDropdown">
            <li><button class="dropdown-item" @click="selectFilter('All pizzas')"><span class="item-icon">🍕</span> {{
              t.allPizzas }}</button></li>
            <li><button class="dropdown-item" @click="selectFilter('Vegetarian Pizzas')"><span
                  class="item-icon">🥦</span> {{ t.vegPizzas }}</button></li>
            <li><button class="dropdown-item" @click="selectFilter('Stuffed Crust Pizzas')"><span
                  class="item-icon">🧁</span> {{ t.stuffedCrustPizzas }}</button></li>
          </ul>
        </div>

        <button @click="resetFilter" class="filter-btn btn-reset">
          <span class="btn-icon">↻</span>
          <span class="btn-text">{{ t.reset }}</span>
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
    vegPizzas: 'Vegetarians',
    reset: '↻ Reset',
    yourFavourites: '❤️ Your Favourites',
    stuffedCrustPizzas: 'Stuffed Crusts',
    filterTitle: 'Sort By'
  },
  it: {
    favourites: 'Preferiti',
    allPizzas: 'Tutte le Pizze',
    vegPizzas: 'Vegetariane',
    reset: '↻ Ripristina',
    yourFavourites: '❤️ I tuoi preferiti',
    stuffedCrustPizzas: 'Bordi Ripieni',
    filterTitle: 'Ordina Per'
  }
}

const t = computed(() => translations[languageStore.currentLanguage as keyof typeof translations] || translations.en)

const displayFilter = computed(() => {
  if (selectedFilter.value === 'All pizzas') return t.value.allPizzas
  if (selectedFilter.value === 'Vegetarian Pizzas') return t.value.vegPizzas
  if (selectedFilter.value === 'Favourites') return t.value.favourites
  if (selectedFilter.value === 'Stuffed Crust Pizzas') return t.value.stuffedCrustPizzas
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
.filter-bar {
  position: fixed;
  top: 74px;
  left: 0;
  right: 0;
  z-index: 1025;
  background: linear-gradient(135deg, #0a0e27 0%, #0f1338 40%, #1a1545 70%, #0a0e27 100%) !important;
  border-bottom: 3px solid rgba(100, 200, 255, 0.4);
  backdrop-filter: blur(20px);
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  width: 100%;
  padding: 1.5rem 0;
  transition: all 0.3s ease;
  will-change: transform;
}

.filter-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(90deg,
      transparent 0%,
      rgba(100, 200, 255, 0.1) 25%,
      rgba(100, 200, 255, 0.15) 50%,
      rgba(100, 200, 255, 0.1) 75%,
      transparent 100%);
  pointer-events: none;
  animation: shimmer-glow 4s ease-in-out infinite;
}

@keyframes shimmer-glow {

  0%,
  100% {
    opacity: 0.3;
  }

  50% {
    opacity: 0.7;
  }
}

.filter-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.5rem;
  padding: 0 2.5rem;
  max-width: 100%;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}

.filter-left {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 0.3rem;
}

.filter-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(100, 200, 255, 0.7);
  font-weight: 700;
}

.filter-title {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 800;
  background: linear-gradient(135deg, #64C8FF 0%, #FFB6E1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  white-space: nowrap;
  letter-spacing: 0.5px;
  text-transform: capitalize;
  filter: drop-shadow(0 2px 4px rgba(100, 200, 255, 0.2));
}

.filter-divider {
  width: 2px;
  height: 50px;
  background: linear-gradient(to bottom,
      rgba(100, 200, 255, 0.8),
      rgba(100, 200, 255, 0.2));
  border-radius: 1px;
}

.filter-controls {
  display: flex;
  gap: 1.2rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 1.4rem;
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  white-space: nowrap;
  border: 2px solid rgba(100, 200, 255, 0.4) !important;
  background: rgba(100, 200, 255, 0.12) !important;
  color: rgba(255, 255, 255, 0.9) !important;
  letter-spacing: 0.3px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.filter-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.filter-btn:hover::before {
  left: 100%;
}

.filter-btn:hover {
  background: rgba(100, 200, 255, 0.2) !important;
  border-color: rgba(100, 200, 255, 0.8) !important;
  color: rgba(255, 255, 255, 1) !important;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(100, 200, 255, 0.3);
}

.btn-icon {
  font-size: 1.1rem;
  display: inline-flex;
  align-items: center;
}

.btn-text {
  font-weight: 700;
  letter-spacing: 0.3px;
}

.btn-favourite {
  border-color: rgba(255, 107, 157, 0.4) !important;
  background: rgba(255, 107, 157, 0.12) !important;
}

.btn-favourite:hover {
  background: rgba(255, 107, 157, 0.22) !important;
  border-color: rgba(255, 107, 157, 0.8) !important;
  box-shadow: 0 8px 20px rgba(255, 107, 157, 0.3);
}

.btn-favourite.active {
  background: linear-gradient(135deg, rgba(255, 107, 157, 0.3) 0%, rgba(255, 107, 157, 0.15) 100%) !important;
  border-color: rgba(255, 107, 157, 0.9) !important;
  color: rgba(255, 255, 255, 1) !important;
  box-shadow: 0 0 20px rgba(255, 107, 157, 0.4), inset 0 0 15px rgba(255, 107, 157, 0.1);
}

.btn-reset {
  color: rgba(100, 200, 255, 0.8) !important;
  font-size: 0.9rem;
  background: rgba(100, 200, 255, 0.08) !important;
  border: 2px solid rgba(100, 200, 255, 0.3) !important;
  padding: 0.75rem 1.2rem;
}

.btn-reset:hover {
  color: rgba(100, 200, 255, 1) !important;
  border-color: rgba(100, 200, 255, 0.7) !important;
  background: rgba(100, 200, 255, 0.15) !important;
  box-shadow: 0 8px 20px rgba(100, 200, 255, 0.25);
}

.dropdown-menu.dropdown-dark {
  background: rgba(10, 14, 39, 0.98) !important;
  border: 2px solid rgba(100, 200, 255, 0.3) !important;
  backdrop-filter: blur(15px);
  border-radius: 0.8rem;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  min-width: 180px;
}

.dropdown-item {
  color: rgba(255, 255, 255, 0.85) !important;
  font-weight: 600;
  transition: all 0.2s ease;
  padding: 0.8rem 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  letter-spacing: 0.2px;
  background: transparent !important;
}

.dropdown-item:hover {
  background: rgba(100, 200, 255, 0.2) !important;
  color: rgba(255, 255, 255, 1) !important;
  transform: translateX(4px);
}

.dropdown-item.active {
  background: rgba(100, 200, 255, 0.3) !important;
  border-left: 3px solid rgba(100, 200, 255, 0.8);
  padding-left: calc(1.1rem - 3px);
}

.favourites-mode {
  background: linear-gradient(135deg,
      rgba(255, 107, 157, 0.08) 0%,
      rgba(100, 200, 255, 0.08) 100%),
    linear-gradient(135deg, #0a0e27 0%, #0f1338 40%, #1a1545 70%, #0a0e27 100%);
  border-bottom-color: rgba(255, 107, 157, 0.4);
}

@media (max-width: 768px) {
  .filter-bar {
    padding: 1.2rem 0;
  }

  .filter-content {
    padding: 0 1.5rem;
    gap: 1.5rem;
  }

  .filter-title {
    font-size: 1.15rem;
  }

  .filter-btn {
    padding: 0.7rem 1.1rem;
    font-size: 0.9rem;
  }

  .filter-divider {
    display: none;
  }

  .filter-controls {
    gap: 0.8rem;
  }
}

@media (max-width: 576px) {
  .filter-bar {
    top: 60px;
  }

  .filter-content {
    flex-direction: column;
    padding: 0 1rem;
    gap: 1rem;
  }

  .filter-left {
    width: 100%;
    text-align: center;
  }

  .filter-label {
    font-size: 0.7rem;
  }

  .filter-title {
    font-size: 1rem;
  }

  .filter-btn {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
  }

  .filter-controls {
    width: 100%;
    justify-content: center;
    gap: 0.6rem;
  }

  .btn-text {
    display: none;
  }

  .btn-icon {
    font-size: 1rem;
  }
}
</style>