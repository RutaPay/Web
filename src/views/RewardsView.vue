<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SideBar from '@/components/SideBar.vue'
import Footer from '@/components/Footer.vue'
import Modal from '@/components/Modal.vue'
import { useSidebarStore } from '@/stores/sidebarstate'
import { useAuthStore } from '@/stores/auth'
import { useRefreshUserData } from '@/composables/useAuth'
import { toast } from 'vue-sonner'
import { Gift, CheckCircle, Trophy, Star } from '@boxicons/vue'

const sidebarStore = useSidebarStore()
const authStore = useAuthStore()
const { handleRefreshUserData } = useRefreshUserData()

interface RewardItem {
  id: number
  title: string
  description: string
  pointsCost: number
  rewardType: string
  value: number
  isActive: boolean
}

interface UserReward {
  id: string
  rewardId: number
  title: string
  redeemedAt: string
  code: string
  isUsed: boolean
}

const rewards = ref<RewardItem[]>([])
const myRewards = ref<UserReward[]>([])
const isLoadingRewards = ref(false)
const isRedeeming = ref(false)

const isSuccessModalOpen = ref(false)
const lastRedeemedCode = ref('')
const lastRedeemedTitle = ref('')

const fetchRewards = async () => {
  isLoadingRewards.value = true
  try {
    const response = await fetch('https://localhost:7130/api/rewards', {
      credentials: 'include',
    })
    if (response.ok) {
      rewards.value = await response.json()
    }

    const myRes = await fetch('https://localhost:7130/api/rewards/my-rewards', {
      credentials: 'include',
    })
    if (myRes.ok) {
      myRewards.value = await myRes.json()
    }
  } catch (error) {
    console.error('Error fetching rewards:', error)
  } finally {
    isLoadingRewards.value = false
  }
}

const handleRedeem = async (reward: RewardItem) => {
  const currentPoints = Number(authStore.user?.points || 0)
  if (currentPoints < reward.pointsCost) {
    toast.error('Puntos Insuficientes', {
      description: `Tienes ${currentPoints} puntos y requieres ${reward.pointsCost} puntos para este beneficio.`,
    })
    return
  }

  isRedeeming.value = true
  try {
    const response = await fetch('https://localhost:7130/api/rewards/redeem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ rewardId: reward.id }),
    })

    if (response.ok) {
      const result = await response.json()
      lastRedeemedCode.value = result.couponCode
      lastRedeemedTitle.value = reward.title
      isSuccessModalOpen.value = true

      toast.success('¡Canje Exitoso!', {
        description: result.message,
      })

      await handleRefreshUserData()
      await fetchRewards()
    } else {
      const err = await response.text()
      toast.error('Error al Canjear', { description: err })
    }
  } catch (error) {
    toast.error('Error de Conexión', { description: 'No se pudo procesar el canje.' })
  } finally {
    isRedeeming.value = false
  }
}

onMounted(() => {
  fetchRewards()
})
</script>

