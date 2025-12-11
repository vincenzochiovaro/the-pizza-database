<template>
    <h1>{{ props.pizzas[0] }}</h1>
</template>

<script setup lang="ts">

const props = defineProps<{
    pizzas: Array<any>
}>()

</script>