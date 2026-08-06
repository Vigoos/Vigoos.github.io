<script setup>
import { ref, reactive, computed } from 'vue'

const { t } = useI18n()

// Animación de entrada de las tarjetas al hacer scroll
useScrollReveal()

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
    errors.nombre = !val ? t('contactForm.errNombreRequired') : val.length < 3 ? t('contactForm.errNombreMin') : ''
  } else if (field === 'email') {
    errors.email = !val ? t('contactForm.errEmailRequired') : !emailRegex.test(val) ? t('contactForm.errEmailInvalid') : ''
  } else if (field === 'mensaje') {
    errors.mensaje = !val ? t('contactForm.errMensajeRequired') : val.length < 10 ? t('contactForm.errMensajeMin') : ''
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
          
          <div class="reveal-on-scroll opacity-0 translate-y-10 relative overflow-hidden bg-linear-to-br from-[#F40001] via-[#B30000] to-[#7F0000] border border-white/10 rounded-3xl p-8 shadow-[0_20px_40px_-15px_rgba(180,0,0,0.25)]" style="transition-delay: 0ms">
            <div class="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl" aria-hidden="true"></div>
            <h3 class="text-2xl font-bold text-white mb-8 relative z-10">{{ t('contactForm.sedeTitle') }}</h3>
            
            <ul class="space-y-8 relative z-10">
              <li class="flex items-start gap-4 group">
                <div class="w-12 h-12 rounded-2xl bg-white/10 border border-white/25 flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-biadoxid-700 transition-colors duration-300">
                  <LucideMapPin :size="22" />
                </div>
                <div>
                  <h4 class="text-white font-bold mb-1">{{ t('contactForm.dirLabel') }}</h4>
                  <p class="text-white/80 text-sm leading-relaxed">
                    {{ t('contactForm.dirAddress') }}<br />
                    {{ t('contactForm.dirFloor') }}<br />
                    {{ t('contactForm.dirCity') }}
                  </p>
                </div>
              </li>

              <li class="flex items-start gap-4 group">
                <div class="w-12 h-12 rounded-2xl bg-white/10 border border-white/25 flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-biadoxid-700 transition-colors duration-300">
                  <LucidePhone :size="22" />
                </div>
                <div>
                  <h4 class="text-white font-bold mb-1">{{ t('contactForm.phoneLabel') }}</h4>
                  <p class="text-white/80 text-sm font-mono">+591 69105198 / 76265905</p>
                </div>
              </li>

              <li class="flex items-start gap-4 group">
                <div class="w-12 h-12 rounded-2xl bg-white/10 border border-white/25 flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-biadoxid-700 transition-colors duration-300">
                  <LucideClock :size="22" />
                </div>
                <div>
                  <h4 class="text-white font-bold mb-1">{{ t('contactForm.hoursLabel') }}</h4>
                  <p class="text-white/80 text-sm">{{ t('contactForm.hoursWeek') }}</p>
                  <p class="text-white text-xs font-bold mt-1 bg-white/15 inline-block px-2 py-0.5 rounded-md">{{ t('contactForm.hoursWeekend') }}</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="reveal-on-scroll opacity-0 translate-y-10 bg-linear-to-br from-teal-50 to-white border border-teal-100 rounded-3xl p-8 relative overflow-hidden" style="transition-delay: 100ms">
            <LucideShieldCheck :size="120" class="absolute -right-8 -top-8 text-teal-500/5" />
            <div class="flex items-center gap-3 mb-4 relative z-10">
              <LucideAlertCircle class="text-teal-600" :size="24" />
              <h3 class="text-lg font-bold text-slate-900">{{ t('contactForm.farmaTitle') }}</h3>
            </div>
            <p class="text-sm text-slate-600 mb-5 relative z-10">{{ t('contactForm.farmaText') }}</p>
            <a href="mailto:biadoxidpharma@outlook.com" class="inline-flex items-center gap-2 text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors bg-white px-4 py-2 rounded-xl shadow-xs border border-slate-100 relative z-10">
              <LucideMail :size="16" /> {{ t('contactForm.farmaCta') }}
            </a>
          </div>
        </div>

        <div class="lg:col-span-3">
          <div
            class="reveal-on-scroll opacity-0 translate-y-10 relative bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-12 shadow-[0_15px_40px_-15px_rgba(180,0,0,0.16)] transition-all duration-500 overflow-hidden hover:shadow-[0_25px_55px_-20px_rgba(180,0,0,0.22)]"
            style="transition-delay: 150ms">
            <!-- Franja roja superior discreta, igual que la tarjeta "Y muchos más..." -->
            <span class="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-[#F40001] via-[#B30000] to-[#7F0000]" aria-hidden="true"></span>
            <!-- Resplandor decorativo rojo muy tenue (no compite con la tarjeta roja de Sede Central) -->
            <div class="absolute -top-24 -right-24 w-56 h-56 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>

            <!-- Encabezado del formulario -->
            <div class="relative z-10 flex items-start gap-4 mb-8">
              <div
                class="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0 shadow-sm">
                <LucideMessageSquare :size="22" />
              </div>
              <div class="min-w-0">
                <span
                  class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-600 text-[10px] font-bold uppercase tracking-widest mb-2">
                  <LucideLock :size="11" />
                  {{ t('contactForm.formBadge') }}
                </span>
                <h3 class="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">{{ t('contactForm.formTitle') }}</h3>
                <p class="text-sm text-slate-500 mt-1 font-light">{{ t('contactForm.formSubtitle') }}</p>
              </div>
            </div>

            <div v-if="formStatus === 'success'" class="relative text-center py-10 animate-in fade-in zoom-in duration-500">
              <div class="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                <LucideCheckCircle2 :size="40" />
              </div>
              <h3 class="text-2xl font-bold text-slate-900">{{ t('contactForm.successTitle') }}</h3>
              <p class="text-slate-500 mt-2">{{ t('contactForm.successText') }}</p>
            </div>

            <div v-else-if="formStatus === 'error'" class="relative text-center py-10">
              <div class="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                <LucideAlertCircle :size="40" />
              </div>
              <h3 class="text-2xl font-bold text-slate-900">{{ t('contactForm.errorTitle') }}</h3>
              <p class="text-slate-500 mt-2">
                {{ t('contactForm.errorText') }}
                <a href="mailto:biadoxidpharma@outlook.com" class="text-teal-600 font-bold underline">biadoxidpharma@outlook.com</a>
              </p>
              <button @click="formStatus = 'idle'" class="mt-6 text-sm font-bold text-slate-600 underline">
                {{ t('contactForm.retry') }}
              </button>
            </div>

            <form v-else @submit.prevent="handleSubmit" class="relative space-y-6" novalidate>
              <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">{{ t('contactForm.nameLabel') }}</label>
                  <input 
                    v-model="formData.nombre" 
                    type="text" 
                    @input="validateField('nombre')"
                    @blur="validateField('nombre')"
                    :class="['w-full rounded-xl px-4 py-3.5 focus:outline-hidden focus:ring-2 transition-all', errors.nombre && submitted ? 'bg-teal-50 border border-teal-300 focus:border-teal-500 focus:ring-teal-500/20' : 'bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-teal-500/20']"
                    :placeholder="t('contactForm.namePlaceholder')"
                  />
                  <p v-if="errors.nombre && submitted" class="text-teal-600 text-xs font-medium flex items-center gap-1">
                    <LucideAlertCircle :size="12" /> {{ errors.nombre }}
                  </p>
                </div>
                <div class="space-y-2">
                  <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">{{ t('contactForm.emailLabel') }}</label>
                  <input 
                    v-model="formData.email" 
                    type="email" 
                    @input="validateField('email')"
                    @blur="validateField('email')"
                    :class="['w-full rounded-xl px-4 py-3.5 focus:outline-hidden focus:ring-2 transition-all', errors.email && submitted ? 'bg-teal-50 border border-teal-300 focus:border-teal-500 focus:ring-teal-500/20' : 'bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-teal-500/20']"
                    :placeholder="t('contactForm.emailPlaceholder')"
                  />
                  <p v-if="errors.email && submitted" class="text-teal-600 text-xs font-medium flex items-center gap-1">
                    <LucideAlertCircle :size="12" /> {{ errors.email }}
                  </p>
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">{{ t('contactForm.institucionLabel') }}</label>
                  <input v-model="formData.institucion" type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-hidden focus:border-teal-500 transition-all" :placeholder="t('contactForm.institucionPlaceholder')" />
                </div>
                <div class="space-y-2">
                  <label for="contact-area" class="text-xs font-bold text-slate-500 uppercase tracking-wider">{{ t('contactForm.areaLabel') }}</label>
                  <select id="contact-area" v-model="formData.area" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-hidden focus:border-teal-500 transition-all cursor-pointer">
                    <option value="ventas">{{ t('contactForm.areaVentas') }}</option>
                    <option value="info">{{ t('contactForm.areaInfo') }}</option>
                    <option value="proveedores">{{ t('contactForm.areaProveedores') }}</option>
                    <option value="otros">{{ t('contactForm.areaGeneral') }}</option>
                  </select>
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">{{ t('contactForm.messageLabel') }}</label>
                <textarea 
                  v-model="formData.mensaje" 
                  rows="4" 
                  @input="validateField('mensaje')"
                  @blur="validateField('mensaje')"
                  :class="['w-full rounded-xl px-4 py-3.5 focus:outline-hidden focus:ring-2 transition-all resize-none', errors.mensaje && submitted ? 'bg-teal-50 border border-teal-300 focus:border-teal-500 focus:ring-teal-500/20' : 'bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-teal-500/20']"
                  :placeholder="t('contactForm.messagePlaceholder')"
                ></textarea>
                <p v-if="errors.mensaje && submitted" class="text-teal-600 text-xs font-medium flex items-center gap-1">
                  <LucideAlertCircle :size="12" /> {{ errors.mensaje }}
                </p>
              </div>

              <button 
                type="submit" 
                :disabled="formStatus === 'submitting'"
                class="w-full md:w-auto bg-biadoxid-600 hover:bg-biadoxid-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-biadoxid-900/20 hover:shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <template v-if="formStatus === 'submitting'">
                  <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> {{ t('contactForm.submitting') }}
                </template>
                <template v-else>
                  {{ t('contactForm.submit') }} <LucideSend :size="16" />
                </template>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Animación de entrada suave de las tarjetas (coherente con la sección de proveedores) */
.reveal-on-scroll {
  transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
}
</style>