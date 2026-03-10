<template>
    <div class="ingredients-display">
        <h2 class="ingredients-title">
            <span class="icon">🍕</span> Dough Formula
        </h2>

        <div class="ingredients-grid">
            <div class="ingredient-card water">
                <div class="ingredient-icon">💧</div>
                <div class="ingredient-name">Water</div>
                <div class="ingredient-value">{{ props.selectedPresetData?.water ?? '-' }}g</div>
            </div>

            <div class="ingredient-card flour">
                <div class="ingredient-icon">🌾</div>
                <div class="ingredient-name">Flour</div>
                <div class="ingredient-value">{{ props.selectedPresetData?.flour ?? '-' }}g</div>
            </div>

            <div class="ingredient-card yeast">
                <div class="ingredient-icon">🧪</div>
                <div class="ingredient-name">Yeast</div>
                <div class="ingredient-value">{{ props.selectedPresetData?.yeast ?? '-' }}g</div>
            </div>

            <div class="ingredient-card salt">
                <div class="ingredient-icon">✨</div>
                <div class="ingredient-name">Salt</div>
                <div class="ingredient-value">{{ props.selectedPresetData?.salt ?? '-' }}g</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { DoughIngredients } from '../../models/Builder';

const props = defineProps<{
    selectedPresetData: DoughIngredients | null
}>()
</script>

<style scoped>
.ingredients-display {
    margin-top: 2rem;
}

.ingredients-title {
    font-size: 2rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    letter-spacing: -0.5px;
}

.icon {
    font-size: 2.5rem;
    animation: float 3s ease-in-out infinite;
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-10px);
    }
}

.ingredients-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
}

.ingredient-card {
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    padding: 1.25rem 1rem;
    text-align: center;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    cursor: default;
    position: relative;
    overflow: hidden;
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
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.ingredient-card.water {
    border-color: rgba(100, 200, 255, 0.3);
}

.ingredient-card.water:hover {
    background: rgba(100, 200, 255, 0.1);
    border-color: rgba(100, 200, 255, 0.6);
}

.ingredient-card.flour {
    border-color: rgba(255, 200, 100, 0.3);
}

.ingredient-card.flour:hover {
    background: rgba(255, 200, 100, 0.1);
    border-color: rgba(255, 200, 100, 0.6);
}

.ingredient-card.yeast {
    border-color: rgba(200, 100, 255, 0.3);
}

.ingredient-card.yeast:hover {
    background: rgba(200, 100, 255, 0.1);
    border-color: rgba(200, 100, 255, 0.6);
}

.ingredient-card.salt {
    border-color: rgba(100, 255, 200, 0.3);
}

.ingredient-card.salt:hover {
    background: rgba(100, 255, 200, 0.1);
    border-color: rgba(100, 255, 200, 0.6);
}

.ingredient-icon {
    font-size: 2.5rem;
    margin-bottom: 0.75rem;
    animation: bounce 2s infinite;
}

.ingredient-card.water .ingredient-icon {
    animation: wave 2s infinite;
}

@keyframes bounce {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}

@keyframes wave {

    0%,
    100% {
        transform: translateY(0) rotateZ(0deg);
    }

    25% {
        transform: translateY(-5px) rotateZ(-5deg);
    }

    75% {
        transform: translateY(-5px) rotateZ(5deg);
    }
}

.ingredient-name {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.ingredient-value {
    font-size: 1.5rem;
    font-weight: 800;
    color: #ffffff;
    font-family: 'JetBrains Mono', 'Monaco', monospace;
}

/* Responsive design */
@media (max-width: 768px) {
    .ingredients-grid {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
    }

    .ingredients-title {
        font-size: 1.5rem;
    }

    .ingredient-card {
        padding: 1rem 0.8rem;
    }

    .ingredient-icon {
        font-size: 2rem;
    }

    .ingredient-value {
        font-size: 1.2rem;
    }
}
</style>