<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

import SideBar from '../components/SideBar.vue'
import { useSidebarStore } from '@/stores/sidebarstate'
import { useAuthStore } from '@/stores/auth'

const sidebarStore = useSidebarStore()
const authStore = useAuthStore()

interface TransportCard {
  id: number
  title: string
  description: string
  cost: number
  imageUrl: string
}

const userCardNumber = ref('4532 1234 5678 9012')
const userBalance = ref(150.0)

const transportCards = ref<TransportCard[]>([
  {
    id: 1,
    title: 'Metro Pass',
    description: 'Unlimited metro rides for 30 days',
    cost: 85.0,
    imageUrl:
      'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 2,
    title: 'Bus Pass',
    description: '20 bus trips within the city',
    cost: 45.0,
    imageUrl:
      'https://images.pexels.com/photos/385997/pexels-photo-385997.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 3,
    title: 'Combined Pass',
    description: 'Metro + Bus unlimited for 30 days',
    cost: 120.0,
    imageUrl:
      'https://images.pexels.com/photos/1253166/pexels-photo-1253166.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 4,
    title: 'Express Pass',
    description: 'Premium express routes for 15 days',
    cost: 65.0,
    imageUrl:
      'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
])

const selectedCard = ref<TransportCard | null>(null)
const showModal = ref(false)

const openModal = (card: TransportCard) => {
  selectedCard.value = card
  showModal.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  showModal.value = false
  document.body.style.overflow = 'auto'
  setTimeout(() => {
    selectedCard.value = null
  }, 300)
}

const scrollRevealElements = ref<Element[]>([])

const handleScroll = () => {
  scrollRevealElements.value.forEach((el) => {
    const rect = el.getBoundingClientRect()
    const isVisible = rect.top <= window.innerHeight * 0.85

    if (isVisible) {
      el.classList.add('active')
    }
  })
}

onMounted(() => {
  scrollRevealElements.value = Array.from(document.querySelectorAll('.scroll-reveal'))

  handleScroll()

  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = 'auto'
})
</script>

<template>
  <SideBar />
  <main
    class="min-h-screen transition-all duration-500 bg-gray-50 p-6 md:p-10"
    :class="{ 'ml-64': !sidebarStore.closedState, 'ml-28': sidebarStore.closedState }"
  >
    <div
      class="w-full h-full min-h-[calc(100vh-2rem)] bg-white rounded-3xl shadow-sm border border-gray-200 p-4 md:p-8"
    >
      <div class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <div class="mb-12 scroll-reveal">
            <div
              class="relative bg-white border-2 border-gray-800 rounded-2xl p-8 sm:p-12 shadow-xl"
            >
              <div class="absolute -top-6 -left-6 z-10">
                <div
                  class="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white rounded-xl shadow-2xl p-6 w-80 transform hover:scale-105 transition-transform duration-300 border border-gray-700 animate-slide-in"
                >
                  <div class="flex justify-between items-start mb-4">
                    <div class="text-xs uppercase tracking-wider opacity-75">Bank Card</div>
                    <div class="w-8 h-8 bg-white bg-opacity-20 rounded-full"></div>
                  </div>

                  <div class="mb-6">
                    <div class="text-2xl font-mono tracking-widest">
                      {{ userCardNumber }}
                    </div>
                  </div>

                  <div class="flex justify-between items-end">
                    <div>
                      <div class="text-xs opacity-75 mb-1">Card Holder</div>
                      <div class="text-sm font-semibold">{{ authStore.user?.userName }}</div>
                    </div>
                    <div>
                      <div class="text-xs opacity-75 mb-1">Expires</div>
                      <div class="text-sm font-semibold">12/28</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-32 sm:mt-20 md:mt-16 text-center md:text-right">
                <div class="inline-block">
                  <div class="text-gray-500 text-sm uppercase tracking-wider mb-2">Saldo</div>
                  <div class="text-6xl sm:text-7xl font-bold text-gray-900 tracking-tight">
                    ${{ authStore.user?.cardBalance }}
                  </div>
                  <div class="mt-4 text-gray-600 text-sm">Available Balance</div>
                </div>
              </div>
            </div>
          </div>

          <div class="scroll-reveal">
            <div class="mb-6">
              <h2 class="text-3xl font-bold text-gray-900 mb-2">Transport Cards</h2>
              <p class="text-gray-600">Choose your preferred transport pass</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div
                v-for="card in transportCards"
                :key="card.id"
                class="scroll-reveal group relative bg-white border-2 border-gray-200 rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-gray-800"
                @click="openModal(card)"
              >
                <div class="aspect-video overflow-hidden bg-gray-200">
                  <img
                    :src="card.imageUrl"
                    :alt="card.title"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div class="p-6">
                  <h3
                    class="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors"
                  >
                    {{ card.title }}
                  </h3>
                  <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                    {{ card.description }}
                  </p>
                  <div class="flex items-center justify-between">
                    <span class="text-2xl font-bold text-gray-900"
                      >${{ card.cost.toFixed(2) }}</span
                    >
                    <span
                      class="text-gray-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Click to buy →
                    </span>
                  </div>
                </div>

                <div
                  class="absolute inset-0 border-2 border-transparent group-hover:border-gray-900 rounded-xl transition-all duration-300 pointer-events-none"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <Transition
          enter-active-class="transition-opacity duration-300"
          leave-active-class="transition-opacity duration-300"
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
        >
          <div
            v-if="showModal"
            class="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4"
            @click.self="closeModal"
          >
            <Transition
              enter-active-class="transition-all duration-300"
              leave-active-class="transition-all duration-300"
              enter-from-class="opacity-0 scale-95 translate-y-4"
              leave-to-class="opacity-0 scale-95 translate-y-4"
            >
              <div
                v-if="showModal && selectedCard"
                class="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border-2 border-gray-800"
              >
                <div class="aspect-video overflow-hidden bg-gray-200">
                  <img
                    :src="selectedCard.imageUrl"
                    :alt="selectedCard.title"
                    class="w-full h-full object-cover"
                  />
                </div>

                <div class="p-6">
                  <h3 class="text-2xl font-bold text-gray-900 mb-2">
                    {{ selectedCard.title }}
                  </h3>
                  <p class="text-gray-600 mb-6">
                    {{ selectedCard.description }}
                  </p>

                  <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-gray-600">Cost</span>
                      <span class="text-xl font-bold text-gray-900"
                        >${{ selectedCard.cost.toFixed(2) }}</span
                      >
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-gray-600">Your Balance</span>
                      <span class="text-xl font-bold"> ${{ authStore.user?.cardBalance }} </span>
                    </div>
                  </div>

                  <div class="flex gap-3">
                    <button
                      @click="closeModal"
                      class="flex-1 px-6 py-3 border-2 border-gray-800 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      class="flex-1 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Confirm Purchase
                    </button>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </Transition>
      </div>
    </div>
    <RouterView />
  </main>
</template>
