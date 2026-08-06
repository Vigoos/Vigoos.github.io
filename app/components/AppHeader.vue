<script setup>
import { ref, computed, nextTick, watch, onMounted, onUnmounted } from 'vue'

const { t } = useI18n()
const route = useRoute()

const isMobileMenuOpen = ref(false)
const isScrolled = ref(false) // estilo: claro cuando el usuario hace scroll
const isPastHero = ref(false) // estilo: claro cuando el hero salió de pantalla

// El home tiene hero de video; las demás páginas arrancan en blanco.
const isHome = computed(() => route.path === '/')
const isDarkHeader = computed(() => isHome.value && !isPastHero.value)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 30
  const heroThreshold = isHome.value ? Math.max(400, window.innerHeight * 0.45) : 20
  isPastHero.value = window.scrollY > heroThreshold
}

// ============================================================
// Barra indicadora compartida del nav (una sola barrita).
// Por defecto vive sobre la ruta activa (Inicio en el home) y
// se desliza horizontalmente hacia el botón sobre el que se hace hover.
// ============================================================
const navContainerRef = ref(null)
const indicatorLeft = ref(0)
const indicatorWidth = ref(0)

const positionIndicator = (el) => {
  if (!el) return
  indicatorLeft.value = el.offsetLeft
  indicatorWidth.value = el.offsetWidth
}

const slideIndicator = (el) => positionIndicator(el)

// Vuelve la barra a la página activa (o a Inicio si no hay activa)
const resetIndicatorToActive = () => {
  const container = navContainerRef.value
  if (!container) return
  const active = container.querySelector('.nav-link.is-active') || container.querySelector('.nav-link')
  positionIndicator(active)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
  window.addEventListener('resize', resetIndicatorToActive)
  // Los offsets pueden estabilizarse cuando cargan las fuentes
  nextTick(() => {
    resetIndicatorToActive()
    setTimeout(resetIndicatorToActive, 250)
  })
  // Reajuste final cuando las fuentes terminan de cargar (evita barra desalineada)
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => resetIndicatorToActive())
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', resetIndicatorToActive)
})

// Al navegar, la barra se reposiciona sobre la nueva página activa
watch(() => route.path, () => nextTick(resetIndicatorToActive))
</script>

