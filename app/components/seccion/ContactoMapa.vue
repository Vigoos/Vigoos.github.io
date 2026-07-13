<template>
  <section id="mapa" class="relative w-full py-20 bg-slate-50">
    <div class="max-w-7xl mx-auto px-6 md:px-8">
      <div class="relative w-full h-96 md:h-125 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-200 group">
        <iframe 
          src="https://maps.google.com/maps?q=-16.5001073,-68.1260071&z=17&output=embed" 
          class="w-full h-full border-0 filter grayscale contrast-[1.1] opacity-80 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100" 
          allowfullscreen="true"
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade"
          title="Ubicación Biadoxid Pharma - Av. Simón Bolívar, Edificio Altar II"
        ></iframe>

        <div class="absolute top-6 left-6 md:left-auto md:right-6 z-20 bg-white/90 backdrop-blur-md border border-slate-200 p-5 rounded-2xl shadow-2xl flex items-center gap-5">
          <div class="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 shadow-sm border border-teal-100">
            <LucideMapPin :size="24" class="animate-bounce" />
          </div>
          <div>
            <h4 class="text-slate-900 font-black text-sm uppercase tracking-tight">Sede Miraflores</h4>
            <p class="text-slate-500 text-xs font-medium">La Paz, Bolivia</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>