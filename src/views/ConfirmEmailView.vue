<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { API_URL } from '@/composables/constants'

const route = useRoute()

const email = computed(() => (route.query.email as string | undefined) ?? '')
const token = computed(() => (route.query.token as string | undefined) ?? '')

const status = ref<'loading' | 'success' | 'error'>('loading')
const message = ref('Estamos confirmando tu correo…')

onMounted(async () => {
  if (!email.value || !token.value) {
    status.value = 'error'
    message.value = 'El enlace no es válido o está incompleto.'
    return
  }

  try {
    const response = await fetch(`${API_URL}/api/account/confirm-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, token: token.value }),
    })

    const data = await response.json().catch(() => null)

    if (response.ok) {
      status.value = 'success'
      message.value = data?.message ?? '¡Correo confirmado!'
      return
    }

    status.value = 'error'
    message.value = data?.message ?? 'El enlace no es válido o expiró.'
  } catch {
    status.value = 'error'
    message.value = 'No se pudo conectar con el servidor. Inténtalo de nuevo.'
  }
})
</script>

<template>
  <main>
    <div class="flex items-center justify-center min-h-screen w-full bg-white">
      <div
        class="p-16 bg-white text-dark rounded-lg shadow-md border border-dark w-full md:w-1/2 lg:w-1/3 text-center"
      >
        <h1 class="text-3xl font-bold mt-4">Confirmar correo</h1>

        <template v-if="status === 'loading'">
          <div class="flex justify-center mt-8">
            <div
              class="h-10 w-10 rounded-full border-4 border-gray-200 border-t-primary animate-spin"
            ></div>
          </div>
          <p class="text-sm font-bold mt-6">{{ message }}</p>
        </template>

        <template v-else-if="status === 'success'">
          <p class="text-sm font-bold mt-6 text-green-600">{{ message }}</p>
          <RouterLink
            to="/login"
            class="block w-full text-center px-4 py-2 mt-6 bg-primary text-white font-medium rounded-lg hover:bg-dark transition duration-300"
          >
            Iniciar sesión
          </RouterLink>
        </template>

        <template v-else>
          <p class="text-sm font-bold mt-6 text-red-600">{{ message }}</p>
          <RouterLink
            to="/forgot-password"
            class="block w-full text-center px-4 py-2 mt-6 bg-primary text-white font-medium rounded-lg hover:bg-dark transition duration-300"
          >
            Recuperar acceso
          </RouterLink>
        </template>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
export default {
  name: 'ConfirmEmailView',
}
</script>
