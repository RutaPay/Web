<script setup lang="ts">
import SideBar from '../components/SideBar.vue'
import { useSidebarStore } from '@/stores/sidebarstate'

const sidebarStore = useSidebarStore()
</script>

<template>
  <SideBar />
  <main
    class="min-h-screen transition-all duration-500 bg-gray-50 p-6 md:p-10"
    :class="{ 'ml-64': !sidebarStore.closedState, 'ml-28': sidebarStore.closedState }"
  >
  <div class="min-h-screen flex flex-col bg-gray-100 text-gray-800">
    <!-- Search Bar -->
    <header class="p-4 bg-white shadow-md sticky top-0 z-10 animate-fade-in">
      <input
        type="text"
        placeholder="Ruta"
        class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out hover:shadow"
      />
    </header>

    <!-- Map Container -->
    <main class="flex-grow flex items-center justify-center p-4 animate-fade-in-up">
      <div
        class="w-full max-w-5xl h-[60vh] bg-gray-300 rounded-xl shadow-inner transition-transform duration-500 hover:scale-[1.01]"
      >
        <!-- Placeholder for map -->
        <p class="text-center text-gray-600 pt-24 text-lg">[Mapa de rutas y paradas aquí]</p>
      </div>
    </main>

    <!-- Info Box -->
    <footer
      class="bg-white p-4 shadow-inner border-t border-gray-200 animate-fade-in-up"
    >
      <div class="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div class="p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition duration-300">
          <p class="text-sm text-gray-600">Próxima Parada:</p>
          <p class="text-lg font-semibold">Av. Tecnológico</p>
        </div>
        <div class="p-4 bg-green-100 rounded-lg hover:bg-green-200 transition duration-300">
          <p class="text-sm text-gray-600">Tiempo de llegada</p>
          <p class="text-lg font-semibold">3 min</p>
        </div>
        <div class="p-4 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition duration-300">
          <p class="text-sm text-gray-600">Camiones en servicio</p>
          <p class="text-lg font-semibold">5</p>
        </div>
      </div>
    </footer>
  </div>
  </main>

</template>
