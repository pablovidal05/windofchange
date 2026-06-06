<template>
  <div>
    <header class="header-hero">
      <h1 class="header-hero__title">Mis Favoritos</h1>
      <p class="header-hero__subtitle">Tus ciudades guardadas, {{ authStore.usuario?.email }}</p>
    </header>

    <main>
      <div class="container py-5">
        <div v-if="favoritos.length === 0" class="text-center text-muted">
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
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useFavoritosStore } from '../stores/favoritos'
import { weatherApp } from '../services/weatherService'

const authStore = useAuthStore()
const favoritosStore = useFavoritosStore()

const favoritos = computed(() => {
  return favoritosStore.ids
    .map(id => weatherApp.buscarCiudadPorId(id))
    .filter(Boolean)
})

const quitar = (id) => {
  favoritosStore.quitar(id)
}
</script>