<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { Route } from '@boxicons/vue'

const authStore = useAuthStore()
</script>

<template>
  <header class="bg-white border-b border-primary sticky top-0 overflow-hidden">
    <nav class="px-4 lg:px-6 py-4">
      <div class="flex flex-wrap justify-between items-center mx-auto max-w-7xl">
        <a href="https://rutapay.com" class="flex items-center focus:outline-none">
          <img src="../assets/LogoRutaPay.svg" class="mr-3 h-8 sm:h-10" alt="RutaPay Logo" />
          <span class="self-center text-xl font-semibold whitespace-nowrap text-dark">RutaPay</span>
        </a>
        <div class="flex items-center lg:order-2" v-if="!authStore.authenticated">
          <RouterLink
            :to="{ name: 'login' }"
            class="text-text-dark hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >Iniciar Sesión</RouterLink
          >
          <RouterLink
            :to="{ name: 'register' }"
            class="text-white bg-primary hover:bg-dark transition-all duration-200 focus:ring-2 focus:ring-secondary font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >Registrarse</RouterLink
          >
        </div>
        <div v-else class="flex items-center lg:order-2">
          <RouterLink
            :to="{ name: 'dashboard' }"
            class="text-white bg-dark font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >Dashboard</RouterLink
          >
        </div>
        <div class="justify-between items-center w-full lg:flex lg:w-auto">
          <ul class="flex font-medium space-x-8">
            <li>
              <RouterLink
                :to="{ name: 'home' }"
                class="text-text-light hover:text-black hover:tracking-wider transition-all duration-300"
                aria-current="page"
                >Inicio</RouterLink
              >
            </li>
            <li>
              <RouterLink
                :to="{ hash: '#Q&A' }"
                class="text-text-light hover:text-black hover:tracking-wider transition-all duration-300"
                >Q&A</RouterLink
              >
            </li>
            <li>
              <RouterLink
                :to="{ hash: '#Company' }"
                class="text-text-light hover:text-black hover:tracking-wider transition-all duration-300"
                >Compañía</RouterLink
              >
            </li>
            <li>
              <RouterLink
                :to="{ hash: '#Team' }"
                class="text-text-light hover:text-black hover:tracking-wider transition-all duration-300"
                >Equipo</RouterLink
              >
            </li>
            <li>
              <RouterLink
                :to="{ hash: '#Growth' }"
                class="text-text-light hover:text-black hover:tracking-wider transition-all duration-300"
                >Crecimiento</RouterLink
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
