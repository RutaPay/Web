<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import PasswordRequirementItem from '@/components/PasswordRequirementItem.vue'
import FormInputErrorItem from '@/components/FormInputErrorItem.vue'

const router = useRouter()

const validEmail = ref()

const data = reactive({
  fullName: '',
  pLastName: '',
  mLastName: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
})

// Formateo de teléfono
const formatPhone = (e: Event) => {
  const target = e.target as HTMLInputElement
  let val = target.value

  if (val.length < 4) {
    data.phoneNumber = '+52 '
    target.value = '+52 '
    return
  }

  let numbers = val.replace(/\D/g, '')

  if (!numbers.startsWith('52')) numbers = '52' + numbers

  numbers = numbers.substring(0, 12)

  let formatted = '+52'

  if (numbers.length > 2) formatted += ' ' + numbers.substring(2, 5)
  if (numbers.length > 5) formatted += ' ' + numbers.substring(5, 8)
  if (numbers.length > 8) formatted += ' ' + numbers.substring(8, 12)

  data.phoneNumber = formatted
  target.value = formatted
}

// Validación de nombre
const validName = ref()
function verifyName() {
  if (data.fullName.trim() === '') {
    validName.value = false
  } else {
    validName.value = true
  }
}

// Validación de contraseña
const requirements = [
  { text: 'Al menos 8 caracteres', regex: /.{8,}/ },
  { text: 'Al menos 1 número (0...9)', regex: /[0-9]/ },
  { text: 'Al menos 1 mayúscula (A...Z)', regex: /[A-Z]/ },
  { text: 'Al menos 1 minúscula (a...z)', regex: /[a-z]/ },
  { text: 'Al menos 1 símbolo (!...$)', regex: /[!@#$%^&*()-+]/ },
]

const passwordStatus = computed(() => {
  return requirements.map((req) => ({
    text: req.text,
    isValid: req.regex.test(data.password),
  }))
})

const isPasswordValid = computed(() => requirements.every((req) => req.regex.test(data.password)))
const passwordsMatch = computed(
  () => data.password !== '' && data.password === data.confirmPassword,
)

// Validación Global
const isFormValid = computed(() => {
  const hasNames =
    data.fullName.trim() !== '' && data.pLastName.trim() !== '' && data.mLastName.trim() !== ''
  const hasPhone = data.phoneNumber.replace(/\D/g, '').length === 12 // 52 + 10 dígitos

  return hasNames && hasPhone && isPasswordValid.value && passwordsMatch.value
})

const submitForm = async () => {
  if (!isFormValid.value) {
    toast.error('Formulario Inválido', {
      description: 'Por favor, completa todos los campos correctamente.',
    })
    return
  }
  const fullLastNames = `${data.pLastName.trim()} ${data.mLastName.trim()}`.trim()
  const payload = {
    fullName: data.fullName,
    lastNames: fullLastNames,
    email: data.email,
    phoneNumber: data.phoneNumber,
    password: data.password,
  }

  try {
    const response = await fetch('https://localhost:7130/api/account/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (response.status === 201) {
      toast.success('¡Registro exitoso!', {
        description: 'Ahora puedes iniciar sesión.',
      })
      await router.push('/login')
    } else if (response.status === 400) {
      const contentType = response.headers.get('content-type')
      let errorMessage = ''

      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json()
        errorMessage = errorData.message || JSON.stringify(errorData)
      } else {
        errorMessage = await response.text()
      }

      if (errorMessage.includes('Email already exists.')) {
        validEmail.value = false
      }
    } else {
      toast.error('Error de registro', {
        description: 'Error al registrar el usuario. Inténtalo de nuevo más tarde.',
      })
    }
  } catch (error) {
    console.error('Error de red:', error)
    toast.error('Error de red', {
      description: 'No se pudo conectar con el servidor.',
    })
  }
}
</script>

<template>
  <main>
    <div class="flex items-center justify-center min-h-screen w-full bg-white">
      <div
        class="mt-16 mb-16 p-16 bg-white text-text-dark rounded-lg shadow-md border border-dark w-full md:w-1/2 lg:w-1/3"
      >
        <h1 class="text-3xl font-bold mt-4">Empieza a usar RutaPay</h1>
        <p class="text-sm font-bold mt-2">
          Regístrate para comenzar a usar nuestra plataforma de pagos.
        </p>
        <form @submit.prevent="submitForm" class="mt-8 w-full">
          <div>
            <input
              v-model="data.fullName"
              @input="verifyName"
              type="text"
              placeholder="Nombre(s)"
              class="w-full px-4 py-2 mt-4 border-2 border-[#C3C3C3] rounded-lg focus:outline-none hover:border-dark focus:border-primary placeholder-[#C3C3C3] transition duration-300"
              :class="validName === false ? 'border-[#D93025]' : 'border-[#229954]'"
            />
            <FormInputErrorItem v-if="validName === false">
              <template #text>Nombre inválido.</template>
            </FormInputErrorItem>
          </div>
          <input
            v-model="data.pLastName"
            type="text"
            placeholder="Apellido Paterno"
            class="w-full px-4 py-2 mt-4 border-2 border-[#C3C3C3] rounded-lg focus:outline-none hover:border-dark focus:border-primary placeholder-[#C3C3C3] transition duration-300"
          />
          <input
            v-model="data.mLastName"
            type="text"
            placeholder="Apellido Materno"
            class="w-full px-4 py-2 mt-4 border-2 border-[#C3C3C3] rounded-lg focus:outline-none hover:border-dark focus:border-primary placeholder-[#C3C3C3] transition duration-300"
          />
          <div>
            <input
              required
              v-model="data.email"
              @input="validEmail = null"
              type="email"
              placeholder="Correo Electrónico"
              class="w-full px-4 py-2 mt-4 border-2 border-[#C3C3C3] rounded-lg focus:outline-none hover:border-dark focus:border-primary placeholder-[#C3C3C3] transition duration-300"
              :class="validEmail === false ? 'border-[#D93025]' : 'border-[#229954]'"
            />
            <FormInputErrorItem v-if="validEmail === false">
              <template #text>El correo electrónico ya está en uso.</template>
            </FormInputErrorItem>
          </div>
          <input
            :value="data.phoneNumber"
            @input="formatPhone"
            type="tel"
            placeholder="Número de Teléfono"
            maxlength="16"
            class="w-full px-4 py-2 mt-4 border-2 border-[#C3C3C3] rounded-lg focus:outline-none hover:border-dark focus:border-primary placeholder-[#C3C3C3] transition duration-300"
          />
          <div>
            <input
              required
              v-model="data.password"
              type="password"
              placeholder="Contraseña"
              class="w-full px-4 py-2 mt-4 border-2 border-[#C3C3C3] rounded-lg focus:outline-none hover:border-dark focus:border-primary placeholder-[#C3C3C3] transition duration-300"
            />
            <div class="mt-6">
              <p>La contraseña debe contener:</p>
              <ul class="mt-4">
                <PasswordRequirementItem
                  v-for="(req, index) in passwordStatus"
                  :key="index"
                  :is-valid="req.isValid"
                >
                  <template #text>{{ req.text }}</template>
                </PasswordRequirementItem>
              </ul>
            </div>
          </div>
          <div>
            <input
              required
              v-model="data.confirmPassword"
              type="password"
              placeholder="Confirmar Contraseña"
              class="w-full px-4 py-2 mt-4 border-2 border-[#C3C3C3] rounded-lg focus:outline-none hover:border-dark focus:border-primary placeholder-[#C3C3C3] transition duration-300"
            />
            <div class="mt-4">
              <PasswordRequirementItem :is-valid="passwordsMatch">
                <template #text>Las contraseñas coinciden</template>
              </PasswordRequirementItem>
            </div>
          </div>
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
