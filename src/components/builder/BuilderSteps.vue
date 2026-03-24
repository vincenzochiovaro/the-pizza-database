<template>
    <div class="white-text">
        <h1>{{ props.templateData?.stepsTitle }}</h1>
        <div v-for="(step, index) in props.selectedPresetData?.steps ?? []" :key="index">
            <p>{{ step }}</p>
            <img :src="`/src/assets/builderimages/step${index + 1}.jpg`" :alt="`Step ${index + 1}`">
        </div>
    </div>
</template>

<script setup lang="ts">
import type { DoughIngredients } from '../../models/Builder.ts';
import type { BuilderTemplateData } from '../../i18n/models/builderTemplateModel.ts';

const props = defineProps<{
    selectedPresetData: DoughIngredients | null;
    templateData: BuilderTemplateData | null;
}>();
</script>


<style scoped>
.white-text {
    color: white;
    font-weight: 700;
}
</style>