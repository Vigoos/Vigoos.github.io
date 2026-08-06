<script setup>
// Importamos tu base de datos JSON
import catalogo from '../../data/catalogo.json'
// 1. Pilar Vitaminas (Buscamos algún producto que sea Vitamina o C Vim)
const pilarVitamina = catalogo.find(p => p.name.includes('Vim') || p.name.includes('Vitamina'))
const imgVitamina = pilarVitamina ? pilarVitamina.image : ''

// 2. Pilar Dermatología (Buscamos Arnik Forte o Arnik Baby)
const pilarArnica = catalogo.find(p => p.name.includes('Arnik'))
const imgArnica = pilarArnica ? pilarArnica.image : ''

// 3. Pilar Biotecnología (Buscamos la Tenecteplasa)
const pilarBiotec = catalogo.find(p => p.name.includes('Tenecteplasa') || p.name.includes('TNK'))
const imgTenecteplasa = pilarBiotec ? pilarBiotec.image : ''
// Reutilizamos el composable de animaciones
useScrollReveal()
const { t } = useI18n()
</script>

<template>
  <section class="py-24 bg-white relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-6 md:px-8">
      
      <div class="text-center mb-20 reveal-on-scroll opacity-0 translate-y-10">
        <h2 class="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">{{ t('pilares.titlePre') }} <span
            class="text-transparent bg-clip-text bg-linear-to-r from-teal-500 via-teal-600 to-teal-700">{{ t('pilares.titleHighlight') }}</span></h2>
        <p class="text-slate-500 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          {{ t('pilares.text') }}
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        
        <div class="rounded-[2.5rem] bg-slate-50 border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group reveal-on-scroll opacity-0 translate-y-10">
          <div class="h-52 relative overflow-hidden bg-white">
            <ImageZoom :src="imgVitamina" :alt="t('pilares.card1Title')">
              <div 
                class="absolute inset-0 bg-contain bg-no-repeat bg-center group-hover:scale-110 transition-transform duration-700" 
                :style="{ backgroundImage: `url(${imgVitamina})` }">
              </div>
            </ImageZoom>
            <div class="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/20 to-transparent pointer-events-none"></div>
            <div class="absolute bottom-6 left-8 text-teal-400 z-10">
              <LucideTarget :size="32" stroke-width="2" />
            </div>
          </div>
          
          <div class="p-10 pt-8">
            <h3 class="text-2xl font-bold text-slate-900 mb-4">{{ t('pilares.card1Title') }}</h3>
            <p class="text-slate-600 leading-relaxed font-light text-sm">
              {{ t('pilares.card1Pre') }} <strong class="text-slate-900 font-semibold">{{ t('pilares.card1Highlight') }}</strong>, {{ t('pilares.card1Post') }}
            </p>
          </div>
        </div>

        <div class="rounded-[2.5rem] bg-slate-50 border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group reveal-on-scroll opacity-0 translate-y-10" style="transition-delay: 100ms;">
          <div class="h-52 relative overflow-hidden bg-white">
            <ImageZoom :src="imgArnica" :alt="t('pilares.card2Title')">
              <div 
                class="absolute inset-0 bg-contain bg-no-repeat bg-center group-hover:scale-110 transition-transform duration-700" 
                :style="{ backgroundImage: `url(${imgArnica})` }">
              </div>
            </ImageZoom>
            <div class="absolute inset-0 bg-linear-to-t from-teal-950/90 via-teal-950/20 to-transparent pointer-events-none"></div>
            <div class="absolute bottom-6 left-8 text-teal-300 z-10">
              <LucideBeaker :size="32" stroke-width="2" />
            </div>
          </div>
          
          <div class="p-10 pt-8">
            <h3 class="text-2xl font-bold text-slate-900 mb-4">{{ t('pilares.card2Title') }}</h3>
            <p class="text-slate-600 leading-relaxed font-light text-sm">
              {{ t('pilares.card2Pre') }} <strong class="text-slate-900 font-semibold">{{ t('pilares.card2Highlight') }}</strong>. {{ t('pilares.card2Post') }}
            </p>
          </div>
        </div>

        <div class="relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-[#F40001] via-[#B30000] to-[#7F0000] border border-white/10 hover:shadow-[0_20px_50px_rgba(244,0,1,0.2)] hover:-translate-y-2 transition-all duration-500 group reveal-on-scroll opacity-0 translate-y-10" style="transition-delay: 200ms;">
          <div class="h-52 relative overflow-hidden bg-white">
            <ImageZoom :src="imgTenecteplasa" :alt="t('pilares.card3Title')">
              <div 
                class="absolute inset-0 bg-contain bg-no-repeat bg-center mix-blend-luminosity opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
                :style="{ backgroundImage: `url(${imgTenecteplasa})` }">
              </div>
            </ImageZoom>
            <div class="absolute inset-0 bg-linear-to-t from-biadoxid-950/70 via-biadoxid-900/30 to-transparent pointer-events-none"></div>
            <div class="absolute bottom-6 left-8 text-white z-10">
              <LucideActivity :size="32" stroke-width="2" />
            </div>
          </div>
          
          <div class="p-10 pt-8">
            <h3 class="text-2xl font-bold text-white mb-4">{{ t('pilares.card3Title') }}</h3>
            <p class="text-white/85 leading-relaxed font-light text-sm">
              {{ t('pilares.card3Pre') }} <strong class="text-white font-semibold bg-white/15 px-1.5 py-0.5 rounded-md">{{ t('pilares.card3Highlight') }}</strong> {{ t('pilares.card3Post') }}
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.reveal-on-scroll {
  transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
}
</style>