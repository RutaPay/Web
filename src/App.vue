<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

/*onMounted(async () => {
  try {
    const response = await fetch('https://localhost:7130/api/account', {
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
    authStore.setInitialLoading(false)
  }
})*/
</script>

<template>
  <!--<div v-if="authStore.isInitialLoading" class="loader">Checking session...</div>
  <RouterView v-else />-->
  <RouterView />
</template>

<style scoped></style>
