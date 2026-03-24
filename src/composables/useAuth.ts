import { ref } from 'vue'
import { AuthService } from '@/services/authService'
import { useRouter } from 'vue-router'

export function useLogout() {
  const isLoggingOut = ref(false)
  const router = useRouter()

  const handleLogout = async () => {
    isLoggingOut.value = true
    try {
      await AuthService.logout(router)
    } finally {
      isLoggingOut.value = false
    }
  }

  return {
    handleLogout,
    isLoggingOut,
  }
}
