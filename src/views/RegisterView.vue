<script setup lang="ts">
import { ChevronLeft } from '@boxicons/vue'
</script>

<template>
  <main>
    <div class="flex items-center justify-center min-h-screen w-full bg-white">
      <div class="p-16 bg-white text-dark rounded-lg shadow-md border border-[#333]">
        <h1 class="text-3xl font-bold mt-4">Empieza a usar RutaPay</h1>
        <p class="text-sm font-bold mt-2">
          Regístrate para comenzar a usar nuestra plataforma de pagos.
        </p>
        <form method="POST" action="" class="mt-8 w-md">
          <input
            required
            type="text"
            name="name"
            placeholder="Nombre(s)"
            class="w-full px-4 py-2 mt-4 border-2 border-[#C3C3C3] rounded-lg focus:outline-none hover:border-dark focus:border-primary placeholder-[#C3C3C3] transition duration-300"
          />
          <input
            required
            type="text"
            name="pLastName"
            placeholder="Apellido Paterno"
            class="w-full px-4 py-2 mt-4 border-2 border-[#C3C3C3] rounded-lg focus:outline-none hover:border-dark focus:border-primary placeholder-[#C3C3C3] transition duration-300"
          />
          <input
            required
            type="text"
            name="mLastName"
            placeholder="Apellido Materno"
            class="w-full px-4 py-2 mt-4 border-2 border-[#C3C3C3] rounded-lg focus:outline-none hover:border-dark focus:border-primary placeholder-[#C3C3C3] transition duration-300"
          />
          <input
            required
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            class="w-full px-4 py-2 mt-4 border-2 border-[#C3C3C3] rounded-lg focus:outline-none hover:border-dark focus:border-primary placeholder-[#C3C3C3] transition duration-300"
          />
          <input
            required
            type="tel"
            name="phone"
            placeholder="Número de Teléfono"
            class="w-full px-4 py-2 mt-4 border-2 border-[#C3C3C3] rounded-lg focus:outline-none hover:border-dark focus:border-primary placeholder-[#C3C3C3] transition duration-300"
          />
          <input
            required
            type="password"
            name="password"
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
