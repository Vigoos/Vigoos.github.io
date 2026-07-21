import { test, expect } from '@playwright/test'

const THRESHOLDS = {
  fcp: 4000,
  lcp: 7000,
  tti: 5000,
  jsHeap: 80,
}

test.describe('Rendimiento - Métricas de carga', () => {
  for (const url of ['/', '/productos', '/nosotros', '/contacto']) {
    test(`FCP < ${THRESHOLDS.fcp}ms en ${url}`, async ({ page }) => {
      await page.goto(url, { waitUntil: 'networkidle' })

      const fcp = await page.evaluate(() => {
        const entries = performance.getEntriesByType('paint')
        const fcpEntry = entries.find(e => e.name === 'first-contentful-paint')
        return fcpEntry ? fcpEntry.startTime : 99999
      })

      expect(fcp).toBeLessThan(THRESHOLDS.fcp)
    })

    test(`LCP < ${THRESHOLDS.lcp}ms en ${url}`, async ({ page }) => {
      await page.goto(url, { waitUntil: 'networkidle' })

      const lcp = await page.evaluate(() => {
        return new Promise((resolve) => {
          new PerformanceObserver((list) => {
            const entries = list.getEntries()
            if (entries.length > 0) {
              resolve(entries[entries.length - 1].startTime)
            } else {
              resolve(99999)
            }
          }).observe({ type: 'largest-contentful-paint', buffered: true })
          setTimeout(() => resolve(99999), 5000)
        })
      })

      expect(lcp).toBeLessThan(THRESHOLDS.lcp)
    })
  }
})

test.describe('Rendimiento - Recursos', () => {
  test('tamaño total de recursos es razonable', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const totalSize = await page.evaluate(() => {
      return performance.getEntriesByType('resource')
        .filter(r => r.transferSize > 0)
        .reduce((acc, r) => acc + r.transferSize, 0)
    })

    expect(totalSize).toBeLessThan(15 * 1024 * 1024)
  })

  test('JavaScript heap usado < 80MB', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const heapUsedMB = await page.evaluate(() => {
      const perf: Record<string, number> = (performance as any).memory?.usedJSHeapSize
      return perf ? perf / 1024 / 1024 : 0
    })

    if (heapUsedMB > 0) {
      expect(heapUsedMB).toBeLessThan(THRESHOLDS.jsHeap)
    }
  })
})
