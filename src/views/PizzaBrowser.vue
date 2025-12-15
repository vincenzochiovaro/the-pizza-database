<template>
    <div class="min-vh-100 py-3 bg-light">
        <div class="container">

            <PizzaFilters @update-filter="SetFilter" />


            <div class="row justify-content-center mt-3">
                <div class="col-lg-11">
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