# FASE 7.9 — PWA, OFFLINE Y DESPLIEGUE

---

## PWA (Progressive Web App)

La web app es instalable como PWA en escritorio y movil.

### Manifest
```json
{
  "name": "Nooks — Gestiona clientes, tiempo y facturas",
  "short_name": "Nooks",
  "description": "App para freelancers: proyectos, time tracking, facturacion e IA",
  "display": "standalone",
  "orientation": "any",
  "start_url": "/app",
  "scope": "/app",
  "theme_color": "#0D1117",
  "background_color": "#0D1117",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icons/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

### Service Worker (Vite PWA Plugin)

```typescript
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.nooks\.com\/api\/v1\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 5 },  // 5 min
            },
          },
        ],
      },
    }),
  ],
});
```

**Estrategia de cache:**
- **Shell (HTML, JS, CSS, fonts):** Cache-first (instalado offline)
- **API responses:** Network-first con fallback a cache (5 min TTL)
- **Imagenes/assets:** Cache-first con expiracion larga

---

## Offline basico

| Scenario | Comportamiento |
|----------|---------------|
| Sin conexion, app ya cargada | Shell funciona, muestra datos cacheados, banner "Sin conexion" |
| Timer activo sin conexion | Timer sigue contando (en memoria via setInterval), sync al reconectar |
| Crear tarea sin conexion | NO soportado en v1 (requiere backend). Mostrar "No disponible offline" |
| Reconexion | TanStack Query hace refetch automatico. Timer se sincroniza con servidor |

- [ ] Indicador online/offline: dot verde/rojo en TopBar + banner si offline
- [ ] Detectar estado: `navigator.onLine` + event listeners `online`/`offline`
- [ ] Al reconectar: invalidar todas las queries de TanStack para refetch

---

## Variables de entorno

```bash
# .env.example
VITE_API_URL=https://api.nooks.com
VITE_STRIPE_PUBLIC_KEY=pk_live_...
VITE_APP_URL=https://nooks.com
VITE_ENVIRONMENT=production    # development | staging | production
```

**Entornos:**
| Variable | Development | Staging | Production |
|----------|-------------|---------|------------|
| VITE_API_URL | http://localhost:8000 | https://staging-api.nooks.com | https://api.nooks.com |
| VITE_APP_URL | http://localhost:5173 | https://staging.nooks.com | https://nooks.com |
| VITE_STRIPE_PUBLIC_KEY | pk_test_... | pk_test_... | pk_live_... |

---

## Despliegue

### URLs
- `nooks.com` → Landing page + Web app (mismo build)
- `nooks.com/app/*` → Web app (requiere login)
- `api.nooks.com` → FastAPI backend (ya desplegado en fases previas)

### Hosting: Netlify (recomendado) o Vercel

**Netlify config:**
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/app/*"
  to = "/index.html"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/manifest.json"
  [headers.values]
    Content-Type = "application/manifest+json"
```

### CI/CD (GitHub Actions)

```yaml
# .github/workflows/deploy-web.yml
name: Deploy Web App

on:
  push:
    branches: [main]
    paths: ['nooks-web/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: cd nooks-web && npm ci
      - run: cd nooks-web && npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
          VITE_STRIPE_PUBLIC_KEY: ${{ secrets.VITE_STRIPE_PUBLIC_KEY }}
      - uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=nooks-web/dist
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### SEO para SPA
```
# public/robots.txt
User-agent: *
Allow: /
Disallow: /app/
Sitemap: https://nooks.com/sitemap.xml
```

La landing (`/`) es indexable. La webapp (`/app/*`) no es indexable (requiere login, contenido dinamico).

---

## Performance targets

| Metrica | Objetivo |
|---------|----------|
| Lighthouse Performance | > 90 |
| Lighthouse Accessibility | > 95 |
| Lighthouse Best Practices | > 95 |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Bundle size (gzipped) | < 300KB initial |

**Estrategias:**
- [ ] Code splitting por ruta (React.lazy + Suspense)
- [ ] Fonts: preload Inter y JetBrains Mono
- [ ] Imagenes: WebP con fallback, lazy loading
- [ ] TanStack Query: prefetch en hover de links de navegacion
- [ ] Tree shaking: imports especificos de Lucide, date-fns, Recharts
