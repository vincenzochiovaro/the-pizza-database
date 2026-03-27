<template>
    <div class="presets-container">
        <button @click="selectPreset('Direct')" class="preset-btn" :class="{ active: selectedPreset === 'Direct' }">
            <div class="preset-title">{{ props.templateData?.preset1 }}</div>
            <div class="preset-subtitle">{{ props.templateData?.preset1Description }}</div>
        </button>

        <button @click="selectPreset('Biga')" class="preset-btn" :class="{ active: selectedPreset === 'Biga' }">
            <div class="preset-title">{{ props.templateData?.preset2 }}</div>
            <div class="preset-subtitle">{{ props.templateData?.preset2Description }}</div>
        </button>

        <button @click="selectPreset('Express')" class="preset-btn" :class="{ active: selectedPreset === 'Express' }">
            <div class="preset-title">{{ props.templateData?.preset3 }}</div>
            <div class="preset-subtitle">{{ props.templateData?.preset3Description }}</div>
        </button>
    </div>

    <div class="dough-config container">
        <div class="row w-100 text-center">
            <div class="col-6">
                <label class="text-white small">{{ props.templateData?.doughBallCountLabel }}</label>
                <div class="input-group">
                    <button class="btn btn-outline-light" @click="decreaseDoughBalls">-</button>
                    <input class="form-control text-center" type="text" :value="doughBallCount" readonly />
                    <button class="btn btn-outline-light" @click="increaseDoughBalls">+</button>
                </div>
            </div>

            <div class="col-6">
                <label class="text-white small">{{ props.templateData?.doughBallWeightLabel }}</label>
                <div class="input-group">
                    <button class="btn btn-outline-light" @click="decreaseWeight">-</button>
                    <input class="form-control text-center" type="text" :value="doughBallWeight" readonly />
                    <button class="btn btn-outline-light" @click="increaseWeight">+</button>
                </div>
            </div>

            <div class="col-6 mt-3">
                <label class="text-white small">{{ props.templateData?.hydrationLabel }}</label>
                <div class="input-group">
                    <button class="btn btn-outline-light" @click="decreaseHydration">-</button>
                    <input class="form-control text-center" type="text" :value="hydration" readonly />
                    <button class="btn btn-outline-light" @click="increaseHydration">+</button>
                </div>
            </div>
            <div class="col-6 mt-3">
                <label class="text-white small">{{ props.templateData?.prefermentLabel }}</label>
                <div class="input-group">
                    <button class="btn btn-outline-light" @click="decreasePreferment"
                        :disabled="selectedPreset !== 'Biga'">-</button>
                    <input class="form-control text-center" type="text"
                        :value="selectedPreset === 'Biga' ? preferment : 'N/A'" readonly />
                    <button class="btn btn-outline-light" @click="increasePreferment"
                        :disabled="selectedPreset !== 'Biga'">+</button>
                </div>
            </div>
        </div>
    </div>

    <div class="temperature-card">
        <div class="temperature-header">
            <span>{{ props.templateData?.temperatureLabel || 'Temperature' }}</span>
        </div>

        <div class="temperature-display">
            <span class="temp-value">{{ temperature }}</span>
            <span class="temp-unit">°C</span>
        </div>

        <div class="temperature-controls">
            <button class="temp-btn small" @click="decreaseTemperature">−</button>
            <input type="range" min="0" max="35" :value="temperature"
                @input="(e: any) => { temperature = parseInt(e.target.value); emitBuilderChanged(); }" />
            <button class="temp-btn small" @click="increaseTemperature">+</button>
        </div>
    </div>

</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue';
import type { BuilderTemplateData } from '../../i18n/models/builderTemplateModel';

let debounceTimer: ReturnType<typeof setTimeout> | null = null

const selectedPreset = ref('Direct')
const doughBallCount = ref(6)
const doughBallWeight = ref(260)
const hydration = ref(65)
const preferment = ref(80)
const temperature = ref(18)

const props = defineProps<{
    templateData: BuilderTemplateData | null
}>()


