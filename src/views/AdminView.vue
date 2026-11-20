<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import SideBar from '@/components/SideBar.vue'
import Footer from '@/components/Footer.vue'
import Modal from '@/components/Modal.vue'
import { useSidebarStore } from '@/stores/sidebarstate'
import { toast } from 'vue-sonner'
import {
  CheckCircle,
  XCircle,
  User,
  ArrowDownUp,
  FileDetail,
  ShieldQuarter,
  DotsVertical,
  Trash,
  Edit,
  Gift,
  Plus,
  Save,
} from '@boxicons/vue'
import { API_URL } from '@/composables/constants'

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

interface RewardItem {
  id: number
  title: string
  description: string
  pointsCost: number
  rewardType: string
  value: number
  isActive: boolean
}

interface RewardForm {
  title: string
  description: string
  pointsCost: number | string
  rewardType: string
  value: number | string
  isActive: boolean
}

const activeTab = ref<'verifications' | 'transactions' | 'users' | 'rewards'>('verifications')

const verifications = ref<VerificationItem[]>([])
const transactions = ref<TransactionItem[]>([])
const users = ref<UserItem[]>([])
const rewards = ref<RewardItem[]>([])
const isLoading = ref(false)

// Menú de acciones (tres puntos) del padrón de usuarios.
const menuUser = ref<UserItem | null>(null)
const menuPosition = ref({ top: 0, left: 0 })

// Confirmación para eliminar un usuario.
const isDeleteModalOpen = ref(false)
const userToDelete = ref<UserItem | null>(null)
const isDeleting = ref(false)

// --- Gestión del catálogo de recompensas ---
const emptyRewardForm = (): RewardForm => ({
  title: '',
  description: '',
  pointsCost: 0,
  rewardType: 'Balance',
  value: 0,
  isActive: true,
})

const rewardForm = ref<RewardForm>(emptyRewardForm())
const rewardFormErrors = ref<{ title?: string; pointsCost?: string; value?: string }>({})
const isRewardModalOpen = ref(false)
const rewardToEdit = ref<RewardItem | null>(null)
const isSavingReward = ref(false)

const isDeleteRewardModalOpen = ref(false)
const rewardToDelete = ref<RewardItem | null>(null)
const isDeletingReward = ref(false)

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
    const verRes = await fetch(`${API_URL}/api/verification/all`, {
      credentials: 'include',
    })
    if (verRes.ok) {
      verifications.value = await verRes.json()
    }

    const txRes = await fetch(`${API_URL}/api/Cards/all-transactions`, {
      credentials: 'include',
    })
    if (txRes.ok) {
      transactions.value = await txRes.json()
    }

    const usrRes = await fetch(`${API_URL}/api/account/all`, {
      credentials: 'include',
    })
    if (usrRes.ok) {
      users.value = await usrRes.json()
    }

    const rewRes = await fetch(`${API_URL}/api/rewards/all`, {
      credentials: 'include',
    })
    if (rewRes.ok) {
      rewards.value = await rewRes.json()
    }
  } catch (error) {
    console.error('Error loading admin data:', error)
  } finally {
    isLoading.value = false
  }
}

