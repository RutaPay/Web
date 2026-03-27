<script setup lang="ts">
import { ref } from 'vue'

import { PlusCircle } from '@boxicons/vue'
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

const transportCards = ref<TransportCard[]>([
  {
    id: 1,
    title: 'Metro Pass',
    description: 'Unlimited metro rides for 30 days',
    cost: 500.0,
    imageUrl:
      'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 2,
    title: 'Semana Extra!',
    description: 'Semana ilimitada de transportes',
    cost: 180.0,
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
    title: 'Pase Express de un Día',
    description: 'Un pase ilimitado por un día de transportes',
    cost: 60.0,
    imageUrl:
      'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
])
</script>

<template>
  <SideBar />
  <main
    class="min-h-screen transition-all duration-500 bg-gray-50 p-6 md:p-10"
    :class="{ 'ml-64': !sidebarStore.closedState, 'ml-28': sidebarStore.closedState }"
  >
    <div class="h-auto bg-white rounded-3xl shadow-sm border border-gray-200 p-12 md:p-16 lg:p-24">
      <div class="relative bg-white border-2 border-dark rounded-2xl p-8 sm:p-12 shadow-xl">
        <div class="absolute -top-6 -left-6 z-10">
          <div
            class="bg-linear-to-br from-gray-900 via-gray-800 to-black text-white rounded-xl shadow-2xl p-6 w-80 transform hover:scale-105 transition-transform duration-300 border"
          >
            <div class="flex justify-between items-start mb-4">
              <div class="text-xs uppercase tracking-wider opacity-75">RutaPay</div>
            </div>

            <div class="mb-6">
              <div class="text-2xl font-mono tracking-widest">
                {{ userCardNumber }}
              </div>
            </div>

            <div class="flex justify-between items-end">
              <div>
                <div class="text-xs opacity-75 mb-1">Nombre</div>
                <div class="text-sm font-semibold">{{ authStore.user?.userName }}</div>
              </div>
              <div>
                <div class="text-xs opacity-75 mb-1">Renuevala el:</div>
                <div class="text-sm font-semibold">00/00</div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-32 sm:mt-20 md:mt-16 text-center md:text-right">
          <div class="inline-block">
            <div class="text-text-light text-sm uppercase tracking-wider mb-2">Saldo</div>
            <div class="text-6xl sm:text-7xl font-bold text-dark tracking-tight">
              ${{ authStore.user?.cardBalance }}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 class="mt-14 lg:mt-20 text-2xl font-bold md:text-3xl lg:text-4xl text-text-dark">
          Recargar
        </h3>
        <div class="flex justify-between space-x-8 sm:mt-4 md:mt-6 lg:mt-8">
          <div class="rounded-2xl border-2 border-primary p-8">
            <p class="text-text-light uppercase">AÑADIR</p>
            <p class="font-bold text-primary text-center text-2xl">$50</p>
          </div>
          <div class="bg-primary rounded-2xl border-2 border-primary p-8">
            <p class="text-text-dark uppercase">AÑADIR</p>
            <p class="font-bold text-white text-center text-2xl">$100</p>
          </div>
          <div class="rounded-2xl border-2 border-primary p-8">
            <p class="text-text-light uppercase">AÑADIR</p>
            <p class="font-bold text-primary text-center text-2xl">$200</p>
          </div>
          <div class="rounded-2xl border-2 border-primary p-8">
            <PlusCircle
              pack="filled"
              class="flex items-center justify-center min-w-16 text-2xl text-primary"
            />
            <p class="text-text-light uppercase">AÑADIR</p>
          </div>
        </div>
      </div>
      <h3 class="mt-14 lg:mt-20 text-2xl font-bold md:text-3xl lg:text-4xl text-text-dark">
          ¿Como pagar con RutaPay?
      </h3>
      <!-- Box img -->+
      <div class="h-100 w-full bg-gray-200 rounded-lg flex items-center justify-center">
      <img src="#" alt="Imagen 1" class="h-64 w-128 object-cover rounded-lg mt-6"/>
      <div class="bg-white rounded-lg p-6 mt-6 justify-center text-2xl text-center">
        <p class="text-text-dark text-lg mt-4">
          Para pagar con RutaPay, simplemente escanea el código QR en la pantalla de tu autobús, aseguarte de tener suficiente saldo en tu cuenta.
        </p>
      </div>
      </div>
    </div>
    <RouterView />
  </main>
</template>
