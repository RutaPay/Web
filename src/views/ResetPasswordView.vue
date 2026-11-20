<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { API_URL } from '@/composables/constants'

const route = useRoute()
const router = useRouter()

const email = computed(() => (route.query.email as string | undefined) ?? '')
const token = computed(() => (route.query.token as string | undefined) ?? '')
const hasLink = computed(() => Boolean(email.value && token.value))

const password = ref('')
const confirmPassword = ref('')
const isSubmitting = ref(false)

const passwordError = computed(() => {
  if (!password.value) return ''
  if (password.value.length < 8) return 'Debe tener al menos 8 caracteres.'
  if (!/[A-Z]/.test(password.value)) return 'Debe incluir una mayúscula.'
  if (!/[a-z]/.test(password.value)) return 'Debe incluir una minúscula.'
  if (!/[0-9]/.test(password.value)) return 'Debe incluir un número.'
  if (!/[^A-Za-z0-9]/.test(password.value)) return 'Debe incluir un símbolo.'
  return ''
})

const passwordsMatch = computed(
  () => !confirmPassword.value || password.value === confirmPassword.value,
)

const canSubmit = computed(
  () =>
    hasLink.value &&
    !isSubmitting.value &&
    password.value.length > 0 &&
    !passwordError.value &&
    passwordsMatch.value &&
    confirmPassword.value.length > 0,
)

const submit = async () => {
  if (!canSubmit.value) return

  isSubmitting.value = true
  try {
    const response = await fetch(`${API_URL}/api/account/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        token: token.value,
        newPassword: password.value,
      }),
    })

    const data = await response.json().catch(() => null)

    if (response.ok) {
      toast.success('Contraseña actualizada', {
        description: 'Ya puedes iniciar sesión con tu nueva contraseña.',
      })
      await router.push('/login')
      return
    }

    let message = data?.message ?? 'No se pudo restablecer la contraseña.'
    if (Array.isArray(data?.errors) && data.errors.length > 0) {
      message = `${message} ${data.errors.join(' ')}`
    }
    toast.error(message)
  } catch {
    toast.error('Error de red', {
      description: 'No se pudo conectar con el servidor.',
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main>
    <div class="flex items-center justify-center min-h-screen w-full bg-white">
      <div
        class="p-16 bg-white text-dark rounded-lg shadow-md border border-dark w-full md:w-1/2 lg:w-1/3"
      >
        <h1 class="text-3xl font-bold mt-4">Nueva Contraseña</h1>

        <template v-if="!hasLink">
          <p class="text-sm font-bold mt-2">
            El enlace no es válido o está incompleto. Solicita uno nuevo desde la pantalla de
            recuperación.
          </p>
          <RouterLink
            to="/forgot-password"
            class="block w-full text-center px-4 py-2 mt-6 bg-primary text-white font-medium rounded-lg hover:bg-dark transition duration-300"
          >
            Solicitar otro enlace
          </RouterLink>
        </template>

        <template v-else>
          <p class="text-sm font-bold mt-2">
            Crea una contraseña nueva para <strong>{{ email }}</strong>.
          </p>

          <form @submit.prevent="submit" class="mt-8 w-full">
            <input
              v-model="password"
              required
              type="password"
              autocomplete="new-password"
              placeholder="Nueva contraseña"
              class="w-full px-4 py-2 mt-4 border-2 border-[#C3C3C3] rounded-lg focus:outline-none hover:border-dark focus:border-primary placeholder-[#C3C3C3] transition duration-300"
            />
            <p v-if="passwordError" class="mt-1 text-xs font-semibold text-red-600">
              {{ passwordError }}
            </p>

            <input
              v-model="confirmPassword"
              required
              type="password"
              autocomplete="new-password"
              placeholder="Confirmar contraseña"
              class="w-full px-4 py-2 mt-4 border-2 border-[#C3C3C3] rounded-lg focus:outline-none hover:border-dark focus:border-primary placeholder-[#C3C3C3] transition duration-300"
            />
            <p v-if="!passwordsMatch" class="mt-1 text-xs font-semibold text-red-600">
              Las contraseñas no coinciden.
            </p>

            <p class="text-xs text-gray-500 mt-4">
              Mínimo 8 caracteres, con mayúscula, minúscula, número y símbolo.
            </p>

            <input
              type="submit"
              :disabled="!canSubmit"
              :value="isSubmitting ? 'Guardando…' : 'Guardar contraseña'"
              class="w-full px-4 py-2 mt-6 bg-primary text-white font-medium rounded-lg hover:bg-dark cursor-pointer transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </form>
        </template>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
export default {
  name: 'ResetPasswordView',
}
</script>
