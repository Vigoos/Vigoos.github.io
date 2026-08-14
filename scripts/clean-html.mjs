// Limpia el HTML del catálogo (ES y EN):
// 1. Quita atributos data-* de Word/Office (data-start, data-end, data-contrast...)
// 2. Inserta espacios entre texto y tags inline pegados (en<strong>mezcla → en <strong>mezcla)
// 3. Inserta espacio tras cierre inline seguido de letra (</strong>gracias → </strong> gracias)
// 4. Sub-títulos cortos con ":" al inicio de párrafo bajan su contenido con <br />
// 5. Normaliza &nbsp;, espacios múltiples y saltos de línea
import fs from 'node:fs'
import path from 'node:path'

const INLINE = '(?:strong|b|span|em|i|u|small|sup|sub|a|mark)'
const LETRA = 'a-z0-9áéíóúñü'

export function limpiarHtml(html) {
  if (!html) return html
  return html
    // 1. atributos basura de Word/Office
    .replace(/\sdata-(contrast|ccp-props|start|end)="[^"]*"/gi, '')
    .replace(/\sdata-(contrast|ccp-props|start|end)='[^']*'/gi, '')
    // 4. (primero) sub-título corto con ":" AL INICIO de párrafo → bajar contenido
    //    Precedido por apertura de bloque (p/h*/div/ul...) o por <br />; seguido de letra.
    //    NO toca strongs en medio de frase ni <br /> de otros tags.
    .replace(
      new RegExp(`(<(?:p|h[1-6]|div|ul|ol|li|td|th)\\b[^>]*>|<br\\s*/?>\\s*|<\\/p>\\s*)(${INLINE}\\b[^>]*>[^<]{1,45}:<\\/${INLINE}>)(?:\\s*)(?=[${LETRA}])`, 'gi'),
      '$1$2<br />'
    )
    // 5. Normalizar &nbsp; y espacios (antes de las reglas de espacios, para no duplicar)
    .replace(/&nbsp;/g, ' ')
    .replace(/\u00a0/g, ' ')
    // 2. espacio entre texto y tag inline de apertura
    .replace(new RegExp(`([${LETRA}])<(${INLINE}\\b)`, 'gi'), '$1 <$2')
    // 3. espacio después de cierre inline seguido de palabra
    .replace(new RegExp(`<\\/(${INLINE})>(?=[${LETRA}])`, 'gi'), '</$1> ')
    // normalizar espacios y líneas
    .replace(/[ \t]+/g, ' ')
    .replace(/\s*\n\s*/g, '\n')
    .replace(/>\s+</g, '><')
    .trim()
}

const htmlToText = (h) => (h || '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ')
  .replace(/\u00a0/g, ' ')
  .replace(/[ \t]+/g, ' ')
  .replace(/\s*\n\s*/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()

// ============ ES (catalogo.json) ============
const esFile = path.resolve('app/data/catalogo.json')
const es = JSON.parse(fs.readFileSync(esFile, 'utf8'))
const items = Array.isArray(es) ? es : (es.productos || es.items || [])
let esStats = 0
for (const p of items) {
  for (const campo of ['descriptionHtml', 'usoHtml']) {
    const limpio = limpiarHtml(p[campo])
    if (limpio !== p[campo]) esStats++
    p[campo] = limpio
  }
  p.descriptionText = htmlToText(p.descriptionHtml)
}
fs.writeFileSync(esFile, JSON.stringify(es, null, 2) + '\n')
console.log(`✅ ES: ${items.length} productos procesados, ${esStats} campos modificados`)

// ============ EN (catalogo_en.js, template literals) ============
const enFile = path.resolve('app/data/catalogo_en.js')
let src = fs.readFileSync(enFile, 'utf8')
const mod = await import('file://' + enFile.replace(/\\/g, '/'))
const map = mod.default
let enStats = 0

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

for (const [slug, item] of Object.entries(map)) {
  for (const campo of ['descriptionHtml', 'usoHtml']) {
    const limpio = limpiarHtml(item[campo])
    if (limpio !== item[campo]) { enStats++; src = reemplazarCampo(src, slug, campo, limpio) }
  }
}
fs.writeFileSync(enFile, src)
console.log(`✅ EN: ${Object.keys(map).length} productos procesados, ${enStats} campos modificados`)
