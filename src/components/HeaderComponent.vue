<script setup>
import { ChevronsRight, Home, Search } from '@boxicons/vue';

defineOptions({  name: "ChevronsRightIcon"});
</script>

<template>
  <!-- Comienzo del header -->
   <nav class="sidebar">
    <header>
        <div class="image text">
          <span class="image">
            <img src="logo.pitero" alt="#">
          </span>
          <div class="text header-text">
            <span class="name">RutaPay</span>
            <span class="description">Web de Epstein</span>
          </div>
        </div>

        <ChevronsRight class="toggle"></ChevronsRight>
    </header>

        <div class="menu-bar">
            <div class="menu">
              <li class="nav-links">
                    <Search class="icons"></Search>
                    <input type="search" placeholder="Search">
                </li>
              <ul class="menu-links">
                <li class="nav-links">
                  <a href="#">
                    <Home class="icons"></Home>
                    <span class="text nav-text">DashBoard</span>
                  </a>
                </li>
              </ul>
            </div>
        </div>
   </nav>

  <!-- Fin del header -->
</template>
<!-- Inicia el Style -->
<style>

@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@200&display=swap');

*{
  font-family: "Lexend", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root{
  /* -- Colorsinis Pussinis */
  --body-color: #E4E9F7;
  --sidebar-color: #fff;
  --primary-color: #695cfe;
  --primary-color-light: #f6f5ff;
  --toggle-color: #DDD;
  --text-color: #707070;

  /* -- Transición [Skibidi] */

  --trans-03: all 0.2 ease;
  --trans-03: all 0.3 ease;
  --trans-04: all 0.4 ease;
  --trans-05: all 0.5 ease;

}
/* -- CSS Reutilizable -- */

.sidebar .text{
  font-size: 16px;
  font-weight: 200;
  color: var(--text-color);
}

.sidebar .imatge{
  min-width: 60px;
  display: flex;
  align-items: center;
}


/* -- Sidebar -- */
body{
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

.sidebar li{
  height: 50px;
  margin-top: 10px;
  list-style: none;
  display: flex;
  align-items: center;
}

.sidebar li .icons{
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  font-size: 20px;
}

.sidebar li .icons,
.sidebar li .text{
  color: var(--text-color);
}

.sidebar header{
  position: relative;
}
.sidebar .image-text .img{
  width: 40px;
  border-radius: 6px;
}

.sidebar header .image-text{
  display: flex;
  align-items: center;
}

header .image-text .header-text{
  display: flex;
  flex-direction: column;
}

.header-text .name{
  font-weight: 400;

}

.header-text .description{
  margin-top: -2px;
}

.sidebar header .toggle{
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

.sidebar .search.box{
  background: var(--primary-color);
}

.sidebar li a{
  height: 100%;
  display: flex;
  align-items: center;
  text-decoration: none;
}
</style>
<!-- Termina el Style -->
