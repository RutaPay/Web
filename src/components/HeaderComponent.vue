<script setup>

</script>

<template>
  <!-- Comienzo del header -->
   <nav class="sidebar">
    <header>
      <div class="image text">
        <span class="image">
          <img src="logo.pitero" alt="#">
        </span>
      </div>
    </header>
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
  background: var(--sidebar-color);
}
.sidebar .image-text .img{
  width: 40px;
  border-radius: 6px;
}

</style>
<!-- Termina el Style -->
