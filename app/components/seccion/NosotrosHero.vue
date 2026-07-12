<script setup>
// Usamos el composable que definimos antes para las animaciones
useScrollReveal()
</script>

<template>
  <header class="relative w-full pt-48 pb-32 flex items-center justify-center overflow-hidden bg-slate-950">
    <div class="absolute inset-0 opacity-20 pointer-events-none">
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
        Bolivia merecía una red sólida, transparente y de clase mundial para la importación farmacéutica. Estamos aquí para cumplir esa promesa.
      </p>
    </div>
  </header>
</template>

<style scoped>
.reveal-on-scroll {
  transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
}
</style>