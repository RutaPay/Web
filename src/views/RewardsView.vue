<script setup lang="ts">
import SideBar from '../components/SideBar.vue'
import { useSidebarStore } from '@/stores/sidebarstate'
import { useAuthStore } from '@/stores/auth'

const sidebarStore = useSidebarStore()
const authStore = useAuthStore()
</script>

<template>
  <SideBar />
  <main
    class="min-h-screen transition-all duration-500 bg-gray-50 p-6 md:p-10"
    :class="{ 'ml-64': !sidebarStore.closedState, 'ml-28': sidebarStore.closedState }"
  >
    <div class="h-auto bg-white rounded-3xl shadow-sm border border-gray-200 mb-8 p-6 md:p-10">
      <h1
        class="text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-text-dark"
      >
        Puntoss y Beneficios
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
              class="bg-white duration-400 group-hover:blur-sm hover:blur-none! group-hover:scale-[0.85] hover:scale-100! border-primary border-2 cursor-pointer p-8 rounded-xl mix-blend-luminosity"
            >
              <img src="#" alt="Source" class="h-20 mx-auto" />
              <h4 class="uppercase text-xl font-bold text-black">Gasto de Pasaje</h4>
              <p class="text-sm leading-7 ,y-3 font-light opacity-50 text-black">
                Paga una pasaje con RutaPay y gana puntos automáticamente. Cumple con cualquier
                autobus a nuestra disposición.
              </p>
              <button class="bg-primary  py-2.5 px-7 rounded-full text-white font-bold mt-4 hover:bg-primary/80 transition duration-300">
                Ganar Puntos
              </button>
            </div>
            <div
              class="bg-white duration-400 group-hover:blur-sm hover:blur-none! group-hover:scale-[0.85] hover:!cale-100! border-primary border-2 cursor-pointer p-8 rounded-xl mix-blend-luminosity"
            >
              <img src="#" alt="Source" class="h-20 mx-auto" />
              <h4 class="uppercase text-xl font-bold text-black">Recarga Diaria!</h4>
              <p class="text-sm leading-7 ,y-3 font-light opacity-50 text-black">
                Recarga hoy con RutaPay y consigue tus puntos diarios. Manten tu saldo en un nivel
                óptimo para ganar puntos cada día.
              </p>
              <button class="bg-primary  py-2.5 px-7 rounded-full text-white font-bold mt-4 hover:bg-primary/80 transition duration-300">
                Ganar Puntos
              </button>
            </div>
            <div
              class="bg-white duration-400 group-hover:blur-sm hover:blur-none! group-hover:scale-[0.85] hover:scale-100! border-primary border-2 cursor-pointer p-8 rounded-xl mix-blend-luminosity"
            >
              <img src="#" alt="Source" class="h-20 mx-auto" />
              <h4 class="uppercase text-xl font-bold text-black">Descarga la App!</h4>
              <p class="text-sm leading-7 ,y-3 font-light opacity-50 text-black">
                Nuestra aplicación móvil te ofrece una experiencia mejorada y puntos adicionales.
                Inicia sesión en la app.
              </p>
              <button class="bg-primary py-2.5 px-7 rounded-full text-white font-bold mt-4 hover:bg-primary/80 transition duration-300">
                Ganar Puntos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-auto bg-white rounded-3xl shadow-sm border border-gray-200 mb-8 p-6 md:p-10">
      <h3
        class="mb-6 text-2xl font-bold tracking-tight leading-none md:text-3xl xl:text-4xl text-text-dark"
      >
        Canje de Puntos
      </h3>
      <div>
        <p class="text-text-dark mb-2">Próximamente...</p>
      </div>
    </div>
  </main>
</template>
