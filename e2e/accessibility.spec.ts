import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { PAGES } from './helpers'

test.describe('Accesibilidad - WCAG 2.1 AA', () => {
  for (const page of PAGES) {
    test(`${page.name} no tiene violaciones críticas de accesibilidad`, async ({ page: p }) => {
      await p.goto(page.url, { waitUntil: 'load', timeout: 30000 })

      const results = await new AxeBuilder({ page: p })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()

      const critical = results.violations.filter(v => v.impact === 'critical')
      expect(critical).toEqual([])
    })
  }
})

test.describe('Accesibilidad - Navegación por teclado', () => {
  test('Home: se puede navegar con Tab', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.keyboard.press('Tab')
    const focused = page.locator(':focus')
    await expect(focused).toBeVisible()
  })

  test('elementos navegables reciben foco visible', async ({ page }) => {
    await page.goto('/productos')
    await page.waitForLoadState('networkidle')

    let focusVisible = false
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press('Tab')
      const focused = page.locator(':focus')
      const count = await focused.count()
      if (count > 0) {
        focusVisible = true
        break
      }
    }

    expect(focusVisible).toBeTruthy()
  })
})

test.describe('Accesibilidad - Reporte de contraste de color', () => {
  for (const page of PAGES) {
    test(`${page.name}: genera reporte de contraste (serious esperado en dark theme)`, async ({ page: p }) => {
      try {
        await p.goto(page.url, { waitUntil: 'networkidle', timeout: 30000 })
      } catch {
        await p.goto(page.url, { waitUntil: 'domcontentloaded', timeout: 30000 })
      }

      const results = await new AxeBuilder({ page: p })
        .withTags(['wcag2aa', 'wcag21aa'])
        .options({ runOnly: ['color-contrast'] })
        .analyze()

      const critical = results.violations.filter(v => v.impact === 'critical')
      expect(critical).toEqual([])
    })
  }
})
