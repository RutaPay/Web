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

export function useUserInfo() {
  const isLoading = ref(true)

  const handleGetUserInfo = async () => {
    isLoading.value = true
    try {
      await AuthService.getUserInfo()
    } finally {
      isLoading.value = false
    }
  }

  return {
    handleGetUserInfo,
    isLoading,
  }
}

export function useRefreshUserData() {
  const isRefreshing = ref(false)

  const handleRefreshUserData = async () => {
    isRefreshing.value = true
    try {
      await AuthService.refreshUserData()
    } finally {
      isRefreshing.value = false
    }
  }

  return {
    handleRefreshUserData,
    isRefreshing,
  }
}
