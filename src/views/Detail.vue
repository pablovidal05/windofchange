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

        <p v-else class="text-center text-muted">Cargando detalle...</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { weatherApp } from '../services/weatherService'
import { calcularEstadisticas } from '../services/weatherService'

const props = defineProps({
  id: String
})

const ciudad = ref(null)

const estadisticas = computed(() => {
  return ciudad.value ? calcularEstadisticas(ciudad.value.pronosticoSemanal) : {}
})

onMounted(async () => {
  await weatherApp.cargarCiudades()
  const id = parseInt(props.id)
  ciudad.value = weatherApp.buscarCiudadPorId(id)
})
</script>