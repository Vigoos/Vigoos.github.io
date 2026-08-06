<script setup>
// Llamamos a nuestro composable de animaciones
useScrollReveal()
const { t } = useI18n()
</script>

<template>
  <div class="nosotros-wrapper">
    <!-- --- HERO DE LA PÁGINA "NOSOTROS" --- -->
    <header class="relative w-full pt-48 pb-32 flex items-center justify-center overflow-hidden bg-white">
      <div class="max-w-4xl mx-auto px-6 relative z-10 text-center reveal-on-scroll opacity-0 translate-y-10">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-6 bg-linear-to-br from-[#F40001] via-[#B30000] to-[#7F0000] shadow-lg shadow-biadoxid-900/30">
          <span class="w-2 h-2 rounded-full bg-white animate-pulse shrink-0"></span>
          {{ t('nosotrosPage.heroBadge') }}
        </div>
        <h1 class="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
          {{ t('nosotrosPage.heroTitlePre') }} <span class="text-transparent bg-clip-text bg-linear-to-r from-teal-500 to-teal-700">{{ t('nosotrosPage.heroTitleHighlight') }}</span> {{ t('nosotrosPage.heroTitlePost') }}
        </h1>
        <p class="text-xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
          {{ t('nosotrosPage.heroText') }}
        </p>
      </div>
    </header>

    <!-- --- TIMELINE CON IMÁGENES (DISEÑO EQUILIBRADO) --- -->
    <section class="py-32 bg-white relative overflow-hidden">
      <!-- Línea central vertical -->
      <div class="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 -ml-1px timeline-line opacity-60"></div>

      <div class="max-w-6xl mx-auto px-6 md:px-8 relative">
        
        <!-- HITO 1: Origen -->
        <div class="flex flex-col md:flex-row items-center justify-between mb-32 relative">
          <!-- Imagen a la izquierda -->
          <div class="w-full md:w-5/12 hidden md:block reveal-on-scroll opacity-0 translate-y-10 pr-12">
            <ImageZoom src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=70" alt="Visión Fundacional - El Origen">
              <div class="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl group" style="aspect-ratio: 4/3; content-visibility: auto; contain-intrinsic-size: 400px 300px;">
                <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=70')] bg-cover bg-center opacity-80 group-hover:opacity-95 transition-opacity duration-700"></div>
                <div class="absolute inset-0 bg-linear-to-tr from-slate-900/20 to-transparent"></div>
              </div>
            </ImageZoom>
          </div>
          
          <!-- Nodo Central Animado -->
          <div class="absolute left-0 md:left-1/2 w-4 h-4 rounded-full border-4 -ml-2 timeline-dot reveal-on-scroll opacity-0 scale-50 bg-slate-800 border-slate-700 z-10 transition-all duration-700"></div>
          
          <!-- Texto a la derecha -->
          <div class="w-full md:w-5/12 pl-8 md:pl-12 reveal-on-scroll opacity-0 translate-y-10">
            <span class="text-teal-600 font-bold text-sm mb-3 block tracking-widest uppercase">{{ t('nosotrosPage.hito1Tag') }}</span>
            <h3 class="text-3xl font-bold text-slate-900 mb-5">{{ t('nosotrosPage.hito1Title') }}</h3>
            <p class="text-slate-600 leading-relaxed text-lg">
              {{ t('nosotrosPage.hito1Text') }} <strong class="text-teal-600">{{ t('nosotrosPage.hito1TextHighlight') }}</strong>, {{ t('nosotrosPage.hito1TextPost') }}
            </p>
          </div>
        </div>

        <!-- HITO 2: Expansión -->
        <div class="flex flex-col md:flex-row-reverse items-center justify-between mb-32 relative">
          <!-- Imagen a la derecha -->
          <div class="w-full md:w-5/12 hidden md:block reveal-on-scroll opacity-0 translate-y-10 pl-12">
            <ImageZoom src="https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=800&q=70" alt="Expansión Estratégica - Crecimiento">
              <div class="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl group" style="aspect-ratio: 4/3; content-visibility: auto; contain-intrinsic-size: 400px 300px;">
                <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=800&q=70')] bg-cover bg-center opacity-80 group-hover:opacity-95 transition-opacity duration-700"></div>
                <div class="absolute inset-0 bg-linear-to-tl from-teal-500/20 to-transparent"></div>
              </div>
            </ImageZoom>
          </div>
          
          <!-- Nodo Central Animado -->
          <div class="absolute left-0 md:left-1/2 w-4 h-4 rounded-full border-4 -ml-2 timeline-dot reveal-on-scroll opacity-0 scale-50 bg-slate-800 border-slate-700 z-10 transition-all duration-700"></div>
          
          <!-- Texto a la izquierda -->
          <div class="w-full md:w-5/12 pl-8 md:pl-0 md:pr-12 md:text-right reveal-on-scroll opacity-0 translate-y-10">
            <span class="text-teal-600 font-bold text-sm mb-3 block tracking-widest uppercase">{{ t('nosotrosPage.hito2Tag') }}</span>
            <h3 class="text-3xl font-bold text-slate-900 mb-5">{{ t('nosotrosPage.hito2Title') }}</h3>
            <p class="text-slate-600 leading-relaxed text-lg">
              {{ t('nosotrosPage.hito2Text') }} <strong class="text-teal-600">{{ t('nosotrosPage.hito2TextHighlight') }}</strong>. {{ t('nosotrosPage.hito2TextPost') }}
            </p>
          </div>
        </div>

        <!-- HITO 3: Actualidad -->
        <div class="flex flex-col md:flex-row items-center justify-between relative">
          <!-- Imagen a la izquierda -->
          <div class="w-full md:w-5/12 hidden md:block reveal-on-scroll opacity-0 translate-y-10 pr-12">
            <ImageZoom src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=70" alt="Excelencia Sostenida - Presente y Futuro">
              <div class="relative rounded-3xl overflow-hidden border border-teal-500/30 shadow-[0_0_40px_rgba(244,0,1,0.12)] group" style="aspect-ratio: 4/3; content-visibility: auto; contain-intrinsic-size: 400px 300px;">
                <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=70')] bg-cover bg-center opacity-85 group-hover:opacity-95 transition-opacity duration-700"></div>
                <div class="absolute inset-0 bg-linear-to-t from-slate-900/20 via-transparent to-transparent"></div>
              </div>
            </ImageZoom>
          </div>
          
          <!-- Nodo Central Animado -->
          <div class="absolute left-0 md:left-1/2 w-4 h-4 rounded-full border-4 -ml-2 timeline-dot reveal-on-scroll opacity-0 scale-50 bg-slate-800 border-slate-700 z-10 transition-all duration-700"></div>
          
          <!-- Texto a la derecha en caja resaltada -->
          <div class="w-full md:w-5/12 pl-8 md:pl-12 reveal-on-scroll opacity-0 translate-y-10">
            <div class="bg-white border border-slate-200/70 p-8 rounded-3xl relative overflow-hidden group shadow-[0_16px_40px_-20px_rgba(15,23,42,0.18)]">
              <span class="absolute top-0 inset-x-0 h-1 bg-teal-500" aria-hidden="true"></span>
              <span class="text-teal-600 font-bold text-sm mb-2 block relative z-10">{{ t('nosotrosPage.hito3Tag') }}</span>
              <h3 class="text-2xl font-bold text-slate-900 mb-4 relative z-10">{{ t('nosotrosPage.hito3Title') }}</h3>
              <p class="text-slate-600 leading-relaxed relative z-10">
                {{ t('nosotrosPage.hito3Text') }}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<style scoped>
.reveal-on-scroll {
  transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
}
.timeline-line {
  background: linear-gradient(to bottom, transparent, #ffffff 10%, #F40001 50%, #ffffff 90%, transparent);
}
</style>