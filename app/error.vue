<script setup>
defineProps({
  error: {
    type: Object,
    required: true
  }
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden">
    <!-- Fondo decorativo -->
    <div class="absolute inset-0 opacity-20 pointer-events-none">
      <div class="absolute top-0 right-0 w-200 h-200 border border-teal-500/30 rounded-full -translate-y-1/2 translate-x-1/3"></div>
      <div class="absolute bottom-0 left-0 w-150 h-150 border border-blue-500/20 rounded-full translate-y-1/3 -translate-x-1/4"></div>
    </div>

    <div class="max-w-2xl mx-auto px-6 text-center relative z-10">
      <!-- Badge de error -->
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-[0.2em] mb-8">
        <span class="w-2 h-2 rounded-full bg-rose-400 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.8)]"></span>
        Error {{ error.statusCode || 'desconocido' }}
      </div>

      <!-- Código de error grande -->
      <h1 class="text-8xl md:text-9xl font-black text-white leading-none mb-6 tracking-tight">
        {{ error.statusCode || 'Oops' }}
      </h1>

      <!-- Mensaje principal -->
      <h2 class="text-2xl md:text-4xl font-bold text-white mb-6 tracking-tight">
        <span v-if="error.statusCode === 404">Página no encontrada</span>
        <span v-else>Algo salió mal</span>
      </h2>

      <p class="text-slate-400 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-md mx-auto">
        <span v-if="error.statusCode === 404">
          La ruta que buscas no existe o ha sido movida. Navega al inicio para continuar.
        </span>
        <span v-else>
          Ha ocurrido un error inesperado. Nuestro equipo ha sido notificado.
        </span>
      </p>

      <!-- Botón de acción -->
      <button @click="handleError"
        class="inline-flex items-center gap-3 bg-linear-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white px-8 py-4 rounded-full text-base font-bold transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] cursor-pointer"
      >
        <LucideArrowLeft :size="18" />
        Volver al inicio
      </button>

      <p v-if="error.message && error.statusCode !== 404" class="mt-8 text-slate-600 text-xs font-mono max-w-lg mx-auto truncate">
        {{ error.message }}
      </p>
    </div>
  </div>
</template>
