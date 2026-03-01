<script setup lang="ts">
defineProps({
  url: {
    type: String,
    required: true,
  },
  isClosed: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <li class="h-12 mt-6 list-none flex items-center">
    <RouterLink
      :to="url"
      class="h-full flex items-center rounded-xl transition-all duration-400 hover:bg-primary"
    >
      <slot name="icon"></slot>
      <span class="text-text-dark hover:text-white" :class="{ hidden: isClosed }"
        ><slot name="text"></slot
      ></span>
    </RouterLink>
  </li>
</template>

<script lang="ts">
export default {
  name: 'SideBarItem',
}
</script>
