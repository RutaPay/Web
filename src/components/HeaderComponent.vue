<script setup lang="ts">
import {
  ChevronsRight,
  ChevronsLeft,
  Home,
  Search,
  Trip,
  CreditCardAlt,
  Gift,
  User,
  ArrowOutLeftSquareHalf,
} from '@boxicons/vue'
import SideBarItem from '@/components/SideBarItem.vue'
import { useSidebarStore } from '@/stores/sidebarstate'

const sidebarStore = useSidebarStore()
</script>

<template>
  <nav
    class="fixed top-0 left-0 h-full py-8 px-6 border-r-2 bg-white transition-all duration-500 z-100"
    :class="{
      close: sidebarStore.closedState,
      'w-64': !sidebarStore.closedState,
      'w-28': sidebarStore.closedState,
    }"
  >
    <header class="relative flex items-center mb-8 h-16">
      <div class="flex items-center overflow-hidden">
        <span class="min-w-16 flex items-center justify-center">
          <img
            class="w-32 rounded-xl"
            :class="{ hidden: sidebarStore.closedState }"
            src="../assets/LogoRutaPay.svg"
            alt="logo"
          />
        </span>
        <!--<div class="header-text flex flex-col text-text-light" :class="{ hidden: isClosed }">
          <span class="font-normal">RutaPay</span>
          <span class="-mt-1"></span>
        </div>
        -->
      </div>

      <component
        :is="sidebarStore.closedState ? ChevronsRight : ChevronsLeft"
        id="toggle"
        @click="sidebarStore.toggleSidebar()"
        class="absolute top-1/2 right-6 transform -translate-y-1/2 cursor-pointer h-8 w-8 bg-primary hover:bg-dark flex items-center justify-center rounded-[50%] text-white text-2xl transition-colors duration-300"
        :class="{ 'left-4': sidebarStore.closedState }"
      />
    </header>

    <div class="flex flex-col grow overflow-y-auto overflow-x-hidden">
      <div class="mt-12">
        <li class="flex items-center justify-center h-8">
          <Search
            class="flex items-center justify-center min-w-16 text-2xl text-text-light transition-all duration-200"
          ></Search>
          <input
            class="w-7/8 outline-none border rounded-xl text-base font-normal text-white bg-secondary hover:border hover:border-dark transition-all duration-300 p-2"
            :class="{ hidden: sidebarStore.closedState }"
            type="search"
            placeholder="Search"
          />
        </li>
        <ul class="space-y-2">
          <SideBarItem url="/" :isClosed="sidebarStore.closedState">
            <template #icon>
              <Home
                class="flex items-center justify-center min-w-16 text-2xl text-text-light transition-all duration-200 group-hover:text-white"
              ></Home>
            </template>
            <template #text>Inicio</template>
          </SideBarItem>
          <SideBarItem url="map" :isClosed="sidebarStore.closedState">
            <template #icon>
              <Trip
                class="flex items-center justify-center min-w-16 text-2xl text-text-light transition-all duration-200 group-hover:text-white"
              ></Trip>
            </template>
            <template #text>Mapa de Rutas</template>
          </SideBarItem>
          <SideBarItem url="card" :isClosed="sidebarStore.closedState">
            <template #icon>
              <CreditCardAlt
                class="flex items-center justify-center min-w-16 text-2xl text-text-light transition-all duration-200 group-hover:text-white"
              ></CreditCardAlt>
            </template>
            <template #text>Tarjeta</template>
          </SideBarItem>
          <SideBarItem url="rewards" :isClosed="sidebarStore.closedState">
            <template #icon>
              <Gift
                class="flex items-center justify-center min-w-16 text-2xl text-text-light transition-all duration-200 group-hover:text-white"
              ></Gift>
            </template>
            <template #text>Recompensas</template>
          </SideBarItem>
          <SideBarItem url="account" :isClosed="sidebarStore.closedState">
            <template #icon>
              <User
                class="flex items-center justify-center min-w-16 text-2xl text-text-light transition-all duration-200 group-hover:text-white"
              ></User>
            </template>
            <template #text>Cuenta</template>
          </SideBarItem>
        </ul>
      </div>
    </div>
    <div class="mt-auto pt-10">
      <SideBarItem url="log-out" :isClosed="sidebarStore.closedState">
        <template #icon>
          <ArrowOutLeftSquareHalf
            class="flex items-center justify-center min-w-16 text-2xl text-text-light transition-all duration-200 group-hover:text-white"
          ></ArrowOutLeftSquareHalf>
        </template>
        <template #text>Cerrar Sesión</template>
      </SideBarItem>
    </div>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'HeaderComponent',
}
</script>
