<script setup lang="ts">
import HeaderComponent from '../components/HeaderComponent.vue'
import Dashboard from '../components/dashboard.vue'
</script>

<template>
  <main>
    <HeaderComponent />
    <Dashboard />
  </main>
</template>

<script lang="ts">
export default {
  name: 'HomeView',
}
</script>
