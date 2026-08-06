<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const videoRef = ref(null)

// En móvil el video NO compite con la carga inicial: se muestra el poster fijo
// y la reproducción arranca con el primer scroll/tap (optimización de rendimiento).
const isMobile = ref(false)
const started = ref(false)
const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

let mq
let mqHandler
let scrollStarter
let touchStarter
let clickStarter
let visibilityHandler
let heroObserver

const tryPlay = () => {
  const v = videoRef.value
  if (!v) return
  v.play().catch(() => {})
}

const startMobile = () => {
  if (started.value || reducedMotion) return
  started.value = true
  tryPlay()
}

onMounted(() => {
  mq = window.matchMedia('(max-width: 767px)')
  isMobile.value = mq.matches
  mqHandler = (e) => { isMobile.value = e.matches }
  mq.addEventListener('change', mqHandler)

  // En desktop arranca enseguida (ancho de banda de sobra); en móvil espera
  // a la primera interacción o scroll (optimización de carga inicial).
  if (!isMobile.value && !reducedMotion) {
    tryPlay()
  } else if (isMobile.value) {
    scrollStarter = () => startMobile()
    touchStarter = () => startMobile()
    clickStarter = () => startMobile()
    window.addEventListener('scroll', scrollStarter, { passive: true })
    window.addEventListener('touchstart', touchStarter, { passive: true })
    window.addEventListener('click', clickStarter)
  }

  // Pausar al ocultar la pestaña (mejora batería y bfcache) y reanudar al volver
  visibilityHandler = () => {
    const v = videoRef.value
    if (!v) return
    if (document.hidden) v.pause()
    else if (started.value || !isMobile.value) tryPlay()
  }
  document.addEventListener('visibilitychange', visibilityHandler)

  // Pausar cuando el hero sale de pantalla (scroll) y reanudar al volver
  heroObserver = new IntersectionObserver(([entry]) => {
    const v = videoRef.value
    if (!v) return
    if (entry.isIntersecting) {
      if (started.value || !isMobile.value) tryPlay()
    } else {
      v.pause()
    }
  }, { threshold: 0.15 })
  if (videoRef.value) heroObserver.observe(videoRef.value)
})

onBeforeUnmount(() => {
  if (mq && mqHandler) mq.removeEventListener('change', mqHandler)
  if (scrollStarter) window.removeEventListener('scroll', scrollStarter)
  if (touchStarter) window.removeEventListener('touchstart', touchStarter)
  if (clickStarter) window.removeEventListener('click', clickStarter)
  if (visibilityHandler) document.removeEventListener('visibilitychange', visibilityHandler)
  if (heroObserver) heroObserver.disconnect()
})
</script>

<template>
  <!-- Altura 112vh: la ola blanca del borde inferior queda bajo el pliegue al cargar -->
    <header class="hero relative w-full min-h-[112vh] flex flex-col overflow-hidden bg-[#8f0000]">
    <!-- Fondo: video de la empresa a pantalla completa -->
    <div class="absolute inset-0 z-0">
      <!-- Sin autoplay en HTML (SSR-safe); onMounted arranca en desktop, scroll/tap en móvil -->
      <video
        ref="videoRef"
        class="w-full h-full object-cover"
        muted
        loop
        playsinline
        preload="metadata"
        poster="/videos/hero-poster.jpg"
        aria-hidden="true">
        <source src="/videos/video-biadoxid-pharma.mp4" type="video/mp4" />
      </video>
    </div>

    <!-- Overlay uniforme black/40 -->
    <div class="absolute inset-0 z-0 bg-black/40" aria-hidden="true"></div>

    <!-- Velo inferior sutil -->
    <div class="absolute inset-0 z-0 bg-linear-to-t from-black/40 via-transparent to-transparent" aria-hidden="true"></div>

    <!-- Cuadrícula sutil de marca -->
    <div class="hero-grid-pattern" aria-hidden="true"></div>

    <!-- Remate inferior: ola suave blanca -->
    <HeroWaveDivider />

    <!-- Contenido elevado (pt menor + pb mayor) para compensar el hero de 112vh sin chocar con el nav -->
    <div class="max-w-7xl mx-auto px-6 md:px-8 relative z-10 w-full flex-1 flex flex-col justify-center pt-24 lg:pt-28 pb-24 md:pb-28 pointer-events-none">
      <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end w-full">
        <div class="lg:col-span-7 xl:col-span-8">
          <HeroContent />
        </div>

        <div class="lg:col-span-5 xl:col-span-4 flex justify-start lg:justify-end pb-2 pointer-events-auto">
          <HeroMetrics />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Tablets en vertical (768px+ con más alto que ancho): un pelín más contenido que
   en escritorio, pero SIEMPRE por encima del viewport para que la ola blanca del
   borde inferior quede bajo el pliegue (sin franja blanca visible al cargar). */
@media (min-width: 768px) and (orientation: portrait) {
  .hero {
    min-height: 106vh !important;
  }
}

/* Pantallas bajas en horizontal (laptops, tablets landscape, Nest Hub): el hero
   crece por encima del viewport (la ola blanca mide hasta ~12% en pantallas bajas)
   para que la franja blanca NUNCA se vea al cargar la página. */
@media (min-width: 768px) and (max-height: 900px) {
  .hero {
    min-height: 115vh !important;
  }
}

@media (prefers-reduced-motion: reduce) {
  video {
    display: none;
  }
}

.hero-grid-pattern {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: linear-gradient(to bottom, transparent 5%, rgb(255, 255, 255) 50%, transparent 95%);
  -webkit-mask-image: linear-gradient(to bottom, transparent 5%, rgb(255, 255, 255) 50%, transparent 95%);
  pointer-events: none;
}
</style>
