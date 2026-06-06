import { defineStore } from 'pinia'

export const useFavoritosStore = defineStore('favoritos', {
  state: () => ({
    ids: []
  }),

  actions: {
    agregar(id) {
      if (!this.ids.includes(id)) {
        this.ids.push(id)
      }
    },

    quitar(id) {
      this.ids = this.ids.filter(i => i !== id)
    },

    esFavorito(id) {
      return this.ids.includes(id)
    }
  }
})