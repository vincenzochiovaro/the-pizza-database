<template>
    <div class="ingredients-wrapper">

        <div class="ingredients-panel">

            <div class="ingredients-group">
                <div class="group-title">{{ props.templateData?.presetIngredientsTitle ?? 'Ingredients' }}</div>

                <div class="ingredient-row">
                    <span class="ingredient-name">{{ props.templateData?.water ?? 'Water' }}</span>
                    <span class="ingredient-value">{{ props.selectedPresetData?.water ?? '0' }}g</span>
                </div>

                <div class="ingredient-row">
                    <span class="ingredient-name">{{ props.templateData?.flour ?? 'Flour' }}</span>
                    <span class="ingredient-value">{{ props.selectedPresetData?.flour ?? '0' }}g</span>
                </div>

                <div class="ingredient-row">
                    <span class="ingredient-name">{{ props.templateData?.yeast ?? 'Yeast' }}</span>
                    <span class="ingredient-value">{{ props.selectedPresetData?.yeast ?? '0' }}g</span>
                </div>

                <div v-if="props.selectedPreset !== 'Biga'" class="ingredient-row">
                    <span class="ingredient-name">{{ props.templateData?.salt ?? 'Salt' }}</span>
                    <span class="ingredient-value">{{ props.selectedPresetData?.salt ?? '0' }}g</span>
                </div>
            </div>

            <div v-if="props.selectedPreset === 'Biga'" class="ingredients-group">
                <div class="group-title">Preferment (Day 2)</div>

                <div class="ingredient-row">
                    <span class="ingredient-name">{{ props.templateData?.saltDay2 ?? 'Salt' }}</span>
                    <span class="ingredient-value">{{ props.selectedPresetData?.saltDay2 ?? '0' }}g</span>
                </div>

                <div class="ingredient-row">
                    <span class="ingredient-name">{{ props.templateData?.flourDay2 ?? 'Flour' }}</span>
                    <span class="ingredient-value">{{ props.selectedPresetData?.flourDay2 ?? '0' }}g</span>
                </div>

                <div class="ingredient-row">
                    <span class="ingredient-name">{{ props.templateData?.waterDay2 ?? 'Water' }}</span>
                    <span class="ingredient-value">{{ props.selectedPresetData?.waterDay2 ?? '0' }}g</span>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import type { DoughIngredients } from '../../models/Builder';
import type { BuilderTemplateData } from '../../i18n/models/builderTemplateModel';

const props = defineProps<{
    selectedPresetData: DoughIngredients | null
    templateData: BuilderTemplateData | null
    selectedPreset: 'Direct' | 'Biga' | 'Express' | null;
}>()
</script>

<style scoped>
.ingredients-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    margin-top: -1.5rem;
}

.ingredients-panel {
    width: 100%;
    max-width: 720px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.ingredients-group {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 1rem;
    padding: 0.75rem 1rem;
}

.group-title {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 0.5rem;
}

.ingredient-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.4rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.ingredient-row:last-child {
    border-bottom: none;
}

.ingredient-name {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.75);
}

.ingredient-value {
    font-size: 0.85rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.95);
    font-family: 'JetBrains Mono', monospace;
}
</style>