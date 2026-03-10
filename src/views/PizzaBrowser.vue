<template>
    <div class="pizza-browser">
        <div class="starfield"></div>
        <PizzaFilters @update-filter="SetFilter" />
        <div class="pizza-container">
            <div class="row justify-content-center">
                <div class="col-lg-11">
                    <PizzaCards :filter="currentFilter" :pizzas="pizzaList" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import PizzaCards from '../components/PizzaCards.vue'
import PizzaFilters from '../components/PizzaFilters.vue'
import { FetchPizzasByFilter } from '../api/PizzaApi'
import type { Pizza } from '../models/Pizza';
import { useLanguageStore } from '../stores/LanguageStore';

const languageStore = useLanguageStore();
const currentLanguage = computed(() => languageStore.currentLanguage)

const currentFilter = ref('All Pizzas')

function SetFilter(selectedFilter: string) {
    currentFilter.value = selectedFilter
}

const pizzaList = ref<Array<Pizza>>([])

watch([currentFilter, currentLanguage], async ([newFilter, newLang]) => {
    console.log('debug: filter or language changed', newFilter, newLang)
    const pizzaListResponse = await FetchPizzasByFilter(newFilter, newLang);
    pizzaList.value = pizzaListResponse
}, { immediate: true })

</script>

<style scoped>
.pizza-browser {
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(135deg, #0a0e27 0%, #1a1545 50%, #0a0e27 100%);
}

.starfield {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:
        radial-gradient(2px 2px at 20px 30px, #eee, rgba(238, 238, 238, 0)),
        radial-gradient(2px 2px at 60px 70px, #fff, rgba(255, 255, 255, 0)),
        radial-gradient(1px 1px at 50px 50px, #fff, rgba(255, 255, 255, 0)),
        radial-gradient(1px 1px at 130px 80px, #fff, rgba(255, 255, 255, 0)),
        radial-gradient(2px 2px at 90px 10px, #fff, rgba(255, 255, 255, 0));
    background-repeat: repeat;
    background-size: 200px 200px;
    animation: twinkle 5s infinite;
    z-index: 0;
    pointer-events: none;
}

@keyframes twinkle {

    0%,
    100% {
        opacity: 0.5;
    }

    50% {
        opacity: 1;
    }
}

.pizza-container {
    position: relative;
    z-index: 2;
    padding: 1.5rem 2rem 3rem;
    margin-top: 140px;
}
</style>