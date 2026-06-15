<template>
    <div class="schedule-card">
        <div class="schedule-row">
            <div class="schedule-heading">{{ props.templateData?.readyByTitle ?? 'Ready by' }}</div>
            <button class="schedule-button" type="button" @click="openModal">
                {{ props.templateData?.readyByScheduleButton ?? 'Schedule' }}
            </button>
        </div>

        <teleport to="body">
            <div v-if="open" class="modal-overlay" @click.self="close"></div>
            <div v-if="open" class="modal-wrap" role="dialog" aria-modal="true" aria-labelledby="schedule-modal-title">
                <div class="modal-card">
                    <button class="close-btn" type="button" @click="close">×</button>
                    <h3 id="schedule-modal-title">{{ props.templateData?.readyByModalTitle ?? 'Ready by time' }}</h3>
                    <p class="modal-copy">{{ props.templateData?.readyByModalDescription ??
                        'Choose date, time, and email for your pizza booking.' }}</p>

                    <label class="field-label">{{ props.templateData?.readyByDateLabel ?? 'Choose date' }}</label>
                    <div class="date-grid">
                        <button v-for="day in availableDates" :key="day.value" type="button" class="date-chip"
                            :class="{ selected: day.value === selectedDate, disabled: day.disabled }"
                            :disabled="day.disabled" @click="selectedDate = day.value">
                            {{ day.label }}
                        </button>
                    </div>

                    <label class="field-label" for="schedule-time">{{ props.templateData?.readyByTimeLabel ?? 'Time'
                    }}</label>
                    <select id="schedule-time" class="field-input" v-model="selectedTime">
                        <option v-for="slot in timeSlots" :key="slot.value" :value="slot.value"
                            :disabled="slot.disabled">
                            {{ slot.label }}
                        </option>
                    </select>

                    <label class="field-label" for="schedule-email">{{ props.templateData?.readyByEmailLabel ?? 'Email'
                    }}</label>
                    <input id="schedule-email" class="field-input" type="email" placeholder="name@domain.com"
                        v-model="email" />

                    <div class="preset-row">
                        <label class="field-label" for="schedule-preset">{{ props.templateData?.readyByPizzaTypeLabel ??
                            'Pizza Type' }}</label>
                        <div id="schedule-preset" class="field-preset">{{ selectedPresetLabel }}</div>
                    </div>

                    <button class="submit-btn" type="button" :disabled="!canSend || isSubmitting" @click="submit">
                        {{ props.templateData?.readyBySendButton ?? 'Send request' }}
                    </button>
                </div>
            </div>
        </teleport>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue';
import type { BuilderTemplateData } from '../../i18n/models/builderTemplateModel';
import { SubmitScheduleRequestAsync } from '../../api/BuilderApi';
import { getMinScheduleDateTime, normalizeDateInput, normalizeTimeInput } from '../../utils/scheduleHelpers';

const props = defineProps<{
    selectedPreset: 'Direct' | 'Biga' | 'Express' | null
    templateData: BuilderTemplateData | null
}>();

const open = ref(false);
const now = ref(new Date());
const minScheduleDateTime = computed(() => getMinScheduleDateTime(props.selectedPreset, now.value));
const selectedDate = ref(normalizeDateInput(minScheduleDateTime.value));
const selectedTime = ref(normalizeTimeInput(minScheduleDateTime.value));
const email = ref('');
const isSubmitting = ref(false);
let timerId: number | null = null;

const selectedPresetLabel = computed(() => {
    if (!props.selectedPreset) {
        return 'None';
    }

    return {
        Direct: props.templateData?.preset1 ?? 'Direct',
        Biga: props.templateData?.preset2 ?? 'Biga',
        Express: props.templateData?.preset3 ?? 'Express',
    }[props.selectedPreset];
});

const minDate = computed(() => normalizeDateInput(minScheduleDateTime.value));
const minTime = computed(() => normalizeTimeInput(minScheduleDateTime.value));

const availableDates = computed(() => {
    const start = new Date(now.value);
    start.setHours(0, 0, 0, 0);

    return Array.from({ length: 8 }, (_, index) => {
        const date = new Date(start);
        date.setDate(start.getDate() + index);
        const value = normalizeDateInput(date);
        const label = date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
        return {
            value,
            label,
            disabled: value < minDate.value,
        };
    });
});

const timeSlots = computed(() => {
    const slots = [] as Array<{ value: string; label: string; disabled: boolean }>;

    for (let hour = 0; hour < 24; hour += 1) {
        for (let minute = 0; minute < 60; minute += 30) {
            const candidate = new Date();
            candidate.setHours(hour, minute, 0, 0);
            const value = normalizeTimeInput(candidate);
            const disabled = selectedDate.value === minDate.value && value < minTime.value;
            slots.push({ value, label: value, disabled });
        }
    }

    return slots;
});

const canSend = computed(() => {
    return (
        props.selectedPreset !== null &&
        selectedDate.value.length > 0 &&
        selectedTime.value.length > 0 &&
        email.value.includes('@')
    );
});

