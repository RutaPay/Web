<script setup lang="ts">
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import { ArrowRightStroke, ChevronRight, Dashboard } from '@boxicons/vue'
</script>

<template>
  <Header />
  <main class="bg-white">
    <div class="py-8 px-4 mx-auto max-w-7xl text-center lg:py-16 lg:px-12">
      <a
        href="#"
        class="inline-flex justify-between items-center py-2 px-2 mb-8 text-sm text-gray-700 bg-gray-100 rounded-full"
      >
        <span class="text-xs bg-primary rounded-full text-white px-4 py-2 mr-4">Nuevo</span>
        <span class="text-sm font-medium">RutaPay ya está disponible en Celaya!</span>
        <ChevronRight class="ml-2" />
      </a>
      <h1
        class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl"
      >
        La plataforma de pago de transporte público que estabas esperando
      </h1>
      <p class="mb-8 text-lg font-normal text-text-light lg:text-xl sm:px-16 xl:px-48">
        En RutaPay nos centramos en la mejora y crecimiento de la experiencia de pago en transporte
        público.
      </p>
      <div class="flex mb-8 lg:mb-16 items-center justify-center space-x-6">
        <a
          href="#"
          class="inline-flex justify-center items-center py-3 px-5 font-medium text-center text-white rounded-lg bg-secondary hover:bg-primary focus:ring-2 focus:ring-primary focus:outline-none"
        >
          Saber más
          <ArrowRightStroke class="ml-2 -mr-2" />
        </a>
        <RouterLink
          :to="{ name: 'dashboard' }"
          class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-text-dark rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-2 focus:ring-dark focus:outline-none"
        >
          <Dashboard class="mr-2 -m-2" pack="filled" />
          Dashboard
        </RouterLink>
      </div>
    </div>
    <section class="bg-white">
      <div class="py-8 px-4 mx-auto max-w-7xl sm:py-16 lg:px-6">
        <h2 class="mb-8 text-4xl tracking-tight font-extrabold text-gray-900">
          Preguntas Frecuentes
        </h2>
        <div class="grid pt-8 text-left border-t border-gray-300 md:gap-16 md:grid-cols-2">
          <div>
            <div class="mb-10">
              <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900">
                <svg
                  class="shrink-0 mr-2 w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                What does "lifetime access" exactly mean?
              </h3>
              <p class="text-gray-500">
                Once you have purchased either the design, code, or both packages, you will have
                access to all of the future updates based on the roadmap, free of charge.
              </p>
            </div>
            <div class="mb-10">
              <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900">
                <svg
                  class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                How does support work?
              </h3>
              <p class="text-gray-500">
                We're aware of the importance of well qualified support, that is why we decided that
                support will only be provided by the authors that actually worked on this project.
              </p>
              <p class="text-gray-500">
                Feel free to
                <a
                  href="#"
                  class="font-medium underline text-primary hover:no-underline"
                  target="_blank"
                  rel="noreferrer"
                  >contact us</a
                >
                and we'll help you out as soon as we can.
              </p>
            </div>
          </div>
          <div>
            <div class="mb-10">
              <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900">
                <svg
                  class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                What does "free updates" include?
              </h3>
              <p class="text-gray-500 dark:text-gray-400">
                The free updates that will be provided is based on the
                <a href="#" class="font-medium underline text-primary-600 hover:no-underline"
                  >roadmap</a
                >
                that we have laid out for this project. It is also possible that we will provide
                extra updates outside of the roadmap as well.
              </p>
            </div>
            <div class="mb-10">
              <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900">
                <svg
                  class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                What does the free version include?
              </h3>
              <p class="text-gray-500">
                The
                <a href="#" class="font-medium underline text-primary-600 hover:no-underline"
                  >free version</a
                >
                of Windster includes a minimal style guidelines, component variants, and a dashboard
                page with the mobile version alongside it.
              </p>
              <p class="text-gray-500">
                You can use this version for any purposes, because it is open-source under the MIT
                license.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <Footer />
</template>
