<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { Clock, FlaskConical, Pill } from 'lucide-vue-next'

const props = defineProps({
  value: { type: Number, required: true },
  suffix: { type: String, default: '' },
  label: { type: String, required: true },
  icon: { type: String, default: 'clock' }, // 'clock' | 'flask' | 'pill'
  duration: { type: Number, default: 2000 },
  dark: { type: Boolean, default: false }, // sobre fondos oscuros (hero vino Biadoxid)
  minimal: { type: Boolean, default: false }, // sin caja de icono: número + etiqueta con punto rojo (hero actual)
  autoplay: { type: Boolean, default: false }, // arranca el conteo al montar, sin esperar a entrar en pantalla
  startDelay: { type: Number, default: 0 } // ms de espera antes del conteo con autoplay (sincroniza con la entrada animada)
})

const icons = { clock: Clock, flask: FlaskConical, pill: Pill }
const currentIcon = computed(() => icons[props.icon] || Clock)

const displayed = ref(0)
const elRef = ref(null)
let observer = null
let startTimeout = null

// Conteo animado con ease-out cúbico (con movimiento reducido muestra el valor final de inmediato)
const runCount = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    displayed.value = props.value
    return
  }
  const start = performance.now()
  const step = (now) => {
    const elapsed = now - start
    const progress = Math.min(elapsed / props.duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    displayed.value = Math.round(eased * props.value)
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

onMounted(() => {
  // autoplay: las métricas del hero son señal de confianza y deben contarse desde la carga,
  // con un pequeño retraso opcional para que el conteo sea visible durante la entrada animada
  if (props.autoplay) {
    if (props.startDelay > 0) {
      startTimeout = setTimeout(runCount, props.startDelay)
    } else {
      runCount()
    }
    return
  }
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        runCount()
        observer.disconnect()
      }
    },
    { threshold: 0.5 }
  )
  if (elRef.value) observer.observe(elRef.value)
})

onBeforeUnmount(() => {
  if (startTimeout) clearTimeout(startTimeout)
  if (observer) observer.disconnect()
})
</script>

<template>
  <div ref="elRef" :class="minimal ? 'text-left' : 'text-center'">

    <template v-if="minimal">
      <span class="block text-3xl md:text-4xl font-black text-white leading-none tracking-tight">
        <span class="inline-flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-biadoxid-500 shrink-0 self-center shadow-[0_0_8px_rgba(245,0,0,0.8)]"></span>
          <span>{{ displayed }}{{ suffix }}</span>
        </span>
      </span>
      <!-- min-h-[2.5em]: evita que un label de 2 líneas desalinee las métricas -->
      <span class="block mt-2 text-[10px] md:text-xs font-bold text-white/70 uppercase tracking-widest leading-tight min-h-[2.5em]">
        {{ label }}
      </span>
    </template>


    <template v-else>
      <div
        :class="dark
          ? 'mx-auto mb-2.5 w-11 h-11 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 transition-all duration-300 hover:bg-teal-500 hover:text-white hover:shadow-[0_0_15px_rgba(244,0,1,0.45)]'
          : 'mx-auto mb-2.5 w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-500 transition-all duration-300 hover:bg-teal-500 hover:text-white hover:shadow-[0_0_15px_rgba(244,0,1,0.35)]'">
        <component :is="currentIcon" :size="20" :stroke-width="1.8" />
      </div>
      <span :class="dark ? 'block text-3xl md:text-4xl font-black text-white leading-none tracking-tight' : 'block text-3xl md:text-4xl font-black text-teal-500 leading-none tracking-tight'">
        {{ displayed }}{{ suffix }}
      </span>
      <span :class="dark ? 'block mt-1.5 text-xs font-semibold text-white/60 uppercase tracking-widest leading-tight whitespace-pre-line' : 'block mt-1.5 text-xs font-semibold text-slate-500 uppercase tracking-widest leading-tight whitespace-pre-line'">
        {{ label }}
      </span>
    </template>
  </div>
</template>
