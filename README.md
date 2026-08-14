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

## Despliegue en Cloudflare (Workers con static assets)

El sitio se genera **100% estático** con `nuxi generate` (igual que hoy en GitHub
Pages): la carpeta `.output/public` contiene todo (HTML, JS, imágenes, PWA).
Cloudflare la publica como **static assets de un Worker** (sin script de Worker,
sin SSR), así que el hosting es gratis y no se cobra por compute.

El archivo `wrangler.toml` del repo raíz describe únicamente dónde están los
assets (`[assets] directory = "./.output/public"`) y cómo servir el `404.html`.

> ⚠️ Este flujo es para un proyecto de tipo **Workers** en Cloudflare. No uses el
> preset `cloudflare_pages` (`build:cf`) ni la pestaña de creación **Pages**: el
> proyecto Workers estático no genera `_worker.js` ni rutas de servidor. La ruta
> `/api/contact` del formulario NO existe en estático: el formulario usa el
> fallback directo a Web3Forms (igual que hoy en GitHub Pages), que funciona
> porque `NUXT_PUBLIC_WEB3FORMS_KEY` se inyecta en tiempo de build.

### Desde el dashboard de Cloudflare (Git integration)

1. Cuenta en Cloudflare → **Workers & Pages** → crea un proyecto **Worker** conectado
   a tu repo (GitHub).
2. Configuración del build (Settings → Builds):
   - **Build command:** `pnpm dlx nuxi generate`
   - **Deploy command:** `npx wrangler deploy`
   - **Root directory:** `/`
   - **Production branch:** `main`
3. En **Variables and secrets** (variable, no secret):
   - `NUXT_PUBLIC_WEB3FORMS_KEY` = clave pública de Web3Forms. Debe existir en
     **tiempo de build** (se incrusta en el bundle JS al generar el sitio).
4. **Save and Deploy**. Cada push a `main` (y cada PR) genera un deploy automático
   con preview en una URL real.

### Localmente (wrangler, opcional)

```bash
pnpm dlx nuxi generate
pnpm dlx wrangler deploy --dry-run   # valida la config sin desplegar
pnpm dlx wrangler dev                # sirve .output/public en http://localhost:8787
```

### Notas

- `wrangler.toml` NO lleva `main` ni bindings (KV, D1…): es un proyecto de solo
  assets. Si agregaras `main`, wrangler intentaría desplegar un Worker script.
- Los headers de seguridad (CSP, HSTS…) que genera `nuxt-security` aplican al
  servidor (GitHub Actions/Pages); en el hosting estático de Cloudflare se sirven
  sin headers personalizados (igual que hoy en GitHub Pages).
- `.output/` está en `.gitignore` (se genera en cada build); `wrangler.toml` SÍ
  se commitea porque Cloudflare lo lee en el deploy.
- El workflow `deploy.yml` (GitHub Pages) sigue usando `nuxt generate` y es
  independiente del despliegue en Cloudflare.
