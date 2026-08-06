<script setup>
useScrollReveal()
const { t } = useI18n()
</script>

<template>
  <section id="nosotros" class="py-32 bg-white relative z-20 overflow-hidden">
    <div class="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
      <!-- Cabecera centrada de la sección -->
      <div class="max-w-3xl mx-auto text-center mb-20 reveal-on-scroll opacity-0 translate-y-10">
        <div
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-6 bg-linear-to-br from-teal-500 via-teal-700 to-[#7F0000] shadow-lg shadow-biadoxid-900/30">
          <span class="w-2 h-2 rounded-full bg-white animate-pulse shrink-0"></span>
          {{ t('nosotros.badge') }}
        </div>
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
          {{ t('nosotros.titlePre') }} <span
            class="text-transparent bg-clip-text bg-linear-to-r from-teal-500 via-teal-600 to-teal-700">{{ t('nosotros.titleHighlight') }}</span>
        </h2>
        <p class="text-slate-600 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
          {{ t('nosotros.text') }}
        </p>
        <!-- Divisor de marca -->
        <div class="flex items-center justify-center gap-2">
          <span class="w-10 h-px bg-slate-200"></span>
          <span class="w-16 h-1 rounded-full bg-teal-500"></span>
          <span class="w-10 h-px bg-slate-200"></span>
        </div>
      </div>

      <!-- Tarjetas escalonadas (gradas): Misión → Visión (Canvas rojo) → Valores -->
      <div class="space-y-8 md:space-y-10">

        <!-- Tarjeta 1: Misión -->
        <div class="reveal-on-scroll opacity-0 translate-y-10">
          <div
            class="relative lg:w-[85%] bg-white rounded-4xl border border-slate-200/70 overflow-hidden group hover:-translate-y-1.5 transition-all duration-500 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_-20px_rgba(15,23,42,0.18)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.05),0_24px_48px_-20px_rgba(15,23,42,0.28)]">
            <span class="absolute top-0 inset-x-0 h-1 bg-teal-500" aria-hidden="true"></span>
            <div class="p-8 md:p-10">
              <div class="flex items-start justify-between gap-6 mb-6">
                <div class="flex items-center gap-4">
                  <div
                    class="w-14 h-14 shrink-0 rounded-2xl bg-teal-50 border border-teal-100 text-teal-600 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600 transition-colors duration-500">
                    <LucideTarget :size="28" :stroke-width="1.5" />
                  </div>
                  <h4 class="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">{{ t('nosotros.mision') }}</h4>
                </div>
                <span
                  class="shrink-0 text-[11px] font-mono font-bold text-teal-500 bg-teal-50/80 border border-teal-100 px-2.5 py-1 rounded-full">01</span>
              </div>
              <div class="border-t border-slate-100 pt-6">
                <p class="text-slate-600 leading-relaxed text-lg font-light">
                  {{ t('nosotros.misionText') }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Tarjeta 2: Visión — fondo rojo Canvas de marca -->
        <div class="reveal-on-scroll opacity-0 translate-y-10" style="transition-delay: 100ms">
          <div
            class="relative lg:ml-[7.5%] lg:w-[85%] overflow-hidden rounded-4xl border border-white/10 shadow-[0_16px_44px_-18px_rgba(180,0,0,0.5)] group hover:-translate-y-1.5 transition-all duration-500">
            <AbstractNetworkCanvas variant="crimson" aria-hidden="true" />
            <!-- Velo uniforme para legibilidad (sin difuminados) -->
            <div class="absolute inset-0 bg-[#3d0001]/15 pointer-events-none" aria-hidden="true"></div>
            <span class="absolute top-0 inset-x-0 h-1 bg-white/40" aria-hidden="true"></span>
            <div class="relative z-10 p-8 md:p-10">
              <div class="flex items-start justify-between gap-6 mb-6">
                <div class="flex items-center gap-4">
                  <div
                    class="w-14 h-14 shrink-0 rounded-2xl bg-white/10 border border-white/25 text-white flex items-center justify-center group-hover:bg-white group-hover:text-biadoxid-700 group-hover:border-white transition-colors duration-500">
                    <LucideEye :size="28" :stroke-width="1.5" />
                  </div>
                  <h4 class="text-xl md:text-2xl font-extrabold text-white tracking-tight">{{ t('nosotros.vision') }}</h4>
                </div>
                <span
                  class="shrink-0 text-[11px] font-mono font-bold text-white bg-white/10 border border-white/25 px-2.5 py-1 rounded-full">02</span>
              </div>
              <div class="border-t border-white/20 pt-6">
                <p class="text-white leading-relaxed text-lg">
                  {{ t('nosotros.visionPre') }} <span
                    class="bg-white text-biadoxid-700 font-bold px-2 py-0.5 rounded-md">{{ t('nosotros.visionHighlight') }}</span> {{ t('nosotros.visionPost') }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Tarjeta 3: Valores -->
        <div class="reveal-on-scroll opacity-0 translate-y-10" style="transition-delay: 200ms">
          <div
            class="relative lg:ml-[15%] lg:w-[85%] bg-white rounded-4xl border border-slate-200/70 overflow-hidden group hover:-translate-y-1.5 transition-all duration-500 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_-20px_rgba(15,23,42,0.18)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.05),0_24px_48px_-20px_rgba(15,23,42,0.28)]">
            <span class="absolute top-0 inset-x-0 h-1 bg-teal-500" aria-hidden="true"></span>
            <div class="p-8 md:p-10">
              <div class="flex items-start justify-between gap-6 mb-6">
                <div class="flex items-center gap-4">
                  <div
                    class="w-14 h-14 shrink-0 rounded-2xl bg-teal-50 border border-teal-100 text-teal-600 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600 transition-colors duration-500">
                    <LucideHeart :size="28" :stroke-width="1.5" />
                  </div>
                  <h4 class="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">{{ t('nosotros.valores') }}</h4>
                </div>
                <span
                  class="shrink-0 text-[11px] font-mono font-bold text-teal-500 bg-teal-50/80 border border-teal-100 px-2.5 py-1 rounded-full">03</span>
              </div>
              <div class="border-t border-slate-100 pt-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    class="bg-white p-4 rounded-2xl flex items-center gap-3 border border-slate-200 hover:border-teal-400/60 hover:shadow-md transition-all duration-300">
                    <div
                      class="w-8 h-8 shrink-0 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs ring-1 ring-teal-100">
                      01</div>
                    <span class="font-semibold text-slate-700">{{ t('nosotros.valor1') }}</span>
                  </div>
                  <div
                    class="bg-white p-4 rounded-2xl flex items-center gap-3 border border-slate-200 hover:border-teal-400/60 hover:shadow-md transition-all duration-300">
                    <div
                      class="w-8 h-8 shrink-0 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs ring-1 ring-teal-100">
                      02</div>
                    <span class="font-semibold text-slate-700">{{ t('nosotros.valor2') }}</span>
                  </div>
                  <div
                    class="bg-white p-4 rounded-2xl flex items-center gap-3 border border-slate-200 hover:border-teal-400/60 hover:shadow-md transition-all duration-300">
                    <div
                      class="w-8 h-8 shrink-0 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs ring-1 ring-teal-100">
                      03</div>
                    <span class="font-semibold text-slate-700">{{ t('nosotros.valor3') }}</span>
                  </div>
                  <div
                    class="bg-white p-4 rounded-2xl flex items-center gap-3 border border-slate-200 hover:border-teal-400/60 hover:shadow-md transition-all duration-300">
                    <div
                      class="w-8 h-8 shrink-0 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs ring-1 ring-teal-100">
                      04</div>
                    <span class="font-semibold text-slate-700">{{ t('nosotros.valor4') }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
