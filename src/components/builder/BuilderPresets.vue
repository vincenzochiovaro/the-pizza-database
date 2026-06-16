<template>

    <Teleport to="body">
        <div class="modal fade" id="infoModalDirect" tabindex="-1">
            <div class="modal-dialog modal-shift-up modal-sm">
                <div class="modal-content glass-modal">
                    <div class="modal-header border-0 pb-1">
                        <span class="modal-badge">{{ props.templateData?.preset1 }}</span>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body pt-1">{{ props.templateData?.preset1Description }}</div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="infoModalBiga" tabindex="-1">
            <div class="modal-dialog modal-shift-up modal-sm">
                <div class="modal-content glass-modal">
                    <div class="modal-header border-0 pb-1">
                        <span class="modal-badge">{{ props.templateData?.preset2 }}</span>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body pt-1">{{ props.templateData?.preset2Description }}</div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="infoModalExpress" tabindex="-1">
            <div class="modal-dialog modal-shift-up modal-sm">
                <div class="modal-content glass-modal">
                    <div class="modal-header border-0 pb-1">
                        <span class="modal-badge">{{ props.templateData?.preset3 }}</span>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body pt-1">{{ props.templateData?.preset3Description }}</div>
                </div>
            </div>
        </div>
    </Teleport>

    <div class="presets-container">
        <button @click="selectPreset('Direct')" class="preset-btn" :class="{ active: selectedPreset === 'Direct' }">
            <span class="info-icon" @click.stop="openModal('infoModalDirect')" title="About Direct">ⓘ</span>
            <div class="preset-title">{{ props.templateData?.preset1 }}</div>
        </button>

        <button @click="selectPreset('Biga')" class="preset-btn" :class="{ active: selectedPreset === 'Biga' }">
            <span class="info-icon" @click.stop="openModal('infoModalBiga')" title="About Biga">ⓘ</span>
            <div class="preset-title">{{ props.templateData?.preset2 }}</div>
        </button>

        <button @click="selectPreset('Express')" class="preset-btn" :class="{ active: selectedPreset === 'Express' }">
            <span class="info-icon" @click.stop="openModal('infoModalExpress')" title="About Express">ⓘ</span>
            <div class="preset-title">{{ props.templateData?.preset3 }}</div>
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
            <button class="temp-btn" @click="decreaseTemperature">−</button>
            <input type="range" min="0" max="35" :value="temperature"
                @input="(e: any) => { temperature = parseInt(e.target.value); emitBuilderChanged(); }" />
            <button class="temp-btn" @click="increaseTemperature">+</button>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Modal } from 'bootstrap';
import type { BuilderTemplateData } from '../../i18n/models/builderTemplateModel';

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

const openModal = (id: string) => {
    const el = document.getElementById(id)
    if (el) Modal.getOrCreateInstance(el).show()
}

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

<style scoped>
.presets-container {
    display: flex;
    gap: var(--spacing-md);
    width: 100%;
    justify-content: center;
    background: linear-gradient(135deg, var(--color-bg-dark-primary) 0%, var(--color-bg-dark-secondary) 50%, var(--color-bg-dark-primary) 100%);
    padding: var(--spacing-md);
}

.preset-btn {
    flex: 1;
    min-width: 0;
    padding: 0.6rem 0.4rem;
    background: var(--color-overlay-glass);
    border: 2px solid var(--color-border-light);
    border-radius: var(--radius-xl);
    backdrop-filter: var(--backdrop-blur);
    cursor: pointer;
    transition: all var(--transition-base);
    text-align: center;
    position: relative;
    overflow: visible;
    color: var(--color-text-primary);
    font-family: inherit;
}

.preset-btn:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}

.preset-btn.active {
    background: var(--color-primary-light);
    border-color: rgba(100, 200, 255, 0.6);
    box-shadow: 0 0 20px rgba(100, 200, 255, 0.4), inset 0 0 20px rgba(100, 200, 255, 0.1);
}

.preset-btn.active:hover {
    background: var(--color-primary-light);
    border-color: rgba(100, 200, 255, 0.8);
}

.preset-title {
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-bold);
    letter-spacing: -0.5px;
}

.info-icon {
    position: absolute;
    top: 5px;
    right: 6px;
    font-size: var(--font-size-md);
    color: var(--color-text-faint);
    cursor: pointer;
    transition: color var(--transition-fast), text-shadow var(--transition-fast);
    user-select: none;
    z-index: 2;
    line-height: 1;
}

.info-icon:hover {
    color: var(--color-accent);
    text-shadow: 0 0 8px rgba(100, 200, 255, 0.5);
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
    margin-top: 1rem;
    padding: 0.2rem 0.4rem;
    border-radius: 1rem;
    background: rgba(15, 20, 55, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(15px);
    max-width: 320px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
}

.temperature-header {
    font-size: 0.65rem;
    color: rgba(255, 255, 255, 0.72);
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

.temperature-display {
    display: flex;
    align-items: baseline;
    gap: 0.1rem;
    min-width: 42px;
}

.temp-value {
    font-size: 1rem;
    font-weight: var(--font-weight-bold);
    color: #f7fafc;
}

.temp-unit {
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.6);
}

.temperature-controls {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    width: 120px;
}

.temperature-controls input[type="range"] {
    width: 80px;
    height: 3px;
    flex: none;
}

.temp-btn {
    width: 32px;
    height: 26px;
    border-radius: 0.6rem;
    border: none;
    background: rgba(255, 255, 255, 0.08);
    color: #f7fafc;
    font-weight: var(--font-weight-semibold);
    font-size: 0.85rem;
}

@media (max-width: 768px) {
    .presets-container {
        gap: var(--spacing-md);
    }

    .preset-btn {
        padding: 0.8rem 0.6rem;
    }

    .preset-title {
        font-size: var(--font-size-sm);
    }
}
</style>