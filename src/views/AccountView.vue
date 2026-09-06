<script setup lang="ts">
import SideBar from '../components/SideBar.vue'
import Footer from '../components/Footer.vue'
import { useSidebarStore } from '@/stores/sidebarstate'
import { useAuthStore } from '@/stores/auth'
import { useLogout } from '@/composables/useAuth'
import { ref, onMounted } from 'vue'

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
let currentTierKey = ref('')

switch (accType) {
  case 'User':
    currentTierKey = ref('base')
    break
  case 'Student':
    currentTierKey = ref('student')
    break
  case 'Health':
    currentTierKey = ref('health')
    break
  case 'Adult':
    currentTierKey = ref('adult')
    break
  case 'Admin':
    currentTierKey = ref('admin')
    break
}

onMounted(async () => {
  try {
    const response = await fetch('/data/benefits.json')
    const data: TiersData = await response.json()
    const tier = data[currentTierKey.value]
    if (tier) {
      selectedTier.value = tier
    }
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
    <div class="h-auto bg-white rounded-3xl shadow-sm border border-gray-200 mb-12 p-6 md:p-10">
      <h1
        class="text-3xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-5xl text-text-dark"
      >
        Mi Cuenta
      </h1>
    </div>

    <div class="flex justify-center mb-8">
      <div class="w-1/2 h-fit bg-white rounded-3xl shadow-sm border border-gray-200 p-6 md:p-10">
        <p class="text-text-dark text-2xl">Nombre:</p>
        <p class="text-primary text-xl">{{ authStore.user?.userName }}</p>
        <br />
        <p class="text-text-dark text-2xl">Email:</p>
        <p class="text-primary text-xl">{{ authStore.user?.email }}</p>
        <br />
        <p class="text-text-dark text-2xl">Teléfono:</p>
        <p class="text-primary text-xl">{{ authStore.user?.phoneNumber }}</p>
        <br />
        <p class="text-text-dark text-2xl">Fecha de Registro:</p>
        <p class="text-primary text-xl">{{ authStore.user?.createdOn }}</p>
        <div class="mt-8">
          <button
            class="bg-[#D93025] text-white py-2 px-4 rounded-lg transition-colors duration-300 cursor-pointer hover:bg-[#B1271B] disabled:opacity-50 disabled:cursor-not-allowed"
            @click="handleLogout()"
            :disabled="isLoggingOut"
          >
            <span v-if="isLoggingOut">Cerrando sesión... </span>

            <span v-else>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>

    <div class="flex justify-center mb-8" v-if="selectedTier">
      <div class="w-1/2 bg-white rounded-3xl shadow-sm border border-gray-200 p-6 md:p-10">
        <h3
          class="text-2xl font-extrabold tracking-tight leading-none md:text-3xl lg:text-4xl text-text-dark"
        >
          Estado de Cuenta -
          <span
            :class="{
              'text-primary': authStore.user?.accountType === 'User',
              'text-card-student': authStore.user?.accountType === 'Student',
              'text-card-health': authStore.user?.accountType === 'Health',
              'text-card-adult': authStore.user?.accountType === 'Adult',
            }"
          >
            {{ selectedTier?.title }}
          </span>
        </h3>
        <h5
          class="mb-6 text-lg font-bold tracking-tight leading-none md:text-xl xl:text-2xl text-text-dark y mt-8"
        >
          Beneficios:
        </h5>
        <ul class="list-disc list-inside space-y-2 mb-8">
          <li
            v-for="(benefit, index) in selectedTier?.benefits"
            :key="index"
            class="text-text-dark"
          >
            {{ benefit }}
          </li>
        </ul>
        <RouterLink
          :to="{ name: 'account-verify' }"
          class="text-primary font-bold hover:text-dark transition-all duration-200"
          v-if="authStore.user?.accountType !== 'Admin'"
        >
          Aplicar para tarjeta preferencial
        </RouterLink>
      </div>
    </div>
    <div class="flex justify-center mb-8 text-text-light" v-else>
      <p>Cargando información del plan...</p>
    </div>
  </main>
  <Footer :isClosed="sidebarStore.closedState" />
  <RouterView />
</template>
