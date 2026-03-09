import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const authenticated = ref(false)
  const isInitialLoading = ref(true)
  const user = ref(null)

  function setAuth(value: boolean, userData = null) {
    authenticated.value = value
    user.value = userData
    isInitialLoading.value = false
  }

  return { authenticated, isInitialLoading, user, setAuth }
})
