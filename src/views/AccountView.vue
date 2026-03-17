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
        class="text-3xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-5xl text-text-dark"
      >
        Mi Cuenta
      </h1>
    </div>
    <div class="flex justify-center">
      <div class="w-1/2 h-fit bg-white rounded-3xl shadow-sm border border-gray-200 p-6 md:p-10">
        <p class="text-text-dark text-2xl">Email:</p>
        <p class="text-text-dark text-xl">{{ authStore.user?.email }}</p>
        <br />
        <p class="text-text-dark text-2xl">Nombre:</p>
        <p class="text-text-dark text-xl">{{ authStore.user?.userName }}</p>
      </div>
    </div>
  </main>
</template>
