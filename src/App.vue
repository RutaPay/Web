<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onMounted(async () => {
  try {
    const response = await fetch('https://localhost:7130/api/account', {
      credentials: 'include',
    })

    if (response.ok) {
      const data = await response.json()
      authStore.setAuth(true, data)
    } else {
      authStore.setAuth(false)
    }
  } catch (error) {
    authStore.setAuth(false)
  }
})
</script>

<template>
  <div v-if="authStore.isInitialLoading">Loading session...</div>
  <RouterView v-else />
</template>

<style scoped></style>
