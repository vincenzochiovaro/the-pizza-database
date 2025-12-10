<template>
    <div class="min-vh-100 py-3 bg-light">
        <div class="container">
            <div class="mx-auto" style="max-width: 900px;">
                <PizzaFilters />
            </div>

            <div class="row g-3 mt-3">
                <div class="col-md-4" v-for="n in 3" :key="n">
                    <PizzaCard />
                    <Favourites />
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import PizzaCard from '../components/PizzaCard.vue'
import PizzaFilters from '../components/PizzaFilters.vue'
import Favourites from './Favourites.vue';
</script>