<script setup>
import { ref } from 'vue'

const { t } = useI18n()

const currentYear = ref(new Date().getFullYear())

const activeModalType = ref(null)

const openModal = (type) => {
  activeModalType.value = type
}
</script>

<template>
  <footer id="contacto" class="bg-biadoxid-600 relative overflow-hidden pt-20 pb-10">
    <AbstractNetworkCanvas variant="crimson" />

    <div class="absolute inset-0 bg-[#3d0001]/15 pointer-events-none" aria-hidden="true"></div>
    <span class="absolute top-0 inset-x-0 h-1 bg-white/40 z-[2]" aria-hidden="true"></span>

    <div class="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

        <div class="lg:col-span-4">
          <NuxtLink to="/" class="flex items-center gap-2.5 md:gap-3 cursor-pointer mb-6">
            <img src="/BIADOXID-PHARMA-LOGO-v2.webp" alt="Biadoxid Pharma S.R.L."
              class="w-9 h-9 md:w-10 md:h-10 rounded-xl object-contain shrink-0" loading="lazy">
            <div class="leading-none">
              <div class="flex items-center gap-1 sm:gap-1.5 md:gap-2">
                <span
                  class="text-[15px] sm:text-lg md:text-xl font-black tracking-tight text-white drop-shadow leading-none">BIADOXID</span>
                <span
                  class="bg-white text-biadoxid-700 text-[15px] sm:text-lg md:text-xl font-black px-1 sm:px-1.5 md:px-2 py-0.5 rounded-md tracking-wide leading-none">PHARMA</span>
                <span
                  class="text-[10px] sm:text-[11px] md:text-xs font-black tracking-tight text-white leading-none">S.R.L</span>
              </div>
              <span class="block italic text-[8px] md:text-[9px] tracking-wide text-white/85">innovation
                for better health</span>
            </div>
          </NuxtLink>
          <p class="text-white/90 text-sm leading-relaxed mb-6 font-light max-w-sm">
            {{ t('footer.description') }}
          </p>
          <div class="flex gap-4">

            <a href="https://www.facebook.com/biadoxidpharmasrl/" target="_blank" rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-white/10 border border-white/25 flex items-center justify-center text-white hover:text-blue-400 hover:border-blue-400/50 hover:bg-blue-500/20 transition-all group"
              title="Facebook">
              <svg class="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            <a href="https://www.instagram.com/biadoxidpharma/" target="_blank" rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-white/10 border border-white/25 flex items-center justify-center text-white hover:text-pink-400 hover:border-pink-400/50 hover:bg-pink-500/20 transition-all group"
              title="Instagram">
              <svg class="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>

            <a href="https://www.tiktok.com/@biadoxidpharma.srl" target="_blank" rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-white/10 border border-white/25 flex items-center justify-center text-white hover:bg-white hover:text-biadoxid-700 hover:border-white transition-all group"
              title="TikTok">
              <svg class="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path
                  d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>

            <a href="https://wa.me/59176265905?text=Hola%20Biadoxid%20Pharma,%20me%20gustaría%20obtener%20más%20información."
              target="_blank" rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-white/10 border border-white/25 flex items-center justify-center text-white hover:text-green-400 hover:border-green-400/50 hover:bg-green-500/20 transition-all group"
              title="WhatsApp">
              <svg class="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
            </a>

          </div>
        </div>

        <div class="lg:col-span-2">
          <h2 class="text-white font-bold mb-6 uppercase text-xs tracking-widest">{{ t('footer.company') }}</h2>
          <ul class="space-y-4">
            <li><NuxtLink to="/"
                class="text-white text-sm hover:text-white transition-colors flex items-center gap-2 group"><span
                  class="w-0 group-hover:w-2 h-px bg-white transition-all duration-300"></span> {{ t('header.navHome') }}</NuxtLink></li>
            <li><NuxtLink to="/nosotros"
                class="text-white text-sm hover:text-white transition-colors flex items-center gap-2 group"><span
                  class="w-0 group-hover:w-2 h-px bg-white transition-all duration-300"></span> {{ t('header.navIdentidad') }}</NuxtLink></li>
            <li><NuxtLink to="/productos"
                class="text-white text-sm hover:text-white transition-colors flex items-center gap-2 group"><span
                  class="w-0 group-hover:w-2 h-px bg-white transition-all duration-300"></span> {{ t('header.navPortafolio') }}</NuxtLink></li>
            <li><NuxtLink to="/#logistica"
                class="text-white text-sm hover:text-white transition-colors flex items-center gap-2 group"><span
                  class="w-0 group-hover:w-2 h-px bg-white transition-all duration-300"></span> {{ t('header.navLogisticaMobile') }}</NuxtLink></li>
          </ul>
        </div>

        <div class="lg:col-span-3">
          <h2 class="text-white font-bold mb-6 uppercase text-xs tracking-widest">{{ t('footer.regulation') }}</h2>
          <ul class="space-y-4 mb-6">
            <li>
              <button @click="openModal('privacidad')"
                class="text-white/75 text-sm hover:text-white transition-colors w-full text-left flex items-center gap-2 group"><span
                  class="w-0 group-hover:w-2 h-px bg-white transition-all duration-300"></span>{{ t('footer.privacidad') }}</button>
            </li>
            <li>
              <button @click="openModal('terminos')"
                class="text-white/75 text-sm hover:text-white transition-colors w-full text-left flex items-center gap-2 group"><span
                  class="w-0 group-hover:w-2 h-px bg-white transition-all duration-300"></span>{{ t('footer.terminos') }}</button>
            </li>
            <li><NuxtLink to="/contacto"
                class="text-white/75 text-sm hover:text-white transition-colors w-full text-left flex items-center gap-2 group"><span
                  class="w-0 group-hover:w-2 h-px bg-white transition-all duration-300"></span>{{ t('footer.farmacovigilancia') }}</NuxtLink>
            </li>
          </ul>

          <div
            class="p-4 rounded-2xl bg-white/10 border border-white/25 relative overflow-hidden group">
            <div class="flex gap-3 relative z-10 items-start">
              <LucideShieldCheck class="text-white shrink-0 mt-0.5" :size="20" />
              <div>
                <div class="text-white font-bold text-sm leading-none mb-1">{{ t('footer.certTitle') }}</div>
                <div class="text-white/90 text-xs leading-relaxed">{{ t('footer.certText') }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-3">
          <h2 class="text-white font-bold mb-6 uppercase text-xs tracking-widest">{{ t('footer.contactDirect') }}</h2>
          <ul class="space-y-5">

            <li>
              <NuxtLink to="/contacto#mapa" class="flex items-start gap-4 group cursor-pointer">
                <div
                  class="w-8 h-8 rounded-lg bg-white/10 border border-white/25 flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-biadoxid-700 group-hover:border-white transition-colors duration-300">
                  <LucideMapPin :size="16" />
                </div>
                <span class="text-white/90 text-sm pt-1.5 leading-relaxed group-hover:text-white transition-colors">
                  La Paz, Bolivia<br />
                  <span class="text-white/90 text-xs group-hover:text-white transition-colors">{{ t('footer.sede') }}</span>
                </span>
              </NuxtLink>
            </li>

            <li>
              <a href="tel:+59176265905" class="flex items-center gap-4 group cursor-pointer">
                <div
                  class="w-8 h-8 rounded-lg bg-white/10 border border-white/25 flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-biadoxid-700 group-hover:border-white transition-colors duration-300">
                  <LucidePhone :size="16" />
                </div>
                <span
                  class="text-white font-mono text-sm tracking-wide group-hover:text-white transition-colors">
                  +591 76265905
                </span>
              </a>
            </li>

            <li>
              <a href="mailto:biadoxidpharma@outlook.com" class="flex items-center gap-4 group cursor-pointer">
                <div
                  class="w-8 h-8 rounded-lg bg-white/10 border border-white/25 flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-biadoxid-700 group-hover:border-white transition-colors duration-300">
                  <LucideMail :size="16" />
                </div>
                <span class="text-white/90 text-sm group-hover:text-white transition-colors">
                  biadoxidpharma@outlook.com
                </span>
              </a>
            </li>

          </ul>
        </div>
      </div>

      <div class="pt-8 border-t border-white/15 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-white/80 text-xs font-medium">
          © {{ currentYear }} Biadoxid Pharma S.R.L. {{ t('footer.copyright') }}
        </p>
        <div class="flex items-center gap-2 text-white/80 text-xs font-medium">
          {{ t('footer.designed') }} <span class="text-white relative inline-block">
            {{ t('footer.precision') }}
            <span class="absolute -right-2 top-0 w-1 h-1 bg-white rounded-full animate-ping"></span>
          </span>
        </div>
      </div>
    </div>

    <LegalModal :show="activeModalType !== null" :type="activeModalType" @close="activeModalType = null" />
  </footer>
</template>
