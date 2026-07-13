<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)

// Función para detectar si el usuario ha hecho scroll hacia abajo
const handleScroll = () => {
  // Si bajó más de 20px, activamos el estado "scrolled"
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Ejecutar una vez al cargar por si la página ya estaba a la mitad
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header>
    <div
      class="hidden md:flex justify-between items-center px-8 py-2 bg-slate-950 text-slate-400 text-xs font-medium tracking-wide border-b border-white/5">
      <div class="flex gap-6">
        <a href="mailto:biadoxidpharma@outlook.com" class="flex items-center gap-1 hover:text-teal-400 transition-colors cursor-pointer">
          <LucideMail :size="12" /> biadoxidpharma@outlook.com
        </a>
        <a href="tel:+59176265905" class="flex items-center gap-1 hover:text-teal-400 transition-colors cursor-pointer">
          <LucidePhone :size="12" /> +591 76265905
        </a>
      </div>
      <div>
        <span class="text-teal-500/80">La Paz, Bolivia | Registro AGEMED Vigente</span>
      </div>
    </div>

    <nav 
      :class="[
        'w-full z-50 px-4 md:px-8 pointer-events-none transition-all duration-500',
        isScrolled ? 'fixed top-2 md:top-4' : 'absolute top-4 md:top-8'
      ]"
    >
      <div
        :class="[
          'max-w-7xl mx-auto backdrop-blur-xl border border-white/10 flex justify-between items-center px-4 md:px-6 py-3 shadow-2xl pointer-events-auto transition-colors duration-500',
          isScrolled ? 'bg-slate-950/95 rounded-2xl md:rounded-full' : 'bg-slate-900/50 rounded-2xl'
        ]"
      >

        <NuxtLink to="/" class="flex items-center gap-3 cursor-pointer">
          <img src="/BIADOXID-PHARMA-LOGO.webp" alt="Biadoxid Pharma S.R.L."
            class="w-9 h-9 md:w-10 md:h-10 rounded-xl object-contain">
          <div>
            <h1 class="text-lg md:text-xl font-black tracking-tight text-white leading-none">BIADOXID</h1>
            <span class="text-[9px] md:text-[10px] uppercase tracking-widest text-teal-400 font-bold">Pharma S.R.L.</span>
          </div>
        </NuxtLink>

        <div class="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-300">
          <NuxtLink to="/" class="hover:text-teal-400 transition-colors pb-1" active-class="text-white border-b-2 border-teal-500">
            Inicio
          </NuxtLink>
          <NuxtLink to="/nosotros" class="hover:text-teal-400 transition-colors pb-1" active-class="text-white border-b-2 border-teal-500">
            Identidad
          </NuxtLink>
          <a href="/#productos" class="hover:text-teal-400 transition-colors pb-1">Portafolio Clínico</a>
          <a href="/#logistica" class="hover:text-teal-400 transition-colors pb-1">Logística Integral</a>
        </div>

        <div class="hidden lg:block">
          <NuxtLink
            to="/contacto"
            class="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg flex items-center gap-2 group">
            Contáctanos
            <LucideChevronRight :size="16" class="group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </div>

        <button
          class="lg:hidden text-white pointer-events-auto p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg"
          @click="isMobileMenuOpen = !isMobileMenuOpen" :aria-expanded="isMobileMenuOpen"
          aria-label="Abrir menú de navegación">
          <LucideX v-if="isMobileMenuOpen" :size="24" />
          <LucideMenu v-else :size="24" />
        </button>
      </div>

      <div v-if="isMobileMenuOpen"
        class="lg:hidden mt-2 w-full bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl py-5 px-6 flex flex-col gap-5 shadow-2xl pointer-events-auto transform origin-top transition-all">
        <NuxtLink to="/" class="text-slate-300 font-semibold text-lg hover:text-teal-400" @click="isMobileMenuOpen = false">Inicio</NuxtLink>
        <NuxtLink to="/nosotros" class="text-slate-300 font-semibold text-lg hover:text-teal-400" @click="isMobileMenuOpen = false">Identidad corporativa</NuxtLink>
        <a href="/#productos" class="text-slate-300 font-semibold text-lg hover:text-white" @click="isMobileMenuOpen = false">Portafolio Clínico</a>
        <a href="/#logistica" class="text-slate-300 font-semibold text-lg hover:text-white" @click="isMobileMenuOpen = false">Logística</a>
        
        <div class="pt-4 mt-2 border-t border-slate-800">
          <NuxtLink 
            to="/contacto" 
            class="w-full bg-linear-to-r from-teal-500 to-blue-600 text-white flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-teal-500/25" 
            @click="isMobileMenuOpen = false"
          >
            Contáctanos <LucideChevronRight :size="18" />
          </NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>