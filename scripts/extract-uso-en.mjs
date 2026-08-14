// Script: extrae usoHtml del catálogo en inglés (catalogo_en.js) con marcadores EN
// y QUITA la sección de uso de descriptionHtml (consistente con ES).
// Inserta `usoHtml` y reemplaza `descriptionHtml` preservando template literals.
import fs from 'node:fs'
import path from 'node:path'

const file = path.resolve('app/data/catalogo_en.js')
let src = fs.readFileSync(file, 'utf8')
const mod = await import('file://' + file.replace(/\\/g, '/'))
const map = mod.default

const norm = (s) => (s || '')
  .replace(/&nbsp;/g, ' ')
  .replace(/\u00a0/g, ' ')
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/\s+/g, ' ')

const BLOCK_RE = /<(p|h[1-6]|ul|ol|hr|div)\b[^>]*>[\s\S]*?<\/(p|h[1-6]|ul|ol|div)>|<\s*hr\s*\/?>/gi
const splitBlocks = (html) => {
  const blocks = []
  let last = 0
  let m
  while ((m = BLOCK_RE.exec(html))) {
    if (m.index > last) {
      const frag = html.slice(last, m.index).trim()
      if (frag) blocks.push({ html: frag, text: norm(frag.replace(/<[^>]+>/g, ' ')) })
    }
    blocks.push({ html: m[0], text: norm(m[0].replace(/<[^>]+>/g, ' ')) })
    last = m.index + m[0].length
  }
  if (last < html.length) {
    const frag = html.slice(last).trim()
    if (frag) blocks.push({ html: frag, text: norm(frag.replace(/<[^>]+>/g, ' ')) })
  }
  return blocks
}

const USO_START_EN = [
  'usage recommendations', 'directions for use', 'how to use', 'instructions for use',
  'recommended use', 'recommendations for use', 'application and recommendations',
  'protocol of application', 'application protocol', 'usage', 'main uses',
  'uses', 'use:', 'indications', 'directions', 'solicitud'
]
const OTHER_SECTIONS_EN = [
  'composition', 'ingredients', 'contraindications', 'warnings', 'warning',
  'storage', 'conservation', 'additional information', 'precautions',
  'side effects', 'interactions', 'important recommendations', 'recommendations:',
  'recommendations', 'prescription information', 'technical data sheet',
  'what is it for', 'what it is for', 'what is', 'main characteristics',
  'nutritional facts', 'supplement facts', 'nutritional information',
  'ideal for', 'content', 'net content'
]

const BLOCK_OVERRIDES_EN = {
  'tranexamicum': { start: 'suggestion 1' },
  'vitamina-c': { start: 'suggestion 1' },
  'acido-hyaluronico': { start: 'suggestion 1' },
  'refreshing-cleansing-balm': { start: 'usage recommendations' },
  'medicina-estetica': { start: 'usage recommendations' }
}

const INSIDE_FROM_OVERRIDES_EN = {
  'antiaging-skin-oil': { insideFrom: 'use:', end: ['storage:', 'precautions', 'side effects'] },
  'cream-to-foam-lotion': { insideFrom: 'use:', end: ['storage:', 'precautions', 'side effects'] }
}

const splitByBr = (html) => {
  const parts = []
  const re = /<br\s*\/?>/gi
  let last = 0
  let m
  while ((m = re.exec(html))) {
    parts.push({ html: html.slice(last, m.index), br: m[0], end: m.index })
    last = m.index + m[0].length
  }
  parts.push({ html: html.slice(last), br: '', end: last })
  return parts
}

const joinParts = (ps) => ps.map((x, i) => x.html + (x.br || (i < ps.length - 1 ? '<br />' : ''))).join('')
const wrapP = (s, abrir, cerrar) => {
  let out = s
  if (abrir && !out.startsWith('<p')) out = `<p>${out}`
  if (cerrar && !out.endsWith('</p>')) out += '</p>'
  return out
}

const cutInsideBlock = (blockHtml, endMarkers) => {
  const parts = splitByBr(blockHtml)
  let cutIdx = -1
  for (let i = 1; i < parts.length; i++) {
    const t = norm(parts[i].html.replace(/<[^>]+>/g, ' '))
    if (t && endMarkers.some((mk) => t.includes(mk))) { cutIdx = i; break }
  }
  if (cutIdx === -1) return null
  return { uso: wrapP(joinParts(parts.slice(0, cutIdx)), true, true), resto: wrapP(joinParts(parts.slice(cutIdx)), true, true) }
}

