<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref(null)
const containerRef = ref(null)

let animationFrameId
let resizeObserver

onMounted(() => {
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  
  let particles = []
  const particleCount = window.innerWidth < 768 ? 30 : 50
  const connectionDistance = 180
  const connDistSq = connectionDistance * connectionDistance
  let mouse = { x: null, y: null, radius: 150 }

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 2
      this.vx = (Math.random() - 0.5) * 0.2
      this.vy = (Math.random() - 0.5) * 0.2
    }

    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(20, 184, 166, 0.4)' // Teal-500 con opacidad
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
        if (dx * dx + dy * dy < mouse.radius * mouse.radius) {
          this.x -= dx * 0.01
          this.y -= dy * 0.01
        }
      }
    }
  }

  const init = () => {
    particles = []
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    for (let i = 0; i < particles.length; i++) {
      particles[i].update()
      particles[i].draw()
      
      for (let j = i + 1; j < particles.length; j++) {
        let dx = particles[i].x - particles[j].x
        let dy = particles[i].y - particles[j].y
        let distSq = dx * dx + dy * dy
        
        if (distSq < connDistSq) {
          let opacity = (1 - (distSq / connDistSq)) * 0.15
          ctx.strokeStyle = `rgba(14, 165, 233, ${opacity})` // Sky-500
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
      canvas.width = entry.contentRect.width
      canvas.height = entry.contentRect.height
      init() // Reiniciamos partículas al redimensionar
    }
  })

  if (containerRef.value) {
    resizeObserver.observe(containerRef.value)
  }

  const handleMouseMove = (e) => {
    const rect = canvas.getBoundingClientRect()
    mouse.x = e.clientX - rect.left
    mouse.y = e.clientY - rect.top
  }

  const handleMouseLeave = () => {
    mouse.x = null
    mouse.y = null
  }

  canvas.addEventListener('mousemove', handleMouseMove)
  canvas.addEventListener('mouseleave', handleMouseLeave)

  init()
  animate()

  onBeforeUnmount(() => {
    cancelAnimationFrame(animationFrameId)
    resizeObserver.disconnect()
    canvas.removeEventListener('mousemove', handleMouseMove)
    canvas.removeEventListener('mouseleave', handleMouseLeave)
  })
})
</script>

<template>
  <div ref="containerRef" class="absolute inset-0 w-full h-full z-0 overflow-hidden">
    <canvas ref="canvasRef" class="w-full h-full pointer-events-auto" />
  </div>
</template>