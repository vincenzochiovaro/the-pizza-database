<template>
    <div class="builder-body">
        <div class="starfield"></div>

        <div class="ingredients-container">
            <BuilderIngredients :selectedPresetData="props.selectedPresetData" :templateData="props.templateData"
                :selectedPreset="props.selectedPreset" />

            <BuilderTimer :selectedPreset="props.selectedPreset" :templateData="props.templateData" />

            <BuilderVideo />

            <BuilderSteps :selectedPresetData="props.selectedPresetData" :templateData="props.templateData"
                :selectedPreset="props.selectedPreset" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { DoughIngredients } from '../../models/Builder';
import type { BuilderTemplateData } from '../../i18n/models/builderTemplateModel';
import BuilderIngredients from './BuilderIngredients.vue';
import BuilderSteps from './BuilderSteps.vue';
import BuilderTimer from './BuilderTimer.vue';
import BuilderVideo from './BuilderVideo.vue';

const props = defineProps<{
    selectedPresetData: DoughIngredients | null
    templateData: BuilderTemplateData | null
    selectedPreset: 'Direct' | 'Biga' | 'Express' | null
}>()
</script>

<style scoped>
.builder-body {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(135deg, var(--color-bg-dark-primary) 0%, var(--color-bg-dark-secondary) 50%, var(--color-bg-dark-primary) 100%);
}

.starfield {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image:
        radial-gradient(2px 2px at 20px 30px, #eee, rgba(238, 238, 238, 0)),
        radial-gradient(2px 2px at 60px 70px, #fff, rgba(255, 255, 255, 0)),
        radial-gradient(1px 1px at 50px 50px, #fff, rgba(255, 255, 255, 0)),
        radial-gradient(1px 1px at 130px 80px, #fff, rgba(255, 255, 255, 0)),
        radial-gradient(2px 2px at 90px 10px, #fff, rgba(255, 255, 255, 0));
    background-repeat: repeat;
    background-size: 200px 200px;
    animation: twinkle 5s infinite;
    z-index: 0;
}

@keyframes twinkle {

    0%,
    100% {
        opacity: 0.5;
    }

    50% {
        opacity: 1;
    }
}

.ingredients-container {
    position: relative;
    z-index: var(--z-dropdown);
    padding: var(--spacing-2xl) var(--spacing-xl);
    max-width: 1200px;
    margin: 0 auto;
}
</style>