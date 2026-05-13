<template>
    <div class="video-container">
        <div class="video-placeholder">
            <div class="video-thumbnail">
                <div class="play-button">▶</div>
                <div class="video-duration">5:32</div>
            </div>
            <div class="video-info">
                <div class="video-title">Pizza Dough Preparation Tutorial </div>
                <div class="video-meta">AVAILABLE SOON</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.video-container {
    padding: var(--spacing-xl);
    display: flex;
    justify-content: center;
}

.video-placeholder {
    background: var(--color-overlay-glass);
    border: 1px solid rgba(201, 151, 58, 0.18);
    border-radius: var(--radius-card);
    overflow: hidden;
    max-width: 560px;
    width: 100%;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(6px);
    transition: transform 0.35s cubic-bezier(.22, .68, 0, 1.2), box-shadow var(--transition-base);
}

.video-placeholder:hover {
    transform: translateY(-6px) scale(1.01);
    box-shadow: 0 18px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(201, 151, 58, 0.3);
}

.video-thumbnail {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.play-button {
    font-size: 4rem;
    color: var(--color-text-secondary-emphasis);
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
    transition: transform var(--transition-fast);
}

.video-thumbnail:hover .play-button {
    transform: scale(1.1);
}

.video-duration {
    position: absolute;
    bottom: 8px;
    right: 8px;
    background: rgba(0, 0, 0, 0.8);
    color: var(--color-text-primary);
    padding: 2px 6px;
    border-radius: var(--radius-md);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
}

.video-info {
    padding: var(--spacing-md) var(--spacing-lg);
}

.video-title {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    margin-bottom: 4px;
    line-height: var(--line-height-tight);
}

.video-meta {
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
    font-weight: var(--font-weight-regular);
}

@media (max-width: 640px) {
    .video-container {
        padding: var(--spacing-md);
    }

    .video-placeholder {
        border-radius: 18px;
    }

    .play-button {
        font-size: 3rem;
    }

    .video-title {
        font-size: var(--font-size-md);
    }

    .video-meta {
        font-size: var(--font-size-sm);
    }
}
</style>