<script setup lang="ts">
import SideBar from '../components/SideBar.vue'
import { useSidebarStore } from '@/stores/sidebarstate'
import { useAuthStore } from '@/stores/auth'
import { useLogout } from '@/composables/useAuth'

const sidebarStore = useSidebarStore()
const authStore = useAuthStore()
const { handleLogout, isLoggingOut } = useLogout()
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
        <p class="text-text-dark text-2xl">Nombre:</p>
        <p class="text-primary text-xl">{{ authStore.user?.userName }}</p>
        <br />
        <p class="text-text-dark text-2xl">Email:</p>
        <p class="text-primary text-xl">{{ authStore.user?.email }}</p>
        <br />
        <p class="text-text-dark text-2xl">Teléfono:</p>
        <p class="text-primary text-xl">{{ authStore.user?.phoneNumber }}</p>
        <br />
        <p class="text-text-dark text-2xl">Fecha de Registro:</p>
        <p class="text-primary text-xl">{{ authStore.user?.createdOn }}</p>
        <div class="mt-8">
          <button
            class="bg-[#D93025] text-white py-2 px-4 rounded-lg transition-colors duration-300 cursor-pointer"
            @click="handleLogout()"
            :disabled="isLoggingOut"
            :class="{ 'opacity-50 cursor-not-allowed': isLoggingOut }"
          >
            <span v-if="isLoggingOut">Cerrando sesión... </span>

            <span v-else>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
