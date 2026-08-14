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

> ⚠️ **IMPORTANTE: NO crear un `wrangler.toml` en la raíz del repo.**
> Cloudflare detecta la presencia de `wrangler.toml` y asume que el proyecto es
> de tipo **Workers** (no Pages), por lo que el dashboard muestra el comando
> `npx wrangler deploy` (comando de Workers) y falla con *"Missing entry-point
> to Worker script or to assets directory"*. Para Pages con Git integration el
> archivo de configuración NO se usa: todo se configura en el dashboard.

### Desde el dashboard de Cloudflare (Git integration)

1. Cuenta en Cloudflare → **Workers & Pages** → **Create application** → pestaña **Pages**.
2. **Import an existing Git repository** y conecta tu repo (GitHub/GitLab).
3. Si Cloudflare te ofrece el flujo de **Workers** (comando `npx wrangler deploy`),
   cancela y vuelve a empezar eligiendo la pestaña **Pages** → **Import an existing
   Git repository**. Verifica que la sección *Set up builds and deployments* muestre
   campos de *Build command* y *Build output directory* (esos campos solo existen en
   el flujo Pages, no en Workers).
4. Configuración del build:
   - **Build command:** `pnpm build:cf`
   - **Build output directory:** `dist`
5. En **Settings → Variables and Secrets** (entorno *Production*):
   - `NUXT_PUBLIC_WEB3FORMS_KEY` = clave pública de Web3Forms (la misma que hoy
     inyecta el workflow de GitHub Actions; la ruta `/api/contact` usa esta key
     o, si existe, la privada `WEB3FORMS_KEY`).
6. **Save and Deploy**. Cada push a `main` (y cada PR) genera un deploy automático
   con preview en una URL real.

### Localmente (wrangler, opcional)

```bash
pnpm build:cf
pnpm dlx wrangler pages dev dist    # servidor local en http://localhost:8788
```

> Nota: para el desarrollo local con `wrangler pages dev` tampoco se necesita un
> `wrangler.toml`; el output de `pnpm build:cf` ya incluye `_worker.js`,
> `_routes.json` y `_headers` generados por Nitro.

### Notas

- El Worker sirve las páginas (SSR) y la API; los assets estáticos (imágenes,
  `/_nuxt/*`, PWA) se sirven desde el CDN según `_routes.json` generado por Nitro.
- Los headers de seguridad (CSP, HSTS, X-Frame-Options…) los genera
  `nuxt-security` en `dist/_headers`.
- `dist/` y `.output/` están en `.gitignore` (se generan en cada build).
- El workflow `deploy.yml` (GitHub Pages) usa `nuxt generate` (estático) y no
  se ve afectado por el preset de Cloudflare.
