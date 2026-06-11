<template>
    <div class="schedule-card">
        <div class="schedule-row">
            <div class="schedule-heading">Ready by</div>
            <button class="schedule-button" type="button" @click="open = true">Schedule</button>
        </div>

        <teleport to="body">
            <div v-if="open" class="modal-overlay" @click.self="close"></div>
            <div v-if="open" class="modal-wrap" role="dialog" aria-modal="true" aria-labelledby="schedule-modal-title">
                <div class="modal-card">
                    <button class="close-btn" type="button" @click="close">×</button>
                    <h3 id="schedule-modal-title">Ready by time</h3>
                    <p class="modal-copy">Choose date, time, and email for your pizza booking.</p>

                    <label class="field-label" for="schedule-date">Date</label>
                    <input id="schedule-date" class="field-input" type="date" :min="today" v-model="date"
                        @keydown.prevent />

                    <label class="field-label" for="schedule-time">Time</label>
                    <input id="schedule-time" class="field-input" type="time" v-model="time" @keydown.prevent />

                    <label class="field-label" for="schedule-email">Email</label>
                    <input id="schedule-email" class="field-input" type="email" placeholder="name@domain.com"
                        v-model="email" />

                    <button class="submit-btn" type="button" :disabled="!canSend" @click="submit">Send request</button>
                </div>
            </div>
        </teleport>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const today = new Date().toISOString().slice(0, 10);
const open = ref(false);
const date = ref(today);
const time = ref('18:00');
const email = ref('');

const canSend = computed(() => date.value.length > 0 && time.value.length > 0 && email.value.includes('@'));

const close = () => {
    open.value = false;
    date.value = today;
    time.value = '18:00';
    email.value = '';
};

const submit = () => {
    if (!canSend.value) return;
    close();
};
</script>

<style scoped>
.schedule-card {
    min-width: 240px;
    flex: 1 1 240px;
    padding: var(--spacing-md);
    border-radius: var(--radius-xl);
    background: var(--color-overlay-glass);
    border: 2px solid rgba(255, 255, 255, 0.1);
}

.schedule-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--spacing-sm);
}

.schedule-title {
    font-size: var(--font-size-sm);
    color: var(--color-text-primary);
    font-weight: var(--font-weight-semibold);
    white-space: nowrap;
}

.schedule-button {
    padding: 0.45rem 0.85rem;
    border: none;
    border-radius: var(--radius-lg);
    background: linear-gradient(135deg, var(--color-primary), rgba(100, 200, 255, 0.92));
    color: #fff;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    cursor: pointer;
    white-space: nowrap;
}

.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(10, 16, 38, 0.75);
    backdrop-filter: blur(8px);
    z-index: 1200;
}

.modal-wrap {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-lg);
    z-index: 1250;
}

.modal-card {
    width: min(460px, 100%);
    background: rgba(10, 16, 38, 0.98);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: var(--radius-2xl);
    padding: var(--spacing-xl);
    display: grid;
    gap: var(--spacing-md);
    position: relative;
}

.close-btn {
    position: absolute;
    right: 1rem;
    top: 1rem;
    width: 2rem;
    height: 2rem;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    font-size: 1.1rem;
    cursor: pointer;
}

.modal-copy {
    margin: 0;
    color: var(--color-text-muted);
    font-size: var(--font-size-sm);
    line-height: 1.4;
}

.field-label {
    color: var(--color-text-muted);
    font-size: var(--font-size-xs);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wide);
}

.field-input {
    width: 100%;
    padding: 0.95rem 1rem;
    border-radius: var(--radius-lg);
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.05);
    color: var(--color-text-primary);
    cursor: pointer;
}

.field-input[type="date"],
.field-input[type="time"] {
    cursor: pointer;
}

.field-input::-webkit-calendar-picker-indicator,
.field-input::-webkit-clear-button {
    filter: invert(1) contrast(1.2);
}

.field-input::-webkit-datetime-edit,
.field-input::-webkit-datetime-edit-fields-wrapper,
.field-input::-webkit-datetime-edit-text {
    color: var(--color-text-primary);
}

.field-input::-webkit-datetime-edit,
.field-input::-webkit-datetime-edit-fields-wrapper,
.field-input::-webkit-datetime-edit-text {
    color: var(--color-text-primary);
}

.field-input::-moz-focus-inner {
    border: 0;
}

.submit-btn {
    width: 100%;
    padding: 0.95rem 1rem;
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
