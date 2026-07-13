// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process'
import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  modules: [
    'nuxt-lucide-icons', 
    'nuxt-security'
  ],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  
  security: {
    headers: {
      contentSecurityPolicy: {
        'img-src': [
          "'self'", 
          'data:', 
          'https://ui-avatars.com', 
          'https://images.unsplash.com'
        ],
        'script-src': ["'self'", "'unsafe-inline'", "'wasm-unsafe-eval'"],
        // AÑADIMOS ESTO PARA PERMITIR EL ENVÍO DEL FORMULARIO
        'connect-src': ["'self'", "https://api.web3forms.com"] 
      },
      xFrameOptions: 'DENY',
      xContentTypeOptions: 'nosniff',
      strictTransportSecurity: {
        maxAge: 31536000,
        includeSubdomains: true
      }
    },
    rateLimiter: {
      tokensPerInterval: 15,
      interval: 10000,       
    }
  },
  runtimeConfig: {
    public: {
      // Lo mantenemos todo en minúsculas por convención
      web3formsKey: process.env.NUXT_PUBLIC_WEB3FORMS_KEY || ''
    }
  }
})