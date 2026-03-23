<!--
  CardView.vue — Vue 3 SFC con Tailwind CSS
  ============================================================
  MARCADORES — reemplaza estos valores antes de usar:

  {{USER_NAME}}         → Nombre del usuario.         Ej: Ian
  {{CARD_NUMBER_12}}    → 12 dígitos sin espacios.    Ej: 123456789012
  {{CARD_BG_URL}}       → URL de imagen de fondo.     Ej: https://example.com/card-bg.jpg
  {{CARD_BALANCE}}      → Saldo formateado.           Ej: $1,250.00

  Tarjetas prepago (repetir patrón para n = 1…6+):
  {{PREPAID_1_TITLE}}   → Ej: Netflix Premium
  {{PREPAID_1_DESC}}    → Ej: Suscripción mensual HD
  {{PREPAID_1_PRICE}}   → Ej: $299.00
  … (hasta {{PREPAID_6_TITLE}}, etc.)

  COLORES — para cambiar el acento principal busca "indigo" y reemplaza por otro color Tailwind.
  ============================================================
-->

<template>
  <div
    class="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8"
    style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;"
  >

    <!-- ═══════════════════════════════════════════════════
         SECCIÓN 1 — Bienvenida
         Reemplaza {{USER_NAME}} con el nombre real del usuario
    ════════════════════════════════════════════════════════ -->
    <header class="mb-8 text-center">
      <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
        Hola, <span class="text-indigo-600">{{USER_NAME}}</span> 👋
      </h1>
      <!-- Subtítulo explicativo -->
      <p class="mt-2 text-sm sm:text-base text-gray-500">
        Bienvenido a tu panel de tarjeta y servicios prepago.
      </p>
    </header>

    <!-- ═══════════════════════════════════════════════════
         SECCIÓN 2 — Box con tarjeta visual y saldo
         El box tiene borde gris y sombra ligera.
    ════════════════════════════════════════════════════════ -->
    <section
      aria-label="Tarjeta y saldo"
      class="mb-10 rounded-2xl border border-gray-300 bg-white shadow-sm p-5 sm:p-7"
    >
      <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">

        <!-- Tarjeta visual (esquina superior izquierda del box) -->
        <div
          class="relative w-full max-w-xs sm:max-w-[320px] h-44 sm:h-48 rounded-xl overflow-hidden shadow-lg flex-shrink-0 select-none"
          role="img"
          aria-label="Tarjeta bancaria"
          :style="{
            /* ── REEMPLAZA {{CARD_BG_URL}} con la URL real de imagen ── */
            backgroundImage: `url('{{CARD_BG_URL}}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }"
        >
          <!-- Capa semitransparente para legibilidad -->
          <div class="absolute inset-0 bg-gradient-to-br from-black/40 to-black/10 rounded-xl" />

          <!-- Chip decorativo -->
          <div class="absolute top-4 left-5">
            <div class="w-9 h-7 bg-yellow-300/90 rounded-md opacity-90 shadow" />
          </div>

          <!-- Número de tarjeta
               El marcador {{CARD_NUMBER_12}} contiene exactamente 12 dígitos.
               formatCardNumber() los agrupa como: XXXX XXXX XXXX
               Reemplaza el valor en el array `prepaidCards` / computed de abajo. -->
          <div class="absolute bottom-10 left-5 right-5">
            <p
              class="text-white text-base sm:text-lg font-mono tracking-widest drop-shadow"
              aria-label="Número de tarjeta"
            >
              <!-- formatCardNumber recibe {{CARD_NUMBER_12}} y produce grupos legibles -->
              {{ formatCardNumber('{{CARD_NUMBER_12}}') }}
            </p>
          </div>

          <!-- Logo / marca decorativa -->
          <div class="absolute bottom-3 right-4 flex gap-[-4px]">
            <div class="w-7 h-7 rounded-full bg-red-500 opacity-80" />
            <div class="w-7 h-7 rounded-full bg-orange-400 opacity-80 -ml-3" />
          </div>
        </div>

        <!-- Bloque de saldo (parte inferior derecha en desktop) -->
        <div class="flex flex-col items-start sm:items-end justify-end flex-1 sm:self-end">
          <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
            Saldo disponible
          </p>
          <!-- Saldo destacado — Reemplaza {{CARD_BALANCE}} -->
          <div
            class="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-xl px-5 py-3 shadow-sm"
          >
            <span class="text-indigo-500 text-xl font-bold">Saldo :</span>
            <!-- ── REEMPLAZA {{CARD_BALANCE}} con el saldo real ── -->
            <span class="text-3xl sm:text-4xl font-extrabold text-indigo-700 tracking-tight">
              {{CARD_BALANCE}}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════
         SECCIÓN 3 — Tarjetas prepago
         Rejilla: 1 col móvil · 2 col tablet · 3 col desktop
    ════════════════════════════════════════════════════════ -->
    <section aria-label="Servicios prepago">
      <h2 class="text-xl font-semibold text-gray-800 mb-5">Servicios prepago</h2>

      <ul
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        role="list"
      >
        <!--
          Tarjetas prepago generadas dinámicamente desde el array `prepaidCards`.
          Para reemplazar marcadores edita el array en <script setup> abajo.
          Marcadores: {{PREPAID_n_TITLE}}, {{PREPAID_n_DESC}}, {{PREPAID_n_PRICE}}
        -->
        <li
          v-for="(card, index) in prepaidCards"
          :key="index"
          role="listitem"
        >
          <button
            type="button"
            class="w-full text-left rounded-xl border border-gray-200 bg-white shadow-sm
                   hover:shadow-md hover:border-indigo-300 hover:-translate-y-0.5
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                   transition-all duration-200 ease-in-out
                   active:scale-95 p-5 group"
            :aria-label="`Comprar ${card.title} por ${card.price}`"
            @click="openModal(card)"
          >
            <!-- Icono / badge de categoría decorativo -->
            <div class="mb-3 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-100 group-hover:bg-indigo-200 transition-colors duration-200">
              <span class="text-indigo-600 text-lg font-bold select-none" aria-hidden="true">
                {{ card.icon }}
              </span>
            </div>

            <!-- Título — {{PREPAID_n_TITLE}} -->
            <h3 class="text-base font-semibold text-gray-900 mb-1 group-hover:text-indigo-700 transition-colors duration-150">
              {{ card.title }}
            </h3>

            <!-- Descripción — {{PREPAID_n_DESC}} -->
            <p class="text-sm text-gray-500 mb-4 leading-snug">
              {{ card.desc }}
            </p>

            <!-- Precio — {{PREPAID_n_PRICE}} -->
            <div class="flex items-center justify-between">
              <span class="text-indigo-600 font-bold text-base">
                {{ card.price }}
              </span>
              <span class="text-xs text-gray-400 group-hover:text-indigo-400 transition-colors duration-150">
                Comprar →
              </span>
            </div>
          </button>
        </li>
      </ul>
    </section>

    <!-- ═══════════════════════════════════════════════════
         MODAL DE CONFIRMACIÓN — accesible
         role="dialog", aria-modal, aria-labelledby
         Cierre: ESC · clic en overlay · botón Cancelar
    ════════════════════════════════════════════════════════ -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="modalOpen"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          @keydown.esc="closeModal"
        >
          <!-- Overlay oscuro — clic cierra el modal -->
          <div
            class="absolute inset-0 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
            @click="closeModal"
          />

          <!-- Panel del modal -->
          <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 scale-95 translate-y-2"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 translate-y-2"
          >
            <div
              v-if="modalOpen"
              ref="modalPanelRef"
              role="dialog"
              aria-modal="true"
              :aria-labelledby="modalTitleId"
              class="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6
                     border border-gray-200"
              @keydown="trapFocus"
            >
              <!-- Icono decorativo -->
              <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-indigo-100">
                <span class="text-indigo-600 text-2xl" aria-hidden="true">🛒</span>
              </div>

              <!-- Título del modal -->
              <h2
                :id="modalTitleId"
                class="text-lg font-bold text-gray-900 text-center mb-2"
              >
                Confirmar compra
              </h2>

              <!-- Pregunta de confirmación -->
              <p class="text-sm text-gray-600 text-center mb-6 leading-relaxed">
                ¿Confirmas la compra de
                <strong class="text-gray-900">{{ selectedCard?.title }}</strong>
                por
                <strong class="text-indigo-600">{{ selectedCard?.price }}</strong>?
              </p>

              <!-- Botones de acción -->
              <div class="flex gap-3">
                <!-- Cancelar (primer elemento focusable en el trap) -->
                <button
                  ref="cancelBtnRef"
                  type="button"
                  class="flex-1 rounded-xl border border-gray-300 bg-white text-gray-700
                         py-2.5 text-sm font-semibold
                         hover:bg-gray-50 hover:border-gray-400
                         focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
                         active:scale-95 transition-all duration-150"
                  @click="closeModal"
                >
                  Cancelar
                </button>

                <!-- Confirmar -->
                <button
                  ref="confirmBtnRef"
                  type="button"
                  class="flex-1 rounded-xl bg-indigo-600 text-white
                         py-2.5 text-sm font-semibold
                         hover:bg-indigo-700
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                         active:scale-95 transition-all duration-150"
                  @click="confirmPurchase"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

// ─────────────────────────────────────────────
// TARJETAS PREPAGO
// Reemplaza cada campo con los marcadores reales
// o con los valores definitivos antes de usar.
//
// Patrón de marcadores:
//   title : {{PREPAID_n_TITLE}}
//   desc  : {{PREPAID_n_DESC}}
//   price : {{PREPAID_n_PRICE}}
// ─────────────────────────────────────────────
const prepaidCards = [
  {
    icon: '🎬',
    title: '{{PREPAID_1_TITLE}}',   // Ej: Netflix Premium
    desc:  '{{PREPAID_1_DESC}}',    // Ej: Suscripción mensual en HD
    price: '{{PREPAID_1_PRICE}}',   // Ej: $299.00
  },
  {
    icon: '🎵',
    title: '{{PREPAID_2_TITLE}}',   // Ej: Spotify Familiar
    desc:  '{{PREPAID_2_DESC}}',    // Ej: Hasta 6 cuentas sin anuncios
    price: '{{PREPAID_2_PRICE}}',   // Ej: $199.00
  },
  {
    icon: '🎮',
    title: '{{PREPAID_3_TITLE}}',   // Ej: Xbox Game Pass
    desc:  '{{PREPAID_3_DESC}}',    // Ej: Más de 100 juegos al mes
    price: '{{PREPAID_3_PRICE}}',   // Ej: $349.00
  },
  {
    icon: '☁️',
    title: '{{PREPAID_4_TITLE}}',   // Ej: iCloud 200 GB
    desc:  '{{PREPAID_4_DESC}}',    // Ej: Almacenamiento en la nube
    price: '{{PREPAID_4_PRICE}}',   // Ej: $39.00
  },
  {
    icon: '📦',
    title: '{{PREPAID_5_TITLE}}',   // Ej: Amazon Prime
    desc:  '{{PREPAID_5_DESC}}',    // Ej: Envíos y streaming incluidos
    price: '{{PREPAID_5_PRICE}}',   // Ej: $249.00
  },
  {
    icon: '📺',
    title: '{{PREPAID_6_TITLE}}',   // Ej: Disney+ Anual
    desc:  '{{PREPAID_6_DESC}}',    // Ej: Marvel, Star Wars y más
    price: '{{PREPAID_6_PRICE}}',   // Ej: $1,499.00
  },
]

// ─────────────────────────────────────────────
// FORMATEO DEL NÚMERO DE TARJETA
// Recibe 12 dígitos y devuelve grupos de 4.
// Ej: "123456789012" → "1234 5678 9012"
// Si el valor sigue siendo el marcador, lo muestra tal cual.
// ─────────────────────────────────────────────
function formatCardNumber(raw) {
  if (!raw || raw.includes('{{')) return raw   // deja el marcador intacto
  const digits = raw.replace(/\D/g, '').slice(0, 12)
  return digits.replace(/(.{4})/g, '$1 ').trim()
}

// ─────────────────────────────────────────────
// ESTADO DEL MODAL
// ─────────────────────────────────────────────
const modalOpen    = ref(false)
const selectedCard = ref(null)

const modalPanelRef = ref(null)
const cancelBtnRef  = ref(null)
const confirmBtnRef = ref(null)

// ID único para aria-labelledby
const modalTitleId = 'modal-title-confirm'

// Elemento que tenía el foco antes de abrir el modal (para restaurar)
let triggerElement = null

async function openModal(card) {
  triggerElement = document.activeElement
  selectedCard.value = card
  modalOpen.value = true

  // Esperar a que el DOM esté disponible y mover el foco al botón Cancelar
  await nextTick()
  cancelBtnRef.value?.focus()

  // Bloquear scroll del body
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  modalOpen.value = false
  selectedCard.value = null
  document.body.style.overflow = ''

  // Devolver el foco al elemento que abrió el modal
  nextTick(() => triggerElement?.focus())
}

function confirmPurchase() {
  // Aquí puedes añadir lógica de confirmación (emit, store, etc.)
  closeModal()
}

// ─────────────────────────────────────────────
// FOCUS TRAP
// Mantiene el foco dentro del modal mientras está abierto.
// Solo cicla entre cancelBtnRef y confirmBtnRef.
// ─────────────────────────────────────────────
function trapFocus(event) {
  if (event.key !== 'Tab') return

  const focusable = [cancelBtnRef.value, confirmBtnRef.value].filter(Boolean)
  if (focusable.length === 0) return

  const first = focusable[0]
  const last  = focusable[focusable.length - 1]

  if (event.shiftKey) {
    // Shift+Tab: si estamos en el primero, saltar al último
    if (document.activeElement === first) {
      event.preventDefault()
      last.focus()
    }
  } else {
    // Tab: si estamos en el último, saltar al primero
    if (document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }
}
</script>
