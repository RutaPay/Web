<script setup lang="ts">
import { ref } from 'vue'

import { PlusCircle } from '@boxicons/vue'
import SideBar from '../components/SideBar.vue'
import Footer from '../components/Footer.vue'
import { useSidebarStore } from '@/stores/sidebarstate'
import { useAuthStore } from '@/stores/auth'

const sidebarStore = useSidebarStore()
const authStore = useAuthStore()

</script>

<template>
  <SideBar />
   <main
    class="min-h-screen transition-all duration-500 bg-gray-50 p-6 md:p-10"
    :class="{ 'ml-64': !sidebarStore.closedState, 'ml-28': sidebarStore.closedState }"
   >
      <div class="h-auto bg-white rounded-3xl shadow-sm border border-gray-200 p-12 md:p-16 lg:p-24">
        <div class="relative bg-white border-2 border-dark rounded-2xl p-8 sm:p-12 shadow-xl">
          <div class="absolute -top-6 -left-6 z-10">

          </div>
        </div>
      </div>
   </main>
</template>
