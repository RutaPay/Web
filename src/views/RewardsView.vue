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
    <div class="h-auto bg-white rounded-3xl shadow-sm border border-gray-200 mb-8 p-6 md:p-10">
      <h1
        class="text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-text-dark"
      >
        Recompensas y Beneficios
      </h1>
    </div>
    <div
      class="flex justify-between h-full bg-white rounded-3xl shadow-sm border border-gray-200 mb-8 p-6 md:p-10"
    >
      <div>
        <h3
          class="mb-6 text-2xl font-bold tracking-tight leading-none md:text-3xl xl:text-4xl text-text-dark"
        >
          Hola, <span class="text-primary">{{ authStore.user?.userName }}</span
          >!
        </h3>
        <p class="text-text-dark">En RutaPay desde: {{ authStore.user?.createdOn }}</p>
      </div>
      <div class="flex justify-between space-x-16">
        <div>
          <p class="text-text-dark mb-2 font-bold">Puntos Acumulados</p>
          <h3
            class="mb-6 text-2xl font-bold tracking-tight leading-none md:text-3xl xl:text-4xl text-primary"
          >
            {{ authStore.user?.points }}
          </h3>
        </div>
        <div>
          <p class="text-text-dark mb-2 font-bold">Recuento de Racha</p>
          <h3
            class="mb-6 text-2xl font-bold tracking-tight leading-none md:text-3xl xl:text-4xl text-primary"
          >
            N/A
          </h3>
        </div>
      </div>
    </div>
    <div class="h-auto bg-white rounded-3xl shadow-sm border border-gray-200 mb-8 p-6 md:p-10">
      <h3
        class="mb-6 text-2xl font-bold tracking-tight leading-none md:text-3xl xl:text-4xl text-text-dark"
      >
        Ganar Puntos
      </h3>
      <div>
        <p class="text-text-dark mb-2">Próximamente...</p>
      </div>
    </div>
    <div class="h-auto bg-white rounded-3xl shadow-sm border border-gray-200 mb-8 p-6 md:p-10">
      <h3
        class="mb-6 text-2xl font-bold tracking-tight leading-none md:text-3xl xl:text-4xl text-text-dark"
      >
        Canje de Recompensas
      </h3>
      <div>
        <p class="text-text-dark mb-2">Próximamente...</p>
      </div>
    </div>
  </main>
</template>
