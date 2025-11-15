import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import BootstrapVue3 from 'bootstrap-vue-3'

const app = createApp(App)
app.use(router)
app.use(BootstrapVue3)
app.mount('#app')