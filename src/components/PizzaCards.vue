<template>
  <div class="container-fluid px-2 px-md-3">
    <div class="row g-3 g-md-4">
      <div v-for="pizza in pizzasList" :key="pizza.id" class="col-12 col-md-6 col-lg-4">
        <div class="card border-0 shadow-sm card-hover d-flex flex-row" :class="{ 'favorited': pizza.isFavorited }"
          style="transition: all 0.3s; cursor: pointer;" @click="openRecipe(pizza.id)">
          <div class="image-container position-relative">
            <img :src="getPizzaImage(pizza.image)" class="pizza-image" :alt="pizza.name">
            <span class="badge bg-danger position-absolute top-0 end-0 m-2">{{ pizza.style }}</span>
          </div>

          <div class="card-body p-3 flex-grow-1">
            <div class="d-flex align-items-center mb-2">
              <button class="favorite-btn me-2" @click.stop="toggleFavorite(pizza)">
                <span class="heart-icon">❤️</span>
              </button>
              <h5 class="card-title fw-bold mb-0" style="font-size: 1.1rem; color: #2d3748;">
                {{ pizza.name }}
              </h5>
            </div>

            <div class="d-flex flex-wrap gap-3 mt-3">
              <div class="stat-item">
                <span class="stat-label">Temp</span>
                <span class="stat-value">{{ pizza.temp }} <span style="font-size: 0.7em;">°C</span></span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Prep</span>
                <span class="stat-value">{{ pizza.prepTime }}h</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Price</span>
                <span class="stat-value">
                  <span v-for="i in 3" :key="i" :class="{ 'bold-price': i <= pizza.price }">£</span>
                </span>
              </div>
            </div>

            <div class="mt-3 text-end">
              <span class="fw-bold" style="color: #fd7e14;">View ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import pizzaDefaultImg from '../assets/pizza-default-img.jpg'

function getPizzaImage(imageName: string): string {
  try {
    return new URL(`../assets/${imageName}`, import.meta.url).href
  } catch (error) {
    return pizzaDefaultImg
  }
}

function openRecipe(id: number) {
  // TODO: Navigate to recipe detail page
  console.log('Opening recipe:', id)
  // Eg. router.push(`/recipe/${id}`)
}

function toggleFavorite(pizza: any) {
  pizza.isFavorited = !pizza.isFavorited
  // TODO: Save to localStorage
  console.log(`${pizza.isFavorited ? 'Added to' : 'Removed from'} favorites:`, pizza.name)
}

const pizzasList = ref([
  {
    id: 1,
    description: 'A classic Margherita pizza with fresh tomatoes, mozzarella cheese, and basil.',
    name: 'Pepperoni And Olives',
    prepTime: 48,
    price: 1,
    image: 'pizzaFritta.jpg',
    temp: 500,
    style: 'Neapolitan',
    views: 1234,
    isFavorited: false
  },
  {
    id: 2,
    description: 'A popular Pepperoni pizza topped with spicy pepperoni slices and melted cheese.',
    name: 'Pepperoni',
    prepTime: 24,
    price: 2,
    image: 'pizza-default-img.jpg',
    temp: 350 + '+',
    style: 'Neapolitan',
    views: 2567,
    isFavorited: false
  },
  {
    id: 3,
    description: 'A delicious Four Cheese pizza with a blend of mozzarella, cheddar, parmesan, and gorgonzola.',
    name: 'Four Cheese',
    prepTime: 3,
    price: 3,
    image: 'pizzaFritta.jpg',
    temp: 250,
    style: 'New York',
    views: 892,
    isFavorited: false
  }
])
</script>

<style scoped>
.image-container {
  position: relative;
  overflow: hidden;
  width: 40%;
  height: 150px;
  background-color: #f8f9fa;
  flex-shrink: 0;
  align-self: center;
}

.pizza-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.favorite-btn {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(4px);
}

.favorite-btn:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.favorited .favorite-btn {
  background: rgba(220, 53, 69, 0.9);
}

.favorited .heart-icon {
  animation: heartPulse 0.6s ease;
}

@keyframes heartPulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

.heart-icon {
  font-size: 1rem;
  line-height: 1;
  display: block;
}

.stat-item {
  text-align: left;
}

.stat-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
}

.stat-value {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #2d3748;
}

.bold-price {
  font-weight: 900;
}

.stat-value span:not(.bold-price) {
  opacity: 0.4;
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12) !important;
}

.card-hover:hover .pizza-image {
  transform: scale(1.03);
}

@media (max-width: 576px) {
  .image-container {
    width: 35%;
  }

  .favorite-btn {
    width: 28px;
    height: 28px;
  }

  .heart-icon {
    font-size: 0.9rem;
  }

  .card-title {
    font-size: 1rem !important;
  }

  .stat-label {
    font-size: 0.7rem;
  }

  .stat-value {
    font-size: 0.85rem;
  }
}

@media (min-width: 768px) {
  .favorite-btn {
    width: 36px;
    height: 36px;
  }

  .heart-icon {
    font-size: 1.1rem;
  }
}
</style>