<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'
import { API_URL } from '@/composables/constants'

const authStore = useAuthStore()

onMounted(async () => {
  try {
    const response = await fetch(`${API_URL}/api/account`, {
      credentials: 'include',
    })

    if (response.ok) {
      const data = await response.json()
      authStore.setAuth(true, data)
    } else {
      authStore.clearAuth()
    }
  } catch (error) {
    authStore.clearAuth()
  } finally {
    authStore.isInitialLoading = false
  }
})
</script>

<template>
  <!--<div v-if="authStore.isInitialLoading" class="loader">Checking session...</div>
  <RouterView v-else />-->
  <Toaster position="top-right" richColors theme="system" />
  <RouterView />
</template>

<style scoped></style>
