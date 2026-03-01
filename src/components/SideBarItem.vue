<script setup>
defineProps(['url'])
</script>

<template>
  <li class="nav-links">
    <RouterLink :to="url">
      <slot name="icon"></slot>
      <span class="text nav-text"><slot name="text"></slot></span>
    </RouterLink>
  </li>
</template>

<script lang="ts">
export default {
  name: 'SideBarItem',
}
</script>
