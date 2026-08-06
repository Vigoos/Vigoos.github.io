import { test, expect } from '@playwright/test'
import { PAGES } from './helpers'

test.beforeEach(async ({ page }) => {
  await page.route('**/sw.js', route => route.abort())
})

// Nota: se evita waitUntil:'networkidle' en la Home porque el video del hero
// mantiene la red activa y el idle nunca se estabiliza (timeout 60s). Se espera
// 'load', que es suficiente para validar layout/responsive (misma decisión que en pwa.spec).


test.describe('Responsive - Header', () => {
  for (const page of PAGES) {
    test(`${page.name}: header se muestra en mobile, tablet y desktop`, async ({ page: p }) => {
      await p.goto(page.url)
      await p.waitForLoadState('load')

      // El nav es fixed (el wrapper <header> no tiene altura propia) → se verifica el nav visible
      const nav = p.locator('header nav').first()
      await expect(nav).toBeVisible()
    })
  }

  test('Home: menú hamburguesa visible en mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    await page.waitForLoadState('load')

    const menuBtn = page.locator('button[aria-label*="menú" i], button[aria-label*="menu" i]').first()
    if (await menuBtn.count() > 0) {
      await expect(menuBtn).toBeVisible()
    }
  })
})

test.describe('Responsive - Layout sin desbordamiento', () => {
  for (const page of PAGES) {
    test(`${page.name}: sin scroll horizontal en mobile`, async ({ page: p }) => {
      await p.setViewportSize({ width: 375, height: 812 })
      await p.goto(page.url)
      await p.waitForLoadState('load')

      const width = await p.evaluate(() => document.documentElement.scrollWidth)
      const vp = await p.evaluate(() => window.innerWidth)
      expect(width).toBeLessThanOrEqual(vp + 5)
    })

    test(`${page.name}: sin scroll horizontal en tablet`, async ({ page: p }) => {
      await p.setViewportSize({ width: 768, height: 1024 })
      await p.goto(page.url)
      await p.waitForLoadState('load')

      const width = await p.evaluate(() => document.documentElement.scrollWidth)
      const vp = await p.evaluate(() => window.innerWidth)
      expect(width).toBeLessThanOrEqual(vp + 5)
    })
  }
})

test.describe('Responsive - Pantallas extremas (Z Fold 344px / Nest Hub 1024px / Nest Hub Max 1280px)', () => {
  for (const page of PAGES) {
    test(`${page.name}: sin scroll horizontal en 344px (Galaxy Z Fold cover)`, async ({ page: p }) => {
      await p.setViewportSize({ width: 344, height: 882 })
      await p.goto(page.url)
      await p.waitForLoadState('load')

      const width = await p.evaluate(() => document.documentElement.scrollWidth)
      const vp = await p.evaluate(() => window.innerWidth)
      expect(width).toBeLessThanOrEqual(vp + 5)
    })

    test(`${page.name}: sin scroll horizontal en 1024px (Nest Hub)`, async ({ page: p }) => {
      await p.setViewportSize({ width: 1024, height: 600 })
      await p.goto(page.url)
      await p.waitForLoadState('load')

      // El nav de escritorio aparece en 1024px y es donde más apretado queda
      const width = await p.evaluate(() => document.documentElement.scrollWidth)
      const vp = await p.evaluate(() => window.innerWidth)
      expect(width).toBeLessThanOrEqual(vp + 5)

      // El botón Contáctanos (extremo derecho del nav) no debe salirse de la pantalla
      const cta = p.locator('header a[href="/contacto"]').first()
      await expect(cta).toBeVisible()
      const ctaBox = await cta.boundingBox()
      expect(ctaBox.x + ctaBox.width).toBeLessThanOrEqual(1024 + 1)
    })

    test(`${page.name}: sin scroll horizontal en 1280px (Nest Hub Max)`, async ({ page: p }) => {
      await p.setViewportSize({ width: 1280, height: 800 })
      await p.goto(page.url)
      await p.waitForLoadState('load')

      const width = await p.evaluate(() => document.documentElement.scrollWidth)
      const vp = await p.evaluate(() => window.innerWidth)
      expect(width).toBeLessThanOrEqual(vp + 5)
    })
  }

  test('Home: logo, hamburguesa y WhatsApp caben en 344px sin desbordar', async ({ page }) => {
    await page.setViewportSize({ width: 344, height: 882 })
    await page.goto('/')
    await page.waitForLoadState('load')

    // Logo visible dentro del viewport
    const logo = page.locator('header img[alt*="Biadoxid" i]').first()
    await expect(logo).toBeVisible()
    const logoBox = await logo.boundingBox()
    expect(logoBox.x).toBeGreaterThanOrEqual(0)

    // Hamburguesa dentro del nav (no se sale de la pantalla)
    const menuBtn = page.locator('button[aria-label*="menú" i], button[aria-label*="menu" i]').first()
    await expect(menuBtn).toBeVisible()
    const menuBox = await menuBtn.boundingBox()
    expect(menuBox.x + menuBox.width).toBeLessThanOrEqual(344 + 1)

    // WhatsApp visible y dentro del viewport
    const wa = page.locator('button[aria-label*="WhatsApp" i]').first()
    await expect(wa).toBeVisible()
    const waBox = await wa.boundingBox()
    expect(waBox.x + waBox.width).toBeLessThanOrEqual(344 + 1)
  })

  test('Home: WhatsApp y BackToTop visibles tras hacer scroll (bug de iconos que desaparecen)', async ({ page }) => {
    await page.setViewportSize({ width: 344, height: 882 })
    await page.goto('/')
    await page.waitForLoadState('load')

    // Baja la página (la animación de estilo del nav ya no toca la posición)
    await page.evaluate(() => window.scrollTo(0, 900))

    const wa = page.locator('button[aria-label*="WhatsApp" i]').first()
    await expect(wa).toBeVisible()
    const waBox = await wa.boundingBox()
    expect(waBox.x + waBox.width).toBeLessThanOrEqual(344 + 1)

    // BackToTop aparece tras 400px de scroll y sigue visible
    const backtop = page.locator('button[aria-label*="arriba" i], button[aria-label*="top" i]').first()
    await expect(backtop).toBeVisible()
  })
})

test.describe('Responsive - Imágenes', () => {
  test('imágenes tienen atributo loading="lazy"', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('load')

    const images = page.locator('img[loading="lazy"]')
    const count = await images.count()
    expect(count).toBeGreaterThan(0)
  })

  test('imágenes tienen atributo alt', async ({ page }) => {
    await page.goto('/productos')
    await page.waitForLoadState('load')

    const images = page.locator('img')
    const count = await images.count()
    for (let i = 0; i < count; i++) {
      await expect(images.nth(i)).toHaveAttribute('alt', /.+/)
    }
  })
})
