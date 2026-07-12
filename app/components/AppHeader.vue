<script setup>
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)
</script>

<template>
  <header>
    <div
      class="hidden md:flex justify-between items-center px-8 py-2 bg-slate-950 text-slate-400 text-xs font-medium tracking-wide border-b border-white/5">
      <div class="flex gap-6">
        <span class="flex items-center gap-1 hover:text-teal-400 transition-colors cursor-pointer">
          <LucideMail :size="12" /> atencion@biadoxidpharma.com
        </span>
        <span class="flex items-center gap-1">
          <LucidePhone :size="12" /> +591 7000-0000
        </span>
      </div>
      <div>
        <span class="text-teal-500/80">La Paz, Bolivia | Registro AGEMED Vigente</span>
      </div>
    </div>

    <nav class="absolute top-8 left-0 w-full z-50 px-6 md:px-8 pointer-events-none">
      <div
        class="max-w-7xl mx-auto bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl flex justify-between items-center px-6 py-4 shadow-2xl pointer-events-auto">

        <NuxtLink to="/" class="flex items-center gap-3 cursor-pointer">
          <img src="/BIADOXID-PHARMA-LOGO.webp" alt="Biadoxid Pharma S.R.L."
            class="w-10 h-10 rounded-xl object-contain">
          <div>
            <h1 class="text-xl font-black tracking-tight text-white leading-none">BIADOXID</h1>
            <span class="text-[10px] uppercase tracking-widest text-teal-400 font-bold">Pharma S.R.L.</span>
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
        class="lg:hidden mt-2 w-full bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl py-4 px-6 flex flex-col gap-4 shadow-2xl pointer-events-auto transform origin-top transition-all">
        <NuxtLink to="/" class="text-slate-300 font-semibold text-lg hover:text-teal-400" @click="isMobileMenuOpen = false">Inicio</NuxtLink>
        <NuxtLink to="/nosotros" class="text-slate-300 font-semibold text-lg hover:text-teal-400" @click="isMobileMenuOpen = false">Identidad corporativa</NuxtLink>
        <a href="/#productos" class="text-slate-300 font-semibold text-lg hover:text-white" @click="isMobileMenuOpen = false">Portafolio Clínico</a>
        <a href="/#logistica" class="text-slate-300 font-semibold text-lg hover:text-white" @click="isMobileMenuOpen = false">Logística</a>
      </div>
    </nav>
  </header>
</template>