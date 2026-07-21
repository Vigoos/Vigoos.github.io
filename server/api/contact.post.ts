export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  // La clave PRIVADA está en runtimeConfig (NUNCA expuesta al frontend)
  const accessKey = config.web3formsKey

  if (!accessKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Web3Forms API key not configured on server'
    })
  }

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      ...body
    })
  })

  // Verificar estado antes de parsear JSON
  if (!response.ok) {
    throw createError({
      statusCode: response.status,
      statusMessage: 'Web3Forms submission failed'
    })
  }

  const result = await response.json()
  return result
})
