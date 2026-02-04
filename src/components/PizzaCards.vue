<template>
  <div class="container-fluid px-2 px-md-3">
    <div class="row g-3">
      <div v-if="!filteredPizzas.length" class="empty-favourites">
        <div class="empty-icon">🍕</div>
        <h5>No favourite pizzas yet</h5>
        <p>Tap the heart on a pizza to add it here.</p>
      </div>
      <div v-for="pizza in filteredPizzas" :key="pizza.id" class="col-12 col-md-6 col-lg-4">
        <div class="card border-0 shadow-sm pizza-card">
          <div class="image-container">
            <img :src="getPizzaImage(pizza.image)" class="pizza-image" :alt="pizza.name" />
            <div v-if="pizza.isVegetarian" class="vegetarian-icon" title="Vegetarian">🌱</div>
            <div class="heart-icon" @click="toggleLSPizza(pizza.name)">
              {{ isInLocalStorage(pizza.name) ? '♥' : '♡' }}
            </div>
          </div>
          <div class="card-body">
            <h5 class="pizza-title">
              The {{ pizza.name }}
            </h5>

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
  border-radius: 0.75rem;
  overflow: hidden;
  border: 1px solid #A8C89E;
  transition: all 0.3s ease;
}

.pizza-card:hover {
  box-shadow: 0 4px 12px rgba(45, 80, 22, 0.15) !important;
  transform: translateY(-2px);
}

.image-container {
  position: relative;
  width: 100%;
  height: 180px;
  background: linear-gradient(135deg, #f8f9fa 0%, #f0f3ed 100%);
}

.heart-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 34px;
  height: 34px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  color: #C85A2C;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(200, 90, 44, 0.2);
  transition: all 0.3s ease;
  border: 2px solid #C85A2C;
}

.heart-icon:hover {
  transform: scale(1.15);
  box-shadow: 0 4px 12px rgba(200, 90, 44, 0.35);
  background-color: rgba(200, 90, 44, 0.1);
}

.vegetarian-icon {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #def0d9 0%, #f8fff5 100%);
  border-radius: 50%;
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px rgba(45, 80, 22, 0.25);
  transition: all 0.3s ease;
}

.vegetarian-icon:hover {
  transform: scale(1.12);
  box-shadow: 0 4px 14px rgba(45, 80, 22, 0.35);
}

.pizza-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-body {
  padding: 1rem;
  background-color: white;
}

.pizza-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #2D5016;
}

.ingredients-list {
  padding-left: 1rem;
  margin: 0;
  font-size: 0.85rem;
  color: #555555;
}

.ingredients-list li {
  margin-bottom: 0.25rem;
}

.pizza-note {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #777777;
  font-style: italic;
}

.empty-favourites {
  width: 100%;
  padding: 3rem 1rem;
  text-align: center;
  background: linear-gradient(135deg, #fafaf8 0%, #f0f3ed 100%);
  border-radius: 0.75rem;
  border: 2px dashed #A8C89E;
  color: #555555;
}

.empty-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.empty-favourites h5 {
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: #2D5016;
}

.empty-favourites p {
  font-size: 0.9rem;
  margin: 0;
  color: #777777;
}
</style>