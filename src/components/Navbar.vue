<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <router-link to="/" class="navbar-brand">WeatherApp</router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navMenu">
        <ul class="navbar-nav ms-auto align-items-center">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>

          <template v-if="authStore.isAuthenticated">
            <li class="nav-item">
              <router-link to="/favoritos" class="nav-link">Mis Favoritos</router-link>
            </li>
            <li class="nav-item">
              <span class="nav-link text-muted small">{{ authStore.usuario?.email }}</span>
            </li>
            <li class="nav-item">
              <button @click="handleLogout" class="btn btn-sm btn-outline-dark ms-2">Cerrar sesión</button>
            </li>
          </template>

          <template v-else>
            <li class="nav-item">
              <router-link to="/login" class="nav-link">Iniciar sesión</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/registro" class="nav-link">Registrarse</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>