<template>
  <section class="relative w-full h-125 mt-20 bg-slate-200 overflow-hidden">
    <div class="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_0_100px_rgba(248,250,252,1)]"></div>
    
    <iframe 
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1912.87186105085!2d-68.12502690000001!3d-16.4984163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f20616b47c6d5%3A0xc3c544e3cb396956!2sEstadio%20Hernando%20Siles!5e0!3m2!1ses!2sbo!4v1715000000000!5m2!1ses!2sbo" 
      class="w-full h-full border-0 filter grayscale contrast-[1.1] opacity-80 transition-all duration-700 hover:grayscale-0 hover:opacity-100" 
      allowfullscreen="true"
      loading="lazy" 
      referrerpolicy="no-referrer-when-downgrade"
      title="Ubicación Biadoxid Pharma"
    ></iframe>
    
    <div class="absolute top-10 left-6 md:left-auto md:right-10 z-20 bg-white/90 backdrop-blur-md border border-slate-200 p-5 rounded-2xl shadow-2xl flex items-center gap-5">
      <div class="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 shadow-sm border border-teal-100">
        <LucideMapPin :size="24" class="animate-bounce" />
      </div>
      <div>
        <h4 class="text-slate-900 font-black text-sm uppercase tracking-tight">Sede Miraflores</h4>
        <p class="text-slate-500 text-xs font-medium">La Paz, Bolivia</p>
      </div>
    </div>
  </section>
</template>