<template>
  <div>
    <header class="header-hero">
      <h1 class="header-hero__title">Clima actual</h1>
      <p class="subtitulo">Selecciona una ciudad para ver el detalle del pronóstico.</p>
    </header>

    <main>
      <div class="container py-5">
        <p v-if="cargando" class="text-center text-muted">Cargando datos del clima...</p>
        <p v-if="error" class="text-center text-danger">{{ error }}</p>

        <div v-if="!cargando && !error">
          <!-- Búsqueda -->
          <div class="mb-4">
            <input
              v-model="busqueda"
              type="text"
              class="form-control"
              placeholder="Buscar ciudad..."
            />
          </div>

          <!-- Listado de ciudades -->
          <section class="ciudades">
            <div class="row g-4">
              <div v-for="ciudad in ciudadesFiltradas" :key="ciudad.id" class="col-12 col-md-6 col-lg-4 col-xl-3">
                <router-link :to="`/location/${ciudad.id}`" style="text-decoration: none; color: inherit;">
                  <div class="place-card">
                    <span class="place-card__icon">{{ ciudad.icono }}</span>
                    <div class="place-card__info">
                      <h3 class="place-card__name">{{ ciudad.nombre }}</h3>
                      <div class="place-card__temp">{{ ciudad.temperatura }}°</div>
                      <span class="place-card__status">{{ ciudad.estado }}</span>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { weatherApp } from '../services/weatherService'

const ciudades = ref([])
const busqueda = ref('')
const cargando = ref(true)
const error = ref('')

const ciudadesFiltradas = computed(() => {
  return ciudades.value.filter(c =>
    c.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
  )
})

onMounted(async () => {
  try {
    cargando.value = true
    await weatherApp.cargarCiudades()
    ciudades.value = weatherApp.ciudades
    error.value = ''
  } catch (err) {
    error.value = 'Error al cargar los datos. Intenta recargar la página.'
    console.error(err)
  } finally {
    cargando.value = false
  }
})
</script>