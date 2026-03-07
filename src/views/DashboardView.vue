<script setup lang="ts">
import HeaderComponent from '../components/HeaderComponent.vue'
</script>

<template>
  <main>
    <HeaderComponent />
    <main
      class="flex-1 bg-gray-100 h-screen overflow-y-auto p-6 md:p-10 transition-all duration-300"
    >
      <div
        class="w-full min-h-full border-2 border-dashed border-gray-300 rounded-2xl p-4 flex flex-col gap-8"
      ></div>
    </main>
  </main>
</template>

<script lang="ts">
export default {
  name: 'DashboardView',
}
</script>
