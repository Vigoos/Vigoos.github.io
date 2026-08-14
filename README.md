# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Despliegue en Cloudflare Pages

El sitio usa el preset de Nitro `cloudflare_pages` (script `pnpm build:cf`) para
generar un Worker que incluye las rutas de servidor (p. ej. `/api/contact` del
formulario) junto con los assets estáticos. Todo queda en la carpeta `dist/`.

### Desde el dashboard de Cloudflare (Git integration)

1. Cuenta en Cloudflare → **Workers & Pages** → **Create application** → pestaña **Pages**.
2. **Import an existing Git repository** y conecta tu repo (GitHub/GitLab).
3. Configuración del build:
   - **Build command:** `pnpm build:cf`
   - **Build output directory:** `dist`
4. En **Settings → Variables and Secrets** (entorno *Production*):
   - `NUXT_PUBLIC_WEB3FORMS_KEY` = clave pública de Web3Forms (la misma que hoy
     inyecta el workflow de GitHub Actions; la ruta `/api/contact` usa esta key
     o, si existe, la privada `WEB3FORMS_KEY`).
5. **Save and Deploy**. Cada push a `main` (y cada PR) genera un deploy automático
   con preview en una URL real.

### Localmente (wrangler)

```bash
pnpm build:cf
pnpm dlx wrangler pages dev dist    # servidor local en http://localhost:8788
```

### Notas

- El Worker sirve las páginas (SSR) y la API; los assets estáticos (imágenes,
  `/_nuxt/*`, PWA) se sirven desde el CDN según `_routes.json` generado por Nitro.
- Los headers de seguridad (CSP, HSTS, X-Frame-Options…) los genera
  `nuxt-security` en `dist/_headers`.
- `dist/` y `.output/` están en `.gitignore` (se generan en cada build).
- El workflow `deploy.yml` (GitHub Pages) usa `nuxt generate` (estático) y no
  se ve afectado por el preset de Cloudflare.
