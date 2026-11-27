<script setup lang="ts">
import SideBar from '../components/SideBar.vue'
import Footer from '../components/Footer.vue'
import { useSidebarStore } from '@/stores/sidebarstate'
import { useAuthStore } from '@/stores/auth'
import { useLogout } from '@/composables/useAuth'
import { computed, ref, onMounted } from 'vue'
import { CreditCardAlt, CryptoCoin, DollarCircle, Gift, HeadphoneMic } from '@boxicons/vue'

const sidebarStore = useSidebarStore()
const authStore = useAuthStore()
const { handleLogout, isLoggingOut } = useLogout()

const accType = authStore.user?.accountType

interface TierInfo {
  title: string
  benefits: string[]
}

interface TiersData {
  [key: string]: TierInfo
}

const selectedTier = ref<TierInfo | null>(null)
const currentTierKey = ref('')

const bannerColor = computed(() => {
  switch (authStore.user?.accountType) {
    case 'Student':
      return '#22DD6D'
    case 'Health':
      return '#F87171'
    case 'Adult':
      return '#CA8A04'
    case 'User':
    case 'Admin':
    case 'Driver':
    default:
      return '#449DD1'
  }
})

const userInitials = computed(() => {
  const firstName = authStore.user?.fullName.trim().split(/\s+/)[0] ?? ''
  const firstLastName = authStore.user?.lastNames.trim().split(/\s+/)[0] ?? ''
  const initials = `${firstName[0] ?? ''}${firstLastName[0] ?? ''}`.toUpperCase()
  return initials || 'U'
})

switch (accType) {
  case 'User':
    currentTierKey.value = 'base'
    break
  case 'Student':
    currentTierKey.value = 'student'
    break
  case 'Health':
    currentTierKey.value = 'health'
    break
  case 'Adult':
    currentTierKey.value = 'adult'
    break
  case 'Admin':
    currentTierKey.value = 'admin'
    break
}

onMounted(async () => {
  try {
    const response = await fetch('/data/benefits.json')
    const data: TiersData = await response.json()
    const tier = data[currentTierKey.value]
    if (tier) selectedTier.value = tier
  } catch (error) {
    console.error('Error loading account benefits:', error)
  }
})
</script>

<template>
  <SideBar />
  <main
    class="min-h-screen transition-all duration-500 bg-gray-50 p-6 md:p-10"
    :class="{ 'ml-64': !sidebarStore.closedState, 'ml-28': sidebarStore.closedState }"
  >
    <div class="max-w-4xl mx-auto flex flex-col gap-8">
      <div class="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="h-48 md:h-64" :style="{ backgroundColor: bannerColor }">
        </div>

        <div class="px-6 pb-8 md:px-10">
          <div class="flex justify-center -mt-16 relative z-10">
            <div
              class="w-32 h-32 rounded-full bg-black/40 flex items-center justify-center shadow-sm border-4 border-white"
            >
              <span class="text-4xl font-bold text-white">{{ userInitials }}</span>
            </div>
          </div>

          <div class="mt-4 text-center">
            <h2 class="text-3xl font-extrabold text-text-dark">
              {{ authStore.user?.fullName || 'Usuario' }} {{ authStore.user?.lastNames || '' }}
            </h2>
            <p class="text-gray-500 text-lg mt-1">Usuario de RutaPay Celaya</p>
            <p class="text-gray-400 text-sm mt-1">
              {{ authStore.user?.email }} • {{ authStore.user?.phoneNumber }}
            </p>
          </div>

          <div
            class="mt-8 flex flex-col md:flex-row justify-center items-center gap-4 text-sm bg-blue-50/50 py-3 px-6 rounded-xl border border-blue-100"
          >
            <span class="text-gray-600">
              Miembro desde:
              <span class="font-bold">{{ authStore.user?.createdOn || '09/09/2026' }}</span></span
            >
            <span class="hidden md:block text-gray-300">|</span>
            <span class="text-gray-600"
              >Estado: <span class="text-green-500 font-bold">● Activa</span></span
            >
          </div>

          <div class="mt-10" v-if="selectedTier">
            <h3 class="text-xl font-bold text-center text-text-dark mb-8">
              Mis Beneficios -
              <span
                :class="{
                  'text-primary': accType === 'User',
                  'text-card-student': accType === 'Student',
                  'text-card-health': accType === 'Health',
                  'text-card-adult': accType === 'Adult',
                  'text-dark': accType === 'Admin',
                }"
                >{{ selectedTier?.title }}</span
              >
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div
                v-for="(benefit, index) in selectedTier?.benefits"
                :key="index"
                class="flex flex-col items-center gap-3"
              >
                <div
                  class="w-14 h-14 rounded-full bg-gray-50 border border-gray-200 shadow-sm flex items-center justify-center text-gray-700 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md hover:text-primary hover:border-primary/30"
                >
                  <CreditCardAlt v-if="benefit.toLowerCase().includes('tarjeta')" />
                  <DollarCircle v-if="benefit.toLowerCase().includes('tarifa')" />
                  <CryptoCoin v-if="benefit.toLowerCase().includes('punto')" />
                  <Gift v-if="benefit.toLowerCase().includes('recompensa')" />
                  <HeadphoneMic v-if="benefit.toLowerCase().includes('soporte')" />
                </div>

                <span class="text-sm font-medium text-gray-700 max-w-35">{{ benefit }}</span>
              </div>
            </div>
          </div>

          <div class="mt-8 flex justify-center">
            <RouterLink
              :to="{ name: 'account-verify' }"
              class="text-primary font-bold hover:text-dark transition-all duration-200"
              v-if="authStore.user?.accountType !== 'Admin'"
            >
              Aplicar para tarjeta preferencial
            </RouterLink>
          </div>

          <div class="mt-12 flex justify-center">
            <button
              class="bg-[#D93025] text-white py-2.5 px-8 rounded-xl font-medium transition-colors duration-300 shadow-sm hover:bg-[#B1271B] disabled:opacity-50"
              @click="handleLogout()"
              :disabled="isLoggingOut"
            >
              {{ isLoggingOut ? 'Cerrando sesión...' : 'Cerrar Sesión' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
  <Footer />
  <RouterView />
</template>
