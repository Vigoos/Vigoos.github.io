import { test, expect } from '@playwright/test'

test.describe('PWA - Manifest', () => {
  test('manifest.webmanifest se sirve con los campos del rediseño', async ({ request }) => {
    const res = await request.get('/manifest.webmanifest')
    expect(res.status()).toBe(200)
    const ct = res.headers()['content-type'] || ''
    expect(ct).toContain('json')

    const manifest = await res.json()
    expect(manifest.name).toContain('Biadoxid')
    expect(manifest.short_name).toBe('Biadoxid')
    expect(manifest.theme_color).toBe('#F40001')
    expect(manifest.background_color).toBe('#ffffff')
    expect(manifest.start_url).toBe('/')
    expect(manifest.display).toBe('standalone')
    expect(manifest.lang).toBe('es-BO')

    // Iconos: debe existir el 512 maskable + el 192 mínimo instalable
    expect(manifest.icons.some(i => i.sizes === '512x512' && i.purpose === 'maskable')).toBeTruthy()
    expect(manifest.icons.some(i => i.sizes === '192x192')).toBeTruthy()

    // Screenshots: PNG reales del rediseño (los SVG los ignora Chrome para el install)
    const wide = manifest.screenshots.find(s => s.form_factor === 'wide')
    expect(wide).toBeTruthy()
    expect(wide.type).toBe('image/png')
    expect(wide.sizes).toBe('1280x720')
    const narrow = manifest.screenshots.find(s => s.form_factor === 'narrow')
    expect(narrow?.type).toBe('image/png')
    expect(narrow?.sizes).toBe('720x1280')
  })

  test('el HTML enlaza el manifest', async ({ page }) => {
    await page.goto('/')
    // El link del manifest viene en el HTML servido (SSR). No se usa networkidle:
    // con el video del hero y los precaches en paralelo el idle no se estabiliza.
    // Hay dos <link rel="manifest"> (uno con nonce de nuxt-security y otro del módulo
    // PWA); el navegador usa el primero, así que validamos ese.
    await expect(page.locator('link[rel="manifest"]').first()).toHaveAttribute('href', /manifest\.webmanifest/)
  })

  test('assets del manifest responden 200', async ({ request }) => {
    const assets = [
      '/pwa-192x192.png',
      '/pwa-512x512.png',
      '/maskable-icon-512x512.png',
      '/apple-touch-icon-180x180.png',
      '/screenshots/desktop-wide.png',
      '/screenshots/mobile-narrow.png',
    ]
    for (const f of assets) {
      const res = await request.get(f)
      expect(res.status(), `asset ${f} debe responder 200`).toBe(200)
    }
  })

  test('service worker sw.js se sirve', async ({ request }) => {
    const res = await request.get('/sw.js')
    expect(res.status()).toBe(200)
    const ct = res.headers()['content-type'] || ''
    expect(ct).toContain('javascript')
  })
})

test.describe('PWA - Comportamiento offline', () => {
  // El modo offline de Playwright es inestable en WebKit ('WebKit encountered an internal
  // error'), por lo que estos tests solo corren en Chromium (el navegador de referencia).
  test.skip(({ browserName }) => browserName !== 'chromium', 'El offline solo se valida en Chromium')

  // Nota: se evita waitUntil:'networkidle' en estas páginas porque el video del hero
  // (2.5MB) y los precaches en paralelo hacen que el idle nunca se estabilice. En su
  // lugar se espera 'load' y se verifica el estado del SW de forma explícita.

  test('la app funciona sin conexión tras la primera visita', async ({ page, context }) => {
    // 1) Visita online: instala el SW (el precache de JS/CSS termina antes de activarse)
    await page.goto('/')
    await page.waitForLoadState('load')
    await page.evaluate(() => navigator.serviceWorker.ready)

    // 2) Reload online ya controlado por el SW: NetworkFirst cachea el HTML de '/'
    await page.reload()
    await page.waitForLoadState('load')
    const controlled = await page.evaluate(() => !!navigator.serviceWorker.controller)
    expect(controlled).toBeTruthy()

    // Verificación: el HTML de '/' debe estar ya en pages-cache
    const cached = await page.evaluate(async () => {
      const cache = await caches.open('pages-cache')
      const res = await cache.match(location.origin + '/')
      return !!res
    })
    expect(cached).toBeTruthy()

    // 3) Desconectar la red y recargar: todo debe salir de la caché
    await context.setOffline(true)
    await page.reload({ waitUntil: 'domcontentloaded' })

    // El shell (nav) y el contenido principal deben renderizar
    await expect(page.locator('header nav')).toBeVisible()
    await expect(page.locator('h1').first()).toBeVisible()
    // No debe mostrar la página de error de Nitro
    await expect(page.getByText('Error interno del servidor')).toHaveCount(0)
  })

  test('navegar a otra ruta sin conexión tras haberla visitado', async ({ page, context }) => {
    // Visita online ambas rutas: el SW cachea cada HTML visitado
    for (const ruta of ['/', '/nosotros']) {
      await page.goto(ruta)
      await page.waitForLoadState('load')
    }
    await page.evaluate(() => navigator.serviceWorker.ready)
    await page.reload()
    await page.waitForLoadState('load')

    await context.setOffline(true)
    // Navegación directa a /nosotros con la red caída
    await page.goto('/nosotros', { waitUntil: 'domcontentloaded' })
    await expect(page.locator('header nav')).toBeVisible()
    await expect(page.locator('h1').first()).toBeVisible()
    await expect(page.getByText('Error interno del servidor')).toHaveCount(0)
  })
})
