<template>
  <div class="absolute inset-x-0 bottom-0 z-5 pointer-events-none" aria-hidden="true">
    <!-- Glow de marca: respiración lenta y sutil detrás de la curva (no mueve bordes) -->
    <div
      class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[130%] h-32 bg-biadoxid-600/15 blur-3xl hero-glow-breathe">
    </div>

    <!-- Ola suave: domo blanco discreto que funde el video con la sección blanca siguiente.
         Línea fina roja de acento siguiendo la cresta (40% opacidad, removible si no gusta). -->
    <svg class="relative w-full h-12 md:h-20 lg:h-28" viewBox="0 0 1440 120" preserveAspectRatio="none"
      aria-hidden="true">
      <path d="M0,120 C320,112 460,88 720,85 C980,82 1120,100 1440,120 Z" fill="#ffffff" />
      <path d="M0,120 C320,112 460,88 720,85 C980,82 1120,100 1440,120" fill="none" stroke="#F50000" stroke-width="2"
        opacity="0.35" />
    </svg>
  </div>
</template>

<style scoped>
/* Respiración lenta del glow: solo cambia opacidad, nunca la posición (sin bordes que se muevan) */
.hero-glow-breathe {
  animation: hero-glow-breathe 7s ease-in-out infinite;
}

@keyframes hero-glow-breathe {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
}

/* Accesibilidad: respetar la preferencia de movimiento reducido */
@media (prefers-reduced-motion: reduce) {
  .hero-glow-breathe {
    animation: none;
  }
}
</style>
