import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Detail from './views/Detail.vue'
import Login from './views/Login.vue'
import Registro from './views/Registro.vue'
import Favoritos from './views/Favoritos.vue'
import { useAuthStore } from './stores/auth'

const routes = [
  { path: '/', component: Home },
  { path: '/location/:id', component: Detail, props: true },
  { path: '/login', component: Login },
  { path: '/registro', component: Registro },
  { path: '/favoritos', component: Favoritos, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return '/login'
  }
})

export default router