<script setup>
import { ref, reactive, computed } from 'vue'

const formStatus = ref('idle') // idle, submitting, success, error
const submitted = ref(false)

// 1. Instanciamos la configuración de Nuxt para leer la llave pública
const config = useRuntimeConfig()

const formData = reactive({
  nombre: '',
  email: '',
  institucion: '',
  area: 'ventas',
  mensaje: ''
})

// === VALIDACIÓN EN TIEMPO REAL ===
const errors = reactive({
  nombre: '',
  email: '',
  mensaje: ''
})

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validateField = (field) => {
  const val = formData[field].trim()
  if (field === 'nombre') {
    errors.nombre = !val ? 'El nombre es obligatorio' : val.length < 3 ? 'Mínimo 3 caracteres' : ''
  } else if (field === 'email') {
    errors.email = !val ? 'El email es obligatorio' : !emailRegex.test(val) ? 'Email no válido' : ''
  } else if (field === 'mensaje') {
    errors.mensaje = !val ? 'El mensaje es obligatorio' : val.length < 10 ? 'Mínimo 10 caracteres' : ''
  }
}

const isFormValid = computed(() => {
  return (
    formData.nombre.trim().length >= 3 &&
    emailRegex.test(formData.email.trim()) &&
    formData.mensaje.trim().length >= 10
  )
})

const buildPayload = () => ({
  subject: `Nueva consulta - ${formData.area}`,
  from_name: formData.nombre,
  nombre: formData.nombre,
  email: formData.email,
  institucion: formData.institucion || 'No especificada',
  area: formData.area,
  mensaje: formData.mensaje
})

const handleSubmit = async () => {
  // Validar todos los campos antes de enviar
  validateField('nombre')
  validateField('email')
  validateField('mensaje')

  if (!isFormValid.value) {
    submitted.value = true
    return
  }

  formStatus.value = 'submitting'

  const payload = buildPayload()

  // 1) Intentamos el server route proxy (key NO expuesta)
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error('Server route not available')
    }

    const result = await response.json()

    if (result.success) {
      formStatus.value = 'success'
      resetForm()
      return
    }
  } catch (err) {
    console.warn('Server route falló, usando Web3Forms directo:', err.message)
  }

  // 2) FALLBACK: Web3Forms directo con key pública (funciona en static)
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: config.public.web3formsKey,
        ...payload
      })
    })

    const result = await response.json()

    if (result.success) {
      formStatus.value = 'success'
      resetForm()
    } else {
      formStatus.value = 'error'
    }
  } catch (err) {
    console.error('Error al enviar el formulario:', err)
    formStatus.value = 'error'
  }
}

const resetForm = () => {
  setTimeout(() => {
    formStatus.value = 'idle'
    submitted.value = false
    Object.assign(formData, {
      nombre: '',
      email: '',
      institucion: '',
      area: 'ventas',
      mensaje: ''
    })
    Object.assign(errors, { nombre: '', email: '', mensaje: '' })
  }, 5000)
}
</script>

