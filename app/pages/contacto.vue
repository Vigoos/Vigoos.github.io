<script setup>
const { t } = useI18n()

useHead({
  title: computed(() => t('seo.contactoTitle')),
  meta: [
    { name: 'description', content: computed(() => t('seo.contactoDescription')) }
  ]
})
</script>

<template>
  <main class="min-h-screen bg-white overflow-x-hidden">
    
    <header class="relative w-full pt-30 pb-38 flex items-center justify-center overflow-hidden bg-white">
      <div class="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-6 bg-linear-to-br from-teal-500 via-teal-700 to-[#7F0000] shadow-lg shadow-biadoxid-900/30">
          <span class="w-2 h-2 rounded-full bg-white animate-pulse shrink-0"></span>
          {{ t('contactoPage.badge') }}
        </div>
        <h1 class="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
          {{ t('contactoPage.titlePre') }} <span class="text-transparent bg-clip-text bg-linear-to-r from-teal-500 to-teal-700">{{ t('contactoPage.titleHighlight') }}</span>
        </h1>
        <p class="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {{ t('contactoPage.text') }}
        </p>
      </div>
    </header>

    <SeccionContactoForm />

    <SeccionContactoMapa />

  </main>
</template>