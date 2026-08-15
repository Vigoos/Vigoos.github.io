<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const { t } = useI18n()

// ============================================================
// Música de ambiente: el PRIMER gesto del visitante (click o
// tecla en cualquier parte de la página) activa una pista al
// azar. Es el gesto de usuario que los navegadores exigen para
// permitir audio con sonido (autoplay con sonido bloqueado por
// diseño). Solo se dispara una vez por carga de página.
// ============================================================

const TRACKS = [
  '/music/musica1.mp3',
  '/music/musica2.mp3',
  '/music/musica3.mp3',
]

const VOLUME = 0.7 // 70%: ambiente, sin ser invasivo

// En móvil el widget expandido se autocontrae tras unos segundos para no
// tapar el contenido ni chocar con los botones flotantes (WhatsApp, etc.).
// En escritorio se mantiene visible.
const AUTO_COLLAPSE_MS = 5000
const MOBILE_MAX_WIDTH = 640 // breakpoint `sm` de Tailwind

const audio = ref(null)      // elemento HTMLAudioElement (se crea al activar)
const active = ref(false)    // ¿se activó la música alguna vez en esta carga?
const playing = ref(false)   // ¿está sonando ahora mismo?
const muted = ref(false)     // ¿está silenciado?
const collapsed = ref(false) // ¿el usuario cerró el widget?

let removeGestureListeners = null
let autoCollapseTimer = null

