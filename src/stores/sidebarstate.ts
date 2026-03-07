import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', () => {
  const localValue = localStorage.getItem('sidebarClosed')
  const closedState = ref(localValue === 'true')

  watch(closedState, (val) => {
    localStorage.setItem('sidebarClosed', val.toString())
  })

  function setSidebarClosedState(value: boolean) {
    closedState.value = value
  }

  function toggleSidebar() {
    closedState.value = !closedState.value
  }

  return { closedState, setSidebarClosedState, toggleSidebar }
})
