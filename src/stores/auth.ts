import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const authenticated = ref(localStorage.getItem('isAuth') === 'true')
  const user = ref(null)
  const isInitialLoading = ref(true)

  function setAuth(value: boolean, userData = null) {
    authenticated.value = value
    user.value = userData
    isInitialLoading.value = false
    localStorage.setItem('isAuth', value.toString())
  }

  function clearAuth() {
    authenticated.value = false
    user.value = null
    localStorage.removeItem('isAuth')
  }

  return { authenticated, user, isInitialLoading, setAuth, clearAuth }
})
