<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ArrowUp } from 'lucide-vue-next'

const { t } = useI18n()

const visible = ref(false)

const onScroll = () => {
  visible.value = window.scrollY > 400
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <Transition name="backtop">
    <button
      v-if="visible"
      type="button"
      class="fixed bottom-24 right-6 z-150 w-12 h-12 rounded-full bg-biadoxid-600 hover:bg-biadoxid-700 text-white shadow-lg shadow-biadoxid-900/30 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-biadoxid-900/40 cursor-pointer"
      :aria-label="t('backToTop.aria')"
      @click="scrollToTop"
    >
      <ArrowUp :size="22" :stroke-width="2.5" />
    </button>
  </Transition>
</template>

<style scoped>
.backtop-enter-active,
.backtop-leave-active {
  transition: all 0.3s ease;
}
.backtop-enter-from,
.backtop-leave-to {
  opacity: 0;
  transform: translateY(16px);
}
</style>