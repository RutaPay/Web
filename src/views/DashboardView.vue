<script setup lang="ts">
import HeaderComponent from '../components/HeaderComponent.vue'
import { useSidebarStore } from '@/stores/sidebarstate'

const sidebarStore = useSidebarStore()
</script>

<template>
  <main
    class="min-h-screen transition-all duration-500 bg-gray-50 p-4"
    :class="{ 'ml-64': !sidebarStore.closedState, 'ml-28': sidebarStore.closedState }"
  >
    <div
      class="w-full h-full min-h-[calc(100vh-2rem)] bg-white rounded-3xl shadow-sm border border-gray-200 p-6 md:p-10"
    >
      <HeaderComponent />

      <div class="mt-8">
        <section class="">
          <div
            class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12"
          >
            <div class="mr-auto place-self-center lg:col-span-7">
              <h1
                class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-black"
              >
                La funcionalidad de nuestra aplicación
              </h1>
              <p
                class="max-w-2xl mb-6 font-light text-gray-800 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-500"
              >
                El objetivo de este proyecto es mejorar el trasnporte público, Consolidamos este
                proyecto para el desarrollo general.
              </p>
              <a
                href="#"
                class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-text-dark rounded-lg focus:ring-4 focus:ring-primary-300"
              >
                Ir a mi cuenta
                <svg
                  class="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
              <!-- Este es opcional después lo podemos quitar o ajustar o recolocar pero por ahora es opcional -->
              <a
                href="#"
                class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-text-dark border rounded-lg hover:bg-dark hover:text-white focus:ring-4 focus:ring-gray-100 transition-colors duration-300"
              >
                Realiza una recarga
              </a>
            </div>
            <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
              <img src="../assets/phone-mockup.png" alt="mockup" />
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
export default {
  name: 'DashboardView',
}
</script>
