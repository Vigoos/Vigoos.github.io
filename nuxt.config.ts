// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process'
import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    head: {
      htmlAttrs: {
        lang: 'es'
      },
      link: [
        { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon-180x180.png' },
        // === PRECONEXIONES: aceleran la carga de recursos externos ===
        { rel: 'preconnect', href: 'https://images.unsplash.com' },
        { rel: 'preconnect', href: 'https://api.web3forms.com' },
        { rel: 'dns-prefetch', href: 'https://images.unsplash.com' },
        { rel: 'dns-prefetch', href: 'https://api.web3forms.com' },
        { rel: 'dns-prefetch', href: 'https://maps.google.com' }
      ]
    }
  },
  modules: [
    '@vite-pwa/nuxt',
    'nuxt-lucide-icons',
    'nuxt-security'
  ],
  pwa: {
    registerType: 'autoUpdate',
    includeAssets: ['favicon.png', 'favicon-32.png', 'apple-touch-icon-180x180.png', 'maskable-icon-512x512.png', 'BIADOXID-PHARMA-LOGO-v2.webp'],
    manifest: {
      name: 'Biadoxid Pharma S.R.L.',
      short_name: 'Biadoxid',
      description: 'Importación y Distribución Farmacéutica en Bolivia. Representación exclusiva de laboratorios internacionales.',
      theme_color: '#14b8a6',
      background_color: '#0f172a',
      display: 'standalone',
      display_override: ['window-controls-overlay', 'standalone'],
      orientation: 'portrait-primary',
      scope: '/',
      start_url: '/',
      lang: 'es-BO',
      categories: ['health', 'medical', 'business'],
      screenshots: [
        {
          src: 'screenshots/desktop-wide.svg',
          sizes: '1280x720',
          type: 'image/svg+xml',
          form_factor: 'wide',
          label: 'Vista principal de Biadoxid Pharma'
        },
        {
          src: 'screenshots/mobile-narrow.svg',
          sizes: '720x1280',
          type: 'image/svg+xml',
          form_factor: 'narrow',
          label: 'App móvil de Biadoxid Pharma'
        }
      ],
      icons: [
        { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
        { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
      ],
      prefer_related_applications: false
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html}', 'manifest.webmanifest'],
      runtimeCaching: [
        {
          urlPattern: /^\/(images|logos|documents)\/.*/i,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'local-assets-cache',
            expiration: {
              maxEntries: 80,
              maxAgeSeconds: 30 * 24 * 60 * 60 // 30 días
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'unsplash-images',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 30 * 24 * 60 * 60 // 30 días
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: /^https:\/\/maps\.google\.com\/.*/i,
          handler: 'NetworkOnly'
        }
      ]
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 3600
    }
  },

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
        'worker-src': ["'self'", 'blob:'],
        'connect-src': ["'self'", "https://api.web3forms.com"],
        // === NUEVAS DIRECTIVAS DE SEGURIDAD ===
        'base-uri': ["'self'"],
        'form-action': ["'self'", "https://api.web3forms.com"],
        'frame-ancestors': ["'none'"],
        'object-src': ["'none'"],
      },
      xFrameOptions: 'DENY',
      xContentTypeOptions: 'nosniff',
      strictTransportSecurity: {
        maxAge: 31536000,
        includeSubdomains: true
      }
    },
    rateLimiter: {
      tokensPerInterval: 60,
      interval: 10000,
    }
  },
  runtimeConfig: {
    // Clave PRIVADA (solo disponible en servidor, NUNCA expuesta al frontend)
    web3formsKey: process.env.WEB3FORMS_KEY || process.env.NUXT_PUBLIC_WEB3FORMS_KEY || '',
    public: {
      // Clave PÚBLICA (fallback para deploys estáticos)
      web3formsKey: process.env.NUXT_PUBLIC_WEB3FORMS_KEY || ''
    }
  }
})