<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import SideBar from '@/components/SideBar.vue'
import Footer from '@/components/Footer.vue'
import { useSidebarStore } from '@/stores/sidebarstate'
import { toast } from 'vue-sonner'
import { CheckCircle, XCircle, User, ArrowDownUp, FileDetail, ShieldQuarter } from '@boxicons/vue'

const sidebarStore = useSidebarStore()

interface VerificationItem {
  id: string
  userId: string
  userName: string
  userEmail: string
  targetRole: string
  status: string
  reviewNotes?: string
  submittedAt: string
}

interface TransactionItem {
  id: string
  userName: string
  userEmail: string
  cardUID: string
  type: string
  amount: number
  previousBalance: number
  currentBalance: number
  status: string
  routeName?: string
  busUnitId?: string
  reference: string
  createdAt: string
}

interface UserItem {
  id: string
  userName: string
  fullName: string
  email: string
  phoneNumber: string
  accountType: string
  cardBalance: number
  points: number
}

const activeTab = ref<'verifications' | 'transactions' | 'users'>('verifications')

const verifications = ref<VerificationItem[]>([])
const transactions = ref<TransactionItem[]>([])
const users = ref<UserItem[]>([])
const isLoading = ref(false)

const pendingVerifications = computed(() => {
  return verifications.value.filter((v) => v.status === 'Pending')
})

const totalRevenue = computed(() => {
  return transactions.value
    .filter((t) => t.type === 'Recharge' && t.status === 'Completed')
    .reduce((acc, curr) => acc + curr.amount, 0)
})

const totalTrips = computed(() => {
  return transactions.value.filter((t) => t.type === 'TripPayment').length
})

const loadData = async () => {
  isLoading.value = true
  try {
    const verRes = await fetch('https://localhost:7130/api/verification/all', {
      credentials: 'include',
    })
    if (verRes.ok) {
      verifications.value = await verRes.json()
    }

    const txRes = await fetch('https://localhost:7130/api/Cards/all-transactions', {
      credentials: 'include',
    })
    if (txRes.ok) {
      transactions.value = await txRes.json()
    }

    const usrRes = await fetch('https://localhost:7130/api/account/all', {
      credentials: 'include',
    })
    if (usrRes.ok) {
      users.value = await usrRes.json()
    }
  } catch (error) {
    console.error('Error loading admin data:', error)
  } finally {
    isLoading.value = false
  }
}

