import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const authenticated = ref(false)

  function setAuth(value: boolean) {
    authenticated.value = value
  }

  return { authenticated, setAuth }
})
