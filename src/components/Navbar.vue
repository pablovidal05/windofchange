<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <router-link to="/" class="navbar-brand">WeatherApp</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navMenu">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <a href="#" @click.prevent="mostrarAcercaDe" class="nav-link">Acerca de</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
const mostrarAcercaDe = () => {
  alert('WeatherApp consume datos reales desde Open-Meteo API. Proyecto desarrollado para el Módulo 6 del bootcamp.')
}
</script>