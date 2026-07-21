<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref(null)
const containerRef = ref(null)

// Declaramos las variables fuera para poder limpiarlas cuando el componente se destruya
let animationFrameId
let resizeObserver
let handleMouseMove
let handleMouseLeave
let visibilityObserver
let isVisible = true // ← Nueva flag para pausar/reanudar animación

onMounted(() => {
  // En Vue, accedemos al elemento del DOM usando .value en lugar de .current
  const canvas = canvasRef.value
  const container = containerRef.value
  const ctx = canvas.getContext('2d')
  
  let particles = []
  const particleCount = window.innerWidth < 768 ? 40 : 80
  const connectionDistance = 150
  const connDistSq = connectionDistance * connectionDistance
  let mouse = { x: null, y: null, radius: 200 }

  const initParticles = () => {
    particles = []
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }
  }

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 2 + 0.5
      this.density = (Math.random() * 30) + 1
      this.vx = (Math.random() - 0.5) * 0.5
      this.vy = (Math.random() - 0.5) * 0.5
    }

    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.closePath()
      ctx.fill()
    }

    update() {
      this.x += this.vx
      this.y += this.vy

      if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx
      if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy

      if (mouse.x != null && mouse.y != null) {
        let dx = mouse.x - this.x
        let dy = mouse.y - this.y
        let distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance
          const forceDirectionY = dy / distance
          const force = (mouse.radius - distance) / mouse.radius
          const directionX = forceDirectionX * force * this.density * 0.6
          const directionY = forceDirectionY * force * this.density * 0.6
          
          this.x -= directionX
          this.y -= directionY
        }
      }
    }
  }

  const animate = () => {
    // Si el canvas no es visible, saltamos el frame (ahorra CPU/batería)
    if (!isVisible) {
      animationFrameId = requestAnimationFrame(animate)
      return
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'rgba(20, 184, 166, 0.8)' // Teal-500
    
    for (let i = 0; i < particles.length; i++) {
      particles[i].update()
      particles[i].draw()
      
      for (let j = i + 1; j < particles.length; j++) {
        let dx = particles[i].x - particles[j].x
        let dy = particles[i].y - particles[j].y
        let distSq = dx * dx + dy * dy
        
        if (distSq < connDistSq) {
          let opacity = 1 - (distSq / connDistSq)
          ctx.strokeStyle = `rgba(14, 165, 233, ${opacity * 0.4})` // Sky-500
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }
    animationFrameId = requestAnimationFrame(animate)
  }

  resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      if (entry.contentBoxSize) {
        canvas.width = entry.contentRect.width
        canvas.height = entry.contentRect.height
        particles.forEach(p => {
            if (p.x > canvas.width) p.x = canvas.width - 10
            if (p.y > canvas.height) p.y = canvas.height - 10
        })
      }
    }
  })

  if (container) {
    canvas.width = container.clientWidth
    canvas.height = container.clientHeight
    resizeObserver.observe(container)
  }
  
  initParticles()
  animate()

  handleMouseMove = (e) => {
    const rect = canvas.getBoundingClientRect()
    mouse.x = e.clientX - rect.left
    mouse.y = e.clientY - rect.top
  }
  
  handleMouseLeave = () => {
    mouse.x = null
    mouse.y = null
  }

  canvas.addEventListener('mousemove', handleMouseMove)
  canvas.addEventListener('mouseleave', handleMouseLeave)

  // === IntersectionObserver: pausa la animación cuando el canvas no está visible ===
  visibilityObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting
    })
  }, { threshold: 0.1 })

  if (container) {
    visibilityObserver.observe(container)
  }
})

// Limpiamos los eventos cuando el componente se destruye (equivalente al return en useEffect)
onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId)
  if (resizeObserver) resizeObserver.disconnect()
  if (visibilityObserver) visibilityObserver.disconnect()
  if (canvasRef.value) {
    canvasRef.value.removeEventListener('mousemove', handleMouseMove)
    canvasRef.value.removeEventListener('mouseleave', handleMouseLeave)
  }
})
</script>

<template>
  <div ref="containerRef" class="absolute inset-0 w-full h-full z-0 overflow-hidden">
    <canvas 
      ref="canvasRef" 
      class="w-full h-full pointer-events-auto block"
      style="background: linear-gradient(to bottom right, #020617, #0f172a, #082f49);"
    />
  </div>
</template>