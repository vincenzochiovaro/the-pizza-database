<template>
    <div class="tips-card">
        <div class="tips-card-header">
            <h2>{{ props.templateData?.ovenInstructionsTitle || 'Oven Instructions for a neapolitan style pizza' }}</h2>

            <div class="tips-card-switch">
                <button type="button"
                    :class="['tips-card-toggle', selectedOven === 'home' ? 'tips-card-toggle--active' : '']"
                    @click="selectedOven = 'home'">
                    {{ props.templateData?.homeOvenLabel || 'Home oven' }} 250°
                </button>
                <button type="button"
                    :class="['tips-card-toggle', selectedOven === 'professional' ? 'tips-card-toggle--active' : '']"
                    @click="selectedOven = 'professional'">
                    {{ props.templateData?.professionalOvenLabel || 'Professional oven' }} 400°
                </button>
            </div>
        </div>
        <ol class="tips-card-list">
            <li v-for="(tip, index) in tips" :key="index">{{ tip }}</li>
        </ol>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { DoughIngredients } from '../../models/Builder.ts';
import type { BuilderTemplateData } from '../../i18n/models/builderTemplateModel.ts';
const selectedOven = ref<'home' | 'professional'>('home');

const props = defineProps<{
    selectedPresetData: DoughIngredients | null;
    templateData: BuilderTemplateData | null;
}>();


const tips = computed(() => props.selectedPresetData?.tips[selectedOven.value]);
</script>

<style scoped>
.tips-card {
    grid-column: 1 / -1;
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: var(--radius-card);
    padding: 2rem;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(6px);
    transition: transform 0.35s cubic-bezier(.22, .68, 0, 1.2), box-shadow var(--transition-base);
}

.tips-card:hover {
    transform: translateY(-6px) scale(1.01);
    box-shadow: 0 18px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(201, 151, 58, 0.3);
}

.tips-card-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.25rem;
}

.tips-card-header h2 {
    width: 100%;
    text-align: center;
    margin: 0;
}

.tips-card-switch {
    display: flex;
    flex-wrap: nowrap;
    gap: 0.75rem;
    width: 100%;
}

.tips-card-toggle {
    flex: 1 1 0;
    min-width: 0;
    width: 0;
    box-sizing: border-box;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.04);
    color: var(--color-text-primary);
    padding: 0.85rem 1rem;
    border-radius: 999px;
    font-size: 0.9rem;
    font-weight: var(--font-weight-medium);
    cursor: pointer;
    white-space: normal;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
}

.tips-card-toggle:hover,
.tips-card-toggle--active {
    background: rgba(100, 200, 255, 0.14);
    border-color: var(--color-primary);
}

.tips-card-toggle--active {
    color: var(--color-primary);
}


.tips-card-list {
    margin: 0;
    padding-left: 1.3rem;
    color: var(--color-text-secondary);
    display: grid;
    gap: 1rem;
    list-style-type: decimal;
}

.tips-card-list li {
    margin: 0;
    font-size: 0.97rem;
    line-height: 1.75;
}

@media (max-width: 720px) {
    .tips-card {
        padding: 1.25rem;
    }

    .tips-card-switch {
        gap: 0.5rem;
    }

    .tips-card-toggle {
        padding: 0.75rem 0.85rem;
        font-size: 0.88rem;
    }

    .tips-card-list {
        padding-left: 1rem;
    }
}
</style>