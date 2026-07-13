<script setup>
import { computed } from 'vue'

const props = defineProps({
  show: Boolean,
  type: String // 'privacidad' o 'terminos'
})

const emit = defineEmits(['close'])

// Contenido de los documentos legales (Resumen Ejecutivo)
const legalContent = {
  privacidad: {
    title: "Aviso de Privacidad",
    date: "Última actualización: Julio 2026",
    text: [
      "Biadoxid Pharma S.R.L. valora su privacidad. Esta política resume cómo recopilamos y protegemos su información de acuerdo con la normativa vigente en el Estado Plurinacional de Bolivia y AGEMED.",
      "1. Naturaleza de los Datos: Nuestro sitio web no requiere creación de cuentas, logins ni contraseñas. La información que recibimos se limita a los datos que usted nos envía voluntariamente a través de nuestro correo oficial o formularios de contacto.",
      "2. Finalidad del Uso: Sus datos son utilizados exclusivamente para dar respuesta a sus procesos comerciales, consultas médicas o reportes de farmacovigilancia bajo estricta confidencialidad.",
      "3. Sus Derechos: Usted tiene el derecho de solicitar en cualquier momento la corrección o eliminación de la información de contacto que tengamos en nuestros registros de correo escribiendo a biadoxidpharma@outlook.com."
    ]
  },
  terminos: {
    title: "Términos y Condiciones",
    date: "Última actualización: Julio 2026",
    text: [
      "El acceso y uso del sitio web de Biadoxid Pharma S.R.L. están sujetos a las siguientes normativas comerciales y médicas aplicables.",
      "1. Plataforma Informativa: Este sitio tiene fines puramente informativos y de contacto. No procesamos cobros en línea. Asimismo, la información aquí contenida no sustituye el consejo o diagnóstico médico profesional.",
      "2. Modificaciones de Contenido: Nos reservamos el derecho absoluto de modificar, actualizar o eliminar el catálogo de productos, descripciones y cualquier contenido de la web en cualquier momento y sin previo aviso.",
      "3. Distribución y Propiedad: Todos los logotipos y textos están protegidos por derechos de autor. La venta de los fármacos listados está restringida exclusivamente a profesionales de la salud e instituciones médicas acreditadas."
    ]
  }
}

// Computada para saber qué contenido mostrar
const currentContent = computed(() => {
  return props.type ? legalContent[props.type] : null
})

// Función real de descarga
const handleDownloadPDF = () => {
  if (!props.type) return

  // Creamos un "diccionario" con los nombres EXACTOS de tus archivos PDF
  const nombresArchivos = {
    privacidad: 'Aviso de Privacidad - Biadoxid Pharma S.R.L 2026.pdf',
    terminos: 'Términos y Condiciones - Biadoxid Pharma S.R.L 2026.pdf'
  }

  const nombreExacto = nombresArchivos[props.type]
  const pdfUrl = `/documents/${nombreExacto}`

  const link = document.createElement('a')
  link.href = pdfUrl
  link.download = nombreExacto
  link.target = '_blank'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-pop">
      <div v-if="show && currentContent"
        class="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 overflow-hidden">

        <div class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" @click="emit('close')"></div>

        <div
          class="modal-box relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">

          <div
            class="bg-slate-950 p-5 md:p-6 flex justify-between items-center border-b border-teal-500/30 shrink-0 rounded-t-2xl">
            <div class="flex items-center gap-3 md:gap-4">
              <img src="/BIADOXID-PHARMA-LOGO.webp" alt="Logo Biadoxid" class="w-8 h-8 md:w-10 md:h-10 object-contain" />
              <div class="h-8 w-px bg-slate-800 hidden sm:block"></div>

              <LucideShieldCheck class="text-teal-400 hidden sm:block" :size="24" />
              <h3 class="text-lg md:text-xl font-bold text-white">
                {{ currentContent.title }}
              </h3>
            </div>
            <button @click="emit('close')"
              class="text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-lg">
              <LucideX :size="20" />
            </button>
          </div>

          <div class="p-6 md:p-8 overflow-y-auto bg-slate-50">
            <div class="flex items-center gap-2 mb-6 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <LucideCheckCircle2 :size="14" class="text-teal-500" />
              {{ currentContent.date }}
            </div>

            <div class="space-y-5 text-slate-600 leading-relaxed text-sm md:text-base">
              <p v-for="(paragraph, index) in currentContent.text" :key="index"
                :class="index === 0 ? 'font-medium text-slate-800' : ''">
                {{ paragraph }}
              </p>
            </div>
          </div>

          <div
            class="bg-white p-5 md:p-6 border-t border-slate-200 shrink-0 flex flex-col sm:flex-row justify-end gap-3 rounded-b-2xl">
            <button @click="emit('close')"
              class="px-6 py-2.5 text-slate-600 font-semibold hover:bg-slate-100 rounded-xl transition-colors text-sm">
              Cerrar documento
            </button>

            <button @click="handleDownloadPDF"
              class="px-6 py-2.5 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 font-bold rounded-xl transition-colors text-sm flex items-center justify-center gap-2 group">
              <LucideDownload :size="16" class="group-hover:translate-y-0.5 transition-transform" />
              Descargar versión PDF
            </button>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* 1. Animación del fondo (Fade) */
.modal-pop-enter-active,
.modal-pop-leave-active {
  transition: opacity 0.3s ease;
}

.modal-pop-enter-from,
.modal-pop-leave-to {
  opacity: 0;
}

/* 2. Animación de la caja blanca (Zoom y leve desplazamiento) */
.modal-pop-enter-active .modal-box,
.modal-pop-leave-active .modal-box {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-pop-enter-from .modal-box,
.modal-pop-leave-to .modal-box {
  transform: scale(0.95) translateY(10px);
  opacity: 0;
}
</style>