<template>
  <header>
    <!-- Nav SIEMPRE fixed con top CONSTANTE (sin transición de posición: era la animación
         torpe que en algunos dispositivos hacía parpadear/desaparecer los iconos fijos como
         WhatsApp y BackToTop). El cambio de estilo al hacer scroll se limita a
         colores/radio/sombra (sin transition-all). -->
    <nav class="fixed inset-x-0 top-3 md:top-6 z-50 px-3 md:px-8 pointer-events-none">
      <div :class="[
        'max-w-7xl mx-auto flex justify-between items-center px-3 md:px-6 py-2.5 md:py-3 pointer-events-auto transition-[background-color,border-color,box-shadow,border-radius] duration-500',
        isDarkHeader
          ? 'bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl md:rounded-full'
          : isScrolled
            ? 'bg-white/95 backdrop-blur-xl border border-white/60 rounded-2xl md:rounded-full shadow-2xl'
            : 'bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl shadow-lg'
      ]">

        <NuxtLink to="/" class="flex items-center gap-2 md:gap-3 cursor-pointer min-w-0">
          <!-- Logo + réplica tipográfica; tamaños compactos en móvil para que el nav no desborde -->
          <img src="/BIADOXID-PHARMA-LOGO-v2.webp" alt="Biadoxid Pharma S.R.L."
            class="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl object-contain shrink-0">
          <div class="leading-none min-w-0">
            <div class="flex items-center gap-1 sm:gap-1.5 md:gap-2 whitespace-nowrap">
              <span
                :class="['text-[13px] sm:text-lg md:text-xl font-black tracking-tight transition-colors duration-500', isDarkHeader ? 'text-[#FF4D4E] drop-shadow' : 'text-biadoxid-600']">BIADOXID</span>
              <span
                class="bg-biadoxid-600 text-white text-[13px] sm:text-lg md:text-xl font-black px-1 sm:px-1.5 md:px-2 py-0.5 rounded-md tracking-wide leading-none">PHARMA</span>
              <span
                :class="['text-[9px] sm:text-[11px] md:text-xs font-black tracking-tight transition-colors duration-500 max-[480px]:hidden', isDarkHeader ? 'text-white' : 'text-biadoxid-600']">S.R.L</span>
            </div>
            <span
              :class="['hidden sm:block italic text-[8px] md:text-[9px] tracking-wide transition-colors duration-500', isDarkHeader ? 'text-white/85' : 'text-slate-500']">innovation
              for better health</span>
          </div>
        </NuxtLink>

        <div ref="navContainerRef"
          :class="['hidden lg:flex items-center gap-3 xl:gap-8 text-[13px] xl:text-sm font-semibold relative transition-colors duration-500', isDarkHeader ? 'nav-text-shadow' : '']"
          @mouseleave="resetIndicatorToActive">
          <!-- Barrita compartida: se desliza al botón en hover y vive sobre la ruta activa -->
          <span aria-hidden="true"
            class="nav-indicator absolute pointer-events-none h-[2.5px] rounded-full transition-all duration-300 ease-out"
            :class="isDarkHeader ? 'bg-[#FF4D4E]' : 'bg-biadoxid-600'"
            :style="{ left: indicatorLeft + 'px', width: indicatorWidth + 'px', bottom: '-4px' }"></span>

          <NuxtLink to="/"
            :class="['nav-link pb-1 transition-colors duration-300 whitespace-nowrap', isDarkHeader ? 'text-white/90 hover:text-[#FF4D4E]' : 'text-slate-700 hover:text-biadoxid-600']"
            :active-class="isDarkHeader ? 'is-active text-[#FF4D4E]' : 'is-active text-biadoxid-600'"
            @mouseenter="slideIndicator($event.currentTarget)">
            {{ t('header.navHome') }}
          </NuxtLink>
          <NuxtLink to="/nosotros"
            :class="['nav-link pb-1 transition-colors duration-300 whitespace-nowrap', isDarkHeader ? 'text-white/90 hover:text-[#FF4D4E]' : 'text-slate-700 hover:text-biadoxid-600']"
            :active-class="isDarkHeader ? 'is-active text-[#FF4D4E]' : 'is-active text-biadoxid-600'"
            @mouseenter="slideIndicator($event.currentTarget)">
            {{ t('header.navIdentidad') }}
          </NuxtLink>
          <NuxtLink to="/productos"
            :class="['nav-link pb-1 transition-colors duration-300 whitespace-nowrap', isDarkHeader ? 'text-white/90 hover:text-[#FF4D4E]' : 'text-slate-700 hover:text-biadoxid-600']"
            :active-class="isDarkHeader ? 'is-active text-[#FF4D4E]' : 'is-active text-biadoxid-600'"
            @mouseenter="slideIndicator($event.currentTarget)">{{ t('header.navPortafolio') }}
          </NuxtLink>
          <NuxtLink to="/#logistica"
            :class="['nav-link pb-1 transition-colors duration-300 whitespace-nowrap', isDarkHeader ? 'text-white/90 hover:text-[#FF4D4E]' : 'text-slate-700 hover:text-biadoxid-600']"
            @mouseenter="slideIndicator($event.currentTarget)">{{ t('header.navLogistica') }}</NuxtLink>
        </div>

        <div class="hidden lg:flex items-center gap-2.5 xl:gap-3">
          <LanguageSelector />
          <PwaInstallButton :dark="isDarkHeader" />
          <NuxtLink to="/contacto"
            class="bg-biadoxid-600 hover:bg-biadoxid-700 border border-biadoxid-500/40 text-white px-3.5 xl:px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-biadoxid-600/20 flex items-center gap-2 group whitespace-nowrap">
            {{ t('header.contactanos') }}
            <LucideChevronRight :size="16" class="group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </div>

        <div class="lg:hidden flex items-center gap-1.5 sm:gap-2 shrink-0">
          <LanguageSelector />
          <button
            :class="['pointer-events-auto p-1.5 sm:p-2 focus:outline-none focus:ring-2 focus:ring-biadoxid-500 rounded-lg transition-colors duration-500 shrink-0', isDarkHeader ? 'text-white' : 'text-slate-800']"
            @click="isMobileMenuOpen = !isMobileMenuOpen" :aria-expanded="isMobileMenuOpen"
            :aria-label="t('header.openMenu')">
            <LucideX v-if="isMobileMenuOpen" :size="22" />
            <LucideMenu v-else :size="22" />
          </button>
        </div>
      </div>

      <div v-if="isMobileMenuOpen"
        class="lg:hidden mt-2 w-full bg-white/95 backdrop-blur-xl border border-white/60 rounded-2xl py-5 px-6 flex flex-col gap-5 shadow-2xl pointer-events-auto transform origin-top transition-all max-h-[calc(100dvh-6rem)] overflow-y-auto">
        <div class="mb-2">
          <NuxtLink to="/" class="text-slate-700 font-semibold text-lg hover:text-biadoxid-600"
            @click="isMobileMenuOpen = false">{{ t('header.navHome') }}</NuxtLink>
        </div>
        <NuxtLink to="/nosotros" class="text-slate-700 font-semibold text-lg hover:text-biadoxid-600"
          @click="isMobileMenuOpen = false">{{ t('header.navIdentidadMobile') }}</NuxtLink>
        <NuxtLink to="/productos" class="text-slate-700 font-semibold text-lg hover:text-biadoxid-600"
          @click="isMobileMenuOpen = false">{{ t('header.navPortafolio') }}</NuxtLink>
        <NuxtLink to="/#logistica" class="text-slate-700 font-semibold text-lg hover:text-biadoxid-600"
          @click="isMobileMenuOpen = false">{{ t('header.navLogisticaMobile') }}</NuxtLink>

        <div class="pt-4 mt-2 border-t border-slate-200">
          <NuxtLink to="/contacto"
            class="w-full bg-linear-to-r from-biadoxid-500 to-biadoxid-700 text-white flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-biadoxid-500/25"
            @click="isMobileMenuOpen = false">
            {{ t('header.contactanos') }}
            <LucideChevronRight :size="18" />
          </NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
/* Legibilidad sobre el video: sombra de texto dedicada para los links del nav transparente
   (text-shadow se hereda, basta aplicarlo al contenedor) */
.nav-text-shadow {
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.55), 0 1px 10px rgba(0, 0, 0, 0.35);
}

/* Accesibilidad: sin animación de desplazamiento si el usuario prefiere movimiento reducido */
@media (prefers-reduced-motion: reduce) {
  .nav-indicator {
    transition: none;
  }
}
</style>
