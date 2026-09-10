import type { Page } from '@playwright/test'

export async function waitForPageReady(page: Page) {
  await page.waitForLoadState('load')
}

export const PAGES = [
  { url: '/', name: 'Home', title: 'Biadoxid Pharma S.R.L.' },
  { url: '/productos', name: 'Productos', title: 'Productos' },
  { url: '/nosotros', name: 'Nosotros', title: 'Identidad Corporativa' },
  { url: '/contacto', name: 'Contacto', title: 'Contacto' },
] as const
