<template>
  <div class="container py-5" style="max-width: 420px;">
    <h2 class="mb-4 fw-bold">Crear cuenta</h2>

    <div class="mb-3">
      <label class="form-label">Correo</label>
      <input v-model="email" type="email" class="form-control" placeholder="tu@correo.com" />
    </div>

    <div class="mb-3">
      <label class="form-label">Contraseña</label>
      <input v-model="password" type="password" class="form-control" placeholder="••••••••" />
    </div>

    <p v-if="error" class="text-danger small">{{ error }}</p>

    <button @click="handleRegistro" class="btn btn-dark w-100 mb-3">Crear cuenta</button>

    <p class="text-center small">
      ¿Ya tienes cuenta?
      <router-link to="/login">Inicia sesión</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')

const handleRegistro = async () => {
  error.value = ''
  try {
    await authStore.registrar(email.value, password.value)
    router.push('/')
  } catch (e) {
    error.value = 'Ocurrió un error al crear la cuenta. Intenta con otro correo.'
  }
}
</script>