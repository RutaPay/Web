<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const openSection = ref<string | null>(null)

function toggleSection(section: string) {
  openSection.value = openSection.value === section ? null : section
}

defineProps({
  isClosed: {
    type: Boolean,
    default: null,
  },
})
</script>

<template>
  <hr class="border-secondary" :class="isClosed === null ? 'ml-0' : isClosed ? 'ml-28' : 'ml-64'" />
  <footer
    class="p-8 transition-all duration-500 bg-gray-50"
    :class="isClosed === null ? 'ml-0' : isClosed ? 'ml-28' : 'ml-64'"
  >
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      <div>
        <h3 class="text-lg font-bold text-text-dark mb-4">Enlaces útiles</h3>
        <ul class="space-y-2">
          <li>
            <RouterLink :to="{ name: 'home' }" class="text-text-light hover:text-primary"
              >Inicio</RouterLink
            >
          </li>
          <li>
            <button
              class="text-text-light hover:text-primary w-full text-left"
              @click="toggleSection('acerca')"
            >
              Acerca de
            </button>
            <transition name="accordion">
              <div
                v-show="openSection === 'acerca'"
                class="overflow-hidden transition-all duration-500 text-sm text-gray-600 mt-2"
              >
                <p>
                  RutaPay es una plataforma diseñada para facilitar pagos y gestión financiera de
                  manera segura y eficiente.
                </p>
              </div>
            </transition>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="text-lg font-bold text-text-dark mb-4">Legal</h3>
        <ul class="space-y-2">
          <li>
            <button
              class="text-text-light hover:text-primary w-full text-left hover:cursor-pointer"
              @click="toggleSection('terminos')"
            >
              Términos de servicio
            </button>
            <transition name="accordion">
              <div
                v-show="openSection === 'terminos'"
                class="overflow-hidden transition-all duration-500 text-sm text-gray-600 mt-2"
              >
                <p>Al utilizar RutaPay, aceptas los términos y condiciones de uso.</p>
              </div>
            </transition>
          </li>
          <li>
            <button
              class="text-text-light hover:text-primary w-full text-left hover:cursor-pointer"
              @click="toggleSection('privacidad')"
            >
              Política de privacidad
            </button>
            <transition name="accordion">
              <div
                v-show="openSection === 'privacidad'"
                class="overflow-hidden transition-all duration-500 text-sm text-gray-600 mt-2"
              >
                <p>
                  Protegemos tu información personal y no la compartimos con terceros sin tu
                  consentimiento.
                </p>
              </div>
            </transition>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="text-lg font-bold text-text-dark mb-4">Síguenos</h3>
        <ul class="space-y-2">
          <li><a href="#" class="text-text-light hover:text-primary">Facebook</a></li>
          <li><a href="#" class="text-text-light hover:text-primary">Twitter</a></li>
          <li><a href="#" class="text-text-light hover:text-primary">Instagram</a></li>
        </ul>
      </div>
      <div>
        <h3 class="text-lg font-bold text-text-dark mb-4">Contacto</h3>
        <p class="text-text-light">Dirección: Calle Principal 123, Ciudad</p>
        <p class="text-text-light">Teléfono: +1 (555) 123-4567</p>
      </div>
    </div>
    <p class="text-text-dark text-center">&copy; 2026 RutaPay. Todos los derechos reservados.</p>
  </footer>
</template>
