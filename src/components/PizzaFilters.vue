<template>
  <div class="filter-bar" :class="{ 'favourites-mode': selectedFilter === 'Favourites' }">
    <div class="filter-glow"></div>
    <div class="filter-content">
      <div class="filter-left">
        <div class="filter-label">{{ t.filterTitle }}</div>
        <h5 class="filter-title" :key="selectedFilter">
          {{ selectedFilter === 'Favourites' ? t.yourFavourites : displayFilter }}
        </h5>
      </div>

      <div class="filter-divider"></div>

      <div class="filter-controls">
        <button @click="toggleFavourites" class="filter-btn btn-favourite"
          :class="{ active: selectedFilter === 'Favourites' }">
          <span class="btn-icon">
            <ReusableIcon :name="selectedFilter === 'Favourites' ? 'arrow-left' : 'heart'"
              :type="selectedFilter === 'Favourites' ? 'solid' : 'regular'" color="rgb(255, 212, 59)" size="1rem" />
          </span>
          <span class="btn-text">
            {{ selectedFilter === 'Favourites' ? t.backToPizzas : t.favourites }}
          </span>
        </button>

        <div class="dropdown" style="position: relative;">
          <button class="filter-btn btn-filter dropdown-toggle" type="button" @click="dropdownOpen = !dropdownOpen"
            @blur="closeDropdown" tabindex="0" :aria-expanded="dropdownOpen">
            <span class="btn-icon">
              <ReusableIcon name="pizza-slice" type="solid" color="rgb(116, 192, 252)" size="1rem" />
            </span>
            <span class="btn-text">{{ displayFilter }}</span>
          </button>
          <ul v-if="dropdownOpen" class="dropdown-menu dropdown-dark"
            style="display: block; position: absolute; left: 0; top: 100%; min-width: 180px; z-index: 2000;">
            <li><button class="dropdown-item" @mousedown.prevent="selectFilter('All pizzas'); closeDropdown()"><span
                  class="item-icon"></span> {{ t.allPizzas }}</button></li>
            <li><button class="dropdown-item"
                @mousedown.prevent="selectFilter('Vegetarian Pizzas'); closeDropdown()"><span class="item-icon"></span>
                {{ t.vegPizzas }}</button></li>
            <li><button class="dropdown-item" @mousedown.prevent="selectFilter('White Pizzas'); closeDropdown()"><span
                  class="item-icon"></span> {{ t.whitePizzas }}</button></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLanguageStore } from '../stores/LanguageStore'
import ReusableIcon from '../icons/ReusableIcon.vue'

const emit = defineEmits(['update-filter'])
const languageStore = useLanguageStore()

const selectedFilter = ref('All pizzas')
const dropdownOpen = ref(false)

const translations = {
  en: {
    favourites: 'Favourites',
    backToPizzas: 'Back to pizzas',
    allPizzas: 'All Pizzas',
    vegPizzas: 'Vegetarians',
    yourFavourites: '❤️ Your Favourites',
    whitePizzas: 'White Pizzas',
    filterTitle: 'Sort By'
  },
  it: {
    favourites: 'Preferiti',
    backToPizzas: 'Torna alle pizze',
    allPizzas: 'Tutte le Pizze',
    vegPizzas: 'Vegetariane',
    yourFavourites: '❤️ I tuoi preferiti',
    whitePizzas: 'Pizze Bianche',
    filterTitle: 'Ordina Per'
  }
}

const t = computed(() => translations[languageStore.currentLanguage as keyof typeof translations] || translations.en)

const displayFilter = computed(() => {
  if (selectedFilter.value === 'All pizzas') return t.value.allPizzas
  if (selectedFilter.value === 'Vegetarian Pizzas') return t.value.vegPizzas
  if (selectedFilter.value === 'Favourites') return t.value.favourites
  if (selectedFilter.value === 'White Pizzas') return t.value.whitePizzas
  return selectedFilter.value
})

function selectFilter(filterValue: string) {
  selectedFilter.value = filterValue
  emit('update-filter', filterValue)
}

