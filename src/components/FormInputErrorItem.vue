<script setup lang="ts">
import { AlertCircle } from '@boxicons/vue'
</script>

<template>
  <span class="text-[#D93025] flex items-center gap-2 mt-2 text-sm">
    <AlertCircle class="w-4" />
    <p><slot name="text"></slot></p>
  </span>
</template>

<script lang="ts">
export default {
  name: 'FormInputErrorItem',
}
</script>
