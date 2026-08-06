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
        // ?v=2: bust de caché (navegador + service worker PWA) tras sustituir el icono
        // por el logo real de la empresa. Sin esto, el icono antiguo persiste hasta 30 días.
        { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon.png?v=2' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png?v=2' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon-180x180.png?v=2' },
        // Preload de la fuente principal (Inter Variable latin): llega ANTES del primer
        // pintado para evitar el font-swap que causa layout shift en el hero.
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/_nuxt/inter-latin-wght-normal.Dx4kXJAl.woff2', crossorigin: '' },
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
    includeAssets: [
      'favicon.png',
      'favicon-32.png',
      'apple-touch-icon-180x180.png',
      'maskable-icon-512x512.png',
      'pwa-64x64.png',
      'pwa-192x192.png',
      'pwa-512x512.png',
      'BIADOXID-PHARMA-LOGO-v2.webp',
      'HERO-IMAGEN.webp'
    ],
    manifest: {
      name: 'Biadoxid Pharma S.R.L.',
      short_name: 'Biadoxid',
      description: 'Importación y Distribución Farmacéutica en Bolivia. Representación exclusiva de laboratorios internacionales.',
      theme_color: '#F40001',
      // Fondo de la pantalla de inicio: blanco (el rediseño usa fondos blancos)
      background_color: '#ffffff',
      display: 'standalone',
      display_override: ['window-controls-overlay', 'standalone'],
      // 'any' en vez de 'portrait-primary': el sitio es responsive en ambas orientaciones
      // (celular vertical, tablet y escritorio) y así no se fuerza la orientación.
      orientation: 'any',
      scope: '/',
      start_url: '/',
      lang: 'es-BO',
      categories: ['health', 'medical', 'business'],
      screenshots: [
        {
          src: 'screenshots/desktop-wide.png',
          sizes: '1280x720',
          type: 'image/png',
          form_factor: 'wide',
          label: 'Vista principal de Biadoxid Pharma'
        },
        {
          src: 'screenshots/mobile-narrow.png',
          sizes: '720x1280',
          type: 'image/png',
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
      // Navegaciones gestionadas con NetworkFirst manual (abajo). El navigateFallback
      // integrado de workbox se desactiva: al registrarse PRIMERO, bloqueaba la ruta
      // de navegación propia en builds de servidor (sin HTML precacheado) y rompía el
      // offline local. En el deploy estático los HTML sí se precachean (globPatterns).
      navigateFallback: null,
      cleanupOutdatedCaches: true,
      globPatterns: ['**/*.{js,css,html}', 'manifest.webmanifest'],
      runtimeCaching: [
        {
          // Navegaciones: NetworkFirst con caché en caliente. Tras visitar una página
          // una vez, funciona offline (reload o navegación directa). En el build estático
          // de producción los HTML precacheados se sirven por precacheAndRoute.
          urlPattern: ({ request }) => request.mode === 'navigate',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'pages-cache',
            networkTimeoutSeconds: 5,
            expiration: {
              maxEntries: 15,
              maxAgeSeconds: 24 * 60 * 60 // 24h: el HTML siempre es fresco
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          // Assets locales: imágenes de productos, logos de socios, documentos, el logo
          // principal, la imagen de la sede (HERO-IMAGEN), iconos y el video del hero.
          // StaleWhileRevalidate: se usan de la caché y se refrescan en segundo plano.
          urlPattern: /(^\/(images|logos|documents|videos)\/.*)|(^\/(BIADOXID|HERO-IMAGEN|favicon|pwa-|maskable|apple-touch))/i,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'local-assets-cache',
            expiration: {
              maxEntries: 90,
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
    },
    // Navegación client-side offline: Nuxt pide los payloads como /_payload.json?<buildId>
    // (con query) y sin esto workbox no los matchea contra el precache. Esta opción añade
    // una ruta NetworkOnly que, si la red falla (offline), redirige al payload sin query
    // (que SÍ está precacheado por ruta) y la página renderiza igual.
    experimental: {
      enableWorkboxPayloadQueryParams: true
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
      // COEP credentialless BLOQUEA el iframe de Google Maps (ERR_BLOCKED_BY_RESPONSE:
      // el embed no manda Cross-Origin-Resource-Policy y con COEP el navegador lo rechaza).
      // El sitio no depende de aislamiento cross-origin, así que se desactiva.
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        // upgrade-insecure-requests (activa por defecto) fuerza a subir http→https TODOS los
        // requests, incluidos CSS/JS. En producción detrás de HTTPS es inocuo, pero en el
        // preview/servidor local (HTTP puro) rompe la carga de estilos y scripts. El sitio no
        // tiene ningún enlace http, así que la directiva se desactiva explícitamente (false).
        // Si algún día se introdujeran enlaces http:// en producción, habría que reactivarla.
        'upgrade-insecure-requests': false,
        'img-src': [
          "'self'",
          'data:',
          'https://ui-avatars.com',
          'https://images.unsplash.com'
        ],
        'script-src': ["'self'", "'unsafe-inline'", "'wasm-unsafe-eval'"],
        'worker-src': ["'self'", 'blob:'],
        // Fuentes auto-hospedadas (Inter + JetBrains Mono vía @fontsource): sin terceros
        'style-src': ["'self'", "'unsafe-inline'"],
        'font-src': ["'self'", 'data:'],
        'connect-src': ["'self'", "https://api.web3forms.com"],
        // iframe de Google Maps en la página de contacto (embed oficial de www.google.com)
        'frame-src': ["'self'", 'https://maps.google.com', 'https://www.google.com'],
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