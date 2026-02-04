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
import { ref, onMounted } from 'vue'

const homeImgSrc = homeImg

const router = useRouter()

function goToPizzaBrowser() {
  router.push('/pizza-browser')
}

function goToHome() {
  router.push('/')
}

const currentLanguage = ref<string>("en")

onMounted(() => {
  currentLanguage.value = localStorage.getItem("lang") ?? "en"
  useLanguageStore().currentLanguage = currentLanguage.value
})

function UpdateLocalStorageLang(selectedLanguage: string) {
  currentLanguage.value = selectedLanguage
  localStorage.setItem('lang', selectedLanguage)
  useLanguageStore().currentLanguage = selectedLanguage
  window.location.reload()
}

</script>

<style scoped>
.navbar {
  background-color: #fafaf8;
  border-bottom: 2px solid #A8C89E;
  position: sticky;
  top: 0;
  z-index: 1030;
  box-shadow: 0 2px 8px rgba(45, 80, 22, 0.08);
  padding: 1rem 0;
}

.logo-section {
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
  -webkit-user-select: none;
  gap: 1rem;
}

.logo-section:hover {
  opacity: 0.85;
}

.logo-title {
  font-size: 1rem;
  color: #2D5016;
  letter-spacing: 0.3px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
}

.logo-img {
  height: 45px;
  width: auto;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.logo-section:hover .logo-img {
  transform: scale(1.05);
}

.logo-divider {
  width: 2px;
  height: 40px;
  background: linear-gradient(to bottom, rgba(45, 80, 22, 0.3), rgba(168, 200, 158, 0.2));
  border-radius: 1px;
}

.logo-text {
  line-height: 1.1;
  display: flex;
  flex-direction: column;
}

.logo-text .text-primary {
  font-size: 1rem;
  color: #2D5016;
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
  background: linear-gradient(135deg, #C85A2C 0%, #D67A3C 100%);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 3px 10px rgba(200, 90, 44, 0.25);
  letter-spacing: 0.3px;
}

.create-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(200, 90, 44, 0.4);
  background: linear-gradient(135deg, #D67A3C 0%, #E5894D 100%);
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
  background: rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.create-btn:hover .create-icon {
  background: rgba(255, 255, 255, 0.4);
  transform: scale(1.08);
}

.create-icon-fa {
  font-size: 0.95rem;
  color: white;
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
  background: rgba(168, 200, 158, 0.1);
  padding: 0.3rem 0.35rem;
  border-radius: 7px;
  border: 1px solid rgba(168, 200, 158, 0.4);
  align-items: center;
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
  background: rgba(168, 200, 158, 0.25);
}

.lang-btn.active {
  background: linear-gradient(135deg, #A8C89E 0%, #90B086 100%);
  box-shadow: 0 2px 6px rgba(45, 80, 22, 0.15);
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
  color: #2D5016;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  line-height: 1;
}

.lang-btn.active .lang-code {
  color: white;
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
  .logo-text .text-primary {
    font-size: 0.9rem;
  }

  .create-btn {
    padding: 0.55rem 0.8rem;
    gap: 0.4rem;
  }

  .create-icon {
    width: 24px;
    height: 24px;
  }

  .create-icon-fa {
    font-size: 0.75rem;
  }

  .create-text {
    font-size: 0.8rem;
  }

  .language-switcher {
    padding: 0.2rem 0.25rem;
    gap: 0.35rem;
  }

  .lang-btn {
    padding: 0.15rem 0.25rem;
    gap: 0.08rem;
  }

  .flag {
    font-size: 0.95rem;
  }

  .lang-code {
    font-size: 0.5rem;
  }
}
</style>