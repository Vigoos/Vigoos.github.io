// Script: extrae usoHtml del catálogo en inglés (catalogo_en.js) con marcadores EN,
// replicando la misma lógica que el script ES. Inserta el campo `usoHtml` después
// de cada `descriptionHtml` preservando el formato original (template literals).
import fs from 'node:fs'
import path from 'node:path'

const file = path.resolve('app/data/catalogo_en.js')
const src = fs.readFileSync(file, 'utf8')
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

// Overrides para bloques donde el marcador de inicio está DENTRO del bloque
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

const cutInsideBlock = (blockHtml, endMarkers) => {
  const parts = splitByBr(blockHtml)
  let cutIdx = -1
  for (let i = 1; i < parts.length; i++) {
    const t = norm(parts[i].html.replace(/<[^>]+>/g, ' '))
    if (t && endMarkers.some((mk) => t.includes(mk))) { cutIdx = i; break }
  }
  if (cutIdx === -1) return null
  const usoParts = parts.slice(0, cutIdx)
  const join = (ps) => ps.map((x, i) => x.html + (x.br || (i < ps.length - 1 ? '<br />' : ''))).join('')
  let uso = join(usoParts).trim()
  if (!uso.startsWith('<p')) uso = `<p>${uso}`
  if (!uso.endsWith('</p>')) uso += '</p>'
  return uso
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
  const usoParts = parts.slice(from, to)
  const join = (ps) => ps.map((x, i) => x.html + (x.br || (i < ps.length - 1 ? '<br />' : ''))).join('')
  let uso = join(usoParts).trim()
  if (!uso.startsWith('<p')) uso = `<p>${uso}`
  if (!uso.endsWith('</p>')) uso += '</p>'
  return uso
}

const clean = (h) => h.replace(/&nbsp;/g, ' ').replace(/\s+</g, '<').replace(/>\s+/g, '>').trim()
const htmlToText = (h) => norm(h.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()

// Extraer uso para cada slug
const extraer = (slug, html) => {
  if (!html) return ''
  const ins = INSIDE_FROM_OVERRIDES_EN[slug]
  if (ins) {
    const uso = cutFromInside(html, ins.insideFrom, ins.end)
    return clean(uso || '')
  }
  const blocks = splitBlocks(html)
  const ov = BLOCK_OVERRIDES_EN[slug]
  const startMarkers = ov ? [ov.start] : USO_START_EN
  const startIdx = blocks.findIndex((b) => b.text && startMarkers.some((s) => b.text.includes(s)))
  if (startIdx === -1) return ''
  const inner = cutInsideBlock(blocks[startIdx].html, OTHER_SECTIONS_EN)
  if (inner) return clean(inner)
  let endIdx = blocks.length
  for (let i = startIdx + 1; i < blocks.length; i++) {
    if (blocks[i].text && OTHER_SECTIONS_EN.some((s) => blocks[i].text.includes(s))) { endIdx = i; break }
  }
  return clean(blocks.slice(startIdx, endIdx).map((b) => b.html).join(''))
}

// Insertar usoHtml después de cada descriptionHtml (template literal)
const results = []
let out = src
let inserted = 0
for (const [slug, item] of Object.entries(map)) {
  const uso = extraer(slug, item.descriptionHtml || '')
  results.push({ slug, name: item.name || slug, uso })
  if (!uso) continue
  const esc = uso.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
  // Buscar el cierre del template literal de descriptionHtml de ESTE slug
  const keyRe = new RegExp(`('${slug}'\\s*:\\s*\\{[\\s\\S]*?descriptionHtml:\\s*\`)`)
  const m = keyRe.exec(out)
  if (!m) { console.error('No encontré descriptionHtml de', slug); continue }
  const descStart = m.index + m[1].length
  // el template literal termina en el primer backtick no escapado después de descStart
  const closeIdx = out.indexOf('`', descStart)
  if (closeIdx === -1) { console.error('Sin cierre de template para', slug); continue }
  const insertAt = closeIdx + 1
  out = out.slice(0, insertAt) + `,\n    usoHtml: \`${esc}\`` + out.slice(insertAt)
  inserted++
}

fs.writeFileSync(file, out)
console.log(`✅ usoHtml insertado en ${inserted}/${results.length} productos`)

// Reporte
for (const r of results) {
  console.log(`${r.uso ? '✅' : '⬜'} ${r.name} [${r.slug}]${r.uso ? ` (${r.uso.length} ch): ${htmlToText(r.uso).slice(0, 90)}...` : ' (vacío → fallback)'}`)
}
