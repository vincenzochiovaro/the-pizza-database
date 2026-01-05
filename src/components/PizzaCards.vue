<template>
  <div class="container-fluid px-2 px-md-3">
    <div class="row g-3">
      <div v-for="pizza in props.pizzas" :key="pizza.id" class="col-12 col-md-6 col-lg-4">
        <div class="card border-0 shadow-sm pizza-card">
          <div class="image-container">
            <img :src="getPizzaImage(pizza.image)" class="pizza-image" :alt="pizza.name" />
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
import pizzaDefaultImg from '../assets/pizza-default-img.jpg'
import type { Pizza } from '../models/Pizza'

const props = defineProps<{
  pizzas: Array<Pizza>
}>()

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
  width: 100%;
  height: 180px;
  background-color: #f8f9fa;
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