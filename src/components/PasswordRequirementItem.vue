<script setup lang="ts">
import { Circle } from '@boxicons/vue'
defineProps({})
</script>

<template>
  <li class="list-none text-sm flex items-center gap-2 mb-2">
    <Circle pack="filled" class="w-4 transition-all duration-200 text-[#AAA]" />
    <span><slot name="text"></slot></span>
  </li>
</template>

<script lang="ts">
export default {
  name: 'PasswordRequirementItem',
}
</script>
