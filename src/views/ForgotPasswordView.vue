<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { API_URL } from '@/composables/constants'

const email = ref('')
const isSubmitting = ref(false)
const isSent = ref(false)

const submit = async () => {
  const value = email.value.trim()
  if (!value) return

  isSubmitting.value = true
  try {
    const response = await fetch(`${API_URL}/api/account/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: value }),
    })

    if (response.ok) {
      isSent.value = true
      return
    }

    let message = 'No se pudo enviar el correo. Inténtalo de nuevo.'
    try {
      const data = await response.json()
      message = data?.message ?? data?.title ?? message
    } catch {
      // La respuesta de error no traía cuerpo JSON.
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
        <h1 class="text-3xl font-bold mt-4">Recuperar Contraseña</h1>

        <template v-if="isSent">
          <p class="text-sm font-bold mt-2">
            Si el correo <strong>{{ email }}</strong> está registrado, te enviamos un enlace para
            crear una nueva contraseña. Revisa también tu carpeta de spam.
          </p>
          <p class="text-xs text-gray-500 mt-4">El enlace vence en 60 minutos.</p>
          <RouterLink
            to="/login"
            class="block w-full text-center px-4 py-2 mt-6 bg-primary text-white font-medium rounded-lg hover:bg-dark cursor-pointer transition duration-300"
          >
            Volver a iniciar sesión
          </RouterLink>
        </template>

        <template v-else>
          <p class="text-sm font-bold mt-2">
            Ingresa tu correo electrónico y te enviaremos un enlace para que puedas crear una nueva
            contraseña.
          </p>
          <form @submit.prevent="submit" class="mt-8 w-full">
            <input
              v-model="email"
              required
              type="email"
              autocomplete="email"
              placeholder="Correo Electrónico"
              class="w-full px-4 py-2 mt-4 border-2 border-[#C3C3C3] rounded-lg focus:outline-none hover:border-dark focus:border-primary placeholder-[#C3C3C3] transition duration-300"
            />
            <input
              type="submit"
              :disabled="isSubmitting"
              :value="isSubmitting ? 'Enviando…' : 'Restablecer Contraseña'"
              class="w-full px-4 py-2 mt-6 bg-primary text-white font-medium rounded-lg hover:bg-dark cursor-pointer transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </form>
          <RouterLink
            to="/login"
            class="block text-center text-sm text-primary font-medium mt-6 hover:underline"
          >
            Volver a iniciar sesión
          </RouterLink>
        </template>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
export default {
  name: 'ForgotPasswordView',
}
</script>