const ensureValidSchedule = () => {
    if (selectedDate.value < minDate.value) {
        selectedDate.value = minDate.value;
    }

    if (selectedDate.value === minDate.value && selectedTime.value < minTime.value) {
        selectedTime.value = minTime.value;
    }
};

watch([selectedDate, minDate, minTime], ensureValidSchedule, { immediate: true });

const resetFields = () => {
    now.value = new Date();
    selectedDate.value = minDate.value;
    selectedTime.value = minTime.value;
    email.value = '';
};

const clearTimer = () => {
    if (timerId !== null) {
        window.clearInterval(timerId);
        timerId = null;
    }
};

const openModal = () => {
    open.value = true;
    resetFields();
    clearTimer();
    timerId = window.setInterval(() => {
        now.value = new Date();
    }, 60_000);
};

const close = () => {
    open.value = false;
    isSubmitting.value = false;
    resetFields();
    clearTimer();
};

const submit = async () => {
    if (!canSend.value || !props.selectedPreset || isSubmitting.value) {
        return;
    }

    isSubmitting.value = true;
    close();

    try {
        await SubmitScheduleRequestAsync(selectedDate.value, selectedTime.value, email.value, props.selectedPreset);
    } catch (error) {
        console.error('Failed to submit schedule request:', error);
    } finally {
        isSubmitting.value = false;
    }
};

onBeforeUnmount(clearTimer);
</script>

<style scoped>
.schedule-card {
    min-width: auto;
    flex: none;
    padding: 0.9rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: var(--radius-xl);
    backdrop-filter: blur(14px);
}

.schedule-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
}

.schedule-heading {
    font-size: 0.75rem;
    color: var(--color-text-primary);
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-weight: var(--font-weight-semibold);
    white-space: nowrap;
}

.schedule-button {
    padding: 0.35rem 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: var(--radius-lg);
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    font-size: 0.78rem;
    font-weight: var(--font-weight-semibold);
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.18s ease, transform 0.18s ease;
}

.schedule-button:hover {
    background: rgba(255, 255, 255, 0.14);
    transform: translateY(-1px);
}

.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(10, 16, 38, 0.85);
    backdrop-filter: blur(8px);
    z-index: 1200;
}

.modal-wrap {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 1.1rem 1rem 1rem;
    z-index: 1250;
}

.modal-card {
    margin-top: 0.7rem;
}

.modal-card {
    width: min(420px, 100%);
    background: rgba(10, 16, 38, 0.98);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: var(--radius-2xl);
    padding: 1.1rem 1.1rem 1rem;
    display: grid;
    gap: 0.85rem;
    position: relative;
    margin-top: 1.4rem;
}

.close-btn {
    position: absolute;
    right: 0.85rem;
    top: 0.85rem;
    width: 2rem;
    height: 2rem;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
}

.modal-copy {
    margin: 0;
    color: var(--color-text-muted);
    font-size: 0.9rem;
    line-height: 1.4;
}

.field-label {
    color: var(--color-text-muted);
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wide);
}

.field-input {
    width: 100%;
    padding: 0.75rem 0.9rem;
    border-radius: var(--radius-lg);
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.05);
    color: var(--color-text-primary);
}

.field-input[type="date"],
.field-input[type="time"] {
    cursor: pointer;
}

.field-input::-webkit-calendar-picker-indicator,
.field-input::-webkit-clear-button {
    filter: invert(1) brightness(2);
}

.date-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.55rem;
}

.date-chip {
    padding: 0.75rem 0.65rem;
    border-radius: var(--radius-lg);
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.04);
    color: var(--color-text-primary);
    font-size: 0.8rem;
    line-height: 1.3;
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease;
}

.date-chip.selected {
    background: rgba(100, 200, 255, 0.16);
    border-color: rgba(100, 200, 255, 0.4);
}

.date-chip.disabled {
    opacity: 0.35;
    cursor: not-allowed;
}

.field-input option:disabled {
    color: rgba(255, 255, 255, 0.5);
}

.field-input::-webkit-datetime-edit,
.field-input::-webkit-datetime-edit-fields-wrapper,
.field-input::-webkit-datetime-edit-text {
    color: #fff;
}

.field-preset {
    width: 100%;
    padding: 0.75rem 0.9rem;
    border-radius: var(--radius-lg);
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.05);
    color: var(--color-text-primary);
    display: flex;
    align-items: center;
    font-weight: var(--font-weight-semibold);
}

.preset-row {
    display: grid;
    gap: 0.35rem;
}

.field-error {
    color: #ffb3b3;
    font-size: 0.8rem;
    padding: 0.65rem 0.85rem;
    border: 1px solid rgba(255, 179, 179, 0.4);
    border-radius: var(--radius-lg);
    background: rgba(255, 51, 51, 0.08);
}

.submit-btn {
    width: 100%;
    padding: 0.85rem 0.9rem;
    border: none;
    border-radius: var(--radius-xl);
    background: linear-gradient(135deg, var(--color-primary), rgba(100, 200, 255, 0.92));
    color: #fff;
    font-weight: var(--font-weight-semibold);
}

.submit-btn:disabled {
    opacity: 0.55;
    cursor: not-allowed;
}
</style>
