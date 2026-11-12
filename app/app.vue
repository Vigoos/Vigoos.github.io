<template>
  <NuxtPwaAssets />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <!-- Notificación de actualización PWA -->
  <PwaUpdateToast />

  <!-- Música de ambiente: el primer click/tecla en cualquier parte activa una pista al azar -->
  <AmbientMusic />
</template>

<script setup>
// === SEO global ===
// Dominio de producción. Todas las URLs absolutas (canonical, og:image, schema.org) parten de aquí.
const SITE_URL = 'https://biadoxidpharma.com'

const route = useRoute()

// URL canónica sin barra final: /productos y /productos/ responden igual en Cloudflare,
// el canonical le indica a Google cuál es la versión oficial (evita contenido duplicado).
const canonicalUrl = computed(() => {
  const path = route.path.replace(/\/+$/, '')
  return `${SITE_URL}${path || '/'}`
})

useSeoMeta({
  ogSiteName: 'Biadoxid Pharma S.R.L.',
  ogType: 'website',
  ogLocale: 'es_BO',
  ogUrl: canonicalUrl,
  ogImage: `${SITE_URL}/og-image.jpg`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/jpeg',
  ogImageAlt: 'Sede de Biadoxid Pharma S.R.L. en La Paz, Bolivia',
  twitterCard: 'summary_large_image'
})

// Datos estructurados (schema.org): ayudan a Google a mostrar la ficha de la empresa
// (nombre, logo, dirección, contacto y redes sociales) en los resultados de búsqueda.
const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Biadoxid Pharma S.R.L.',
      // Variantes con las que la gente busca la marca (ayuda a asociar "Biadoxid Farma" o "Biadoxid" con la empresa).
      alternateName: ['Biadoxid Pharma', 'Biadoxid Farma', 'Biadoxid'],
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/BIADOXID-PHARMA-LOGO-OFICIAL.webp`,
      image: `${SITE_URL}/og-image.jpg`,
      description: 'Importación y distribución farmacéutica en Bolivia. Representación exclusiva de laboratorios internacionales.',
      email: 'biadoxidpharma@outlook.com',
      telephone: '+59176265905',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Av. Simón Bolívar, Edificio Altar II, Piso 2, Oficina 1, Zona Miraflores',
        addressLocality: 'La Paz',
        addressRegion: 'La Paz',
        addressCountry: 'BO'
      },
      areaServed: { '@type': 'Country', name: 'Bolivia' },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: '+59176265905',
        email: 'biadoxidpharma@outlook.com',
        areaServed: 'BO',
        availableLanguage: ['es', 'en']
      },
      sameAs: [
        'https://www.facebook.com/biadoxidpharmasrl/',
        'https://www.instagram.com/biadoxidpharma/',
        'https://www.tiktok.com/@biadoxidpharma.srl'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: 'Biadoxid Pharma',
      inLanguage: 'es-BO',
      publisher: { '@id': `${SITE_URL}/#organization` }
    }
  ]
}

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }],
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(organizationSchema) }]
})
</script>