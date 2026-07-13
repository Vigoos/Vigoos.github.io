<script setup>
import { ref } from 'vue'

// Calculamos el año actual dinámicamente
const currentYear = ref(new Date().getFullYear())

// Estado para controlar qué modal está abierto (null = cerrado, 'privacidad' o 'terminos')
const activeModalType = ref(null)

// Función para abrir el modal
const openModal = (type) => {
  activeModalType.value = type
}
</script>

<template>
  <footer id="contacto" class="bg-slate-950 relative overflow-hidden pt-20 pb-10">
    <div class="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-teal-500/50 to-transparent"></div>

    <div class="absolute bottom-0 left-0 w-96 h-96 bg-teal-900/10 rounded-full blur-[100px] pointer-events-none"></div>
    <div class="absolute top-0 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

        <div class="lg:col-span-4">
          <div class="flex items-center gap-3 mb-6">
            <div
              class="w-10 h-10 rounded-xl bg-linear-to-br from-teal-400 to-blue-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(20,184,166,0.3)]">
              <LucideDna :size="22" />
            </div>
            <div>
              <h2 class="text-xl font-black tracking-tight text-white leading-none">BIADOXID</h2>
              <span class="text-[10px] uppercase tracking-widest text-teal-400 font-bold">Pharma S.R.L.</span>
            </div>
          </div>
          <p class="text-slate-400 text-sm leading-relaxed mb-6 font-light max-w-sm">
            Innovación, ética y compromiso absoluto con la salud pública y privada. Somos el puente vital entre la
            biotecnología global y Bolivia.
          </p>
          <div class="flex gap-4">

            <a href="https://www.facebook.com/biadoxidpharmasrl/" target="_blank" rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-500/30 hover:bg-blue-500/10 transition-all group"
              title="Facebook">
              <svg class="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            <a href="https://www.instagram.com/biadoxidpharma/" target="_blank" rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-pink-500 hover:border-pink-500/30 hover:bg-pink-500/10 transition-all group"
              title="Instagram">
              <svg class="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>

            <a href="https://www.tiktok.com/@biadoxidpharma.srl" target="_blank" rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all group"
              title="TikTok">
              <svg class="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path
                  d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>

            <a href="https://wa.me/59176265905?text=Hola%20Biadoxid%20Pharma,%20me%20gustaría%20obtener%20más%20información."
              target="_blank" rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-green-500 hover:border-green-500/30 hover:bg-green-500/10 transition-all group"
              title="WhatsApp">
              <svg class="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
            </a>

          </div>
        </div>

        <div class="lg:col-span-2">
          <h4 class="text-white font-bold mb-6 uppercase text-xs tracking-widest">Compañía</h4>
          <ul class="space-y-4">
            <li><a href="#"
                class="text-slate-400 text-sm hover:text-teal-400 transition-colors flex items-center gap-2 group"><span
                  class="w-0 group-hover:w-2 h-px bg-teal-400 transition-all duration-300"></span> Inicio</a></li>
            <li><a href="#nosotros"
                class="text-slate-400 text-sm hover:text-teal-400 transition-colors flex items-center gap-2 group"><span
                  class="w-0 group-hover:w-2 h-px bg-teal-400 transition-all duration-300"></span> Identidad</a></li>
            <li><a href="#productos"
                class="text-slate-400 text-sm hover:text-teal-400 transition-colors flex items-center gap-2 group"><span
                  class="w-0 group-hover:w-2 h-px bg-teal-400 transition-all duration-300"></span> Portafolio
                Clínico</a></li>
            <li><a href="#logistica"
                class="text-slate-400 text-sm hover:text-teal-400 transition-colors flex items-center gap-2 group"><span
                  class="w-0 group-hover:w-2 h-px bg-teal-400 transition-all duration-300"></span> Logística</a></li>
          </ul>
        </div>

        <div class="lg:col-span-3">
          <h4 class="text-white font-bold mb-6 uppercase text-xs tracking-widest">Regulación</h4>
          <ul class="space-y-4 mb-6">
            <li>
              <button @click="openModal('privacidad')"
                class="text-slate-400 text-sm hover:text-teal-400 transition-colors w-full text-left flex items-center gap-2 group"><span
                  class="w-0 group-hover:w-2 h-px bg-teal-400 transition-all duration-300"></span>Aviso de
                Privacidad</button>
            </li>
            <li>
              <button @click="openModal('terminos')"
                class="text-slate-400 text-sm hover:text-teal-400 transition-colors w-full text-left flex items-center gap-2 group"><span
                  class="w-0 group-hover:w-2 h-px bg-teal-400 transition-all duration-300"></span>Términos y
                Condiciones</button>
            </li>
            <li><a href="#"
                class="text-slate-400 text-sm hover:text-teal-400 transition-colors flex items-center gap-2 group"><span
                  class="w-0 group-hover:w-2 h-px bg-teal-400 transition-all duration-300"></span>Farmacovigilancia</a>
            </li>
          </ul>

          <div
            class="p-4 rounded-2xl bg-linear-to-br from-teal-500/10 to-blue-500/5 border border-teal-500/20 relative overflow-hidden group">
            <div
              class="absolute top-0 right-0 w-16 h-16 bg-teal-500/10 rounded-full blur-xl group-hover:bg-teal-500/20 transition-colors">
            </div>
            <div class="flex gap-3 relative z-10 items-start">
              <LucideShieldCheck class="text-teal-400 shrink-0 mt-0.5" :size="20" />
              <div>
                <div class="text-white font-bold text-sm leading-none mb-1">Certificación AGEMED</div>
                <div class="text-slate-400 text-xs leading-relaxed">Empresa certificada y regulada bajo la normativa
                  vigente.</div>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-3">
          <h4 class="text-white font-bold mb-6 uppercase text-xs tracking-widest">Contacto Directo</h4>
          <ul class="space-y-5">

            <li>
              <NuxtLink to="/contacto#mapa" class="flex items-start gap-4 group cursor-pointer">
                <div
                  class="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-500 shrink-0 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300">
                  <LucideMapPin :size="16" />
                </div>
                <span class="text-slate-400 text-sm pt-1.5 leading-relaxed group-hover:text-teal-400 transition-colors">
                  La Paz, Bolivia<br />
                  <span class="text-slate-500 text-xs group-hover:text-teal-500/80 transition-colors">Sede Operativa
                    Central</span>
                </span>
              </NuxtLink>
            </li>

            <li>
              <a href="tel:+59176265905" class="flex items-center gap-4 group cursor-pointer">
                <div
                  class="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-500 shrink-0 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300">
                  <LucidePhone :size="16" />
                </div>
                <span
                  class="text-slate-300 font-mono text-sm tracking-wide group-hover:text-teal-400 transition-colors">
                  +591 76265905
                </span>
              </a>
            </li>

            <li>
              <a href="mailto:biadoxidpharma@outlook.com" class="flex items-center gap-4 group cursor-pointer">
                <div
                  class="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-500 shrink-0 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300">
                  <LucideMail :size="16" />
                </div>
                <span class="text-slate-300 text-sm group-hover:text-teal-400 transition-colors">
                  biadoxidpharma@outlook.com
                </span>
              </a>
            </li>

          </ul>
        </div>
      </div>

      <div class="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-slate-500 text-xs font-medium">
          © {{ currentYear }} Biadoxid Pharma S.R.L. Todos los derechos reservados.
        </p>
        <div class="flex items-center gap-2 text-slate-500 text-xs font-medium">
          Diseñado con <span class="text-teal-400 relative inline-block">
            precisión clínica
            <span class="absolute -right-2 top-0 w-1 h-1 bg-teal-400 rounded-full animate-ping"></span>
          </span>
        </div>
      </div>
    </div>

    <LegalModal :show="activeModalType !== null" :type="activeModalType" @close="activeModalType = null" />
  </footer>
</template>