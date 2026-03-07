<template>
  <main class="flex-1 bg-gray-50 p-6 md:p-10 overflow-y-auto h-screen transition-all duration-300">

    <section class="w-full bg-primary text-white rounded-2xl p-8 mb-10 shadow-lg flex flex-col justify-center min-h-[300px] relative overflow-hidden">
      <div class="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>

      <h1 class="text-4xl md:text-5xl font-bold mb-4 z-10">Bienvenido de vuelta</h1>
      <p class="text-lg opacity-90 max-w-2xl z-10">
        Aquí tienes un resumen rápido de tu actividad, rutas recientes y el estado de tus recompensas.
        ¿Qué viaje planeamos hoy?
      </p>

      <div class="mt-8 z-10">
        <button class="bg-white text-primary font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-300">
          Ver rutas de hoy
        </button>
      </div>
    </section>

    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      <div class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col justify-between h-48">
        <div>
          <h3 class="text-lg font-semibold text-gray-700">Rutas Activas</h3>
          <p class="text-4xl font-bold text-primary mt-2">12</p>
        </div>
        <div class="flex items-center text-sm text-gray-500 mt-auto border-t border-gray-50 pt-3">
          <span>Actualizado hace 5 min</span>
        </div>
      </div>

      <div class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col justify-between h-48">
        <div>
          <h3 class="text-lg font-semibold text-gray-700">Puntos Acumulados</h3>
          <p class="text-4xl font-bold text-primary mt-2">1,450</p>
        </div>
        <div class="flex items-center text-sm text-gray-500 mt-auto border-t border-gray-50 pt-3">
          <span class="text-green-500 font-medium mr-1">+150</span> esta semana
        </div>
      </div>

      <div class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col justify-between h-48">
        <div>
          <h3 class="text-lg font-semibold text-gray-700">Saldo Actual</h3>
          <p class="text-4xl font-bold text-primary mt-2">$320.50</p>
        </div>
        <div class="flex items-center text-sm text-gray-500 mt-auto border-t border-gray-50 pt-3">
          <span>Tarjeta terminación •••• 4321</span>
        </div>
      </div>

    </section>
  </main>
</template>

<script lang="ts">
export default {
  name: 'DashboardContent',
}
</script>
