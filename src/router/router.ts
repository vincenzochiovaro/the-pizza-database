import { createRouter, createWebHistory } from 'vue-router'
import PizzaBrowser from '../views/PizzaBrowser.vue'
import DoughGenerator from '../views/DoughGenerator.vue'

const routes = [
  { path: '/', component: PizzaBrowser },
  { path: '/dough-generator', component: DoughGenerator }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router