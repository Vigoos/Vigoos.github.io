<script setup>
const { t } = useI18n()

// Animación de entrada al hacer scroll
useScrollReveal()

// Coordenadas de la sede: fuente única para el enlace y la ruta
const MAP_COORDS = '-16.5001073,-68.1260071'

// URL oficial de embed de Google Maps (www.google.com/maps/embed?pb=...).
// El endpoint viejo (maps.google.com/maps?output=embed) fue deprecado por Google:
// devuelve 301 hacia un embed con origin=mfe que el navegador bloquea dentro del
// iframe ('rechazó la conexión'). Esta URL pb fue generada desde MAP_COORDS.
// NOTA: si cambias MAP_COORDS, regenera esta URL (o usa el botón 'Compartir > Incrustar'
// de Google Maps para obtener el pb actualizado).
const MAP_EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.5!2d-68.1260071!3d-16.5001073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDMwJzAwLjQiUyA2OMKwMDcnMzMuNiJX!5e0!3m2!1ses!2sbo!4v1'
</script>

<template>
  <section id="mapa" class="relative w-full py-20 bg-white">
    <div class="max-w-7xl mx-auto px-6 md:px-8">
      <!-- Encabezado de la sección -->
      <div class="max-w-3xl mx-auto text-center mb-14 reveal-on-scroll opacity-0 translate-y-10">
        <div
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-6 bg-linear-to-br from-[#F40001] via-[#B30000] to-[#7F0000] shadow-lg shadow-biadoxid-900/30">
          <span class="w-2 h-2 rounded-full bg-white animate-pulse shrink-0"></span>
          {{ t('contactMapa.badge') }}
        </div>
        <h2 class="text-4xl md:text-5xl font-black leading-[1.1] mb-6 tracking-tight text-slate-900">
          {{ t('contactMapa.titlePre') }} <span
            class="text-transparent bg-clip-text bg-linear-to-r from-teal-500 via-teal-600 to-teal-700">{{ t('contactMapa.titleHighlight') }}</span>
        </h2>
        <p class="text-slate-500 text-lg leading-relaxed font-light max-w-2xl mx-auto">{{ t('contactMapa.text') }}</p>
      </div>

      <!-- Tarjeta del mapa -->
      <div class="relative overflow-hidden rounded-[2.5rem] border border-slate-200/80 shadow-[0_25px_60px_-20px_rgba(180,0,0,0.18)] reveal-on-scroll opacity-0 translate-y-10"
        style="transition-delay: 100ms">
        <!-- Franja roja superior (coherente con el formulario de contacto) -->
        <span class="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-[#F40001] via-[#B30000] to-[#7F0000] z-30" aria-hidden="true"></span>

        <div class="relative w-full h-96 md:h-125 group">
          <iframe
            :src="MAP_EMBED"
            class="w-full h-full border-0 filter grayscale contrast-[1.1] opacity-80 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Ubicación Biadoxid Pharma - Av. Simón Bolívar, Edificio Altar II"
          ></iframe>

          <!-- Chip de sede + botón cómo llegar (esquina superior) -->
          <div class="absolute top-6 left-6 md:left-auto md:right-6 z-20 flex flex-col gap-3 items-start max-w-[calc(100%-3rem)]">
            <div class="bg-white/95 backdrop-blur-md border border-slate-200 p-5 rounded-2xl shadow-2xl flex items-center gap-5">
              <div class="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 shadow-sm border border-teal-100">
                <LucideMapPin :size="24" class="animate-bounce" />
              </div>
              <div>
                <h4 class="text-slate-900 font-black text-sm uppercase tracking-tight">{{ t('contactMapa.badge') }}</h4>
                <p class="text-slate-500 text-xs font-medium">{{ t('contactMapa.sub') }}</p>
              </div>
            </div>
            <a :href="`https://www.google.com/maps/dir/?api=1&destination=${MAP_COORDS}`" target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 bg-biadoxid-600 hover:bg-biadoxid-700 text-white pl-3.5 pr-5 py-2.5 rounded-full shadow-lg shadow-biadoxid-900/30 active:scale-[0.98] transition-all duration-300 group">
              <span class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <LucideNavigation :size="12" />
              </span>
              <span class="text-sm font-bold">{{ t('contactMapa.directionsCta') }}</span>
            </a>
          </div>

          <!-- Píldora de dirección (esquina inferior) → abre Google Maps en pestaña nueva -->
          <a :href="`https://www.google.com/maps?q=${MAP_COORDS}`" target="_blank" rel="noopener noreferrer"
            class="absolute bottom-6 left-6 z-20 bg-biadoxid-600 hover:bg-biadoxid-700 text-white pl-4 pr-5 py-3 rounded-full shadow-xl shadow-biadoxid-900/30 flex items-center gap-2.5 max-w-[calc(100%-3rem)] active:scale-[0.98] transition-all duration-300 group"
            :aria-label="t('contactMapa.openMapsAria')">
            <span
              class="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-biadoxid-700 transition-colors duration-300">
              <LucideExternalLink :size="14" />
            </span>
            <span class="text-sm font-bold truncate min-w-0">{{ t('contactMapa.addressShort') }}</span>
          </a>
        </div>
      </div>

      <!-- Datos rápidos de la sede -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 reveal-on-scroll opacity-0 translate-y-10"
        style="transition-delay: 200ms">
        <div
          class="flex items-center gap-4 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_10px_30px_-15px_rgba(180,0,0,0.12)] hover:shadow-[0_20px_40px_-15px_rgba(180,0,0,0.18)] hover:-translate-y-1 transition-all duration-500 group">
          <div
            class="w-11 h-11 rounded-xl bg-biadoxid-600 group-hover:bg-biadoxid-700 flex items-center justify-center text-white shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
            <LucideNavigation :size="20" />
          </div>
          <div class="min-w-0">
            <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400">{{ t('contactMapa.statZoneLabel') }}</p>
            <p class="font-black text-slate-900 text-sm truncate">{{ t('contactMapa.statZoneValue') }}</p>
          </div>
        </div>

        <div
          class="flex items-center gap-4 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_10px_30px_-15px_rgba(180,0,0,0.12)] hover:shadow-[0_20px_40px_-15px_rgba(180,0,0,0.18)] hover:-translate-y-1 transition-all duration-500 group">
          <div
            class="w-11 h-11 rounded-xl bg-biadoxid-600 group-hover:bg-biadoxid-700 flex items-center justify-center text-white shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
            <LucideClock :size="20" />
          </div>
          <div class="min-w-0">
            <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400">{{ t('contactMapa.statHoursLabel') }}</p>
            <p class="font-black text-slate-900 text-sm truncate">{{ t('contactMapa.statHoursValue') }}</p>
          </div>
        </div>

        <div
          class="flex items-center gap-4 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_10px_30px_-15px_rgba(180,0,0,0.12)] hover:shadow-[0_20px_40px_-15px_rgba(180,0,0,0.18)] hover:-translate-y-1 transition-all duration-500 group">
          <div
            class="w-11 h-11 rounded-xl bg-biadoxid-600 group-hover:bg-biadoxid-700 flex items-center justify-center text-white shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
            <LucidePhone :size="20" />
          </div>
          <div class="min-w-0">
            <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400">{{ t('contactForm.phoneLabel') }}</p>
            <p class="font-black text-slate-900 text-sm truncate">+591 69105198 / 76265905</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Animación de entrada suave de la sección (coherente con el formulario y proveedores) */
.reveal-on-scroll {
  transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
}
</style>
