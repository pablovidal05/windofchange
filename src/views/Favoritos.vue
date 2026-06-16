<template>
  <div>
    <header class="header-hero">
      <h1 class="header-hero__title">Mis Favoritos</h1>
      <p class="header-hero__subtitle">Tus ciudades guardadas, {{ authStore.usuario?.email }}</p>
    </header>

    <main>
      <div class="container py-5">
        <p v-if="cargando" class="text-center text-muted">Cargando tus favoritos...</p>
        <p v-else-if="error" class="text-center text-danger">{{ error }}</p>

        <div v-else-if="favoritos.length === 0" class="text-center text-muted">
          <p>No tienes ciudades favoritas aún.</p>
          <router-link to="/" class="btn btn-dark mt-2">Explorar ciudades</router-link>
        </div>

        <div v-else class="row g-4">
          <div v-for="ciudad in favoritos" :key="ciudad.id" class="col-12 col-md-6 col-lg-4">
            <div class="place-card">
              <span class="place-card__icon">{{ ciudad.icono }}</span>
              <div class="place-card__info">
                <h3 class="place-card__name">{{ ciudad.nombre }}</h3>
                <div class="place-card__temp">{{ ciudad.temperatura }}°</div>
                <span class="place-card__status">{{ ciudad.estado }}</span>
              </div>
              <button @click="quitar(ciudad.id)" class="btn btn-sm btn-outline-danger mt-2">
                Quitar
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useFavoritosStore } from '../stores/favoritos'
import { weatherApp } from '../services/weatherService'

const authStore = useAuthStore()
const favoritosStore = useFavoritosStore()
const cargando = ref(true)
const error = ref('')

const favoritos = computed(() => {
  return favoritosStore.ids
    .map(id => weatherApp.buscarCiudadPorId(id))
    .filter(Boolean)
})

// Asegura que las ciudades estén cargadas aunque se entre directo a /favoritos.
onMounted(async () => {
  try {
    await weatherApp.cargarCiudades()
  } catch (err) {
    error.value = 'No se pudieron cargar tus favoritos. Intenta recargar la página.'
    console.error(err)
  } finally {
    cargando.value = false
  }
})

const quitar = (id) => {
  favoritosStore.quitar(id)
}
</script>