<script setup>
import { ref, watch, computed, onUnmounted } from 'vue'
import catalogo from '../data/catalogo.json'
import DOMPurify from 'dompurify'
import { useCatalog } from '../composables/useCatalog'

const { t } = useI18n()
const { catName, localizeProduct } = useCatalog()

// Limpia residuos de Word/Office pegados desde documentos (atributos data-*,
// espacios de alineación y &nbsp;) para que el contenido fluya ordenado.
const cleanDescriptionHtml = (html) => {
  if (!html) return html
  return html
    .replace(/\sdata-(contrast|ccp-props|start|end)="[^"]*"/gi, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\s*\n\s*/g, '\n')
    .replace(/>\s+</g, '><')
    .trim()
}

// Función para sanitizar HTML antes de renderizar con v-html
const sanitizeHtml = (html) => {
  if (!html) return `<p>${t('productModal.fallback')}</p>`
  return DOMPurify.sanitize(cleanDescriptionHtml(html))
}

const props = defineProps({
  show: Boolean,
  product: Object
})

const emit = defineEmits(['close', 'change-product'])

// Producto localizado según el idioma activo
const displayProduct = computed(() => localizeProduct(props.product))

const activeTab = ref('desc')
const isExpanded = ref(false)
const toast = ref({ show: false, message: '' })

watch(() => props.product, () => {
  activeTab.value = 'desc'
  isExpanded.value = false
})

// Bloquea el scroll del body mientras el modal está abierto (evita que en móvil
// el gesto dentro del modal arrastre la página de fondo)
watch(() => props.show, (val) => {
  if (import.meta.server || typeof document === 'undefined') return
  document.body.style.overflow = val ? 'hidden' : ''
}, { immediate: true })

onUnmounted(() => {
  document.body.style.overflow = ''
})

const tabs = [
  { id: 'desc', nameKey: 'productModal.tabDesc' },
  { id: 'uso', nameKey: 'productModal.tabUso' },
  { id: 'tips', nameKey: 'productModal.tabTips' },
  { id: 'related', nameKey: 'productModal.tabRelated' }
]

// Obtener 4 productos relacionados excluyendo el actual
const relatedProducts = computed(() => {
  if (!props.product) return []
  // Prioriza productos de la misma categoría clínica
  const raw = catalogo.find(p => p.slug === props.product.slug) || props.product
  const cat = raw.category || 'Especialidad'
  const sameCat = catalogo.filter(p => p.slug !== raw.slug && (p.category || 'Especialidad') === cat)
  const others = catalogo.filter(p => p.slug !== raw.slug && (p.category || 'Especialidad') !== cat)
  return [...sameCat, ...others].slice(0, 4).map(localizeProduct)
})

