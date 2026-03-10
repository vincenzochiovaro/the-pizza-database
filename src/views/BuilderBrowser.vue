<template>
    <BuilderPresets @preset-clicked="handlePresetSelected" />
    <BuilderBody :selectedPresetData="selectedPresetData" />

</template>

<script setup lang="ts">
import BuilderPresets from '../components/builder/BuilderPresets.vue';
import BuilderBody from '../components/builder/BuilderBody.vue';
import { KeepItWarm } from '../api/PizzaApi';
import { ref } from 'vue';
import { type DoughIngredients } from '../models/Builder.ts';
// import { GetPresetDataAsync } from '../api/BuilderApi';

const selectedPresetData = ref<DoughIngredients | null>(null)

const handlePresetSelected = (preset: DoughIngredients) => {
    selectedPresetData.value = preset
    console.log("preset emitted to parent - to pass into the API", preset);
    // const presetToDisplay = GetPresetDataAsync(preset);
};

if (!sessionStorage.getItem('apiWarmed')) {
    console.log('Warming up API...');
    sessionStorage.setItem('apiWarmed', 'true');
    KeepItWarm();
}
</script>