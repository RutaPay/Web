<!-- eslint-disable vue/require-toggle-inside-transition -->
<script setup lang="ts"></script>

<template>
  <Transition name="dialog-fade">
    <main
      class="backdrop:bg-[#CCC]/40 backdrop:backdrop-blur-xs flex items-center justify-center z-100 rounded-2xl shadow-2xl overflow-hidden fixed inset-0 m-auto border-none focus:outline-none"
    >
      <div class="h-auto bg-white rounded-3xl shadow-sm border border-gray-200 mb-8 p-6 md:p-10">
        <header class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-semibold text-text-dark">Realiza una Recarga</h3>
          <RouterLink :to="{ name: 'card' }" class="p-2 -mr-2 text-text-dark transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </RouterLink>
        </header>
        <!-- Payment -->
        <div class="payment-box h-max w-full md:w-[500px] bg-blue-800 rounded-3xl shadow-sm border border-gray-200 mb-8 p-6 md:p-10 flex flex-col md:flex-col ">
        <!-- Card Box -->
        <div class="card-box h-max w-full md:w-[250px] bg-black rounded-3xl shadow-sm mb-8 p-6 md:p-10">
            <div class="card-visual"></div>
        </div>
        <!-- Payment Form -->
        <div class="form-box h-max w-full md:w-[250px] bg-white rounded-3xl shadow-sm mb-8 p-6 md:p-10 flex flex-col">

        </div>
       </div>
      </div>
    </main>
  </Transition>
</template>
