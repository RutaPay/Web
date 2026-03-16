<script setup lang="ts">
import SideBar from '../components/SideBar.vue'
import { useSidebarStore } from '@/stores/sidebarstate'
import { useAuthStore } from '@/stores/auth'

const sidebarStore = useSidebarStore()
const authStore = useAuthStore()
</script>

<template>
  <SideBar />
  <main
    class="min-h-screen transition-all duration-500 bg-gray-50 p-6 md:p-10"
    :class="{ 'ml-64': !sidebarStore.closedState, 'ml-28': sidebarStore.closedState }"
  >
    <div class="h-full bg-white rounded-3xl shadow-sm border border-gray-200 mb-8 p-6 md:p-10">
      <h1
        class="text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-text-dark"
      >
        Recompensas y Beneficios
      </h1>
    </div>
    <div
      class="flex justify-between h-full bg-white rounded-3xl shadow-sm border border-gray-200 p-6 md:p-10"
    >
      <div>
        <h3
          class="mb-6 text-2xl font-bold tracking-tight leading-none md:text-3xl xl:text-4xl text-text-dark"
        >
          Hola, {{ authStore.user!.fullName }}
        </h3>
        <p class="text-text-dark">En RutaPay desde: [Fecha de registro]</p>
      </div>
      <div class="flex justify-between space-x-16">
        <div>
          <p class="text-text-dark mb-2">Puntos Acumulados</p>
          <h3
            class="mb-6 text-2xl font-bold tracking-tight leading-none md:text-3xl xl:text-4xl text-primary"
          >
            1,234
          </h3>
        </div>
        <div>
          <p class="text-text-dark mb-2">Recuento de Racha</p>
          <h3
            class="mb-6 text-2xl font-bold tracking-tight leading-none md:text-3xl xl:text-4xl text-primary"
          >
            1 día(s)
          </h3>
        </div>
      </div>
    </div>
  </main>
</template>
