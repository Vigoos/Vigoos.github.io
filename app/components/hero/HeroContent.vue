<script setup>
const { t } = useI18n()
const slides = computed(() => t('hero.slides'))
</script>

<template>
  <div class="pointer-events-auto flex flex-col justify-center h-full">
    <!-- Badge superior: pill de cristal sutil alineada a la izquierda -->
    <div
      class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/25 text-white text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md animate-fade-up self-start shrink-0"
      style="animation-delay: 50ms">
      <span class="w-2 h-2 rounded-full bg-teal-500 animate-pulse shadow-[0_0_8px_rgba(244,0,1,0.8)]"></span>
      {{ t('hero.badge') }}
    </div>

    <!-- Componente de texto rotativo con títulos, subtítulos, CTAs y puntos de paginación integrados -->
    <HeroRotatingText :slides="slides" />
  </div>
</template>