const handleReview = async (id: string, decision: 'Approved' | 'Rejected') => {
  try {
    const response = await fetch(`${API_URL}/api/verification/${id}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        decision,
        reason:
          decision === 'Approved'
            ? 'Documentos verificados exitosamente.'
            : 'Documentación ilegible o no vigente.',
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

const toggleMenu = (user: UserItem, event: MouseEvent) => {
  if (menuUser.value?.id === user.id) {
    menuUser.value = null
    return
  }

  const trigger = event.currentTarget as HTMLElement
  const rect = trigger.getBoundingClientRect()
  const menuWidth = 208

  menuPosition.value = {
    top: rect.bottom + 6,
    left: Math.max(8, Math.min(rect.right - menuWidth, window.innerWidth - menuWidth - 8)),
  }

  menuUser.value = user
}

const closeMenu = () => {
  menuUser.value = null
}

const openDeleteModal = (user: UserItem) => {
  closeMenu()
  userToDelete.value = user
  isDeleteModalOpen.value = true
}

const confirmDelete = async () => {
  if (!userToDelete.value) return

  isDeleting.value = true
  try {
    const response = await fetch(`${API_URL}/api/account/${userToDelete.value.id}`, {
      method: 'DELETE',
      credentials: 'include',
    })

    if (response.ok) {
      const data = await response.json().catch(() => null)
      toast.success(data?.message ?? 'Usuario eliminado correctamente.')
      isDeleteModalOpen.value = false
      userToDelete.value = null
      await loadData()
    } else {
      let message = 'No se pudo eliminar el usuario.'
      try {
        const data = await response.json()
        message = data?.message ?? data?.title ?? message
      } catch {
        // La respuesta de error no traía cuerpo JSON.
      }
      toast.error(message)
    }
  } catch (error) {
    toast.error('Error de red al eliminar el usuario.')
  } finally {
    isDeleting.value = false
  }
}

const rewardTypeLabel = (type: string) => {
  switch (type) {
    case 'Balance':
      return 'Saldo'
    case 'Raffle':
      return 'Sorteo'
    case 'Discount':
      return 'Descuento'
    case 'TripPass':
      return 'Pase de viaje'
    default:
      return type
  }
}

const formatRewardValue = (value: number) => (value > 0 ? `$${value.toFixed(2)}` : '—')

const openCreateReward = () => {
  rewardToEdit.value = null
  rewardForm.value = emptyRewardForm()
  rewardFormErrors.value = {}
  isRewardModalOpen.value = true
}

const openEditReward = (reward: RewardItem) => {
  rewardToEdit.value = reward
  rewardForm.value = {
    title: reward.title,
    description: reward.description,
    pointsCost: reward.pointsCost,
    rewardType: reward.rewardType,
    value: reward.value,
    isActive: reward.isActive,
  }
  rewardFormErrors.value = {}
  isRewardModalOpen.value = true
}

const validateRewardForm = () => {
  const errors: { title?: string; pointsCost?: string; value?: string } = {}

  if (!rewardForm.value.title.trim()) {
    errors.title = 'El título es obligatorio.'
  }

  const pointsCost = Number(rewardForm.value.pointsCost)
  if (!Number.isFinite(pointsCost) || pointsCost < 0) {
    errors.pointsCost = 'Ingresa un costo en puntos válido (0 o más).'
  }

  const value = Number(rewardForm.value.value)
  if (!Number.isFinite(value) || value < 0) {
    errors.value = 'Ingresa un valor válido (0 o más).'
  }

  rewardFormErrors.value = errors
  return Object.keys(errors).length === 0
}

const saveReward = async () => {
  if (!validateRewardForm()) return

  isSavingReward.value = true
  try {
    const payload = {
      title: rewardForm.value.title.trim(),
      description: rewardForm.value.description.trim(),
      pointsCost: Number(rewardForm.value.pointsCost),
      rewardType: rewardForm.value.rewardType,
      value: Number(rewardForm.value.value),
      isActive: rewardForm.value.isActive,
    }

    const editId = rewardToEdit.value?.id
    const isEdit = editId != null

    const response = await fetch(
      isEdit ? `${API_URL}/api/rewards/${editId}` : `${API_URL}/api/rewards`,
      {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      },
    )

    if (response.ok) {
      toast.success(isEdit ? 'Recompensa actualizada.' : 'Recompensa creada.')
      isRewardModalOpen.value = false
      await loadData()
    } else {
      let message = 'No se pudo guardar la recompensa.'
      try {
        const data = await response.json()
        message = data?.message ?? data?.title ?? message
      } catch {
        // La respuesta de error no traía cuerpo JSON.
      }
      toast.error(message)
    }
  } catch (error) {
    toast.error('Error de red al guardar la recompensa.')
  } finally {
    isSavingReward.value = false
  }
}

const openDeleteRewardModal = (reward: RewardItem) => {
  rewardToDelete.value = reward
  isDeleteRewardModalOpen.value = true
}

const confirmDeleteReward = async () => {
  if (!rewardToDelete.value) return

  isDeletingReward.value = true
  try {
    const response = await fetch(`${API_URL}/api/rewards/${rewardToDelete.value.id}`, {
      method: 'DELETE',
      credentials: 'include',
    })

    if (response.ok) {
      const data = await response.json().catch(() => null)
      toast.success(data?.message ?? 'Recompensa eliminada.')
      isDeleteRewardModalOpen.value = false
      rewardToDelete.value = null
      await loadData()
    } else {
      let message = 'No se pudo eliminar la recompensa.'
      try {
        const data = await response.json()
        message = data?.message ?? data?.title ?? message
      } catch {
        // La respuesta de error no traía cuerpo JSON.
      }
      toast.error(message)
    }
  } catch (error) {
    toast.error('Error de red al eliminar la recompensa.')
  } finally {
    isDeletingReward.value = false
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
  document.addEventListener('click', closeMenu)
})

onUnmounted(() => {
  document.removeEventListener('click', closeMenu)
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
        <div
          class="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider mb-1"
        >
          <ShieldQuarter class="text-xl" /> Panel de Concesionaria y Autoridad de Transporte
        </div>
        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">Administración RutaPay</h1>
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
        <span class="text-xs font-bold uppercase text-gray-500 tracking-wider"
          >Trámites Pendientes</span
        >
        <div class="text-3xl sm:text-4xl font-black text-amber-600 mt-2">
          {{ pendingVerifications.length }}
        </div>
        <p class="text-xs text-gray-500 mt-1">Credenciales en espera de aprobación</p>
      </div>

      <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
        <span class="text-xs font-bold uppercase text-gray-500 tracking-wider"
          >Recaudación Total (Recargas)</span
        >
        <div class="text-3xl sm:text-4xl font-black text-green-600 mt-2">
          ${{ totalRevenue.toFixed(2) }} <span class="text-xs font-medium text-gray-500">MXN</span>
        </div>
        <p class="text-xs text-gray-500 mt-1">Ingresos brutos acumulados en plataforma</p>
      </div>

      <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
        <span class="text-xs font-bold uppercase text-gray-500 tracking-wider"
          >Viajes Auditados</span
        >
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
          :class="
            activeTab === 'verifications'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          "
        >
          <FileDetail class="text-lg" /> Solicitudes Preferenciales ({{
            pendingVerifications.length
          }})
        </button>

        <button
          @click="activeTab = 'transactions'"
          class="pb-2 font-bold text-sm flex items-center gap-2 border-b-2 transition"
          :class="
            activeTab === 'transactions'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          "
        >
          <ArrowDownUp class="text-lg" /> Auditoría de Transacciones ({{ transactions.length }})
        </button>

        <button
          @click="activeTab = 'users'"
          class="pb-2 font-bold text-sm flex items-center gap-2 border-b-2 transition"
          :class="
            activeTab === 'users'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          "
        >
          <User class="text-lg" /> Padrón de Usuarios ({{ users.length }})
        </button>

        <button
          @click="activeTab = 'rewards'"
          class="pb-2 font-bold text-sm flex items-center gap-2 border-b-2 transition"
          :class="
            activeTab === 'rewards'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          "
        >
          <Gift class="text-lg" /> Recompensas ({{ rewards.length }})
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
                  <span
                    class="px-2.5 py-1 rounded-md text-xs font-bold uppercase"
                    :class="
                      v.targetRole === 'Student'
                        ? 'bg-card-student/10 text-card-student'
                        : v.targetRole === 'Health'
                          ? 'bg-card-health/10 text-card-health'
                          : 'bg-card-adult/10 text-card-adult'
                    "
                  >
                    {{
                      v.targetRole === 'Student'
                        ? 'Estudiante'
                        : v.targetRole === 'Health'
                          ? 'Sector Salud'
                          : 'Adulto Mayor'
                    }}
                  </span>
                </td>
                <td class="py-3 px-4 text-xs">{{ formatDate(v.submittedAt) }}</td>
                <td class="py-3 px-4 text-xs font-semibold">
                  <span
                    :class="
                      v.status === 'Pending'
                        ? 'text-amber-600'
                        : v.status === 'Approved'
                          ? 'text-green-600'
                          : 'text-red-600'
                    "
                  >
                    {{
                      v.status === 'Pending'
                        ? 'Pendiente'
                        : v.status === 'Approved'
                          ? 'Aprobada'
                          : 'Rechazada'
                    }}
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
                <td
                  class="py-3 px-4 text-xs font-bold"
                  :class="t.type === 'Recharge' ? 'text-green-600' : 'text-blue-600'"
                >
                  {{
                    t.type === 'Recharge'
                      ? 'Recarga Saldo'
                      : t.type === 'TripPayment'
                        ? 'Cobro Pasaje'
                        : 'Recompensa'
                  }}
                </td>
                <td class="py-3 px-4 text-xs">
                  {{ t.routeName || 'General' }} ({{ t.busUnitId || 'N/A' }})
                </td>
                <td class="py-3 px-4 font-mono text-xs text-gray-500">{{ t.reference }}</td>
                <td class="py-3 px-4 text-xs">{{ formatDate(t.createdAt) }}</td>
                <td
                  class="py-3 px-4 text-right font-black"
                  :class="t.type === 'TripPayment' ? 'text-gray-900' : 'text-green-600'"
                >
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
                <th class="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="u in users" :key="u.id" class="hover:bg-gray-50">
                <td class="py-3 px-4 font-semibold text-gray-900">
                  {{ u.fullName || u.userName }}
                </td>
                <td class="py-3 px-4 text-xs">{{ u.email }}</td>
                <td class="py-3 px-4 text-xs font-bold text-primary">{{ u.accountType }}</td>
                <td class="py-3 px-4 text-sm font-bold text-gray-900">
                  ${{ u.cardBalance.toFixed(2) }}
                </td>
                <td class="py-3 px-4 text-right text-sm font-bold text-primary">{{ u.points }}</td>
                <td class="py-3 px-4 text-center">
                  <button
                    type="button"
                    aria-label="Acciones del usuario"
                    :aria-expanded="menuUser?.id === u.id"
                    class="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition"
                    @click.stop="toggleMenu(u, $event)"
                  >
                    <DotsVertical class="text-lg" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Tab 4: Catálogo de Recompensas -->
      <div v-else-if="activeTab === 'rewards'">
        <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
          <p class="text-sm text-gray-500">
            Administra el catálogo que ven los usuarios en la sección de recompensas.
          </p>
          <button
            type="button"
            class="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-dark text-white rounded-xl text-sm font-bold transition"
            @click="openCreateReward"
          >
            <Plus class="text-base" /> Nueva recompensa
          </button>
        </div>

        <div v-if="rewards.length === 0" class="text-center py-12 text-gray-400">
          No hay recompensas registradas.
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full text-left text-sm text-gray-600">
            <thead class="bg-gray-50 text-xs uppercase font-semibold text-gray-500 border-b">
              <tr>
                <th class="py-3 px-4">Recompensa</th>
                <th class="py-3 px-4">Tipo</th>
                <th class="py-3 px-4 text-right">Costo</th>
                <th class="py-3 px-4 text-right">Valor</th>
                <th class="py-3 px-4 text-center">Estado</th>
                <th class="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="r in rewards" :key="r.id" class="hover:bg-gray-50">
                <td class="py-3 px-4">
                  <p class="font-semibold text-gray-900">{{ r.title }}</p>
                  <p class="text-xs text-gray-500 max-w-md truncate">{{ r.description }}</p>
                </td>
                <td class="py-3 px-4">
                  <span
                    class="px-2.5 py-1 rounded-md text-xs font-bold uppercase bg-primary/10 text-primary"
                  >
                    {{ rewardTypeLabel(r.rewardType) }}
                  </span>
                </td>
                <td class="py-3 px-4 text-right text-sm font-bold text-gray-900">
                  {{ r.pointsCost }} pts
                </td>
                <td class="py-3 px-4 text-right text-sm font-bold text-gray-900">
                  {{ formatRewardValue(r.value) }}
                </td>
                <td class="py-3 px-4 text-center">
                  <span
                    class="text-xs font-bold"
                    :class="r.isActive ? 'text-green-600' : 'text-gray-400'"
                  >
                    {{ r.isActive ? 'Activa' : 'Inactiva' }}
                  </span>
                </td>
                <td class="py-3 px-4">
                  <div class="flex justify-center gap-1">
                    <button
                      type="button"
                      aria-label="Editar recompensa"
                      class="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition"
                      @click="openEditReward(r)"
                    >
                      <Edit class="text-lg" />
                    </button>
                    <button
                      type="button"
                      aria-label="Eliminar recompensa"
                      class="p-2 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 transition"
                      @click="openDeleteRewardModal(r)"
                    >
                      <Trash class="text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>

  <div
    v-if="menuUser"
    class="fixed z-50 w-52 bg-white border border-gray-200 rounded-xl shadow-lg py-1"
    :style="{ top: `${menuPosition.top}px`, left: `${menuPosition.left}px` }"
    @click.stop
  >
    <button
      type="button"
      class="w-full flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition"
      @click="openDeleteModal(menuUser)"
    >
      <Trash class="text-base" /> Eliminar usuario
    </button>
  </div>

  <!-- Confirmación para eliminar usuario -->
  <Modal v-model="isDeleteModalOpen" title="Eliminar usuario">
    <p>
      ¿Seguro que quieres eliminar la cuenta de
      <strong class="text-gray-900">{{ userToDelete?.fullName || userToDelete?.userName }}</strong>
      (<span>{{ userToDelete?.email }}</span
      >)?
    </p>
    <p class="mt-3 text-sm font-medium text-red-600">
      Esta acción es permanente y borrará su tarjeta, puntos, transacciones y recompensas asociadas.
    </p>

    <template #footer>
      <button
        type="button"
        class="px-5 py-2.5 font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all disabled:opacity-60"
        :disabled="isDeleting"
        @click="isDeleteModalOpen = false"
      >
        Cancelar
      </button>
      <button
        type="button"
        class="flex items-center gap-2 px-5 py-2.5 font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all disabled:opacity-60"
        :disabled="isDeleting"
        @click="confirmDelete"
      >
        <Trash /> {{ isDeleting ? 'Eliminando…' : 'Eliminar usuario' }}
      </button>
    </template>
  </Modal>

  <!-- Alta / edición de recompensa -->
  <Modal
    v-model="isRewardModalOpen"
    :title="rewardToEdit ? 'Editar recompensa' : 'Nueva recompensa'"
  >
    <form id="reward-form" class="space-y-4" @submit.prevent="saveReward">
      <div>
        <label
          class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1"
          for="reward-title"
        >
          Título
        </label>
        <input
          id="reward-title"
          v-model="rewardForm.title"
          type="text"
          maxlength="100"
          class="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-primary"
          placeholder="Ej. Saldo: $50 MXN"
        />
        <p v-if="rewardFormErrors.title" class="mt-1 text-xs font-semibold text-red-600">
          {{ rewardFormErrors.title }}
        </p>
      </div>

      <div>
        <label
          class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1"
          for="reward-description"
        >
          Descripción
        </label>
        <textarea
          id="reward-description"
          v-model="rewardForm.description"
          rows="2"
          maxlength="500"
          class="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-primary resize-none"
          placeholder="Describe el beneficio para el usuario"
        ></textarea>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1"
            for="reward-type"
          >
            Tipo
          </label>
          <select
            id="reward-type"
            v-model="rewardForm.rewardType"
            class="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-primary"
          >
            <option value="Balance">Saldo</option>
            <option value="Raffle">Sorteo</option>
            <option value="Discount">Descuento</option>
            <option value="TripPass">Pase de viaje</option>
          </select>
        </div>

        <div>
          <label
            class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1"
            for="reward-points"
          >
            Costo en puntos
          </label>
          <input
            id="reward-points"
            v-model.number="rewardForm.pointsCost"
            type="number"
            min="0"
            step="1"
            class="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-primary"
          />
          <p v-if="rewardFormErrors.pointsCost" class="mt-1 text-xs font-semibold text-red-600">
            {{ rewardFormErrors.pointsCost }}
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1"
            for="reward-value"
          >
            Valor en MXN
          </label>
          <input
            id="reward-value"
            v-model.number="rewardForm.value"
            type="number"
            min="0"
            step="0.01"
            class="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-primary"
          />
          <p v-if="rewardFormErrors.value" class="mt-1 text-xs font-semibold text-red-600">
            {{ rewardFormErrors.value }}
          </p>
        </div>

        <label class="flex items-center gap-3 sm:mt-6 cursor-pointer select-none">
          <input
            v-model="rewardForm.isActive"
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span class="text-sm font-semibold text-gray-700">Visible para los usuarios</span>
        </label>
      </div>
    </form>

    <template #footer>
      <button
        type="button"
        class="px-5 py-2.5 font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all disabled:opacity-60"
        :disabled="isSavingReward"
        @click="isRewardModalOpen = false"
      >
        Cancelar
      </button>
      <button
        type="submit"
        form="reward-form"
        class="flex items-center gap-2 px-5 py-2.5 font-semibold text-white bg-primary hover:bg-dark rounded-xl transition-all disabled:opacity-60"
        :disabled="isSavingReward"
      >
        <Save /> {{ isSavingReward ? 'Guardando…' : 'Guardar recompensa' }}
      </button>
    </template>
  </Modal>

  <!-- Confirmación para eliminar recompensa -->
  <Modal v-model="isDeleteRewardModalOpen" title="Eliminar recompensa">
    <p>
      ¿Seguro que quieres eliminar
      <strong class="text-gray-900">{{ rewardToDelete?.title }}</strong
      >?
    </p>
    <p class="mt-3 text-sm font-medium text-red-600">
      Si la recompensa ya tiene canjes registrados no se podrá borrar; en ese caso, desactívala.
    </p>

    <template #footer>
      <button
        type="button"
        class="px-5 py-2.5 font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all disabled:opacity-60"
        :disabled="isDeletingReward"
        @click="isDeleteRewardModalOpen = false"
      >
        Cancelar
      </button>
      <button
        type="button"
        class="flex items-center gap-2 px-5 py-2.5 font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all disabled:opacity-60"
        :disabled="isDeletingReward"
        @click="confirmDeleteReward"
      >
        <Trash /> {{ isDeletingReward ? 'Eliminando…' : 'Eliminar recompensa' }}
      </button>
    </template>
  </Modal>

  <Footer :isClosed="sidebarStore.closedState" />
</template>
