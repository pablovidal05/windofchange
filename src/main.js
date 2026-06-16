import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'
import './assets/css/style.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)

// Espera a que Firebase confirme la sesión antes de montar,
// para que las rutas protegidas no expulsen al usuario tras una recarga.
const authStore = useAuthStore()
authStore.inicializar().then(() => {
  app.mount('#app')
})