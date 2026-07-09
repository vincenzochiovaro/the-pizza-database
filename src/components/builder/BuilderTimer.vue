<template>
    <div class="timer-wrapper">
        <div class="schedule-card">
            <div class="timer-content">
                <div class="timer-image-section">
                    <img src="../../assets/pizza-default-img.jpg" alt="Pizza" class="timer-image" />
                </div>
                <div class="timer-info-section">
                    <div class="timer-header">
                        <h4 class="timer-title">{{ props.templateData?.timerCardTitle ?? 'Zero Stress Pizza' }}</h4>
                        <p class="timer-subtitle">{{ props.templateData?.timerCardSubtitle }}</p>
                    </div>
                    <p class="timer-description">
                        {{ props.templateData?.timerCardDescription }}
                    </p>
                    <button class="timer-action-btn" type="button" @click="openModal">
                        <span class="btn-icon">⏱️</span>
                        <span class="btn-text">{{ props.templateData?.readyByScheduleButton ?? 'Set Timer' }}</span>
                    </button>
                </div>
            </div>
        </div>

        <div v-if="notification.visible" :class="['toast-message', notification.type]">
            {{ notification.message }}
        </div>

        <teleport to="body">
            <div v-if="open" class="modal-overlay" @click.self="close"></div>
            <div v-if="open" class="modal-wrap" role="dialog" aria-modal="true" aria-labelledby="schedule-modal-title">
                <div class="modal-card">
                    <button class="close-btn" type="button" @click="close">×</button>
                    <h3 id="schedule-modal-title">{{ props.templateData?.readyByScheduleTitle ?? 'Schedule Your Pizza'
                        }}</h3>
                    <p class="modal-copy">{{ props.templateData?.readyByModalDescription ??
                        'Pick the time you want your pizza to be ready' }}</p>

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
                        <option disabled value="">{{ props.templateData?.readyByTimePlaceholder ?? 'Choose time' }}
                        </option>
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
import { useLanguageStore } from '../../stores/LanguageStore';
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
const selectedTime = ref('');
const email = ref('');
const isSubmitting = ref(false);
const notification = ref({ visible: false, message: '', type: 'success' as 'success' | 'error' });
let timerId: number | null = null;
let notificationTimerId: number | null = null;

const languageStore = useLanguageStore();
const locale = computed(() => languageStore.currentLanguage === 'it' ? 'it-IT' : 'en-US');

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
        const label = date.toLocaleDateString(locale.value, { weekday: 'short', month: 'short', day: 'numeric' });
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

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const canSend = computed(() => {
    return (
        props.selectedPreset !== null &&
        selectedDate.value.length > 0 &&
        selectedTime.value !== '' &&
        emailPattern.test(email.value)
    );
});

const ensureValidSchedule = () => {
    if (selectedDate.value < minDate.value) {
        selectedDate.value = minDate.value;
    }

    if (selectedDate.value === minDate.value && selectedTime.value && selectedTime.value < minTime.value) {
        selectedTime.value = minTime.value;
    }
};

watch([selectedDate, minDate, minTime], ensureValidSchedule, { immediate: true });

const resetFields = () => {
    now.value = new Date();
    selectedDate.value = minDate.value;
    selectedTime.value = '';
    email.value = '';
};

const clearTimer = () => {
    if (timerId !== null) {
        window.clearInterval(timerId);
        timerId = null;
    }
};

const clearNotification = () => {
    if (notificationTimerId !== null) {
        window.clearTimeout(notificationTimerId);
        notificationTimerId = null;
    }
    notification.value.visible = false;
};

const showNotification = (message: string, type: 'success' | 'error') => {
    clearNotification();
    notification.value = { visible: true, message, type };
    notificationTimerId = window.setTimeout(() => {
        notification.value.visible = false;
        notificationTimerId = null;
    }, 4000);
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
        await SubmitScheduleRequestAsync(
            selectedDate.value,
            selectedTime.value,
            email.value,
            props.selectedPreset,
            languageStore.currentLanguage
        );
        showNotification(props.templateData?.readyBySuccessMessage ?? 'Request sent successfully!', 'success');
    } catch (error) {
        console.error('Failed to submit schedule request:', error);
        showNotification(props.templateData?.readyByFailureMessage ?? 'Failed to send request. Please try again.', 'error');
    } finally {
        isSubmitting.value = false;
    }
};

onBeforeUnmount(() => {
    clearTimer();
    clearNotification();
});
</script>

<style scoped>
.timer-wrapper {
    width: 100%;
    padding: 1rem;
    display: flex;
    justify-content: center;
}

