<script setup lang="ts">
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import { ArrowRightStroke, ChevronRight, Dashboard } from '@boxicons/vue'
</script>

<template>
  <Header />
  <main class="bg-white">
    <div class="py-8 px-4 mx-auto max-w-7xl text-center lg:py-16 lg:px-12" id="Start">
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
    <section class="bg-white" id="Q&A">
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
<div class="overflow-hidden bg-white py-24 sm:py-32" id="Company">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
      <div class="lg:pt-4 lg:pr-8">
        <div class="lg:max-w-lg">
          <h2 class="text-base/7 font-semibold text-primary">Desarrollo unitario</h2>
          <p class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-black sm:text-5xl">
            Un mejor trabajo
          </p>
          <p class="mt-6 text-lg/8 text-gray-500">
            Nos gustaría compartir contigo un poco de nuestro proceso de desarrollo, para que puedas entender un poco más sobre lo que hacemos y cómo lo hacemos.
          </p>
          <dl class="mt-10 max-w-xl space-y-8 text-base/7 text-gray-500 lg:max-w-none">
            <div class="relative pl-9">
              <dt class="inline font-semibold text-black">
                <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="absolute top-1 left-1 size-5 text-primary">
                  <path d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765 4.5 4.5 0 0 1 8.302-3.046 3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z" clip-rule="evenodd" fill-rule="evenodd" />
                </svg>
                Herramientas de desarrollo.
              </dt>
              <dd class="inline">
                La nube como herramienta de desarrollo es algo que nos ha ayudado mucho a mejorar nuestro proceso de desarrollo, ya que nos permite tener un entorno de desarrollo unificado y accesible desde cualquier lugar.
              </dd>
            </div>
            <div class="relative pl-9">
              <dt class="inline font-semibold text-black">
                <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="absolute top-1 left-1 size-5 text-primary">
                  <path d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clip-rule="evenodd" fill-rule="evenodd" />
                </svg>
                Seguridad y privacidad.
              </dt>
              <dd class="inline">
                La seguridad y privacidad de los datos son aspectos fundamentales en nuestro proceso de desarrollo, ya que nos comprometemos a proteger la información de nuestros usuarios y garantizar su privacidad en todo momento.
              </dd>
            </div>
            <div class="relative pl-9">
              <dt class="inline font-semibold text-black">
                <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="absolute top-1 left-1 size-5 text-primary">
                  <path d="M4.632 3.533A2 2 0 0 1 6.577 2h6.846a2 2 0 0 1 1.945 1.533l1.976 8.234A3.489 3.489 0 0 0 16 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234Z" />
                  <path d="M4 13a2 2 0 1 0 0 4h12a2 2 0 1 0 0-4H4Zm11.24 2a.75.75 0 0 1 .75-.75H16a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75h-.01a.75.75 0 0 1-.75-.75V15Zm-2.25-.75a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75h-.01Z" clip-rule="evenodd" fill-rule="evenodd" />
                </svg>
                Backups.
              </dt>
              <dd class="inline">
                Realizamos copias de seguridad periódicas de nuestros datos para garantizar la integridad y disponibilidad de la información.
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <img width="2432" height="1442" src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png" alt="Product screenshot" class="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-white/10 sm:w-228 md:-ml-4 lg:-ml-0" />
    </div>
  </div>
</div>
<div class="bg-white py-24 sm:py-32" id="Team">
  <div class="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
    <div class="max-w-xl">
      <h2 class="text-3xl font-semibold tracking-tight text-pretty text-black sm:text-4xl">Conocenos un poco más</h2>
      <p class="mt-6 text-lg/8 text-gray-500">
        Somos dos estudiantes, que intentan mejorar el transporte público de su ciudad.
        Nuestro objetivo es simple, queremos conectar con las personas que nos rodean y ayudarles un poco,
        En su día a día, nos seguiremos esforzando para mejorar y crecer en este proyecto, y esperamos que nos acompañes en este camino.
      </p>
    </div>
    <ul role="list" class="grid gap-x-8 gap-y-12 sm:grid-cols-1 sm:gap-y-16 xl:col-span-2">
      <li>
        <div class="flex items-center gap-x-6 ">
          <img src="" alt="" class="size-16 rounded-full outline-1 -outline-offset-1 outline-white/10" />
          <div>
            <h3 class="text-3xl font-semibold tracking-tight text-black">
              Haziel Ramírez Rodríguez
            </h3>
            <p class="text-lg font-semibold text-secondary">
              Co-Founder / CEO
            </p>
          </div>
        </div>
      </li>
      <li>
        <div class="flex items-center gap-x-6">
          <img src="" alt="" class="size-16 rounded-full outline-1 -outline-offset-1 outline-white/10" />
          <div>
            <h3 class="text-3xl font-semibold tracking-tight text-black">
              Ian Orozco Paniagua
            </h3>
            <p class="text-lg font-semibold text-secondary">
              Co-Founder / CEO</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</div>

<section class="bg-white" id="Growth">
    <div class="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
        <img class="w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg" alt="dashboard image">
        <img class="w-full hidden dark:block" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg" alt="dashboard image">
        <div class="mt-4 md:mt-0">
            <p class="text-lg font-semibold text-primary py-3">
              Crecimiento
            </p>
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-black ">
              Creemos más herramientas e ideas que nos unan.
            </h2>
            <p class="mb-6 font-light text-gray-600 md:text-lg ">
              RutaPay no es solo un proyecto de nosotros, es un proyecto para todos como una comunidad unida.
              Conectar con los que te rodean y empatizar con ellos nos hace mejores personas.
            </p>
            <RouterLink
             :to="{ name: 'dashboard' }"
             class="inline-flex items-center text-black bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">
                Empezar ahora
                <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </RouterLink>
        </div>
    </div>
</section>
  </main>
  <Footer />
</template>
