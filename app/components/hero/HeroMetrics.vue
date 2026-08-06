<script setup>
const { t } = useI18n()
</script>

<template>
  <!-- Métricas animadas del Hero -->
  <div class="hero-metrics-shadow animate-fade-up flex flex-wrap lg:flex-nowrap items-center gap-4 md:gap-8 select-none"
    style="animation-delay: 450ms">
    <AnimatedMetric :value="25" suffix="+" :label="t('hero.metricYears')" minimal autoplay :start-delay="800" />
    <span class="hidden sm:block w-px h-10 md:h-12 bg-white/20 shrink-0" aria-hidden="true"></span>
    <AnimatedMetric :value="5" suffix="+" :label="t('hero.metricLabs')" minimal autoplay :start-delay="950" />
    <span class="hidden sm:block w-px h-10 md:h-12 bg-white/20 shrink-0" aria-hidden="true"></span>
    <AnimatedMetric :value="100" suffix="+" :label="t('hero.metricProducts')" minimal autoplay :start-delay="1100" />
  </div>
</template>

<style scoped>
.hero-metrics-shadow {
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6), 0 2px 12px rgba(0, 0, 0, 0.5);
}
</style>
