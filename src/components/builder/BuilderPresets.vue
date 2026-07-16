<template>
    <div class="preset-selector">
        <div class="preset-header">
            <span class="preset-kicker">{{ props.templateData?.builderIntroTitle }}</span>
        </div>

        <div class="preset-options">
            <button @click="selectPreset('Direct')" class="preset-option"
                :class="{ active: selectedPreset === 'Direct' }">
                <div class="preset-option-top">
                    <span class="preset-symbol">
                        <ReusableIcon name="pizza-slice" size="1.25rem" color="#ff6b4a" />
                    </span>
                    <span class="preset-check" v-if="selectedPreset === 'Direct'">✓</span>
                </div>
                <strong>{{ props.templateData?.preset1 }}</strong>
            </button>

            <button @click="selectPreset('Biga')" class="preset-option" :class="{ active: selectedPreset === 'Biga' }">
                <div class="preset-option-top">
                    <span class="preset-symbol">
                        <ReusableIcon name="wheat" size="1.25rem" color="#7ed957" />
                    </span>
                    <span class="preset-check" v-if="selectedPreset === 'Biga'">✓</span>
                </div>
                <strong>{{ props.templateData?.preset2 }}</strong>
            </button>

            <button @click="selectPreset('Express')" class="preset-option"
                :class="{ active: selectedPreset === 'Express' }">
                <div class="preset-option-top">
                    <span class="preset-symbol">
                        <ReusableIcon name="bolt" size="1.25rem" color="#ffd43b" />
                    </span>
                    <span class="preset-check" v-if="selectedPreset === 'Express'">✓</span>
                </div>
                <strong>{{ props.templateData?.preset3 }}</strong>
            </button>
        </div>

        <transition name="fade">
            <div class="preset-explanation">
                <div class="explanation-title">
                    {{ selectedPreset === 'Direct' ? props.templateData?.preset1 : selectedPreset === 'Biga' ?
                        props.templateData?.preset2 : props.templateData?.preset3 }}
                </div>
                <p>
                    {{ selectedPreset === 'Direct' ? props.templateData?.preset1Description : selectedPreset === 'Biga'
                        ? props.templateData?.preset2Description : props.templateData?.preset3Description }}
                </p>
            </div>
        </transition>
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
        <div class="temperature-section-left">
            <div class="temperature-header">
                <span class="temp-label">{{ props.templateData?.temperatureLabel || 'Temperature' }}</span>
                <span class="temp-description">{{ props.templateData?.temperatureDescription ||
                    'Dough resting temperature' }}</span>
            </div>
            <div class="temperature-display">
                <span class="temp-value">{{ temperature }}</span>
                <span class="temp-unit">°C</span>
            </div>
        </div>
        <div class="temperature-controls">
            <button class="temp-btn" @click="decreaseTemperature" title="Decrease temperature">−</button>
            <input type="range" min="0" max="35" :value="temperature"
                @input="(e: any) => { temperature = parseInt(e.target.value); emitBuilderChanged(); }" />
            <button class="temp-btn" @click="increaseTemperature" title="Increase temperature">+</button>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { BuilderTemplateData } from '../../i18n/models/builderTemplateModel';
import ReusableIcon from '../../../src/icons/ReusableIcon.vue'

let debounceTimer: ReturnType<typeof setTimeout> | null = null

const selectedPreset = ref('Direct')
const doughBallCount = ref(6)
const doughBallWeight = ref(260)
const hydration = ref(65)
const preferment = ref(80)
const temperature = ref(18)

const props = defineProps<{ templateData: BuilderTemplateData | null }>()

interface BuilderData {
    preset: 'Direct' | 'Biga' | 'Express';
    doughBallCount: number;
    doughBallWeight: number;
    hydration: number;
    preferment: number | null;
    temperature: number;
}

const emit = defineEmits<{ (e: 'builder-changed', data: BuilderData): void; }>();


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
    if (preset === 'Biga') preferment.value = 80
    emitBuilderChanged()
}

