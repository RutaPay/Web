import { reactive, markRaw, type Component } from 'vue'

interface DialogOptions {
  title?: string
  description?: string
  component?: Component // For custom content
  props?: Record<string, any> // Props for that custom component
  cancelText?: string
  confirmText?: string
  onConfirm?: () => void | Promise<void>
}

interface DialogState extends DialogOptions {
  isOpen: boolean
}

// Initial state
const state = reactive<DialogState>({
  isOpen: false,
  title: '',
  description: '',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
})

export const useDialog = () => {
  const show = (options: DialogOptions) => {
    Object.assign(state, {
      ...options,
      // markRaw prevents Vue from making a custom component deeply reactive
      component: options.component ? markRaw(options.component) : null,
      isOpen: true,
    })
  }

  const close = () => {
    state.isOpen = false
  }

  return {
    state,
    show,
    close,
  }
}
