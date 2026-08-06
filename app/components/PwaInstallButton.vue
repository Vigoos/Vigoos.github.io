<script setup>
const { t } = useI18n()

// Variante oscura para el header sobre el hero vino (fondo blanco translúcido, texto blanco)
defineProps({
  dark: { type: Boolean, default: false }
})

const { $pwa } = useNuxtApp()

const handleInstall = async () => {
  if ($pwa?.showInstallPrompt) {
    try {
      await $pwa.install()
    } catch (err) {
      console.warn('Instalación cancelada por el usuario:', err)
    }
  }
}
</script>

<template>
  <button
    v-if="$pwa?.showInstallPrompt && !$pwa?.isPWAInstalled"
    @click="handleInstall"
    :class="dark
      ? 'relative flex items-center gap-2 px-2.5 xl:px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 bg-white/10 border border-white/20 text-white hover:bg-white hover:text-teal-600 hover:shadow-lg hover:shadow-white/20 active:scale-95 group shrink-0'
      : 'relative flex items-center gap-2 px-2.5 xl:px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 bg-teal-500/10 border border-teal-500/30 text-teal-600 hover:bg-teal-500 hover:text-white hover:shadow-lg hover:shadow-teal-500/25 active:scale-95 group shrink-0'"
    :title="t('pwa.installTitle')"
    :aria-label="t('pwa.installAria')"
  >
    <LucideDownload :size="14" class="group-hover:animate-bounce" />
    <span class="hidden xl:inline">App</span>

    <!-- Tooltip -->
    <span
      class="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-3 py-1.5 rounded-lg
             opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap
             shadow-xl border border-white/10 pointer-events-none"
    >
      {{ t('pwa.installTitle') }}
      <span class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-r border-b border-white/10"></span>
    </span>
  </button>
</template>
