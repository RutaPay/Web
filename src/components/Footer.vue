<script setup lang="ts">
import { computed } from 'vue'

// Definimos la prop que nos pasa el Profile (o cualquier otra vista) para saber si el menú está cerrado
defineProps<{
  isClosed: boolean
}>()

// Calculamos el año actual automáticamente para el copyright
const currentYear = computed(() => new Date().getFullYear())
</script>


<template>
  <footer
    class="bg-white border-t border-gray-200 transition-all duration-500"
    :class="{ 'ml-64': !isClosed, 'ml-28': isClosed }"
  >
    <div class="max-w-5xl mx-auto px-6 md:px-10 py-8">
      <div class="flex flex-col md:flex-row justify-between items-center gap-6">

        <!-- Branding y Derechos -->
        <div class="flex flex-col items-center md:items-start text-center md:text-left">
          <span class="text-2xl font-extrabold text-gray-800 tracking-tight">
            Ruta<span class="text-blue-600">Pay</span>
          </span>
          <p class="text-sm text-gray-500 mt-1.5 font-medium">
            &copy; {{ currentYear }} RutaPay Celaya. Todos los derechos reservados.
          </p>
        </div>

        <!-- Enlaces de navegación -->
        <nav class="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-gray-500">
          <a href="#" class="hover:text-blue-600 transition-colors duration-300">Términos y Condiciones</a>
          <a href="#" class="hover:text-blue-600 transition-colors duration-300">Privacidad</a>
          <a href="#" class="hover:text-blue-600 transition-colors duration-300">Centro de Ayuda</a>
        </nav>

        <!-- Iconos de Redes / Contacto -->
        <div class="flex items-center gap-4">
          <!-- Facebook -->
          <a href="#" class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300">
            <span class="sr-only">Facebook</span>
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
            </svg>
          </a>
          <!-- Twitter / X -->
          <a href="#" class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-800 transition-all duration-300">
            <span class="sr-only">X</span>
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <!-- Soporte (Correo) -->
          <a href="#" class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all duration-300">
            <span class="sr-only">Correo</span>
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </a>
        </div>

      </div>
    </div>
  </footer>
</template>
