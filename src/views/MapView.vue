<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import SideBar from '../components/SideBar.vue'
import Footer from '../components/Footer.vue'
import { useSidebarStore } from '@/stores/sidebarstate'

import { MglMap } from '@indoorequal/vue-maplibre-gl'
import { Map, LngLatBounds } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css';

const sidebarStore = useSidebarStore()

const search = ref('')
const routes = ref([
  'R1 - SMO - CELAYA',
  'R2 - TAMAYO',
  'R3 - SAN LORENZO',
  'R7 - EL SAUZ',
  'R8 - SAN JUAN DE LA VEGA',
  'R8B - RAMAL SJV-5 DE MAYO (RAMAL)',
  'R9 - HOSPITAL',
  'R10 - PUENTE',
  'R11 - PRESA BLANCA',
  'R11 - ESQUIROZ',
  'R12 - SAN JOSÉ',
  'R13 - LAJA',
  'R14 - ESTRADA',
  'R15 - SILVA X IGNACIO GUTIERREZ',
  'R15 - SILVA X TENOCHTITLAN',
  'R16 - ALAMOS',
  'R17 - SAN ANTONIO',
  'R18 - SAN JOSE EL NUEVO-PLANCARTE',
  'R19 - ELGUERA',
  'R20 - GASCA',
  'R21 - MOLINO DE CRESPO',
  'R22 - EL PUESTO',
  'R23 - ROQUE',
  'R24 - TENERIA',
  'R25 - PLANCARTE',
  'R26 - PUERTA DEL MONTE CELAYA',
  'R27 - SAN ELIAS',
  'R28 - ARREGUIN',
  'R29 - SAN CAYETANO',
  'R31 - REVOLUCION',
  'R32 - MONTE BLANCO',
  'R36 - LAURELES',
  'R37 - VILLAS DEL BAJÍO',
  'R37B - LAGOS',
  'R39 - QUINTANA ROO',
  'R40 - DELICIAS',
  'R41 - HOSP.MAT- CENTRO',
  'R42 - HOSP.MAT - CENTRAL',
  'R43 - ROMERAL X FOVISSSTE',
  'R44 - VILLAS DEL BAJIO',
  'R45 - LOS OLIVOS',
  'R46 - CD.INDUST - CAMPUS - CENTRAL',
  'R47 - SAN MARTIN DE CAMARGO',
  'R49 - LAS FLORES X INDUSTRIAL',
  'R50 - LAS FLORES X FOVISSSTE',
  'R51 - LA HERRADURA X IRRIGACION',
  'R52 - LA HERRADURA X TENOCHTITLAN',
  'R53 - ROMERAL X INDUSTRIAL',
  'R54 - SAN LUIS REY X IRRIGACION',
  'R54 - SAN LUIS REY X 16 DE SEPTIEMBRE',
  'R55 - YUSTIS',
  'R56 - SAN ELIAS',
  'R58 - PROGRESO',
  'R60 - PINOS',
  'R61 - INDUSTRIAL',
  'R62 - SMO - CD INDUSTRIAL',
  'R63 - UNIVERSIDADES',
  'R67 - LITTLE SAINT JAMES - CAMINO A KIRK',
])

// Computada: devuelve solo las rutas que coinciden con la búsqueda
const filteredRoutes = computed(() => {
  return routes.value.filter((route) => route.toLowerCase().includes(search.value.toLowerCase()))
})

const mapContainer = ref<HTMLDivElement | null>(null)
const map = ref<Map | null>(null)

onMounted(() => {
  map.value = new Map({
    container: mapContainer.value as HTMLDivElement,
    center: [-100.8140458, 20.521788],
    zoom: 8,
    style: 'https://tiles.openfreemap.org/styles/bright',
  })
})

const loadRoute = async (routeName: string) => {
  if (!map.value) return

  if (map.value.getSource('route-ida')) {
    map.value.removeLayer('route-ida')
    map.value.removeSource('route-ida')
  }
  if (map.value.getSource('route-regreso')) {
    map.value.removeLayer('route-regreso')
    map.value.removeSource('route-regreso')
  }

  const routeId = routeName.split(' - ')[0]
  const routeUrl = `https://raw.githubusercontent.com/RutaPay/Routes/refs/heads/main/${routeId}.geojson`

  try {
    const response = await fetch(routeUrl)
    const routeData = await response.json()

    if (map.value.loaded()) {
      addRouteToMap(routeData)
    } else {
      map.value.on('load', () => {
        addRouteToMap(routeData)
      })
    }
  } catch (error) {
    console.error('Error al cargar la ruta:', error)
  }
}

const addRouteToMap = (routeData: GeoJSON.FeatureCollection) => {
  if (!map.value) return

  const idaFeatures = routeData.features.filter((feature) =>
    feature.properties?.name?.includes('IDA'),
  )
  const regresoFeatures = routeData.features.filter((feature) =>
    feature.properties?.name?.includes('REGRESO'),
  )

  if (idaFeatures.length > 0) {
    map.value.addSource('route-ida', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: idaFeatures,
      },
    })

    map.value.addLayer({
      id: 'route-ida',
      type: 'line',
      source: 'route-ida',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#449dd1',
        'line-width': 4,
      },
    })
  }

  if (regresoFeatures.length > 0) {
    map.value.addSource('route-regreso', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: regresoFeatures,
      },
    })

    map.value.addLayer({
      id: 'route-regreso',
      type: 'line',
      source: 'route-regreso',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#052b4a',
        'line-width': 4,
        'line-dasharray': [2, 2],
      },
    })
  }

  const bounds = new LngLatBounds()
  routeData.features.forEach((feature) => {
    if (feature.geometry.type === 'LineString') {
      feature.geometry.coordinates.forEach((coord) => {
        bounds.extend(coord as [number, number])
      })
    }
  })
  map.value.fitBounds(bounds, { padding: 50 })
}
</script>

<template>
  <SideBar />
  <main
    class="min-h-screen transition-all duration-500 bg-gray-50 p-6 md:p-10"
    :class="{ 'ml-64': !sidebarStore.closedState, 'ml-28': sidebarStore.closedState }"
  >
    <div
      class="min-h-screen flex bg-white text-text-dark rounded-3xl shadow-sm border border-gray-200 p-4 md:p-8 md:flex-col xl:flex-row"
    >
      <div class="flex items-baseline flex-col p-8 bg-white sm:w-full xl:w-1/3">
        <input
          type="search"
          placeholder="Busca una ruta..."
          class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary mb-4"
          v-model="search"
        />

        <div
          class="w-full bg-white rounded-lg flex items-baseline justify-baseline text-black flex-col gap-10 pr-5"
        >
          <div class="text-2xl font-semibold mt-4 text-primary">Rutas Sugeridas</div>

          <div class="w-full h-164 bg-white rounded-lg p-6 overflow-y-auto border border-gray-300">
            <ul>
              <li
                v-for="route in filteredRoutes"
                :key="route"
                @click="loadRoute(route)"
                class="hover:text-primary"
              >
                <span>{{ route }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="p-8 bg-white md:w-full sm:h-1/3 md:h-screen xl:w-2/3 xl:max-h-screen">
        <div class="w-full h-full bg-gray-300 rounded-lg p-5 flex items-center justify-center">
          <div ref="mapContainer" class="w-full h-full rounded-lg""></div>
        </div>
      </div>
    </div>
  </main>
  <Footer :isClosed="sidebarStore.closedState" />
</template>
