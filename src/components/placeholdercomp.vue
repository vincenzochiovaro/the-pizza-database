<template>
    <h1 class="firstclass">{{ title }}</h1>
    <p>This is a placeholder - hi from azure deployment.</p>
    <p>{{ apicall }}</p>
    <secondplaceholder />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import secondplaceholder from './secondplaceholder.vue'
import fetchFoo from '../api/placeholderapi'

const title = ref("Placeholder Component Title1")
const apicall = ref("Data from API will be shown here.")

onMounted(async () => {
    apicall.value = await fetchFoo()

})
</script>

<style scoped>
.firstclass {
    color: blue;
}
</style>