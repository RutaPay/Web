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

const profilePicInput = ref<HTMLInputElement | null>(null)
const bannerInput = ref<HTMLInputElement | null>(null)

const triggerProfilePicUpload = () => profilePicInput.value?.click()
const triggerBannerUpload = () => bannerInput.value?.click()

const handleFileUpload = (event: Event, type: 'profile' | 'banner') => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    console.log(`Subiendo ${type}:`, file.name)
  }
}

// Lógica para asignar un icono dinámico según el texto del beneficio
const getBenefitIcon = (benefit: string) => {
  const lowerCaseBenefit = benefit.toLowerCase()
  if (lowerCaseBenefit.includes('tarjeta')) {
    // Icono de Tarjeta de Identificación
    return '<path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />'
  }
  if (lowerCaseBenefit.includes('tarifa') || lowerCaseBenefit.includes('$')) {
    // Icono de Moneda/Dinero
    return '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />'
  }
  if (lowerCaseBenefit.includes('punto')) {
    // Icono de Estrella/Recompensa
    return '<path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.536a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />'
  }
  if (lowerCaseBenefit.includes('recompensa')) {
    // Icono de Regalo
    return '<path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />'
  }
  if (lowerCaseBenefit.includes('soporte')) {
    // Icono de Auriculares (Soporte)
    return '<path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />'
  }
  // Default: Checkmark elegante
  return '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />'
}

switch (accType) {
  case 'User': currentTierKey.value = 'base'; break
  case 'Student': currentTierKey.value = 'student'; break
  case 'Health': currentTierKey.value = 'health'; break
  case 'Adult': currentTierKey.value = 'adult'; break
  case 'Admin': currentTierKey.value = 'admin'; break
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

        <div class="group relative h-48 md:h-64 bg-gray-300 cursor-pointer overflow-hidden" @click="triggerBannerUpload">
          <img
            src="https://via.placeholder.com/1200x400"
            alt="Banner"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center border-4 border-transparent group-hover:border-blue-400">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
          <input type="file" ref="bannerInput" class="hidden" accept="image/*" @change="(e) => handleFileUpload(e, 'banner')" />
        </div>


        <div class="px-6 pb-8 md:px-10">
          <div class="flex justify-center -mt-16 relative z-10">
            <div class="group relative cursor-pointer rounded-full bg-white p-1 shadow-sm border border-gray-100 transition-colors duration-300 hover:border-blue-400" @click="triggerProfilePicUpload">
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                class="w-32 h-32 rounded-full object-cover"
              />
              <div class="absolute inset-1 bg-black/40 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300 flex items-center justify-center">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <input type="file" ref="profilePicInput" class="hidden" accept="image/*" @change="(e) => handleFileUpload(e, 'profile')" />
            </div>
          </div>

          <div class="mt-4 text-center">
            <h2 class="text-3xl font-extrabold text-text-dark">{{ authStore.user?.userName || 'Usuario' }}</h2>
            <p class="text-gray-500 text-lg mt-1">Usuario de RutaPay Celaya</p>
            <p class="text-gray-400 text-sm mt-1">{{ authStore.user?.email }} • {{ authStore.user?.phoneNumber }}</p>
          </div>

          <div class="mt-8 flex flex-col md:flex-row justify-center items-center gap-4 text-sm bg-blue-50/50 py-3 px-6 rounded-xl border border-blue-100">
            <span class="text-gray-600">📅 Miembro desde: <span class="font-bold">{{ authStore.user?.createdOn || '09/09/2026' }}</span></span>
            <span class="hidden md:block text-gray-300">|</span>
            <span class="text-gray-600">Estado: <span class="text-green-500 font-bold">● Activa</span></span>
          </div>

          <div class="mt-10" v-if="selectedTier">
            <h3 class="text-xl font-bold text-center text-text-dark mb-8">
              Mis Beneficios de {{ selectedTier?.title }}
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div v-for="(benefit, index) in selectedTier?.benefits" :key="index" class="flex flex-col items-center gap-3">


                <div class="w-14 h-14 rounded-full bg-gray-50 border border-gray-200 shadow-sm flex items-center justify-center text-gray-700 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md hover:text-blue-500 hover:border-blue-200">
                  <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" v-html="getBenefitIcon(benefit)"></svg>
                </div>

                <span class="text-sm font-medium text-gray-700 max-w-[140px]">{{ benefit }}</span>
              </div>
            </div>
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
  <Footer :isClosed="sidebarStore.closedState" />
  <RouterView />
</template>
