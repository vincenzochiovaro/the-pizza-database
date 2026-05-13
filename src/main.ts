import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/router'
import { useLanguageStore } from './stores/LanguageStore'

import '@fortawesome/fontawesome-free/css/all.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

/* Global styles - design tokens, typography, resets */
import './styles/index.css'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

const languageStore = useLanguageStore()
const savedLanguage = localStorage.getItem("lang") ?? "en"
languageStore.currentLanguage = savedLanguage

app.mount('#app')