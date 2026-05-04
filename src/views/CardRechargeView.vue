<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useRefreshUserData } from '@/composables/useAuth'
import { toast } from 'vue-sonner'
import { X } from '@boxicons/vue'

const router = useRouter()
const refreshUserData = useRefreshUserData()

const data = reactive({
  balance: 0.0 as number,
  oppType: 'recharge' as string,
})

const handleRecharge = async () => {
  try {
    const response = await fetch(`https://localhost:7130/api/Cards/UpdateBalance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    })

    if (response.ok) {
      toast.success('Recarga realizada con éxito.')
      await refreshUserData.handleRefreshUserData()
      await router.push({ name: 'card' })
    } /*else if (response.status === 400) {
        const contentType = response.headers.get('content-type')
        let errorMessage = ''

        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json()
          errorMessage = errorData.message || JSON.stringify(errorData)
        } else {
          errorMessage = await response.text()
        }

        if (errorMessage.includes('Insufficient balance')) {
          toast.error('Saldo insuficiente para realizar la recarga.')
        }
      }*/ else {
      toast.error('Error al Recargar', {
        description: 'Error al realizar la recarga. Inténtalo de nuevo más tarde.',
      })
    }
  } catch (error: any) {
    if (error.message === 'Failed to fetch') {
      toast.error('Error de Conexión', {
        description: 'No se pudo conectar con el servidor.',
      })
    }
  }
}
</script>

<template>
  <Transition name="dialog-fade">
    <main
      class="backdrop:bg-[#CCC]/40 backdrop:backdrop-blur-xs flex items-center justify-center z-100 rounded-2xl shadow-2xl overflow-hidden fixed inset-0 m-auto border-none focus:outline-none"
    >
      <div class="h-auto bg-white rounded-3xl shadow-sm border border-gray-200 mb-8 p-6 md:p-10">
        <header class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-semibold text-text-dark md:text-3xl lg:text-4xl">
            Realiza una Recarga
          </h3>
          <RouterLink
            :to="{ name: 'card' }"
            class="p-2 ml-8 -mr-2 text-text-dark transition-colors"
          >
            <X />
          </RouterLink>
        </header>

        <!-- Payment -->
        <section class="bg-white py-8 antialiased md:py-16">
          <div class="w-lg px-6 text-text-dark md:px-8 lg:px-12">
            <form @submit.prevent="handleRecharge">
              <label for="amount" class="block text-md font-medium">Monto a Recargar</label>
              <input
                type="number"
                required
                v-model="data.balance"
                min="0"
                class="w-full px-4 py-2 mt-4 border-2 border-[#C3C3C3] rounded-lg focus:outline-none hover:border-dark focus:border-primary placeholder-[#C3C3C3] transition duration-300"
                placeholder="Ingrese el monto a recargar"
              />
              <input
                type="submit"
                value="Recargar"
                class="w-full px-4 py-2 mt-6 bg-primary text-white font-medium rounded-lg hover:bg-dark cursor-pointer transition duration-300"
              />
            </form>
          </div>
        </section>
      </div>
    </main>
  </Transition>
</template>
