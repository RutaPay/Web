<script setup lang="ts">
import HeaderComponent from '../components/HeaderComponent.vue'
</script>

<template>
  <main>
    <HeaderComponent />
    <!-- Agregar dashboard del header component para no tener problemas de compatibilidad
         Comenzar con el Hero section Siguiente
    -->
  </main>
</template>

<script lang="ts">
export default {
  name: 'HomeView',
}
</script>
