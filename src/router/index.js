import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChartView from '../views/ChartView.vue'
import TablesView from '../views/TablesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Головна',
      },
    },
    {
      path: '/graphics',
      name: 'graphics',
      component: ChartView,
      meta: {
        title: 'Графічне представлення',
      },
    },
    {
      path: '/tables',
      name: 'tables',
      component: TablesView,
      meta: {
        title: 'Табличне представлення',
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | ТОП-10`
  next()
})

export default router
