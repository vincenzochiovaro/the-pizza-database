<template>
  <nav class="navbar">
    <div class="container-fluid d-flex justify-content-between align-items-center px-3 px-md-4">

      <button class="logo-section" type="button" @click="goToHome">
        <div class="logo-text">
          <div class="logo-title">Aliper</div>
          <div class="logo-subtitle">The Pizza Database</div>
        </div>
      </button>

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
          <span class="create-text">Menu</span>
        </button>
      </div>

    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useLanguageStore } from '../../stores/LanguageStore'
import { computed, onMounted } from 'vue'

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
  background: linear-gradient(135deg, var(--color-bg-dark-primary) 0%, var(--color-bg-dark-secondary) 50%, var(--color-bg-dark-primary) 100%);
  border-bottom: 2px solid var(--color-border-light);
  position: sticky;
  top: 0;
  z-index: var(--z-fixed);
  box-shadow: var(--shadow-lg);
  padding: var(--spacing-md) 0;
  backdrop-filter: var(--backdrop-blur);
}

.logo-section {
  cursor: pointer;
  transition: opacity var(--transition-base);
  user-select: none;
  -webkit-user-select: none;
  background: transparent;
  border: 0;
  padding: 0;
  text-align: left;
}

.logo-section:hover {
  opacity: 0.85;
}

.logo-section:active {
  opacity: 0.7;
  transform: scale(0.98);
}

.logo-section:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
  border-radius: var(--radius-sm);
}

.logo-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.1;
}

.logo-title {
  font-size: 1.05rem;
  color: var(--color-text-primary);
  letter-spacing: var(--letter-spacing-wide);
  font-family: var(--font-family-base);
  font-weight: var(--font-weight-bold);
}

.logo-subtitle {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  letter-spacing: var(--letter-spacing-wide);
  font-family: var(--font-family-base);
  font-weight: var(--font-weight-semibold);
  margin-top: 0.15rem;
}

.create-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-icon-sm);
  padding: 0.7rem 1.1rem;
  background: var(--color-primary-lighter);
  border: 2px solid var(--color-border-primary);
  border-radius: var(--radius-xl);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-base);
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-sm);
  letter-spacing: var(--letter-spacing-wide);
  backdrop-filter: var(--backdrop-blur);
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
}

.create-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  background: var(--color-primary-light);
  border-color: rgba(100, 200, 255, 0.6);
}

.create-btn:active {
  transform: translateY(0);
}

.create-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--spacing-icon-md);
  height: var(--spacing-icon-md);
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
  flex-shrink: 0;
  color: var(--color-text-primary);
  font-size: var(--font-size-md);
  background: transparent;
}

.fa-pizza-slice {
  color: var(--color-text-primary);
  font-size: var(--font-size-lg);
  opacity: 0.9;
}

.create-btn:hover .create-icon {
  transform: scale(1.1) rotate(-8deg);
  color: var(--color-accent);
}

.create-icon-fa {
  font-size: 0.95rem;
  color: var(--color-text-primary);
  font-weight: var(--font-weight-regular);
}

.create-text {
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-wide);
  white-space: nowrap;
}

.cursor-pointer {
  cursor: pointer;
  transition: opacity var(--transition-base);
}

.language-switcher {
  display: flex;
  gap: var(--spacing-sm);
  background: var(--color-overlay-glass);
  padding: 0.3rem 0.35rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border-light);
  align-items: center;
  backdrop-filter: var(--backdrop-blur);
}

.lang-btn {
  padding: 0.25rem 0.35rem;
  background: transparent;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
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
  border-radius: var(--radius-sm);
  box-shadow: 0 0 10px rgba(100, 200, 255, 0.3), var(--shadow-inner-glow);
}

.flag {
  font-size: var(--font-size-xl);
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lang-code {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-muted);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  line-height: 1;
}

.lang-btn.active .lang-code {
  color: var(--color-text-primary);
}

@media (max-width: 768px) {
  .navbar {
    padding: 0.8rem 0;
  }

  .logo-title {
    font-size: 1rem;
  }

  .logo-subtitle {
    font-size: 0.74rem;
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

  .logo-title {
    font-size: 0.95rem;
  }

  .logo-subtitle {
    font-size: 0.7rem;
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