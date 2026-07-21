<script setup>
import { ref, computed, watch } from 'vue'
import catalogo from '../data/catalogo.json'

const { notification, showNotification } = useNotification()

// Metadatos SEO
useHead({
  title: 'Portafolio Clínico | Biadoxid Pharma',
  meta: [
    { name: 'description', content: 'Explore nuestro catálogo completo de medicamentos de alta especialidad, dermocosméticos y suplementos. Representación exclusiva de laboratorios internacionales.' }
  ]
})

// Variables de estado
const searchQuery = ref('')
const activeCategory = ref('Todos')
const sortBy = ref('Relevancia')

// Configuración de Paginación Real
const itemsPerPage = 9
const currentPage = ref(1)

// Variables para el Modal de Detalles
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
  showNotification("La Ficha Técnica no está disponible en este momento. El documento PDF se encuentra en proceso de solicitud al laboratorio.")
}

const getInitials = (name) => {
  if (!name) return 'PR'
  return name.substring(0, 3).toUpperCase()
}

// Colores dinámicos para las tarjetas en Blanco/Claro (Light Holographic)
const colorThemes = [
  { gradientFrom: 'from-teal-500/10', gradientTo: 'to-slate-100/50', badgeText: 'text-teal-600' },
  { gradientFrom: 'from-blue-500/10', gradientTo: 'to-slate-100/50', badgeText: 'text-blue-600' },
  { gradientFrom: 'from-rose-500/10', gradientTo: 'to-slate-100/50', badgeText: 'text-rose-600' }
]

// Generar categorías dinámicas desde el JSON
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

// Lógica combinada: Filtrado y Búsqueda
const filteredProducts = computed(() => {
  let filtered = catalogo.filter(p => {
    const cat = p.category || 'Especialidad'
    const matchCategory = activeCategory.value === 'Todos' || cat === activeCategory.value
    
    const searchLower = searchQuery.value.toLowerCase()
    const descLower = (p.shortDescription || '').toLowerCase()
    const matchSearch = p.name.toLowerCase().includes(searchLower) || 
                        cat.toLowerCase().includes(searchLower) ||
                        descLower.includes(searchLower)
    
    return matchCategory && matchSearch
  })

  // Lógica de Ordenamiento
  if (sortBy.value === 'Nombre (A - Z)') {
    filtered.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy.value === 'Más recientes') {
    filtered.sort((a, b) => b.id - a.id) // Asumiendo que IDs más altos son más nuevos
  }

  return filtered
})

// Lógica de Paginación sobre los productos ya filtrados
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProducts.value.slice(start, end)
})

// Resetear a la página 1 cuando el usuario busca algo o cambia de categoría
watch([searchQuery, activeCategory, sortBy], () => {
  currentPage.value = 1
})

const resetFilters = () => {
  searchQuery.value = ''
  activeCategory.value = 'Todos'
  sortBy.value = 'Relevancia'
  currentPage.value = 1
}
</script>

