<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import {
  ArrowInUpSquareHalf,
  ChevronDown,
  Education,
  InfoCircle,
  PlusBig,
  UniversalAccess,
} from '@boxicons/vue'
import Footer from '../components/Footer.vue'
import Modal from '../components/Modal.vue'

const isModalOpen = ref(false)

const isActive = ref(false)
const selectedOption = ref('Selecciona tu tipo de usuario')

interface AccountData {
  accType: string
  subAccType: string
  mainIDFile: File | null
  secondFile: File | null
  secondFileType: string
}

const data = reactive<AccountData>({
  accType: '',
  subAccType: '',
  mainIDFile: null,
  secondFile: null,
  secondFileType: '',
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
  data.subAccType = ''
  isActive.value = false
}

function handleModal() {
  isModalOpen.value = !isModalOpen.value
}

const formattedFileSize = (file: File | null): string => {
  if (!file) return ''
  const bytes = file.size
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const handleFileUpload = (e: Event, type: String) => {
  const target = e.target as HTMLInputElement
  const file = target.files ? target.files[0] : null

  if (file) {
    switch (type) {
      case 'curp':
        data.mainIDFile = file
        break
      case 'sscomp':
        data.secondFile = file
        data.secondFileType = 'sscomp'
        break
      case 'smacta':
        data.secondFile = file
        data.secondFileType = 'smacta'
        break
      case 'aainapam':
        data.secondFile = file
        data.secondFileType = 'aainapam'
        break
      case 'adconst':
        data.secondFile = file
        data.secondFileType = 'adconst'
        break
    }
  }
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
            <label for="type" class="text-text-dark font-semibold text-lg">Tipo de Usuario:</label>
            <button
              class="cursor-pointer text-text-dark focus:outline-none focus:text-primary"
              @click="handleModal"
            >
              <InfoCircle class="inline-block" />
            </button>
          </div>
          <div class="w-full">
            <input type="hidden" name="accType" v-model="data.accType" />
            <div
              class="flex h-12 ps-4 pe-2 py-2 mt-4 text-text-dark items-center cursor-pointer justify-between border-2 border-[#C3C3C3] rounded-lg hover:border-dark"
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
            <p class="text-text-dark font-semibold text-lg">Selecciona tu opción:</p>
            <div
              v-if="data.accType === 'student'"
              class="inline-flex overflow-hidden mt-4 border-2 border-dark rounded-lg"
            >
              <input
                type="radio"
                v-model="data.subAccType"
                id="student-student"
                value="ss"
                class="hidden peer/ss"
              />
              <label
                for="student-student"
                class="text-text-dark cursor-pointer transition-all duration-200 border-r px-4 py-2 border-dark peer-checked/ss:font-bold peer-checked/ss:bg-primary peer-checked/ss:text-white"
                >Estudiante</label
              >
              <input
                type="radio"
                v-model="data.subAccType"
                id="student-minor"
                value="sm"
                class="hidden peer/sm"
              />
              <label
                for="student-minor"
                class="text-text-dark cursor-pointer transition-all duration-200 border-l border-dark px-4 py-2 peer-checked/sm:font-bold peer-checked/sm:bg-primary peer-checked/sm:text-white"
                >Menor de 12 años</label
              >
            </div>
            <div
              v-if="data.accType === 'adult'"
              class="inline-flex overflow-hidden mt-4 border-2 border-dark rounded-lg"
            >
              <input
                type="radio"
                v-model="data.subAccType"
                id="adult-adult"
                value="aa"
                class="hidden peer/aa"
              />
              <label
                for="adult-adult"
                class="text-text-dark cursor-pointer transition-all duration-200 border-r px-4 py-2 border-dark peer-checked/aa:font-bold peer-checked/aa:bg-primary peer-checked/aa:text-white"
                >Adulto Mayor</label
              >
              <input
                type="radio"
                v-model="data.subAccType"
                id="adult-disability"
                value="ad"
                class="hidden peer/ad"
              />
              <label
                for="adult-disability"
                class="text-text-dark cursor-pointer transition-all duration-200 border-l border-dark px-4 py-2 peer-checked/ad:font-bold peer-checked/ad:bg-primary peer-checked/ad:text-white"
                >Persona con Discapacidad</label
              >
            </div>
          </div>
          <hr class="mt-8 border-dark" />
          <p class="text-text-dark font-semibold text-lg mt-8">Sube tus archivos</p>

          <div v-if="data.accType === 'student'">
            <p class="text-text-dark mt-4">Sube tu CURP:</p>
            <input
              type="file"
              id="curp"
              accept=".png, .jpg, .jpeg, .pdf"
              class="hidden"
              @change="handleFileUpload($event, 'curp')"
            />
            <div class="flex space-x-8 w-full mt-2">
              <label
                for="curp"
                class="bg-primary text-white flex relative font-medium items-center justify-evenly w-56 rounded-lg py-3 cursor-pointer"
                ><ArrowInUpSquareHalf />Seleccionar Archivo</label
              >
              <div v-if="data.mainIDFile" class="flex flex-col justify-around">
                <span class="text-sm font-semibold text-text-dark truncate">
                  {{ data.mainIDFile.name }}
                </span>
                <span class="text-xs text-text-light">
                  {{ formattedFileSize(data.mainIDFile) }}
                </span>
              </div>

              <div v-else class="flex flex-col justify-center">
                <span class="text-sm text-text-light"> Ningún archivo seleccionado </span>
              </div>
            </div>

            <div v-if="data.subAccType == 'ss'" class="mt-8">
              <p class="text-text-dark mt-4">Sube tu comprobante escolar:</p>
              <input
                type="file"
                id="sscomp"
                accept=".png, .jpg, .jpeg, .pdf"
                class="hidden"
                @change="handleFileUpload($event, 'sscomp')"
              />
              <div class="flex space-x-8 w-full mt-2">
                <label
                  for="sscomp"
                  class="bg-primary text-white flex relative font-medium items-center justify-evenly w-56 rounded-lg py-3 cursor-pointer"
                  ><ArrowInUpSquareHalf />Seleccionar Archivo</label
                >
                <div v-if="data.secondFile" class="flex flex-col justify-around">
                  <span class="text-sm font-semibold text-text-dark truncate">
                    {{ data.secondFile.name }}
                  </span>
                  <span class="text-xs text-text-light">
                    {{ formattedFileSize(data.secondFile) }}
                  </span>
                </div>

                <div v-else class="flex flex-col justify-center">
                  <span class="text-sm text-text-light"> Ningún archivo seleccionado </span>
                </div>
              </div>
            </div>
            <div v-if="data.subAccType == 'sm'" class="mt-8">
              <p class="text-text-dark mt-4">Sube tu Acta de Nacimiento:</p>
              <input
                type="file"
                id="smacta"
                accept=".png, .jpg, .jpeg, .pdf"
                class="hidden"
                @change="handleFileUpload($event, 'smacta')"
              />
              <div class="flex space-x-8 w-full mt-2">
                <label
                  for="smacta"
                  class="bg-primary text-white flex relative font-medium items-center justify-evenly w-56 rounded-lg py-3 cursor-pointer"
                  ><ArrowInUpSquareHalf />Seleccionar Archivo</label
                >
                <div v-if="data.secondFile" class="flex flex-col justify-around">
                  <span class="text-sm font-semibold text-text-dark truncate">
                    {{ data.secondFile.name }}
                  </span>
                  <span class="text-xs text-text-light">
                    {{ formattedFileSize(data.secondFile) }}
                  </span>
                </div>

                <div v-else class="flex flex-col justify-center">
                  <span class="text-sm text-text-light"> Ningún archivo seleccionado </span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="data.accType === 'health'">
            <p class="text-text-dark mt-4">Sube tu:</p>
            <input
              disabled
              type="file"
              id="curp"
              accept=".png, .jpg, .jpeg, .pdf"
              class="hidden"
              @change="handleFileUpload($event, 'curp')"
            />
            <div class="flex space-x-8 w-full mt-2">
              <label
                for="curp"
                class="bg-primary text-white flex relative font-medium items-center justify-evenly w-56 rounded-lg py-3 cursor-not-allowed opacity-75"
                ><ArrowInUpSquareHalf />Seleccionar Archivo</label
              >
              <div v-if="data.mainIDFile" class="flex flex-col justify-around">
                <span class="text-sm font-semibold text-text-dark truncate">
                  {{ data.mainIDFile.name }}
                </span>
                <span class="text-xs text-text-light">
                  {{ formattedFileSize(data.mainIDFile) }}
                </span>
              </div>

              <div v-else class="flex flex-col justify-center">
                <span class="text-sm text-text-light"> Ningún archivo seleccionado </span>
              </div>
            </div>
          </div>

          <div v-if="data.accType === 'adult'">
            <p class="text-text-dark mt-4">Sube tu Identificación Oficial:</p>
            <input
              type="file"
              id="curp"
              accept=".png, .jpg, .jpeg, .pdf"
              class="hidden"
              @change="handleFileUpload($event, 'curp')"
            />
            <div class="flex space-x-8 w-full mt-2">
              <label
                for="curp"
                class="bg-primary text-white flex relative font-medium items-center justify-evenly w-56 rounded-lg py-3 cursor-pointer"
                ><ArrowInUpSquareHalf />Seleccionar Archivo</label
              >
              <div v-if="data.mainIDFile" class="flex flex-col justify-around">
                <span class="text-sm font-semibold text-text-dark truncate">
                  {{ data.mainIDFile.name }}
                </span>
                <span class="text-xs text-text-light">
                  {{ formattedFileSize(data.mainIDFile) }}
                </span>
              </div>

              <div v-else class="flex flex-col justify-center">
                <span class="text-sm text-text-light"> Ningún archivo seleccionado </span>
              </div>
            </div>

            <div v-if="data.subAccType == 'aa'" class="mt-8">
              <p class="text-text-dark mt-4">Sube tu credencial del INAPAM:</p>
              <input
                type="file"
                id="aainapam"
                accept=".png, .jpg, .jpeg, .pdf"
                class="hidden"
                @change="handleFileUpload($event, 'aainapam')"
              />
              <div class="flex space-x-8 w-full mt-2">
                <label
                  for="aainapam"
                  class="bg-primary text-white flex relative font-medium items-center justify-evenly w-56 rounded-lg py-3 cursor-pointer"
                  ><ArrowInUpSquareHalf />Seleccionar Archivo</label
                >
                <div v-if="data.secondFile" class="flex flex-col justify-around">
                  <span class="text-sm font-semibold text-text-dark truncate">
                    {{ data.secondFile.name }}
                  </span>
                  <span class="text-xs text-text-light">
                    {{ formattedFileSize(data.secondFile) }}
                  </span>
                </div>

                <div v-else class="flex flex-col justify-center">
                  <span class="text-sm text-text-light"> Ningún archivo seleccionado </span>
                </div>
              </div>
            </div>
            <div v-if="data.subAccType == 'ad'" class="mt-8">
              <p class="text-text-dark mt-4">Sube tu constancia del DIF o APAC:</p>
              <input
                type="file"
                id="adconst"
                accept=".png, .jpg, .jpeg, .pdf"
                class="hidden"
                @change="handleFileUpload($event, 'adconst')"
              />
              <div class="flex space-x-8 w-full mt-2">
                <label
                  for="adconst"
                  class="bg-primary text-white flex relative font-medium items-center justify-evenly w-56 rounded-lg py-3 cursor-pointer"
                  ><ArrowInUpSquareHalf />Seleccionar Archivo</label
                >
                <div v-if="data.secondFile" class="flex flex-col justify-around">
                  <span class="text-sm font-semibold text-text-dark truncate">
                    {{ data.secondFile.name }}
                  </span>
                  <span class="text-xs text-text-light">
                    {{ formattedFileSize(data.secondFile) }}
                  </span>
                </div>

                <div v-else class="flex flex-col justify-center">
                  <span class="text-sm text-text-light"> Ningún archivo seleccionado </span>
                </div>
              </div>
            </div>
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
