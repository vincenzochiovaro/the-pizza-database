<template>
    <BuilderPresets @builder-changed="handleBuilderChanged" :templateData="templateToDisplay" />
    <BuilderBody :selectedPresetData="selectedPresetData" :templateData="templateToDisplay"
        :selectedPreset="selectedPreset" />
</template>

<script setup lang="ts">
import BuilderPresets from '../components/builder/BuilderPresets.vue';
import BuilderBody from '../components/builder/BuilderBody.vue';
import { KeepItWarm } from '../api/PizzaApi';
import { ref, computed, watch } from 'vue';
import type { DoughIngredients } from '../models/Builder';
import type { BuilderTemplateData } from '../i18n/models/builderTemplateModel';
import { GetPresetDataAsync } from '../api/BuilderApi';
import { useLanguageStore } from '../stores/LanguageStore';
import { getBuilderTemplate } from '../i18n/builderTemplates';

const languageStore = useLanguageStore();
const currentLanguage = computed(() => languageStore.currentLanguage)

const selectedPresetData = ref<DoughIngredients | null>(null)
const templateToDisplay = ref<BuilderTemplateData | null>(null)
const selectedPreset = ref<'Direct' | 'Biga' | 'Express' | null>(null)

watch(currentLanguage, (newLang) => {
    templateToDisplay.value = getBuilderTemplate(newLang);
}, { immediate: true })

const handleBuilderChanged = async (builderData: {
    preset: 'Direct' | 'Biga' | 'Express';
    doughBallCount: number;
    doughBallWeight: number
}) => {
    selectedPreset.value = builderData.preset;

    const presetToDisplay = await GetPresetDataAsync(
        builderData.preset,
        currentLanguage.value,
        builderData.doughBallCount,
        builderData.doughBallWeight
    );

    selectedPresetData.value = presetToDisplay;
};

if (!sessionStorage.getItem('apiWarmed')) {
    console.log('Warming up API...');
    sessionStorage.setItem('apiWarmed', 'true');
    KeepItWarm();
}
</script>