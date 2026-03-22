<script setup lang="ts">
import { Circle, Check } from '@boxicons/vue'
defineProps({
  isValid: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <li
    class="list-none flex items-center gap-2 mb-2"
    :class="isValid ? 'text-[#AAA]' : 'text-text-dark'"
  >
    <component
      :is="isValid ? Check : Circle"
      pack="filled"
      class="w-4 transition-all duration-200"
      :class="isValid ? 'text-[#229954]' : 'text-[#AAA]'"
    />
    <span class="text-sm"><slot name="text"></slot></span>
  </li>
</template>

<script lang="ts">
export default {
  name: 'PasswordRequirementItem',
}
</script>
