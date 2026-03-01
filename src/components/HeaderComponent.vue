<script setup lang="ts">
import { ChevronsRight, Home, Search } from '@boxicons/vue'
import SideBarItem from '@/components/SideBarItem.vue'

defineOptions({ name: 'ChevronsRightIcon' })
</script>

<template>
  <!-- Comienzo del header -->
  <nav class="sidebar">
    <header>
      <div class="image text">
        <span class="image">
          <img src="../assets/LogoRutaPay.png" alt="logo" />
        </span>
        <div class="text header-text">
          <span class="name">RutaPay</span>
          <span class="description"></span>
        </div>
      </div>

      <ChevronsRight class="toggle"></ChevronsRight>
    </header>

    <div class="menu-bar">
      <div class="menu">
        <li class="nav-links">
          <Search class="icons"></Search>
          <input type="search" placeholder="Search" />
        </li>
        <ul class="menu-links">
          <!-- En vez de usar el antiguo <li> usa el nuevo SideBarItem, url pones la ruta sencilla de la app (el router se encarga de mostrarlo), #icon pones el ícono y #text pones el texto del item -->
          <SideBarItem url="home">
            <template #icon>
              <Home class="icons"></Home>
<<<<<<< HEAD
              <span class="text nav-text">Inicio</span>
            </a>
          </li>
          <li class="nav-links">
            <a href="#">
              <Home class="icons"></Home>
              <span class="text nav-text">Mapa</span>
            </a>
          </li>
          <li class="nav-links">
            <a href="#">
              <Home class="icons"></Home>
              <span class="text nav-text">DashBoard</span>
            </a>
          </li>
          <li class="nav-links">
            <a href="#">
              <Home class="icons"></Home>
              <span class="text nav-text">DashBoard</span>
            </a>
          </li>
          <li class="nav-links">
            <a href="#">
              <Home class="icons"></Home>
              <span class="text nav-text">DashBoard</span>
            </a>
          </li>
          <li class="nav-links">
            <a href="#">
              <Home class="icons"></Home>
              <span class="text nav-text">DashBoard</span>
            </a>
          </li>
=======
            </template>
            <template #text>DashBoard</template>
          </SideBarItem>
>>>>>>> cbcb48c397f619fc570aebcaa15695019193ac43
        </ul>
      </div>
    </div>
  </nav>

  <!-- Fin del header -->
</template>
<!-- Inicia el Style -->
<style>
* {
  font-family: 'Lexend', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  /* -- Colorsinis */
  --body-color: #e4e9f7;
  --sidebar-color: #fff;
  --primary-color: #695cfe;
  --primary-color-light: #f6f5ff;
  --toggle-color: #ddd;
  --text-color: #707070;

  /* -- Transición */

  --trans-02: all 0.2 ease;
  --trans-03: all 0.3 ease;
  --trans-04: all 0.4 ease;
  --trans-05: all 0.5 ease;
}
/* -- CSS Reutilizable -- */

.sidebar .text {
  font-size: 16px;
  font-weight: 200;
  color: var(--text-color);
}

.sidebar .image {
  min-width: 60px;
  display: flex;
  align-items: center;
}

/* -- Sidebar -- */
body {
  height: 100vh;
  background: var(--body-color);
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  padding: 10px 14px;
  background: var(--sidebar-color);
}

.sidebar li {
  height: 50px;
  margin-top: 10px;
  list-style: none;
  display: flex;
  align-items: center;
}

.sidebar li .icons {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  font-size: 20px;
}

.sidebar li .icons,
.sidebar li .text {
  color: var(--text-color);
  transition: var(--trans-02);
}

.sidebar header {
  position: relative;
}
.sidebar .image-text .img {
  width: 40px;
  border-radius: 6px;
}

.sidebar header .image-text {
  display: flex;
  align-items: center;
}

header .image-text .header-text {
  display: flex;
  flex-direction: column;
}

.header-text .name {
  font-weight: 400;
}

.header-text .description {
  margin-top: -2px;
}

.sidebar header .toggle {
  position: absolute;
  top: 50%;
  right: 25px;
  transform: translateY(-50%);
  height: 25px;
  width: 25px;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: var(--sidebar-color);
  font-size: 20px;
}

.sidebar .search.box {
  background: var(--primary-color);
}

.search.box input{
  height: 100%;
  width: 100%;
  outline: none;
  border: none;
  border-radius: 6px;
  background-color: var(--primary-color-light);
}

.sidebar li a {
  height: 100%;
  display: flex;
  align-items: center;
  text-decoration: none;
  border-radius: 6px;
  transition: var(--trans-04);
}

.sidebar li a:hover{
  background: var(--primary-color);


}
.sidebar li a:hover .icons,
.sidebar li a:hover .text{
  color: var(--sidebar-color);

}
</style>
<!-- Termina el Style -->

<script lang="ts">
export default {
  name: 'HeaderComponent',
}
</script>
