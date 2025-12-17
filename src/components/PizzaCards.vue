<template>
  <div class="container-fluid px-2 px-md-3">
    <div class="row g-3 g-md-4">
      <div v-for="pizza in pizzasList" :key="pizza.id" class="col-12 col-md-6 col-lg-4">
        <div class="card border-0 shadow-sm h-100 card-hover" style="transition: all 0.3s; cursor: pointer;"
          @click="openRecipe(pizza)">
          <div class="image-container">
            <img :src="getPizzaImage(pizza.image)" class="card-img-top pizza-image" :alt="pizza.name">
            <span class="badge bg-danger position-absolute top-0 end-0 m-2 m-md-3">{{ pizza.style }}</span>

            <!-- Modern heart favorite button -->
            <button class="favorite-btn" @click.stop="toggleFavorite(pizza)"
              :class="{ 'favorited': pizza.isFavorited }">
              <span class="heart-icon">{{ pizza.isFavorited ? '❤️' : '🤍' }}</span>
            </button>
          </div>

          <div class="card-body p-3 p-md-4">
            <h5 class="card-title fw-bold mb-2 mb-md-3" style="font-size: 1.1rem; color: #2d3748;">
              {{ pizza.name }}
            </h5>

            <p class="text-muted mb-3" style="font-size: 0.9rem; line-height: 1.5;">
              {{ pizza.description }}
            </p>

            <div class="pizza-stats">
              <div class="stat-row">
                <div class="stat-item">
                  <span class="stat-label">Style</span>
                  <span class="stat-value">{{ pizza.style }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Cooking</span>
                  <span class="stat-value">{{ pizza.homemade ? 'Home' : 'Restaurant' }}</span>
                </div>
              </div>

              <div class="stat-row">
                <div class="stat-item">
                  <span class="stat-label">Oven</span>
                  <span class="stat-value">{{ pizza.oven }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Prep</span>
                  <span class="stat-value">{{ pizza.prepTime }}h</span>
                </div>
              </div>
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

function openRecipe(pizza: any) {
  // TODO: Navigate to recipe detail page
  console.log('Opening recipe:', pizza.name)
  // You can use Vue Router here: router.push(`/recipe/${pizza.id}`)
}

function toggleFavorite(pizza: any) {
  pizza.isFavorited = !pizza.isFavorited
  // TODO: Save to localStorage or API
  console.log(`${pizza.isFavorited ? 'Added to' : 'Removed from'} favorites:`, pizza.name)
}

const pizzasList = ref([
  {
    id: 1,
    description: 'A classic Margherita pizza with fresh tomatoes, mozzarella cheese, and basil.',
    name: 'Margherita',
    prepTime: 48,
    image: 'pizzaFritta.jpg',
    homemade: true,
    oven: 'Home Oven',
    style: 'Neapolitan',
    views: 1234,
    isFavorited: false
  },
  {
    id: 2,
    description: 'A popular Pepperoni pizza topped with spicy pepperoni slices and melted cheese.',
    name: 'Pepperoni',
    prepTime: 24,
    image: 'pizza-default-img.jpg',
    homemade: false,
    oven: 'Wood Fired',
    style: 'Neapolitan',
    views: 2567,
    isFavorited: true
  },
  {
    id: 3,
    description: 'A delicious Four Cheese pizza with a blend of mozzarella, cheddar, parmesan, and gorgonzola.',
    name: 'Four Cheese',
    prepTime: 3,
    image: 'pizzaFritta.jpg',
    homemade: true,
    oven: 'Electric',
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
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
}

.pizza-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

/* Modern favorite button */
.favorite-btn {
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
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
  font-size: 1.1rem;
  line-height: 1;
  display: block;
}

/* Responsive adjustments */
@media (min-width: 768px) {
  .image-container {
    height: 200px;
  }

  .favorite-btn {
    width: 40px;
    height: 40px;
    top: 10px;
    left: 10px;
  }
}

@media (min-width: 992px) {
  .image-container {
    height: 160px;
  }
}

.pizza-stats {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.stat-row:last-child {
  margin-bottom: 0;
}

.stat-item {
  flex: 1;
  text-align: center;
  padding: 0 0.5rem;
}

.stat-item:not(:last-child) {
  border-right: 1px solid #e9ecef;
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

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12) !important;
}

.card-hover:hover .pizza-image {
  transform: scale(1.03);
}

/* Remove button styles since we removed buttons */
.btn:hover {
  transform: translateY(-2px);
}

.btn-outline-danger:hover {
  background-color: #dc3545;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style>