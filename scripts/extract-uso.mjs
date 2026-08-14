// Script: extrae la sección de "uso/modo de uso" de cada descriptionHtml → usoHtml,
// dejando descriptionHtml solo con lo descriptivo. Actualiza descriptionText igual.
// - Bloques multi-sección (marcadores dentro del mismo <p> con <br />): se dividen
//   por <br /> y se corta en el segmento que contiene un marcador de fin.
// - Profesionales (Tranexamicum, Vitamina C, Ácido hialurónico): el uso es la sección
//   de "Sugerencia/Protocolo/Solicitud", se fuerza con overrides.
// - Clarisa Intima: descripción vacía → se reconstruye desde shortDescription.
import fs from 'node:fs'
import path from 'node:path'

const file = path.resolve('app/data/catalogo.json')
const es = JSON.parse(fs.readFileSync(file, 'utf8'))
const items = Array.isArray(es) ? es : (es.productos || es.items || [])

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

const USO_START = [
  'modo de uso', 'como se usa', 'como se utiliza', 'instrucciones de uso',
  'recomendaciones de uso', 'protocolo de aplicacion', 'solicitud',
  'usos principales', 'usos', 'uso:', 'indicaciones'
]
const OTHER_SECTIONS = [
  'composicion', 'ingredientes', 'contraindicaciones', 'advertencias', 'advertencia',
  'almacenamiento', 'conservacion', 'informacion adicional', 'precauciones',
  'efectos secundarios', 'interacciones', 'recomendaciones importantes',
  'recomendaciones:', 'recomendaciones', 'informacion de prescripcion',
  'ficha tecnica', 'para que sirve', 'que es', 'principales caracteristicas',
  'datos nutricionales', 'hechos de suplementos', 'dato nutricional',
  'ideal para', 'contenido'
]

// Overrides por slug: forzar marcador de inicio de la sección de uso (profesionales)
const BLOCK_OVERRIDES = {
  'tranexamicum': { start: 'sugerencia 1' },
  'vitamina-c': { start: 'sugerencia 1' },
  'acido-hyaluronico': { start: 'solicitud' },
  'refreshing-cleansing-balm': { start: 'recomendaciones de uso' },
  'medicina-estetica': { start: 'recomendaciones de uso' }
}

// Divide un bloque HTML en segmentos por <br /> y devuelve índices raw
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

// Corta dentro de un bloque multi-sección: devuelve { uso, resto } o null
const cutInsideBlock = (blockHtml, endMarkers) => {
  const parts = splitByBr(blockHtml)
  // el primer segmento es el encabezado (USOS / MODO DE USO...); buscamos el fin
  // desde el segmento 1 para no cortar en el propio título
  let cutIdx = -1
  for (let i = 1; i < parts.length; i++) {
    const t = norm(parts[i].html.replace(/<[^>]+>/g, ' '))
    if (t && endMarkers.some((mk) => t.includes(mk))) { cutIdx = i; break }
  }
  if (cutIdx === -1) return null
  const usoParts = parts.slice(0, cutIdx)
  const restoParts = parts.slice(cutIdx)
  const join = (ps) => ps.map((x, i) => x.html + (x.br || (i < ps.length - 1 ? '<br />' : ''))).join('')
  let uso = join(usoParts).trim()
  let resto = join(restoParts).trim()
  if (!uso.startsWith('<p')) uso = `<p>${uso}`
  if (!uso.endsWith('</p>')) uso += '</p>'
  if (!resto.startsWith('<p')) resto = `<p>${resto}`
  if (!resto.endsWith('</p>')) resto += '</p>'
  return { uso, resto }
}

const htmlToText = (h) => norm(h.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()
const clean = (h) => h.replace(/&nbsp;/g, ' ').replace(/\s+</g, '<').replace(/>\s+/g, '>').trim()

const results = []
for (const p of items) {
  const html = (p.descriptionHtml || '').trim()
  let out

  if (p.slug === 'clarisa-intima') {
    const desc = (p.shortDescription || '').trim()
    out = { status: 'RECONSTRUIDO', uso: '', resto: desc ? `<p>${desc}</p>` : '' }
  } else if (!html) {
    out = { status: 'VACÍO', uso: '', resto: '' }
  } else {
    const blocks = splitBlocks(html)
    const ov = BLOCK_OVERRIDES[p.slug]
    const startMarkers = ov ? [ov.start] : USO_START
    const startIdx = blocks.findIndex((b) => b.text && startMarkers.some((s) => b.text.includes(s)))
    if (startIdx === -1) {
      out = { status: 'SIN_MARCADOR', uso: '', resto: html }
    } else {
      // ¿El bloque de inicio contiene además un marcador de fin? (multi-sección)
      const inner = cutInsideBlock(blocks[startIdx].html, OTHER_SECTIONS)
      if (inner) {
        const restBlocks = [
          ...blocks.slice(0, startIdx),
          { html: inner.resto, text: norm(inner.resto.replace(/<[^>]+>/g, ' ')) },
          ...blocks.slice(startIdx + 1)
        ]
        out = { status: 'OK', uso: inner.uso, resto: restBlocks.map((b) => b.html).join('').trim() }
      } else {
        let endIdx = blocks.length
        for (let i = startIdx + 1; i < blocks.length; i++) {
          if (blocks[i].text && OTHER_SECTIONS.some((s) => blocks[i].text.includes(s))) { endIdx = i; break }
        }
        const uso = blocks.slice(startIdx, endIdx).map((b) => b.html).join('')
        const resto = [...blocks.slice(0, startIdx), ...blocks.slice(endIdx)].map((b) => b.html).join('').trim()
        out = { status: 'OK', uso, resto }
      }
    }
  }

  const uso = clean(out.uso)
  const resto = clean(out.resto)
  results.push({ slug: p.slug, name: p.name, status: out.status, uso, resto })

  p.usoHtml = uso
  p.descriptionHtml = resto
  p.descriptionText = htmlToText(resto)
}

// --- Reporte ---
console.log('='.repeat(100))
for (const r of results) {
  console.log(`\n### ${r.name} [${r.slug}] → ${r.status}`)
  if (r.uso) console.log(`  USO   (${r.uso.length} ch): ${htmlToText(r.uso).slice(0, 130)}...`)
  else console.log('  USO   (vacío → fallback de prescripción en el modal)')
  if (r.resto) console.log(`  DESCR (${r.resto.length} ch): ${htmlToText(r.resto).slice(0, 130)}...`)
  else console.log('  DESCR (vacío → usará shortDescription en el modal)')
}

fs.writeFileSync(file, JSON.stringify(es, null, 2) + '\n')
console.log('\n✅ catalogo.json actualizado con usoHtml')
