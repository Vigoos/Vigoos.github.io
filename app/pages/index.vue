<script setup>
import { computed, ref } from 'vue'

const { notification, showNotification } = useNotification()
const { t } = useI18n()

useScrollReveal()

useHead({
  title: computed(() => t('seo.homeTitle')),
  meta: [
    { name: 'description', content: computed(() => t('seo.homeDescription')) }
  ]
})


import catalogoBruto from '../data/catalogo.json'
import { useCatalog } from '../composables/useCatalog'
import { Snowflake, Activity, ShieldCheck } from 'lucide-vue-next'

const { catName, localizeProduct } = useCatalog()

// Primeros 6 productos del catálogo (localizados al idioma activo)
const productosDestacados = computed(() => {
  return catalogoBruto.slice(0, 6).map(localizeProduct)
})

const colorThemes = [
  {
    gradientFrom: 'from-teal-500/10',
    gradientTo: 'to-slate-100/50',
    badgeText: 'text-teal-600'
  },
  {
    gradientFrom: 'from-teal-600/10',
    gradientTo: 'to-slate-100/50',
    badgeText: 'text-teal-700'
  },
  {
    gradientFrom: 'from-teal-400/10', // Variación rojiza para productos dermatológicos (ARN)
    gradientTo: 'to-slate-100/50',
    badgeText: 'text-teal-500'
  }
]
const isProductModalOpen = ref(false)
const selectedProduct = ref(null)

