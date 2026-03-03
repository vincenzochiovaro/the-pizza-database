<template>
    <ul class="list-group list-group-horizontal text-center w-100">
        <button @click="selectPreset('Option 1')" class="list-group-item flex-fill"
            :class="{ active: selectedPreset === 'Option 1' }" aria-current="true">
            <div class="fw-bold">Option 1</div>
            <small class="d-block">8h · Direct</small>
        </button>

        <button @click="selectPreset('Option 2')" class="list-group-item flex-fill"
            :class="{ active: selectedPreset === 'Option 2' }">
            <div class="fw-bold">Option 2</div>
            <small class="d-block">24h · No Knead</small>
        </button>

        <button @click="selectPreset('Option 3')" class="list-group-item flex-fill"
            :class="{ active: selectedPreset === 'Option 3' }">
            <div class="fw-bold">Option 3</div>
            <small class="d-block">24h · Biga</small>
        </button>
    </ul>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const selectedPreset = ref('Option 1')
const emit = defineEmits(['preset-clicked']);

const selectPreset = (preset: string) => {
    selectedPreset.value = preset
    emit('preset-clicked', preset)
}

onMounted(() => {
    emit('preset-clicked', 'Option 1')
})

</script>