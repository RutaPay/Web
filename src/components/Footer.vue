<script setup lang="ts">
import { Envelope, Facebook, TwitterX } from '@boxicons/vue'
import { computed } from 'vue'
import { useSidebarStore } from '@/stores/sidebarstate'

const sidebarStore = useSidebarStore()

// Calculamos el año actual automáticamente para el copyright
const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <footer
    class="bg-white border-t border-gray-200 transition-all duration-500 print:hidden"
    :class="{ 'ml-64': !sidebarStore.closedState, 'ml-28': sidebarStore.closedState }"
  >
    <div class="max-w-6xl mx-auto px-6 md:px-10 py-8">
      <div class="flex flex-col md:flex-row justify-between items-center gap-12">
        <!-- Branding y Derechos -->
        <div class="flex flex-col items-center md:items-start text-center md:text-left">
          <span class="text-2xl font-extrabold text-gray-800 tracking-tight">
            Ruta<span class="text-primary">Pay</span>
          </span>
          <p class="text-sm text-gray-500 mt-1.5 font-medium">
            &copy; {{ currentYear }} RutaPay Celaya. Todos los derechos reservados.
          </p>
        </div>

        <!-- Enlaces de navegación -->
        <nav
          class="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-gray-500"
        >
          <a href="#" class="hover:text-primary transition-colors duration-300"
            >Términos y Condiciones</a
          >
          <a href="#" class="hover:text-primary transition-colors duration-300">Privacidad</a>
          <a href="#" class="hover:text-primary transition-colors duration-300">Centro de Ayuda</a>
        </nav>

        <!-- Iconos de Redes / Contacto -->
        <div class="flex flex-col items-center gap-2">
          <div class="flex items-center gap-4">
            <img
              src="@/assets/DownloadOnTheAppStore_Badge.svg"
              alt="App Store Badge"
              class="h-12"
            />
            <img src="@/assets/GetItOnGooglePlay_Badge.svg" alt="Google Play Badge" class="h-12" />
          </div>
          <div class="flex items-center gap-4 mt-4">
            <!-- Facebook -->
            <a
              href="#"
              class="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
            >
              <span class="sr-only">Facebook</span>
              <Facebook class="h-6 w-6" />
            </a>
            <!-- Twitter / X -->
            <a
              href="#"
              class="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-800 transition-all duration-300"
            >
              <span class="sr-only">X</span>
              <TwitterX class="h-6 w-6" />
            </a>
            <!-- Soporte (Correo) -->
            <a
              href="#"
              class="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all duration-300"
            >
              <span class="sr-only">Correo</span>
              <Envelope class="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
