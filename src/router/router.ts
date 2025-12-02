import { createRouter, createWebHistory } from 'vue-router'
import PizzaBrowser from '../components/PizzaBrowser.vue'

const routes = [
  { path: '/', component: PizzaBrowser }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router