const isMobileView = () => {
  if (import.meta.server || typeof window === 'undefined') return false
  return window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`).matches
}

const clearAutoCollapse = () => {
  if (autoCollapseTimer) {
    clearTimeout(autoCollapseTimer)
    autoCollapseTimer = null
  }
}

// Solo en móvil y solo en la primera aparición: autocontrae SIN pausar la música.
const scheduleAutoCollapse = () => {
  clearAutoCollapse()
  if (!isMobileView()) return
  autoCollapseTimer = setTimeout(() => {
    collapsed.value = true
    autoCollapseTimer = null
  }, AUTO_COLLAPSE_MS)
}

const startRandomTrack = () => {
  if (import.meta.server || audio.value) return

  // Pista al azar para que no siempre suene la misma
  const track = TRACKS[Math.floor(Math.random() * TRACKS.length)]

  const el = new Audio(track)
  el.loop = true
  el.volume = VOLUME
  el.preload = 'auto'
  audio.value = el

  const playPromise = el.play()
  if (playPromise) {
    playPromise
      .then(() => {
        active.value = true
        playing.value = true
        scheduleAutoCollapse()
      })
      .catch(() => {
        // El navegador bloqueó el audio o el archivo falló: se limpia en silencio
        audio.value = null
      })
  }

  el.addEventListener('error', () => {
    active.value = false
    playing.value = false
    audio.value = null
  })
}

// === Controles del widget ===

const play = () => {
  if (!audio.value) return
  audio.value.play()
    .then(() => { playing.value = true })
    .catch(() => {})
}

const pause = () => {
  if (!audio.value) return
  audio.value.pause()
  playing.value = false
}

const togglePlay = () => {
  if (playing.value) pause()
  else if (audio.value) play()
  else startRandomTrack()
}

const toggleMute = () => {
  if (!audio.value) return
  muted.value = !muted.value
  audio.value.muted = muted.value
}

const closeWidget = () => {
  clearAutoCollapse()
  pause()
  collapsed.value = true
}

const reopenWidget = () => {
  // Al reabrir manualmente, el widget se queda abierto (sin autocontraerse)
  clearAutoCollapse()
  collapsed.value = false
  if (audio.value) play()
  else startRandomTrack()
}

// === Primer gesto global (una sola vez) ===

const armGestureListener = () => {
  if (import.meta.server) return
  const handler = () => {
    startRandomTrack()
    if (removeGestureListeners) {
      removeGestureListeners()
      removeGestureListeners = null
    }
  }
  window.addEventListener('click', handler)
  window.addEventListener('keydown', handler)
  removeGestureListeners = () => {
    window.removeEventListener('click', handler)
    window.removeEventListener('keydown', handler)
  }
}

onMounted(() => {
  armGestureListener()
})

onUnmounted(() => {
  clearAutoCollapse()
  if (removeGestureListeners) removeGestureListeners()
  audio.value?.pause()
})
</script>

<template>
  <Teleport to="body">
    <!-- Widget expandido (nubecita tipo comentario) -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 translate-y-4 scale-95"
      leave-to-class="opacity-0 translate-y-4 scale-95"
    >
      <div v-if="active && !collapsed" class="fixed bottom-6 left-6 z-170">
        <div
          class="relative bg-white rounded-2xl shadow-xl border border-slate-200 pl-4 pr-2.5 py-2.5 flex items-center gap-3 max-w-[calc(100vw-3rem)]"
          role="group" :aria-label="t('ambientMusic.label')">
          <!-- Colita de la nubecita -->
          <span class="absolute -bottom-1.5 right-8 w-3 h-3 bg-white border-b border-r border-slate-200 rotate-45"
            aria-hidden="true"></span>

          <!-- Icono -->
          <div
            class="w-9 h-9 rounded-xl bg-linear-to-br from-[#F40001] via-[#B30000] to-[#7F0000] flex items-center justify-center text-white shrink-0 shadow-md shadow-biadoxid-900/20">
            <LucideMusic :size="16" />
          </div>

          <!-- Etiqueta + ecualizador -->
          <div class="min-w-0">
            <p class="text-xs font-bold text-slate-900 leading-tight whitespace-nowrap">{{ t('ambientMusic.label') }}</p>
            <div class="flex items-center gap-[3px] mt-1 h-3" :class="playing ? '' : 'opacity-40'">
              <span class="eq-bar" :style="{ animationPlayState: playing ? 'running' : 'paused' }"></span>
              <span class="eq-bar" :style="{ animationPlayState: playing ? 'running' : 'paused' }"></span>
              <span class="eq-bar" :style="{ animationPlayState: playing ? 'running' : 'paused' }"></span>
            </div>
          </div>

          <!-- Controles -->
          <div class="flex items-center gap-1 shrink-0">
            <button type="button"
              class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              :aria-label="playing ? t('ambientMusic.pauseAria') : t('ambientMusic.playAria')"
              @click="togglePlay">
              <LucidePause v-if="playing" :size="15" />
              <LucidePlay v-else :size="15" class="ml-0.5" />
            </button>
            <button type="button"
              class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              :aria-label="muted ? t('ambientMusic.unmuteAria') : t('ambientMusic.muteAria')"
              @click="toggleMute">
              <LucideVolumeX v-if="muted" :size="15" />
              <LucideVolume2 v-else :size="15" />
            </button>
            <button type="button"
              class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              :aria-label="t('ambientMusic.closeAria')"
              @click="closeWidget">
              <LucideX :size="15" />
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Botón colapsado (música pausada) -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 translate-y-4 scale-75"
      leave-to-class="opacity-0 translate-y-4 scale-75"
    >
      <button v-if="active && collapsed" type="button"
        class="fixed bottom-6 left-6 z-170 w-12 h-12 rounded-full bg-linear-to-br from-[#F40001] via-[#B30000] to-[#7F0000] text-white flex items-center justify-center shadow-xl shadow-biadoxid-900/30 hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
        :aria-label="t('ambientMusic.playAria')"
        @click="reopenWidget">
        <LucideMusic :size="20" />
      </button>
    </Transition>
  </Teleport>
</template>

<style scoped>
.eq-bar {
  width: 3px;
  height: 10px;
  border-radius: 2px;
  background: #F40001;
  animation: eqBounce 1s ease-in-out infinite;
}

.eq-bar:nth-child(2) {
  animation-delay: 0.18s;
}

.eq-bar:nth-child(3) {
  animation-delay: 0.36s;
}

@keyframes eqBounce {
  0%, 100% { height: 4px; }
  50% { height: 12px; }
}
</style>