<template>
  <SideBar />
  <main
    class="min-h-screen transition-all duration-500 bg-gray-50 p-6 md:p-10"
    :class="{ 'ml-64': !sidebarStore.closedState, 'ml-28': sidebarStore.closedState }"
  >
    <div class="h-auto bg-white rounded-3xl shadow-sm border border-gray-200 mb-8 p-6 md:p-10">
      <h1
        class="text-3xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-5xl text-text-dark"
      >
        Puntos y Recompensas
      </h1>
      <p class="text-gray-500 mt-2 text-sm md:text-base">
        Gana puntos en cada viaje y recarga, y canjéalos por saldo directo y beneficios sustentables.
      </p>
    </div>

    <!-- Banner de Puntos -->
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white rounded-3xl shadow-sm border border-gray-200 mb-8 p-6 md:p-10 gap-6"
    >
      <div>
        <h3
          class="text-2xl font-bold tracking-tight text-text-dark"
        >
          Hola, <span class="text-primary">{{ authStore.user?.userName || 'Pasajero' }}</span>!
        </h3>
        <p class="text-gray-500 text-sm mt-1">Miembro RutaPay desde: {{ authStore.user?.createdOn || '2026' }}</p>
      </div>

      <div class="flex gap-8 sm:gap-12">
        <div class="bg-primary/5 p-4 rounded-2xl border border-primary/20 text-center min-w-32">
          <p class="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Puntos Acumulados</p>
          <h3 class="text-3xl sm:text-4xl font-black text-primary">
            {{ authStore.user?.points || 0 }}
          </h3>
        </div>

        <div class="bg-gray-50 p-4 rounded-2xl border border-gray-200 text-center min-w-32">
          <p class="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Viajes Realizados</p>
          <h3 class="text-3xl sm:text-4xl font-black text-gray-800">
            Nivel 1
          </h3>
        </div>
      </div>
    </div>

    <!-- Cómo Ganar Puntos -->
    <div class="h-auto bg-white rounded-3xl shadow-sm border border-gray-200 mb-8 p-6 md:p-10">
      <h3
        class="mb-6 text-2xl font-bold tracking-tight text-text-dark"
      >
        ¿Cómo Ganar Más Puntos?
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-6 bg-gray-50 rounded-2xl border border-gray-200 hover:border-primary transition">
          <div class="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
            <Trophy class="text-2xl" />
          </div>
          <h4 class="text-lg font-bold text-gray-900 mb-1">Viaja en Transporte Público</h4>
          <p class="text-sm text-gray-600">
            Gana <strong>1 punto</strong> por cada pasaje regular ($8.00) y <strong>2 puntos</strong> con tarifa preferencial ($5.50).
          </p>
        </div>

        <div class="p-6 bg-gray-50 rounded-2xl border border-gray-200 hover:border-primary transition">
          <div class="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center mb-4">
            <Star class="text-2xl" />
          </div>
          <h4 class="text-lg font-bold text-gray-900 mb-1">Recargas Periódicas</h4>
          <p class="text-sm text-gray-600">
            Recarga tu tarjeta con $100 o más y mantén saldo suficiente para recibir bonos de lealtad cada quincena.
          </p>
        </div>

        <div class="p-6 bg-gray-50 rounded-2xl border border-gray-200 hover:border-primary transition">
          <div class="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
            <Gift class="text-2xl" />
          </div>
          <h4 class="text-lg font-bold text-gray-900 mb-1">Tarifa Preferencial</h4>
          <p class="text-sm text-gray-600">
            Acredítate como estudiante, trabajador de la salud o adulto mayor y duplica tus puntos en cada viaje.
          </p>
        </div>
      </div>
    </div>

    <!-- Catálogo de Recompensas Canjeables -->
    <div class="h-auto bg-white rounded-3xl shadow-sm border border-gray-200 mb-8 p-6 md:p-10">
      <div class="mb-8">
        <h3 class="text-2xl font-bold tracking-tight text-text-dark">
          Catálogo de Recompensas
        </h3>
        <p class="text-gray-500 text-sm mt-1">Canjea tus puntos por saldo inmediato para viajar o boletos de rifa.</p>
      </div>

      <div v-if="isLoadingRewards" class="py-12 text-center text-gray-400">
        Cargando recompensas disponibles...
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="item in rewards"
          :key="item.id"
          class="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between hover:shadow-lg hover:border-primary transition duration-300 group"
        >
          <div>
            <span class="inline-block px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary mb-3">
              {{ item.rewardType === 'Balance' ? 'Saldo Inmediato' : 'Sorteo Ecológico' }}
            </span>
            <h4 class="text-xl font-bold text-gray-900 mb-2">{{ item.title }}</h4>
            <p class="text-xs text-gray-500 mb-4">{{ item.description }}</p>
          </div>

          <div class="pt-4 border-t border-gray-100">
            <div class="flex justify-between items-center mb-4">
              <span class="text-xs text-gray-500">Costo:</span>
              <span class="text-lg font-black text-primary">{{ item.pointsCost }} pts</span>
            </div>

            <button
              @click="handleRedeem(item)"
              :disabled="isRedeeming || Number(authStore.user?.points || 0) < item.pointsCost"
              class="w-full py-2.5 rounded-xl font-bold text-sm transition duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
              :class="Number(authStore.user?.points || 0) >= item.pointsCost ? 'bg-primary hover:bg-dark text-white' : 'bg-gray-100 text-gray-400'"
            >
              <CheckCircle class="text-base" />
              {{ Number(authStore.user?.points || 0) >= item.pointsCost ? 'Canjear Ahora' : 'Puntos Insuficientes' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mis Recompensas Canjeadas -->
    <div v-if="myRewards.length > 0" class="h-auto bg-white rounded-3xl shadow-sm border border-gray-200 mb-8 p-6 md:p-10">
      <h3 class="text-2xl font-bold tracking-tight text-text-dark mb-4">
        Mis Cupones y Canjes Recientes
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="mr in myRewards" :key="mr.id" class="p-4 bg-gray-50 rounded-xl border border-gray-200">
          <p class="font-bold text-gray-900 text-sm">{{ mr.title }}</p>
          <p class="text-xs text-gray-500 mt-0.5">Código: <span class="font-mono font-bold text-primary">{{ mr.code }}</span></p>
          <span class="inline-block mt-2 text-[11px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded">
            {{ mr.isUsed ? 'Aplicado a tu cuenta' : 'Listo para usar' }}
          </span>
        </div>
      </div>
    </div>

    <!-- Modal de Éxito de Canje -->
    <Modal v-model="isSuccessModalOpen" title="¡Canje Completado!">
      <div class="text-center py-4">
        <div class="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
          <CheckCircle />
        </div>
        <h4 class="text-xl font-bold text-gray-900 mb-2">{{ lastRedeemedTitle }}</h4>
        <p class="text-sm text-gray-600 mb-4">
          Tu recompensa ha sido procesada con éxito y aplicada a tu cuenta.
        </p>
        <div class="p-3 bg-gray-100 rounded-xl font-mono text-base font-bold text-primary tracking-wider">
          {{ lastRedeemedCode }}
        </div>
      </div>
      <template #footer>
        <button
          @click="isSuccessModalOpen = false"
          class="w-full py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-dark transition"
        >
          Aceptar
        </button>
      </template>
    </Modal>
  </main>
  <Footer :isClosed="sidebarStore.closedState" />
</template>
