<script setup lang="ts">
import SideBar from '../components/SideBar.vue'
import Footer from '../components/Footer.vue'
import { useSidebarStore } from '@/stores/sidebarstate'

const sidebarStore = useSidebarStore()

import { ref, computed } from 'vue'

// Texto que escribe el usuario
const search = ref('')

// Lista de rutas
const routes = ref([
  '001 PEDREGOSO - CENTRO',
  '002 PEDREGOSO - UNIVERSIDAD TECNOLÓGICA',
  '003 PEDREGOSO 2A. SECCIÓN - CENTRO',
  '004 COL. INDUSTRIAL NUEVO SAN JUAN - CENTRO',
  '005 PEDREGOSO 2A. SECCIÓN - CENTRAL DE AUTOBUSES',
  '006 LOS OLIVOS - SKIBIDILANDIA ',
  '007 CENTRAL DE AUTOBUSES - UNIVERSIDAD TECNOLÓGICA',
  '010 PEDREGOSO - LOS OLIVOS',
])

// Computada: devuelve solo las rutas que coinciden con la búsqueda
const filteredRoutes = computed(() => {
  return routes.value.filter(route =>
    route.toLowerCase().includes(search.value.toLowerCase())
  )
})

</script>

<template>

  <!-- <SideBar />
  <main
    class="min-h-screen transition-all duration-500 bg-gray-50 p-6 md:p-10"
    :class="{ 'ml-64': !sidebarStore.closedState, 'ml-28': sidebarStore.closedState }"
  >
    <div
      class="min-h-screen flex flex-row bg-white text-text-dark rounded-3xl shadow-sm border border-gray-200 p-4 md:p-8"
    >
    <div class="w-1/2 flex items-baseline flex-col p-8">
      <input type="text" placeholder="Busca una ruta..." class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary mb-4"
             id="search"/>
      <div class="w-full h-128 bg-white rounded-lg flex items-baseline justify-baseline text-black flex-col gap-10">
        <div class="text-2xl p-5 text-primary">Rutas Sugeridas</div>
        <div class="w-full h-96 bg-gray-200 rounded-lg p-5 overflow-y-auto">
          <ul id="routeList">
            <li class="hover:text-primary "><span class="text-secondary font-bold">001</span> PEDREGOSO - CENTRO</li>
            <li class="hover:text-primary"><span class="text-secondary font-bold">002</span> PEDREGOSO - UNIVERSIDAD TECNOLÓGICA</li>
            <li class="hover:text-primary"><span class="text-secondary font-bold">004</span> COL. INDUSTRIAL NUEVO SAN JUAN - CENTRO</li>
            <li class="hover:text-primary"><span class="text-secondary font-bold">005</span> PEDREGOSO 2A. SECCIÓN - CENTRAL DE AUTOBUSES</li>
            <li class="hover:text-primary"><span class="text-secondary font-bold">007</span> CENTRAL DE AUTOBUSES - UNIVERSIDAD TECNOLÓGICA</li>
           </ul>
        </div>
      </div>
    </div>
    <div class="w-1/2 p-8">

    </div>
    </div>
  </main>
  <Footer :isClosed="sidebarStore.closedState" /> -->

  <SideBar />
  <main
    class="min-h-screen transition-all duration-500 bg-gray-50 p-6 md:p-10"
    :class="{ 'ml-64': !sidebarStore.closedState, 'ml-28': sidebarStore.closedState }"
  >
    <div
      class="min-h-screen flex flex-row bg-white text-text-dark rounded-3xl shadow-sm border border-gray-200 p-4 md:p-8"
    >
      <!-- Columna izquierda -->
      <div class="w-1/2 flex items-baseline flex-col p-8 bg-white">

        <input
          type="text"
          placeholder="Busca una ruta..."
          class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary mb-4"
          v-model="search"
        />

        <div class="w-full h-128 bg-white rounded-lg flex items-baseline justify-baseline text-black flex-col gap-10">
          <div class="text-2xl p-5 text-primary">Rutas Sugeridas</div>


          <div class="w-full h-128 bg-white rounded-lg p-5 overflow-y-auto">
            <ul>

              <li v-for="route in filteredRoutes" :key="route" class="hover:text-primary">
                <span>{{ route }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Columna derecha -->
      <div class="w-1/2 p-8 bg-gray-400">
        <!-- Aquí van las rutas en el mapa toilet -->
         <div class="w-full h-full bg-gray-300 rounded-lg p-5 flex items-center justify-center">
          <div class="text-2xl p-5 text-primary">[Mapa de Rutas]</div>
         </div>
      </div>
    </div>
  </main>
  <Footer :isClosed="sidebarStore.closedState" />

</template>
