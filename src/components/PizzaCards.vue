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
                <div v-if="pizza.isVegetarian" class="vegetarian-badge" title="Vegetarian">🌱</div>
                <div class="heart-icon" @click="toggleLSPizza(pizza.name)">
                  {{ isInLocalStorage(pizza.name) ? '♥' : '♡' }}
                </div>
              </div>
            </div>

            <img :src="getPizzaImage(pizza.image)" class="pizza-image" :alt="pizza.name" />

            <ul class="ingredients-list">
              <li v-for="ingredient in pizza.ingredients" :key="ingredient">
                {{ ingredient }}
              </li>
            </ul>

            <p v-if="pizza.note" class="pizza-note">
              {{ pizza.note }}
            </p>
          </div>
        </div>
      </div>
    </div>
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
    return new URL(`../assets/pizzaimages/${imageName}`, import.meta.url).href
  } catch {
    return pizzaDefaultImg
  }
}
</script>

<style scoped>
.pizza-card {
  border-radius: 1rem;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  padding: 1.25rem 1rem;
  text-align: center;
  cursor: default;
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
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
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
}

.pizza-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.pizza-controls {
  display: flex;
  gap: 0.5rem;
}

.pizza-title {
  font-weight: 700;
  font-size: 1rem;
  margin: 0;
  color: #ffffff;
  text-align: left;
}

.pizza-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 0.75rem;
  margin-bottom: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.vegetarian-badge {
  width: 32px;
  height: 32px;
  background: rgba(100, 255, 200, 0.2);
  border-radius: 50%;
  border: 2px solid rgba(100, 255, 200, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  box-shadow: 0 0 12px rgba(100, 255, 200, 0.2);
  transition: all 0.3s ease;
}

.vegetarian-badge:hover {
  transform: scale(1.1);
  box-shadow: 0 0 16px rgba(100, 255, 200, 0.4);
}

.heart-icon {
  width: 32px;
  height: 32px;
  background: rgba(255, 107, 157, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #FF6B9D;
  cursor: pointer;
  box-shadow: 0 0 12px rgba(255, 107, 157, 0.2);
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 107, 157, 0.6);
}

.heart-icon:hover {
  transform: scale(1.15);
  box-shadow: 0 0 16px rgba(255, 107, 157, 0.4);
  background-color: rgba(255, 107, 157, 0.3);
  border-color: rgba(255, 107, 157, 0.8);
}

.ingredients-list {
  padding-left: 1rem;
  margin: 0;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
}

.ingredients-list li {
  margin-bottom: 0.25rem;
}

.pizza-note {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
}

.empty-state {
  width: 100%;
  padding: 3rem 1rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
}

.empty-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.empty-state h5 {
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: #ffffff;
}

.empty-state p {
  font-size: 0.9rem;
  margin: 0;
  color: rgba(255, 255, 255, 0.6);
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
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