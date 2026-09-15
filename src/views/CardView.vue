<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import {
  PlusCircle,
  Lock,
  LockOpen,
  CheckCircle,
  ArrowDownUp,
  Trip,
  Gift,
  FileDetail,
  Printer,
  ScanBarcode,
  X,
} from '@boxicons/vue'
import SideBar from '../components/SideBar.vue'
import Footer from '../components/Footer.vue'
import { useSidebarStore } from '@/stores/sidebarstate'
import { useAuthStore } from '@/stores/auth'
import { useRefreshUserData } from '@/composables/useAuth'
import { toast } from 'vue-sonner'
import { API_URL } from '@/composables/constants'

const sidebarStore = useSidebarStore()
const authStore = useAuthStore()
const { handleRefreshUserData } = useRefreshUserData()

const selectedTransaction = ref<Transaction | null>(null)
const isReceiptModalOpen = ref(false)

interface Transaction {
  id: string
  type: string
  amount: number
  previousBalance: number
  currentBalance: number
  status: string
  routeName?: string
  busUnitId?: string
  paymentMethod?: string
  reference: string
  createdAt: string
}

const transactions = ref<Transaction[]>([])
const isLoadingTransactions = ref(false)
const selectedFilter = ref<'all' | 'Recharge' | 'TripPayment' | 'RewardRedemption'>('all')
const isTogglingStatus = ref(false)

const cardState = computed(() => authStore.user?.cardStatus || 'Active')
const isCardBlocked = computed(() => cardState.value === 'Blocked')

const formattedCardUID = computed(() => {
  const uid = authStore.user?.cardUID || 'RPAY-0000-0000'
  const cleaned = uid.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
  return cleaned.match(/.{1,4}/g)?.join(' ') || uid
})

const fetchTransactions = async () => {
  isLoadingTransactions.value = true
  try {
    const response = await fetch(`${API_URL}/api/Cards/transactions`, {
      credentials: 'include',
    })
    if (response.ok) {
      transactions.value = await response.json()
    }
  } catch (error) {
    console.error('Error fetching transactions:', error)
  } finally {
    isLoadingTransactions.value = false
  }
}

const filteredTransactions = computed(() => {
  if (selectedFilter.value === 'all') return transactions.value
  return transactions.value.filter((t) => t.type === selectedFilter.value)
})

const handleToggleStatus = async () => {
  isTogglingStatus.value = true
  try {
    const response = await fetch(`${API_URL}/api/Cards/toggle-status`, {
      method: 'POST',
      credentials: 'include',
    })
    if (response.ok) {
      const data = await response.json()
      toast.success(data.message)
      await handleRefreshUserData()
    } else {
      toast.error('No se pudo cambiar el estado de la tarjeta.')
    }
  } catch (error) {
    toast.error('Error al conectar con el servidor.')
  } finally {
    isTogglingStatus.value = false
  }
}

