import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Detail from './views/Detail.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/location/:id',
    component: Detail,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router