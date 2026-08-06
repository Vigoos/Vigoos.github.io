<template>
  <main class="overflow-x-hidden">
    <SeccionNosotrosTimeline />

    <SeccionNosotrosPilares />

    <!-- Misión / Visión / Valores (movido desde el home) -->
    <SeccionNosotrosMisionVision />

    <SeccionPartnersDetailed />
  </main>
</template>

<script setup>
useScrollReveal()
const { t } = useI18n()

// Definimos los metadatos para SEO de esta página
useHead({
  title: computed(() => t('seo.identidadTitle')),
  meta: [
    { name: 'description', content: computed(() => t('seo.identidadDescription')) }
  ]
})
</script>