const openProductModal = (producto) => {
  selectedProduct.value = producto
  isProductModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeProductModal = () => {
  isProductModalOpen.value = false
  document.body.style.overflow = ''
}

const getInitials = (name) => {
  if (!name) return 'PR'
  return name.substring(0, 3).toUpperCase()
}

const handleFichaClick = () => {
  showNotification(t('portafolio.fichaToast'))
}

const logisticaItems = [
  { icon: Snowflake, num: '01', titleKey: 'logistica.item1Title', textKey: 'logistica.item1Text' },
  { icon: Activity, num: '02', titleKey: 'logistica.item2Title', textKey: 'logistica.item2Text' },
  { icon: ShieldCheck, num: '03', titleKey: 'logistica.item3Title', textKey: 'logistica.item3Text' }
]
</script>

<template>
  <div>
    <HeroVideo />

    <SeccionMapaBolivia />

    <section id="productos" class="py-32 bg-white relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-6 md:px-8 relative z-10">

        <div class="max-w-3xl mx-auto text-center mb-16 reveal-on-scroll opacity-0 translate-y-10">
          <div
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-6 bg-linear-to-br from-teal-500 via-teal-700 to-[#7F0000] shadow-lg shadow-biadoxid-900/30">
            <span class="w-2 h-2 rounded-full bg-white animate-pulse shrink-0"></span>
            {{ t('portafolio.badge') }}
          </div>
          <h3 class="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">{{ t('portafolio.titlePre') }} <span
              class="text-transparent bg-clip-text bg-linear-to-r from-teal-500 via-teal-600 to-teal-700">{{ t('portafolio.titleHighlight') }}</span></h3>
          <p class="text-slate-600 text-lg font-light leading-relaxed mb-8 max-w-2xl mx-auto">{{ t('portafolio.text') }}</p>

          <NuxtLink to="/productos"
            class="group inline-flex items-center gap-3 bg-white hover:bg-teal-50 border border-slate-200 hover:border-teal-500/40 px-6 py-3 rounded-xl text-slate-700 hover:text-teal-700 font-semibold transition-all shadow-sm">
            <span>{{ t('portafolio.cta') }}</span>
            <div
              class="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-600 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-colors">
              <LucideChevronRight :size="18" />
            </div>
          </NuxtLink>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 reveal-on-scroll opacity-0 translate-y-10" style="transition-delay: 100ms">

          <div v-for="(producto, index) in productosDestacados" :key="producto.id"
            class="relative h-150 rounded-4xl overflow-hidden group cursor-pointer border border-slate-200 hover:border-teal-300 transition-all duration-500 shadow-sm hover:shadow-xl bg-white">
            <div class="absolute inset-0 bg-white"></div>

            <div
              :class="['absolute inset-0 bg-linear-to-br opacity-40 group-hover:opacity-80 transition-opacity duration-700', colorThemes[index % 3].gradientFrom, colorThemes[index % 3].gradientTo]">
            </div>

            <div class="absolute top-0 inset-x-0 h-[65%] p-8 flex items-center justify-center">
              <img :src="producto.image" :alt="producto.name" loading="lazy"
                class="w-full h-full object-contain drop-shadow-md opacity-90 group-hover:opacity-100 transform group-hover:-translate-y-3 group-hover:scale-110 transition-all duration-700 ease-out mix-blend-multiply"
                style="aspect-ratio: 1 / 1;"
                @error="$event.target.src = '/BIADOXID-PHARMA-LOGO-v2.webp'; $event.target.style.padding = '20%'" />
            </div>

            <div
              class="absolute top-6 right-6 w-12 h-12 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-800 font-bold text-sm z-20 shadow-sm group-hover:border-teal-300 transition-colors">
              {{ getInitials(producto.name) }}
            </div>

            <div
              class="absolute bottom-2 left-2 right-2 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/40 p-5 transform transition-transform duration-500 z-30 flex flex-col justify-end shadow-sm">

              <span
                :class="['text-[10px] font-bold uppercase tracking-widest mb-1.5 block truncate', colorThemes[index % 3].badgeText]">                {{ producto.category || catName() }}
                </span>
                
                <h3 class="text-lg font-bold text-slate-900 mb-2 leading-tight truncate">
                {{ producto.name }}
              </h3>

              <div class="h-10 overflow-hidden relative mb-4">
                <p class="text-slate-500 text-xs leading-relaxed">
                  {{ producto.shortDescription }}
                </p>
                <div class="absolute bottom-0 left-0 w-full h-6 bg-linear-to-t from-white to-transparent"></div>
              </div>

              <div class="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">

                <button @click.prevent="handleFichaClick"
                  class="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 hover:text-slate-700 transition-colors group/btn z-40 relative">
                  <LucideFileText :size="14" class="group-hover/btn:text-teal-500 transition-colors" />
                  <span>{{ t('portafolio.ficha') }}</span>
                </button>

                <button @click.prevent="openProductModal(producto)"
                  class="flex items-center gap-2 text-xs font-medium text-slate-700 hover:text-teal-600 transition-colors relative z-40">
                  <span>{{ t('portafolio.detalles') }}</span>
                  <div
                    class="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-teal-500 transition-colors border border-slate-200">
                    <LucideArrowRight :size="12"
                      class="-rotate-45 group-hover:rotate-0 transition-transform duration-300 text-slate-500 group-hover:text-white" />
                  </div>
                </button>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

    <section id="logistica" class="py-32 bg-white text-slate-900 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-6 md:px-8 relative z-10">

        <div class="max-w-3xl mx-auto text-center mb-20 reveal-on-scroll opacity-0 translate-y-10">
          <div
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-6 bg-linear-to-br from-teal-500 via-teal-700 to-[#7F0000] shadow-lg shadow-biadoxid-900/30">
            <span class="w-2 h-2 rounded-full bg-white animate-pulse shrink-0"></span>
            {{ t('logistica.badge') }}
          </div>
          <h3 class="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
            {{ t('logistica.titlePre') }} <span
              class="text-transparent bg-clip-text bg-linear-to-r from-teal-500 via-teal-600 to-teal-700">{{ t('logistica.titleHighlight') }}</span>
          </h3>
          <p class="text-slate-600 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            {{ t('logistica.text') }}
          </p>
          <div class="flex items-center justify-center gap-2">
            <span class="w-10 h-px bg-slate-200"></span>
            <span class="w-16 h-1 rounded-full bg-teal-500"></span>
            <span class="w-10 h-px bg-slate-200"></span>
          </div>
        </div>

        <div class="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          <div class="order-2 lg:order-1 relative reveal-on-scroll opacity-0 translate-y-10">
            <ImageZoom src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=800&q=70" :alt="t('logistica.imgAlt')">
              <div class="relative h-125 rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_-20px_rgba(15,23,42,0.3)] group border border-slate-200/70">
                <div
                  class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=800&q=70')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out">
                </div>
                <!-- Gradiente sutil inferior SOLO para legibilidad de la tarjeta (sin lavado blanco) -->
                <div class="absolute inset-0 bg-linear-to-t from-slate-950/45 via-transparent to-transparent" aria-hidden="true"></div>
                <div class="absolute inset-0 rounded-[2.5rem] ring-1 ring-inset ring-white/10 group-hover:ring-teal-500/50 transition-all duration-500 pointer-events-none" aria-hidden="true"></div>

                <div
                  class="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-58 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-xl overflow-hidden">
                  <span class="absolute top-0 inset-x-0 h-1 bg-teal-500" aria-hidden="true"></span>
                  <div class="flex items-center gap-3">
                    <div
                      class="w-11 h-11 shrink-0 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shadow-sm">
                      <LucideThermometer :size="22" />
                    </div>
                    <div>
                      <div class="text-teal-600 font-black text-[10px] uppercase tracking-widest">{{ t('logistica.tempBadge') }}</div>
                      <div class="text-lg font-bold text-slate-900 leading-none">{{ t('logistica.tempValue') }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </ImageZoom>
          </div>

          <div class="order-1 lg:order-2 reveal-on-scroll opacity-0 translate-y-10" style="transition-delay: 100ms">
            <div class="space-y-5">
              <div v-for="(item, index) in logisticaItems" :key="item.num"
                class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(180,0,0,0.35)] group-hover:border-transparent outline-none cursor-default focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-teal-600"
                tabindex="0"
                role="group"
                :aria-label="t(item.titleKey)">

                <!-- Fondo rojo degradado de marca (mismo de las píldoras, sin canvas) -->
                <div
                  class="absolute inset-0 bg-linear-to-br from-teal-500 via-teal-700 to-[#7F0000] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
                  aria-hidden="true"></div>

                <div class="relative z-10 flex items-start gap-5">
                  <div
                    class="shrink-0 w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 text-teal-600 flex items-center justify-center transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/25 group-hover:text-white group-hover:shadow-lg">
                    <component :is="item.icon" :size="26" :stroke-width="1.5" />
                  </div>
                  <div class="flex-1 min-w-0 pt-0.5">
                    <div class="flex items-center gap-3 mb-2">
                      <span
                        class="shrink-0 text-[11px] font-mono font-bold text-teal-500 bg-teal-50/80 border border-teal-100 px-2.5 py-0.5 rounded-full transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/25 group-hover:text-white">{{ item.num }}</span>
                      <h4 class="font-bold text-lg md:text-xl text-slate-900 transition-colors duration-500 group-hover:text-white">{{ t(item.titleKey) }}</h4>
                    </div>
                    <p class="text-slate-500 leading-relaxed transition-colors duration-500 group-hover:text-white/85">{{ t(item.textKey) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <Teleport to="body">
      <Transition name="toast-anim">
        <div v-if="notification.show" class="fixed top-6 left-1/2 -translate-x-1/2 z-200 bg-slate-800 border border-teal-500/30 text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-3 pointer-events-none">
          <LucideCheckCircle :size="18" class="text-teal-400 shrink-0" />
          <span class="text-xs font-medium whitespace-nowrap">{{ notification.message }}</span>
        </div>
      </Transition>
    </Teleport>

    <SeccionPartners />
    <ProductModal 
      :show="isProductModalOpen" 
      :product="selectedProduct" 
      @close="closeProductModal"
      @change-product="(nuevoProducto) => selectedProduct = nuevoProducto"
    />
  </div>
</template>