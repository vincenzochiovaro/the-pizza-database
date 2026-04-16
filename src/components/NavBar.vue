<template>
  <nav class="navbar">
    <div class="container-fluid d-flex justify-content-between align-items-center px-3 px-md-4">

      <div class="d-flex align-items-center cursor-pointer logo-section" @click="goToHome">
        <img :src="homeImgSrc" alt="Home Logo" class="logo-img" style="transition: transform 0.3s;">
        <div class="logo-divider"></div>
        <div class="logo-text">
          <div class="logo-title fw-bold">The Pizza</div>
          <div class="logo-title fw-bold">Database</div>
        </div>
      </div>

      <div class="d-flex align-items-center gap-3">
        <div class="language-switcher">
          <button @click="UpdateLocalStorageLang('it')" class="lang-btn" :class="{ active: currentLanguage === 'it' }"
            title="Italiano">
            <span class="flag">🇮🇹</span>
            <span class="lang-code">it</span>
          </button>
          <button @click="UpdateLocalStorageLang('en')" class="lang-btn" :class="{ active: currentLanguage === 'en' }"
            title="English">
            <span class="flag">🇬🇧</span>
            <span class="lang-code">en</span>
          </button>
        </div>

        <button @click="goToPizzaBrowser" class="create-btn">
          <div class="create-icon">
            <i class="fa-solid fa-pizza-slice"></i>
          </div>
          <span class="create-text">Menu</span>
        </button>
      </div>

    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import homeImg from '../assets/homeimg.png'
import { useLanguageStore } from '../stores/LanguageStore'
import { computed, onMounted } from 'vue'

const homeImgSrc = homeImg
const router = useRouter()
const languageStore = useLanguageStore()

function goToPizzaBrowser() {
  router.push('/pizza-browser')
}

function goToHome() {
  router.push('/')
}

const currentLanguage = computed(() => languageStore.currentLanguage)

onMounted(() => {
  const savedLanguage = localStorage.getItem("lang") ?? "en"
  languageStore.currentLanguage = savedLanguage
})

function UpdateLocalStorageLang(selectedLanguage: string) {
  localStorage.setItem('lang', selectedLanguage)
  languageStore.currentLanguage = selectedLanguage
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #0a0e27 0%, #1a1545 50%, #0a0e27 100%);
  border-bottom: 2px solid rgba(100, 200, 255, 0.2);
  position: sticky;
  top: 0;
  z-index: 1030;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  padding: 1rem 0;
  backdrop-filter: blur(10px);
}

.logo-section {
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
  -webkit-user-select: none;
  gap: 1rem;
}

.logo-section:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.logo-title {
  font-size: 1rem;
  color: #ffffff;
  letter-spacing: 0.3px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  font-weight: 700;
}

.logo-img {
  height: 45px;
  width: auto;
  cursor: pointer;
  transition: transform 0.3s ease;
  filter: brightness(1.2);
}

.logo-section:hover .logo-img {
  transform: scale(1.05) rotate(-2deg);
}

.logo-divider {
  width: 2px;
  height: 40px;
  background: linear-gradient(to bottom, rgba(100, 200, 255, 0.4), rgba(100, 200, 255, 0.1));
  border-radius: 1px;
}

.logo-text {
  line-height: 1.1;
  display: flex;
  flex-direction: column;
}

.logo-text .text-primary {
  font-size: 1rem;
  color: #ffffff;
  letter-spacing: 0.3px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
}

.create-btn {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.7rem 1.1rem;
  background: rgba(100, 200, 255, 0.12);
  border: 2px solid rgba(100, 200, 255, 0.3);
  border-radius: 8px;
  color: #ffffff;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(100, 200, 255, 0.15);
  letter-spacing: 0.3px;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.create-btn::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: rotate(45deg);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }

  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
}

.create-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(100, 200, 255, 0.3);
  background: rgba(100, 200, 255, 0.18);
  border-color: rgba(100, 200, 255, 0.6);
}

.create-btn:active {
  transform: translateY(0);
}

.create-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: rgba(100, 200, 255, 0.15);
  border-radius: 6px;
  transition: all 0.3s ease;
  flex-shrink: 0;
  color: #ffffff;
  font-size: 0.95rem;
}

.fa-pizza-slice {
  color: #ff9a3c;
  font-size: 1.2rem;
}

.create-btn:hover .create-icon {
  background: rgba(100, 200, 255, 0.25);
  transform: scale(1.08);
}

.create-icon-fa {
  font-size: 0.95rem;
  color: #ffffff;
  font-weight: 400;
}

.create-text {
  font-weight: 600;
  letter-spacing: 0.3px;
  white-space: nowrap;
}

.cursor-pointer {
  cursor: pointer;
  transition: opacity 0.3s;
}

.language-switcher {
  display: flex;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.08);
  padding: 0.3rem 0.35rem;
  border-radius: 7px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  align-items: center;
  backdrop-filter: blur(10px);
}

.lang-btn {
  padding: 0.25rem 0.35rem;
  background: transparent;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.15rem;
}

.lang-btn:hover {
  background: rgba(100, 200, 255, 0.15);
}

.lang-btn.active {
  background: rgba(100, 200, 255, 0.25);
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(100, 200, 255, 0.3), inset 0 0 10px rgba(100, 200, 255, 0.1);
}

.flag {
  font-size: 1.2rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lang-code {
  font-size: 0.6rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.3px;
  text-transform: uppercase;
  line-height: 1;
}

.lang-btn.active .lang-code {
  color: #ffffff;
}

@media (max-width: 768px) {
  .navbar {
    padding: 0.8rem 0;
  }

  .logo-img {
    height: 40px;
  }

  .logo-divider {
    height: 35px;
  }

  .logo-text .text-primary {
    font-size: 0.95rem;
  }

  .create-btn {
    padding: 0.6rem 0.9rem;
    gap: 0.5rem;
    font-size: 0.85rem;
  }

  .create-icon {
    width: 26px;
    height: 26px;
  }

  .create-icon-fa {
    font-size: 0.85rem;
  }

  .language-switcher {
    padding: 0.25rem 0.3rem;
    gap: 0.4rem;
  }

  .lang-btn {
    padding: 0.2rem 0.3rem;
    gap: 0.1rem;
  }

  .flag {
    font-size: 1rem;
  }

  .lang-code {
    font-size: 0.55rem;
  }
}

@media (max-width: 576px) {
  .navbar {
    padding: 0.6rem 0;
  }

  .logo-img {
    height: 36px;
  }

  .logo-divider {
    height: 30px;
  }

  .logo-title {
    font-size: 0.85rem;
  }

  .create-btn {
    padding: 0.45rem 0.7rem;
    gap: 0.3rem;
    font-size: 0.8rem;
  }

  .create-icon {
    width: 22px;
    height: 22px;
  }

  .create-icon-fa {
    font-size: 0.7rem;
  }

  .create-text {
    font-size: 0.75rem;
  }

  .language-switcher {
    padding: 0.15rem 0.2rem;
    gap: 0.25rem;
  }

  .lang-btn {
    padding: 0.12rem 0.2rem;
    gap: 0.05rem;
  }

  .flag {
    font-size: 0.85rem;
  }

  .lang-code {
    font-size: 0.45rem;
  }
}
</style>