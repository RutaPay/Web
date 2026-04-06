<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ChevronDown, Education, InfoCircle, PlusBig, UniversalAccess } from '@boxicons/vue'
import Footer from '../components/Footer.vue'
import Modal from '../components/modal.vue'

const isModalOpen = ref(false)

const isActive = ref(false)
const selectedOption = ref('Selecciona tu tipo de usuario')

const data = reactive({
  accType: '',
})

const typeOptions = [
  {
    text: 'Estudiante o Menor de 12 años',
    icon: Education,
    color: 'text-card-student',
    value: 'student',
  },
  { text: 'Sector Salud', icon: PlusBig, color: 'text-card-health', value: 'health' },
  {
    text: 'Adulto Mayor y Personas con Discapacidad',
    icon: UniversalAccess,
    color: 'text-card-adult',
    value: 'adult',
  },
]

const toggleMenu = () => {
  isActive.value = !isActive.value
}

const selectItem = (optionText) => {
  selectedOption.value = optionText
  typeOptions.forEach((option) => {
    if (option.text === optionText) {
      data.accType = option.value
    }
  })
  isActive.value = false
}

function handleModal() {
  isModalOpen.value = !isModalOpen.value
}

const submitForm = async () => {
  console.log('Form submitted with account type:', data.accType)
  // Aquí puedes agregar la lógica para enviar el formulario al backend
}
</script>

<template>
  <main class="min-h-screen transition-all duration-500 bg-gray-50 p-6 md:p-10">
    <div class="flex justify-center">
      <div
        class="w-full md:w-1/2 bg-white rounded-3xl shadow-sm border border-gray-200 p-6 md:p-10"
      >
        <h1
          class="text-3xl font-bold md:text-4xl xl:text-5xl text-text-dark mb-16 leading-relaxed text-center"
        >
          Aplicar para Tarjeta Preferencial
        </h1>
        <form @submit.prevent="submitForm" class="mt-8 w-full">
          <div class="w-full flex justify-between">
            <label for="type" class="text-text-dark font-semibold md:text-lg"
              >Tipo de Usuario:</label
            >
            <button class="cursor-pointer" @click="handleModal">
              <InfoCircle class="inline-block text-text-dark" />
            </button>
          </div>
          <div class="w-full">
            <input type="hidden" name="accType" v-model="data.accType" />
            <div
              class="flex h-12 ps-4 pe-2 py-2 mt-4 text-text-dark items-center cursor-pointer justify-between border-2 border-[#C3C3C3] rounded-lg hover:border-dark focus:border-primary"
              @click="toggleMenu"
            >
              <span>{{ selectedOption }}</span>
              <ChevronDown
                class="inline-block ml-2 transition-all duration-200"
                :class="{ 'rotate-180': isActive }"
              />
            </div>
            <ul
              class="relative p-4 mt-2 rounded-lg text-text-dark border-2 border-[#C3C3C3]"
              :class="{ hidden: !isActive, block: isActive }"
            >
              <li
                class="h-12 flex cursor-pointer px-4 items-center rounded-lg hover:bg-[#F2F2F2]"
                v-for="option in typeOptions"
                :key="option.text"
                @click="selectItem(option.text)"
              >
                <component
                  :is="option.icon"
                  :class="['inline-block mr-3', option.color]"
                  pack="filled"
                />
                <span>{{ option.text }}</span>
              </li>
            </ul>
          </div>
          <div class="mt-8" v-if="data.accType === 'student' || data.accType === 'adult'">
            <p class="text-text-dark font-semibold md:text-lg">Selecciona tu opción:</p>
            <div v-if="data.accType === 'student'" class="flex items-center gap-4 mt-4">
              <input type="radio" name="option" id="student-student" />
              <label for="student-student" class="text-text-dark cursor-pointer">Estudiante</label>
              <input type="radio" name="option" id="student-minor" />
              <label for="student-minor" class="text-text-dark cursor-pointer"
                >Menor de 12 años</label
              >
            </div>
            <div v-if="data.accType === 'adult'" class="flex items-center gap-4 mt-4">
              <input type="radio" name="option" id="adult-adult" />
              <label for="adult-adult" class="text-text-dark cursor-pointer">Adulto Mayor</label>
              <input type="radio" name="option" id="adult-disability" />
              <label for="adult-disability" class="text-text-dark cursor-pointer"
                >Persona con Discapacidad</label
              >
            </div>
          </div>
          <div class="mt-8">
            <p class="text-text-dark font-semibold md:text-lg">Sube tus archivos</p>
            <label for="curp" class="text-text-dark">Sube tu CURP:</label>
            <input type="file" name="curp" id="curp" />
          </div>
        </form>
      </div>
    </div>
    <Modal v-model="isModalOpen" title="Requisitos para aplicar a la tarjeta preferencial">
      <p class="text-text-dark">Estudiante:</p>
      <ul class="list-disc list-inside">
        <li>C.U.R.P.</li>
        <li>Comprobante de inscripción y/o comprobante de pago de colegiatura del ciclo vigente</li>
      </ul>
      <p class="text-text-dark mt-4">Menor de 12 años:</p>
      <ul class="list-disc list-inside">
        <li>C.U.R.P.</li>
        <li>Acta de Nacimiento</li>
      </ul>

      <p class="text-text-dark mt-8">Sector Salud:</p>
      <ul class="list-disc list-inside">
        <li>Por definir...</li>
      </ul>

      <p class="text-text-dark mt-8">Adulto Mayor:</p>
      <ul class="list-disc list-inside">
        <li>Identificación oficial *</li>
        <li>Credencial INAPAM</li>
      </ul>
      <p class="text-text-dark mt-4">Persona con Discapacidad:</p>
      <ul class="list-disc list-inside">
        <li>Identificación oficial *</li>
        <li>Constancia expedida por DIF o APAC</li>
      </ul>

      <p class="text-text-dark mt-8">
        * Las identificaciones oficiales para realizar el trámite podrán ser: Credencial para Votar
        (INE), Pasaporte, Cédula Profesional, Cartilla del Servicio Militar Nacional, Licencia de
        Conducir o Tarjeta de Residencia (Temporal o Permanente).
      </p>

      <template #footer>
        <button
          @click="isModalOpen = false"
          class="text-primary cursor-pointer px-4 py-2 rounded-lg hover:bg-[#F5F5F5] transition-all duration-200"
        >
          Entendido
        </button>
      </template>
    </Modal>
  </main>
  <Footer />
</template>
