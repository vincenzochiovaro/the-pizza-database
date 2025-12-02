<template>

    <div style="
    background: linear-gradient(180deg, #EFE7E2, #E6DCD5);
    min-height: 100vh;
    padding-top: 1rem;
  ">
        <PizzaFilters />

        <div class="mt-3">
            <PizzaCard />
            <PizzaCard />
            <PizzaCard />
        </div>

    </div>
</template>

<script setup lang="ts">
import PizzaCard from './PizzaCard.vue'
import PizzaFilters from './PizzaFilters.vue'
</script>