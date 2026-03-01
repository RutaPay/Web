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

//Script para el funcionamiento del sidebar
//Arreglado el toggle con Vue, usando clases de Vue y sin objetos del DOM, ahora el toggle funciona correctamente y no da errores en la consola
import { ref } from 'vue'

const isClosed = ref(false)

const toggleSidebar = () => {
  isClosed.value = !isClosed.value
}
</script>

<template>
  <!-- Comienzo del header -->
  <nav
    class="fixed top-0 left-0 h-full py-8 px-6 border-r-2 bg-white transition-all duration-500 z-100"
    :class="{ close: isClosed, 'w-64': !isClosed, 'w-28': isClosed }"
  >
    <header class="relative">
      <div class="flex items-center">
        <span class="min-w-16 flex items-center justify-center">
          <img
            class="w-32 rounded-xl"
            :class="{ hidden: isClosed }"
            src="../assets/LogoRutaPay.png"
            alt="logo"
          />
        </span>
        <!--<div class="header-text flex flex-col text-text-light" :class="{ hidden: isClosed }">
          <span class="font-normal">RutaPay</span>
          <span class="-mt-1"></span>
        </div>
        -->
      </div>

      <!--También agregue el cambio de ícono al toggle-->
      <component
        :is="isClosed ? ChevronsRight : ChevronsLeft"
        id="toggle"
        @click="toggleSidebar"
        class="absolute top-1/2 right-6 transform -translate-y-1/2 cursor-pointer h-8 w-8 bg-primary hover:bg-dark flex items-center justify-center rounded-[50%] text-white text-2xl transition-colors duration-300"
        :class="{ 'left-4': isClosed }"
      />
    </header>

    <div class="h-[calc(100%-52px)] flex flex-col justify-between">
      <div class="mt-12">
        <li class="flex items-center justify-center h-8">
          <Search
            class="flex items-center justify-center min-w-16 text-2xl text-text-light transition-all duration-200"
          ></Search>
          <input
            class="w-7/8 outline-none border rounded-xl text-base font-normal text-white bg-secondary hover:border hover:border-dark transition-all duration-300 p-2"
            :class="{ hidden: isClosed }"
            type="search"
            placeholder="Search"
          />
        </li>
        <ul class="mt-12">
          <SideBarItem url="/" :isClosed="isClosed">
            <template #icon>
              <Home
                class="flex items-center justify-center min-w-16 text-2xl text-text-light transition-all duration-200 hover:text-white"
              ></Home>
            </template>
            <template #text>Inicio</template>
          </SideBarItem>
          <SideBarItem url="map" :isClosed="isClosed">
            <template #icon>
              <Trip
                class="flex items-center justify-center min-w-16 text-2xl text-text-light transition-all duration-200 hover:text-white"
              ></Trip>
            </template>
            <template #text>Mapa de Rutas</template>
          </SideBarItem>
          <SideBarItem url="card" :isClosed="isClosed">
            <template #icon>
              <CreditCardAlt
                class="flex items-center justify-center min-w-16 text-2xl text-text-light transition-all duration-200 hover:text-white"
              ></CreditCardAlt>
            </template>
            <template #text>Tarjeta</template>
          </SideBarItem>
          <SideBarItem url="rewards" :isClosed="isClosed">
            <template #icon>
              <Gift
                class="flex items-center justify-center min-w-16 text-2xl text-text-light transition-all duration-200 hover:text-white"
              ></Gift>
            </template>
            <template #text>Recompensas</template>
          </SideBarItem>
          <SideBarItem url="account" :isClosed="isClosed">
            <template #icon>
              <User
                class="flex items-center justify-center min-w-16 text-2xl text-text-light transition-all duration-200 hover:text-white"
              ></User>
            </template>
            <template #text>Cuenta</template>
          </SideBarItem>
        </ul>
      </div>
    </div>
    <div class="-mt-14">
      <SideBarItem url="log-out" :isClosed="isClosed">
        <template #icon>
          <ArrowOutLeftSquareHalf
            class="flex items-center justify-center min-w-16 text-2xl text-text-light transition-all duration-200 hover:text-white"
          ></ArrowOutLeftSquareHalf>
        </template>
        <template #text>Log-Out</template>
      </SideBarItem>
    </div>
  </nav>

  <!-- Fin del header -->
</template>

<script lang="ts">
export default {
  name: 'HeaderComponent',
}
</script>
