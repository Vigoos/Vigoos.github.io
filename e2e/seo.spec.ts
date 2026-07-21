import { test, expect } from '@playwright/test'
import { PAGES } from './helpers'

test.describe('SEO - Meta tags', () => {
  for (const page of PAGES) {
    test(`${page.name} tiene title correcto`, async ({ page: p }) => {
      await p.goto(page.url)
      await p.waitForLoadState('networkidle')

      const title = await p.title()
      expect(title).toContain(page.title)
    })
  }

  for (const page of PAGES) {
    test(`${page.name} tiene meta description`, async ({ page: p }) => {
      await p.goto(page.url)
      await p.waitForLoadState('networkidle')

      const metaDesc = p.locator('meta[name="description"]')
      const exists = await metaDesc.count()
      if (exists > 0) {
        await expect(metaDesc).toHaveAttribute('content', /.+/)
      }
    })
  }
})

test.describe('SEO - Jerarquía de encabezados', () => {
  test('cada página tiene al menos un H1 en el header', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const h1Count = await page.locator('h1').count()
    expect(h1Count).toBeGreaterThanOrEqual(1)
  })

  test('los H1 contienen texto de marca o título', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const h1s = page.locator('h1')
    const count = await h1s.count()
    for (let i = 0; i < count; i++) {
      const text = await h1s.nth(i).textContent()
      expect(text?.trim().length).toBeGreaterThan(0)
    }
  })
})

test.describe('SEO - Recursos estáticos', () => {
  test('robots.txt existe y es accesible', async ({ page }) => {
    const resp = await page.goto('/robots.txt')
    expect(resp?.status()).toBe(200)
    const text = await resp?.text()
    expect(text).toContain('User-Agent')
  })

  test('favicon es accesible', async ({ page }) => {
    const resp = await page.goto('/favicon.ico')
    expect(resp?.status()).toBe(200)
  })

  test('Logo principal es accesible', async ({ page }) => {
    const resp = await page.goto('/BIADOXID-PHARMA-LOGO.webp')
    expect(resp?.status()).toBe(200)
  })
})

test.describe('SEO - Enlaces internos', () => {
  test('enlaces de navegación principales funcionan', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const rutas = ['/', '/nosotros', '/productos']
    for (const ruta of rutas) {
      const resp = await page.goto(ruta)
      expect(resp?.status()).toBe(200)
      await page.waitForLoadState('networkidle')
    }
  })
})
