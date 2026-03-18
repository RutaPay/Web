<script setup lang="ts"></script>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center text-text-dark bg-gray-50 p-6 md:p-10"
  >
    <h1 class="text-2xl md:text-3xl lg:text-4xl">
      <span class="text-primary font-bold text-3xl md:text-4xl lg:text-5xl">404</span> - Page Not
      Found
    </h1>
    <p class="mt-8 text-xl text-center">
      Oops, it looks like the page "<strong>{{ $route.params.pathMatch }}</strong
      >" doesn't exist.
    </p>
    <RouterLink
      to="/"
      class="mt-6 px-4 py-2 bg-primary text-white rounded-md hover:bg-dark transition-colors duration-300"
    >
      Inicio
    </RouterLink>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NotFoundView',
}
</script>