<template>
  <div class="bg-slate-50 text-slate-800 font-sans antialiased min-h-screen selection:bg-teal-500/30 selection:text-teal-900">
    
    <div class="bg-slate-950 relative overflow-hidden pb-32">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none"></div>
      <div class="absolute top-0 right-0 w-150 h-150 bg-teal-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div class="max-w-7xl mx-auto px-6 pt-24 pb-8 relative z-10 text-center md:text-left">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono tracking-widest mb-6">
          <LucideDatabase class="w-3.5 h-3.5" /> VADEMÉCUM DIGITAL
        </div>
        <h1 class="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">Portafolio Clínico</h1>
        <p class="text-slate-400 max-w-2xl text-lg md:text-xl mx-auto md:mx-0 font-light leading-relaxed">
          Explora nuestro catálogo de soluciones médicas y dermatológicas de alta precisión, respaldadas por estándares internacionales.
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
              placeholder="Buscar producto o activo..." 
              class="w-full bg-slate-50 text-slate-900 rounded-xl pl-10 pr-10 py-3.5 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 focus:bg-white transition-all placeholder:text-slate-400"
            >
            <button v-if="searchQuery" @click="searchQuery = ''" class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-rose-500 transition-colors cursor-pointer">
              <LucideX class="w-4 h-4" />
            </button>
          </div>

          <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 class="text-slate-900 font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
              <LucideLayers class="w-4 h-4 text-teal-500" /> Categorías Clínicas
            </h2>
            <ul class="space-y-1.5">
              <li>
                <button 
                  @click="activeCategory = 'Todos'"
                  class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium cursor-pointer"
                  :class="activeCategory === 'Todos' ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'"
                >
                  <div class="flex items-center gap-3">
                    <div class="w-1.5 h-1.5 rounded-full transition-colors" :class="activeCategory === 'Todos' ? 'bg-teal-500 shadow-[0_0_8px_#2dd4bf]' : 'bg-slate-300'"></div>
                    Todos los productos
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
                    <div class="w-1.5 h-1.5 rounded-full transition-colors" :class="activeCategory === cat.name ? 'bg-teal-500 shadow-[0_0_8px_#2dd4bf]' : 'bg-slate-300'"></div>
                    <span class="truncate max-w-35 block">{{ cat.name }}</span>
                  </div>
                  <span class="text-xs font-semibold px-2 py-0.5 rounded-md border" :class="activeCategory === cat.name ? 'bg-teal-100/50 border-teal-200 text-teal-700' : 'bg-slate-100 border-slate-200 text-slate-600'">
                    {{ cat.count }}
                  </span>
                </button>
              </li>
            </ul>
          </div>

          <div class="bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative group hidden lg:block">
            <div class="absolute -top-10 -right-10 w-32 h-32 bg-teal-500/20 rounded-full blur-2xl group-hover:bg-teal-400/30 transition-colors"></div>
            <LucideHeadset class="w-8 h-8 text-teal-400 mb-4 relative z-10" />
            <h3 class="font-bold text-lg mb-2 relative z-10">¿Necesitas asesoría?</h3>
            <p class="text-slate-400 text-sm mb-4 relative z-10">Nuestros especialistas médicos están listos para resolver tus dudas de inmediato.</p>
            <a href="https://wa.me/59176265905" target="_blank" class="w-full bg-teal-500 hover:bg-teal-400 text-white text-sm font-bold py-3 rounded-xl transition-colors relative z-10 shadow-[0_0_15px_rgba(20,184,166,0.3)] flex justify-center items-center gap-2">
              Contactar Asesor
            </a>
          </div>
        </aside>

        <section class="flex-1 w-full space-y-6">
          
          <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
            <p class="text-slate-600 text-sm">
              Mostrando <strong class="text-slate-900">{{ filteredProducts.length }}</strong> resultados
              <span v-if="searchQuery"> para "<strong class="text-teal-600">{{ searchQuery }}</strong>"</span>
            </p>
            <div class="flex items-center gap-3">
              <span class="text-xs font-semibold text-slate-400 uppercase tracking-widest hidden sm:inline-block">Ordenar por:</span>
              <div class="relative">
                <select v-model="sortBy" aria-label="Ordenar productos" class="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-xl pl-4 pr-10 py-2 focus:outline-hidden appearance-none cursor-pointer hover:bg-slate-100 transition-colors">
                  <option>Relevancia</option>
                  <option>Nombre (A - Z)</option>
                  <option>Más recientes</option>
                </select>
                <LucideChevronDown class="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          <div v-if="filteredProducts.length === 0" class="flex flex-col items-center justify-center py-20 px-6 text-center bg-white border border-slate-200 border-dashed rounded-3xl shadow-sm w-full animate-in fade-in zoom-in duration-300">
            <div class="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4 shadow-inner">
              <LucideSearchX class="w-8 h-8" />
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">No se encontraron productos</h3>
            <p class="text-slate-500 max-w-md text-sm">No hay resultados clínicos que coincidan con tus filtros seleccionados.</p>
            <button @click="resetFilters" class="mt-6 text-teal-600 font-semibold hover:text-teal-700 flex items-center gap-2 bg-teal-50 px-4 py-2 rounded-lg transition-colors cursor-pointer text-sm">
              <LucideRotateCcw class="w-4 h-4" /> Limpiar filtros
            </button>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            
            <div 
              v-for="(producto, index) in paginatedProducts" :key="producto.id"
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
                  @error="$event.target.src = '/BIADOXID-PHARMA-LOGO.webp'; $event.target.style.padding = '20%'"
                />
              </div>

              <div class="absolute top-6 right-6 w-12 h-12 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-800 font-bold text-sm z-20 shadow-sm group-hover:border-teal-300 transition-colors">
                {{ getInitials(producto.name) }}
              </div>

              <div class="absolute bottom-2 left-2 right-2 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/40 p-5 transform transition-transform duration-500 z-30 flex flex-col justify-end shadow-sm">
                
                <span :class="['text-[10px] font-bold uppercase tracking-widest mb-1.5 block truncate', colorThemes[index % 3].badgeText]">
                  {{ producto.category || 'Especialidad' }}
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
                    <LucideFileText :size="14" class="group-hover/btn:text-rose-500 transition-colors" />
                    <span>FICHA.PDF</span>
                  </button>

                  <div class="flex items-center gap-2 text-xs font-semibold text-slate-700 group-hover:text-teal-600 transition-colors relative z-40">
                    <span>Detalles</span>
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
                aria-label="Página anterior"
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
                aria-label="Página siguiente"
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
/* Scrollbar moderno */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #f1f5f9; }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #14b8a6; }
</style>