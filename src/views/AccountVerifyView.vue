<script setup lang="ts">
import { ref } from 'vue'
import Footer from '../components/Footer.vue'
import { ChevronDown, Education, PlusBig, UniversalAccess } from '@boxicons/vue'

const isActive = ref(false)
const selectedOption = ref('Selecciona tu tipo de usuario')
const selectedValue = ref('')

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
  selectedValue.value = optionText.value
  isActive.value = false
}
</script>

<template>
  <main class="min-h-screen transition-all duration-500 bg-gray-50 p-6 md:p-10">
    <div class="flex justify-center">
      <div
        class="w-full md:w-1/2 lg:w-1/3 bg-white rounded-3xl shadow-sm border border-gray-200 p-6 md:p-10"
      >
        <h1
          class="text-3xl font-bold md:text-4xl xl:text-5xl text-text-dark mb-16 leading-relaxed text-center"
        >
          Aplicar para Tarjeta Preferencial
        </h1>
        <form action="" class="mt-8 w-full">
          <label for="type" class="text-text-dark font-semibold md:text-lg">Tipo de Usuario:</label>
          <div class="w-full">
            <input type="hidden" name="type" :value="selectedValue" />
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
        </form>
      </div>
    </div>
  </main>
  <Footer />
</template>
