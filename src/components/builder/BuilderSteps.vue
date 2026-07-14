<template>
    <div class="steps-container">
        <div class="expandable-card">
            <button class="expandable-header" type="button" @click="togglePreparation" :aria-expanded="showPreparation">
                <span class="expandable-titles">
                    <span class="expandable-title">{{ props.templateData?.doughStepsTitle }}</span>
                </span>
                <span class="expandable-arrow" :class="{ open: showPreparation }" aria-hidden="true">
                    <!-- Arrow icon -->
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <path d="M6 9l5 5 5-5" stroke="#FFD37F" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </span>
            </button>
            <Transition name="expand">
                <div v-if="showPreparation" class="expandable-content">
                    <div class="steps-list">
                        <div v-for="(step, index) in props.selectedPresetData?.steps ?? []" :key="index"
                            class="step-card" :class="{ 'step-card--alt': index % 2 !== 0 }">
                            <div class="step-image-wrapper">
                                <img :src="getStepImage(index + 1)" :alt="`Step ${index + 1}`" class="step-image" />
                                <div class="step-image-overlay"></div>
                            </div>

                            <div class="step-content">
                                <p class="step-text">{{ step }}</p>
                            </div>
                        </div>
                    </div>
                    <button class="collapse-button" type="button" @click="togglePreparation">
                        {{ props.templateData?.doughStepsHide }}
                    </button>
                </div>
            </Transition>
        </div>
        <BuilderCookingSteps :selectedPresetData="props.selectedPresetData" :templateData="props.templateData" />
    </div>

    <div class="motto-container">
        <p class="motto-text">
            <span>Because pizza is more than just food</span>
        </p>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { DoughIngredients } from '../../models/Builder.ts';
import type { BuilderTemplateData } from '../../i18n/models/builderTemplateModel.ts';
import BuilderCookingSteps from './BuilderCookingSteps.vue';

const props = defineProps<{
    selectedPresetData: DoughIngredients | null;
    templateData: BuilderTemplateData | null;
    selectedPreset: 'Direct' | 'Biga' | 'Express' | null;
}>();

const showPreparation = ref(false);
const togglePreparation = () => {
    showPreparation.value = !showPreparation.value;
};

const getStepImage = (stepNumber: number) => {
    if (!props.selectedPreset) return '';
    try {
        return `https://github.com/vincenzochiovaro/the-pizza-database-assets/blob/main/calculator-assets/instructions-assets/${props.selectedPreset}Step${stepNumber}.jpg?raw=true`
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
    padding: 24px var(--spacing-xl) 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'DM Sans', sans-serif;
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
        padding: 20px var(--spacing-md) 48px;
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

<style scoped>
.expandable-card {
    width: 100%;
    max-width: 760px;
    background: var(--card-bg);
    border-radius: 24px;
    margin-bottom: 32px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.22);
    border: 1px solid var(--card-border);
    overflow: hidden;
    transition: box-shadow 0.3s;
}

.expandable-card:hover {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.22);
}

.expandable-header {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 20px 24px;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    transition: background 0.2s;
    font-family: inherit;
    color: inherit;
    position: relative;
    z-index: 2;
}

.expandable-header:hover {
    background: rgba(255, 255, 255, 0.03);
}

.expandable-titles {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
}

.expandable-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--color-text-primary);
    line-height: 1.2;
    margin-bottom: 0.1em;
}

.expandable-description {
    font-size: 1.03rem;
    color: var(--cream);
    opacity: 0.78;
    font-weight: 400;
    font-family: inherit;
    margin-bottom: 0;
}

.expandable-arrow {
    margin-left: 18px;
    display: flex;
    align-items: center;
    transition: transform 0.35s cubic-bezier(.22, .68, 0, 1.2);
    will-change: transform;
}

.expandable-arrow.open {
    transform: rotate(180deg);
}

.expandable-content {
    padding: 0 32px 32px 32px;
    background: none;
}

.collapse-button {
    margin: 32px auto 0;
    display: block;
    background: rgba(255, 255, 255, 0.06);
    color: var(--color-text-primary);
    font-family: inherit;
    font-size: 1.05rem;
    font-weight: 600;
    border: none;
    border-radius: 12px;
    padding: 11px 30px;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(201, 151, 58, 0.08);
    transition: background 0.18s;
}

.collapse-button:hover {
    background: rgba(255, 255, 255, 0.1);
}

/* Expand/collapse transition */
.expand-enter-active,
.expand-leave-active {
    transition: max-height 0.45s cubic-bezier(.22, .68, 0, 1.2), opacity 0.25s;
    overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
    max-height: 0;
    opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
    max-height: 800px;
    opacity: 1;
}

@media (max-width: 640px) {
    .expandable-card {
        border-radius: 18px;
        max-width: 100%;
    }

    .expandable-header {
        padding: 16px;
        gap: 13px;
    }

    .expandable-content {
        padding: 0 16px 16px;
    }

    .expandable-title {
        font-size: 1.17rem;
    }

    .expandable-description {
        font-size: 0.98rem;
    }

    .collapse-button {
        margin-top: 18px;
        font-size: 0.98rem;
        padding: 9px 20px;
        border-radius: 8px;
    }
}
</style>
