import { computed } from 'vue'
import catalogoEn from '../data/catalogo_en.js'
import es from '../i18n/es'
import en from '../i18n/en'
import { locale } from './useI18n'

export const useCatalog = () => {
  const isEn = computed(() => locale.value === 'en')

  // Traduce el nombre de una categoría según el idioma activo.
  // Fallback: devuelve la categoría original si no hay traducción.
  const catName = (cat) => {
    const key = cat || 'Especialidad'
    const map = isEn.value ? en.cats : es.cats
    return map[key] || key
  }

  // Devuelve una copia del producto con los campos en inglés (si existe
  // traducción y el idioma activo es 'en'). Si no, devuelve el original.
  const localizeProduct = (p) => {
    if (!p) return p
    if (!isEn.value) return p
    const t = catalogoEn[p.slug]
    if (!t) return p
    return {
      ...p,
      name: t.name || p.name,
      category: t.category || p.category,
      shortDescription: t.shortDescription || p.shortDescription,
      descriptionHtml: t.descriptionHtml || p.descriptionHtml
    }
  }

  // Texto combinado (ES + EN) para búsqueda.
  const searchText = (p) => {
    const t = catalogoEn[p.slug]
    const raw = `${p.name} ${p.category || ''} ${p.shortDescription || ''}`
    const localized = t ? `${t.name || ''} ${t.category || ''} ${t.shortDescription || ''}` : ''
    return `${raw} ${localized}`.toLowerCase()
  }

  return { catName, localizeProduct, searchText }
}
