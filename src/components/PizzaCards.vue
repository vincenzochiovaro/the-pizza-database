<template>
  <div class="container-fluid px-2 px-md-3">
    <div class="row g-3">
      <div v-if="loading" class="col-12">
        <div class="empty-state">
          <div class="loader">
            <span>🍕</span>
            <span>🍕</span>
            <span>🍕</span>
          </div>
        </div>
      </div>

      <div v-else-if="!filteredPizzas.length" class="col-12">
        <div class="empty-state">
          <div class="empty-icon">🍕</div>
          <h5>No favourite pizzas yet</h5>
          <p>Tap the heart on a pizza to add it here.</p>
        </div>
      </div>

      <div v-for="pizza in filteredPizzas" :key="pizza.id" class="col-12 col-md-6 col-lg-4">
        <div class="pizza-card" :class="{ vegetarian: pizza.isVegetarian }">
          <div class="pizza-content">
            <div class="pizza-header">
              <h5 class="pizza-title">The {{ pizza.name }}</h5>
              <div class="pizza-controls">
                <div v-if="pizza.isVegetarian" class="vegetarian-icon" title="Vegetarian">🌱</div>

              </div>
            </div>

            <img :src="getPizzaImage(pizza.image)" class="pizza-image" :alt="pizza.name" />

            <ul class="ingredients-list">
              <li v-for="ingredient in pizza.ingredients" :key="ingredient">
                {{ ingredient }}
              </li>
            </ul>


            <div class="d-flex justify-content-between mt-auto pt-2 gap-2">
              <button class="btn btn-sm btn-icon" title="More info" data-bs-toggle="modal"
                :data-bs-target="'#noteModal' + pizza.id">
                💡
              </button>
              <button class="btn btn-sm btn-icon"
                :title="isInLocalStorage(pizza.name) ? 'Remove favourite' : 'Add favourite'"
                @click="toggleLSPizza(pizza.name)">
                {{ isInLocalStorage(pizza.name) ? '♥' : '♡' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Teleport v-for="pizza in filteredPizzas" :key="'modal-' + pizza.id" to="body">
      <div class="modal fade" :id="'noteModal' + pizza.id" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">📝 {{ pizza.name }} – Note</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <p v-if="pizza.note" class="mb-0">{{ pizza.note }}</p>
              <p v-else class="text-muted mb-0">No additional notes for this pizza.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import pizzaDefaultImg from '../assets/pizza-default-img.jpg'
import type { Pizza } from '../models/Pizza';

const props = defineProps<{
  pizzas: Array<Pizza>
  filter: string
}>()

const loading = ref(true)
const lsTrigger = ref(0)
const filteredPizzas = ref<Array<Pizza>>([]);

function filterPizzas(filter: string) {
  if (filter !== "Favourites") {
    filteredPizzas.value = props.pizzas;
    return;
  }

  filteredPizzas.value = [];

  props.pizzas.forEach(pizza => {
    if (localStorage.getItem(pizza.name)) {
      filteredPizzas.value.push(pizza);
    }
  });
}


watch(
  () => [props.filter, props.pizzas, lsTrigger.value],
  () => {
    filterPizzas(props.filter);
    if (!props.pizzas.length) {
      loading.value = true;
      return;
    }

    loading.value = false;
  },
  { immediate: true }
);

function isInLocalStorage(pizzaName: string): boolean {
  lsTrigger.value;
  if (localStorage.getItem(pizzaName)) {
    return true;
  }
  return false;
}

function toggleLSPizza(pizzaName: string): void {
  if (isInLocalStorage(pizzaName)) {
    localStorage.removeItem(pizzaName);
  } else {
    localStorage.setItem(pizzaName, 'true');
  }

  lsTrigger.value++;
}
function getPizzaImage(imageName: string | undefined): string {
  try {
    if (!imageName) {
      return pizzaDefaultImg
    }
    return `https://github.com/vincenzochiovaro/the-pizza-database-assets/blob/main/menu-assets/pizza-display-assets/${imageName}?raw=true`
  } catch {
    return pizzaDefaultImg
  }
}
</script>

<style scoped>
/* Target the heart button using the dynamic title attribute */
.btn-icon[title*="favourite"] {
  color: #ff4757;
  /* vibrant red for both states */
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Subtle scale on hover for better feedback */
.btn-icon[title*="favourite"]:hover {
  transform: scale(1.15);
}

/* Press-down effect on click */
.btn-icon[title*="favourite"]:active {
  transform: scale(0.85);
}

.btn-icon {
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  border-radius: 50%;
  background: transparent;
  border: 1px solid var(--color-border-subtle);
  transition: all 0.2s;
}

.pizza-card {
  max-width: 350px;
  margin: 0 auto;
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 2px solid var(--color-border-subtle);
  background: var(--color-overlay-glass);
  backdrop-filter: var(--backdrop-blur);
  transition: all var(--transition-base);
  position: relative;
  padding: 1.25rem var(--spacing-md);
  text-align: center;
  cursor: default;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.pizza-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent);
  transform: rotate(45deg);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }

  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
}

.pizza-card:hover {
  background: var(--color-overlay-glass);
  border-color: var(--color-border-light);
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.pizza-card.vegetarian {
  border-color: rgba(100, 255, 200, 0.3);
}

.pizza-card.vegetarian:hover {
  background: rgba(100, 255, 200, 0.1);
  border-color: rgba(100, 255, 200, 0.6);
}

.pizza-content {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.pizza-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.pizza-controls {
  display: flex;
  gap: var(--spacing-sm);
}

.pizza-title {
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-md);
  margin: 0;
  color: var(--color-text-primary);
  text-align: left;
}

.pizza-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: var(--radius-lg);
  margin-bottom: 0.75rem;
  border: 2px solid var(--color-border-subtle);
}

.vegetarian-icon {
  width: var(--size-icon-lg);
  height: var(--size-icon-lg);
  background: rgba(100, 255, 200, 0.2);
  border-radius: 50%;
  border: 2px solid rgba(100, 255, 200, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-md);
  box-shadow: 0 0 12px rgba(100, 255, 200, 0.2);
  transition: all var(--transition-base);
}

.vegetarian-icon:hover {
  transform: scale(1.1);
  box-shadow: 0 0 16px rgba(100, 255, 200, 0.4);
}

.heart-icon {
  width: var(--size-icon-lg);
  height: var(--size-icon-lg);
  background: rgba(255, 107, 157, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xl);
  color: #FF6B9D;
  cursor: pointer;
  box-shadow: 0 0 12px rgba(255, 107, 157, 0.2);
  transition: all var(--transition-base);
  border: 2px solid rgba(255, 107, 157, 0.6);
}

.heart-icon:hover {
  transform: scale(1.15);
  box-shadow: 0 0 16px rgba(255, 107, 157, 0.4);
  background-color: rgba(255, 107, 157, 0.3);
  border-color: rgba(255, 107, 157, 0.8);
}

.ingredients-list {
  list-style: none;
  padding-left: var(--spacing-md);
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.ingredients-list li {
  margin-bottom: var(--spacing-xs);
}

.pizza-note {
  margin-top: auto;
  font-size: var(--font-size-xs);
  color: var(--color-text-faint);
  font-style: italic;
}

.empty-state {
  width: 100%;
  padding: var(--spacing-2xl) var(--spacing-md);
  text-align: center;
  background: var(--color-overlay-glass);
  border-radius: var(--radius-xl);
  border: 2px solid var(--color-border-subtle);
  color: var(--color-text-muted);
  backdrop-filter: var(--backdrop-blur);
}

.empty-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.empty-state h5 {
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-xs);
  color: var(--color-text-primary);
}

.empty-state p {
  font-size: var(--font-size-base);
  margin: 0;
  color: var(--color-text-faint);
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: 2rem;
}

.loader span {
  display: inline-block;
  animation: bounce 0.6s infinite alternate;
}

.loader span:nth-child(2) {
  animation-delay: 0.2s;
}

.loader span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-10px);
  }
}
</style>