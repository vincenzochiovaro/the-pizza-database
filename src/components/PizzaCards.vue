<template>
    <div class="container mt-4">
        <div v-for="pizza in pizzasList" :key="pizza.id" class="row mb-4">
            <div class="col-12">
                <div class="card bg-secondary border-0 shadow-sm">
                    <img :src="homeImgSrc" class="card-img-top" :alt="pizza.name">

                    <div class="card-body p-3 d-flex flex-column">
                        <h5 class="card-title text-white fw-bold text-center mb-2" style="font-size: 1.1rem;">
                            {{ pizza.name }}
                        </h5>

                        <p class="text-white-50 mb-3" style="
                                font-size: 0.85rem;
                                line-height: 1.4;
                                height: 3.6em;
                                overflow: hidden;
                            ">
                            {{ pizza.description }}
                        </p>
                        <div class="mt-auto"
                            style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.8rem;">
                            <div style="display: flex; justify-content: center; gap: 1.5rem;">
                                <div class="text-white-50" style="text-align: center;">
                                    <strong>Style</strong>
                                    <div>{{ pizza.style }}</div>
                                </div>

                                <div class="text-white-50" style="text-align: center;">
                                    <strong>Cooking</strong>
                                    <div>{{ pizza.homemade ? 'Homemade' : 'Restaurant' }}</div>
                                </div>
                            </div>

                            <div style="display: flex; justify-content: center; gap: 1.5rem;">
                                <div class="text-white-50" style="text-align: center;">
                                    <strong>Oven</strong>
                                    <div>{{ pizza.oven }}</div>
                                </div>

                                <div class="text-white-50" style="text-align: center;">
                                    <strong>Views</strong>
                                    <div>{{ pizza.views }}</div>
                                </div>

                                <div class="text-white-50" style="text-align: center;">
                                    <strong>Prep Time</strong>
                                    <div>{{ pizza.prepTime }}h</div>
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
import homeImg from '../assets/homeimg.png'

const homeImgSrc = homeImg
const pizzasList = ref([
    {
        id: 1,
        description: 'A classic Margherita pizza with fresh tomatoes, mozzarella cheese, and basil.',
        name: 'Margherita',
        prepTime: 48,
        image: 'https://via.placeholder.com/800x400?text=Margherita',
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
        image: 'https://via.placeholder.com/800x400?text=Pepperoni',
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
        image: 'https://via.placeholder.com/800x400?text=Four+Cheese',
        homemade: true,
        oven: 'Electric',
        style: 'New York',
        views: 892
    }
])
</script>