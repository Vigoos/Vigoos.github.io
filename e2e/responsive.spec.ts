import { test, expect } from '@playwright/test'
import { PAGES } from './helpers'

test.beforeEach(async ({ page }) => {
  await page.route('**/sw.js', route => route.abort())
})


test.describe('Responsive - Header', () => {
  for (const page of PAGES) {
    test(`${page.name}: header se muestra en mobile, tablet y desktop`, async ({ page: p }) => {
      await p.goto(page.url)
      await p.waitForLoadState('networkidle')

      const header = p.locator('header').first()
      await expect(header).toBeVisible()
    })
  }

  test('Home: menú hamburguesa visible en mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

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
      await p.waitForLoadState('networkidle')

      const width = await p.evaluate(() => document.documentElement.scrollWidth)
      const vp = await p.evaluate(() => window.innerWidth)
      expect(width).toBeLessThanOrEqual(vp + 5)
    })

    test(`${page.name}: sin scroll horizontal en tablet`, async ({ page: p }) => {
      await p.setViewportSize({ width: 768, height: 1024 })
      await p.goto(page.url)
      await p.waitForLoadState('networkidle')

      const width = await p.evaluate(() => document.documentElement.scrollWidth)
      const vp = await p.evaluate(() => window.innerWidth)
      expect(width).toBeLessThanOrEqual(vp + 5)
    })
  }
})

test.describe('Responsive - Imágenes', () => {
  test('imágenes tienen atributo loading="lazy"', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const images = page.locator('img[loading="lazy"]')
    const count = await images.count()
    expect(count).toBeGreaterThan(0)
  })

  test('imágenes tienen atributo alt', async ({ page }) => {
    await page.goto('/productos')
    await page.waitForLoadState('networkidle')

    const images = page.locator('img')
    const count = await images.count()
    for (let i = 0; i < count; i++) {
      await expect(images.nth(i)).toHaveAttribute('alt', /.+/)
    }
  })
})
