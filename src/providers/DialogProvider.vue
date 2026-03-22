<script setup lang="ts">
import { useDialog } from '@/stores/dialog'

const { state, close } = useDialog()

const handleConfirm = async () => {
  if (state.onConfirm) {
    await state.onConfirm()
  }
  close()
}
</script>

<template>
  <Teleport to="body">
    <Transition name="dialog-fade">
      <div v-if="state.isOpen" class="fixed inset-0 z-100 flex items-center justify-center p-4">
        <div @click="close" class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />

        <div class="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 overflow-hidden">
          <h3 class="text-xl font-bold text-slate-900">{{ state.title }}</h3>

          <div class="mt-3 text-slate-600">
            <p v-if="state.description">{{ state.description }}</p>
            <component :is="state.component" v-bind="state.props" v-if="state.component" />
          </div>

          <div class="mt-8 flex justify-end gap-3">
            <button @click="close" class="px-4 py-2 text-slate-500 hover:bg-slate-50 rounded-lg">
              {{ state.cancelText }}
            </button>
            <button
              @click="handleConfirm"
              class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {{ state.confirmText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: all 0.2s ease;
}
.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
