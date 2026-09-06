<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useRefreshUserData } from '@/composables/useAuth'
import { toast } from 'vue-sonner'
import { X, CreditCard, Buildings, Store, CheckCircle } from '@boxicons/vue'

const router = useRouter()
const refreshUserData = useRefreshUserData()

const selectedMethod = ref<'Card' | 'SPEI' | 'OXXO'>('Card')
const isProcessing = ref(false)

const data = reactive({
  balance: 100 as number,
  oppType: 'recharge',
  paymentMethod: 'Card',
  cardNumber: '4152 3134 5678 9010',
  cardHolder: 'Titular de la Cuenta',
  expiry: '12/28',
  cvv: '789',
})

const presetAmounts = [50, 100, 200, 300, 500]

const selectPreset = (amount: number) => {
  data.balance = amount
}

const handleRecharge = async () => {
  if (data.balance <= 0) {
    toast.error('Por favor ingresa un monto válido mayor a $0.')
    return
  }

  isProcessing.value = true
  data.paymentMethod = selectedMethod.value

  try {
    const response = await fetch(`https://localhost:7130/api/Cards/UpdateBalance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        balance: Number(data.balance),
        oppType: 'recharge',
        paymentMethod: selectedMethod.value,
      }),
    })

    if (response.ok) {
      const res = await response.json()
      toast.success('¡Recarga realizada con éxito!', {
        description: `Se han acreditado $${data.balance} MXN. Ref: ${res.reference || 'OK'}`,
      })
      await refreshUserData.handleRefreshUserData()
      await router.push({ name: 'card' })
    } else {
      const err = await response.text()
      toast.error('Error al Recargar', {
        description: err || 'Error al procesar el abono. Inténtalo más tarde.',
      })
    }
  } catch (error: any) {
    toast.error('Error de Conexión', {
      description: 'No se pudo conectar con el servidor de pagos RutaPay.',
    })
  } finally {
    isProcessing.value = false
  }
}
</script>

<template>
  <Transition name="dialog-fade">
    <div
      class="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      @click.self="router.push({ name: 'card' })"
    >
      <div class="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 md:p-8 my-8">
        <!-- Header -->
        <header class="flex justify-between items-center pb-4 border-b border-gray-100">
          <div>
            <h3 class="text-2xl font-bold text-gray-900">
              Recargar Tarjeta RutaPay
            </h3>
            <p class="text-xs text-gray-500 mt-0.5">Selecciona el monto y método de pago simulado.</p>
          </div>
          <RouterLink
            :to="{ name: 'card' }"
            class="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
          >
            <X class="text-2xl" />
          </RouterLink>
        </header>

        <form @submit.prevent="handleRecharge" class="mt-6 space-y-6">
          <!-- Montos predefinidos -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
              Monto a Recargar (MXN)
            </label>
            <div class="grid grid-cols-5 gap-2 mb-3">
              <button
                type="button"
                v-for="amt in presetAmounts"
                :key="amt"
                @click="selectPreset(amt)"
                class="py-2.5 rounded-xl font-bold text-sm border transition"
                :class="data.balance === amt ? 'bg-primary text-white border-primary shadow-sm' : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-primary'"
              >
                ${{ amt }}
              </button>
            </div>

            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
              <input
                type="number"
                required
                v-model="data.balance"
                min="1"
                step="1"
                class="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl font-bold text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                placeholder="Ingresa otro monto"
              />
            </div>
          </div>

          <!-- Métodos de Pago -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
              Método de Pago
            </label>
            <div class="grid grid-cols-3 gap-2">
              <button
                type="button"
                @click="selectedMethod = 'Card'"
                class="p-3 rounded-xl border flex flex-col items-center gap-1 text-center transition"
                :class="selectedMethod === 'Card' ? 'border-primary bg-primary/5 text-primary font-bold' : 'border-gray-200 hover:bg-gray-50 text-gray-700'"
              >
                <CreditCard class="text-2xl" />
                <span class="text-xs">Tarjeta Bancaria</span>
              </button>

              <button
                type="button"
                @click="selectedMethod = 'SPEI'"
                class="p-3 rounded-xl border flex flex-col items-center gap-1 text-center transition"
                :class="selectedMethod === 'SPEI' ? 'border-primary bg-primary/5 text-primary font-bold' : 'border-gray-200 hover:bg-gray-50 text-gray-700'"
              >
                <Buildings class="text-2xl" />
                <span class="text-xs">Transferencia SPEI</span>
              </button>

              <button
                type="button"
                @click="selectedMethod = 'OXXO'"
                class="p-3 rounded-xl border flex flex-col items-center gap-1 text-center transition"
                :class="selectedMethod === 'OXXO' ? 'border-primary bg-primary/5 text-primary font-bold' : 'border-gray-200 hover:bg-gray-50 text-gray-700'"
              >
                <Store class="text-2xl" />
                <span class="text-xs">OXXO Pay</span>
              </button>
            </div>
          </div>

          <!-- Detalle dinámico del método de pago -->
          <div v-if="selectedMethod === 'Card'" class="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Número de Tarjeta (Simulador)</label>
              <input
                type="text"
                v-model="data.cardNumber"
                class="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-mono"
              />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Vigencia</label>
                <input
                  type="text"
                  v-model="data.expiry"
                  class="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-center"
                />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">CVV</label>
                <input
                  type="password"
                  maxlength="4"
                  v-model="data.cvv"
                  class="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-center font-mono"
                />
              </div>
            </div>
          </div>

          <div v-else-if="selectedMethod === 'SPEI'" class="p-4 bg-blue-50/50 rounded-2xl border border-blue-200 text-xs text-gray-700 space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-500">Banco Receptor:</span>
              <strong class="text-gray-900">STP - RutaPay Celaya</strong>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">CLABE Interbancaria:</span>
              <strong class="font-mono text-gray-900">646180123456789012</strong>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Concepto / Referencia:</span>
              <strong class="font-mono text-primary">RPAY-RECARGA</strong>
            </div>
            <p class="text-gray-500 pt-1 text-[11px]">
              Al presionar "Confirmar Abono SPEI", se simula la recepción y conciliación bancaria instantánea.
            </p>
          </div>

          <div v-else-if="selectedMethod === 'OXXO'" class="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 text-xs text-gray-700 space-y-2 text-center">
            <p class="text-gray-600">Referencia de Pago en Tiendas OXXO:</p>
            <div class="text-xl font-mono font-bold tracking-widest text-amber-900 bg-white py-2 rounded-lg border border-amber-300">
              9342-8812-4521-90
            </div>
            <p class="text-[11px] text-gray-500">
              Al confirmar, el sistema acreditará el pago como si hubiera sido registrado en caja de conveniencia.
            </p>
          </div>

          <!-- Botón de Envío -->
          <button
            type="submit"
            :disabled="isProcessing"
            class="w-full py-3.5 bg-primary hover:bg-dark text-white font-bold rounded-xl shadow-lg transition duration-300 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <CheckCircle class="text-xl" />
            <span v-if="isProcessing">Procesando Recarga...</span>
            <span v-else>Confirmar Abono de ${{ data.balance }} MXN</span>
          </button>
        </form>
      </div>
    </div>
  </Transition>
</template>
