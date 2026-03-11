<template>
    <div class="white-text">
        <h1>{{ props.templateData?.stepsTitle }}</h1>
        <p>{{ props.selectedPresetData?.step1 }}</p>
        <!-- image 1 placeholder -->
        <img src="/src/assets/builderimages/step1.jpg" alt="Step 1">
        <p>{{ props.selectedPresetData?.step2 }}</p>
        <!-- image 2 placeholder -->
        <img src="/src/assets/builderimages/step1.jpg" alt="Step 2">
        <p>{{ props.selectedPresetData?.step3 }}</p>
        <!-- image 3 placeholder -->
        <img src="/src/assets/builderimages/step1.jpg" alt="Step 3">
    </div>
</template>

<script setup lang="ts">
import type { BuilderTemplateData, DoughIngredients } from '../../models/Builder';

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