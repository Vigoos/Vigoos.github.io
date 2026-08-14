<script setup>
import { ref, computed, watch } from 'vue'
import catalogo from '../data/catalogo.json'
import { useCatalog } from '../composables/useCatalog'

const { notification, showNotification } = useNotification()
const { t } = useI18n()
const { catName, localizeProduct, searchText } = useCatalog()

useHead({
  title: computed(() => `${t('productosPage.title')} | Biadoxid Pharma`),
  meta: [
    { name: 'description', content: computed(() => t('productosPage.metaDescription')) }
  ]
})

const searchQuery = ref('')
const activeCategory = ref('Todos')
const sortBy = ref('relevance')

const itemsPerPage = 9
const currentPage = ref(1)

const isProductModalOpen = ref(false)
const selectedProduct = ref(null)

const openProductModal = (producto) => {
  selectedProduct.value = producto
  isProductModalOpen.value = true
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden'
  }
}

const closeProductModal = () => {
  isProductModalOpen.value = false
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
}

const handleFichaClick = () => {
  showNotification(t('productosPage.fichaToast'))
}

const getInitials = (name) => {
  if (!name) return 'PR'
  return name.substring(0, 3).toUpperCase()
}

const colorThemes = [
  { gradientFrom: 'from-teal-500/10', gradientTo: 'to-slate-100/50', badgeText: 'text-teal-600' },
  { gradientFrom: 'from-teal-600/10', gradientTo: 'to-slate-100/50', badgeText: 'text-teal-700' },
  { gradientFrom: 'from-teal-400/10', gradientTo: 'to-slate-100/50', badgeText: 'text-teal-500' }
]

const categories = computed(() => {
  const counts = {}
  catalogo.forEach(p => {
    const cat = p.category || 'Especialidad'
    counts[cat] = (counts[cat] || 0) + 1
  })
  return Object.keys(counts).map(name => ({
    name,
    count: counts[name]
  })).sort((a, b) => b.count - a.count)
})

