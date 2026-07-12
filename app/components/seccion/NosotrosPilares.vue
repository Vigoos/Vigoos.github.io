<script setup>
// Reutilizamos el composable de animaciones
useScrollReveal()
</script>

<template>
  <section class="py-24 bg-white relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-6 md:px-8">
      
      <div class="text-center mb-20 reveal-on-scroll opacity-0 translate-y-10">
        <h2 class="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Nuestros Pilares Clínicos</h2>
        <p class="text-slate-500 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Soluciones de alta precisión y eficacia que marcan la diferencia en la atención médica avanzada en Bolivia.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        
        <div class="rounded-[2.5rem] bg-slate-50 border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group reveal-on-scroll opacity-0 translate-y-10">
          <div class="h-52 relative overflow-hidden">
            <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700"></div>
            <div class="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
            <div class="absolute bottom-6 left-8 text-orange-400">
              <LucideTarget :size="32" stroke-width="2" />
            </div>
          </div>
          
          <div class="p-10 pt-8">
            <h3 class="text-2xl font-bold text-slate-900 mb-4">Vitaminas y Suplementos</h3>
            <p class="text-slate-600 leading-relaxed font-light text-sm">
              Formulados para <strong class="text-slate-900 font-semibold">apoyar la salud integral</strong>, fortaleciendo el sistema inmunológico y promoviendo el bienestar del paciente.
            </p>
          </div>
        </div>

        <div class="rounded-[2.5rem] bg-slate-50 border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group reveal-on-scroll opacity-0 translate-y-10" style="transition-delay: 100ms;">
          <div class="h-52 relative overflow-hidden">
            <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700"></div>
            <div class="absolute inset-0 bg-linear-to-t from-emerald-900/90 via-emerald-900/20 to-transparent"></div>
            <div class="absolute bottom-6 left-8 text-emerald-400">
              <LucideBeaker :size="32" stroke-width="2" />
            </div>
          </div>
          
          <div class="p-10 pt-8">
            <h3 class="text-2xl font-bold text-slate-900 mb-4">Dermatología Clínica</h3>
            <p class="text-slate-600 leading-relaxed font-light text-sm">
              Productos que combinan la potencia de la <strong class="text-slate-900 font-semibold">Árnica y Caléndula</strong>. Ideales para la regeneración y cuidado experto de la piel.
            </p>
          </div>
        </div>

        <div class="rounded-[2.5rem] bg-slate-900 border border-slate-800 overflow-hidden hover:shadow-[0_20px_50px_rgba(14,165,233,0.2)] hover:-translate-y-2 transition-all duration-500 group reveal-on-scroll opacity-0 translate-y-10" style="transition-delay: 200ms;">
          <div class="h-52 relative overflow-hidden">
            <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579154204601-52ee82ce0273?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-700"></div>
            <div class="absolute inset-0 bg-linear-to-t from-slate-950 via-blue-900/40 to-transparent"></div>
            <div class="absolute bottom-6 left-8 text-blue-400">
              <LucideActivity :size="32" stroke-width="2" />
            </div>
          </div>
          
          <div class="p-10 pt-8">
            <h3 class="text-2xl font-bold text-white mb-4">Línea Biotecnológica</h3>
            <p class="text-slate-300 leading-relaxed font-light text-sm">
              Alta precisión hospitalaria. Fármacos como la <strong class="text-teal-400 font-semibold">Tenecteplasa</strong> brindan tratamientos especializados para apoyo cardiovascular crítico.
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