<script setup>
import { watch, onMounted, onBeforeUnmount } from 'vue'
import { Globe, BadgeCheck, Handshake, X, ArrowRight, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-vue-next'

const { t } = useI18n()

const props = defineProps({
  show: Boolean,
  partner: Object,
  index: { type: Number, default: 0 },
  total: { type: Number, default: 0 }
})

const emit = defineEmits(['close', 'prev', 'next'])

const close = () => emit('close')

// Bloqueo de scroll del fondo mientras el modal está abierto
watch(() => props.show, (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
})

const onKeydown = (e) => {
  if (!props.show) return
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowLeft') emit('prev')
  else if (e.key === 'ArrowRight') emit('next')
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="backdrop">
      <div v-if="show" class="fixed inset-0 z-100 bg-slate-950/80 backdrop-blur-md" @click="close"></div>
    </Transition>

    <Transition name="modal">
      <div v-if="show && partner" role="dialog" aria-modal="true"
        class="fixed inset-0 z-110 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
        <div
          class="w-full max-w-3xl bg-white border border-slate-200 rounded-[2rem] shadow-2xl overflow-hidden pointer-events-auto flex flex-col md:flex-row max-h-[85vh] relative">

          <!-- Cerrar -->
          <div class="absolute top-4 right-4 z-30">
            <button @click="close"
              class="w-10 h-10 rounded-full bg-white/90 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-white hover:bg-teal-500 hover:border-teal-500 transition-all shadow-lg backdrop-blur-md"
              :aria-label="t('partnersDetailed.viewClose')">
              <X :size="18" />
            </button>
          </div>

          <!-- Banner izquierdo: logo GRANDE sobre el color de la empresa -->
          <div :class="['relative w-full md:w-2/5 flex items-center justify-center p-10 shrink-0 overflow-hidden', partner.bgClass]"
            style="min-height: 240px;">
            <!-- Flechas de navegación en los extremos del banner (no tapan contenido) -->
            <button @click="emit('prev')" :disabled="index <= 0"
              class="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/90 border border-slate-200 flex items-center justify-center text-slate-600 shadow-lg backdrop-blur-md hover:text-white hover:bg-teal-500 hover:border-teal-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/90 disabled:hover:text-slate-600 disabled:hover:border-slate-200"
              :aria-label="t('partnersDetailed.prevPartner')" :title="t('partnersDetailed.prevPartner')">
              <ChevronLeft :size="18" />
            </button>
            <button @click="emit('next')" :disabled="index >= total - 1"
              class="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/90 border border-slate-200 flex items-center justify-center text-slate-600 shadow-lg backdrop-blur-md hover:text-white hover:bg-teal-500 hover:border-teal-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/90 disabled:hover:text-slate-600 disabled:hover:border-slate-200"
              :aria-label="t('partnersDetailed.nextPartner')" :title="t('partnersDetailed.nextPartner')">
              <ChevronRight :size="18" />
            </button>
            <!-- Marca de agua decorativa -->
            <img :src="partner.logo" alt=""
              class="absolute -bottom-10 -right-10 w-44 h-44 object-contain opacity-10 mix-blend-multiply pointer-events-none select-none"
              loading="lazy" aria-hidden="true"
              @error="$event.target.src = '/BIADOXID-PHARMA-LOGO-v2.webp'; $event.target.style.padding = '4px'" />
            <div class="relative z-10 flex flex-col items-center gap-4">
              <img :src="partner.logo" :alt="partner.name"
                class="w-32 h-32 object-contain mix-blend-multiply drop-shadow-md"
                loading="lazy"
                @error="$event.target.src = '/BIADOXID-PHARMA-LOGO-v2.webp'; $event.target.style.padding = '8px'" />
              <span :class="['text-lg font-black uppercase tracking-[0.25em]', partner.colorClass]">
                {{ partner.shortName }}
              </span>
            </div>
            <span :class="['absolute top-4 left-4 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-[9px] font-black uppercase tracking-widest', partner.colorClass]">
              {{ partner.region }}
            </span>
          </div>

          <!-- Información derecha -->
          <div class="w-full md:w-3/5 p-8 overflow-y-auto custom-scrollbar">
            <h2 class="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-1">{{ partner.name }}</h2>
            <p class="text-slate-500 text-sm font-light leading-relaxed mt-4">
              {{ partner.desc }}
            </p>

            <!-- Detalles de la alianza -->
            <div class="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
              <div class="flex items-center gap-3 text-sm">
                <div class="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                  <Globe :size="16" />
                </div>
                <div>
                  <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400">{{ t('partnersDetailed.regionLabel') }}</p>
                  <p class="font-bold text-slate-800">{{ partner.region }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3 text-sm">
                <div class="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-teal-500 shrink-0">
                  <BadgeCheck :size="16" />
                </div>
                <div>
                  <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400">{{ t('partnersDetailed.certTitle') }}</p>
                  <p class="font-bold text-slate-800">{{ t('partnersDetailed.certBadge') }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3 text-sm">
                <div class="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                  <Handshake :size="16" />
                </div>
                <div>
                  <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400">{{ t('partnersDetailed.allianceTitle') }}</p>
                  <p class="font-bold text-slate-800">{{ t('partnersDetailed.allianceLabel') }}</p>
                </div>
              </div>
            </div>

            <!-- Acciones -->
            <div class="mt-6 flex flex-col sm:flex-row gap-3">
              <NuxtLink to="/contacto" @click="close"
                class="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-biadoxid-600 hover:bg-biadoxid-700 text-white font-bold shadow-lg shadow-biadoxid-900/20 transition-all group">
                {{ t('partnersDetailed.moreCta') }}
                <ArrowRight :size="16" class="group-hover:translate-x-1 transition-transform" />
              </NuxtLink>
              <a href="https://wa.me/59176265905" target="_blank" rel="noopener noreferrer"
                class="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:border-teal-500/50 hover:text-teal-700 transition-all group">
                <MessageCircle :size="16" class="text-teal-600 group-hover:scale-110 transition-transform" />
                {{ t('partnersDetailed.viewWa') }}
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
.custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(244,0,1,0.45); border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(244,0,1,0.75); }

.backdrop-enter-active, .backdrop-leave-active { transition: opacity 0.4s ease; }
.backdrop-enter-from, .backdrop-leave-to { opacity: 0; }

.modal-enter-active, .modal-leave-active { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.95) translateY(20px); }
</style>
