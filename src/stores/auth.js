import { defineStore } from 'pinia'
import { auth } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    usuario: null,
    isAuthenticated: false
  }),

  actions: {
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