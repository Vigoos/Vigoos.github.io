<script setup>
import {
  Flame,
  Aperture,
  Microscope,
  Activity,
  Wind,
  Waves,
  Box,
  Droplet,
  Hexagon
} from 'lucide-vue-next'

const partners = [
  { name: "FENIX", subtitle: "Farmacéutica", icon: Flame, color: "text-orange-500", border: "border-orange-500/30", bg: "bg-orange-500/5", shadow: "group-hover:drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]" },
  { name: "INCEPTA", subtitle: "Pharmaceuticals", icon: Aperture, color: "text-blue-500", border: "border-blue-500/30", bg: "bg-blue-500/5", shadow: "group-hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]" },
  { name: "VIM", subtitle: "Laboratorios", icon: Microscope, color: "text-cyan-400", border: "border-cyan-400/30", bg: "bg-cyan-400/5", shadow: "group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]" },
  { name: "SKD", subtitle: "Pharma Group", icon: Activity, color: "text-slate-300", border: "border-slate-300/30", bg: "bg-slate-300/5", shadow: "group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]" },
  { name: "AERON", subtitle: "Lifescience", icon: Wind, color: "text-sky-400", border: "border-sky-400/30", bg: "bg-sky-400/5", shadow: "group-hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.8)]" },
  { name: "LGM", subtitle: "Corporation", icon: Box, color: "text-orange-600", border: "border-orange-600/30", bg: "bg-orange-600/5", shadow: "group-hover:drop-shadow-[0_0_12px_rgba(234,88,12,0.8)]" },
  { name: "MCCOSMETICS", subtitle: "New York", icon: Droplet, color: "text-indigo-400", border: "border-indigo-400/30", bg: "bg-indigo-400/5", shadow: "group-hover:drop-shadow-[0_0_12px_rgba(129,140,248,0.8)]" },
  { name: "AM", subtitle: "Laboratories", icon: Hexagon, color: "text-red-500", border: "border-red-500/30", bg: "bg-red-500/5", shadow: "group-hover:drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]" }
]
</script>

<template>
  <section class="py-24 border-y border-slate-800/50 bg-slate-950 overflow-clip relative">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.03)_0%,transparent_70%)] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-6 md:px-8 mb-16 flex flex-col items-center md:items-start relative z-10">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
        <LucideHexagon :size="14" class="animate-[spin_4s_linear_infinite]" />
        Red Global de Confianza
      </div>
      <h3 class="text-4xl md:text-5xl font-black text-white tracking-tight leading-none text-center md:text-left">
        Nuestros <span class="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-teal-400 to-blue-500">Socios Comerciales</span>
      </h3>
    </div>

    <div class="relative w-full overflow-clip contain-paint marquee-container group/marquee">
       <div class="absolute inset-y-0 left-0 w-24 md:w-64 bg-linear-to-r from-slate-950 via-slate-950/80 to-transparent z-20 pointer-events-none"></div>
       <div class="absolute inset-y-0 right-0 w-24 md:w-64 bg-linear-to-l from-slate-950 via-slate-950/80 to-transparent z-20 pointer-events-none"></div>

       <div class="flex w-max animate-marquee gap-8 items-center px-12">
         <div 
           v-for="(partner, index) in [...partners, ...partners, ...partners]" 
           :key="index" 
           class="group flex items-center gap-6 p-4 transition-all duration-500 cursor-pointer min-w-70"
         >
            <div :class="[
              'w-20 h-20 shrink-0 flex items-center justify-center rounded-2xl border transition-all duration-500 group-hover:scale-110 group-hover:bg-slate-900',
              partner.bg,
              partner.border,
              partner.color,
              partner.shadow
            ]">
              <component :is="partner.icon" :size="38" :stroke-width="partner.name === 'SKD' ? 2.2 : 1.5" />
            </div>

            <div class="flex flex-col min-w-30">
              <span class="font-black text-2xl tracking-tighter leading-none text-slate-300 group-hover:text-white transition-colors duration-300">
                {{ partner.name }}
              </span>
              <span class="text-[10px] tracking-[0.2em] uppercase text-slate-600 font-black mt-1.5 group-hover:text-blue-400 transition-colors duration-300">
                {{ partner.subtitle }}
              </span>
            </div>
         </div>
       </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-33.33%); }
}

.animate-marquee {
  animation: marquee 60s linear infinite;
  display: flex;
}

.group\/marquee:hover .animate-marquee {
  animation-play-state: paused;
}

.marquee-container {
  overflow-x: clip !important;
  contain: paint;
}
</style>