const formatDate = (isoString: string) => {
  if (!isoString) return 'Reciente'
  const d = new Date(isoString)
  return d.toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const openReceipt = (transaction: Transaction) => {
  selectedTransaction.value = transaction
  isReceiptModalOpen.value = true
}

const closeReceipt = () => {
  isReceiptModalOpen.value = false
  selectedTransaction.value = null
  document.body.style.overflow = ''
}

watch(isReceiptModalOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

const printReceipt = () => {
  window.print()
}

const getTariffDescription = (t: Transaction) => {
  if (t.type === 'TripPayment') {
    return t.amount <= 5.5
      ? 'Tarifa Preferencial con Subsidio (Estudiante / Salud / Adulto Mayor)'
      : 'Tarifa Ordinaria General'
  }
  if (t.type === 'Recharge') {
    return `Abono Electrónico (${t.paymentMethod || 'Tarjeta'})`
  }
  if (t.type === 'RewardRedemption') {
    return 'Canje de Puntos de Lealtad RutaPay'
  }
  return 'Operación General de Transporte'
}

const getDigitalSeal = (t: Transaction) => {
  const seed = `${t.id}-${t.reference}-${t.amount}-${t.createdAt}`
  let hash = ''
  for (let i = 0; i < seed.length; i++) {
    hash += seed.charCodeAt(i).toString(16).padStart(2, '0')
  }
  return (hash + 'E892BF309A41C6D910F4BC9281A7').substring(0, 48).toUpperCase()
}

onMounted(() => {
  fetchTransactions()
})
</script>

<template>
  <SideBar />
  <main
    class="min-h-screen transition-all duration-500 bg-gray-50 p-6 md:p-10"
    :class="{ 'ml-64': !sidebarStore.closedState, 'ml-28': sidebarStore.closedState }"
  >
    <!-- Header -->
    <div
      class="h-auto bg-white rounded-3xl shadow-sm border border-gray-200 mb-8 p-6 md:p-10 flex justify-between items-center flex-wrap gap-4"
    >
      <div>
        <h1 class="text-3xl font-extrabold tracking-tight leading-none md:text-4xl text-text-dark">
          Mi Tarjeta Digital
        </h1>
        <p class="text-gray-500 mt-2 text-sm md:text-base">
          Gestiona tu saldo, consulta tus movimientos y protege tu tarjeta ante extravíos.
        </p>
      </div>

      <!-- Estado & Botón de Bloqueo -->
      <div class="flex items-center gap-3">
        <span
          class="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
          :class="
            isCardBlocked
              ? 'bg-red-100 text-red-700 border border-red-700'
              : 'bg-green-100 text-green-700 border border-green-700'
          "
        >
          <span
            class="w-2 h-2 rounded-lg"
            :class="isCardBlocked ? 'bg-red-500' : 'bg-green-500 animate-pulse'"
          ></span>
          {{ isCardBlocked ? 'Bloqueada por Extravío' : 'Tarjeta Activa' }}
        </span>

        <button
          @click="handleToggleStatus"
          :disabled="isTogglingStatus"
          class="px-4 py-2 rounded-xl text-sm font-semibold border transition duration-300 cursor-pointer flex items-center gap-2"
          :class="
            isCardBlocked
              ? 'bg-green-600 hover:bg-green-700 text-white border-green-700'
              : 'bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 border-gray-300'
          "
        >
          <component :is="isCardBlocked ? LockOpen : Lock" class="text-lg" />
          {{ isCardBlocked ? 'Reactivar Tarjeta' : 'Bloquear Tarjeta' }}
        </button>
      </div>
    </div>

    <!-- Tarjeta Visual y Saldo -->
    <div class="h-auto bg-white rounded-3xl shadow-sm border border-gray-200 p-8 md:p-12 mb-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <!-- Visualización de la Tarjeta Física/Digital -->
        <div class="lg:col-span-6 flex justify-center">
          <div
            class="relative text-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md transform transition-all duration-300 hover:scale-102 border border-gray-700 overflow-hidden"
            :class="
              isCardBlocked
                ? 'bg-linear-to-br from-gray-900 via-red-950 to-black ring-2 ring-red-500'
                : 'bg-linear-to-br from-gray-900 via-dark to-primary/80'
            "
          >
            <!-- Watermark / Logo background -->
            <div
              class="absolute -right-8 -bottom-8 opacity-10 pointer-events-none text-9xl font-black"
            >
              RP
            </div>

            <div class="flex justify-between items-start mb-6">
              <div>
                <span class="text-xs uppercase tracking-widest text-primary font-bold"
                  >RutaPay Celaya</span
                >
                <p class="text-sm font-light opacity-75">Transporte Urbano</p>
              </div>
              <span
                class="text-xs px-2.5 py-1 rounded-md font-mono font-semibold"
                :class="
                  authStore.user?.accountType === 'Admin'
                    ? 'bg-gray-700/60 text-primary'
                    : authStore.user?.accountType === 'Student'
                      ? 'bg-card-student text-white'
                      : authStore.user?.accountType === 'Health'
                        ? 'bg-card-health text-white'
                        : authStore.user?.accountType === 'Adult'
                          ? 'bg-primary/30 text-card-adult'
                          : 'bg-gray-800 text-gray-300'
                "
              >
                {{
                  authStore.user?.accountType === 'Student'
                    ? 'Estudiante'
                    : authStore.user?.accountType === 'Health'
                      ? 'Salud'
                      : authStore.user?.accountType === 'Adult'
                        ? 'Adultos/Discapacitados'
                        : authStore.user?.accountType === 'Admin'
                          ? 'Admin'
                          : 'Ordinario'
                }}
              </span>
            </div>

            <!-- UID de la Tarjeta -->
            <div class="my-6">
              <div class="text-xs uppercase tracking-wider opacity-60 mb-1">
                Identificador NFC / Digital
              </div>
              <div class="text-xl sm:text-2xl font-mono tracking-widest font-semibold">
                {{ formattedCardUID }}
              </div>
            </div>

            <!-- Titular y Vigencia -->
            <div class="flex justify-between items-end pt-4 border-t border-white/15">
              <div>
                <div class="text-xs opacity-60 uppercase">Titular</div>
                <div class="text-base font-semibold">
                  {{ authStore.user?.fullName || authStore.user?.userName || 'Usuario RutaPay' }}
                </div>
              </div>
              <div class="text-right">
                <div class="text-xs opacity-60 uppercase">Estado</div>
                <div
                  class="text-sm font-semibold"
                  :class="isCardBlocked ? 'text-red-400' : 'text-green-400'"
                >
                  {{ isCardBlocked ? 'Bloqueada' : 'Activa' }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Indicador de Saldo y Acceso Rápido -->
        <div
          class="lg:col-span-6 flex flex-col justify-center items-center lg:items-end text-center lg:text-right"
        >
          <span class="text-xs uppercase font-bold tracking-widest text-gray-500 mb-1"
            >Saldo Disponible</span
          >
          <div class="text-5xl sm:text-6xl font-black text-gray-900 tracking-tight mb-4">
            ${{ authStore.user?.cardBalance || '0.00' }}
            <span class="text-lg font-medium text-gray-500">MXN</span>
          </div>

          <p class="text-sm text-gray-500 max-w-sm mb-6">
            Tarifa por viaje:
            <strong class="text-gray-800">{{
              authStore.user?.accountType !== 'User' && authStore.user?.accountType !== 'Admin'
                ? '$5.50 MXN (Preferencial)'
                : '$8.00 MXN'
            }}</strong
            >. Recarga en línea para nunca quedarte sin viajar.
          </p>

          <RouterLink
            :to="{ name: 'card-recharge' }"
            class="inline-flex items-center gap-2 bg-primary hover:bg-dark text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition duration-300 focus:outline-none"
          >
            <PlusCircle class="text-2xl" />
            Recargar Saldo Ahora
          </RouterLink>
        </div>
      </div>

      <!-- Accesos Directos de Recarga -->
      <div class="mt-12 pt-8 border-t border-gray-100">
        <h3 class="text-xl font-bold text-gray-900 mb-6">Recargas Rápidas</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <RouterLink
            :to="{ name: 'card-recharge' }"
            class="flex flex-col items-center justify-center p-5 bg-gray-50 hover:bg-primary/10 border border-gray-200 hover:border-primary rounded-2xl transition duration-200 group focus:outline-none"
          >
            <span class="text-2xl font-black text-gray-900 group-hover:text-primary">$50</span>
            <span class="text-xs text-gray-500 mt-1 font-medium">Recargar</span>
          </RouterLink>
          <RouterLink
            :to="{ name: 'card-recharge' }"
            class="flex flex-col items-center justify-center p-5 bg-gray-50 hover:bg-primary/10 border border-gray-200 hover:border-primary rounded-2xl transition duration-200 group focus:outline-none"
          >
            <span class="text-2xl font-black text-gray-900 group-hover:text-primary">$100</span>
            <span class="text-xs text-gray-500 mt-1 font-medium">Recargar</span>
          </RouterLink>
          <RouterLink
            :to="{ name: 'card-recharge' }"
            class="flex flex-col items-center justify-center p-5 bg-gray-50 hover:bg-primary/10 border border-gray-200 hover:border-primary rounded-2xl transition duration-200 group focus:outline-none"
          >
            <span class="text-2xl font-black text-gray-900 group-hover:text-primary">$200</span>
            <span class="text-xs text-gray-500 mt-1 font-medium">Recargar</span>
          </RouterLink>
          <RouterLink
            :to="{ name: 'card-recharge' }"
            class="flex flex-col items-center justify-center p-5 bg-primary/5 hover:bg-primary/15 border border-primary/30 rounded-2xl transition duration-200 group focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <span class="text-lg font-bold text-primary">Otro Monto</span>
            <span class="text-xs text-gray-500 mt-1 font-medium">Personalizado</span>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Historial de Movimientos y Transacciones -->
    <div class="h-auto bg-white rounded-3xl shadow-sm border border-gray-200 p-6 md:p-10 mb-8">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Historial de Transacciones</h2>
          <p class="text-sm text-gray-500">
            Consulta tus recargas, pagos de pasajes y bonificaciones.
          </p>
        </div>

        <!-- Filtros -->
        <div class="flex bg-gray-100 p-1 rounded-xl text-xs font-semibold">
          <button
            @click="selectedFilter = 'all'"
            class="px-3 py-1.5 rounded-lg transition"
            :class="
              selectedFilter === 'all'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            "
          >
            Todos
          </button>
          <button
            @click="selectedFilter = 'Recharge'"
            class="px-3 py-1.5 rounded-lg transition"
            :class="
              selectedFilter === 'Recharge'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            "
          >
            Recargas
          </button>
          <button
            @click="selectedFilter = 'TripPayment'"
            class="px-3 py-1.5 rounded-lg transition"
            :class="
              selectedFilter === 'TripPayment'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            "
          >
            Viajes
          </button>
          <button
            @click="selectedFilter = 'RewardRedemption'"
            class="px-3 py-1.5 rounded-lg transition"
            :class="
              selectedFilter === 'RewardRedemption'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            "
          >
            Recompensas
          </button>
        </div>
      </div>

      <!-- Tabla de Movimientos -->
      <div class="overflow-x-auto">
        <div v-if="isLoadingTransactions" class="py-12 text-center text-gray-400">
          Cargando movimientos...
        </div>

        <div v-else-if="filteredTransactions.length === 0" class="py-12 text-center">
          <div
            class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3 text-gray-400"
          >
            <ArrowDownUp class="text-2xl" />
          </div>
          <p class="text-gray-700 font-semibold">No se encontraron movimientos</p>
          <p class="text-xs text-gray-400 mt-1">
            Realiza una recarga o viaja en autobús para ver tus registros aquí.
          </p>
        </div>

        <table v-else class="w-full text-left text-sm text-gray-600">
          <thead
            class="bg-gray-50 text-xs uppercase font-semibold text-gray-500 border-b border-gray-200"
          >
            <tr>
              <th class="py-3 px-4">Tipo</th>
              <th class="py-3 px-4">Detalle / Ruta</th>
              <th class="py-3 px-4">Referencia</th>
              <th class="py-3 px-4">Fecha</th>
              <th class="py-3 px-4 text-right">Monto</th>
              <th class="py-3 px-4 text-center">Estado</th>
              <th class="py-3 px-4 text-center">Comprobante</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="t in filteredTransactions"
              :key="t.id"
              @click="openReceipt(t)"
              class="hover:bg-gray-50/80 transition cursor-pointer"
            >
              <td class="py-3.5 px-4 font-medium flex items-center gap-2">
                <span
                  class="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                  :class="
                    t.type === 'Recharge'
                      ? 'bg-green-100 text-green-700'
                      : t.type === 'TripPayment'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-amber-100 text-amber-700'
                  "
                >
                  <component
                    :is="
                      t.type === 'Recharge' ? PlusCircle : t.type === 'TripPayment' ? Trip : Gift
                    "
                  />
                </span>
                <span class="text-gray-900 font-semibold">
                  {{
                    t.type === 'Recharge'
                      ? 'Recarga de Saldo'
                      : t.type === 'TripPayment'
                        ? 'Cobro de Pasaje'
                        : 'Canje Recompensa'
                  }}
                </span>
              </td>
              <td class="py-3.5 px-4">
                <span v-if="t.type === 'TripPayment'"
                  >{{ t.routeName || 'Ruta Urbana' }} ({{ t.busUnitId || 'Unidad 01' }})</span
                >
                <span v-else-if="t.type === 'Recharge'"
                  >Método: {{ t.paymentMethod || 'Tarjeta' }}</span
                >
                <span v-else>Puntos RutaPay</span>
              </td>
              <td class="py-3.5 px-4 font-mono text-xs text-gray-500">{{ t.reference }}</td>
              <td class="py-3.5 px-4 text-xs">{{ formatDate(t.createdAt) }}</td>
              <td
                class="py-3.5 px-4 text-right font-bold text-base"
                :class="t.type === 'TripPayment' ? 'text-gray-800' : 'text-green-600'"
              >
                {{ t.type === 'TripPayment' ? '-' : '+' }}${{ t.amount.toFixed(2) }}
              </td>
              <td class="py-3.5 px-4 text-center">
                <span
                  class="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md bg-green-50 text-green-700"
                >
                  <CheckCircle class="text-xs" />
                  {{ t.status }}
                </span>
              </td>
              <td class="py-3.5 px-4 text-center" @click.stop>
                <button
                  @click="openReceipt(t)"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 hover:bg-primary hover:text-white text-gray-700 transition duration-200 cursor-pointer shadow-2xs"
                  title="Ver Ticket Digital"
                >
                  <FileDetail class="text-sm" />
                  <span>Ticket</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="isReceiptModalOpen && selectedTransaction"
        class="receipt-modal-overlay fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
        @click.self="closeReceipt"
      >
        <div
          id="printable-receipt"
          class="bg-white rounded-3xl shadow-2xl max-w-md w-full border border-gray-200 overflow-hidden relative transition-all duration-300 transform scale-100 my-8"
        >
          <button
            @click="closeReceipt"
            class="no-print absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition cursor-pointer z-10"
            title="Cerrar ticket"
          >
            <X class="text-xl" />
          </button>

          <div class="bg-dark text-white p-6 text-center relative overflow-hidden">
            <div class="absolute -right-6 -bottom-6 opacity-10 font-black text-7xl select-none">
              RP
            </div>
            <div class="flex items-center justify-center gap-2 mb-1">
              <span class="w-3 h-3 rounded-full bg-primary inline-block"></span>
              <span class="text-xs uppercase tracking-widest font-black text-primary"
                >RutaPay Celaya</span
              >
            </div>
            <h2 class="text-xl font-bold tracking-tight">Comprobante Oficial de Movilidad</h2>
            <p class="text-xs text-gray-300 mt-0.5">Sistema Integrado de Transporte Público</p>
            <div
              class="mt-3 inline-block px-3 py-1 rounded-full text-2xs font-semibold uppercase tracking-wider bg-white/10 text-primary border border-primary/30"
            >
              Folio: RPAY-{{ selectedTransaction.reference.toUpperCase().substring(0, 10) }}
            </div>
          </div>

          <!-- Contenido del Ticket -->
          <div class="p-6 space-y-4 text-xs sm:text-sm text-gray-700 font-sans">
            <!-- Datos del Usuario y Tarjeta -->
            <div class="grid grid-cols-2 gap-3 pb-3 border-b border-dashed border-gray-300">
              <div>
                <span class="block text-2xs uppercase tracking-wider text-gray-400 font-semibold"
                  >Titular</span
                >
                <span class="font-bold text-gray-900 block truncate">
                  {{ authStore.user?.fullName || authStore.user?.userName || 'Usuario Pasajero' }}
                </span>
              </div>
              <div>
                <span class="block text-2xs uppercase tracking-wider text-gray-400 font-semibold"
                  >Tarjeta NFC</span
                >
                <span class="font-mono font-bold text-gray-900 block text-xs">
                  {{ formattedCardUID }}
                </span>
              </div>
              <div>
                <span class="block text-2xs uppercase tracking-wider text-gray-400 font-semibold"
                  >Modalidad</span
                >
                <span class="font-semibold text-primary">
                  {{
                    authStore.user?.accountType === 'Student'
                      ? 'Tarifa Estudiante'
                      : authStore.user?.accountType === 'Health'
                        ? 'Tarifa Salud'
                        : authStore.user?.accountType === 'Adult'
                          ? 'Tarifa Adulto Mayor'
                          : 'Tarifa Ordinaria'
                  }}
                </span>
              </div>
              <div>
                <span class="block text-2xs uppercase tracking-wider text-gray-400 font-semibold"
                  >Fecha y Hora</span
                >
                <span class="font-medium text-gray-800">
                  {{ formatDate(selectedTransaction.createdAt) }}
                </span>
              </div>
            </div>

            <!-- Detalles de la Transacción -->
            <div class="py-2 border-b border-dashed border-gray-300 space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-gray-500 font-medium">Concepto:</span>
                <span class="font-bold text-gray-900">
                  {{
                    selectedTransaction.type === 'TripPayment'
                      ? 'Pago de Pasaje Urbano'
                      : selectedTransaction.type === 'Recharge'
                        ? 'Recarga de Saldo Digital'
                        : 'Canje de Recompensa'
                  }}
                </span>
              </div>

              <div
                v-if="selectedTransaction.type === 'TripPayment'"
                class="flex justify-between items-center"
              >
                <span class="text-gray-500 font-medium">Ruta / Autobús:</span>
                <span class="font-semibold text-gray-800">
                  {{ selectedTransaction.routeName || 'Ruta Urbana' }} • Unidad
                  {{ selectedTransaction.busUnitId || '01' }}
                </span>
              </div>

              <div
                v-if="selectedTransaction.type === 'TripPayment'"
                class="flex justify-between items-center"
              >
                <span class="text-gray-500 font-medium">Terminal Validador:</span>
                <span class="font-mono text-2xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded"
                  >VAL-NFC-04 (Activo)</span
                >
              </div>

              <div
                v-if="selectedTransaction.type === 'Recharge'"
                class="flex justify-between items-center"
              >
                <span class="text-gray-500 font-medium">Canal de Pago:</span>
                <span class="font-semibold text-gray-800">{{
                  selectedTransaction.paymentMethod || 'Tarjeta Digital'
                }}</span>
              </div>

              <div class="flex justify-between items-center">
                <span class="text-gray-500 font-medium">Categoría Tarifa:</span>
                <span class="text-2xs text-gray-600 max-w-[60%] text-right font-medium">
                  {{ getTariffDescription(selectedTransaction) }}
                </span>
              </div>
            </div>

            <div class="bg-gray-50 rounded-2xl p-4 space-y-2 border border-gray-100">
              <div class="flex justify-between text-xs text-gray-500">
                <span>Saldo Anterior:</span>
                <span class="font-mono"
                  >${{ selectedTransaction.previousBalance.toFixed(2) }} MXN</span
                >
              </div>
              <div
                class="flex justify-between text-base font-extrabold items-center py-1 border-y border-gray-200"
              >
                <span class="text-gray-900">
                  {{
                    selectedTransaction.type === 'TripPayment' ? 'Total Cobrado:' : 'Total Abonado:'
                  }}
                </span>
                <span
                  class="font-mono text-lg"
                  :class="
                    selectedTransaction.type === 'TripPayment' ? 'text-gray-900' : 'text-green-600'
                  "
                >
                  {{ selectedTransaction.type === 'TripPayment' ? '-' : '+' }}${{
                    selectedTransaction.amount.toFixed(2)
                  }}
                  MXN
                </span>
              </div>
              <div class="flex justify-between text-xs font-bold text-gray-800">
                <span>Saldo Nuevo en Tarjeta:</span>
                <span class="font-mono text-primary font-black"
                  >${{ selectedTransaction.currentBalance.toFixed(2) }} MXN</span
                >
              </div>
            </div>

            <div class="pt-2 text-center space-y-2">
              <div class="flex justify-center items-center gap-2 text-gray-700">
                <ScanBarcode class="text-3xl" />
                <span class="font-mono tracking-widest text-xs font-bold text-gray-800">
                  *{{ selectedTransaction.reference }}*
                </span>
              </div>

              <div class="bg-gray-50 rounded-lg p-2 text-left border border-gray-200/70">
                <span
                  class="block text-3xs uppercase font-mono font-bold text-gray-400 tracking-wider"
                >
                  Sello Digital de Seguridad
                </span>
                <p class="font-mono text-3xs text-gray-500 break-all leading-tight">
                  SHA256:{{ getDigitalSeal(selectedTransaction) }}
                </p>
              </div>

              <p class="text-3xs text-gray-400 leading-tight">
                Comprobante electrónico válido como seguro de viaje para usuario registrado en
                RutaPay Celaya.
              </p>
            </div>
          </div>

          <div class="no-print p-4 bg-gray-50 border-t border-gray-200 flex gap-3">
            <button
              @click="printReceipt"
              class="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-dark text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition duration-200 shadow-sm cursor-pointer"
            >
              <Printer class="text-lg" />
              <span>Imprimir / Guardar PDF</span>
            </button>
            <button
              @click="closeReceipt"
              class="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold text-xs sm:text-sm transition duration-200 cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <RouterView />
  </main>
  <Footer :isClosed="sidebarStore.closedState" />
</template>

<style scoped>
@media print {
  #app,
  nav,
  aside,
  header,
  footer,
  .no-print {
    display: none !important;
  }

  #printable-receipt,
  #printable-receipt * {
    visibility: visible;
  }

  /*body {
    background: #ffffff !important;
    margin: 0 !important;
    padding: 0 !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .receipt-modal-overlay {
    position: static !important;
    inset: auto !important;
    display: block !important;
    padding: 0 !important;
    background: transparent !important;
    backdrop-filter: none !important;
    overflow: visible !important;
    z-index: auto !important;
  }

  #printable-receipt {
    display: block !important;
    position: static !important;
    margin: 0 auto !important;
    width: 100% !important;
    max-width: 440px !important;
    box-shadow: none !important;
    border: 1px dashed #555555 !important;
    page-break-inside: avoid;
    break-inside: avoid;
  }*/

  #printable-receipt {
    position: absolute;
    left: 0;
    top: 0;
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 !important;
    box-shadow: none !important;
    border: 1px solid #e5e7eb !important;
  }
}
</style>