const increaseDoughBalls = () => { if (doughBallCount.value < 20) { doughBallCount.value++; emitBuilderChanged() } }
const decreaseDoughBalls = () => { if (doughBallCount.value > 1) { doughBallCount.value--; emitBuilderChanged() } }
const increaseWeight = () => { if (doughBallWeight.value < 800) { doughBallWeight.value += 10; emitBuilderChanged() } }
const decreaseWeight = () => { if (doughBallWeight.value > 100) { doughBallWeight.value -= 10; emitBuilderChanged() } }
const increaseHydration = () => { if (hydration.value < 100) { hydration.value++; emitBuilderChanged() } }
const decreaseHydration = () => { if (hydration.value > 40) { hydration.value--; emitBuilderChanged() } }
const increasePreferment = () => { if (selectedPreset.value !== 'Biga') return; if (preferment.value < 100) { preferment.value += 5; emitBuilderChanged() } }
const decreasePreferment = () => { if (selectedPreset.value !== 'Biga') return; if (preferment.value > 5) { preferment.value -= 5; emitBuilderChanged() } }
const increaseTemperature = () => { if (temperature.value < 35) { temperature.value++; emitBuilderChanged() } }
const decreaseTemperature = () => { if (temperature.value > 0) { temperature.value--; emitBuilderChanged() } }

onMounted(() => { emitBuilderChanged() })
</script>

. . .
<style scoped>
/* --- New Preset Selector Styles --- */
.preset-selector {
    width: 70%;
    max-width: 720px;
    margin: 0 auto;
    padding: 0.75rem 1rem;
}

.preset-header {
    text-align: center;
    margin-bottom: 1rem;
}

.preset-kicker {
    font-size: .65rem;
    text-transform: uppercase;
    letter-spacing: .18em;
    color: rgba(100, 200, 255, .8);
}

.preset-header h3 {
    margin: .35rem 0 0;
    font-size: 1rem;
    color: rgba(255, 255, 255, .9);
}

.preset-options {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: .55rem;
}

.preset-option {
    min-height: 125px;
    padding: .75rem .4rem;
    border-radius: 1.25rem;
    border: 1px solid rgba(255, 255, 255, .12);
    background: rgba(255, 255, 255, .04);
    backdrop-filter: blur(14px);
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: .45rem;
    cursor: pointer;
    transition: .25s ease;
}

.preset-option strong {
    font-size: .75rem;
    letter-spacing: .08em;
    text-transform: uppercase;
}

.preset-option small {
    font-size: .65rem;
    color: rgba(255, 255, 255, .55);
}

.preset-option-top {
    position: relative;
}

.preset-symbol {
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(100, 200, 255, .08);
}

.preset-check {
    position: absolute;
    right: -8px;
    bottom: -4px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: rgb(100, 200, 255);
    color: #081225;
    font-size: .7rem;
    font-weight: bold;
}

.preset-option.active {
    border-color: rgba(100, 200, 255, .65);
    background: rgba(100, 200, 255, .12);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(100, 200, 255, .15);
}

.preset-explanation {
    margin-top: .8rem;
    padding: .9rem 1rem;
    border-radius: 1rem;
    background: linear-gradient(135deg, rgba(100, 200, 255, .1), rgba(100, 150, 255, .04));
    border: 1px solid rgba(100, 200, 255, .18);
    text-align: center;
}

.explanation-title {
    font-size: .85rem;
    font-weight: 700;
    margin-bottom: .35rem;
}

.preset-explanation p {
    margin: 0;
    font-size: .78rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, .7);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

:global(.modal-shift-up) {
    margin-top: 15vh !important;
}

:global(.glass-modal) {
    background: linear-gradient(145deg, rgba(15, 20, 55, 0.97), rgba(8, 12, 35, 0.99));
    border: 1.5px solid rgba(100, 200, 255, 0.28);
    border-radius: 1.1rem !important;
    box-shadow: 0 0 40px rgba(100, 200, 255, 0.12), 0 20px 48px rgba(0, 0, 0, 0.65);
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.88rem;
    line-height: 1.65;
}

:global(.glass-modal .modal-body) {
    color: rgba(255, 255, 255, 0.72);
    padding-top: 0.25rem;
    padding-bottom: 1.1rem;
}

.modal-badge {
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-bold);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-accent);
    background: rgba(100, 200, 255, 0.1);
    border: 1px solid rgba(100, 200, 255, 0.28);
    border-radius: 999px;
    padding: 0.18rem 0.6rem;
}

.dough-config {
    margin-top: var(--spacing-md);
    max-width: 420px;
    display: flex;
    justify-content: center;
}

.dough-config .input-group {
    background: var(--color-overlay-glass);
    border-radius: var(--radius-xl);
    overflow: hidden;
}

.dough-config input {
    background: transparent;
    border: none;
    color: white;
    font-weight: var(--font-weight-semibold);
}

.dough-config input:focus {
    box-shadow: none;
}

