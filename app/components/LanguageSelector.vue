<script setup>
const { locale, setLocale } = useI18n()

const switchLocale = (l) => {
  setLocale(l)
}
</script>

<template>
  <!-- Pill blanco de marca: fondo blanco, idioma activo en rojo biadoxid.
       Compacto en móvil para no robarle espacio al logo y la hamburguesa del nav. -->
  <div
    class="flex items-center rounded-full bg-white/95 border border-white/50 p-0.5 shadow-sm shrink-0"
    role="group"
    aria-label="Language selector"
  >
    <button
      type="button"
      :class="[
        'px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer',
        locale === 'es'
          ? 'bg-biadoxid-600 text-white shadow-sm shadow-biadoxid-600/30'
          : 'text-slate-500 hover:text-biadoxid-600'
      ]"
      :aria-pressed="locale === 'es'"
      @click="switchLocale('es')"
    >
      ES
    </button>
    <button
      type="button"
      :class="[
        'px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer',
        locale === 'en'
          ? 'bg-biadoxid-600 text-white shadow-sm shadow-biadoxid-600/30'
          : 'text-slate-500 hover:text-biadoxid-600'
      ]"
      :aria-pressed="locale === 'en'"
      @click="switchLocale('en')"
    >
      EN
    </button>
  </div>
</template>
