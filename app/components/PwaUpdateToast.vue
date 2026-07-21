<script setup>
import { ref, computed } from 'vue'

const { $pwa } = useNuxtApp()
const isUpdating = ref(false)
const dismissed = ref(false)

// Determina si el toast debe mostrarse (reactivo vía $pwa)
const shouldShow = computed(() => {
  if (dismissed.value) return false
  return ($pwa?.needRefresh || $pwa?.offlineReady) ?? false
})

const handleUpdate = async () => {
  if (!$pwa) return
  isUpdating.value = true
  try {
    await $pwa.updateServiceWorker()
  } catch (err) {
    console.error('Error al actualizar:', err)
  } finally {
    isUpdating.value = false
    dismissed.value = true
  }
}

const handleDismiss = () => {
  if ($pwa?.cancelPrompt) {
    $pwa.cancelPrompt()
  }
  dismissed.value = true
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
      leave-active-class="transition-all duration-300 ease-in"
      enter-from-class="opacity-0 translate-y-4 scale-95"
      leave-to-class="opacity-0 translate-y-4 scale-95"
    >
      <div
        v-if="shouldShow && $pwa"
        role="alert"
        aria-live="polite"
        class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-[calc(100%-2rem)] max-w-md"
      >
        <div
          class="relative bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 shadow-2xl
                 shadow-teal-500/10 overflow-hidden"
        >
          <!-- Barra decorativa superior -->
          <div class="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-teal-500 via-blue-500 to-teal-500"></div>

          <div class="flex items-start gap-4">
            <!-- Icono -->
            <div
              class="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0"
            >
              <LucideRefreshCw
                v-if="$pwa.needRefresh"
                :size="20"
                class="text-teal-400"
              />
              <LucideCheckCircle2
                v-else
                :size="20"
                class="text-teal-400"
              />
            </div>

            <!-- Contenido -->
            <div class="flex-1 min-w-0">
              <p class="text-white text-sm font-bold">
                <template v-if="$pwa.needRefresh">
                  Nueva versión disponible
                </template>
                <template v-else>
                  App lista para usar sin conexión
                </template>
              </p>
              <p class="text-slate-400 text-xs mt-0.5">
                <template v-if="$pwa.needRefresh">
                  Actualiza para obtener las últimas mejoras y funcionalidades.
                </template>
                <template v-else>
                  Ya puedes navegar la aplicación sin conexión a internet.
                </template>
              </p>
            </div>

            <!-- Acciones -->
            <div class="flex items-center gap-2 shrink-0">
              <button
                v-if="$pwa.needRefresh"
                @click="handleUpdate"
                :disabled="isUpdating"
                class="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-white text-xs font-bold rounded-xl
                       transition-all hover:shadow-lg hover:shadow-teal-500/25 disabled:opacity-50
                       flex items-center gap-1.5 active:scale-95"
              >
                <LucideRefreshCw
                  v-if="isUpdating"
                  :size="12"
                  class="animate-spin"
                />
                <template v-else>
                  Actualizar
                </template>
              </button>
              <button
                @click="handleDismiss"
                class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500
                       hover:text-white hover:bg-slate-800 transition-all active:scale-90"
                aria-label="Cerrar"
              >
                <LucideX :size="16" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
