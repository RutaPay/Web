<script setup lang="ts">
defineProps({
  isClosed: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <hr class="border-secondary" :class="{ 'ml-64': !isClosed, 'ml-28': isClosed }" />
  <footer
    class="p-8 transition-all duration-500 bg-gray-50"
    :class="{ 'ml-64': !isClosed, 'ml-28': isClosed }"
  >
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      <div>
        <h3 class="text-lg font-bold text-text-dark mb-4">Enlaces útiles</h3>
        <ul class="space-y-2">
          <li><a href="#" class="text-text-light hover:text-primary">Inicio</a></li>
          <li><a href="#" class="text-text-light hover:text-primary">Acerca de</a></li>
          <li><a href="#" class="text-text-light hover:text-primary">Contacto</a></li>
        </ul>
      </div>
      <div>
        <h3 class="text-lg font-bold text-text-dark mb-4">Legal</h3>
        <ul class="space-y-2">
          <li><a href="#" class="text-text-light hover:text-primary">Términos de servicio</a></li>
          <li><a href="#" class="text-text-light hover:text-primary">Política de privacidad</a></li>
        </ul>
      </div>
      <div>
        <h3 class="text-lg font-bold text-text-dark mb-4">Síguenos</h3>
        <ul class="space-y-2">
          <li><a href="#" class="text-text-light hover:text-primary">Facebook</a></li>
          <li><a href="#" class="text-text-light hover:text-primary">Twitter</a></li>
          <li><a href="#" class="text-text-light hover:text-primary">Instagram</a></li>
        </ul>
      </div>
      <div>
        <h3 class="text-lg font-bold text-text-dark mb-4">Contacto</h3>
        <p class="text-text-light">Dirección: Calle Principal 123, Ciudad</p>
        <p class="text-text-light">Teléfono: +1 (555) 123-4567</p>
      </div>
    </div>
    <p class="text-text-dark text-center">&copy; 2026 RutaPay. Todos los derechos reservados.</p>
  </footer>
</template>

<script lang="ts">
export default {
  name: 'Footer',
}
</script>
