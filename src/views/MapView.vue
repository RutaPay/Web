<script setup lang="ts">
import { ref, shallowRef, computed, onMounted, onBeforeUnmount } from 'vue'
import { toast } from 'vue-sonner'
import SideBar from '../components/SideBar.vue'
import Footer from '../components/Footer.vue'
import { useSidebarStore } from '@/stores/sidebarstate'

import mapboxgl from 'mapbox-gl'
import type GeoJSON from 'geojson'
import 'mapbox-gl/dist/mapbox-gl.css'

const sidebarStore = useSidebarStore()

const ROUTES_BASE_URL = 'https://raw.githubusercontent.com/RutaPay/Routes/refs/heads/main'
const STOPS_SOURCE_ID = 'route-stops'
const STOPS_LAYER_ID = 'route-stops-layer'

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
// shallowRef: Mapbox no debe volverse reactivo (evita errores de tipos y coste extra).
const map = shallowRef<mapboxgl.Map | null>(null)
let mapReady: Promise<void> = Promise.resolve()

// --- Paradas ---
const selectedRoute = ref('')
const currentRouteId = ref('')
const stopsVisible = ref(false)
const stopsLoading = ref(false)
const stopsData = ref<GeoJSON.FeatureCollection | null>(null)
const stopsCount = computed(() => stopsData.value?.features.length ?? 0)

// Caché por ruta: null = la ruta todavía no tiene archivo _P.geojson publicado.
const stopsCache = new Map<string, GeoJSON.FeatureCollection | null>()
let stopsPopup: mapboxgl.Popup | null = null
let loadToken = 0

onMounted(() => {
  const instance = new mapboxgl.Map({
    accessToken: import.meta.env.VITE_MAPBOX_API_KEY,
    container: mapContainer.value as HTMLDivElement,
    center: [-100.8140458, 20.521788],
    zoom: 12,
    style: 'mapbox://styles/mapbox/standard',
  })

  map.value = instance
  mapReady = new Promise<void>((resolve) => {
    if (instance.loaded()) {
      resolve()
      return
    }
    instance.once('load', () => resolve())
  })
})

onBeforeUnmount(() => {
  closeStopsPopup()
  map.value?.remove()
  map.value = null
})

/* -------------------------------------------------------------------------- */
/* Rutas                                                                      */
/* -------------------------------------------------------------------------- */

const removeRouteLayers = () => {
  if (!map.value) return
  if (map.value.getLayer('route-ida')) map.value.removeLayer('route-ida')
  if (map.value.getSource('route-ida')) map.value.removeSource('route-ida')
  if (map.value.getLayer('route-regreso')) map.value.removeLayer('route-regreso')
  if (map.value.getSource('route-regreso')) map.value.removeSource('route-regreso')
}

const loadRoute = async (routeName: string) => {
  if (!map.value) return

  const routeId = routeName.split(' - ')[0] ?? ''
  selectedRoute.value = routeName
  currentRouteId.value = routeId
  const token = ++loadToken
  closeStopsPopup()
  removeStopsLayer()
  stopsData.value = null
  removeRouteLayers()

  await mapReady
  if (token !== loadToken) return

  try {
    const response = await fetch(`${ROUTES_BASE_URL}/${routeId}.geojson`)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const routeData = (await response.json()) as GeoJSON.FeatureCollection
    if (token !== loadToken || !map.value) return

    addRouteToMap(routeData)

    // Si las paradas estaban visibles, se cargan las de la ruta nueva.
    if (stopsVisible.value) await showStops(false)
  } catch (error) {
    console.error('Error al cargar la ruta:', error)
    stopsVisible.value = false
    removeStopsLayer()
    toast.error('No se pudo cargar la ruta', { description: routeName })
  }
}

const clearRoute = () => {
  loadToken += 1
  selectedRoute.value = ''
  currentRouteId.value = ''
  stopsVisible.value = false
  stopsLoading.value = false
  stopsData.value = null
  closeStopsPopup()
  removeStopsLayer()
  removeRouteLayers()
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

  const bounds = new mapboxgl.LngLatBounds()
  routeData.features.forEach((feature) => {
    if (feature.geometry.type === 'LineString') {
      feature.geometry.coordinates.forEach((coord) => {
        bounds.extend(coord as [number, number])
      })
    }
  })
  map.value.fitBounds(bounds, { padding: 50 })
  bringStopsToFront()
}

/* -------------------------------------------------------------------------- */
/* Paradas                                                                    */
/* -------------------------------------------------------------------------- */

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

