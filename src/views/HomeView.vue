<script setup lang="ts">
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import {
  ArrowRightStroke,
  ChevronRight,
  CodeAlt,
  Dashboard,
  HardDrive,
  HelpCircle,
  Lock,
} from '@boxicons/vue'
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
    <section id="Q&A">
      <div class="py-8 px-4 mx-auto max-w-7xl sm:py-16 lg:px-6">
        <h2 class="mb-8 text-4xl tracking-tight font-extrabold text-text-dark">
          Preguntas Frecuentes
        </h2>
        <div class="grid pt-8 text-left border-t border-gray-300 lg:gap-16 lg:grid-cols-2">
          <div>
            <div class="mb-10">
              <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900">
                <HelpCircle class="mr-2 text-text-light" pack="filled" />
                ¿Cómo funciona RutaPay?
              </h3>
              <p class="text-text-light">
                RutaPay es una plataforma de pago para transporte público que permite a los usuarios
                pagar sus viajes de manera rápida y segura a través de su teléfono móvil. Los
                usuarios pueden vincular su tarjeta de crédito o débito a la aplicación y utilizarla
                para pagar sus viajes en autobús, metro o cualquier otro medio de transporte público
                compatible con la plataforma.
              </p>
            </div>
            <div class="mb-10">
              <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900">
                <HelpCircle class="mr-2 text-text-light" pack="filled" />
                ¿Qué beneficios ofrece RutaPay a los usuarios?
              </h3>
              <p class="text-text-light">
                RutaPay ofrece una serie de beneficios a los usuarios, como la comodidad de poder
                pagar sus viajes de transporte público sin tener que llevar efectivo o tarjetas
                físicas, la seguridad de realizar pagos a través de una plataforma confiable y la
                posibilidad de acceder a promociones y descuentos exclusivos para los usuarios de la
                aplicación.
              </p>
            </div>
          </div>
          <div>
            <div class="mb-10">
              <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900">
                <HelpCircle class="mr-2 text-text-light" pack="filled" />
                ¿Para que fue creado RutaPay?
              </h3>
              <p class="text-text-light">
                RutaPay fue creado con el objetivo de mejorar la experiencia de pago en el
                transporte público, ofreciendo una solución moderna y eficiente para los usuarios.
                Además, busca fomentar el uso del transporte público al facilitar el proceso de pago
                y promover la adopción de tecnologías digitales en este ámbito.
              </p>
            </div>
            <div class="mb-10">
              <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900">
                <HelpCircle class="mr-2 text-text-light" pack="filled" />
                ¿Tienes más preguntas?
              </h3>
              <p class="text-text-light">
                Si tienes más preguntas sobre RutaPay, no dudes en ponerte en contacto con nuestro
                equipo de soporte a través de la sección de contacto en nuestra página web o a
                través de nuestras redes sociales. Estamos aquí para ayudarte y resolver cualquier
                duda que puedas tener sobre nuestra plataforma.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-24 sm:py-32" id="Company">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2"
        >
          <div class="lg:pt-4 lg:pr-8">
            <div class="lg:max-w-lg">
              <h2 class="text-base/7 font-semibold text-primary">Desarrollo unitario</h2>
              <p
                class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-black sm:text-5xl"
              >
                Un mejor trabajo
              </p>
              <p class="mt-6 text-lg/8 text-text-light">
                Nos gustaría compartir contigo un poco de nuestro proceso de desarrollo, para que
                puedas entender un poco más sobre lo que hacemos y cómo lo hacemos.
              </p>
              <dl class="mt-10 max-w-xl space-y-8 text-base/7 lg:max-w-none">
                <div class="flex gap-x-4">
                  <div class="flex-none mt-1">
                    <CodeAlt class="text-primary size-6" />
                  </div>
                  <div>
                    <dt class="font-semibold text-text-dark inline">Herramientas de desarrollo.</dt>
                    <dd class="inline text-text-light">
                      La nube como herramienta de desarrollo es algo que nos ha ayudado mucho a
                      mejorar nuestro proceso de desarrollo, ya que nos permite tener un entorno de
                      desarrollo unificado y accesible desde cualquier lugar.
                    </dd>
                  </div>
                </div>
                <div class="flex gap-x-4">
                  <div class="flex-none mt-1">
                    <Lock class="text-primary size-6" pack="filled" />
                  </div>
                  <div>
                    <dt class="font-semibold text-text-dark inline">Seguridad y privacidad.</dt>
                    <dd class="inline text-text-light">
                      La seguridad y privacidad de los datos son aspectos fundamentales en nuestro
                      proceso de desarrollo, ya que nos comprometemos a proteger la información de
                      nuestros usuarios y garantizar su privacidad en todo momento.
                    </dd>
                  </div>
                </div>
                <div class="flex gap-x-4">
                  <div class="flex-none mt-1">
                    <HardDrive class="text-primary size-6" pack="filled" />
                  </div>
                  <div>
                    <dt class="font-semibold text-black inline">Backups.</dt>
                    <dd class="inline text-text-light">
                      Realizamos copias de seguridad periódicas de nuestros datos para garantizar la
                      integridad y disponibilidad de la información.
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
          <img
            width="2432"
            height="1442"
            src="https://tailwindcss.com/plus-assets/img/component-images/project-app-screenshot.png"
            alt="Product screenshot"
            class="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-white/10 sm:w-228 md:-ml-4 lg:ml-0"
          />
        </div>
      </div>
    </section>
    <section class="py-24 sm:py-32" id="Team">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="max-w-2xl mx-auto text-center mb-16">
          <h2 class="text-3xl font-semibold tracking-tight text-pretty text-black sm:text-4xl">
            Conócenos un poco más
          </h2>
          <p class="mt-6 text-lg/8 text-gray-500">
            Somos dos estudiantes con una meta clara: mejorar la calidad del transporte público en
            nuestra ciudad a través de la tecnología. Creemos que una mejor movilidad urbana impacta
            directamente en la calidad de vida de las personas, por eso desarrollamos una solución
            pensada para quienes dependen del transporte público en su día a día. Este proyecto
            representa nuestro compromiso con la comunidad y con la innovación.
          </p>
        </div>
        <ul role="list" class="grid grid-cols-1 gap-8 sm:grid-cols-2 max-w-3xl mx-auto">
          <li
            class="flex flex-col items-center text-center gap-y-4 p-8 rounded-2xl border border-gray-100 shadow-sm"
          >
            <img
              src=""
              alt="Haziel Ramírez Rodríguez"
              class="size-24 rounded-full outline-1 -outline-offset-1 outline-white/10 bg-gray-100"
            />
            <div>
              <h3 class="text-xl font-semibold tracking-tight text-black">
                Haziel Ramírez Rodríguez
              </h3>
              <p class="text-base font-semibold text-secondary mt-1">Co-Founder / CEO</p>
            </div>
          </li>
          <li
            class="flex flex-col items-center text-center gap-y-4 p-8 rounded-2xl border border-gray-100 shadow-sm"
          >
            <img
              src=""
              alt="Ian Orozco Paniagua"
              class="size-24 rounded-full outline-1 -outline-offset-1 outline-white/10 bg-gray-100"
            />
            <div>
              <h3 class="text-xl font-semibold tracking-tight text-black">Ian Orozco Paniagua</h3>
              <p class="text-base font-semibold text-secondary mt-1">Co-Founder / CEO</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <section id="Growth">
      <div
        class="gap-8 items-center py-8 px-4 mx-auto max-w-7xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6"
      >
        <img
          class="w-full"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg"
          alt="dashboard image"
        />
        <div class="mt-4 md:mt-0">
          <p class="text-lg font-semibold text-primary py-3">Crecimiento</p>
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-black">
            Creemos más herramientas e ideas que nos unan.
          </h2>
          <p class="mb-6 font-light text-gray-600 md:text-lg">
            RutaPay no es solo un proyecto de nosotros, es un proyecto para todos como una comunidad
            unida. Conectar con los que te rodean y empatizar con ellos nos hace mejores personas.
          </p>
          <RouterLink
            :to="{ name: 'dashboard' }"
            class="inline-flex items-center text-white bg-primary focus:ring-2 focus:ring-secondary font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:outline-none"
          >
            Empezar ahora
            <ArrowRightStroke class="ml-2 -mr-1" />
          </RouterLink>
        </div>
      </div>
    </section>
  </main>
  <Footer />
</template>
