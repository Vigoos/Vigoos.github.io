<script setup>
import { ref, watch, computed } from 'vue'
import catalogo from '../data/catalogo.json'
import DOMPurify from 'dompurify'

// Función para sanitizar HTML antes de renderizar con v-html
const sanitizeHtml = (html) => {
  if (!html) return '<p>Información técnica en proceso de actualización.</p>'
  return DOMPurify.sanitize(html)
}

const props = defineProps({
  show: Boolean,
  product: Object
})

const emit = defineEmits(['close', 'change-product'])

const activeTab = ref('desc')
const isExpanded = ref(false) // Controla el "Ver más" de la descripción
const toast = ref({ show: false, message: '' })

// Resetear variables cuando se abre un nuevo producto
watch(() => props.product, () => {
  activeTab.value = 'desc'
  isExpanded.value = false // Vuelve a colapsar el texto al cambiar de producto
})

// Pestañas exactas de tu diseño
const tabs = [
  { id: 'desc', name: 'Descripción' },
  { id: 'uso', name: 'Modo de Uso' },
  { id: 'tips', name: 'Precauciones' },
  { id: 'related', name: 'Relacionados' }
]

// Obtener 4 productos relacionados excluyendo el actual
const relatedProducts = computed(() => {
  if (!props.product) return []
  return catalogo.filter(p => p.slug !== props.product.slug).slice(0, 4)
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
        
        <div class="w-full max-w-5xl bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden pointer-events-auto flex flex-col md:flex-row h-[85vh] md:h-162.5 relative">
          
          <button @click="emit('close')" class="absolute top-5 right-5 z-30 w-10 h-10 rounded-full bg-slate-950/50 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-rose-500/20 hover:border-rose-500/50 transition-all backdrop-blur-md">
            <LucideX :size="20" />
          </button>

          <div class="w-full md:w-5/12 bg-linear-to-br from-slate-800 to-slate-950 relative flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-white/5 group h-64 md:h-full shrink-0">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.05)_0%,transparent_70%)]"></div>
            
            <div class="absolute top-6 left-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/60 border border-white/5 backdrop-blur-md text-[10px] uppercase font-mono tracking-widest text-teal-400 z-10">
              <span class="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
              {{ product.category || 'Especialidad' }}
            </div>

            <img :src="product.image" :alt="product.name" loading="lazy" style="aspect-ratio: 1 / 1;" class="relative z-10 w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] transform group-hover:scale-105 transition-transform duration-700 ease-out" @error="$event.target.src = '/BIADOXID-PHARMA-LOGO.webp'; $event.target.style.padding = '20%'" />
          </div>

          <div class="w-full md:w-7/12 flex flex-col bg-slate-900 h-full relative">
            
            <Transition name="toast-anim">
              <div v-if="toast.show" class="absolute top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-800 border border-teal-500/30 text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-3 w-max">
                <LucideCheckCircle :size="18" class="text-teal-400" />
                <span class="text-xs font-medium">{{ toast.message }}</span>
              </div>
            </Transition>

            <div class="p-6 md:p-8 pb-4 shrink-0 bg-slate-900 z-20">
              <h2 class="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">{{ product.name }}</h2>
              
              <div class="relative transition-all duration-500" :class="isExpanded ? '' : 'max-h-15 overflow-hidden'">
                <p class="text-slate-400 text-sm md:text-base leading-relaxed pb-1">{{ product.shortDescription }}</p>
                <div v-if="!isExpanded && product.shortDescription.length > 120" class="absolute bottom-0 left-0 w-full h-8 bg-linear-to-t from-slate-900 to-transparent"></div>
              </div>
              
              <button 
                v-if="product.shortDescription.length > 120" 
                @click="isExpanded = !isExpanded" 
                class="text-teal-500 hover:text-teal-400 text-[10px] font-bold uppercase tracking-widest mt-2 flex items-center gap-1 transition-colors"
              >
                {{ isExpanded ? 'Ver menos' : 'Ver más' }}
                <LucideChevronDown :size="14" :class="isExpanded ? 'rotate-180' : ''" class="transition-transform duration-300" />
              </button>
            </div>

            <div class="px-6 md:px-8 border-b border-white/5 shrink-0 flex gap-6 overflow-x-auto custom-scrollbar">
              <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" class="pb-3 text-sm font-semibold tracking-wide transition-all relative whitespace-nowrap" :class="activeTab === tab.id ? 'text-teal-400' : 'text-slate-500 hover:text-slate-300'">
                {{ tab.name }}
                <div v-if="activeTab === tab.id" class="absolute bottom-0 left-0 w-full h-0.5 bg-teal-400 rounded-t-full shadow-[0_-2px_10px_rgba(45,212,191,0.5)]"></div>
              </button>
            </div>

            <div class="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar relative">
              <div class="absolute top-0 left-0 right-0 h-4 bg-linear-to-b from-slate-900 to-transparent pointer-events-none z-10"></div>
              
              <div v-show="activeTab === 'desc'" class="animate-fadeIn wp-content">
                <div v-html="sanitizeHtml(product.descriptionHtml)"></div>
              </div>

              <div v-show="activeTab === 'uso'" class="animate-fadeIn">
                 <div class="bg-blue-500/5 border border-blue-500/10 rounded-xl p-5 flex gap-4">
                  <LucideInfo class="w-6 h-6 text-blue-400 shrink-0" />
                  <div>
                    <h4 class="text-white font-medium text-sm mb-1">Información de Prescripción</h4>
                    <p class="text-slate-400 text-sm leading-relaxed">La dosis, posología y modo de administración de este producto deben ser indicados exclusivamente por un profesional de la salud. Consulte la Ficha Técnica para más detalles clínicos.</p>
                  </div>
                </div>
              </div>

              <div v-show="activeTab === 'tips'" class="animate-fadeIn space-y-4">
                <div class="bg-rose-500/5 border border-rose-500/10 rounded-xl p-4 flex gap-3">
                    <LucideAlertCircle class="w-5 h-5 text-rose-400 shrink-0" />
                    <div>
                      <h4 class="text-white font-medium text-sm mb-1">Advertencia General</h4>
                      <p class="text-slate-300 text-sm leading-relaxed">No se automedique. Este producto requiere supervisión profesional. Evite su uso en caso de hipersensibilidad comprobada a los componentes de la fórmula.</p>
                    </div>
                </div>
                <div class="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 flex gap-3">
                    <LucideShieldAlert class="w-5 h-5 text-slate-400 shrink-0" />
                    <div>
                      <h4 class="text-white font-medium text-sm mb-1">Conservación</h4>
                      <p class="text-slate-300 text-sm leading-relaxed">Manténgase fuera del alcance de los niños. Conserve en un lugar fresco y seco, protegido de la luz solar directa, según las indicaciones del empaque.</p>
                    </div>
                </div>
              </div>

              <div v-show="activeTab === 'related'" class="animate-fadeIn">
                <h4 class="text-white font-medium text-sm mb-4">Quizás también te interese:</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div v-for="related in relatedProducts" :key="related.slug" @click="emit('change-product', related)" class="group flex items-center gap-4 p-3 rounded-2xl bg-slate-800/50 border border-white/5 hover:border-teal-500/30 hover:bg-slate-800 transition-all cursor-pointer">
                    <div class="w-16 h-16 rounded-xl bg-slate-950 border border-white/5 shrink-0 overflow-hidden relative">
                      <div class="absolute inset-0 bg-linear-to-br from-teal-500/10 to-transparent z-10"></div>
                      <img :src="related.image" :alt="related.name" loading="lazy" style="aspect-ratio: 1 / 1;" class="relative z-20 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" @error="$event.target.src = '/BIADOXID-PHARMA-LOGO.webp'">
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-[9px] uppercase tracking-widest text-teal-400 font-semibold mb-0.5 truncate">{{ related.category || 'Fármaco' }}</p>
                      <h5 class="text-white font-medium text-xs truncate group-hover:text-teal-300 transition-colors">{{ related.name }}</h5>
                    </div>
                    <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-teal-500 group-hover:text-white transition-all shrink-0 mr-1">
                      <LucideArrowRight class="w-3.5 h-3.5 -rotate-45 group-hover:rotate-0 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-slate-900 to-transparent pointer-events-none z-10"></div>
            </div>

            <div class="p-6 md:p-8 border-t border-white/5 bg-slate-900/90 backdrop-blur-md shrink-0 flex flex-col sm:flex-row gap-4">
              <button @click="triggerAction('Descargando Ficha Técnica PDF...')" class="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold transition-all group">
                <LucideDownload :size="16" class="text-slate-400 group-hover:text-white transition-colors" /> Ficha Técnica
              </button>
              <a href="https://wa.me/59176265905" target="_blank" class="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-linear-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white font-bold shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] transition-all transform hover:-translate-y-0.5">
                Contactar Asesor <LucideArrowRight :size="16" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Scrollbar */
.custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(45,212,191,0.2); border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(45,212,191,0.4); }

/* Animations */
.animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

.backdrop-enter-active, .backdrop-leave-active { transition: opacity 0.4s ease; }
.backdrop-enter-from, .backdrop-leave-to { opacity: 0; }

.modal-enter-active, .modal-leave-active { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.95) translateY(20px); }

.toast-anim-enter-active, .toast-anim-leave-active { transition: all 0.3s ease; }
.toast-anim-enter-from, .toast-anim-leave-to { opacity: 0; transform: translate(-50%, -10px); }

/* Estilos WordPress HTML */
:deep(.wp-content h3) { font-size: 1rem; font-weight: 700; color: #fff; margin-top: 1.5rem; margin-bottom: 0.5rem; }
:deep(.wp-content p) { color: #94a3b8; line-height: 1.7; margin-bottom: 1rem; font-size: 0.875rem; }
:deep(.wp-content strong) { color: #cbd5e1; }
:deep(.wp-content span[style*="color: #ff0000"]) { color: #2dd4bf !important; }
</style>