interface BuilderData {
    preset: 'Direct' | 'Biga' | 'Express';
    doughBallCount: number;
    doughBallWeight: number;
    hydration: number;
    preferment: number | null;
    temperature: number;
}

const emit = defineEmits<{
    (e: 'builder-changed', data: BuilderData): void;
}>();

const emitBuilderChanged = () => {
    if (debounceTimer) clearTimeout(debounceTimer)

    debounceTimer = setTimeout(() => {
        emit('builder-changed', {
            preset: selectedPreset.value as 'Direct' | 'Biga' | 'Express',
            doughBallCount: doughBallCount.value,
            doughBallWeight: doughBallWeight.value,
            hydration: hydration.value,
            preferment: selectedPreset.value === 'Biga' ? preferment.value : null,
            temperature: temperature.value
        })
    }, 500)
}

const selectPreset = (preset: string) => {
    selectedPreset.value = preset

    if (preset === 'Biga') {
        preferment.value = 80
    }

    emitBuilderChanged()
}

const increaseDoughBalls = () => {
    if (doughBallCount.value < 20) {
        doughBallCount.value++
        emitBuilderChanged()
    }
}

const decreaseDoughBalls = () => {
    if (doughBallCount.value > 1) {
        doughBallCount.value--
        emitBuilderChanged()
    }
}

const increaseWeight = () => {
    if (doughBallWeight.value < 800) {
        doughBallWeight.value += 10
        emitBuilderChanged()
    }
}

const decreaseWeight = () => {
    if (doughBallWeight.value > 100) {
        doughBallWeight.value -= 10
        emitBuilderChanged()
    }
}

const increaseHydration = () => {
    if (hydration.value < 100) {
        hydration.value++
        emitBuilderChanged()
    }
}

const decreaseHydration = () => {
    if (hydration.value > 40) {
        hydration.value--
        emitBuilderChanged()
    }
}

const increasePreferment = () => {
    if (selectedPreset.value !== 'Biga') return

    if (preferment.value < 100) {
        preferment.value += 5
        emitBuilderChanged()
    }
}

const decreasePreferment = () => {
    if (selectedPreset.value !== 'Biga') return

    if (preferment.value > 5) {
        preferment.value -= 5
        emitBuilderChanged()
    }
}

const increaseTemperature = () => {
    if (temperature.value < 35) {
        temperature.value++
        emitBuilderChanged()
    }
}

const decreaseTemperature = () => {
    if (temperature.value > 0) {
        temperature.value--
        emitBuilderChanged()
    }
}

onMounted(() => {
    emitBuilderChanged()
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

.dough-config {
    margin-top: 1rem;
    max-width: 420px;
    display: flex;
    justify-content: center;
}

.dough-config .input-group {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 0.8rem;
    overflow: hidden;
}

.dough-config input {
    background: transparent;
    border: none;
    color: white;
    font-weight: 600;
}

.dough-config input:focus {
    box-shadow: none;
}

.dough-config .btn {
    border: none;
    width: 44px;
    font-weight: 700;
}

.dough-config label {
    margin-bottom: 0.35rem;
    display: block;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 500;
}

.temperature-card {
    margin-top: 0.75rem;
    padding: 0.4rem 0.65rem;
    border-radius: 1rem;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
    backdrop-filter: blur(10px);
    max-width: 320px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
}

.temperature-header {
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.6);
    text-transform: uppercase;
    letter-spacing: 0.4px;
    margin: 0;
}

.temperature-display {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 0.15rem;
    min-width: 50px;
}

.temp-value {
    font-size: 1.2rem;
    font-weight: 700;
    color: #ffffff;
}

.temp-unit {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.6);
}

.temperature-controls {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    width: 140px;
    flex: unset;
}

.temperature-controls input[type="range"] {
    width: 100px;
    height: 3px;
    flex: none;
}

.temp-btn {
    width: 40px;
    height: 25px;
    border-radius: 20%;
    border: none;
    background: rgba(255, 255, 255, 0.08);
    color: white;
    font-weight: 700;
    font-size: 0.9rem;
}
</style>