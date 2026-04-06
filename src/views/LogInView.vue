<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'vue-sonner'
import { useUserInfo } from '@/composables/useAuth'

const { handleGetUserInfo } = useUserInfo()
const authStore = useAuthStore()

const router = useRouter()

const data = reactive({
  email: '',
  password: '',
})

const submitForm = async () => {
  try {
    const response = await fetch('https://localhost:7130/api/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    })

    if (response.ok) {
      toast.success('¡Inicio de sesión exitoso!', {
        description: 'Bienvenido de nuevo a RutaPay.',
      })
    } else if (response.status === 401) {
      toast.error('Credenciales incorrectas', {
        description: 'Por favor, verifica tu correo electrónico y contraseña.',
      })
      throw new Error('Unauthorized')
    } else {
      throw new Error('Login failed')
    }

    handleGetUserInfo()

    await router.push('/dashboard')
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      toast.error('Error de Conexión', {
        description:
          'No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet.',
      })
    }
    authStore.setAuth(false)
  }
}
</script>

<template>
  <main>
    <div class="flex items-center justify-center min-h-screen w-full bg-white">
      <div
        class="p-16 bg-white text-dark rounded-lg shadow-md border border-dark w-full md:w-1/2 lg:w-1/3"
      >
        <h1 class="text-3xl font-bold mt-4">Inicia sesión para usar RutaPay</h1>
        <p class="text-sm font-bold mt-2">
          Accede para usar nuestra plataforma de pagos para el transporte público.
        </p>
        <form @submit.prevent="submitForm" class="mt-8 w-full">
          <input
            required
            v-model="data.email"
            type="email"
            placeholder="Correo Electrónico"
            class="w-full px-4 py-2 mt-4 border-2 border-[#C3C3C3] rounded-lg focus:outline-none hover:border-dark focus:border-primary placeholder-[#C3C3C3] transition duration-300"
          />
          <input
            required
            v-model="data.password"
            type="password"
            placeholder="Contraseña"
            class="w-full px-4 py-2 mt-4 border-2 border-[#C3C3C3] rounded-lg focus:outline-none hover:border-dark focus:border-primary placeholder-[#C3C3C3] transition duration-300"
          />
          <p class="text-sm mt-2">
            ¿Olvidaste tu contraseña?
            <RouterLink to="/forgot-password" class="text-primary font-medium hover:underline"
              >Restablecer contraseña</RouterLink
            >
          </p>
          <input
            type="submit"
            value="Iniciar Sesión"
            class="w-full px-4 py-2 mt-6 bg-primary text-white font-medium rounded-lg hover:bg-dark cursor-pointer transition duration-300"
          />
        </form>
        <p class="text-sm mt-6">
          ¿No tienes una cuenta?
          <RouterLink to="/register" class="text-primary font-medium hover:underline"
            >Regístrate aquí</RouterLink
          >
        </p>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
export default {
  name: 'LogInView',
}
</script>
