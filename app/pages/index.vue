<script setup>
import { computed } from 'vue'

// 1. Importamos el JSON (Ruta relativa)
import catalogoBruto from '../data/catalogo.json'

// 2. Tomamos solo los primeros 6 productos para el Home
const productosDestacados = computed(() => {
  return catalogoBruto.slice(0, 6)
})

// 3. Paleta de colores dinámica adaptada para el nuevo diseño Holográfico
const colorThemes = [
  {
    gradientFrom: 'from-teal-600/30',
    gradientTo: 'to-slate-900',
    badgeText: 'text-teal-400'
  },
  {
    gradientFrom: 'from-blue-600/30',
    gradientTo: 'to-slate-900',
    badgeText: 'text-blue-400'
  },
  {
    gradientFrom: 'from-rose-600/30', // Un tono rosado/rojizo para productos dermatológicos (ARN)
    gradientTo: 'to-slate-900',
    badgeText: 'text-rose-400'
  }
]
// ... tus otros imports (catalogo, colorThemes, etc)

// --- VARIABLES PARA EL MODAL DE PRODUCTOS ---
const isProductModalOpen = ref(false)
const selectedProduct = ref(null)

const openProductModal = (producto) => {
  selectedProduct.value = producto
  isProductModalOpen.value = true
  // Evitar que el fondo haga scroll cuando el modal está abierto
  document.body.style.overflow = 'hidden'
}

const closeProductModal = () => {
  isProductModalOpen.value = false
  document.body.style.overflow = ''
}

// Funciones de utilidad
const getInitials = (name) => {
  if (!name) return 'PR'
  return name.substring(0, 3).toUpperCase() // Toma 3 letras como en tu captura "TNK", "ARN"
}

// 4. Función temporal para el botón de Ficha Técnica
const handleFichaClick = () => {
  // Aquí usamos un alert nativo, pero a futuro podrías usar una librería de Toasts de Vue
  alert("La Ficha Técnica no está disponible en este momento. El documento PDF se encuentra en proceso de solicitud al laboratorio.");
}
</script>

