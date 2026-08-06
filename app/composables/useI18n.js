import { ref, onMounted } from 'vue'
import es from '../i18n/es'
import en from '../i18n/en'

const messages = { es, en }
const supportedLocales = ['es', 'en']

// Siempre arranca en 'es' para evitar mismatches de hidratación SSR.
// La detección real del navegador se aplica en onMounted (solo cliente).
export const locale = ref('es')
let initialized = false

const applyLocale = (l) => {
  locale.value = l
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('biadoxid-locale', l)
      document.documentElement.lang = l
    } catch { /* localStorage puede no estar disponible */ }
  }
}

const detectLocale = () => {
  if (typeof window === 'undefined') return 'es'
  try {
    const saved = localStorage.getItem('biadoxid-locale')
    if (saved && supportedLocales.includes(saved)) return saved
    const nav = (navigator.language || 'es').toLowerCase()
    return nav.startsWith('en') ? 'en' : 'es'
  } catch {
    return 'es'
  }
}

// Se ejecuta una sola vez en el cliente (guardado por la bandera initialized)
const initLocale = () => {
  if (initialized) return
  initialized = true
  applyLocale(detectLocale())
}

const setLocale = (l) => {
  if (!supportedLocales.includes(l)) return
  applyLocale(l)
}

// Traduce por notación de puntos: t('hero.title')
// Soporta interpolación simple: t('form.resultCount', { count: 5 })
const t = (key, params = {}) => {
  const dict = messages[locale.value] || es
  let val = key.split('.').reduce((o, k) => (o ? o[k] : undefined), dict)
  if (val === undefined) return key
  return Object.entries(params).reduce(
    (str, [k, v]) => str.replace(new RegExp(`\\{${k}\\}`, 'g'), () => String(v)),
    val
  )
}

export const useI18n = () => {
  onMounted(initLocale)
  return { locale, setLocale, t, supportedLocales }
}
