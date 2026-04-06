<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Notification',
  },
  modelValue: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const dialogRef = ref<HTMLDialogElement | null>(null)

function close() {
  emit('update:modelValue', false)
}

const handleCancel = (e: Event) => {
  e.preventDefault()
  close()
}

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      setTimeout(() => {
        dialogRef.value?.showModal()
        document.body.style.overflow = 'hidden'
      }, 0)
    } else {
      dialogRef.value?.close()
      document.body.style.overflow = ''
    }
  },
  { immediate: true },
)

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <transition name="dialog-fade">
      <dialog
        v-if="modelValue"
        ref="dialogRef"
        class="backdrop:bg-[#CCC]/40 backdrop:backdrop-blur-xs rounded-2xl shadow-2xl p-0 overflow-hidden fixed inset-0 m-auto max-w-2xl bg-white border-none focus:outline-none"
        @cancel="handleCancel"
        @click.self="close"
      >
        <div class="p-6">
          <header class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-semibold text-text-dark">{{ title }}</h3>
            <button
              @click="close"
              class="p-2 -mr-2 text-text-dark transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </header>

          <main class="text-text-light leading-relaxed">
            <slot />
          </main>

          <footer class="mt-8 flex flex-col-reverse sm:flex-row justify-end gap-6">
            <slot name="footer">
              <button
                @click="close"
                class="px-5 py-2.5 font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
              >
                Close
              </button>
            </slot>
          </footer>
        </div>
      </dialog>
    </transition>
  </Teleport>
</template>

<style lang="css" scoped>
.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}

dialog::backdrop {
  transition: opacity 0.3s ease;
}
</style>