const handleReview = async (id: string, decision: 'Approved' | 'Rejected') => {
  try {
    const response = await fetch(`https://localhost:7130/api/verification/${id}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        decision,
        reason: decision === 'Approved' ? 'Documentos verificados exitosamente.' : 'Documentación ilegible o no vigente.',
      }),
    })

    if (response.ok) {
      toast.success(`Solicitud ${decision === 'Approved' ? 'Aprobada' : 'Rechazada'} con éxito.`)
      await loadData()
    } else {
      toast.error('Error al procesar la revisión.')
    }
  } catch (error) {
    toast.error('Error de red al revisar la solicitud.')
  }
}

const formatDate = (isoString: string) => {
  if (!isoString) return ''
  return new Date(isoString).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <SideBar />
  <main
    class="min-h-screen transition-all duration-500 bg-gray-50 p-6 md:p-10"
    :class="{ 'ml-64': !sidebarStore.closedState, 'ml-28': sidebarStore.closedState }"
  >
    <!-- Header -->
    <div class="h-auto bg-white rounded-3xl shadow-sm border border-gray-200 mb-8 p-6 md:p-10 flex justify-between items-center flex-wrap gap-4">
      <div>
        <div class="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider mb-1">
          <ShieldQuarter class="text-xl" /> Panel de Concesionaria y Autoridad de Transporte
        </div>
        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">
          Administración RutaPay
        </h1>
        <p class="text-gray-500 text-sm mt-1">
          Supervisión de recaudación, auditoría de pasajes y validación de tarifas preferenciales.
        </p>
      </div>

      <button
        @click="loadData"
        class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition"
      >
        Actualizar Datos
      </button>
    </div>

    <!-- KPIs -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
        <span class="text-xs font-bold uppercase text-gray-500 tracking-wider">Trámites Pendientes</span>
        <div class="text-3xl sm:text-4xl font-black text-amber-600 mt-2">
          {{ pendingVerifications.length }}
        </div>
        <p class="text-xs text-gray-500 mt-1">Credenciales en espera de aprobación</p>
      </div>

      <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
        <span class="text-xs font-bold uppercase text-gray-500 tracking-wider">Recaudación Total (Recargas)</span>
        <div class="text-3xl sm:text-4xl font-black text-green-600 mt-2">
          ${{ totalRevenue.toFixed(2) }} <span class="text-xs font-medium text-gray-500">MXN</span>
        </div>
        <p class="text-xs text-gray-500 mt-1">Ingresos brutos acumulados en plataforma</p>
      </div>

      <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
        <span class="text-xs font-bold uppercase text-gray-500 tracking-wider">Viajes Auditados</span>
        <div class="text-3xl sm:text-4xl font-black text-primary mt-2">
          {{ totalTrips }}
        </div>
        <p class="text-xs text-gray-500 mt-1">Pasajes registrados a bordo de unidades</p>
      </div>
    </div>

    <!-- Pestañas de Gestión -->
    <div class="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 md:p-10 mb-8">
      <div class="flex gap-4 border-b border-gray-200 pb-4 mb-6">
        <button
          @click="activeTab = 'verifications'"
          class="pb-2 font-bold text-sm flex items-center gap-2 border-b-2 transition"
          :class="activeTab === 'verifications' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-900'"
        >
          <FileDetail class="text-lg" /> Solicitudes Preferenciales ({{ pendingVerifications.length }})
        </button>

        <button
          @click="activeTab = 'transactions'"
          class="pb-2 font-bold text-sm flex items-center gap-2 border-b-2 transition"
          :class="activeTab === 'transactions' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-900'"
        >
          <ArrowDownUp class="text-lg" /> Auditoría de Transacciones ({{ transactions.length }})
        </button>

        <button
          @click="activeTab = 'users'"
          class="pb-2 font-bold text-sm flex items-center gap-2 border-b-2 transition"
          :class="activeTab === 'users' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-900'"
        >
          <User class="text-lg" /> Padrón de Usuarios ({{ users.length }})
        </button>
      </div>

      <!-- Tab 1: Solicitudes de Verificación -->
      <div v-if="activeTab === 'verifications'">
        <div v-if="verifications.length === 0" class="text-center py-12 text-gray-400">
          No hay solicitudes de verificación registradas.
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full text-left text-sm text-gray-600">
            <thead class="bg-gray-50 text-xs uppercase font-semibold text-gray-500 border-b">
              <tr>
                <th class="py-3 px-4">Usuario</th>
                <th class="py-3 px-4">Correo</th>
                <th class="py-3 px-4">Tarifa Solicitada</th>
                <th class="py-3 px-4">Fecha de Envío</th>
                <th class="py-3 px-4">Estado</th>
                <th class="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="v in verifications" :key="v.id" class="hover:bg-gray-50">
                <td class="py-3 px-4 font-semibold text-gray-900">{{ v.userName }}</td>
                <td class="py-3 px-4 text-xs">{{ v.userEmail }}</td>
                <td class="py-3 px-4">
                  <span class="px-2.5 py-1 rounded-md text-xs font-bold uppercase"
                    :class="v.targetRole === 'Student' ? 'bg-blue-100 text-blue-700' : v.targetRole === 'Health' ? 'bg-teal-100 text-teal-700' : 'bg-purple-100 text-purple-700'">
                    {{ v.targetRole === 'Student' ? 'Estudiante' : v.targetRole === 'Health' ? 'Sector Salud' : 'Adulto Mayor' }}
                  </span>
                </td>
                <td class="py-3 px-4 text-xs">{{ formatDate(v.submittedAt) }}</td>
                <td class="py-3 px-4 text-xs font-semibold">
                  <span :class="v.status === 'Pending' ? 'text-amber-600' : v.status === 'Approved' ? 'text-green-600' : 'text-red-600'">
                    {{ v.status === 'Pending' ? 'Pendiente' : v.status === 'Approved' ? 'Aprobada' : 'Rechazada' }}
                  </span>
                </td>
                <td class="py-3 px-4 text-center">
                  <div v-if="v.status === 'Pending'" class="flex justify-center gap-2">
                    <button
                      @click="handleReview(v.id, 'Approved')"
                      class="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
                    >
                      <CheckCircle /> Aprobar
                    </button>
                    <button
                      @click="handleReview(v.id, 'Rejected')"
                      class="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-xs font-bold transition flex items-center gap-1"
                    >
                      <XCircle /> Rechazar
                    </button>
                  </div>
                  <span v-else class="text-xs text-gray-400">Atendido</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Tab 2: Auditoría de Transacciones -->
      <div v-else-if="activeTab === 'transactions'">
        <div v-if="transactions.length === 0" class="text-center py-12 text-gray-400">
          No hay transacciones registradas.
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full text-left text-sm text-gray-600">
            <thead class="bg-gray-50 text-xs uppercase font-semibold text-gray-500 border-b">
              <tr>
                <th class="py-3 px-4">Usuario</th>
                <th class="py-3 px-4">Tipo</th>
                <th class="py-3 px-4">Ruta / Unidad</th>
                <th class="py-3 px-4">Referencia</th>
                <th class="py-3 px-4">Fecha</th>
                <th class="py-3 px-4 text-right">Monto</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="t in transactions" :key="t.id" class="hover:bg-gray-50">
                <td class="py-3 px-4 font-semibold text-gray-900">{{ t.userName }}</td>
                <td class="py-3 px-4 text-xs font-bold" :class="t.type === 'Recharge' ? 'text-green-600' : 'text-blue-600'">
                  {{ t.type === 'Recharge' ? 'Recarga Saldo' : t.type === 'TripPayment' ? 'Cobro Pasaje' : 'Recompensa' }}
                </td>
                <td class="py-3 px-4 text-xs">{{ t.routeName || 'General' }} ({{ t.busUnitId || 'N/A' }})</td>
                <td class="py-3 px-4 font-mono text-xs text-gray-500">{{ t.reference }}</td>
                <td class="py-3 px-4 text-xs">{{ formatDate(t.createdAt) }}</td>
                <td class="py-3 px-4 text-right font-black" :class="t.type === 'TripPayment' ? 'text-gray-900' : 'text-green-600'">
                  {{ t.type === 'TripPayment' ? '-' : '+' }}${{ t.amount.toFixed(2) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Tab 3: Padrón de Usuarios -->
      <div v-else-if="activeTab === 'users'">
        <div v-if="users.length === 0" class="text-center py-12 text-gray-400">
          No hay usuarios registrados.
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full text-left text-sm text-gray-600">
            <thead class="bg-gray-50 text-xs uppercase font-semibold text-gray-500 border-b">
              <tr>
                <th class="py-3 px-4">Nombre Completo</th>
                <th class="py-3 px-4">Correo</th>
                <th class="py-3 px-4">Tipo de Cuenta</th>
                <th class="py-3 px-4">Saldo Tarjeta</th>
                <th class="py-3 px-4 text-right">Puntos</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="u in users" :key="u.id" class="hover:bg-gray-50">
                <td class="py-3 px-4 font-semibold text-gray-900">{{ u.fullName || u.userName }}</td>
                <td class="py-3 px-4 text-xs">{{ u.email }}</td>
                <td class="py-3 px-4 text-xs font-bold text-primary">{{ u.accountType }}</td>
                <td class="py-3 px-4 text-sm font-bold text-gray-900">${{ u.cardBalance.toFixed(2) }}</td>
                <td class="py-3 px-4 text-right text-sm font-bold text-primary">{{ u.points }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
  <Footer :isClosed="sidebarStore.closedState" />
</template>
