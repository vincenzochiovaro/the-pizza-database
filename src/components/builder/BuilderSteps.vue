<template>
    <div class="white-text">
        <h1>{{ props.templateData?.stepsTitle }}</h1>
        <p>{{ props.templateData?.step1 }}</p>
        <!-- image 1 placeholder -->
        <img src="/src/assets/builderimages/step1.jpg" alt="Step 1">
        <p>{{ props.templateData?.step2 }}</p>
        <!-- image 2 placeholder -->
        <img src="/src/assets/builderimages/step1.jpg" alt="Step 2">
        <p>{{ props.templateData?.step3 }}</p>
        <!-- image 3 placeholder -->
        <img src="/src/assets/builderimages/step1.jpg" alt="Step 3">
    </div>
</template>

<script setup lang="ts">
import type { BuilderTemplateData } from '../../models/Builder';

const props = defineProps<{
    templateData: BuilderTemplateData | null;
}>();
</script>


<style scoped>
.white-text {
    color: white;
    font-weight: 700;
}
</style>