function toggleFavourites() {
  if (selectedFilter.value === 'Favourites') {
    selectFilter('All pizzas')
  } else {
    selectFilter('Favourites')
  }

  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function closeDropdown() {
  setTimeout(() => { dropdownOpen.value = false }, 100)
}
</script>

<style scoped>
.filter-bar {
  position: fixed;
  top: 74px;
  left: 0;
  right: 0;
  z-index: 1025;
  background: linear-gradient(135deg, var(--color-bg-dark-primary) 0%, #0f1338 40%, var(--color-bg-dark-secondary) 70%, var(--color-bg-dark-primary) 100%) !important;
  border-bottom: 3px solid var(--color-border-primary);
  backdrop-filter: blur(20px);
  box-shadow: var(--shadow-lg), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  width: 100%;
  padding: var(--spacing-lg) 0;
  transition: all var(--transition-base);
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

@keyframes title-pulse {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }

  40% {
    transform: scale(1.08);
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.filter-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.5rem;
  padding: 0 var(--spacing-xl);
  max-width: 100%;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}

.filter-left {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: var(--spacing-xs);
}

.filter-label {
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wider);
  color: var(--color-text-muted);
  font-weight: var(--font-weight-bold);
}

.filter-title {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--color-accent) 0%, #FFB6E1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  white-space: nowrap;
  letter-spacing: var(--letter-spacing-wide);
  text-transform: capitalize;
  filter: drop-shadow(0 2px 4px rgba(100, 200, 255, 0.2));
  animation: title-pulse 2.0s ease;
}

.filter-divider {
  width: 2px;
  height: 50px;
  background: linear-gradient(to bottom,
      var(--color-border-primary),
      var(--color-border-light));
  border-radius: 1px;
}

.filter-controls {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-icon-sm);
  padding: 0.8rem 1.4rem;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  border-radius: var(--radius-xl);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  white-space: nowrap;
  border: 2px solid var(--color-border-primary) !important;
  background: var(--color-primary-lighter) !important;
  color: var(--color-text-secondary) !important;
  letter-spacing: var(--letter-spacing-wide);
  position: relative;
  overflow: hidden;
  backdrop-filter: var(--backdrop-blur);
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
  background: var(--color-primary-light) !important;
  border-color: rgba(100, 200, 255, 0.8) !important;
  color: var(--color-text-primary) !important;
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.btn-icon {
  font-size: var(--font-size-lg);
  display: inline-flex;
  align-items: center;
}

.btn-text {
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing-wide);
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

.dropdown-menu.dropdown-dark {
  background: rgba(10, 14, 39, 0.98) !important;
  border: 2px solid var(--color-border-light) !important;
  backdrop-filter: blur(15px);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  min-width: 180px;
}

.dropdown-item {
  color: var(--color-text-secondary) !important;
  font-weight: var(--font-weight-semibold);
  transition: all var(--transition-fast);
  padding: 0.8rem 1.1rem;
  display: flex;
  align-items: center;
  gap: var(--spacing-icon-sm);
  letter-spacing: var(--letter-spacing-normal);
  background: transparent !important;
}

.dropdown-item:hover {
  background: var(--color-primary-light) !important;
  color: var(--color-text-primary) !important;
  transform: translateX(4px);
}

.dropdown-item.active {
  background: rgba(100, 200, 255, 0.3) !important;
  border-left: 3px solid rgba(100, 200, 255, 0.8);
  padding-left: calc(1.1rem - 3px);
}

.favourites-mode {
  background:
    linear-gradient(135deg,
      rgba(255, 107, 157, 0.18) 0%,
      rgba(255, 200, 100, 0.08) 45%,
      rgba(100, 200, 255, 0.08) 100%),
    linear-gradient(135deg, #180d25 0%, #251238 45%, #0f1338 100%);
  border-bottom-color: rgba(255, 107, 157, 0.8);
}

.favourites-mode .filter-title {
  background: linear-gradient(135deg, #ff6b9d 0%, #ffd166 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.favourites-mode .btn-favourite {
  background: linear-gradient(135deg, rgba(255, 107, 157, 0.35), rgba(255, 209, 102, 0.2)) !important;
  border-color: rgba(255, 209, 102, 0.8) !important;
}

@media (min-width: 1024px) {
  .filter-content {
    max-width: 700px;
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
  }
}

@media (max-width: 768px) {
  .filter-bar {
    padding: var(--spacing-md) 0;
  }

  .filter-content {
    padding: 0 var(--spacing-lg);
    gap: var(--spacing-lg);
  }

  .filter-title {
    font-size: 1.15rem;
  }

  .filter-btn {
    padding: 0.7rem 1.1rem;
    font-size: var(--font-size-sm);
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
    padding: 0 var(--spacing-md);
    gap: var(--spacing-md);
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
    font-size: var(--font-size-sm);
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
    font-size: var(--font-size-md);
  }
}
</style>