<template>
  <section class="py-12 relative z-20 -mt-16">
    <div class="max-w-7xl mx-auto px-6 md:px-8">
      <div class="grid lg:grid-cols-5 gap-12 lg:gap-16">
        
        <div class="lg:col-span-2 space-y-8">
          
          <div class="bg-slate-950 border border-slate-200 rounded-3xl p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
            <h3 class="text-2xl font-bold text-white mb-8">Sede Central</h3>
            
            <ul class="space-y-8">
              <li class="flex items-start gap-4 group">
                <div class="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300">
                  <LucideMapPin :size="22" />
                </div>
                <div>
                  <h4 class="text-teal-400 font-bold mb-1">Dirección Legal</h4>
                  <p class="text-slate-400 text-sm leading-relaxed">
                    Av. Simón Bolívar, Edificio Altar II<br />
                    Piso 2, Oficina 1 (Zona Miraflores)<br />
                    La Paz, Bolivia
                  </p>
                </div>
              </li>

              <li class="flex items-start gap-4 group">
                <div class="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                  <LucidePhone :size="22" />
                </div>
                <div>
                  <h4 class="text-teal-400 font-bold mb-1">Líneas de Atención</h4>
                  <p class="text-slate-400 text-sm font-mono">+591 69105198 / 76265905</p>
                </div>
              </li>

              <li class="flex items-start gap-4 group">
                <div class="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                  <LucideClock :size="22" />
                </div>
                <div>
                  <h4 class="text-teal-400 font-bold mb-1">Horarios</h4>
                  <p class="text-slate-400 text-sm">Lun - Vie: 9:00 - 20:00</p>
                  <p class="text-rose-500 text-xs font-bold mt-1">Sábado y Domingo: Cerrado</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="bg-linear-to-br from-blue-50 to-white border border-blue-100 rounded-3xl p-8 relative overflow-hidden">
            <LucideShieldCheck :size="120" class="absolute -right-8 -top-8 text-blue-500/5" />
            <div class="flex items-center gap-3 mb-4 relative z-10">
              <LucideAlertCircle class="text-blue-600" :size="24" />
              <h3 class="text-lg font-bold text-slate-900">Farmacovigilancia</h3>
            </div>
            <p class="text-sm text-slate-600 mb-5 relative z-10">Reporte eventos adversos o solicite información médica técnica.</p>
            <a href="mailto:biadoxidpharma@outlook.com" class="inline-flex items-center gap-2 text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors bg-white px-4 py-2 rounded-xl shadow-xs border border-slate-100 relative z-10">
              <LucideMail :size="16" /> Contactar área médica
            </a>
          </div>
        </div>

        <div class="lg:col-span-3">
          <div class="bg-white border border-slate-200 rounded-4xl p-8 md:p-12 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
            <div v-if="formStatus === 'success'" class="text-center py-10 animate-in fade-in zoom-in duration-500">
              <div class="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                <LucideCheckCircle2 :size="40" />
              </div>
              <h3 class="text-2xl font-bold text-slate-900">Mensaje Enviado</h3>
              <p class="text-slate-500 mt-2">Nos comunicaremos con usted a la brevedad.</p>
            </div>

            <div v-else-if="formStatus === 'error'" class="text-center py-10">
              <div class="w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                <LucideAlertCircle :size="40" />
              </div>
              <h3 class="text-2xl font-bold text-slate-900">No se pudo enviar</h3>
              <p class="text-slate-500 mt-2">
                Intenta de nuevo o escríbenos directo a
                <a href="mailto:biadoxidpharma@outlook.com" class="text-teal-600 font-bold underline">biadoxidpharma@outlook.com</a>
              </p>
              <button @click="formStatus = 'idle'" class="mt-6 text-sm font-bold text-slate-600 underline">
                Volver a intentar
              </button>
            </div>

            <form v-else @submit.prevent="handleSubmit" class="space-y-6" novalidate>
              <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Nombre Completo *</label>
                  <input 
                    v-model="formData.nombre" 
                    type="text" 
                    @input="validateField('nombre')"
                    @blur="validateField('nombre')"
                    :class="['w-full rounded-xl px-4 py-3.5 focus:outline-hidden focus:ring-2 transition-all', errors.nombre && submitted ? 'bg-rose-50 border border-rose-300 focus:border-rose-500 focus:ring-rose-500/20' : 'bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-teal-500/20']"
                    placeholder="Dr. Juan Pérez"
                  />
                  <p v-if="errors.nombre && submitted" class="text-rose-500 text-xs font-medium flex items-center gap-1">
                    <LucideAlertCircle :size="12" /> {{ errors.nombre }}
                  </p>
                </div>
                <div class="space-y-2">
                  <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Email *</label>
                  <input 
                    v-model="formData.email" 
                    type="email" 
                    @input="validateField('email')"
                    @blur="validateField('email')"
                    :class="['w-full rounded-xl px-4 py-3.5 focus:outline-hidden focus:ring-2 transition-all', errors.email && submitted ? 'bg-rose-50 border border-rose-300 focus:border-rose-500 focus:ring-rose-500/20' : 'bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-teal-500/20']"
                    placeholder="contacto@ejemplo.com"
                  />
                  <p v-if="errors.email && submitted" class="text-rose-500 text-xs font-medium flex items-center gap-1">
                    <LucideAlertCircle :size="12" /> {{ errors.email }}
                  </p>
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Institución</label>
                  <input v-model="formData.institucion" type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-hidden focus:border-teal-500 transition-all" placeholder="Clínica / Hospital" />
                </div>
                <div class="space-y-2">
                  <label for="contact-area" class="text-xs font-bold text-slate-500 uppercase tracking-wider">Área de Consulta</label>
                  <select id="contact-area" v-model="formData.area" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-hidden focus:border-teal-500 transition-all cursor-pointer">
                    <option value="ventas">Ventas Corporativas</option>
                    <option value="info">Información Médica</option>
                    <option value="proveedores">Proveedores</option>
                    <option value="otros">General</option>
                  </select>
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Mensaje *</label>
                <textarea 
                  v-model="formData.mensaje" 
                  rows="4" 
                  @input="validateField('mensaje')"
                  @blur="validateField('mensaje')"
                  :class="['w-full rounded-xl px-4 py-3.5 focus:outline-hidden focus:ring-2 transition-all resize-none', errors.mensaje && submitted ? 'bg-rose-50 border border-rose-300 focus:border-rose-500 focus:ring-rose-500/20' : 'bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-teal-500/20']"
                  placeholder="¿Cómo podemos ayudarle?"
                ></textarea>
                <p v-if="errors.mensaje && submitted" class="text-rose-500 text-xs font-medium flex items-center gap-1">
                  <LucideAlertCircle :size="12" /> {{ errors.mensaje }}
                </p>
              </div>

              <button 
                type="submit" 
                :disabled="formStatus === 'submitting'"
                class="w-full md:w-auto bg-linear-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-teal-500/40 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <template v-if="formStatus === 'submitting'">
                  <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Procesando...
                </template>
                <template v-else>
                  Enviar Mensaje Seguro <LucideSend :size="16" />
                </template>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>