const cutFromInside = (blockHtml, marker, endMarkers) => {
  const parts = splitByBr(blockHtml)
  let from = -1
  for (let i = 0; i < parts.length; i++) {
    const t = norm(parts[i].html.replace(/<[^>]+>/g, ' '))
    if (t && t.includes(marker)) { from = i; break }
  }
  if (from === -1) return null
  let to = parts.length
  for (let i = from + 1; i < parts.length; i++) {
    const t = norm(parts[i].html.replace(/<[^>]+>/g, ' '))
    if (t && endMarkers.some((mk) => t.includes(mk))) { to = i; break }
  }
  return {
    uso: wrapP(joinParts(parts.slice(from, to)), true, true),
    resto: wrapP(joinParts([...parts.slice(0, from), ...parts.slice(to)]), true, true)
  }
}

const clean = (h) => h.replace(/&nbsp;/g, ' ').replace(/\s+</g, '<').replace(/>\s+/g, '>').trim()
const htmlToText = (h) => norm(h.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()

const extraer = (slug, html) => {
  if (!html) return { uso: '', resto: html }
  const ins = INSIDE_FROM_OVERRIDES_EN[slug]
  if (ins) {
    const cut = cutFromInside(html, ins.insideFrom, ins.end)
    return cut ? { uso: clean(cut.uso), resto: clean(cut.resto) } : { uso: '', resto: html }
  }
  const blocks = splitBlocks(html)
  const ov = BLOCK_OVERRIDES_EN[slug]
  const startMarkers = ov ? [ov.start] : USO_START_EN
  const startIdx = blocks.findIndex((b) => b.text && startMarkers.some((s) => b.text.includes(s)))
  if (startIdx === -1) return { uso: '', resto: html }
  const inner = cutInsideBlock(blocks[startIdx].html, OTHER_SECTIONS_EN)
  if (inner) {
    const restBlocks = [
      ...blocks.slice(0, startIdx),
      { html: inner.resto, text: norm(inner.resto.replace(/<[^>]+>/g, ' ')) },
      ...blocks.slice(startIdx + 1)
    ]
    return { uso: clean(inner.uso), resto: clean(restBlocks.map((b) => b.html).join('')) }
  }
  let endIdx = blocks.length
  for (let i = startIdx + 1; i < blocks.length; i++) {
    if (blocks[i].text && OTHER_SECTIONS_EN.some((s) => blocks[i].text.includes(s))) { endIdx = i; break }
  }
  return {
    uso: clean(blocks.slice(startIdx, endIdx).map((b) => b.html).join('')),
    resto: clean([...blocks.slice(0, startIdx), ...blocks.slice(endIdx)].map((b) => b.html).join(''))
  }
}

// Reemplaza el contenido de un campo template literal en el archivo fuente
function reemplazarCampo(src, slug, campo, nuevoValor) {
  const keyRe = new RegExp(`('${slug}'\\s*:\\s*\\{[\\s\\S]*?${campo}:\\s*\`)`)
  const m = keyRe.exec(src)
  if (!m) { console.error('  ! no encontré', slug, campo); return src }
  const openIdx = m.index + m[1].length
  const closeIdx = src.indexOf('`', openIdx)
  if (closeIdx === -1) { console.error('  ! sin cierre para', slug, campo); return src }
  const esc = nuevoValor.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
  return src.slice(0, openIdx) + esc + src.slice(closeIdx)
}

const results = []
let inserted = 0
for (const [slug, item] of Object.entries(map)) {
  const { uso, resto } = extraer(slug, item.descriptionHtml || '')
  results.push({ slug, name: item.name || slug, uso, resto })
  if (!uso) continue
  src = reemplazarCampo(src, slug, 'descriptionHtml', resto)
  src = reemplazarCampo(src, slug, 'usoHtml', uso)
  inserted++
}

fs.writeFileSync(file, src)
console.log(`✅ usoHtml insertado + descripción limpiada en ${inserted}/${results.length} productos`)

for (const r of results) {
  console.log(`${r.uso ? '✅' : '⬜'} ${r.name} [${r.slug}]${r.uso ? ` (${r.uso.length} ch) uso | resto ${r.resto.length} ch` : ' (vacío → fallback)'}`)
}
