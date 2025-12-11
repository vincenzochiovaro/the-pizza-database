<template>
    <div class="min-vh-100 py-3 bg-light">
        <div class="container">
            <div class="mx-auto" style="max-width: 900px;">
                <PizzaFilters @update-filter="SetFilter" />
            </div>

            <div class="row g-3 mt-3">
                <div class="col-md-4" v-for="n in 3" :key="n">
                    <PizzaCards v-if="currentFilter !== 'Favourites'" :pizzas="pizzaList" />
                    <Favourites v-else />
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import PizzaCards from '../components/PizzaCards.vue'
import PizzaFilters from '../components/PizzaFilters.vue'
import Favourites from '../components/Favourites.vue';
import FetchPizzasByFilter from '../api/PizzaApi'

const currentFilter = ref('All Pizzas')

function SetFilter(selectedFilter: string) {
    currentFilter.value = selectedFilter
}

const pizzaList = ref()

watch(currentFilter, async (newValue) => {
    const pizzaListResponse = await FetchPizzasByFilter(newValue)
    pizzaList.value = pizzaListResponse
}, { immediate: true })

</script>