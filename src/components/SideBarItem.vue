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
  isActive: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <RouterLink
    :to="url"
    class="group h-12 flex mt-6 rounded-xl items-center transition-all duration-400 hover:bg-primary"
    :class="{ 'justify-center': isClosed, 'justify-start': !isClosed, 'bg-primary': isActive }"
  >
    <li class="h-full list-none flex items-center">
      <slot name="icon"></slot>
      <span
        class="text-text-dark group-hover:text-white"
        :class="{ hidden: isClosed, 'text-white': isActive }"
        ><slot name="text"></slot
      ></span>
    </li>
  </RouterLink>
</template>

<script lang="ts">
export default {
  name: 'SideBarItem',
}
</script>
