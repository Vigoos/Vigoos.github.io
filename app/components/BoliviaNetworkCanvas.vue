<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { citiesData, routesData } from '../data/boliviaMapData'

// Notifica al panel flotante cuántas unidades están en ruta (base 15 + activas)
const emit = defineEmits(['transport-count'])

const canvasRef = ref(null)
const containerRef = ref(null)

let animationFrameId
let resizeObserver
let visibilityObserver
let isVisible = true
let isAnimating = false
const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

onMounted(() => {
  const canvas = canvasRef.value
  const container = containerRef.value
  const ctx = canvas.getContext('2d')

  let width = 0
  let height = 0
  let cities = []
  let routes = []
  let transports = []

  // Paleta: el rojo se reserva para hub + pulsos. Todo lo estructural es gris neutro.
  const colors = {
    hub: '#E11D2E',                    // rojo de marca — hub La Paz
    node: '#71717A',                   // gris oscuro — ciudades secundarias
    activeLine: 'rgba(113,113,122,0.55)', // arcos base, gris más visible
    transport: '#E11D2E',              // cabeza del pulso — rojo
    shadow: 'rgba(225,29,46,0.45)'     // sombra suave del glow
  }

  const buildNetwork = () => {
    cities = citiesData.map(c => ({
      ...c,
      px: c.x * width,
      py: c.y * height,
      pulseRadius: 0
    }))

    const CURVATURE = 0.16
    routes = routesData.map(route => {
      const start = cities.find(c => c.id === route[0])
      const end = cities.find(c => c.id === route[1])

      // Punto de control de la curva bezier: perpendicular al segmento start->end,
      // en el mismo sentido de rotación → efecto de "abanico" de rutas aéreas.
      const dx = end.px - start.px
      const dy = end.py - start.py
      const dist = Math.hypot(dx, dy)
      const midX = (start.px + end.px) / 2
      const midY = (start.py + end.py) / 2
      const perpX = dist === 0 ? 0 : -dy / dist
      const perpY = dist === 0 ? 0 : dx / dist
      const controlX = midX + perpX * dist * CURVATURE
      const controlY = midY + perpY * dist * CURVATURE

      return { start, end, controlX, controlY }
    })

    transports = [] // Reiniciar transportes al redimensionar
  }

  const initCanvas = () => {
    // Densidad Retina con tope 2x (evita triplicar el área de dibujo en pantallas 3x)
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const rect = container.getBoundingClientRect()

    width = rect.width
    height = rect.height

    canvas.width = Math.max(1, Math.round(width * dpr))
    canvas.height = Math.max(1, Math.round(height * dpr))
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    buildNetwork()
  }

  class Transport {
    constructor() {
      this.route = routes[Math.floor(Math.random() * routes.length)]

      this.reverse = Math.random() > 0.5
      this.startCity = this.reverse ? this.route.end : this.route.start
      this.endCity = this.reverse ? this.route.start : this.route.end

      this.progress = 0
      this.speed = Math.random() * 0.004 + 0.002
      this.active = true

      this.history = []
    }

    update() {
      this.progress += this.speed

      // Interpolación cuadrática sobre el mismo arco que se dibuja
      // (no la línea recta), para que el punto "vuele" sobre la curva.
      const t = this.reverse ? 1 - this.progress : this.progress
      const p0 = this.route.start
      const p1 = this.route.end
      const cx = this.route.controlX
      const cy = this.route.controlY
      const oneMinusT = 1 - t
      const currentX = oneMinusT * oneMinusT * p0.px + 2 * oneMinusT * t * cx + t * t * p1.px
      const currentY = oneMinusT * oneMinusT * p0.py + 2 * oneMinusT * t * cy + t * t * p1.py

      this.history.push({ x: currentX, y: currentY })
      if (this.history.length > 10) this.history.shift()

      if (this.progress >= 1) {
        this.active = false
      }
    }

    draw() {
      if (!this.active) return

      if (this.history.length > 1) {
        ctx.beginPath()
        ctx.moveTo(this.history[0].x, this.history[0].y)
        for (let i = 1; i < this.history.length; i++) {
          ctx.lineTo(this.history[i].x, this.history[i].y)
        }
        ctx.strokeStyle = colors.hub
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        ctx.globalAlpha = 0.5
        ctx.stroke()
        ctx.globalAlpha = 1
      }

      const pos = this.history[this.history.length - 1]
      if (pos) {
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = colors.transport
        ctx.shadowColor = colors.hub
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }
  }

  const animate = () => {
    // Si el canvas no es visible, detenemos el bucle por completo (ahorra CPU/batería)
    if (!isVisible) {
      isAnimating = false
      return
    }

    ctx.clearRect(0, 0, width, height)

    routes.forEach(route => {
      if (!route.start || !route.end) return
      ctx.beginPath()
      ctx.moveTo(route.start.px, route.start.py)
      ctx.quadraticCurveTo(route.controlX, route.controlY, route.end.px, route.end.py)
      ctx.strokeStyle = colors.activeLine
      ctx.lineWidth = 1
      ctx.setLineDash([4, 4]) // todas las rutas salen de la sede central (La Paz)
      ctx.stroke()
      ctx.setLineDash([])
    })

    // Actualizar y dibujar transportes (Pulsos)
    if (Math.random() < 0.05 && transports.length < 25) {
      transports.push(new Transport())
      emit('transport-count', transports.length + 15)
    }

    for (let i = transports.length - 1; i >= 0; i--) {
      transports[i].update()
      transports[i].draw()
      if (!transports[i].active) {
        transports[i].endCity.pulseRadius = 15
        transports.splice(i, 1)
        emit('transport-count', transports.length + 15)
      }
    }

    // Dibujar ciudades (Nodos)
    cities.forEach(city => {
      // Anillo de radar permanente para la sede central (La Paz), para que
      // se lea de inmediato como el origen de la red, no solo un hub más.
      if (city.isHub) {
        const t = (Date.now() % 2200) / 2200
        ctx.beginPath()
        ctx.arc(city.px, city.py, 6 + t * 22, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(225, 29, 46, ${(1 - t) * 0.4})`
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      // Pulso de llegada
      if (city.pulseRadius > 0) {
        ctx.beginPath()
        ctx.arc(city.px, city.py, 15 - city.pulseRadius + 4, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(225, 29, 46, ${(city.pulseRadius / 15).toFixed(3)})`
        ctx.lineWidth = 1
        ctx.stroke()
        city.pulseRadius -= 0.5
      }

      // Nodo principal
      ctx.beginPath()
      const radius = city.isHub ? 5 : 3
      ctx.arc(city.px, city.py, radius, 0, Math.PI * 2)
      ctx.fillStyle = city.isHub ? colors.hub : colors.node

      if (city.isHub) {
        ctx.shadowColor = colors.shadow
        ctx.shadowBlur = 8
      }
      ctx.fill()
      ctx.shadowBlur = 0

      // Etiquetas (nombres de ciudades)
      ctx.font = city.isHub ? "bold 11px 'JetBrains Mono', monospace" : "10px 'JetBrains Mono', monospace"
      ctx.fillStyle = city.isHub ? '#18181B' : '#71717A'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'

      // Ajuste de posición para no tapar los nodos
      let textX = city.px + 10
      let textY = city.py
      if (city.id === 'LPZ') textX = city.px - 45
      if (city.id === 'ORU') textX = city.px - 45
      if (city.id === 'PTI') textX = city.px - 45

      ctx.fillText(city.name, textX, textY)

      // Etiqueta secundaria para la sede central
      if (city.isHub) {
        ctx.font = "9px 'JetBrains Mono', monospace"
        ctx.fillStyle = colors.hub
        ctx.fillText('SEDE CENTRAL', textX, textY + 13)
      }
    })

    if (!reducedMotion) animationFrameId = requestAnimationFrame(animate)
  }

  // Arranca (o reanuda) el bucle de animación
  const start = () => {
    if (isAnimating || reducedMotion) return
    isAnimating = true
    animate()
  }

  initCanvas()
  if (reducedMotion) animate() // un solo frame: red estática
  else start()

  resizeObserver = new ResizeObserver(() => initCanvas())
  if (container) resizeObserver.observe(container)

  visibilityObserver = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting
    if (isVisible) start()
  }, { threshold: 0.1 })
  if (container) visibilityObserver.observe(container)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId)
  if (resizeObserver) resizeObserver.disconnect()
  if (visibilityObserver) visibilityObserver.disconnect()
})
</script>

<template>
  <div ref="containerRef" class="absolute inset-0 z-10 overflow-hidden pointer-events-none">
    <canvas ref="canvasRef" class="block w-full h-full" />
  </div>
</template>
