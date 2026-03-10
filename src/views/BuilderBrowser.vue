<template>
    <BuilderPresets @preset-clicked="handlePresetSelected" />
    <BuilderBody />

</template>

<script setup lang="ts">
import BuilderPresets from '../components/builder/BuilderPresets.vue';
import BuilderBody from '../components/builder/BuilderBody.vue';
import { KeepItWarm } from '../api/PizzaApi';
// import { GetPresetAsync } from '../api/BuilderApi';


const handlePresetSelected = (preset: string) => {
    console.log("preset emitted to parent - to pass into the API", preset);
    // const presetToDisplay = GetPresetAsync(preset);
};

if (!sessionStorage.getItem('apiWarmed')) {
    console.log('Warming up API...');
    sessionStorage.setItem('apiWarmed', 'true');
    KeepItWarm();
}
</script>