import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'vue-sonner'

const router = useRouter()
const authStore = useAuthStore()

export class AuthService {
  private static readonly LOGOUT_URL = 'https://localhost:7130/api/account/logout'

  static async logout(): Promise<void> {
    try {
      const response = await fetch(this.LOGOUT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      if (response.ok) {
        authStore.clearAuth()
        router.push('/')
        toast.success('Sesión Cerrada', {
          description: 'Has cerrado sesión exitosamente.',
        })
      } else {
        throw new Error(`Logout failed with status: ${response.status}`)
      }
    } catch (error) {
      console.error('Network or Server error during logout:', error)
      toast.error('Error de Servidor', {
        description: 'No se pudo conectar con el servidor.',
      })
    } finally {
      authStore.clearAuth()
      router.push('/')
    }
  }
}
