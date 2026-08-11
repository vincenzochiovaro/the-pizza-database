import { createRouter, createWebHistory } from 'vue-router'
import PizzaBrowser from '../views/PizzaBrowser.vue'
import BuilderBrowser from '../views/BuilderBrowser.vue'
import HomePage from '../views/HomePage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/builder-browser', component: BuilderBrowser },
  { path: '/pizza-browser', component: PizzaBrowser }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router