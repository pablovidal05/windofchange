import { defineStore } from 'pinia'

const STORAGE_KEY = 'favoritos'

function cargarIds() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

export const useFavoritosStore = defineStore('favoritos', {
  state: () => ({
    ids: cargarIds()
  }),

  actions: {
    guardar() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.ids))
    },

    agregar(id) {
      if (!this.ids.includes(id)) {
        this.ids.push(id)
        this.guardar()
      }
    },

    quitar(id) {
      this.ids = this.ids.filter(i => i !== id)
      this.guardar()
    },

    esFavorito(id) {
      return this.ids.includes(id)
    }
  }
})