<script setup lang="ts">
import SideBar from '../components/SideBar.vue'
import { useSidebarStore } from '@/stores/sidebarstate'

const sidebarStore = useSidebarStore()
</script>

<template>
  <SideBar />
  <main
    class="min-h-screen transition-all duration-500 bg-gray-50 p-6 md:p-10"
    :class="{ 'ml-64': !sidebarStore.closedState, 'ml-28': sidebarStore.closedState }"
  ></main>
</template>
