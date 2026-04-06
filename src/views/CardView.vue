<script setup lang="ts">
import { ref } from 'vue'

import { PlusCircle } from '@boxicons/vue'
import SideBar from '../components/SideBar.vue'
import Footer from '../components/Footer.vue'
import { useSidebarStore } from '@/stores/sidebarstate'
import { useAuthStore } from '@/stores/auth'

const sidebarStore = useSidebarStore()
const authStore = useAuthStore()

const userCardNumber = ref('4532 1234 5678 9012')
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
        Mi Tarjeta
      </h1>
    </div>
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
      <div class="h-100 w-full rounded-lg flex items-center justify-center">
        <img
          src="../assets/EntradaFicticia.png"
          alt="Imagen 1"
          class="h-80 w-148 object-cover rounded-lg mt-6"
        />
        <div class="rounded-lg p-6 mt-6 justify-center text-2xl text-center">
          <p class="text-text-dark text-3xl mt-4 h-70 md:text-2xl lg:text-3xl">
            Para pagar con RutaPay,
            <span class="font-bold text-primary">
              simplemente escanea el código QR en la pantalla de tu autobús,
            </span>
            aseguarte de tener suficiente saldo en tu cuenta. Este cobro es automático, por lo que
            no tendrás que preocuparte por nada más. ¡Disfruta de tu viaje sin complicaciones!
          </p>
        </div>
      </div>
    </div>
    <RouterView />
  </main>
  <Footer :isClosed="sidebarStore.closedState" />
</template>
