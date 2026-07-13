<script setup>
// Metadatos para que la página sea profesional en Google
useHead({
  title: 'Contacto | Biadoxid Pharma S.R.L.',
  meta: [
    { name: 'description', content: 'Contacte con nuestro equipo especializado. Soporte médico, ventas hospitalarias y consultas generales en Biadoxid Pharma Bolivia.' }
  ]
})
</script>

<template>
  <main class="min-h-screen bg-slate-50 overflow-x-hidden">
    
    <header class="relative w-full pt-30 pb-38 flex items-center justify-center overflow-hidden bg-slate-950">
      <AbstractNetworkCanvas />
      
      <div class="absolute inset-0 bg-linear-to-b from-transparent via-slate-950/60 to-slate-50 pointer-events-none z-0"></div>
      
      <div class="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-sm">
          <LucideMail :size="14" class="text-teal-400" /> Canales de Comunicación
        </div>
        <h1 class="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
          Estamos aquí para <span class="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-blue-500">ayudarte.</span>
        </h1>
        <p class="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Nuestro equipo de especialistas está disponible para resolver tus dudas comerciales, consultas médicas o brindar soporte sobre nuestro portafolio.
        </p>
      </div>
    </header>

    <SeccionContactoForm />

    <SeccionContactoMapa />

  </main>
</template>