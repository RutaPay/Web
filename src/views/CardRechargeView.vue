<script setup lang="ts">
import { ref, reactive, watch, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useRefreshUserData } from '@/composables/useAuth'
import { toast } from 'vue-sonner'
import { X, CreditCard, Buildings, Store, CheckCircle, Clock } from '@boxicons/vue'
import { API_URL } from '@/composables/constants'

const router = useRouter()
const refreshUserData = useRefreshUserData()

const selectedMethod = ref<'Card' | 'SPEI' | 'OXXO'>('Card')
const isProcessing = ref(false)
const isTokenizerReady = ref(false)
const conektaSubmitTrigger = ref<(() => void) | null>(null)

interface PendingVoucher {
  method: 'SPEI' | 'OXXO'
  amount: number
  orderId?: string
  reference?: string
  barcodeUrl?: string
  clabe?: string
  bank?: string
  expiresAt?: number
}

const pendingVoucher = ref<PendingVoucher | null>(null)

const data = reactive({
  balance: 100 as number,
})

const presetAmounts = [50, 100, 200, 300, 500]

const selectPreset = (amount: number) => {
  data.balance = amount
}

const submitOrderToBackend = async (tokenId?: string) => {
  try {
    const response = await fetch(`${API_URL}/api/Cards/recharge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        amount: Number(data.balance),
        paymentMethod: selectedMethod.value,
        tokenId,
      }),
    })

    const res = await response.json().catch(() => null)

    if (!response.ok) {
      toast.error('Error al procesar recarga', {
        description: res?.message || 'Conekta no pudo completar la operación. Verifica tus datos.',
      })
      return
    }

    if (res?.status === 'Completed') {
      toast.success('¡Recarga acreditada con éxito!', {
        description: `Se han abonado $${data.balance} MXN. Folio: ${res.reference || 'OK'}`,
      })
      await refreshUserData.handleRefreshUserData()
      await router.push({ name: 'card' })
    } else if (res?.status === 'Pending') {
      pendingVoucher.value = {
        method: selectedMethod.value as 'SPEI' | 'OXXO',
        amount: Number(data.balance),
        orderId: res.orderId,
        reference: res.reference,
        barcodeUrl: res.barcodeUrl,
        clabe: res.clabe,
        bank: res.bank,
        expiresAt: res.expiresAt,
      }
      toast.info('Ficha de pago generada', {
        description: 'Tu saldo se acreditará automáticamente cuando se confirme el pago.',
      })
    }
  } catch (error: unknown) {
    const msg =
      error instanceof Error ? error.message : 'No se pudo conectar con el servidor de pagos.'
    toast.error('No se pudo completar el pago', { description: msg })
  } finally {
    isProcessing.value = false
  }
}

const mountConektaCardTokenizer = async () => {
  if (selectedMethod.value !== 'Card' || pendingVoucher.value) return

  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 80))

  const container = document.getElementById('conekta-card-container')
  if (!container) return

  container.innerHTML = ''
  isTokenizerReady.value = false
  conektaSubmitTrigger.value = null

  const publicKey = (import.meta.env.VITE_CONEKTA_PUBLIC_KEY as string | undefined)?.trim()
  if (!publicKey) {
    toast.error('Falta configurar VITE_CONEKTA_PUBLIC_KEY en el archivo .env')
    return
  }

  if (!window.ConektaCheckoutComponents?.Card) {
    toast.error('No se pudo cargar el componente seguro de Conekta.')
    return
  }

  window.ConektaCheckoutComponents.Card({
    config: {
      targetIFrame: '#conekta-card-container',
      publicKey,
      locale: 'es',
      useExternalSubmit: true,
    },
    options: {
      backgroundMode: 'lightMode',
      inputType: 'minimalMode',
      hideLogo: true,
    },
    callbacks: {
      onUpdateSubmitTrigger: (submitFn) => {
        conektaSubmitTrigger.value = submitFn
        isTokenizerReady.value = true
      },
      onGetInfoSuccess: () => {
        isTokenizerReady.value = true
      },
      onCreateTokenSucceeded: async (token) => {
        await submitOrderToBackend(token.id)
      },
      onCreateTokenError: (error) => {
        isProcessing.value = false
        toast.error('Error al validar tarjeta', {
          description:
            error?.message_to_purchaser ||
            error?.message ||
            'Verifica los datos de tu tarjeta e intenta nuevamente.',
        })
      },
    },
  })
}

watch(selectedMethod, (newMethod) => {
  if (newMethod === 'Card') {
    mountConektaCardTokenizer()
  }
})

onMounted(() => {
  mountConektaCardTokenizer()
})

const handleRecharge = async () => {
  if (Number(data.balance) < 20) {
    toast.error('El monto mínimo de recarga es de $20.00 MXN.')
    return
  }

  if (selectedMethod.value === 'Card') {
    if (!conektaSubmitTrigger.value) {
      toast.error('El formulario seguro de tarjeta aún está cargando. Espera un momento.')
      return
    }
    isProcessing.value = true
    conektaSubmitTrigger.value()
    return
  }

  isProcessing.value = true
  await submitOrderToBackend()
}

const copyToClipboard = async (text: string, label: string) => {
  try {
    await navigator.clipboard.writeText(text)
    toast.success(`${label} copiada al portapapeles`)
  } catch {
    toast.error('No se pudo copiar automáticamente')
  }
}

const formatExpiration = (unix?: number) => {
  if (!unix) return '72 horas'
  return new Date(unix * 1000).toLocaleString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const closeAndRefresh = async () => {
  await refreshUserData.handleRefreshUserData()
  await router.push({ name: 'card' })
}
</script>

<template>
  <Transition name="dialog-fade">
    <div
      class="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      @click.self="router.push({ name: 'card' })"
    >
      <div
        class="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 md:p-8 my-8"
      >
        <!-- Header -->
        <header class="flex justify-between items-center pb-4 border-b border-gray-100">
          <div>
            <h3 class="text-2xl font-bold text-gray-900">
              {{ pendingVoucher ? 'Ficha de Pago Generada' : 'Recargar Tarjeta RutaPay' }}
            </h3>
            <p class="text-xs text-gray-500 mt-0.5">
              {{
                pendingVoucher
                  ? 'Realiza tu pago para acreditar el saldo automáticamente.'
                  : 'Procesado de forma segura mediante Conekta (Mínimo $20.00 MXN).'
              }}
            </p>
          </div>
          <RouterLink
            :to="{ name: 'card' }"
            class="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
          >
            <X class="text-2xl" />
          </RouterLink>
        </header>

        <!-- Vista de Ficha Pendiente (OXXO / SPEI) -->
        <div v-if="pendingVoucher" class="mt-6 space-y-5">
          <div class="flex items-center gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200">
            <Clock class="text-3xl text-amber-600 shrink-0" />
            <div class="text-xs text-amber-900">
              <p class="font-bold text-sm">
                Pago pendiente por ${{ pendingVoucher.amount.toFixed(2) }} MXN
              </p>
              <p class="mt-0.5">
                Una vez que pagues, Conekta notificará a RutaPay y tu saldo se actualizará solo.
              </p>
            </div>
          </div>

          <!-- Detalles OXXO -->
          <div
            v-if="pendingVoucher.method === 'OXXO'"
            class="p-5 bg-gray-50 rounded-2xl border border-gray-200 text-center space-y-3"
          >
            <p class="text-xs font-bold uppercase tracking-wider text-gray-500">
              Referencia de Pago en OXXO
            </p>
            <img
              v-if="pendingVoucher.barcodeUrl"
              :src="pendingVoucher.barcodeUrl"
              alt="Código de barras OXXO Pay"
              class="mx-auto h-16 object-contain bg-white p-1.5 rounded-lg border border-gray-200"
            />
            <div
              class="text-xl font-mono font-black tracking-widest text-gray-900 bg-white py-2.5 px-4 rounded-xl border border-gray-300"
            >
              {{ pendingVoucher.reference }}
            </div>
            <button
              type="button"
              @click="copyToClipboard(pendingVoucher.reference || '', 'Referencia')"
              class="text-xs font-bold text-primary hover:underline cursor-pointer"
            >
              Copiar referencia numérica
            </button>
            <p class="text-[11px] text-gray-500">
              Vigencia hasta: <strong>{{ formatExpiration(pendingVoucher.expiresAt) }}</strong>
            </p>
          </div>

          <!-- Detalles SPEI -->
          <div
            v-else-if="pendingVoucher.method === 'SPEI'"
            class="p-5 bg-blue-50/50 rounded-2xl border border-blue-200 text-xs text-gray-700 space-y-3"
          >
            <div class="flex justify-between items-center">
              <span class="text-gray-500">Banco Receptor:</span>
              <strong class="text-gray-900">{{ pendingVoucher.bank || 'STP / Conekta' }}</strong>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-500">Monto Exacto:</span>
              <strong class="text-gray-900 font-mono"
                >${{ pendingVoucher.amount.toFixed(2) }} MXN</strong
              >
            </div>
            <div class="pt-1">
              <span class="text-gray-500 block mb-1">CLABE Interbancaria (18 dígitos):</span>
              <div
                class="flex items-center justify-between gap-2 bg-white p-3 rounded-xl border border-blue-200"
              >
                <strong class="font-mono text-sm text-gray-900 tracking-wider">
                  {{ pendingVoucher.clabe }}
                </strong>
                <button
                  type="button"
                  @click="copyToClipboard(pendingVoucher.clabe || '', 'CLABE')"
                  class="text-xs font-bold text-primary hover:underline cursor-pointer shrink-0"
                >
                  Copiar
                </button>
              </div>
            </div>
            <p class="text-[11px] text-gray-500">
              Vigencia hasta: <strong>{{ formatExpiration(pendingVoucher.expiresAt) }}</strong>
            </p>
          </div>

          <button
            type="button"
            @click="closeAndRefresh"
            class="w-full py-3.5 bg-primary hover:bg-dark text-white font-bold rounded-xl shadow-lg transition duration-300 cursor-pointer"
          >
            Entendido, volver a Mi Tarjeta
          </button>
        </div>

        <!-- Formulario de Recarga -->
        <form v-else @submit.prevent="handleRecharge" class="mt-6 space-y-6">
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
                class="py-2.5 rounded-xl font-bold text-sm border transition cursor-pointer"
                :class="
                  data.balance === amt
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-primary'
                "
              >
                ${{ amt }}
              </button>
            </div>

            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold"
                >$</span
              >
              <input
                type="number"
                required
                v-model="data.balance"
                min="20"
                max="10000"
                step="1"
                class="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl font-bold text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                placeholder="Mínimo $20.00 MXN"
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
                class="p-3 rounded-xl border flex flex-col items-center gap-1 text-center transition cursor-pointer"
                :class="
                  selectedMethod === 'Card'
                    ? 'border-primary bg-primary/5 text-primary font-bold'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                "
              >
                <CreditCard class="text-2xl" />
                <span class="text-xs">Tarjeta Bancaria</span>
              </button>

              <button
                type="button"
                @click="selectedMethod = 'SPEI'"
                class="p-3 rounded-xl border flex flex-col items-center gap-1 text-center transition cursor-pointer"
                :class="
                  selectedMethod === 'SPEI'
                    ? 'border-primary bg-primary/5 text-primary font-bold'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                "
              >
                <Buildings class="text-2xl" />
                <span class="text-xs">Transferencia SPEI</span>
              </button>

              <button
                type="button"
                @click="selectedMethod = 'OXXO'"
                class="p-3 rounded-xl border flex flex-col items-center gap-1 text-center transition cursor-pointer"
                :class="
                  selectedMethod === 'OXXO'
                    ? 'border-primary bg-primary/5 text-primary font-bold'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                "
              >
                <Store class="text-2xl" />
                <span class="text-xs">OXXO Pay</span>
              </button>
            </div>
          </div>

          <!-- Detalle dinámico del método de pago -->
          <div
            v-if="selectedMethod === 'Card'"
            class="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2"
          >
            <div class="flex items-center justify-between">
              <span v-if="!isTokenizerReady" class="text-xs text-gray-400">Cargando...</span>
            </div>
            <div id="conekta-card-container" class="w-full h-97"></div>
          </div>

          <div
            v-else-if="selectedMethod === 'SPEI'"
            class="p-4 bg-blue-50/50 rounded-2xl border border-blue-200 text-xs text-gray-700 space-y-2"
          >
            <p class="font-semibold text-blue-950">Transferencia Electrónica vía SPEI (Conekta)</p>
            <p class="text-gray-600">
              Al confirmar, se generará una <strong>CLABE interbancaria única</strong> para que
              realices tu transferencia desde cualquier app bancaria. Tu saldo se reflejará en
              segundos al confirmarse el pago.
            </p>
          </div>

          <div
            v-else-if="selectedMethod === 'OXXO'"
            class="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 text-xs text-gray-700 space-y-2"
          >
            <p class="font-semibold text-amber-950">Pago en Efectivo en Tiendas OXXO</p>
            <p class="text-gray-600">
              Al confirmar, generaremos tu <strong>referencia numérica y código de barras</strong>
              oficial de OXXO Pay con vigencia de 72 horas.
            </p>
          </div>

          <!-- Botón de Envío Propio -->
          <button
            type="submit"
            :disabled="isProcessing || (selectedMethod === 'Card' && !isTokenizerReady)"
            class="w-full py-3.5 bg-primary hover:bg-dark text-white font-bold rounded-xl shadow-lg transition duration-300 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <CheckCircle class="text-xl" />
            <span v-if="isProcessing">Procesando con Conekta...</span>
            <span v-else-if="selectedMethod === 'Card'"> Pagar ${{ data.balance }} MXN </span>
            <span v-else> Generar Ficha de ${{ data.balance }} MXN </span>
          </button>
        </form>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
#conekta-card-container :deep(iframe) {
  width: 100% !important;
  height: 100% !important;
  border: 0;
}
</style>