.dough-config .btn {
    border: none;
    width: 44px;
    font-weight: var(--font-weight-bold);
}

.dough-config label {
    margin-bottom: 0.35rem;
    display: block;
    color: var(--color-text-muted);
    font-weight: var(--font-weight-medium);
}

.temperature-card {
    margin-top: 0.6rem;
    padding: 0.3rem 0.5rem;
    border-radius: 0.8rem;
    background: linear-gradient(135deg, rgba(100, 200, 255, 0.08) 0%, rgba(100, 150, 255, 0.05) 100%);
    border: 1px solid rgba(100, 200, 255, 0.18);
    backdrop-filter: blur(15px);
    max-width: 320px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.4rem;
    box-shadow: 0 2px 8px rgba(100, 200, 255, 0.04);
    transition: all var(--transition-base);
}

.temperature-card:hover {
    border-color: rgba(100, 200, 255, 0.25);
    background: linear-gradient(135deg, rgba(100, 200, 255, 0.1) 0%, rgba(100, 150, 255, 0.06) 100%);
    box-shadow: 0 3px 12px rgba(100, 200, 255, 0.06);
}

.temperature-section-left {
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

.temperature-header {
    display: flex;
    flex-direction: column;
    gap: 0.05rem;
}

.temp-label {
    font-size: 0.65rem;
    color: rgba(100, 200, 255, 0.9);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: var(--font-weight-bold);
    line-height: 1;
}

.temp-description {
    font-size: 0.55rem;
    color: rgba(255, 255, 255, 0.45);
    letter-spacing: 0.05em;
    font-style: italic;
    line-height: 1;
}

.temperature-display {
    display: flex;
    align-items: baseline;
    gap: 0.1rem;
    background: rgba(255, 255, 255, 0.03);
    padding: 0.25rem 0.4rem;
    border-radius: 0.5rem;
    border: 0.5px solid rgba(100, 200, 255, 0.1);
    min-width: 60px;
}

.temp-value {
    font-size: 1rem;
    font-weight: var(--font-weight-bold);
    color: rgb(100, 200, 255);
    font-family: 'JetBrains Mono', monospace;
    line-height: 1;
}

.temp-unit {
    font-size: 0.6rem;
    color: rgba(255, 255, 255, 0.6);
    margin-left: 0.05rem;
    line-height: 1;
}

.temperature-controls {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    flex: 1;
    justify-content: center;
}

.temperature-controls input[type="range"] {
    width: 60px;
    height: 3px;
    flex: 0;
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
    background: linear-gradient(to right, rgba(100, 200, 255, 0.2), rgba(100, 200, 255, 0.3));
    border-radius: 999px;
    outline: none;
}

.temperature-controls input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(100, 200, 255, 0.9), rgb(100, 200, 255));
    cursor: pointer;
    box-shadow: 0 0 4px rgba(100, 200, 255, 0.3);
    transition: all 0.2s ease;
}

.temperature-controls input[type="range"]::-webkit-slider-thumb:hover {
    box-shadow: 0 0 10px rgba(100, 200, 255, 0.5);
    transform: scale(1.08);
}

.temperature-controls input[type="range"]::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(100, 200, 255, 0.9), rgb(100, 200, 255));
    cursor: pointer;
    border: none;
    box-shadow: 0 0 4px rgba(100, 200, 255, 0.3);
    transition: all 0.2s ease;
}

.temperature-controls input[type="range"]::-moz-range-thumb:hover {
    box-shadow: 0 0 10px rgba(100, 200, 255, 0.5);
    transform: scale(1.08);
}

.temp-btn {
    width: 28px;
    height: 28px;
    border-radius: 0.4rem;
    border: 1px solid rgba(100, 200, 255, 0.2);
    background: linear-gradient(135deg, rgba(100, 200, 255, 0.06), rgba(100, 200, 255, 0.02));
    color: rgb(100, 200, 255);
    font-weight: var(--font-weight-bold);
    font-size: 0.85rem;
    cursor: pointer;
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    line-height: 1;
}

.temp-btn:hover {
    background: linear-gradient(135deg, rgba(100, 200, 255, 0.15), rgba(100, 200, 255, 0.06));
    border-color: rgba(100, 200, 255, 0.4);
    box-shadow: 0 2px 6px rgba(100, 200, 255, 0.1);
    transform: translateY(-0.5px);
}

.temp-btn:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(100, 200, 255, 0.08);
}

@media (max-width: 768px) {
    .preset-selector {
        width: 100%;
        max-width: none;
    }
}
</style>