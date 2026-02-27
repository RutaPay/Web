<script setup lang="ts">
import { ChevronLeft } from '@boxicons/vue'
</script>

<template>
  <main>
    <div class="flex items-center justify-center min-h-screen w-full bg-white">
      <div class="p-10 bg-white text-dark rounded-lg shadow-md border border-[#333]">
        <h1 class="text-3xl font-bold mt-4">Registrarse en RutaPay</h1>
        <form method="POST" action="" class="mt-6 w-md">
          <input
            required
            type="text"
            name="name"
            placeholder="Nombre(s)"
            class="w-full px-4 py-2 mt-4 border-2 border-[#3E3E3A] rounded-lg focus:outline-none focus:border-orange-400 placeholder-[#C3C3C3]"
          />
          <input
            required
            type="text"
            name="pLastName"
            placeholder="Apellido Paterno"
            class="w-full px-4 py-2 mt-4 border-2 dark:border-[#3E3E3A] border-[#E3E3E0] rounded-lg focus:outline-none focus:border-orange-400 dark:bg-[#2C2C2C] dark:placeholder-[#C3C3C3]"
          />
          <input
            required
            type="text"
            name="mLastName"
            placeholder="Apellido Materno"
            class="w-full px-4 py-2 mt-4 border-2 dark:border-[#3E3E3A] border-[#E3E3E0] rounded-lg focus:outline-none focus:border-orange-400 dark:bg-[#2C2C2C] dark:placeholder-[#C3C3C3]"
          />
          <input
            required
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            class="w-full px-4 py-2 mt-4 border-2 dark:border-[#3E3E3A] border-[#E3E3E0] rounded-lg focus:outline-none focus:border-orange-400 dark:bg-[#2C2C2C] dark:placeholder-[#C3C3C3]"
          />
          <input
            required
            type="password"
            name="password"
            placeholder="Contraseña"
            class="w-full px-4 py-2 mt-4 border-2 dark:border-[#3E3E3A] border-[#E3E3E0] rounded-lg focus:outline-none focus:border-orange-400 dark:bg-[#2C2C2C] dark:placeholder-[#C3C3C3]"
          />
          <select
            name="role"
            id="role"
            class="w-full px-4 py-2 mt-4 border-2 dark:border-[#3E3E3A] border-[#E3E3E0] rounded-lg focus:outline-none focus:border-orange-400"
          >
            <option value="student" id="student" class="dark:bg-[#2C2C2C]">Estudiante</option>
            <option value="teacher" id="teacher" class="dark:bg-[#2C2C2C]">Maestro</option>
          </select>
          <select
            name="career"
            id="career"
            class="w-full px-4 py-2 mt-4 border-2 dark:border-[#3E3E3A] border-[#E3E3E0] rounded-lg focus:outline-none focus:border-orange-400"
          >
            <option value="" class="dark:bg-[#2C2C2C]">Programación</option>
            <option value="" class="dark:bg-[#2C2C2C]">Recursos Humanos</option>
            <option value="" class="dark:bg-[#2C2C2C]">Electrónica</option>
            <option value="" class="dark:bg-[#2C2C2C]">Máquinas y Herramientas</option>
            <option value="" class="dark:bg-[#2C2C2C]">Mecatrónica</option>
            <option value="" class="dark:bg-[#2C2C2C]">Robótica</option>
          </select>
          <input
            type="submit"
            value="Registrarse"
            class="w-full px-4 py-2 mt-6 bg-orange-400 text-white font-medium rounded-lg hover:bg-orange-500 cursor-pointer"
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
