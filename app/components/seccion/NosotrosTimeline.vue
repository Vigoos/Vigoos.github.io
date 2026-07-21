<script setup>
// Llamamos a nuestro composable de animaciones
useScrollReveal()
</script>

<template>
  <div class="nosotros-wrapper">
    <!-- --- HERO DE LA PÁGINA "NOSOTROS" --- -->
    <header class="relative w-full pt-48 pb-32 flex items-center justify-center overflow-hidden bg-slate-950">
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-0 right-0 w-200 h-200 border border-teal-500/30 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div class="absolute bottom-0 left-0 w-150 h-150 border border-blue-500/20 rounded-full translate-y-1/3 -translate-x-1/4"></div>
      </div>
      
      <div class="max-w-4xl mx-auto px-6 relative z-10 text-center reveal-on-scroll opacity-0 translate-y-10">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-[0.2em] mb-6">
          <LucideActivity :size="14" class="text-teal-400" /> Nuestro Legado
        </div>
        <h1 class="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
          Más de <span class="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-blue-500">15 años</span> transformando la salud.
        </h1>
        <p class="text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
          Nacimos en La Paz con una convicción clara: Bolivia merecía una red sólida, transparente y de clase mundial para la importación farmacéutica.
        </p>
      </div>
    </header>

    <!-- --- TIMELINE CON IMÁGENES (DISEÑO EQUILIBRADO) --- -->
    <section class="py-32 bg-slate-950 relative overflow-hidden">
      <!-- Línea central vertical -->
      <div class="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 -ml-1px timeline-line opacity-50"></div>

      <div class="max-w-6xl mx-auto px-6 md:px-8 relative">
        
        <!-- HITO 1: Origen -->
        <div class="flex flex-col md:flex-row items-center justify-between mb-32 relative">
          <!-- Imagen a la izquierda -->
          <div class="w-full md:w-5/12 hidden md:block reveal-on-scroll opacity-0 translate-y-10 pr-12">
            <div class="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl group" style="aspect-ratio: 4/3; content-visibility: auto; contain-intrinsic-size: 400px 300px;">
              <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>
              <div class="absolute inset-0 bg-linear-to-tr from-slate-950/80 to-transparent"></div>
            </div>
          </div>
          
          <!-- Nodo Central Animado -->
          <div class="absolute left-0 md:left-1/2 w-4 h-4 rounded-full border-4 -ml-2 timeline-dot reveal-on-scroll opacity-0 scale-50 bg-slate-800 border-slate-700 z-10 transition-all duration-700"></div>
          
          <!-- Texto a la derecha -->
          <div class="w-full md:w-5/12 pl-8 md:pl-12 reveal-on-scroll opacity-0 translate-y-10">
            <span class="text-teal-500 font-mono text-sm mb-3 block tracking-widest uppercase">El Origen</span>
            <h3 class="text-3xl font-bold text-white mb-5">Visión Fundacional</h3>
            <p class="text-slate-400 leading-relaxed text-lg">
              Impulsados por nuestro fundador, <strong class="text-white">Elvis Boyan</strong>, iniciamos operaciones en La Paz identificando la necesidad crítica de abastecimiento continuo y ético de medicamentos en instituciones públicas y privadas del país.
            </p>
          </div>
        </div>

        <!-- HITO 2: Expansión -->
        <div class="flex flex-col md:flex-row-reverse items-center justify-between mb-32 relative">
          <!-- Imagen a la derecha -->
          <div class="w-full md:w-5/12 hidden md:block reveal-on-scroll opacity-0 translate-y-10 pl-12">
            <div class="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl group" style="aspect-ratio: 4/3; content-visibility: auto; contain-intrinsic-size: 400px 300px;">
              <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>
              <div class="absolute inset-0 bg-linear-to-tl from-blue-900/40 to-transparent mix-blend-color"></div>
            </div>
          </div>
          
          <!-- Nodo Central Animado -->
          <div class="absolute left-0 md:left-1/2 w-4 h-4 rounded-full border-4 -ml-2 timeline-dot reveal-on-scroll opacity-0 scale-50 bg-slate-800 border-slate-700 z-10 transition-all duration-700"></div>
          
          <!-- Texto a la izquierda -->
          <div class="w-full md:w-5/12 pl-8 md:pl-0 md:pr-12 md:text-right reveal-on-scroll opacity-0 translate-y-10">
            <span class="text-blue-500 font-mono text-sm mb-3 block tracking-widest uppercase">Crecimiento</span>
            <h3 class="text-3xl font-bold text-white mb-5">Expansión Estratégica</h3>
            <p class="text-slate-400 leading-relaxed text-lg">
              Basados en la transparencia, forjamos alianzas internacionales sólidas en <strong class="text-white">España, Corea del Sur, Inglaterra y Bangladesh</strong>. Esto nos permitió ampliar nuestro portafolio garantizando estabilidad en el mercado boliviano.
            </p>
          </div>
        </div>

        <!-- HITO 3: Actualidad -->
        <div class="flex flex-col md:flex-row items-center justify-between relative">
          <!-- Imagen a la izquierda -->
          <div class="w-full md:w-5/12 hidden md:block reveal-on-scroll opacity-0 translate-y-10 pr-12">
            <div class="relative rounded-3xl overflow-hidden border border-teal-900/50 shadow-[0_0_40px_rgba(20,184,166,0.1)] group" style="aspect-ratio: 4/3; content-visibility: auto; contain-intrinsic-size: 400px 300px;">
              <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-70 group-hover:opacity-90 transition-opacity duration-700"></div>
              <div class="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent"></div>
            </div>
          </div>
          
          <!-- Nodo Central Animado -->
          <div class="absolute left-0 md:left-1/2 w-4 h-4 rounded-full border-4 -ml-2 timeline-dot reveal-on-scroll opacity-0 scale-50 bg-slate-800 border-slate-700 z-10 transition-all duration-700"></div>
          
          <!-- Texto a la derecha en caja resaltada -->
          <div class="w-full md:w-5/12 pl-8 md:pl-12 reveal-on-scroll opacity-0 translate-y-10">
            <div class="bg-linear-to-br from-teal-900/40 to-slate-900 border border-teal-500/30 p-8 rounded-3xl relative overflow-hidden group">
              <div class="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-all"></div>
              <span class="text-teal-400 font-mono text-sm mb-2 block relative z-10">PRESENTE Y FUTURO</span>
              <h3 class="text-2xl font-bold text-white mb-4 relative z-10">Excelencia Sostenida</h3>
              <p class="text-slate-300 leading-relaxed relative z-10">
                Hoy operamos bajo estrictos estándares de calidad (AGEMED), ética y cumplimiento normativo. No solo importamos fármacos; importamos innovación y esperanza para el sector médico.
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
  background: linear-gradient(to bottom, transparent, #0f172a 10%, #14b8a6 50%, #0f172a 90%, transparent);
}
</style>