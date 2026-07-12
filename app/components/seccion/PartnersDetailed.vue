<script setup>
import { Globe, ChevronRight } from 'lucide-vue-next'

// Usamos el composable para la animación al hacer scroll
useScrollReveal()

// Arreglo completo con todos los socios, sus detalles e IMÁGENES
const detailedPartners = [
  {
    name: "Incepta Pharmaceuticals",
    shortName: "INCEPTA",
    region: "Asia / Medio Oriente",
    desc: "Líder biotecnológico especializado en vacunas y tratamientos de alta complejidad genómica.",
    logo: "https://ui-avatars.com/api/?name=Incepta&background=fff&color=1d4ed8&rounded=false&bold=true&font-size=0.3",
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
    logo: "https://ui-avatars.com/api/?name=Fenix+Farma&background=fff&color=f97316&rounded=false&bold=true&font-size=0.3",
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
    logo: "https://ui-avatars.com/api/?name=MCCosmetics&background=fff&color=4f46e5&rounded=false&bold=true&font-size=0.3",
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
    logo: "https://ui-avatars.com/api/?name=VIM+Labs&background=fff&color=0ea5e9&rounded=false&bold=true&font-size=0.3",
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
    logo: "https://ui-avatars.com/api/?name=SKD&background=fff&color=334155&rounded=false&bold=true&font-size=0.3",
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
    logo: "https://ui-avatars.com/api/?name=Aeron&background=fff&color=0284c7&rounded=false&bold=true&font-size=0.3",
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
    logo: "https://ui-avatars.com/api/?name=LGM&background=fff&color=c2410c&rounded=false&bold=true&font-size=0.3",
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
    logo: "https://ui-avatars.com/api/?name=AM+Labs&background=fff&color=dc2626&rounded=false&bold=true&font-size=0.3",
    colorClass: "text-red-600",
    bgClass: "bg-red-50",
    hoverBorder: "hover:border-red-300",
    delay: "100ms"
  }
]
</script>

<template>
  <section class="py-24 bg-slate-50 border-t border-slate-200">
    <div class="max-w-7xl mx-auto px-6 md:px-8">
      
      <!-- Título de la sección -->
      <div class="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 reveal-on-scroll opacity-0 translate-y-10">
        <div class="max-w-xl">
          <div class="flex items-center gap-2 text-teal-600 font-bold uppercase tracking-widest text-xs mb-4">
            <Globe :size="16" /> Presencia Internacional
          </div>
          <h2 class="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Nuestra Red Global</h2>
        </div>
        <p class="text-slate-500 max-w-md border-l-4 border-teal-500 pl-6 text-lg font-light leading-relaxed">
          Alianzas estratégicas reales con laboratorios de clase mundial auditados bajo las normativas más estrictas de AGEMED.
        </p>
      </div>

      <!-- Cuadrícula generada dinámicamente -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <!-- Las 8 tarjetas de los socios -->
        <div 
          v-for="(partner, index) in detailedPartners" 
          :key="index"
          :class="[
            'bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm transition-all duration-500 group reveal-on-scroll opacity-0 translate-y-10 hover:shadow-2xl hover:-translate-y-2',
            partner.hoverBorder
          ]"
          :style="{ transitionDelay: partner.delay }"
        >
          <!-- Cabecera de la tarjeta: IMAGEN REAL y Nombre Corto -->
          <div class="h-16 mb-6 flex items-center gap-4">
             <div :class="['w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-inner overflow-hidden', partner.bgClass]">
                <!-- Etiqueta <img> lista para los logos oficiales -->
                <img 
                  :src="partner.logo" 
                  :alt="partner.name" 
                  class="w-10 h-10 object-contain mix-blend-multiply"
                />
             </div>
             <span :class="['text-2xl font-black uppercase tracking-widest transition-colors', partner.colorClass]">
               {{ partner.shortName }}
             </span>
          </div>

          <!-- Cuerpo de la tarjeta -->
          <div class="pt-6 border-t border-slate-100 flex flex-col h-full">
            <div>
              <span :class="['inline-block px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest mb-4', partner.bgClass, partner.colorClass]">
                {{ partner.region }}
              </span>
              <h4 class="font-bold text-slate-900 text-xl mb-3">{{ partner.name }}</h4>
              <p class="text-slate-500 text-sm font-light leading-relaxed">
                {{ partner.desc }}
              </p>
            </div>
          </div>
        </div>

        <!-- 9. Tarjeta CTA: Y muchos más... -->
        <NuxtLink to="/contacto" class="bg-linear-to-br from-teal-50 to-blue-50 p-10 rounded-[2.5rem] border border-teal-100 flex flex-col justify-center items-center text-center group cursor-pointer reveal-on-scroll opacity-0 translate-y-10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500" style="transition-delay: 200ms;">
          <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-teal-600 mb-6 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
            <Globe :size="28" stroke-width="1.5" />
          </div>
          <h4 class="font-bold text-slate-900 text-xl mb-3">Y muchos más...</h4>
          <p class="text-slate-500 text-sm font-light leading-relaxed">Contamos con una red de más de 15 proveedores internacionales certificados.</p>
          <div class="mt-6 text-sm font-bold text-teal-600 flex items-center gap-1 group-hover:text-teal-700 bg-slate-950 px-6 py-3 rounded-full transition-colors">
            Contáctanos <ChevronRight :size="16" class="transform group-hover:translate-x-1 transition-transform" />
          </div>
        </NuxtLink>

      </div>
    </div>
  </section>
</template>

<style scoped>
.reveal-on-scroll {
  transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
}
</style>