<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  slides: { type: Array, required: true },
  interval: { type: Number, default: 6500 }
})

const { t } = useI18n()

const current = ref(0)
const progress = ref(0)
const isPaused = ref(false)
let rafId = null
let startTime = 0
let accumulated = 0

const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const clearLoop = () => {
  if (rafId) cancelAnimationFrame(rafId)
  rafId = null
}

const loop = (timestamp) => {
  const elapsed = (timestamp - startTime) + accumulated
  const p = Math.min(elapsed / props.interval, 1)
  // Actualizar solo cuando el avance visible cambia (pasos de 0.5%): evita
  // re-renderizar Vue a 60fps (ahorra hilo principal en móvil)
  const rounded = Math.round(p * 200) / 200
  if (rounded !== progress.value) progress.value = rounded
  if (p >= 1) {
    current.value = (current.value + 1) % props.slides.length
    accumulated = 0
    startTime = performance.now()
    progress.value = 0
  }
  rafId = requestAnimationFrame(loop)
}

const play = () => {
  clearLoop()
  if (props.slides.length < 2 || isPaused.value || reducedMotion) return
  startTime = performance.now()
  rafId = requestAnimationFrame(loop)
}

const pause = () => {
  isPaused.value = true
  if (startTime > 0) accumulated += performance.now() - startTime
  clearLoop()
}

const resume = () => {
  isPaused.value = false
  play()
}

const onFocusOut = (e) => {
  if (!e.currentTarget.contains(e.relatedTarget)) resume()
}

const goTo = (i) => {
  current.value = i
  accumulated = 0
  progress.value = 0
  play()
}

const onVisibility = () => {
  if (document.hidden) pause()
  else resume()
}

// CTAs — el primario es siempre el mismo; el secundario cambia por slide.
// Están FUERA del loop de slides para no recibir la animación de entrada/salida.
const primaryCtaText = computed(() => t('hero.primaryCta'))
const primaryCtaTo = computed(() => props.slides[current.value]?.primaryTo || '/productos')
const secondaryCtaText = computed(() => props.slides[current.value]?.secondaryCta || '')
const secondaryCtaTo = computed(() => props.slides[current.value]?.secondaryTo || '/contacto')

onMounted(() => {
  play()
  document.addEventListener('visibilitychange', onVisibility)
})

onBeforeUnmount(() => {
  clearLoop()
  document.removeEventListener('visibilitychange', onVisibility)
})
</script>

<template>
  <div class="relative flex flex-col" @mouseenter="pause" @mouseleave="resume" @focusin="pause" @focusout="onFocusOut">
    <!-- Slides rotativos: solo título + subtítulo. Los CTAs están fuera para no animarse. -->
    <!-- Los slides no activos siguen en el flujo del grid (sin absolute) para que la
         altura del contenedor SIEMPRE sea la del slide más alto → hero estable. -->
    <div class="grid" role="group" aria-roledescription="carousel" :aria-label="t('hero.rotatingLabel')" aria-live="off">
      <div
        v-for="(slide, i) in slides"
        :key="i"
        class="hero-slide-item [grid-area:1/1] flex flex-col transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform,filter]"
        :class="i === current
          ? 'opacity-100 blur-0 translate-y-0 relative z-10'
          : 'opacity-0 blur-sm translate-y-5 pointer-events-none'"
        :aria-hidden="i !== current">

        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.15] mb-5 tracking-tight hero-text-shadow max-w-2xl">
          {{ slide.titlePre }} <span class="text-teal-500">{{ slide.titleHighlight }}</span>
        </h1>

        <p class="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-152 font-light hero-text-shadow">
          {{ slide.subtitle }}
        </p>
      </div>
    </div>

    <!-- Botones CTA — fuera del loop de animación. Siempre visibles, sin transición de entrada.
         Tamaño idéntico: mismos px, py, text-size y min-width para que ambos botones
         se vean del mismo ancho visual. -->
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pointer-events-auto mt-8 mb-2">
      <!-- CTA primario (rojo de marca) -->
      <NuxtLink :to="primaryCtaTo"
        class="cta-btn bg-teal-500 hover:bg-teal-600 text-white px-8 py-3.5 sm:px-9 sm:py-4 rounded-full text-sm sm:text-base font-bold transition-all duration-300 shadow-[0_0_20px_rgba(15,173,173,0.45)] hover:shadow-[0_0_30px_rgba(15,173,173,0.65)] hover:-translate-y-0.5 flex items-center justify-center gap-3 min-w-55 sm:min-w-60">
        <span>{{ primaryCtaText }}</span>
        <LucideArrowRight :size="18" />
      </NuxtLink>

      <!-- CTA secundario (contorno cristal) -->
      <NuxtLink :to="secondaryCtaTo"
        class="cta-btn border border-white/40 bg-white/5 hover:bg-white/15 hover:border-white text-white px-8 py-3.5 sm:px-9 sm:py-4 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 flex items-center justify-center hero-text-shadow min-w-55 sm:min-w-60">
        <span>{{ secondaryCtaText }}</span>
      </NuxtLink>
    </div>

    <!-- Puntos indicadores de paginación + barra de progreso de los slides -->
    <div class="mt-2 flex items-center gap-3 pointer-events-auto z-20" role="group" :aria-label="t('hero.rotatingLabel')">
      <button
        v-for="i in slides.length"
        :key="i"
        type="button"
        :aria-label="`${t('hero.rotatingGo')} ${i}`"
        :aria-current="i - 1 === current ? 'true' : undefined"
        @click="goTo(i - 1)"
        class="h-2.5 rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-transparent cursor-pointer"
        :class="i - 1 === current ? 'w-7 bg-teal-500' : 'w-2.5 bg-white/40 hover:bg-white/70'">
      </button>
      <div class="ml-1 w-20 md:w-28 h-0.75 rounded-full bg-white/20 overflow-hidden" aria-hidden="true">
        <div class="h-full rounded-full bg-teal-500" :style="{ width: `${progress * 100}%` }"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-text-shadow {
  text-shadow:
    0 1px 3px rgba(0, 0, 0, 0.55),
    0 4px 14px rgba(0, 0, 0, 0.45),
    0 8px 40px rgba(0, 0, 0, 0.6);
}

@media (prefers-reduced-motion: reduce) {
  .hero-slide-item {
    transition: none !important;
  }
}
</style>