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

      <div v-for="pizza in visiblePizzas" :key="pizza.id" class="col-12 col-md-6 col-lg-4">
        <div class="pizza-card" :class="{ vegetarian: pizza.isVegetarian }">
          <div class="pizza-content">
            <div class="pizza-header">
              <h5 class="pizza-title">{{ pizza.name }}</h5>
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
              <button class="btn btn-sm btn-icon" title="Info" data-bs-toggle="popover" data-bs-trigger="focus"
                data-bs-placement="top" :data-bs-content="pizza.note">
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

    <div ref="loadMoreTrigger" class="text-center py-3">
      <div v-if="hasMore" class="text-muted">
        Loading more pizzas...
      </div>
    </div>

    <nav v-if="!isMobile && totalPages > 1" class="d-flex justify-content-center mt-4">
      <ul class="pagination custom-pagination">

        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="changePage(currentPage - 1)">
            ‹
          </button>
        </li>

        <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
          <button class="page-link" @click="changePage(page)">
            {{ page }}
          </button>
        </li>

        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="changePage(currentPage + 1)">
            ›
          </button>
        </li>

      </ul>
    </nav>

  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onBeforeUnmount, computed } from 'vue';
import { Popover } from 'bootstrap';
import pizzaDefaultImg from '../assets/pizza-default-img.jpg'
import type { Pizza } from '../models/Pizza';

const props = defineProps<{
  pizzas: Array<Pizza>
  filter: string
}>()

const loading = ref(true)
const lsTrigger = ref(0)
const filteredPizzas = ref<Array<Pizza>>([]);

const pageSize = 12;
const currentPage = ref(1);
const isMobile = ref(false);
const loadMoreTrigger = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

const totalPages = computed(() => Math.ceil(filteredPizzas.value.length / pageSize));

const visiblePizzas = computed(() => {
  if (isMobile.value) {
    return filteredPizzas.value.slice(0, currentPage.value * pageSize);
  }

  const start = (currentPage.value - 1) * pageSize;
  return filteredPizzas.value.slice(start, start + pageSize);
});

const hasMore = computed(() => {
  return isMobile.value && visiblePizzas.value.length < filteredPizzas.value.length;
});

function initPopovers() {

  nextTick(() => {
    const popovers = document.querySelectorAll('[data-bs-toggle="popover"]');

    popovers.forEach((popover) => {
      new Popover(popover);
    });
  });

}

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

function changePage(page: number) {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function checkMobile() {
  isMobile.value = window.innerWidth < 768;
}

function setupInfiniteScroll() {
  observer?.disconnect();

  observer = new IntersectionObserver(() => {
    console.log("trigger reached", {
      isMobile: isMobile.value,
      hasMore: hasMore.value,
      current: currentPage.value,
      visible: visiblePizzas.value.length,
      total: filteredPizzas.value.length
    });

    if (hasMore.value) {
      currentPage.value++;
    }
  });

  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value);
  }

}


watch(
  () => [props.filter, props.pizzas, lsTrigger.value],
  () => {
    filterPizzas(props.filter);
    currentPage.value = 1;

    if (!props.pizzas.length) {
      loading.value = true;
      return;
    }
    loading.value = false;
    initPopovers();
  },
  { immediate: true }
);

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
  setupInfiniteScroll();
});

onBeforeUnmount(() => {
  observer?.disconnect();
  window.removeEventListener('resize', checkMobile);
});

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
.btn-icon[title*="favourite"] {
  color: #ff4757;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.btn-icon[title*="favourite"]:hover {
  transform: scale(1.15);
}

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

.custom-pagination {
  display: flex;
  gap: 0.4rem;
  padding: 0.5rem;
  background: var(--color-overlay-glass);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-xl);
  backdrop-filter: var(--backdrop-blur);
}

.custom-pagination .page-link {
  background: transparent;
  border: 1px solid transparent;
  color: var(--color-text-muted);
  border-radius: var(--radius-lg);
  padding: 0.4rem 0.8rem;
  transition: all 0.2s ease;
}

.custom-pagination .page-link:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--color-text-primary);
  transform: translateY(-1px);
}

.custom-pagination .page-item.active .page-link {
  background: rgba(255, 107, 157, 0.2);
  border: 1px solid rgba(255, 107, 157, 0.4);
  color: white;
  box-shadow: 0 0 12px rgba(255, 107, 157, 0.2);
}

.custom-pagination .page-item.disabled .page-link {
  opacity: 0.3;
  pointer-events: none;
}
</style>