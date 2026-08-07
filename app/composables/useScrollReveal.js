import { onMounted, onUnmounted } from 'vue'

export const useScrollReveal = () => {
  let observer
  let safetyTimer

  const reveal = (el) => {
    el.classList.add('opacity-100', 'translate-y-0')
    el.classList.remove('opacity-0', 'translate-y-10')
    if (el.classList.contains('timeline-dot')) {
      el.classList.add('bg-teal-400', 'border-teal-400', 'scale-100')
      el.classList.remove('bg-slate-800', 'border-slate-700', 'scale-50')
    }
  }

  onMounted(() => {
    const elements = document.querySelectorAll('.reveal-on-scroll')

    // Red de seguridad: navegadores muy antiguos sin IntersectionObserver
    // muestran todo el contenido de inmediato (nada queda invisible).
    if (typeof IntersectionObserver === 'undefined') {
      elements.forEach(reveal)
      return
    }

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) reveal(entry.target)
      })
    }

    // threshold 0: basta con que entre 1px al viewport para revelar. Antes con
    // 0.2, los contenedores altos en móviles (ej: el grid de 6 productos del
    // home en 1 columna) nunca alcanzaban el 20% visible del elemento y
    // quedaban invisibles para siempre (aunque el modal seguía abriéndose).
    const observerOptions = {
      threshold: 0,
      rootMargin: '0px 0px -50px 0px'
    }

    observer = new IntersectionObserver(observerCallback, observerOptions)
    elements.forEach(el => observer.observe(el))

    // Red de seguridad: si el observer no dispara (scrolls bruscos, contenedores
    // con scroll propio), revela lo que ya está en pantalla o se acaba de pasar
    // (top negativo). Revisa cada 1.5s durante los primeros ~12s y se detiene
    // cuando no queda nada oculto cerca del viewport.
    const checkPending = () => {
      elements.forEach(el => {
        if (el.classList.contains('opacity-0')) {
          const rect = el.getBoundingClientRect()
          if (rect.top < window.innerHeight * 1.5) reveal(el)
        }
      })
    }

    let checks = 0
    safetyTimer = setInterval(() => {
      const hidden = document.querySelectorAll('.reveal-on-scroll.opacity-0').length
      if (!hidden || ++checks >= 8) {
        clearInterval(safetyTimer)
        safetyTimer = null
        return
      }
      checkPending()
    }, 1500)
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
    if (safetyTimer) clearInterval(safetyTimer)
  })
}