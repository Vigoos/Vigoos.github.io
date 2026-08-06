<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ZoomIn, X } from 'lucide-vue-next'

const { t } = useI18n()

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: 'Imagen ampliada' }
})

const isOpen = ref(false)

const open = () => {
  isOpen.value = true
  document.body.style.overflow = 'hidden'
}

const close = () => {
  isOpen.value = false
  document.body.style.overflow = ''
}

const onKeydown = (e) => {
  if (e.key === 'Escape' && isOpen.value) close()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="relative w-full h-full">
    <!-- Contenido que envuelve (la imagen/card original) -->
    <slot />

    <!-- Botón lupa: siempre visible para que sea descubrible sin hover -->
    <button
      type="button"
      class="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 px-3 py-2 text-teal-600 shadow-lg opacity-100 transition-all duration-300 hover:bg-teal-500 hover:text-white hover:border-teal-500 hover:shadow-[0_0_15px_rgba(244,0,1,0.3)] cursor-zoom-in"
      :aria-label="t('imageZoom.ampliar', { alt })"
      @click="open"
    >
      <ZoomIn :size="16" />
      <span class="text-xs font-bold">{{ t('imageZoom.ver') }}</span>
    </button>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="zoom-fade">
        <!-- Clic en cualquier zona fuera de la imagen cierra el lightbox -->
        <div v-if="isOpen" role="dialog" aria-modal="true" class="fixed inset-0 z-300 flex items-center justify-center p-4 sm:p-8" :aria-label="t('imageZoom.ampliada', { alt })" @click="close">
          <div class="absolute inset-0 bg-slate-950/85 backdrop-blur-md" aria-hidden="true"></div>

          <div class="relative max-w-6xl w-full">
            <button
              type="button"
              class="absolute -top-12 right-0 inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-white text-sm font-bold hover:bg-teal-500 hover:border-teal-500 transition-colors cursor-pointer"
              :aria-label="t('imageZoom.cerrar')"
              @click="close"
            >
              <X :size="16" /> Cerrar
            </button>

            <img
              :src="src"
              :alt="alt"
              class="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/10"
              loading="lazy"
              @click.stop
            />
            <p class="mt-3 text-center text-sm text-slate-300 font-medium">{{ alt }}</p>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.zoom-fade-enter-active,
.zoom-fade-leave-active {
  transition: opacity 0.3s ease;
}
.zoom-fade-enter-from,
.zoom-fade-leave-to {
  opacity: 0;
}
</style>