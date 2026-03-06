<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const data = reactive({
  email: '',
  password: '',
})

const submitForm = async () => {
  await fetch('https://localhost:7130/api/account/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })

  await router.push('/')
}
</script>

<template>
  <main>
    <div class="flex items-center justify-center min-h-screen w-full bg-white">
      <div
        class="p-16 bg-white text-dark rounded-lg shadow-md border border-dark w-full md:w-1/2 lg:w-1/3"
      >
        <h1 class="text-3xl font-bold mt-4">Inicia sesión para usar RutaPay</h1>
        <p class="text-sm font-bold mt-2">Accede para usar nuestra plataforma de pagos para el transporte público.</p>
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
          <input
            type="submit"
            value="Iniciar Sesión"
            class="w-full px-4 py-2 mt-6 bg-primary text-white font-medium rounded-lg hover:bg-dark cursor-pointer transition duration-300"
          />
        </form>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
export default {
  name: 'LogInView',
}
</script>
