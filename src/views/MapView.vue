<script setup lang="ts">
import SideBar from '../components/SideBar.vue'
import Footer from '../components/Footer.vue'
import { useSidebarStore } from '@/stores/sidebarstate'

const sidebarStore = useSidebarStore()
</script>

<template>
  <SideBar />
  <main
    class="min-h-screen transition-all duration-500 bg-gray-50 p-6 md:p-10"
    :class="{ 'ml-64': !sidebarStore.closedState, 'ml-28': sidebarStore.closedState }"
  >
    <div
      class="min-h-screen flex flex-col bg-white text-text-dark rounded-3xl shadow-sm border border-gray-200 p-4 md:p-8"
    >
      <!-- Search Bar -->
      <header class="p-4 bg-white shadow-md sticky top-0 z-10 animate-fade-in rounded-xl">
        <input
          type="text"
          placeholder="Ruta"
          class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow"
        />
      </header>

      <!-- Map Container -->
      <main class="grow flex items-center justify-center p-4 animate-fade-in-up">
        <div
          class="w-full max-w-5xl h-[60vh] bg-gray-400 rounded-xl shadow-inner transition-transform duration-500 hover:scale-[1.01]"
        >
          <!-- Placeholder for map -->
          <p class="text-center text-gray-600 pt-24 text-lg">[Mapa de rutas y paradas aquí]</p>
        </div>
      </main>
    </div>
  </main>
  <Footer :isClosed="sidebarStore.closedState" />
</template>
