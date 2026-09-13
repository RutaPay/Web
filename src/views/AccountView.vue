<script setup lang="ts">
import SideBar from '../components/SideBar.vue'
import Footer from '../components/Footer.vue'
import { useSidebarStore } from '@/stores/sidebarstate'
import { useAuthStore } from '@/stores/auth'
import { useLogout } from '@/composables/useAuth'
import { ref, onMounted } from 'vue'
import { CreditCardAlt, CryptoCoin, DollarCircle, Gift, Microphone } from '@boxicons/vue'

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
        <div
          class="group relative h-48 md:h-64 bg-gray-300 cursor-pointer overflow-hidden"
          @click="triggerBannerUpload"
        >
          <img
            src="https://via.placeholder.com/1200x400"
            alt="Banner"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div
            class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center border-4 border-transparent group-hover:border-blue-400"
          >
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </div>
          <input
            type="file"
            ref="bannerInput"
            class="hidden"
            accept="image/*"
            @change="(e) => handleFileUpload(e, 'banner')"
          />
        </div>

        <div class="px-6 pb-8 md:px-10">
          <div class="flex justify-center -mt-16 relative z-10">
            <div
              class="group relative cursor-pointer rounded-full bg-white p-1 shadow-sm border border-gray-100 transition-colors duration-300 hover:border-blue-400"
              @click="triggerProfilePicUpload"
            >
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                class="w-32 h-32 rounded-full object-cover"
              />
              <div
                class="absolute inset-1 bg-black/40 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300 flex items-center justify-center"
              >
                <svg
                  class="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
              <input
                type="file"
                ref="profilePicInput"
                class="hidden"
                accept="image/*"
                @change="(e) => handleFileUpload(e, 'profile')"
              />
            </div>
          </div>

          <div class="mt-4 text-center">
            <h2 class="text-3xl font-extrabold text-text-dark">
              {{ authStore.user?.userName || 'Usuario' }}
            </h2>
            <p class="text-gray-500 text-lg mt-1">Usuario de RutaPay Celaya</p>
            <p class="text-gray-400 text-sm mt-1">
              {{ authStore.user?.email }} • {{ authStore.user?.phoneNumber }}
            </p>
          </div>

<<<<<<< HEAD
          <div class="mt-8 flex flex-col md:flex-row justify-center items-center gap-4 text-sm bg-blue-50/50 py-3 px-6 rounded-xl border border-blue-100">
            <span class="text-gray-600">📅 Miembro desde: <span class="font-bold">{{ authStore.user?.createdOn || '09/09/2026' }}</span></span>
=======
          <div
            class="mt-8 flex flex-col md:flex-row justify-center items-center gap-4 text-sm bg-blue-50/50 py-3 px-6 rounded-xl border border-blue-100"
          >
            <span class="text-gray-600">
              Miembro desde:
              <span class="font-bold">{{ authStore.user?.createdOn || '09/09/2026' }}</span></span
            >
>>>>>>> 2aca11cb6bc0d0b00afe46f749c0e1fb2ad84f49
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
                  <Microphone v-if="benefit.toLowerCase().includes('soporte')" />
                </div>

                <span class="text-sm font-medium text-gray-700 max-w-35">{{ benefit }}</span>
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
