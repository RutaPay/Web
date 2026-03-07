<script setup lang="ts">
import HeaderComponent from '../components/HeaderComponent.vue'
import { useSidebarStore } from '@/stores/sidebarstate'

const sidebarStore = useSidebarStore()
</script>

<template>
  <main
    class="min-h-screen transition-all duration-500 bg-gray-50 p-4"
    :class="{ 'ml-64': !sidebarStore.closedState, 'ml-28': sidebarStore.closedState }"
  >
    <div
      class="w-full h-full min-h-[calc(100vh-2rem)] bg-white rounded-3xl shadow-sm border border-gray-200 p-6 md:p-10"
    >
      <HeaderComponent />

      <div class="mt-8">
        <p class="text-gray-400 italic">El contenido del Dashboard aparecerá aquí...</p>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
export default {
  name: 'DashboardView',
}
</script>
