<template>
    <div class="min-vh-100 py-3 bg-light">
        <div class="container">
            <PizzaFilters @update-filter="SetFilter" />
            <div class="row justify-content-center mt-3">
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
    const pizzaListResponse = await FetchPizzasByFilter(newFilter, newLang);
    pizzaList.value = pizzaListResponse
}, { immediate: true })

</script>