<script setup>
import { ref } from 'vue'

// Calculamos el año actual dinámicamente
const currentYear = ref(new Date().getFullYear())
</script>

<template>
  <footer id="contacto" class="bg-slate-950 relative overflow-hidden pt-20 pb-10">
    <div class="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-teal-500/50 to-transparent"></div>
    
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-teal-900/10 rounded-full blur-[100px] pointer-events-none"></div>
    <div class="absolute top-0 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
        
        <div class="lg:col-span-4">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-linear-to-br from-teal-400 to-blue-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(20,184,166,0.3)]">
              <LucideDna :size="22" />
            </div>
            <div>
              <h2 class="text-xl font-black tracking-tight text-white leading-none">BIADOXID</h2>
              <span class="text-[10px] uppercase tracking-widest text-teal-400 font-bold">Pharma S.R.L.</span>
            </div>
          </div>
          <p class="text-slate-400 text-sm leading-relaxed mb-6 font-light max-w-sm">
            Innovación, ética y compromiso absoluto con la salud pública y privada. Somos el puente vital entre la biotecnología global y Bolivia.
          </p>
          <div class="flex gap-4">
            <a href="#" class="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:border-teal-500/30 transition-all">
              <span class="font-bold font-mono text-xs">in</span>
            </a>
          </div>
        </div>

        <div class="lg:col-span-2">
          <h4 class="text-white font-bold mb-6 uppercase text-xs tracking-widest">Compañía</h4>
          <ul class="space-y-4">
            <li><a href="#" class="text-slate-400 text-sm hover:text-teal-400 transition-colors flex items-center gap-2 group"><span class="w-0 group-hover:w-2 h-px bg-teal-400 transition-all duration-300"></span> Inicio</a></li>
            <li><a href="#nosotros" class="text-slate-400 text-sm hover:text-teal-400 transition-colors flex items-center gap-2 group"><span class="w-0 group-hover:w-2 h-px bg-teal-400 transition-all duration-300"></span> Identidad</a></li>
            <li><a href="#productos" class="text-slate-400 text-sm hover:text-teal-400 transition-colors flex items-center gap-2 group"><span class="w-0 group-hover:w-2 h-px bg-teal-400 transition-all duration-300"></span> Portafolio Clínico</a></li>
            <li><a href="#logistica" class="text-slate-400 text-sm hover:text-teal-400 transition-colors flex items-center gap-2 group"><span class="w-0 group-hover:w-2 h-px bg-teal-400 transition-all duration-300"></span> Logística</a></li>
          </ul>
        </div>

        <div class="lg:col-span-3">
          <h4 class="text-white font-bold mb-6 uppercase text-xs tracking-widest">Regulación</h4>
          <ul class="space-y-4 mb-6">
            <li><a href="#" class="text-slate-400 text-sm hover:text-teal-400 transition-colors">Aviso de Privacidad</a></li>
            <li><a href="#" class="text-slate-400 text-sm hover:text-teal-400 transition-colors">Términos y Condiciones</a></li>
            <li><a href="#" class="text-slate-400 text-sm hover:text-teal-400 transition-colors">Farmacovigilancia</a></li>
          </ul>
          
          <div class="p-4 rounded-2xl bg-linear-to-br from-teal-500/10 to-blue-500/5 border border-teal-500/20 relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-16 h-16 bg-teal-500/10 rounded-full blur-xl group-hover:bg-teal-500/20 transition-colors"></div>
            <div class="flex gap-3 relative z-10 items-start">
              <LucideShieldCheck class="text-teal-400 shrink-0 mt-0.5" :size="20" />
              <div>
                <div class="text-white font-bold text-sm leading-none mb-1">Certificación AGEMED</div>
                <div class="text-slate-400 text-xs leading-relaxed">Empresa certificada y regulada bajo la normativa vigente.</div>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-3">
          <h4 class="text-white font-bold mb-6 uppercase text-xs tracking-widest">Contacto Directo</h4>
          <ul class="space-y-5">
            <li class="flex items-start gap-4">
              <div class="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-500 shrink-0">
                <LucideMapPin :size="16" />
              </div>
              <span class="text-slate-400 text-sm pt-1.5 leading-relaxed">La Paz, Bolivia<br/><span class="text-slate-500 text-xs">Sede Operativa Central</span></span>
            </li>
            <li class="flex items-center gap-4">
              <div class="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-500 shrink-0">
                <LucidePhone :size="16" />
              </div>
              <span class="text-slate-300 font-mono text-sm tracking-wide">+591 7000-0000</span>
            </li>
            <li class="flex items-center gap-4">
              <div class="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-500 shrink-0">
                <LucideMail :size="16" />
              </div>
              <span class="text-slate-300 text-sm hover:text-teal-400 transition-colors cursor-pointer">atencion@biadoxidpharma.com</span>
            </li>
          </ul>
        </div>

      </div>

      <div class="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-slate-500 text-xs font-medium">
          © {{ currentYear }} Biadoxid Pharma S.R.L. Todos los derechos reservados.
        </p>
        <div class="flex items-center gap-2 text-slate-500 text-xs font-medium">
          Diseñado con <span class="text-teal-400 relative inline-block">
            precisión clínica
            <span class="absolute -right-2 top-0 w-1 h-1 bg-teal-400 rounded-full animate-ping"></span>
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>