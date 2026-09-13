<script setup lang="ts">
import { computed } from 'vue'

defineProps<{
  isClosed: boolean
}>()

const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <footer
    class="bg-[#071324] text-gray-300 transition-all duration-500 border-t border-gray-800"
    :class="{ 'ml-64': !isClosed, 'ml-28': isClosed }"
  >
    <div class="max-w-6xl mx-auto px-6 md:px-10 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">

        <!-- Columna 1: Branding -->
        <div class="flex flex-col space-y-6">
          <div class="flex flex-col">
            <!-- Puedes reemplazar esto con tu etiqueta <img> del logo -->
            <span class="text-3xl font-extrabold tracking-tight text-white mb-4">
              Ruta<span class="text-blue-500">Pay</span>
            </span>
            <p class="text-sm font-medium leading-relaxed text-gray-300">
              Transformando la movilidad<br>en Celaya.
            </p>
          </div>
          <div class="pt-6 text-sm text-gray-500 font-medium">
            &copy; {{ currentYear }} RutaPay. Todos los derechos reservados.
          </div>
        </div>

        <!-- Columna 2: RutaPay -->
        <div class="flex flex-col">
          <h3 class="text-lg font-bold text-[#4299E1] mb-6">RutaPay</h3>
          <ul class="space-y-4 text-sm font-medium">
            <li><a href="#" class="hover:text-white transition-colors duration-200">Panel de Administración</a></li>
            <li><a href="#" class="hover:text-white transition-colors duration-200">Historial de Transacciones</a></li>
            <li><a href="#" class="hover:text-white transition-colors duration-200">Recompensas</a></li>
            <li><a href="#" class="hover:text-white transition-colors duration-200">Centro de Ayuda</a></li>
          </ul>
        </div>

        <!-- Columna 3: Soporte -->
        <div class="flex flex-col">
          <h3 class="text-lg font-bold text-[#4299E1] mb-6">Soporte</h3>
          <ul class="space-y-4 text-sm font-medium">
            <li><a href="#" class="hover:text-white transition-colors duration-200">Contacto</a></li>
            <li><a href="#" class="hover:text-white transition-colors duration-200">Preguntas Frecuentes</a></li>
            <li><a href="#" class="hover:text-white transition-colors duration-200">Tarifas</a></li>
            <li><a href="#" class="hover:text-white transition-colors duration-200">Ubicaciones de Recarga</a></li>
          </ul>
        </div>

        <!-- Columna 4: Descargas y Redes -->
        <div class="flex flex-col">
          <h3 class="text-lg font-bold text-[#4299E1] mb-6">Descargar App</h3>

          <div class="flex flex-col space-y-3 w-48">
            <!-- App Store -->
            <a href="#" class="flex items-center px-3 py-1.5 border border-gray-600 rounded-lg hover:border-white hover:bg-white/5 transition-all duration-200 group">
              <svg class="w-7 h-7 text-white fill-current" viewBox="0 0 24 24">
                <path d="M16.365 14.363c-.02-.91.737-1.352.766-1.37-1.127-1.636-2.883-1.856-3.51-1.884-1.503-.153-2.936.885-3.693.885-.758 0-1.928-.867-3.15-.845-1.597.025-3.072.93-3.896 2.364-1.66 2.87-.425 7.127 1.196 9.475.79 1.144 1.722 2.42 2.946 2.373 1.173-.046 1.635-.758 3.05-.758 1.416 0 1.83.758 3.07.734 1.264-.02 2.062-1.155 2.846-2.302.906-1.324 1.28-2.61 1.296-2.678-.025-.01-2.513-.966-2.533-3.874l-.388-2.12zm-2.37-3.84c.642-.776 1.074-1.856.956-2.935-.93.037-2.072.62-2.73 1.396-.588.69-1.097 1.785-.956 2.847 1.036.08 2.088-.535 2.73-1.308z"/>
              </svg>
              <div class="ml-2 flex flex-col leading-none">
                <span class="text-[0.6rem] text-gray-300 group-hover:text-white">Disponible en en</span>
                <span class="text-[0.85rem] font-semibold text-white">App Store</span>
              </div>
            </a>

            <!-- Google Play -->
            <a href="#" class="flex items-center px-3 py-1.5 border border-gray-600 rounded-lg hover:border-white hover:bg-white/5 transition-all duration-200 group">
              <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.092 2.652A1.858 1.858 0 003 4.298v15.405a1.85 1.85 0 001.092 1.645l8.605-8.687-8.605-9.92z"/>
                <path d="M14.07 9.28L4.85 3.056a1.85 1.85 0 011.666-.024l8.28 4.708-1.58 1.54h.854z"/>
                <path d="M14.07 14.72l-1.574-1.54.726 1.54 8.28 4.708a1.852 1.852 0 01-1.666-.024l-9.22-6.224h3.454z"/>
                <path d="M19.167 11.233l-3.523-2.003h-1.574v2.54h1.574l3.523-2.003c.69-.392.69-1.42 0-1.813z"/>
              </svg>
              <div class="ml-2 flex flex-col leading-none">
                <span class="text-[0.6rem] text-gray-300 group-hover:text-white">GET IT ON</span>
                <span class="text-[0.85rem] font-semibold text-white">Google Play</span>
              </div>
            </a>
          </div>

          <!-- Redes Sociales -->
          <div class="flex items-center space-x-5 mt-8">
            <a href="#" class="text-white hover:text-[#4299E1] transition-colors"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg></a>
            <a href="#" class="text-white hover:text-[#4299E1] transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
            <a href="#" class="text-white hover:text-[#4299E1] transition-colors"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle></svg></a>
            <a href="#" class="text-white hover:text-[#4299E1] transition-colors"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
          </div>

        </div>
      </div>
    </div>
  </footer>
</template>
