<script setup>
import { ref, computed } from 'vue'
import { Globe, ChevronRight, BadgeCheck, Eye } from 'lucide-vue-next'

useScrollReveal()
const { t } = useI18n()

const selectedPartner = ref(null)
const isPartnerModalOpen = ref(false)

const openPartnerModal = (partner) => {
  selectedPartner.value = partner
  isPartnerModalOpen.value = true
}

const closePartnerModal = () => {
  isPartnerModalOpen.value = false
}

const currentPartnerIndex = computed(() => {
  if (!selectedPartner.value) return 0
  const i = detailedPartners.findIndex(p => p.name === selectedPartner.value.name)
  return i === -1 ? 0 : i
})

const goToPrevPartner = () => {
  if (currentPartnerIndex.value > 0) {
    openPartnerModal(detailedPartners[currentPartnerIndex.value - 1])
  }
}

const goToNextPartner = () => {
  if (currentPartnerIndex.value < detailedPartners.length - 1) {
    openPartnerModal(detailedPartners[currentPartnerIndex.value + 1])
  }
}

const detailedPartners = [
  {
    name: "Incepta Pharmaceuticals",
    shortName: "INCEPTA",
    region: "Asia / Medio Oriente",
    desc: "Líder biotecnológico especializado en vacunas y tratamientos de alta complejidad genómica.",
    logo: "/logos/incepta.png",
    colorClass: "text-blue-600",
    bgClass: "bg-blue-50",
    hoverBorder: "hover:border-blue-300",
    delay: "0ms"
  },
  {
    name: "Fenix Farmacéutica",
    shortName: "FENIX",
    region: "Europa",
    desc: "Expertos en suplementación clínica avanzada y desarrollo de fórmulas dermocosméticas.",
    logo: "/logos/fenix.png",
    colorClass: "text-orange-600",
    bgClass: "bg-orange-50",
    hoverBorder: "hover:border-orange-300",
    delay: "100ms"
  },
  {
    name: "MCCosmetics NY",
    shortName: "MCCOSMETICS",
    region: "Estados Unidos",
    desc: "Referente mundial en medicina estética, mesoterapia y dermocosmética profesional.",
    logo: "/logos/mccosmetics.png",
    colorClass: "text-indigo-600",
    bgClass: "bg-indigo-50",
    hoverBorder: "hover:border-indigo-300",
    delay: "200ms"
  },
  {
    name: "Laboratorios VIM",
    shortName: "VIM",
    region: "América Latina",
    desc: "Productores regionales de alta confiabilidad en medicamentos genéricos y de marca.",
    logo: "/logos/vim.png",
    colorClass: "text-cyan-600",
    bgClass: "bg-cyan-50",
    hoverBorder: "hover:border-cyan-300",
    delay: "0ms"
  },
  {
    name: "SKD Pharma Group",
    shortName: "SKD",
    region: "Global Network",
    desc: "Corporación enfocada en investigación y desarrollo de principios activos críticos.",
    logo: "/logos/skd.png",
    colorClass: "text-slate-700",
    bgClass: "bg-slate-100",
    hoverBorder: "hover:border-slate-400",
    delay: "100ms"
  },
  {
    name: "Aeron Lifescience",
    shortName: "AERON",
    region: "Norteamérica",
    desc: "Desarrollo y manufactura de soluciones médicas e insumos de vanguardia tecnológica.",
    logo: "/logos/aeron.png",
    colorClass: "text-sky-600",
    bgClass: "bg-sky-50",
    hoverBorder: "hover:border-sky-300",
    delay: "200ms"
  },
  {
    name: "LGM Corporation",
    shortName: "LGM",
    region: "Global",
    desc: "Red de distribución integral asegurando el abastecimiento de materias primas y fármacos.",
    logo: "/logos/lgm.png",
    colorClass: "text-orange-700",
    bgClass: "bg-orange-50",
    hoverBorder: "hover:border-orange-400",
    delay: "0ms"
  },
  {
    name: "AM Laboratories",
    shortName: "AM",
    region: "Europa / Global",
    desc: "Excelencia en manufactura farmacológica cumpliendo con los estándares internacionales más estrictos.",
    logo: "/logos/a.m.png",
    colorClass: "text-red-600",
    bgClass: "bg-red-50",
    hoverBorder: "hover:border-red-300",
    delay: "100ms"
  }
]
</script>

