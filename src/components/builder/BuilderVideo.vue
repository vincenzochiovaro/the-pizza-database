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
    padding: 24px;
    display: flex;
    justify-content: center;
}

.video-placeholder {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(201, 151, 58, 0.18);
    border-radius: 20px;
    overflow: hidden;
    max-width: 560px;
    width: 100%;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(6px);
    transition: transform 0.35s cubic-bezier(.22, .68, 0, 1.2), box-shadow 0.35s ease;
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
    color: rgba(255, 255, 255, 0.9);
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
    transition: transform 0.2s ease;
}

.video-thumbnail:hover .play-button {
    transform: scale(1.1);
}

.video-duration {
    position: absolute;
    bottom: 8px;
    right: 8px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
}

.video-info {
    padding: 16px 20px;
}

.video-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #fff;
    margin-bottom: 4px;
    line-height: 1.3;
}

.video-meta {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 400;
}

@media (max-width: 640px) {
    .video-container {
        padding: 16px;
    }

    .video-placeholder {
        border-radius: 18px;
    }

    .play-button {
        font-size: 3rem;
    }

    .video-title {
        font-size: 1rem;
    }

    .video-meta {
        font-size: 0.8rem;
    }
}
</style>