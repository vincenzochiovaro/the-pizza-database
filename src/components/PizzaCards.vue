<template>
  <div class="container">
    <div v-for="pizza in pizzasList" :key="pizza.id" class="row mb-4">
      <div class="col-12">
        <div class="card border-0 shadow-sm h-100 card-hover" style="transition: all 0.3s;">
          <div style="position: relative; overflow: hidden; height: 220px;">
            <img :src="getPizzaImage(pizza.image)" class="card-img-top" :alt="pizza.name"
              style="object-fit: cover; height: 100%; width: 100%; transition: transform 0.3s;">
            <span class="badge bg-danger position-absolute top-0 end-0 m-3">{{ pizza.style }}</span>
          </div>

          <div class="card-body p-4 d-flex flex-column">
            <h5 class="card-title fw-bold mb-3" style="font-size: 1.25rem; color: #2d3748;">
              {{ pizza.name }}
            </h5>

            <p class="text-muted mb-3" style="
                                font-size: 0.95rem;
                                line-height: 1.6;
                                flex-grow: 1;
                                max-height: 3em;
                                overflow: hidden;
                            ">
              {{ pizza.description }}
            </p>

            <div class="row text-center mb-3 py-3 bg-light rounded-2">
              <div class="col-6 col-md-3">
                <small class="text-muted d-block fw-bold" style="font-size: 0.75rem;">STYLE</small>
                <span style="font-size: 0.95rem; font-weight: 600; color: #2d3748;">{{ pizza.style
                  }}</span>
              </div>
              <div class="col-6 col-md-3">
                <small class="text-muted d-block fw-bold" style="font-size: 0.75rem;">COOKING</small>
                <span style="font-size: 0.95rem; font-weight: 600; color: #2d3748;">{{ pizza.homemade ?
                  '🏠' : '🏢' }}</span>
              </div>
              <div class="col-6 col-md-3">
                <small class="text-muted d-block fw-bold" style="font-size: 0.75rem;">OVEN</small>
                <span style="font-size: 0.95rem; font-weight: 600; color: #2d3748;">{{ pizza.oven
                  }}</span>
              </div>
              <div class="col-6 col-md-3">
                <small class="text-muted d-block fw-bold" style="font-size: 0.75rem;">PREP</small>
                <span style="font-size: 0.95rem; font-weight: 600; color: #2d3748;">{{ pizza.prepTime
                  }}h</span>
              </div>
            </div>

            <div class="d-flex gap-2">
              <button class="btn btn-outline-danger flex-grow-1 fw-bold" style="transition: all 0.3s;">
                ❤️ Save
              </button>
              <button class="btn btn-secondary flex-grow-1 fw-bold" style="transition: all 0.3s;">
                👁️ View
              </button>
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
    views: 1234
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
    views: 2567
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
    views: 892
  }
])
</script>

<style scoped>
.card-hover:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15) !important;
}

.card-hover:hover img {
  transform: scale(1.05);
}

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