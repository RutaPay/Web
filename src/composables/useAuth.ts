import { ref } from 'vue'
import { AuthService } from '@/services/authService'

export function useLogout() {
  const isLoggingOut = ref(false)

  const handleLogout = async () => {
    isLoggingOut.value = true
    await AuthService.logout()
    isLoggingOut.value = false
  }

  return {
    handleLogout,
    isLoggingOut,
  }
}
