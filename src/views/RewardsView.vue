<script setup lang="ts">
import SideBar from '@/components/SideBar.vue'
import Footer from '@/components/Footer.vue'
import { useSidebarStore } from '@/stores/sidebarstate'
import { useAuthStore } from '@/stores/auth'

const sidebarStore = useSidebarStore()
const authStore = useAuthStore()

import { ref } from 'vue'

const rewards = ref([
  { title: 'Saldo : $50', points: 200, link: '#' },
  { title: 'Saldo : $100', points: 350, link: '#' },
  { title: 'Saldo : $200', points: 500, link: '#' },
  { title: '10 boletos de rifa', points: 750, link: '#' },
])
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
    </div>
    <div
      class="flex justify-between h-full bg-white rounded-3xl shadow-sm border border-gray-200 mb-8 p-6 md:p-10"
    >
      <div>
        <h3
          class="mb-6 text-2xl font-bold tracking-tight leading-none md:text-3xl xl:text-4xl text-text-dark"
        >
          Hola, <span class="text-primary">{{ authStore.user?.userName }}</span
          >!
        </h3>
        <p class="text-text-dark">En RutaPay desde: {{ authStore.user?.createdOn }}</p>
      </div>
      <div class="flex justify-between space-x-16">
        <div>
          <p class="text-text-dark mb-2 font-bold">Puntos Acumulados</p>
          <h3
            class="mb-6 text-2xl font-bold tracking-tight leading-none md:text-3xl xl:text-4xl text-primary"
          >
            {{ authStore.user?.points }}
          </h3>
        </div>
        <div>
          <p class="text-text-dark mb-2 font-bold">Recuento de Racha</p>
          <h3
            class="mb-6 text-2xl font-bold tracking-tight leading-none md:text-3xl xl:text-4xl text-primary"
          >
            N/A
          </h3>
        </div>
      </div>
    </div>
    <div class="h-auto bg-white rounded-3xl shadow-sm border border-gray-200 mb-8 p-6 md:p-10">
      <h3
        class="mb-6 text-2xl font-bold tracking-tight leading-none md:text-3xl xl:text-4xl text-text-dark"
      >
        Ganar Puntos
      </h3>
      <div>
        <div class="text-center py-10">
          <h5 class="text-gray-500">Tu oportunidad!</h5>
          <h1 class="text-4xl mx-auto leading-normal mb-12 text-black">
            Sigue las instrucciones para ganar puntos
          </h1>
          <div class="flex max-w-5xl mx-auto gap-8 group">
            <div
              class="bg-white duration-400 group-hover:blur-sm hover:blur-none! group-hover:scale-[0.85] hover:scale-100! border-2 cursor-pointer p-8 rounded-xl border-primary"
            >
              <img src="" alt="Source" class="h-20 mx-auto" />
              <h4 class="uppercase text-xl font-bold text-black">Gasto de Pasaje</h4>
              <p class="text-sm leading-7 my-3 font-light opacity-50 text-black">
                Paga una pasaje con RutaPay y gana puntos automáticamente. Cumple con cualquier
                autobus a nuestra disposición.
              </p>
              <button
                class="bg-primary py-2.5 px-7 rounded-full text-white font-bold mt-4 hover:bg-primary/80 transition duration-300 cursor-pointer"
              >
                Ganar Puntos
              </button>
            </div>
            <div
              class="bg-white duration-400 group-hover:blur-sm hover:blur-none! group-hover:scale-[0.85] hover:scale-100! b border-2 cursor-pointer p-8 rounded-xl border-primary"
            >
              <img src="" alt="Source" class="h-20 mx-auto" />
              <h4 class="uppercase text-xl font-bold text-black">Recarga Diaria!</h4>
              <p class="text-sm leading-7 my-3 font-light opacity-50 text-black">
                Recarga hoy con RutaPay y consigue tus puntos diarios. Manten tu saldo en un nivel
                óptimo para ganar puntos cada día.
              </p>
              <button
                class="bg-primary py-2.5 px-7 rounded-full text-white font-bold mt-4 hover:bg-primary/80 transition duration-300 cursor-pointer"
              >
                Ganar Puntos
              </button>
            </div>
            <div
              class="bg-white duration-400 group-hover:blur-sm hover:blur-none! group-hover:scale-[0.85] hover:scale-100! border-2 cursor-pointer p-8 rounded-xl border-primary"
            >
              <img src="" alt="Source" class="h-20 mx-auto" />
              <h4 class="uppercase text-xl font-bold text-black">Descarga la App!</h4>
              <p class="text-sm leading-7 my-3 font-light opacity-50 text-black">
                Nuestra aplicación móvil te ofrece una experiencia mejorada y puntos adicionales.
                Inicia sesión en la app.
              </p>
              <button
                class="bg-primary py-2.5 px-7 rounded-full text-white font-bold mt-4 hover:bg-primary/80 transition duration-300 cursor-pointer"
              >
                Ganar Puntos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="h-auto bg-white rounded-3xl shadow-sm border border-gray-200 mb-8 p-6 md:p-10 flex flex-col items-baseline"
    >
      <div class="h-auto w-max flex items-center justify-center">
        <h3
          class="mb-6 text-2xl font-bold tracking-tight leading-none md:text-3xl xl:text-4xl text-text-dark"
        >
          Canje de Puntos
        </h3>
      </div>
      <div class="h-auto w-full flex">
        <p class="text-gray-500 text-center">
          ¡Próximamente! Estamos trabajando en emocionantes recompensas para ti.
        </p>
      </div>
      <!-- Main Div Para las recompensas -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        <!-- Card principal -->
        <div
          class="relative bg-white rounded-xl border-primary shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
        >
          <img alt="Imagen principal" class="w-full h-64 object-cover" />
          <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">
              ¿Cómo funciona el sistema de recompensas?
            </h2>
            <p class="text-gray-600 mb-4">
              El sistema de recompensas está derivado a tu saldo y acciónes positivas con la
              aplicación, web como movil. Nos enfocamos en tu compromiso con nosotros, por lo que
              cada acción positiva te acerca a increíbles recompensas. Recarga tu saldo, paga tus
              pasajes, y mantente activo para ganar puntos que puedes canjear por descuentos,
              premios exclusivos y mucho más.
            </p>
            <a
              href="#"
              class="text-secondary font-semibold hover:text-primary transition duration-300"
            >
              Ver más detalles →
            </a>
          </div>
          <!-- Animación decorativa -->
          <div
            class="absolute inset-0 bg-linear-to-r from-primary to-blue-700 opacity-0 hover:opacity-20 transition duration-500"
          ></div>
        </div>

        <!-- Grid de cards secundarias -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            v-for="(item, index) in rewards"
            :key="index"
            class="bg-white rounded-lg shadow-md p-4 transform transition duration-500 hover:-translate-y-2 hover:shadow-xl border-primary hover:rotate-1"
          >
            <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ item.title }}</h3>
            <p class="text-gray-600 mb-2">
              Necesitas: <span class="font-bold">{{ item.points }}</span> puntos
            </p>
            <a
              :href="item.link"
              class="text-secondary hover:text-primary font-medium transition duration-300"
            >
              Canjear →
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>
  <Footer :isClosed="sidebarStore.closedState" />
</template>