const filteredProducts = computed(() => {
  let filtered = catalogo.filter(p => {
    const cat = p.category || 'Especialidad'
    const matchCategory = activeCategory.value === 'Todos' || cat === activeCategory.value
    
    const searchLower = searchQuery.value.toLowerCase()
    const matchSearch = !searchLower || searchText(p).includes(searchLower)
    
    return matchCategory && matchSearch
  })

  if (sortBy.value === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy.value === 'recent') {
    filtered.sort((a, b) => b.id - a.id) // los IDs más altos son los más nuevos
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProducts.value.slice(start, end)
})

const displayProducts = computed(() => paginatedProducts.value.map(localizeProduct))

// Al filtrar/buscar/ordenar, volver a la página 1
watch([searchQuery, activeCategory, sortBy], () => {
  currentPage.value = 1
})

const resetFilters = () => {
  searchQuery.value = ''
  activeCategory.value = 'Todos'
  sortBy.value = 'relevance'
  currentPage.value = 1
}
</script>

<template>
  <div class="bg-white text-slate-800 font-sans antialiased min-h-screen selection:bg-teal-500/30 selection:text-teal-900">
    
    <div class="bg-white relative overflow-hidden pb-32">
      
      <div class="max-w-4xl mx-auto px-6 pt-30 pb-8 relative z-10 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-6 bg-linear-to-br from-teal-500 via-teal-700 to-[#7F0000] shadow-lg shadow-biadoxid-900/30">
          <span class="w-2 h-2 rounded-full bg-white animate-pulse shrink-0"></span>
          {{ t('productosPage.heroBadge') }}
        </div>
        <h1 class="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">{{ t('productosPage.titlePre') }} <span
            class="text-transparent bg-clip-text bg-linear-to-r from-teal-500 via-teal-600 to-teal-700">{{ t('productosPage.titleHighlight') }}</span></h1>
        <p class="text-slate-600 max-w-2xl text-lg md:text-xl mx-auto font-light leading-relaxed">
          {{ t('productosPage.text') }}
        </p>
      </div>
    </div>

    <main class="relative z-20 max-w-7xl mx-auto px-6 pb-24 -mt-20">
      <div class="flex flex-col lg:flex-row gap-8 w-full">
        
        <aside class="w-full lg:w-1/4 shrink-0 space-y-6">
          
          <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 relative group transition-all hover:shadow-md">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <LucideSearch class="w-5 h-5 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
            </div>
            <input 
              v-model="searchQuery"
              type="text" 
              :placeholder="t('productosPage.searchPlaceholder')" 
              class="w-full bg-slate-50 text-slate-900 rounded-xl pl-10 pr-10 py-3.5 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 focus:bg-white transition-all placeholder:text-slate-400"
            >
            <button v-if="searchQuery" @click="searchQuery = ''" class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-teal-600 transition-colors cursor-pointer">
              <LucideX class="w-4 h-4" />
            </button>
          </div>

          <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 class="text-slate-900 font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
              <LucideLayers class="w-4 h-4 text-teal-500" /> {{ t('productosPage.categoriesTitle') }}
            </h2>
            <ul class="space-y-1.5">
              <li>
                <button 
                  @click="activeCategory = 'Todos'"
                  class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium cursor-pointer"
                  :class="activeCategory === 'Todos' ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'"
                >
                  <div class="flex items-center gap-3">
                    <div class="w-1.5 h-1.5 rounded-full transition-colors" :class="activeCategory === 'Todos' ? 'bg-teal-500 shadow-[0_0_8px_#F40001]' : 'bg-slate-300'"></div>
                    {{ t('productosPage.allProducts') }}
                  </div>
                  <span class="text-xs font-semibold px-2 py-0.5 rounded-md border" :class="activeCategory === 'Todos' ? 'bg-teal-100/50 border-teal-200 text-teal-700' : 'bg-slate-100 border-slate-200 text-slate-600'">
                    {{ catalogo.length }}
                  </span>
                </button>
              </li>
              <li v-for="cat in categories" :key="cat.name">
                <button 
                  @click="activeCategory = cat.name"
                  class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium cursor-pointer"
                  :class="activeCategory === cat.name ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'"
                >
                  <div class="flex items-center gap-3 text-left">
                    <div class="w-1.5 h-1.5 rounded-full transition-colors" :class="activeCategory === cat.name ? 'bg-teal-500 shadow-[0_0_8px_#F40001]' : 'bg-slate-300'"></div>
                    <span class="truncate max-w-35 block">{{ catName(cat.name) }}</span>
                  </div>
                  <span class="text-xs font-semibold px-2 py-0.5 rounded-md border" :class="activeCategory === cat.name ? 'bg-teal-100/50 border-teal-200 text-teal-700' : 'bg-slate-100 border-slate-200 text-slate-600'">
                    {{ cat.count }}
                  </span>
                </button>
              </li>
            </ul>
          </div>

          <div class="relative overflow-hidden bg-linear-to-br from-teal-500 via-teal-700 to-[#7F0000] rounded-2xl p-6 text-white shadow-lg group hidden lg:block">
            <div class="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors"></div>
            <LucideHeadset class="w-8 h-8 text-white mb-4 relative z-10" />
            <h3 class="font-bold text-lg mb-2 relative z-10">{{ t('productosPage.asesorTitle') }}</h3>
            <p class="text-white/80 text-sm mb-4 relative z-10">{{ t('productosPage.asesorText') }}</p>
            <a href="https://wa.me/59176265905" target="_blank" class="w-full bg-white hover:bg-slate-50 text-biadoxid-700 text-sm font-bold py-3 rounded-xl transition-colors relative z-10 shadow-lg flex justify-center items-center gap-2">
              {{ t('productosPage.asesorCta') }}
            </a>
          </div>
        </aside>

        <section class="flex-1 w-full space-y-6">
          
          <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
            <p class="text-slate-600 text-sm">
              {{ t('productosPage.showingBefore') }} <strong class="text-slate-900">{{ filteredProducts.length }}</strong> {{ t('productosPage.showingAfter') }}
              <span v-if="searchQuery"> {{ t('productosPage.forQuery') }} "<strong class="text-teal-600">{{ searchQuery }}</strong>"</span>
            </p>
            <div class="flex items-center gap-3">
              <span class="text-xs font-semibold text-slate-400 uppercase tracking-widest hidden sm:inline-block">{{ t('productosPage.sortLabel') }}</span>
              <div class="relative">
                <select v-model="sortBy" :aria-label="t('productosPage.sortLabel')" class="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-xl pl-4 pr-10 py-2 focus:outline-hidden appearance-none cursor-pointer hover:bg-slate-100 transition-colors">
                  <option value="relevance">{{ t('productosPage.sortRelevance') }}</option>
                  <option value="name">{{ t('productosPage.sortName') }}</option>
                  <option value="recent">{{ t('productosPage.sortRecent') }}</option>
                </select>
                <LucideChevronDown class="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          <div v-if="filteredProducts.length === 0" class="flex flex-col items-center justify-center py-20 px-6 text-center bg-white border border-slate-200 border-dashed rounded-3xl shadow-sm w-full animate-in fade-in zoom-in duration-300">
            <div class="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4 shadow-inner">
              <LucideSearchX class="w-8 h-8" />
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">{{ t('productosPage.emptyTitle') }}</h3>
            <p class="text-slate-500 max-w-md text-sm">{{ t('productosPage.emptyText') }}</p>
            <button @click="resetFilters" class="mt-6 text-teal-600 font-semibold hover:text-teal-700 flex items-center gap-2 bg-teal-50 px-4 py-2 rounded-lg transition-colors cursor-pointer text-sm">
              <LucideRotateCcw class="w-4 h-4" /> {{ t('productosPage.resetFilters') }}
            </button>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            
            <div 
              v-for="(producto, index) in displayProducts" :key="producto.id"
              class="relative h-105 rounded-4xl overflow-hidden group cursor-pointer border border-slate-200 hover:border-teal-300 transition-all duration-500 shadow-sm hover:shadow-xl bg-white animate-in fade-in"
              @click="openProductModal(producto)"
            >
              <div class="absolute inset-0 bg-white"></div>

              <div :class="['absolute inset-0 bg-linear-to-br opacity-40 group-hover:opacity-80 transition-opacity duration-700', colorThemes[index % 3].gradientFrom, colorThemes[index % 3].gradientTo]"></div>

              <div class="absolute top-0 inset-x-0 h-[65%] p-8 flex items-center justify-center">
                <img 
                  :src="producto.image" 
                  :alt="producto.name"
                  loading="lazy"
                  class="w-full h-full object-contain drop-shadow-md opacity-90 group-hover:opacity-100 transform group-hover:-translate-y-3 group-hover:scale-110 transition-all duration-700 ease-out mix-blend-multiply"
                  style="aspect-ratio: 1 / 1;"
                  @error="$event.target.src = '/BIADOXID-PHARMA-LOGO-v2.webp'; $event.target.style.padding = '20%'"
                />
              </div>

              <div class="absolute top-6 right-6 w-12 h-12 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-800 font-bold text-sm z-20 shadow-sm group-hover:border-teal-300 transition-colors">
                {{ getInitials(producto.name) }}
              </div>

              <div class="absolute bottom-2 left-2 right-2 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/40 p-5 transform transition-transform duration-500 z-30 flex flex-col justify-end shadow-sm">
                
                <span :class="['text-[10px] font-bold uppercase tracking-widest mb-1.5 block truncate', colorThemes[index % 3].badgeText]">
                  {{ producto.category || catName() }}
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
                  <button @click.stop="handleFichaClick" class="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 hover:text-slate-700 transition-colors group/btn z-40 relative">
                    <LucideFileText :size="14" class="group-hover/btn:text-teal-400 transition-colors" />
                    <span>{{ t('portafolio.ficha') }}</span>
                  </button>

                  <div class="flex items-center gap-2 text-xs font-semibold text-slate-700 group-hover:text-teal-600 transition-colors relative z-40">
                    <span>{{ t('portafolio.detalles') }}</span>
                    <div class="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-teal-500 transition-colors border border-slate-200">
                      <LucideArrowRight :size="12" class="-rotate-45 group-hover:rotate-0 transition-transform duration-300 text-slate-500 group-hover:text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div v-if="totalPages > 1" class="mt-12 flex justify-center w-full">
            <nav class="flex items-center gap-1 bg-white border border-slate-200 p-1.5 rounded-2xl shadow-sm">
              <button 
                @click="currentPage > 1 && currentPage--" 
                :disabled="currentPage === 1"
                :aria-label="t('productosPage.prevAria')"
                class="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              >
                <LucideChevronLeft class="w-5 h-5" />
              </button>
              
              <button 
                v-for="page in totalPages" :key="page"
                @click="currentPage = page"
                :class="currentPage === page ? 'text-white bg-teal-500 shadow-md shadow-teal-500/20' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-semibold transition-colors cursor-pointer'"
                class="w-10 h-10 rounded-xl flex items-center justify-center font-semibold"
              >
                {{ page }}
              </button>

              <button 
                @click="currentPage < totalPages && currentPage++" 
                :disabled="currentPage === totalPages"
                :aria-label="t('productosPage.nextAria')"
                class="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              >
                <LucideChevronRight class="w-5 h-5" />
              </button>
            </nav>
          </div>

        </section>
      </div>
    </main>

    <!-- Notificación Toast -->
    <Teleport to="body">
      <Transition name="toast-anim">
        <div v-if="notification.show" class="fixed top-6 left-1/2 -translate-x-1/2 z-200 bg-slate-800 border border-teal-500/30 text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-3 pointer-events-none">
          <LucideCheckCircle :size="18" class="text-teal-400 shrink-0" />
          <span class="text-xs font-medium whitespace-nowrap">{{ notification.message }}</span>
        </div>
      </Transition>
    </Teleport>

    <ProductModal 
      :show="isProductModalOpen" 
      :product="selectedProduct" 
      @close="closeProductModal"
      @change-product="(p) => selectedProduct = p"
    />

  </div>
</template>

<style scoped>
::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-track { background: rgba(15, 23, 42, 0.08); }
::-webkit-scrollbar-thumb { background: #F40001; border-radius: 999px; border: 2px solid rgba(15, 23, 42, 0.08); }
::-webkit-scrollbar-thumb:hover { background: #B30000; }
</style>