const triggerAction = (msg) => {
  toast.value = { show: true, message: msg }
  setTimeout(() => {
    toast.value.show = false
  }, 3000)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="backdrop">
      <div v-if="show" class="fixed inset-0 z-100 bg-slate-950/80 backdrop-blur-md" @click="emit('close')"></div>
    </Transition>

    <Transition name="modal">
      <div v-if="show && product" class="fixed inset-0 z-110 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
        
        <div class="w-full max-w-5xl bg-white border border-slate-200 rounded-[2rem] shadow-2xl overflow-hidden pointer-events-auto flex flex-col md:flex-row h-[92dvh] md:h-162.5 relative">
          
          <button @click="emit('close')" class="absolute top-5 right-5 z-30 w-10 h-10 rounded-full bg-white/90 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-white hover:bg-biadoxid-600 hover:border-biadoxid-600 transition-all backdrop-blur-md">
            <LucideX :size="20" />
          </button>

          <div class="w-full md:w-5/12 bg-linear-to-br from-[#FFF6F6] via-[#FFECEC] to-[#FFE0E1] relative flex items-center justify-center p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-200 group h-44 md:h-full shrink-0">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,0,1,0.08)_0%,transparent_70%)]"></div>
            
            <div class="absolute top-6 left-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-[10px] font-bold uppercase tracking-widest z-10 bg-linear-to-br from-[#F40001] via-[#B30000] to-[#7F0000] shadow-lg shadow-biadoxid-900/30">
              <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0"></span>
              {{ displayProduct.category || catName() }}
            </div>

            <img :src="product.image" :alt="displayProduct.name" loading="lazy" style="aspect-ratio: 1 / 1;" class="relative z-10 w-full h-full object-contain drop-shadow-[0_14px_24px_rgba(180,0,0,0.22)] transform group-hover:scale-105 transition-transform duration-700 ease-out" @error="$event.target.src = '/BIADOXID-PHARMA-LOGO-v2.webp'; $event.target.style.padding = '20%'" />
          </div>

          <div class="w-full md:w-7/12 flex flex-col bg-white min-h-0 md:h-full relative">
            
            <Transition name="toast-anim">
              <div v-if="toast.show" class="absolute top-6 left-1/2 -translate-x-1/2 z-50 bg-white border border-biadoxid-200 text-slate-700 px-5 py-2.5 rounded-full shadow-xl flex items-center gap-3 w-max">
                <LucideCheckCircle :size="18" class="text-biadoxid-600" />
                <span class="text-xs font-medium">{{ toast.message }}</span>
              </div>
            </Transition>

            <div class="p-5 md:p-8 pb-3 shrink-0 bg-white z-20">
              <h2 class="text-2xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">{{ displayProduct.name }}</h2>
              
              <div class="relative transition-all duration-500" :class="isExpanded ? '' : 'max-h-15 overflow-hidden'">
                <p class="text-slate-500 text-sm md:text-base leading-relaxed pb-1">{{ displayProduct.shortDescription }}</p>
                <div v-if="!isExpanded && displayProduct.shortDescription.length > 120" class="absolute bottom-0 left-0 w-full h-8 bg-linear-to-t from-white to-transparent"></div>
              </div>
              
              <button 
                v-if="displayProduct.shortDescription.length > 120" 
                @click="isExpanded = !isExpanded" 
                class="text-biadoxid-600 hover:text-biadoxid-700 text-[10px] font-bold uppercase tracking-widest mt-2 flex items-center gap-1 transition-colors"
              >
                {{ isExpanded ? t('productModal.verMenos') : t('productModal.verMas') }}
                <LucideChevronDown :size="14" :class="isExpanded ? 'rotate-180' : ''" class="transition-transform duration-300" />
              </button>
            </div>

            <div class="px-5 md:px-8 border-b border-slate-200 shrink-0 flex gap-6 overflow-x-auto custom-scrollbar">
              <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" class="pb-3 text-sm font-semibold tracking-wide transition-all relative whitespace-nowrap" :class="activeTab === tab.id ? 'text-biadoxid-600' : 'text-slate-500 hover:text-slate-700'">
                {{ t(tab.nameKey) }}
                <div v-if="activeTab === tab.id" class="absolute bottom-0 left-0 w-full h-0.5 bg-biadoxid-600 rounded-t-full shadow-[0_-2px_10px_rgba(244,0,1,0.35)]"></div>
              </button>
            </div>

            <div class="p-5 md:p-8 flex-1 overflow-y-auto overscroll-contain custom-scrollbar relative">
              
              <div v-show="activeTab === 'desc'" class="animate-fadeIn wp-content">
                <div v-html="sanitizeHtml(displayProduct.descriptionHtml)"></div>
              </div>

              <div v-show="activeTab === 'uso'" class="animate-fadeIn">
                 <div class="bg-biadoxid-50 border border-biadoxid-100 rounded-xl p-5 flex gap-4">
                  <LucideInfo class="w-6 h-6 text-biadoxid-600 shrink-0" />
                  <div>
                    <h4 class="text-slate-800 font-medium text-sm mb-1">{{ t('productModal.presTitle') }}</h4>
                    <p class="text-slate-500 text-sm leading-relaxed">{{ t('productModal.presText') }}</p>
                  </div>
                </div>
              </div>

              <div v-show="activeTab === 'tips'" class="animate-fadeIn space-y-4">
                <div class="bg-biadoxid-50 border border-biadoxid-100 rounded-xl p-4 flex gap-3">
                    <LucideAlertCircle class="w-5 h-5 text-biadoxid-600 shrink-0" />
                    <div>
                      <h4 class="text-slate-800 font-medium text-sm mb-1">{{ t('productModal.warnTitle') }}</h4>
                      <p class="text-slate-500 text-sm leading-relaxed">{{ t('productModal.warnText') }}</p>
                    </div>
                </div>
                <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 flex gap-3">
                    <LucideShieldAlert class="w-5 h-5 text-slate-500 shrink-0" />
                    <div>
                      <h4 class="text-slate-800 font-medium text-sm mb-1">{{ t('productModal.consTitle') }}</h4>
                      <p class="text-slate-500 text-sm leading-relaxed">{{ t('productModal.consText') }}</p>
                    </div>
                </div>
              </div>

              <div v-show="activeTab === 'related'" class="animate-fadeIn">
                <h4 class="text-slate-800 font-medium text-sm mb-4">{{ t('productModal.relatedTitle') }}</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div v-for="related in relatedProducts" :key="related.slug" @click="emit('change-product', related)" class="group flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-biadoxid-300 hover:bg-white hover:shadow-md transition-all cursor-pointer">
                    <div class="w-16 h-16 rounded-xl bg-white border border-slate-200 shrink-0 overflow-hidden relative">
                      <div class="absolute inset-0 bg-linear-to-br from-biadoxid-500/10 to-transparent z-10"></div>
                      <img :src="related.image" :alt="related.name" loading="lazy" style="aspect-ratio: 1 / 1;" class="relative z-20 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" @error="$event.target.src = '/BIADOXID-PHARMA-LOGO-v2.webp'">
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-[9px] uppercase tracking-widest text-biadoxid-600 font-semibold mb-0.5 truncate">{{ related.category || catName() }}</p>
                      <h5 class="text-slate-800 font-medium text-xs truncate group-hover:text-biadoxid-700 transition-colors">{{ related.name }}</h5>
                    </div>
                    <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-biadoxid-600 group-hover:text-white transition-all shrink-0 mr-1">
                      <LucideArrowRight class="w-3.5 h-3.5 -rotate-45 group-hover:rotate-0 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div class="p-4 md:p-8 border-t border-slate-200 bg-white/95 backdrop-blur-md shrink-0 flex flex-col sm:flex-row gap-3">
              <button @click="triggerAction(t('productModal.fichaToast'))" class="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-semibold transition-all group">
                <LucideDownload :size="16" class="text-slate-500 group-hover:text-slate-700 transition-colors" /> {{ t('productModal.fichaBtn') }}
              </button>
              <a href="https://wa.me/59176265905" target="_blank" class="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-biadoxid-600 hover:bg-biadoxid-700 text-white font-bold shadow-[0_0_20px_rgba(244,0,1,0.25)] hover:shadow-[0_0_25px_rgba(244,0,1,0.4)] transition-all transform hover:-translate-y-0.5">
                {{ t('productModal.asesor') }} <LucideArrowRight :size="16" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: rgba(15, 23, 42, 0.04); border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(244,0,1,0.45); border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(244,0,1,0.75); }

.animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

.backdrop-enter-active, .backdrop-leave-active { transition: opacity 0.4s ease; }
.backdrop-enter-from, .backdrop-leave-to { opacity: 0; }

.modal-enter-active, .modal-leave-active { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.95) translateY(20px); }

.toast-anim-enter-active, .toast-anim-leave-active { transition: all 0.3s ease; }
.toast-anim-enter-from, .toast-anim-leave-to { opacity: 0; transform: translate(-50%, -10px); }

/* Estilos WordPress HTML (tema claro) */
:deep(.wp-content h2), :deep(.wp-content h3), :deep(.wp-content h6) { font-size: 1rem; font-weight: 700; color: #0f172a; margin-top: 1.5rem; margin-bottom: 0.5rem; }
:deep(.wp-content h2) { font-size: 1.125rem; }
:deep(.wp-content h6) { font-size: 0.9375rem; }
:deep(.wp-content p) { color: #334155; line-height: 1.7; margin-bottom: 1rem; font-size: 0.9375rem; }
:deep(.wp-content strong), :deep(.wp-content b) { color: #334155; }
:deep(.wp-content em) { color: #475569; }
:deep(.wp-content hr) { border: none; height: 1px; background: rgba(100,116,139,0.2); margin: 1.5rem 0; }
:deep(.wp-content ul), :deep(.wp-content ol) { color: #334155; padding-left: 1.25rem; margin-bottom: 1rem; }
:deep(.wp-content li) { margin-bottom: 0.35rem; }
:deep(.wp-content span[style*="color"]) { color: #F40001 !important; }
:deep(.wp-content span[style*="color"]) strong,
:deep(.wp-content span[style*="color"]) b { color: inherit !important; }
</style>
