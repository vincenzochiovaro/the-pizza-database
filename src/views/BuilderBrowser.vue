<template>
    <BuilderPresets @preset-clicked="handlePresetSelected" />
    <BuilderBody :selectedPresetData="selectedPresetData" :templateData="templateToDisplay" />
</template>

<script setup lang="ts">
import BuilderPresets from '../components/builder/BuilderPresets.vue';
import BuilderBody from '../components/builder/BuilderBody.vue';
import { KeepItWarm } from '../api/PizzaApi';
import { ref, computed, watch } from 'vue';
import type { DoughIngredients, BuilderTemplateData } from '../models/Builder';
import { GetPresetDataAsync } from '../api/BuilderApi';
import { useLanguageStore } from '../stores/LanguageStore';
import { GetTemplateDataByLangAsync } from '../api/BuilderApi';

const languageStore = useLanguageStore();
const currentLanguage = computed(() => languageStore.currentLanguage)

const selectedPresetData = ref<DoughIngredients | null>(null)
const templateToDisplay = ref<BuilderTemplateData | null>(null)

watch(currentLanguage, async (newLang) => {
    console.log('language changed', newLang)

    const templateData = await GetTemplateDataByLangAsync(newLang);
    templateToDisplay.value = templateData;
}, { immediate: true })

const handlePresetSelected = async (preset: string) => {
    console.log("preset emitted to parent - to pass into the API", preset);
    const presetToDisplay = await GetPresetDataAsync(preset, currentLanguage.value);

    selectedPresetData.value = presetToDisplay;

};

if (!sessionStorage.getItem('apiWarmed')) {
    console.log('Warming up API...');
    sessionStorage.setItem('apiWarmed', 'true');
    KeepItWarm();
}
</script>