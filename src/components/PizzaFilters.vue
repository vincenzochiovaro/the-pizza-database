<template>
    <div class="container mt-3">
        <div class="p-3 rounded shadow-sm bg-secondary">

            <h4 v-if="selectedFilter === 'Favourites'" class="text-white fw-bold fst-italic m-0 mb-3 text-center">
                Your Favourites
            </h4>

            <h4 v-else class="text-white fw-bold fst-italic m-0 mb-3 text-center"> {{ selectedFilter }}</h4>

            <div class="d-flex justify-content-center gap-3">

                <button @click="selectFilter('Favourites')"
                    class="btn btn-outline-light d-flex justify-content-between align-items-center fw-bold"
                    style="width:150px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; padding:0.5rem 1rem;">
                    <span class="text-truncate">Favourites</span>
                    <span>❤️</span>
                </button>

                <div class="dropdown">
                    <button
                        class="btn btn-dark d-flex justify-content-between align-items-center fw-bold text-white dropdown-toggle"
                        type="button" id="filterDropdown" data-bs-toggle="dropdown" aria-expanded="false"
                        style="width:150px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; padding:0.5rem 1rem;">
                        <span class="text-truncate">{{ selectedFilter }}</span>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="filterDropdown">
                        <li><button class="dropdown-item" @click="selectFilter('All Pizzas')">All Pizzas</button></li>
                        <li><button class="dropdown-item"
                                @click="selectFilter('Easiest to most advanced pizzas')">Level: Low →
                                High</button></li>
                        <li><button class="dropdown-item"
                                @click="selectFilter('Most advanced to easiest pizzas')">Level: High →
                                Low</button></li>
                        <li><button class="dropdown-item" @click="selectFilter('Most popular pizzas')">Popular</button>
                        </li>
                        <li><button class="dropdown-item" @click="selectFilter('Pizzas by style')">Pizza Style</button>
                        </li>
                    </ul>
                </div>

            </div>

            <div class="text-center mt-3">
                <button @click="resetFilter" class="btn btn-link text-white p-0"
                    style="font-size:0.9rem; text-decoration:underline;">
                    Reset filter
                </button>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['update-filter'])

const selectedFilter = ref('All Pizzas')

function selectFilter(value: string) {
    selectedFilter.value = value
    emit('update-filter', value)
}

function resetFilter() {
    selectedFilter.value = 'All Pizzas'
    emit('update-filter', 'All Pizzas')
}
</script>