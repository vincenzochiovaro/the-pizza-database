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

const lastBuilderData = ref<{
    preset: 'Direct' | 'Biga' | 'Express';
    doughBallCount: number;
    doughBallWeight: number;
    hydration: number;
    temperature: number;
    preferment: number | null;
} | null>(null);

const lastFetchKey = ref<string | null>(null);

watch(currentLanguage, async (newLang) => {
    templateToDisplay.value = getBuilderTemplate(newLang);
    if (lastBuilderData.value) {
        await fetchPreset(lastBuilderData.value);
    }
}, { immediate: true })

const fetchPreset = async (builderData: typeof lastBuilderData.value) => {
    if (!builderData) return;

    const key = JSON.stringify({
        ...builderData,
        lang: currentLanguage.value
    });

    if (key === lastFetchKey.value) return;

    lastFetchKey.value = key;

    const presetToDisplay = await GetPresetDataAsync(
        builderData.preset,
        currentLanguage.value,
        builderData.doughBallCount,
        builderData.doughBallWeight,
        builderData.hydration,
        builderData.temperature,
        builderData.preferment
    );

    selectedPresetData.value = presetToDisplay;
};

const handleBuilderChanged = async (builderData: {
    preset: 'Direct' | 'Biga' | 'Express';
    doughBallCount: number;
    doughBallWeight: number;
    hydration: number;
    temperature: number;
    preferment: number | null;
}) => {
    lastBuilderData.value = builderData;
    selectedPreset.value = builderData.preset;

    console.log(builderData, 'Received builder data');
    await fetchPreset(builderData);
};

if (!sessionStorage.getItem('apiWarmed')) {
    console.log('Warming up API...');
    sessionStorage.setItem('apiWarmed', 'true');
    KeepItWarm();
}
</script>