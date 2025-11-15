import { createRouter, createWebHistory } from 'vue-router'
import placeholdercomp from '../components/placeholdercomp.vue'

const routes = [
  { path: '/', component: placeholdercomp },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router