<script setup>
import { ref, nextTick } from 'vue'

const { t } = useI18n()

const isOpen = ref(false)
const message = ref('')
const inputRef = ref(null)

const PHONE = '59176265905'

const toggle = async () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    await nextTick()
    inputRef.value?.focus()
  }
}

const sendMessage = () => {
  const text = message.value.trim() || t('whatsapp.defaultMsg')
  const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`
  window.open(url, '_blank', 'noopener,noreferrer')
  message.value = ''
}
</script>

<template>
  <div class="fixed bottom-6 right-6 z-160 flex flex-col items-end gap-4">
    <!-- Mini chat simulado -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 translate-y-4 scale-95"
      leave-to-class="opacity-0 translate-y-4 scale-95"
    >
      <div
        v-if="isOpen"
        class="w-[calc(100vw-3rem)] max-w-90 origin-bottom-right rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white"
        role="dialog"
        aria-label="Chat de WhatsApp"
      >
        <!-- Cabecera -->
        <div class="bg-linear-to-r from-[#075E54] to-[#128C7E] p-4 flex items-center gap-3">
          <div
            class="w-11 h-11 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white shrink-0">
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-white font-bold text-sm leading-tight">{{ t('whatsapp.title') }}</p>
            <p class="text-teal-100 text-xs flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              {{ t('whatsapp.online') }}
            </p>
          </div>
          <button
            type="button"
            class="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer shrink-0"
            :aria-label="t('imageZoom.cerrar')"
            @click="isOpen = false"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Conversación simulada -->
        <div class="p-4 bg-[#ECE5DD] min-h-40 flex flex-col justify-end gap-3">
          <div class="max-w-[85%] self-start">
            <div class="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <p class="text-sm text-slate-700 leading-relaxed">{{ t('whatsapp.greeting') }}</p>
            </div>
            <span class="text-[10px] text-slate-500 mt-1 ml-1 block">09:00</span>
          </div>
        </div>

        <!-- Entrada + botón enviar -->
        <div class="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
          <input
            ref="inputRef"
            v-model="message"
            type="text"
            class="flex-1 min-w-0 bg-slate-100 border border-transparent focus:border-teal-400 focus:bg-white rounded-full px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-hidden transition-all"
            :placeholder="t('whatsapp.placeholder')"
            @keyup.enter="sendMessage"
          />
          <button
            type="button"
            class="w-11 h-11 shrink-0 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center shadow-lg shadow-green-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            :aria-label="t('whatsapp.send')"
            @click="sendMessage"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </Transition>

    <!-- Botón flotante -->
    <button
      type="button"
      class="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center shadow-xl shadow-green-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/50 cursor-pointer group"
      :aria-label="t('whatsapp.openAria')"
      @click="toggle"
    >
      <span class="absolute inset-0 rounded-full bg-green-400/40 animate-ping"></span>
      <svg
        class="w-7 h-7 fill-current relative"
        :class="isOpen ? 'scale-0 opacity-0 transition-all duration-200' : 'scale-100 opacity-100 transition-all duration-200'"
        viewBox="0 0 24 24"
      >
        <path
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
      <svg
        class="w-5 h-5 absolute"
        :class="isOpen ? 'scale-100 opacity-100 transition-all duration-200' : 'scale-0 opacity-0 transition-all duration-200'"
        fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>
