import { onMounted, onUnmounted } from 'vue'

export const useScrollReveal = () => {
  let observer

  onMounted(() => {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Agregamos las clases de visibilidad
          entry.target.classList.add('opacity-100', 'translate-y-0')
          entry.target.classList.remove('opacity-0', 'translate-y-10')
          
          // Lógica especial para los puntos de la línea de tiempo
          if (entry.target.classList.contains('timeline-dot')) {
            entry.target.classList.add('bg-teal-400', 'border-teal-400', 'scale-100')
            entry.target.classList.remove('bg-slate-800', 'border-slate-700', 'scale-50')
          }
        }
      })
    }

    const observerOptions = { 
      threshold: 0.2, 
      rootMargin: "0px 0px -50px 0px" 
    }

    observer = new IntersectionObserver(observerCallback, observerOptions)
    
    // Buscamos todos los elementos con la clase reveal
    const elements = document.querySelectorAll('.reveal-on-scroll')
    elements.forEach(el => observer.observe(el))
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })
}