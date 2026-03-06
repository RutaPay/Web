<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const data = reactive({
  fullName: '',
  pLastName: '',
  mLastName: '',
  email: '',
  phoneNumber: '',
  password: '',
})

const formatPhone = (e) => {
  let val = e.target.value

  if (val.length < 4) {
    data.phoneNumber = '+52 '
    e.target.value = '+52 '
    return
  }

  // 1. Remove everything that isn't a number
  let numbers = val.replace(/\D/g, '')

  // 2. Ensure it starts with 52 (Mexico's code)
  // If the user deletes it or starts with something else, we fix it
  if (!numbers.startsWith('52')) {
    numbers = '52' + numbers
  }

  // 3. Limit to 12 digits total (52 + 10 digit number)
  numbers = numbers.substring(0, 12)

  // 4. Formatting: +52 123 456 7890
  let formatted = '+52'

  // Add first group (3 digits)
  if (numbers.length > 2) {
    formatted += ' ' + numbers.substring(2, 5)
  }
  // Add second group (3 digits)
  if (numbers.length > 5) {
    formatted += ' ' + numbers.substring(5, 8)
  }
  // Add final group (4 digits)
  if (numbers.length > 8) {
    formatted += ' ' + numbers.substring(8, 12)
  }

  // Update the reactive state
  data.phoneNumber = formatted
  e.target.value = formatted
}

const submitForm = async () => {
  const fullLastNames = `${data.pLastName.trim()} ${data.mLastName.trim()}`.trim()
  const payload = {
    fullName: data.fullName,
    lastNames: fullLastNames,
    email: data.email,
    phoneNumber: data.phoneNumber,
    password: data.password,
  }
  await fetch('https://localhost:7130/api/account/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  await router.push('/login')
}
</script>

<template>
  <main>
    <div class="flex items-center justify-center min-h-screen w-full bg-white">
      <div
        class="p-16 bg-white text-dark rounded-lg shadow-md border border-dark w-full md:w-1/2 lg:w-1/3"
      >
        <h1 class="text-3xl font-bold mt-4">Empieza a usar RutaPay</h1>
        <p class="text-sm font-bold mt-2">
          Regístrate para comenzar a usar nuestra plataforma de pagos.
        </p>
        <form @submit.prevent="submitForm" class="mt-8 w-full">
          <input
            required
            v-model="data.fullName"
            type="text"
            placeholder="Nombre(s)"
            class="w-full px-4 py-2 mt-4 border-2 border-[#C3C3C3] rounded-lg focus:outline-none hover:border-dark focus:border-primary placeholder-[#C3C3C3] transition duration-300"
          />
          <input
            required
            v-model="data.pLastName"
            type="text"
            placeholder="Apellido Paterno"
            class="w-full px-4 py-2 mt-4 border-2 border-[#C3C3C3] rounded-lg focus:outline-none hover:border-dark focus:border-primary placeholder-[#C3C3C3] transition duration-300"
          />
          <input
            required
            v-model="data.mLastName"
            type="text"
            placeholder="Apellido Materno"
            class="w-full px-4 py-2 mt-4 border-2 border-[#C3C3C3] rounded-lg focus:outline-none hover:border-dark focus:border-primary placeholder-[#C3C3C3] transition duration-300"
          />
          <input
            required
            v-model="data.email"
            type="email"
            placeholder="Correo Electrónico"
            class="w-full px-4 py-2 mt-4 border-2 border-[#C3C3C3] rounded-lg focus:outline-none hover:border-dark focus:border-primary placeholder-[#C3C3C3] transition duration-300"
          />
          <input
            required
            :value="data.phoneNumber"
            @input="formatPhone"
            type="tel"
            placeholder="Número de Teléfono"
            maxlength="16"
            class="w-full px-4 py-2 mt-4 border-2 border-[#C3C3C3] rounded-lg focus:outline-none hover:border-dark focus:border-primary placeholder-[#C3C3C3] transition duration-300"
          />
          <input
            required
            v-model="data.password"
            type="password"
            placeholder="Contraseña"
            class="w-full px-4 py-2 mt-4 border-2 border-[#C3C3C3] rounded-lg focus:outline-none hover:border-dark focus:border-primary placeholder-[#C3C3C3] transition duration-300"
          />
          <input
            type="submit"
            value="Registrarse"
            class="w-full px-4 py-2 mt-6 bg-primary text-white font-medium rounded-lg hover:bg-dark cursor-pointer transition duration-300"
          />
        </form>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
export default {
  name: 'RegisterView',
}
</script>
