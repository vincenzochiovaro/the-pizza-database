<template>
    <div class="presets-container">
        <button @click="selectPreset('Direct')" class="preset-btn" :class="{ active: selectedPreset === 'Option 1' }">
            <div class="preset-title">{{ props.templateData?.preset1 }}</div>
            <div class="preset-subtitle">{{ props.templateData?.preset1Description }}</div>
        </button>

        <button @click="selectPreset('Biga')" class="preset-btn" :class="{ active: selectedPreset === 'Option 2' }">
            <div class="preset-title">{{ props.templateData?.preset2 }}</div>
            <div class="preset-subtitle">{{ props.templateData?.preset2Description }}</div>
        </button>

        <button @click="selectPreset('Express')" class="preset-btn" :class="{ active: selectedPreset === 'Option 3' }">
            <div class="preset-title">{{ props.templateData?.preset3 }}</div>
            <div class="preset-subtitle">{{ props.templateData?.preset3Description }}</div>
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { BuilderTemplateData } from '../../i18n/models/builderTemplateModel';

const selectedPreset = ref('Option 1')

const props = defineProps<{
    templateData: BuilderTemplateData | null
}>()

const emit = defineEmits(['preset-clicked']);

const selectPreset = (preset: string) => {
    selectedPreset.value = preset
    emit('preset-clicked', preset)
}

onMounted(() => {
    emit('preset-clicked', 'Direct')
})
</script>

<style scoped>
.presets-container {
    display: flex;
    gap: 1rem;
    width: 100%;
    justify-content: center;
    flex-wrap: nowrap;
    position: relative;
    background: linear-gradient(135deg, #0a0e27 0%, #1a1545 50%, #0a0e27 100%);
    padding: 1rem;
    overflow: hidden;
}

.presets-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
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

.presets-container>* {
    position: relative;
    z-index: 1;
}

.preset-btn {
    flex: 1;
    min-width: 0;
    padding: 0.75rem 0.5rem;
    background: rgba(255, 255, 255, 0.08);
    border: 2px solid rgba(255, 255, 255, 0.15);
    border-radius: 1rem;
    backdrop-filter: blur(10px);
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
    position: relative;
    overflow: hidden;
    color: #ffffff;
    font-family: inherit;
}

.preset-btn::before {
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

.preset-btn:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.preset-btn.active {
    background: rgba(100, 200, 255, 0.15);
    border-color: rgba(100, 200, 255, 0.6);
    box-shadow: 0 0 20px rgba(100, 200, 255, 0.4), inset 0 0 20px rgba(100, 200, 255, 0.1);
}

.preset-btn.active:hover {
    background: rgba(100, 200, 255, 0.2);
    border-color: rgba(100, 200, 255, 0.8);
    box-shadow: 0 0 30px rgba(100, 200, 255, 0.6), inset 0 0 20px rgba(100, 200, 255, 0.15);
}

.preset-title {
    font-size: 1rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 0.5rem;
    letter-spacing: -0.5px;
}

.preset-subtitle {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.6);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 500;
}

@media (max-width: 768px) {
    .presets-container {
        gap: 0.75rem;
    }

    .preset-btn {
        padding: 1rem 0.75rem;
    }

    .preset-title {
        font-size: 0.9rem;
    }

    .preset-subtitle {
        font-size: 0.7rem;
    }
}
</style>