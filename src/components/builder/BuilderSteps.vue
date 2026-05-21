<template>
    <div class="steps-container">
        <div class="steps-header">
            <h1 class="steps-title">{{ props.templateData?.stepsTitle }}</h1>
        </div>
        <div class="steps-list">
            <div v-for="(step, index) in props.selectedPresetData?.steps ?? []" :key="index" class="step-card"
                :class="{ 'step-card--alt': index % 2 !== 0 }">
                <div class="step-image-wrapper">
                    <img :src="getStepImage(index + 1)" :alt="`Step ${index + 1}`" class="step-image" />
                    <div class="step-image-overlay"></div>
                </div>

                <div class="step-content">
                    <p class="step-text">{{ step }}</p>
                </div>
            </div>
            <BuilderCookingSteps :selectedPresetData="props.selectedPresetData" />
        </div>
    </div>

    <div class="motto-container">
        <p class="motto-text">
            <span>Because pizza is more than just food</span>
        </p>
    </div>
</template>

<script setup lang="ts">
import type { DoughIngredients } from '../../models/Builder.ts';
import type { BuilderTemplateData } from '../../i18n/models/builderTemplateModel.ts';
import BuilderCookingSteps from './BuilderCookingSteps.vue';

const props = defineProps<{
    selectedPresetData: DoughIngredients | null;
    templateData: BuilderTemplateData | null;
    selectedPreset: 'Direct' | 'Biga' | 'Express' | null;
}>();


const getStepImage = (stepNumber: number) => {
    if (!props.selectedPreset) return '';
    try {
        return new URL(
            `../../assets/builderimages/${props.selectedPreset}Step${stepNumber}.jpg`,
            import.meta.url
        ).href;
    } catch (e) {
        console.warn('Step image not found:', props.selectedPreset, stepNumber);
        return '';
    }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@400;500&display=swap');

:root {
    --cream: #f5efe6;
    --warm-gold: #c9973a;
    --dark: #1a1208;
    --card-bg: rgba(255, 255, 255, 0.04);
    --card-border: rgba(201, 151, 58, 0.18);
    --radius-card: 20px;
    --radius-img: 14px;
}

.steps-container {
    color: white;
    padding: 60px var(--spacing-xl) 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'DM Sans', sans-serif;
}

.steps-header {
    text-align: center;
    margin-bottom: 52px;
}

.steps-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 5vw, 3.2rem);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
    color: var(--color-text-primary);
    margin: -1rem;
    max-width: 560px;
}

.steps-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--spacing-lg);
    width: 100%;
    max-width: 1100px;
}

.step-card {
    position: relative;
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: var(--radius-card);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.35s cubic-bezier(.22, .68, 0, 1.2), box-shadow var(--transition-base);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(6px);
}

.step-card:hover {
    transform: translateY(-6px) scale(1.01);
    box-shadow: 0 18px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(201, 151, 58, 0.3);
}

.step-image-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 1;
    overflow: hidden;
    border-radius: var(--radius-img) var(--radius-img) 0 0;
}

.step-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 40%;
    display: block;
    transition: transform 0.55s cubic-bezier(.25, .46, .45, .94);
}

.step-card:hover .step-image {
    transform: scale(1.07);
}

.step-image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 40%, rgba(10, 6, 2, 0.65) 100%);
    pointer-events: none;
}

.step-content {
    padding: 18px 20px 22px;
    flex: 1;
    display: flex;
    align-items: flex-start;
}

.step-text {
    font-size: 15px;
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-relaxed);
    color: var(--color-text-secondary-emphasis);
    margin: 0;
    letter-spacing: var(--letter-spacing-normal);
}

.step-card--alt {
    border-color: rgba(255, 255, 255, 0.08);
}

@media (max-width: 640px) {
    .steps-container {
        padding: 40px var(--spacing-md) 60px;
    }

    .steps-list {
        grid-template-columns: 1fr;
        gap: var(--spacing-lg);
    }

    .step-card {
        max-width: 100%;
        border-radius: 18px;
    }

    .step-image-wrapper {
        aspect-ratio: 4 / 1;
        border-radius: 14px 14px 0 0;
    }

    .step-text {
        font-size: 14px;
    }
}

.motto-container {
    margin-top: 60px;
    text-align: center;
}

.motto-text {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1rem, 4vw, 2rem);
    font-weight: 800;
    background: linear-gradient(90deg, #FF9A3C, #FFD37F, #FF6B00);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 8px rgba(255, 160, 80, 0.6), 0 0 15px rgba(255, 200, 120, 0.4);
    letter-spacing: var(--letter-spacing-wide);
    animation: shine 3s ease-in-out infinite;
}

@keyframes shine {

    0%,
    100% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }
}
</style>
