import { defineStore } from 'pinia'
import { auth } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    usuario: null,
    isAuthenticated: false,
    ready: false
  }),

  actions: {
    // Restaura la sesión guardada por Firebase al cargar la app.
    // Se resuelve cuando Firebase confirma el estado de autenticación.
    inicializar() {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            this.usuario = { email: user.email, uid: user.uid }
            this.isAuthenticated = true
          } else {
            this.usuario = null
            this.isAuthenticated = false
          }
          this.ready = true
          resolve()
        })
      })
    },

    async registrar(email, password) {
      const resultado = await createUserWithEmailAndPassword(auth, email, password)
      this.usuario = { email: resultado.user.email, uid: resultado.user.uid }
      this.isAuthenticated = true
    },

    async login(email, password) {
      const resultado = await signInWithEmailAndPassword(auth, email, password)
      this.usuario = { email: resultado.user.email, uid: resultado.user.uid }
      this.isAuthenticated = true
    },

    async logout() {
      await signOut(auth)
      this.usuario = null
      this.isAuthenticated = false
    }
  }
})