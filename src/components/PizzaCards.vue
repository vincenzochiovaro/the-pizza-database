<template>
  <div class="container-fluid px-2 px-md-3">
    <div class="row g-3">
      <div v-for="pizza in props.pizzas" :key="pizza.id" class="col-12 col-md-6 col-lg-4">
        <div class="card border-0 shadow-sm pizza-card">
          <div class="image-container">
            <img :src="getPizzaImage(pizza.image)" class="pizza-image" :alt="pizza.name" />
            <div v-if="isInLocalStorage(pizza.name)" class="heart-icon" @click="toggleLSPizza(pizza.name)">♥</div>
            <div v-else class="heart-icon" @click="toggleLSPizza(pizza.name)">♡</div>
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
import { ref } from 'vue';
import pizzaDefaultImg from '../assets/pizza-default-img.jpg'
import type { Pizza } from '../models/Pizza';

const props = defineProps<{
  pizzas: Array<Pizza>
}>()

const lsTrigger = ref(0)

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
}

.image-container {
  position: relative;
  width: 100%;
  height: 180px;
  background-color: #f8f9fa;
}

.heart-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.4rem;
  color: #e53e3e;
  background: white;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.pizza-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-body {
  padding: 1rem;
}

.pizza-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #2d3748;
}

.ingredients-list {
  padding-left: 1rem;
  margin: 0;
  font-size: 0.85rem;
  color: #4a5568;
}

.ingredients-list li {
  margin-bottom: 0.25rem;
}

.pizza-note {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #718096;
  font-style: italic;
}
</style>