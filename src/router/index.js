import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/graphics',
      name: 'graphics',
      component: () => import('../views/ChartView.vue'),
    },
    {
      path: '/tables',
      name: 'tables',
      component: () => import('../views/TablesView.vue'),
    },
  ],
})

export default router