const escapeHtml = (value: unknown) =>
  String(value ?? '').replace(/[&<>"']/g, (character) => HTML_ESCAPES[character] ?? character)

// "PO_001_Cruz Roja_I" -> "Cruz Roja"
const formatStopName = (raw: string) =>
  raw
    .replace(/^[A-Za-z]{2,4}_/, '')
    .replace(/^\d+_/, '')
    .replace(/_[IR]$/i, '')
    .replace(/_/g, ' ')
    .trim()

const formatSentido = (sentido?: string) => {
  if (!sentido) return ''
  const values = sentido.split(',').map((value) => value.trim().toUpperCase())
  const hasIda = values.includes('IDA')
  const hasRegreso = values.includes('REGRESO')
  if (hasIda && hasRegreso) return 'Ida y regreso'
  if (hasIda) return 'Ida'
  if (hasRegreso) return 'Regreso'
  return sentido
}

const buildStopPopupHtml = (properties: Record<string, unknown>) => {
  const name = formatStopName(String(properties.nombre ?? 'Parada'))
  const colonia = String(properties.colonia ?? '').trim()
  const sentido = formatSentido(properties.sentido ? String(properties.sentido) : undefined)

  const lines = [
    `<div style="font-weight:600;font-size:13px;color:#052b4a;line-height:1.3;">${escapeHtml(name)}</div>`,
  ]
  if (colonia) {
    lines.push(
      `<div style="margin-top:2px;font-size:11px;color:#707070;">${escapeHtml(colonia)}</div>`,
    )
  }
  if (sentido) {
    lines.push(
      `<div style="margin-top:4px;font-size:11px;font-weight:600;color:#449dd1;">Sentido: ${escapeHtml(sentido)}</div>`,
    )
  }

  return `<div style="font-family:'Lexend',sans-serif;padding:2px 2px 0;">${lines.join('')}</div>`
}

const fetchStops = async (routeId: string): Promise<GeoJSON.FeatureCollection | null> => {
  if (stopsCache.has(routeId)) return stopsCache.get(routeId) ?? null

  try {
    const response = await fetch(`${ROUTES_BASE_URL}/${routeId}_P.geojson`)
    if (!response.ok) {
      stopsCache.set(routeId, null)
      return null
    }

    const data = (await response.json()) as GeoJSON.FeatureCollection
    const stops: GeoJSON.FeatureCollection = {
      type: 'FeatureCollection',
      features: (data.features ?? []).filter((feature) => feature.geometry?.type === 'Point'),
    }

    stopsCache.set(routeId, stops)
    return stops
  } catch (error) {
    console.error('Error al cargar las paradas:', error)
    return null
  }
}

const handleStopsMouseEnter = () => {
  if (map.value) map.value.getCanvas().style.cursor = 'pointer'
}

const handleStopsMouseLeave = () => {
  if (map.value) map.value.getCanvas().style.cursor = ''
}

const closeStopsPopup = () => {
  stopsPopup?.remove()
  stopsPopup = null
}

const handleStopsClick = (event: mapboxgl.MapMouseEvent) => {
  const instance = map.value
  const feature = event.features?.[0]
  if (!instance || !feature) return

  closeStopsPopup()
  stopsPopup = new mapboxgl.Popup({ closeButton: true, offset: 12, maxWidth: '260px' })
    .setLngLat(event.lngLat)
    .setHTML(buildStopPopupHtml(feature.properties ?? {}))
    .addTo(instance)
}

const removeStopsLayer = () => {
  const instance = map.value
  if (!instance) return

  if (instance.getLayer(STOPS_LAYER_ID)) {
    instance.off('mouseenter', STOPS_LAYER_ID, handleStopsMouseEnter)
    instance.off('mouseleave', STOPS_LAYER_ID, handleStopsMouseLeave)
    instance.off('click', STOPS_LAYER_ID, handleStopsClick)
    instance.removeLayer(STOPS_LAYER_ID)
  }
  if (instance.getSource(STOPS_SOURCE_ID)) instance.removeSource(STOPS_SOURCE_ID)
}

const addStopsLayer = () => {
  const instance = map.value
  const data = stopsData.value
  if (!instance || !data || data.features.length === 0) return

  const source = instance.getSource<mapboxgl.GeoJSONSource>(STOPS_SOURCE_ID)
  if (source) {
    source.setData(data)
    return
  }

  instance.addSource(STOPS_SOURCE_ID, { type: 'geojson', data })
  instance.addLayer({
    id: STOPS_LAYER_ID,
    type: 'circle',
    source: STOPS_SOURCE_ID,
    paint: {
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 10, 4, 14, 6, 17, 9],
      'circle-color': '#449dd1',
      'circle-stroke-color': '#ffffff',
      'circle-stroke-width': ['interpolate', ['linear'], ['zoom'], 10, 1.5, 16, 3],
      'circle-opacity': 0.95,
    },
  })

  instance.on('mouseenter', STOPS_LAYER_ID, handleStopsMouseEnter)
  instance.on('mouseleave', STOPS_LAYER_ID, handleStopsMouseLeave)
  instance.on('click', STOPS_LAYER_ID, handleStopsClick)
}

const bringStopsToFront = () => {
  if (!map.value) return
  if (map.value.getLayer(STOPS_LAYER_ID)) map.value.moveLayer(STOPS_LAYER_ID)
}

const showStops = async (notify = true) => {
  const routeId = currentRouteId.value
  if (!routeId) {
    if (notify) toast.info('Selecciona una ruta para ver sus paradas')
    return
  }

  const token = loadToken
  stopsLoading.value = true
  try {
    const data = await fetchStops(routeId)
    if (token !== loadToken) return

    stopsData.value = data

    if (!data || data.features.length === 0) {
      stopsVisible.value = false
      removeStopsLayer()
      if (notify) {
        toast.info(`La ruta ${routeId} todavía no tiene paradas publicadas`)
      }
      return
    }

    addStopsLayer()
    bringStopsToFront()
  } finally {
    if (token === loadToken) stopsLoading.value = false
  }
}

const toggleStops = () => {
  if (stopsVisible.value) {
    stopsVisible.value = false
    closeStopsPopup()
    removeStopsLayer()
    return
  }

  if (!currentRouteId.value) {
    toast.info('Selecciona una ruta para ver sus paradas')
    return
  }

  stopsVisible.value = true
  void showStops()
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
                class="cursor-pointer rounded-md px-2 py-1 transition-colors hover:text-primary"
                :class="{ 'bg-primary/10 font-semibold text-primary': selectedRoute === route }"
              >
                <span>{{ route }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div
          v-if="currentRouteId"
          class="mt-6 w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
          aria-live="polite"
        >
          <div class="flex items-center gap-3">
            <svg
              aria-hidden="true"
              class="h-5 w-5 shrink-0 text-[#449dd1]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"
              />
            </svg>
            <span class="min-w-0 flex-1 truncate text-sm font-bold text-[#052b4a]">
              {{ selectedRoute }}
            </span>
            <button
              type="button"
              @click="clearRoute"
              aria-label="Quitar ruta activa"
              class="shrink-0 rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-[#052b4a] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <svg aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="m6 6 12 12M18 6 6 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>

          <div class="mt-1 flex items-center gap-3 pl-8 text-[10px] font-semibold text-[#052b4a]">
            <span class="inline-flex items-center gap-1">
              <span class="h-1 w-5 rounded-full bg-[#449dd1]"></span>
              IDA
            </span>
            <span class="inline-flex items-center gap-1">
              <span class="h-1 w-5 rounded-full bg-[#052b4a]"></span>
              REGRESO
            </span>
          </div>

          <button
            type="button"
            @click="toggleStops"
            :disabled="stopsLoading"
            :aria-pressed="stopsVisible"
            class="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-semibold text-[#052b4a] transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
          >
            <svg
              aria-hidden="true"
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"
              />
            </svg>
            <span>
              {{
                stopsLoading
                  ? 'Cargando paradas…'
                  : stopsVisible
                    ? 'Ocultar paradas'
                    : 'Mostrar paradas'
              }}
            </span>
            <span
              v-if="stopsVisible && stopsCount > 0"
              class="rounded-full bg-[#052b4a]/10 px-2 py-0.5 text-xs leading-none"
            >
              {{ stopsCount }}
            </span>
          </button>
        </div>
      </div>

      <div class="p-8 bg-white md:w-full sm:h-1/3 md:h-screen xl:w-2/3 xl:max-h-screen">
        <div class="w-full h-full bg-gray-300 rounded-lg p-5 flex items-center justify-center">
          <!-- El inicio del mapa y para agregar elementos visuales comienza aquí. -->
          <div class="relative w-full h-full">
            <div ref="mapContainer" class="w-full h-full rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <Footer :isClosed="sidebarStore.closedState" />
</template>
