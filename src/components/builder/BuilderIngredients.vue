<template>
    <div class="ingredients-display">
        <div class="ingredients-row">

            <div class="ingredient-card water">
                <div class="ingredient-info">
                    <div class="ingredient-name">{{ props.templateData?.water ?? 'Water' }}</div>
                    <div class="ingredient-value">{{ props.selectedPresetData?.water ?? '0' }}g</div>
                </div>
            </div>

            <div class="ingredient-card flour">
                <div class="ingredient-info">
                    <div class="ingredient-name">{{ props.templateData?.flour ?? 'Flour' }}</div>
                    <div class="ingredient-value">{{ props.selectedPresetData?.flour ?? '00' }}g</div>
                </div>
            </div>

            <div class="ingredient-card yeast">
                <div class="ingredient-info">
                    <div class="ingredient-name">{{ props.templateData?.yeast ?? 'Yeast' }}</div>
                    <div class="ingredient-value">{{ props.selectedPresetData?.yeast ?? '000' }}g</div>
                </div>
            </div>

            <!-- Only show Day 1 salt if not biga -->
            <div v-if="props.selectedPreset !== 'Biga'" class="ingredient-card salt">
                <div class="ingredient-info">
                    <div class="ingredient-name">{{ props.templateData?.salt ?? 'Salt' }}</div>
                    <div class="ingredient-value">{{ props.selectedPresetData?.salt ?? '0000' }}g</div>
                </div>
            </div>

            <!-- Day 2 ingredients, only for biga -->
            <template v-if="props.selectedPreset === 'Biga'">
                <div class="ingredient-card salt">
                    <div class="ingredient-info">
                        <div class="ingredient-name">{{ props.templateData?.saltDay2 ?? 'Salt' }}</div>
                        <div class="ingredient-value">{{ props.selectedPresetData?.saltDay2 ?? '0000' }}g</div>
                    </div>
                </div>

                <div class="ingredient-card flour">
                    <div class="ingredient-info">
                        <div class="ingredient-name">{{ props.templateData?.flourDay2 ?? 'Flour' }}</div>
                        <div class="ingredient-value">{{ props.selectedPresetData?.flourDay2 ?? '00' }}g</div>
                    </div>
                </div>

                <div class="ingredient-card water">
                    <div class="ingredient-info">
                        <div class="ingredient-name">{{ props.templateData?.waterDay2 ?? 'Water' }}</div>
                        <div class="ingredient-value">{{ props.selectedPresetData?.waterDay2 ?? '0' }}g</div>
                    </div>
                </div>
            </template>

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
.ingredients-display {
    margin-top: -2rem;
    width: 100%;
    padding: 0.5rem 0;
    display: flex;
    justify-content: center;
}

.ingredients-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: center;
    max-width: 600px;
}

.ingredient-card {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    padding: 0.8rem 1rem;
    min-width: 120px;
    flex: 1 1 120px;
    transition: all 0.3s ease;
    cursor: default;
    position: relative;
    overflow: hidden;
    border-left: 4px solid transparent;
    justify-content: center;
    text-align: center;
}

.ingredient-card::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent);
    transform: rotate(45deg);
    animation: shimmer 3s infinite;
}

@keyframes shimmer {
    0% {
        transform: translateX(-100%) translateY(-100%) rotate(45deg);
    }

    100% {
        transform: translateX(100%) translateY(100%) rotate(45deg);
    }
}

.ingredient-card:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
}

.ingredient-card.water {
    border-color: rgba(100, 200, 255, 0.3);
    border-left-color: rgba(100, 200, 255, 0.9);
}

.ingredient-card.water:hover {
    background: rgba(100, 200, 255, 0.1);
    border-color: rgba(100, 200, 255, 0.6);
}

.ingredient-card.flour {
    border-color: rgba(255, 200, 100, 0.3);
    border-left-color: rgba(255, 200, 100, 0.9);
}

.ingredient-card.flour:hover {
    background: rgba(255, 200, 100, 0.1);
    border-color: rgba(255, 200, 100, 0.6);
}

.ingredient-card.yeast {
    border-color: rgba(200, 100, 255, 0.3);
    border-left-color: rgba(200, 100, 255, 0.9);
}

.ingredient-card.yeast:hover {
    background: rgba(200, 100, 255, 0.1);
    border-color: rgba(200, 100, 255, 0.6);
}

.ingredient-card.salt {
    border-color: rgba(100, 255, 200, 0.3);
    border-left-color: rgba(100, 255, 200, 0.9);
}

.ingredient-card.salt:hover {
    background: rgba(100, 255, 200, 0.1);
    border-color: rgba(100, 255, 200, 0.6);
}

.ingredient-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.ingredient-name {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
    margin-bottom: 0.2rem;
    text-align: center;
}

.ingredient-value {
    font-size: 1.2rem;
    font-weight: 700;
    color: #fff;
    font-family: 'JetBrains Mono', monospace;
    background: rgba(255, 255, 255, 0.08);
    padding: 0.2rem 0.5rem;
    border-radius: 0.5rem;
    text-align: center;
}

@media (max-width: 500px) {
    .ingredient-card {
        min-width: 100px;
        padding: 0.5rem 0.6rem;
    }

    .ingredient-value {
        font-size: 1rem;
    }

    .ingredient-name {
        font-size: 0.7rem;
    }
}
</style>