.schedule-card {
    width: 100%;
    max-width: 400px;
    padding: 0;
    background: linear-gradient(135deg, rgba(100, 200, 255, 0.06) 0%, rgba(100, 150, 255, 0.03) 100%);
    border: 1.5px solid rgba(100, 200, 255, 0.2);
    border-radius: 1.2rem;
    backdrop-filter: blur(15px);
    overflow: hidden;
    transition: all var(--transition-base);
    box-shadow: 0 8px 32px rgba(100, 200, 255, 0.08);
}

.schedule-card:hover {
    border-color: rgba(100, 200, 255, 0.35);
    background: linear-gradient(135deg, rgba(100, 200, 255, 0.1) 0%, rgba(100, 150, 255, 0.05) 100%);
    box-shadow: 0 12px 48px rgba(100, 200, 255, 0.12);
    transform: translateY(-2px);
}

.timer-content {
    display: flex;
    flex-direction: column;
    gap: 0;
}

.timer-image-section {
    width: 100%;
    height: 140px;
    overflow: hidden;
    background: linear-gradient(180deg, rgba(100, 200, 255, 0.1), rgba(100, 200, 255, 0.05));
    position: relative;
}

.timer-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.85;
    transition: all 0.3s ease;
}

.schedule-card:hover .timer-image {
    opacity: 1;
    transform: scale(1.02);
}

.timer-info-section {
    padding: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
}

.timer-header {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}

.timer-title {
    margin: 0;
    font-size: 1.05rem;
    font-weight: var(--font-weight-bold);
    background: linear-gradient(135deg, rgba(100, 200, 255, 0.95), rgba(100, 200, 255, 0.8));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.3px;
}

.timer-subtitle {
    margin: 0;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.55);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: var(--font-weight-semibold);
}

.timer-description {
    margin: 0;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.5;
    letter-spacing: 0.3px;
}

.timer-action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    padding: 0.8rem 1rem;
    border: none;
    border-radius: 0.8rem;
    background: linear-gradient(135deg, rgba(100, 200, 255, 0.25), rgba(100, 200, 255, 0.15));
    border: 1px solid rgba(100, 200, 255, 0.4);
    color: rgb(100, 200, 255);
    font-weight: var(--font-weight-semibold);
    font-size: 0.85rem;
    cursor: pointer;
    transition: all var(--transition-fast);
    text-transform: uppercase;
    letter-spacing: 0.06em;
}

.timer-action-btn:hover {
    background: linear-gradient(135deg, rgba(100, 200, 255, 0.35), rgba(100, 200, 255, 0.25));
    border-color: rgba(100, 200, 255, 0.6);
    box-shadow: 0 6px 20px rgba(100, 200, 255, 0.2);
    transform: translateY(-2px);
}

.timer-action-btn:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(100, 200, 255, 0.1);
}

.btn-icon {
    font-size: 1rem;
}

.btn-text {
    font-weight: var(--font-weight-bold);
}

.toast-message {
    margin-top: 1rem;
    padding: 0.85rem 1rem;
    border-radius: var(--radius-lg);
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.08);
    color: var(--color-text-primary);
    font-size: 0.92rem;
}

.toast-message.success {
    background: rgba(56, 203, 99, 0.14);
    border-color: rgba(56, 203, 99, 0.28);
    color: #d4ffe0;
}

.toast-message.error {
    background: rgba(255, 82, 82, 0.14);
    border-color: rgba(255, 82, 82, 0.28);
    color: #ffd6d6;
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
    width: min(440px, 100%);
    max-height: min(95vh, 640px);
    background: rgba(10, 16, 38, 0.98);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: var(--radius-2xl);
    padding: 1.1rem 1.1rem 1rem;
    display: grid;
    gap: 0.75rem;
    position: relative;
    margin-top: 1.4rem;
    overflow-y: auto;
}

.modal-card h3 {
    margin: 0 0 0.3rem 0;
    font-size: 1.2rem;
    color: rgb(100, 200, 255);
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
    font-size: 0.95rem;
    line-height: 1.5;
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

@media (min-width: 992px) {
    .schedule-card {
        max-width: 540px;
    }

    .timer-content {
        flex-direction: row;
    }

    .timer-image-section {
        width: 33%;
        height: auto;
    }

    .timer-info-section {
        width: 67%;
        padding: 1.25rem;
        gap: 0.65rem;
    }

    .timer-title {
        font-size: 1.2rem;
    }

    .timer-subtitle {
        font-size: 0.7rem;
    }

    .timer-description {
        font-size: 0.85rem;
    }

    .timer-action-btn {
        padding: 0.7rem 0.9rem;
        font-size: 0.8rem;
    }

    .btn-icon {
        font-size: 0.9rem;
    }
}
</style>