<template>
  <div>
    <header class="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950">
      <AbstractNetworkCanvas />

      <div
        class="absolute inset-0 bg-linear-to-b from-transparent via-slate-950/40 to-slate-50 pointer-events-none z-0">
      </div>

      <div
        class="max-w-7xl mx-auto px-6 md:px-8 relative z-10 w-full mt-24 lg:mt-20 grid lg:grid-cols-12 gap-12 items-center pointer-events-none">

        <div class="lg:col-span-7 pt-12 md:pt-0 pointer-events-auto">
          <div
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-md">
            <span class="w-2 h-2 rounded-full bg-teal-400 animate-pulse shadow-[0_0_8px_rgba(45,212,191,0.8)]"></span>
            La salud no espera. Nosotros tampoco.
          </div>

          <h2 class="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight">
            Garantizando el acceso a <span
              class="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-blue-500">medicamentos de alta
              calidad</span>
          </h2>

          <p class="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
            Importación y distribución eficiente de productos farmacéuticos innovadores y seguros a nivel nacional.
            Representación exclusiva de laboratorios internacionales.
          </p>

          <div class="flex flex-col sm:flex-row gap-5">
            <button
              class="bg-linear-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white px-8 py-4 rounded-full text-base font-bold transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] flex items-center justify-center gap-3">
              Explorar Productos
              <LucideArrowRight :size="18" />
            </button>
            <button
              class="bg-transparent hover:bg-white/5 border border-slate-600 text-white px-8 py-4 rounded-full text-base font-medium transition-all flex items-center justify-center">
              Portal Médico
            </button>
          </div>
        </div>

        <div
          class="lg:col-span-5 relative hidden md:block pointer-events-auto transform hover:-translate-y-2 transition-transform duration-500 mt-10 lg:mt-0">
          <div
            class="w-full h-96 lg:h-112.5 rounded-4xl overflow-hidden shadow-2xl relative border border-white/10 group">
            <div
              class="absolute inset-0 bg-[url('/HERO-IMAGEN.jpeg')] bg-cover bg-center opacity-40 mix-blend-luminosity group-hover:opacity-60 transition-opacity duration-700">
            </div>
            <div class="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

            <div
              class="absolute -top-10 -right-10 w-40 h-40 bg-teal-500 rounded-full mix-blend-screen filter blur-[60px] opacity-40">
            </div>

            <div class="absolute bottom-6 left-6 right-6 flex flex-col gap-3">
              <div
                class="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-lg flex items-center gap-4">
                <div class="p-2.5 bg-teal-500/20 text-teal-400 border border-teal-500/30 rounded-xl">
                  <LucideSnowflake :size="22" />
                </div>
                <div>
                  <h4 class="font-bold text-white text-sm leading-tight">Cadena de Frío</h4>
                  <p class="text-xs text-slate-400 mt-0.5">Conservación estricta y monitoreada</p>
                </div>
              </div>

              <div
                class="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-lg flex items-center gap-4">
                <div class="p-2.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl">
                  <LucideFileCheck :size="22" />
                </div>
                <div>
                  <h4 class="font-bold text-white text-sm leading-tight">Certificación AGEMED</h4>
                  <p class="text-xs text-slate-400 mt-0.5">Auditorías rigurosas por lote</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <section id="nosotros" class="py-32 bg-slate-50 relative z-20 overflow-hidden">
      <div class="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
        <div
          class="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-teal-100/50 rounded-full blur-3xl mix-blend-multiply">
        </div>
        <div
          class="absolute top-[40%] left-[-10%] w-[50%] h-[50%] bg-blue-100/50 rounded-full blur-3xl mix-blend-multiply">
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div class="grid lg:grid-cols-12 gap-16 items-start">

          <div class="lg:col-span-5 lg:sticky lg:top-32">
            <div
              class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-teal-600 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
              <LucideDna :size="14" class="animate-pulse" /> ADN Corporativo
            </div>
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
              Ciencia aplicada al servicio de la vida.
            </h2>
            <p class="text-slate-600 text-lg leading-relaxed mb-8 border-l-2 border-teal-500 pl-6">
              No somos solo distribuidores; somos el puente vital entre la innovación farmacéutica global y la salud de
              nuestra comunidad.
            </p>

            <div class="hidden lg:flex items-center gap-4 text-sm font-semibold text-slate-500 mt-12">
              <span class="w-12 h-px bg-slate-300"></span> Desliza para explorar
            </div>
          </div>

          <div class="lg:col-span-7 space-y-8">
            <div
              class="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white hover:-translate-y-2 transition-transform duration-500 group">
              <div class="flex flex-col sm:flex-row gap-8 items-start">
                <div
                  class="w-20 h-20 shrink-0 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500 shadow-inner">
                  <LucideTarget :size="36" :stroke-width="1.5" />
                </div>
                <div>
                  <h4 class="text-2xl font-extrabold text-slate-900 mb-4 tracking-tight">Nuestra Misión</h4>
                  <p class="text-slate-600 leading-relaxed text-lg font-light">
                    Garantizar el acceso ininterrumpido a medicamentos de alta especialidad a nivel nacional, mediante
                    una logística implacable y la representación exclusiva de laboratorios que cumplen los estándares
                    más exigentes del mundo.
                  </p>
                </div>
              </div>
            </div>

            <div
              class="bg-slate-950 p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-slate-800 hover:border-teal-500/30 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group">
              <div
                class="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl group-hover:bg-teal-500/20 transition-colors">
              </div>
              <div class="flex flex-col sm:flex-row gap-8 items-start relative z-10">
                <div
                  class="w-20 h-20 shrink-0 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform duration-500">
                  <LucideEye :size="36" :stroke-width="1.5" />
                </div>
                <div>
                  <h4 class="text-2xl font-extrabold text-white mb-4 tracking-tight">Nuestra Visión</h4>
                  <p class="text-slate-400 leading-relaxed text-lg font-light">
                    Ser reconocidos no solo como el principal importador de la región, sino como el <span
                      class="text-teal-400 font-medium">socio estratégico número uno</span> del sector médico público y
                    privado, redefiniendo la confiabilidad en la cadena de suministro en salud.
                  </p>
                </div>
              </div>
            </div>

            <div
              class="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white hover:-translate-y-2 transition-transform duration-500 group">
              <div class="flex flex-col sm:flex-row gap-8 items-start">
                <div
                  class="w-20 h-20 shrink-0 bg-teal-50 rounded-3xl flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-500 shadow-inner">
                  <LucideHeart :size="36" :stroke-width="1.5" />
                </div>
                <div class="w-full">
                  <h4 class="text-2xl font-extrabold text-slate-900 mb-6 tracking-tight">Valores Inquebrantables</h4>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="bg-slate-50 p-4 rounded-2xl flex items-center gap-3 border border-slate-100">
                      <div
                        class="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-teal-500 font-bold text-xs">
                        01</div>
                      <span class="font-semibold text-slate-700">Calidad Absoluta</span>
                    </div>
                    <div class="bg-slate-50 p-4 rounded-2xl flex items-center gap-3 border border-slate-100">
                      <div
                        class="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-teal-500 font-bold text-xs">
                        02</div>
                      <span class="font-semibold text-slate-700">Innovación</span>
                    </div>
                    <div class="bg-slate-50 p-4 rounded-2xl flex items-center gap-3 border border-slate-100">
                      <div
                        class="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-teal-500 font-bold text-xs">
                        03</div>
                      <span class="font-semibold text-slate-700">Integridad</span>
                    </div>
                    <div class="bg-slate-50 p-4 rounded-2xl flex items-center gap-3 border border-slate-100">
                      <div
                        class="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-teal-500 font-bold text-xs">
                        04</div>
                      <span class="font-semibold text-slate-700">Compromiso</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="productos" class="py-32 bg-slate-950 relative overflow-hidden">
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]">
      </div>
      <div
        class="absolute left-0 right-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-blue-500 opacity-20 blur-[100px]">
      </div>

      <div class="max-w-7xl mx-auto px-6 md:px-8 relative z-10">

        <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div class="max-w-2xl">
            <div
              class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs font-mono tracking-widest mb-4">
              [ DATABASE_ACCESSED ]
            </div>
            <h3 class="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Portafolio Clínico</h3>
            <p class="text-slate-400 text-lg font-light leading-relaxed">Representación exclusiva de laboratorios de
              clase mundial. Fármacos aprobados bajo los más rigurosos estándares internacionales de farmacopea.</p>
          </div>

          <button
            class="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-xl text-white font-semibold transition-all backdrop-blur-md">
            <span>Catálogo Completo</span>
            <div
              class="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-colors">
              <LucideChevronRight :size="18" />
            </div>
          </button>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          <div v-for="(producto, index) in productosDestacados" :key="producto.id"
            class="relative h-150 rounded-4xl overflow-hidden group cursor-pointer border border-slate-800 hover:border-slate-600 transition-all duration-500 shadow-lg">
            <div class="absolute inset-0 bg-slate-900"></div>

            <div
              :class="['absolute inset-0 bg-linear-to-br opacity-30 group-hover:opacity-60 transition-opacity duration-700', colorThemes[index % 3].gradientFrom, colorThemes[index % 3].gradientTo]">
            </div>

            <div class="absolute top-0 inset-x-0 h-[65%] p-8 flex items-center justify-center">
              <img :src="producto.image" :alt="producto.name"
                class="w-full h-full object-contain drop-shadow-2xl opacity-90 group-hover:opacity-100 transform group-hover:-translate-y-3 group-hover:scale-110 transition-all duration-700 ease-out" />
            </div>

            <div
              class="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/10 bg-slate-950/60 backdrop-blur-md flex items-center justify-center text-white font-bold text-sm z-20 shadow-xl group-hover:border-white/30 transition-colors">
              {{ getInitials(producto.name) }}
            </div>

            <div
              class="absolute bottom-2 left-2 right-2 rounded-3xl bg-slate-950/80 backdrop-blur-xl border border-white/10 p-5 transform transition-transform duration-500 z-30 flex flex-col justify-end">

              <span
                :class="['text-[10px] font-bold uppercase tracking-widest mb-1.5 block truncate', colorThemes[index % 3].badgeText]">
                {{ producto.category || 'Especialidad' }}
              </span>

              <h3 class="text-lg font-bold text-white mb-2 leading-tight truncate">
                {{ producto.name }}
              </h3>

              <div class="h-10 overflow-hidden relative mb-4">
                <p class="text-slate-400 text-xs leading-relaxed">
                  {{ producto.shortDescription }}
                </p>
                <div class="absolute bottom-0 left-0 w-full h-6 bg-linear-to-t from-[#0b1120] to-transparent"></div>
              </div>

              <div class="mt-auto pt-3 border-t border-white/10 flex items-center justify-between">

                <button @click.prevent="handleFichaClick"
                  class="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 hover:text-white transition-colors group/btn z-40 relative">
                  <LucideFileText :size="14" class="group-hover/btn:text-rose-400 transition-colors" />
                  <span>FICHA.PDF</span>
                </button>

                <button @click.prevent="openProductModal(producto)"
                  class="flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white transition-colors relative z-40">
                  <span>Detalles</span>
                  <div
                    class="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/20 transition-colors border border-white/5">
                    <LucideArrowRight :size="12"
                      class="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>
                </button>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

    <section id="logistica" class="py-32 bg-slate-950 text-white relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
        <div class="absolute w-200 h-200 border-100 border-white rounded-full -top-96 -left-48"></div>
      </div>

      <div class="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div class="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <div class="order-2 lg:order-1 relative">
            <div class="relative h-125 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] group">
              <div
                class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-50 mix-blend-luminosity group-hover:opacity-70 transition-opacity duration-700 group-hover:scale-105 transform">
              </div>
              <div class="absolute inset-0 bg-linear-to-r from-slate-950/80 to-transparent"></div>
              <div class="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-slate-950 to-transparent"></div>

              <div
                class="absolute bottom-8 left-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl max-w-50">
                <div class="text-teal-400 font-mono text-sm mb-1">CÁMARA DE FRÍO</div>
                <div class="text-2xl font-light text-white">2.0°C - 8.0°C</div>
              </div>
            </div>
            <div class="absolute -z-10 -bottom-8 -right-8 w-64 h-64 border border-teal-500/20 rounded-full"></div>
          </div>

          <div class="order-1 lg:order-2">
            <div
              class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
              Infraestructura Asegurada
            </div>
            <h3 class="text-4xl md:text-5xl font-black mb-6 leading-tight">Excelencia en cada eslabón de la <span
                class="text-teal-400">cadena logística.</span></h3>
            <p class="text-slate-400 text-lg mb-12 leading-relaxed">
              Como socios estratégicos de laboratorios internacionales de prestigio, no dejamos margen al error.
              Aseguramos la integridad absoluta de cada producto biológico y farmacéutico.
            </p>

            <div class="space-y-8">
              <div class="flex gap-5 group">
                <div
                  class="shrink-0 mt-1 w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300">
                  <LucideSnowflake :size="24" />
                </div>
                <div>
                  <h4 class="font-bold text-xl text-white mb-2">Cadena de Frío Garantizada</h4>
                  <p class="text-slate-400 leading-relaxed">Monitoreo ininterrumpido de temperatura durante el
                    almacenamiento, transporte e importación, validado con dataloggers.</p>
                </div>
              </div>

              <div class="flex gap-5 group">
                <div
                  class="shrink-0 mt-1 w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                  <LucideActivity :size="24" />
                </div>
                <div>
                  <h4 class="font-bold text-xl text-white mb-2">Experiencia Aduanera Integral</h4>
                  <p class="text-slate-400 leading-relaxed">Gestión ágil y especializada de la internación y despacho
                    aduanero, evitando demoras críticas para medicamentos de urgencia.</p>
                </div>
              </div>

              <div class="flex gap-5 group">
                <div
                  class="shrink-0 mt-1 w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300">
                  <LucideShieldCheck :size="24" />
                </div>
                <div>
                  <h4 class="font-bold text-xl text-white mb-2">Cumplimiento Normativo (AGEMED)</h4>
                  <p class="text-slate-400 leading-relaxed">Aval gubernamental estricto. Todos nuestros productos
                    cuentan con registro sanitario vigente y trazabilidad documental completa.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <SeccionPartners />
    <ProductModal 
      :show="isProductModalOpen" 
      :product="selectedProduct" 
      @close="closeProductModal"
      @change-product="(nuevoProducto) => selectedProduct = nuevoProducto"
    />
  </div>
</template>