<template>
  <section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-6 md:px-8">
      
      <div class="max-w-3xl mx-auto text-center mb-20 reveal-on-scroll opacity-0 translate-y-10">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-bold uppercase tracking-widest text-xs mb-6 bg-linear-to-br from-[#F40001] via-[#B30000] to-[#7F0000] shadow-lg shadow-biadoxid-900/30">
          <span class="w-2 h-2 rounded-full bg-white animate-pulse shrink-0"></span>
          {{ t('partnersDetailed.badge') }}
        </div>
        <h2 class="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">{{ t('partnersDetailed.titlePre') }} <span
            class="text-transparent bg-clip-text bg-linear-to-r from-teal-500 via-teal-600 to-teal-700">{{ t('partnersDetailed.titleHighlight') }}</span></h2>
        <p class="text-slate-500 max-w-xl mx-auto mt-6 text-lg font-light leading-relaxed">
          {{ t('partnersDetailed.text') }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <div 
          v-for="(partner, index) in detailedPartners" 
          :key="index"
          :class="[
            'group bg-white rounded-[2rem] border border-slate-200 shadow-sm transition-all duration-500 reveal-on-scroll opacity-0 translate-y-10 hover:shadow-2xl hover:-translate-y-2 overflow-hidden flex flex-col',
            partner.hoverBorder
          ]"
          :style="{ transitionDelay: partner.delay }"
        >
          <div :class="['relative h-40 flex items-center justify-center overflow-hidden', partner.bgClass]">
            <img
              :src="partner.logo"
              alt=""
              class="absolute -bottom-8 -right-8 w-36 h-36 object-contain opacity-10 mix-blend-multiply pointer-events-none select-none"
              loading="lazy"
              aria-hidden="true"
              @error="$event.target.src = '/BIADOXID-PHARMA-LOGO-v2.webp'; $event.target.style.padding = '4px'"
            />
            <img 
              :src="partner.logo" 
              :alt="partner.name" 
              class="w-24 h-24 object-contain mix-blend-multiply drop-shadow-sm transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              @error="$event.target.src = '/BIADOXID-PHARMA-LOGO-v2.webp'; $event.target.style.padding = '4px'"
            />
            <button type="button" @click="openPartnerModal(partner)"
              class="absolute top-3 left-3 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 flex items-center justify-center text-slate-600 shadow-lg hover:bg-teal-500 hover:text-white hover:border-teal-500 hover:shadow-[0_0_15px_rgba(244,0,1,0.4)] transition-all duration-300 cursor-pointer"
              :aria-label="t('partnersDetailed.viewAria', { name: partner.name })"
              :title="t('partnersDetailed.viewAria', { name: partner.name })">
              <Eye :size="16" />
            </button>
            <span :class="['absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-[9px] font-black uppercase tracking-widest', partner.colorClass]">
              {{ partner.region }}
            </span>
          </div>

          <div class="p-6 flex flex-col flex-1">
            <h3 class="font-black text-slate-900 text-xl leading-tight mb-0.5">{{ partner.name }}</h3>
            <span :class="['text-xs font-black uppercase tracking-[0.2em]', partner.colorClass]">{{ partner.shortName }}</span>
            <p class="mt-3 text-slate-500 text-sm leading-relaxed flex-1">
              {{ partner.desc }}
            </p>

            <div class="mt-5 pt-5 border-t border-slate-100 space-y-3">
              <div class="flex items-center gap-2.5 text-sm">
                <Globe :size="15" class="text-slate-400 shrink-0" />
                <span class="text-slate-600 font-medium">{{ t('partnersDetailed.allianceLabel') }}</span>
              </div>
              <div class="flex items-center gap-2.5 text-sm">
                <BadgeCheck :size="15" class="text-teal-500 shrink-0" />
                <span class="text-slate-600 font-medium">{{ t('partnersDetailed.certBadge') }}</span>
              </div>
            </div>
          </div>
        </div>

        <NuxtLink to="/contacto"
          class="relative bg-white p-10 rounded-[2rem] border border-slate-200/70 overflow-hidden flex flex-col justify-center items-center text-center group cursor-pointer reveal-on-scroll opacity-0 translate-y-10 hover:-translate-y-2 hover:border-teal-400/60 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.28)] transition-all duration-500"
          style="transition-delay: 200ms;">
          <span class="absolute top-0 inset-x-0 h-1 bg-teal-500" aria-hidden="true"></span>
          <div
            class="w-16 h-16 bg-teal-50 border border-teal-100 rounded-2xl flex items-center justify-center text-teal-600 mb-6 shadow-sm group-hover:bg-teal-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
            <Globe :size="28" stroke-width="1.5" />
          </div>
          <h4 class="font-bold text-slate-900 text-xl mb-3">{{ t('partnersDetailed.moreTitle') }}</h4>
          <p class="text-slate-500 text-sm font-light leading-relaxed">{{ t('partnersDetailed.moreText') }}</p>
          <div
            class="mt-6 text-sm font-bold text-white flex items-center gap-1 bg-teal-500 hover:bg-teal-700 px-6 py-3 rounded-full transition-colors">
            {{ t('partnersDetailed.moreCta') }} <ChevronRight :size="16"
              class="transform group-hover:translate-x-1 transition-transform" />
          </div>
        </NuxtLink>

      </div>
    </div>

    <PartnerModal
      :show="isPartnerModalOpen"
      :partner="selectedPartner"
      :index="currentPartnerIndex"
      :total="detailedPartners.length"
      @close="closePartnerModal"
      @prev="goToPrevPartner"
      @next="goToNextPartner"
    />
  </section>
</template>

<style scoped>
.reveal-on-scroll {
  transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
}
</style>