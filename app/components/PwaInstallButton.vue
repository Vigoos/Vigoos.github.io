<script setup>
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
    class="relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300
           bg-teal-500/10 border border-teal-500/30 text-teal-400
           hover:bg-teal-500 hover:text-white hover:shadow-lg hover:shadow-teal-500/25
           active:scale-95 group"
    title="Instalar aplicación"
    aria-label="Instalar Biadoxid Pharma como aplicación"
  >
    <LucideDownload :size="14" class="group-hover:animate-bounce" />
    <span class="hidden md:inline">App</span>

    <!-- Tooltip -->
    <span
      class="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-3 py-1.5 rounded-lg
             opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap
             shadow-xl border border-white/10 pointer-events-none"
    >
      Instalar aplicación
      <span class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-r border-b border-white/10"></span>
    </span>
  </button>
</template>
