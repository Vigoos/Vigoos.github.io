<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

useScrollReveal()
const { t } = useI18n()

// ============================================================
// Sedes con imagen: HOY solo la central (HERO-IMAGEN).
// Cuando la empresa se expanda, agrega aquí otra sede (imagen + nameKey)
// y cada una aparecerá en su propio lugar alrededor del mapa.
// ============================================================
const sites = [
  { image: '/HERO-IMAGEN.webp', nameKey: 'mapaBolivia.sede' }
]

const zoomSite = ref(null)
const openZoom = (site) => { zoomSite.value = site }
const closeZoom = () => { zoomSite.value = null }

watch(zoomSite, (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
})

const onKeydown = (e) => {
  if (e.key === 'Escape' && zoomSite.value) closeZoom()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <section class="py-24 bg-white">
    <div class="max-w-5xl mx-auto px-6 md:px-8">

      <div class="max-w-2xl mx-auto text-center mb-14 reveal-on-scroll opacity-0 translate-y-10">
        <div
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-6 bg-linear-to-br from-[#F40001] via-[#B30000] to-[#7F0000] shadow-lg shadow-biadoxid-900/30">
          <span class="w-2 h-2 rounded-full bg-white animate-pulse shrink-0"></span>
          {{ t('mapaBolivia.badge') }}
        </div>
        <h2 class="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          {{ t('mapaBolivia.titlePre') }} <span
            class="text-transparent bg-clip-text bg-linear-to-r from-teal-500 via-teal-600 to-teal-700">{{ t('mapaBolivia.titleHighlight') }}</span>
        </h2>
        <p class="text-slate-500 max-w-xl mx-auto mt-6 text-lg font-light leading-relaxed">
          {{ t('mapaBolivia.text') }}
        </p>
      </div>

      <!-- Tarjeta (izquierda) + Mapa (derecha, subido) -->
      <div class="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10 lg:gap-14">

        <div v-for="(site, i) in sites" :key="i" class="w-64 shrink-0 floating-card lg:mt-16"
          :style="{ animationDelay: (i * 0.7) + 's' }">
          <div
            class="relative rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-[0_24px_50px_-16px_rgba(180,0,0,0.30)]">
            <span class="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-[#F40001] via-[#B30000] to-[#7F0000] z-10"
              aria-hidden="true"></span>

            <div class="relative">
              <img :src="site.image" :alt="t(site.nameKey)" loading="lazy" class="w-full h-36 object-cover"
                @error="$event.target.src = '/BIADOXID-PHARMA-LOGO.webp'; $event.target.style.padding = '12px'; $event.target.style.objectFit = 'contain'" />
              <div class="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"></div>

              <button type="button" @click="openZoom(site)"
                class="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 flex items-center justify-center text-slate-600 shadow-lg hover:bg-biadoxid-600 hover:text-white hover:border-biadoxid-600 transition-all duration-300 cursor-pointer"
                :aria-label="t('mapaBolivia.viewImage', { name: t(site.nameKey) })"
                :title="t('mapaBolivia.viewImage', { name: t(site.nameKey) })">
                <LucideEye :size="16" />
              </button>

              <div class="absolute bottom-3 left-3 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse" aria-hidden="true"></span>
                <span class="text-white text-[10px] font-bold uppercase tracking-widest drop-shadow">{{ t(site.nameKey) }}</span>
              </div>
            </div>

            <div class="p-4">
              <div class="grid grid-cols-2 gap-2.5">
                <div class="rounded-xl bg-slate-50 border border-slate-200 p-3 text-center">
                  <p class="text-xl font-black text-biadoxid-600 leading-none mb-1">9</p>
                  <p class="text-[9px] uppercase tracking-wider text-slate-500 font-bold leading-tight">{{ t('mapaBolivia.statDepts') }}</p>
                </div>
                <div class="rounded-xl bg-slate-50 border border-slate-200 p-3 text-center flex flex-col items-center justify-center gap-1">
                  <LucideSnowflake :size="14" class="text-biadoxid-500" />
                  <p class="text-[9px] uppercase tracking-wider text-slate-500 font-bold leading-tight">{{ t('mapaBolivia.statCold') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full max-w-125 shrink-0 relative" role="img" :aria-label="t('mapaBolivia.aria')">
          <BoliviaHeroMap />

          <!-- Flecha conectora: La Paz (sede central) → tarjeta, elevada.
               Anclada a las coordenadas de LPZ en app/data/boliviaMapData.js (x=0.1235, y=0.5159).
               top: calc(52% - 70px) ancla el inicio del trayecto (y=70 del viewBox) sobre La Paz. -->
          <svg class="absolute hidden lg:block pointer-events-none z-20" viewBox="0 0 130 100" fill="none"
            style="right: calc(100% - 13%); top: calc(52% - 70px); width: 130px; height: 100px;"
            aria-hidden="true">
            <!-- Trayecto punteado animado: sube desde La Paz hacia la tarjeta -->
            <path class="connector-path" d="M 130 70 C 115 40, 80 22, 22 18" stroke="#E11D2E" stroke-width="2.5"
              stroke-linecap="round" fill="none" />
            <!-- Punta de flecha apuntando a la tarjeta (más arriba) -->
            <path d="M 8 18 L 22 10 L 22 26 Z" fill="#E11D2E" />
          </svg>
        </div>

      </div>

      <div class="mt-14 flex justify-center reveal-on-scroll opacity-0 translate-y-10">
        <NuxtLink to="/nosotros"
          class="group inline-flex items-center gap-3 bg-biadoxid-600 hover:bg-biadoxid-700 text-white pl-7 pr-2 py-2 rounded-full font-bold shadow-lg shadow-biadoxid-900/30 hover:shadow-xl hover:shadow-biadoxid-900/40 hover:-translate-y-0.5 transition-all duration-300">
          <span>{{ t('mapaBolivia.cta') }}</span>
          <span
            class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-biadoxid-700 transition-colors duration-300">
            <LucideArrowRight :size="16" class="group-hover:translate-x-0.5 transition-transform duration-300" />
          </span>
        </NuxtLink>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="zoom-fade">
        <div v-if="zoomSite" class="fixed inset-0 z-300 bg-slate-950/85 backdrop-blur-md" @click="closeZoom"></div>
      </Transition>

      <Transition name="zoom-pop">
        <div v-if="zoomSite" role="dialog" aria-modal="true"
          class="fixed inset-0 z-310 flex items-center justify-center p-4 sm:p-8 pointer-events-none">
          <div class="relative max-w-5xl w-full pointer-events-auto" @click="closeZoom">
            <button type="button" @click="closeZoom"
              class="absolute -top-12 right-0 inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-white text-sm font-bold hover:bg-biadoxid-600 hover:border-biadoxid-600 transition-colors cursor-pointer"
              :aria-label="t('mapaBolivia.viewClose')">
              <LucideX :size="16" /> {{ t('mapaBolivia.viewClose') }}
            </button>

            <img :src="zoomSite.image" :alt="t(zoomSite.nameKey)"
              class="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/10"
              loading="lazy" @click.stop />
            <p class="mt-3 text-center text-sm text-slate-300 font-medium">{{ t(zoomSite.nameKey) }}</p>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.floating-card {
  animation: float-card 5.5s ease-in-out infinite;
}

@keyframes float-card {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-9px); }
}

.connector-path {
  stroke-dasharray: 6 6;
  animation: connector-flow 1.4s linear infinite;
}

@keyframes connector-flow {
  to { stroke-dashoffset: -12; }
}

.zoom-fade-enter-active, .zoom-fade-leave-active { transition: opacity 0.3s ease; }
.zoom-fade-enter-from, .zoom-fade-leave-to { opacity: 0; }

.zoom-pop-enter-active, .zoom-pop-leave-active { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.zoom-pop-enter-from, .zoom-pop-leave-to { opacity: 0; transform: scale(0.96) translateY(10px); }

/* Accesibilidad: respetar la preferencia de movimiento reducido */
@media (prefers-reduced-motion: reduce) {
  .floating-card,
  .connector-path {
    animation: none;
  }
}
</style>
