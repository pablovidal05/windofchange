<template>
  <div>
    <header class="header-hero">
      <h1 class="header-hero__title">Detalle del Clima</h1>
    </header>

    <main>
      <div class="container py-5">
        <router-link to="/" class="btn btn-secondary mb-4">← Volver al Home</router-link>

        <div v-if="ciudad" class="weather-detail">
          <!-- Header -->
          <div class="weather-detail__header mb-4 text-center">
            <span class="display-1">{{ ciudad.icono }}</span>
            <h2 class="weather-detail__name mt-2">{{ ciudad.nombre }}</h2>
            <p class="weather-detail__status text-muted">{{ ciudad.estado }}</p>
            <p class="fs-2 fw-bold">{{ ciudad.temperatura }}°C</p>
            <p class="text-muted small">💧 Humedad: {{ ciudad.humedad }}%  |  💨 Viento: {{ ciudad.viento }} km/h</p>

            <div v-if="authStore.isAuthenticated" class="mt-3">
              <button
                @click="toggleFavorito"
                class="btn btn-sm"
                :class="esFavorito ? 'btn-warning' : 'btn-outline-warning'"
              >
                {{ esFavorito ? '★ Quitar de favoritos' : '☆ Agregar a favoritos' }}
              </button>
            </div>
          </div>

          <!-- Alertas -->
          <div v-if="estadisticas.alertas.length > 0" class="mb-4">
            <h5 class="mb-2 border-bottom pb-2">⚠️ Alertas de clima</h5>
            <div v-for="(alerta, idx) in estadisticas.alertas" :key="idx" class="alert alert-warning py-2">
              {{ alerta }}
            </div>
          </div>

          <!-- Estadísticas -->
          <div class="mb-4">
            <h5 class="mb-3 border-bottom pb-2">Estadísticas de la semana</h5>
            <div class="bg-light p-3 rounded">
              <p class="mb-1"><strong>Temperatura Mínima:</strong> {{ estadisticas.min }}°C</p>
              <p class="mb-1"><strong>Temperatura Máxima:</strong> {{ estadisticas.max }}°C</p>
              <p class="mb-1"><strong>Promedio Semanal:</strong> {{ estadisticas.promedio }}°C</p>
              <hr />
              <p class="mb-1"><strong>Días por clima:</strong></p>
              <ul class="mb-2">
                <li v-for="(count, estado) in estadisticas.conteo" :key="estado">
                  {{ estado }}: {{ count }} días
                </li>
              </ul>
              <div class="alert alert-info mt-3 mb-0">
                {{ estadisticas.resumen }}
              </div>
            </div>
          </div>

          <!-- Pronóstico -->
          <div>
            <h5 class="weather-detail__forecast-title border-bottom pb-2">Pronóstico Extendido</h5>
            <div class="d-flex flex-wrap justify-content-between mt-3">
              <div v-for="dia in ciudad.pronosticoSemanal" :key="dia.dia" class="forecast-card text-center border rounded p-2 m-1 flex-fill bg-light">
                <div class="fw-bold">{{ dia.dia }}</div>
                <div class="text-primary">{{ dia.min }}°</div>
                <div class="text-danger">{{ dia.max }}°</div>
                <div class="small">{{ dia.estado }}</div>
              </div>
            </div>
          </div>
        </div>

        <p v-else-if="cargando" class="text-center text-muted">Cargando detalle...</p>

        <p v-else-if="error" class="text-center text-danger">{{ error }}</p>

        <div v-else class="text-center text-muted">
          <p>No se encontró la ciudad solicitada.</p>
          <router-link to="/" class="btn btn-dark mt-2">Volver al Home</router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { weatherApp, calcularEstadisticas } from '../services/weatherService'
import { useAuthStore } from '../stores/auth'
import { useFavoritosStore } from '../stores/favoritos'

const props = defineProps({
  id: String
})

const authStore = useAuthStore()
const favoritosStore = useFavoritosStore()
const ciudad = ref(null)
const cargando = ref(true)
const error = ref('')

const estadisticas = computed(() => {
  return ciudad.value ? calcularEstadisticas(ciudad.value.pronosticoSemanal) : {}
})

const esFavorito = computed(() => {
  return ciudad.value ? favoritosStore.esFavorito(ciudad.value.id) : false
})

const toggleFavorito = () => {
  if (esFavorito.value) {
    favoritosStore.quitar(ciudad.value.id)
  } else {
    favoritosStore.agregar(ciudad.value.id)
  }
}

onMounted(async () => {
  try {
    await weatherApp.cargarCiudades()
    const id = parseInt(props.id)
    ciudad.value = weatherApp.buscarCiudadPorId(id)
  } catch (err) {
    error.value = 'Error al cargar el detalle del clima. Intenta recargar la página.'
    console.error(err)
  } finally {
    cargando.value = false
  }
})
</script>