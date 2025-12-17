<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-gradient shadow-sm">
    <div class="container-fluid d-flex justify-content-between align-items-center px-4">

      <div class="d-flex align-items-center cursor-pointer" @click="goToHome">
        <img :src="homeImgSrc" alt="Home Logo" class="me-3"
          style="height:45px; cursor:pointer; transition: transform 0.3s;">
        <div style="width:2px; height:40px; background:rgba(255,255,255,0.3); margin-right: 1rem;"></div>
        <div style="line-height:1.1;">
          <div class="text-white fw-bold" style="font-size:1.1rem;">The Pizza</div>
          <div class="text-white fw-bold" style="font-size:1.1rem;">Database</div>
        </div>
      </div>

      <div class="d-flex align-items-center">
        <button @click="goToDoughGenerator" class="create-btn">
          <div class="create-icon">
            <i class="fas fa-plus create-icon-fa"></i>
          </div>
          <span class="create-text">Create</span>
        </button>
      </div>

    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import homeImg from '../assets/homeimg.png'

const homeImgSrc = homeImg

const router = useRouter()

function goToDoughGenerator() {
  router.push('/dough-generator')
}

function goToHome() {
  router.push('/')
}
</script>

<style scoped>
nav {
  background: linear-gradient(135deg, #5a6268 0%, #495057 100%) !important;
  position: sticky;
  top: 0;
  z-index: 1030;
}

.cursor-pointer {
  cursor: pointer;
  transition: opacity 0.3s;
}

.cursor-pointer:hover {
  opacity: 0.9;
}

/* Modern Create Button */
.create-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.create-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.create-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.create-btn:hover .create-icon {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.create-icon-fa {
  font-size: 1.1rem;
  color: white;
  font-weight: 300;
}

.create-text {
  font-weight: 600;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

/* Responsive adjustments */
@media (max-width: 576px) {
  .create-btn {
    padding: 0.6rem 1rem;
    gap: 0.5rem;
  }

  .create-icon {
    width: 36px;
    height: 36px;
  }

  .create-icon-fa {
    font-size: 1rem;
  }

  .create-text {
    font-size: 0.9rem;
  }
}
</style>