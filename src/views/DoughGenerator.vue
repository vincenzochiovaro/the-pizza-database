<template>
    <h1>Dough Generator</h1>
</template>

<script setup lang="ts">
import { KeepItWarm } from '../api/PizzaApi';

if (!sessionStorage.getItem('apiWarmed')) {
    console.log('Warming up API...');
    sessionStorage.setItem('apiWarmed', 'true');
    KeepItWarm();
}
</script>