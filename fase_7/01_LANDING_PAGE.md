# FASE 7.1 — LANDING PAGE

> La landing page es la puerta de entrada. Vive en `nooks.com` (ruta `/`). El boton "Acceder" arriba a la derecha lleva a `/app` (la webapp).

---

## Layout general

```
+================================================================+
|  [Logo Nooks]                      [Acceder]  [Registrarse]|
+================================================================+
|                                                                 |
|              HERO SECTION                                       |
|  "Gestiona clientes, tiempo y facturas.                         |
|   Con IA que entiende tu contexto."                             |
|                                                                 |
|  [Empezar gratis]        [Ver demo]                             |
|                                                                 |
|  [Screenshot movil]  [Screenshot web]                           |
|                                                                 |
+-----------------------------------------------------------------+
|                                                                 |
|              FEATURES (3 columnas)                              |
|  [icono] Proyecto=Cliente    [icono] Time Tracking              |
|  Toda la info de tu cliente  Timer global, reportes,            |
|  en un solo lugar.           horas por proyecto.                |
|                                                                 |
|  [icono] Facturacion         [icono] IA integrada               |
|  Horas x tarifa = factura    Resumen reuniones, prioriza        |
|  PDF en un click.            tu dia, genera emails.             |
|                                                                 |
+-----------------------------------------------------------------+
|                                                                 |
|              COMO FUNCIONA (3 pasos)                            |
|  1. Crea un proyecto        2. Trackea tu tiempo               |
|     para tu cliente             por tarea                       |
|                                                                 |
|  3. Genera factura                                              |
|     desde las horas reales                                      |
|                                                                 |
+-----------------------------------------------------------------+
|                                                                 |
|              PLANES Y PRECIOS                                   |
|  +----------+  +----------+  +----------+                       |
|  |   Free   |  |   Pro    |  | Business |                       |
|  |  0 EUR   |  |  6 EUR   |  | 12 EUR   |                       |
|  | 2 proy.  |  | Ilimitado|  | Ilimitado|                       |
|  | Timer    |  | Facturas |  | Todo     |                       |
|  |basico    |  | AI Cloud |  | Ilimitado|                       |
|  |[Empezar] |  |[Mejorar] |  |[Mejorar] |                       |
|  +----------+  +----------+  +----------+                       |
|                                                                 |
+-----------------------------------------------------------------+
|                                                                 |
|              TESTIMONIOS / SOCIAL PROOF                         |
|  "Nooks me ahorra 2h al dia" — Ana, disenadora             |
|  "Por fin facturo desde la misma app" — Carlos, dev             |
|                                                                 |
+-----------------------------------------------------------------+
|                                                                 |
|              CTA FINAL                                          |
|  "Empieza gratis. Sin tarjeta."                                 |
|  [Crear cuenta]                                                 |
|                                                                 |
+-----------------------------------------------------------------+
|                                                                 |
|              FOOTER                                             |
|  Nooks | Terminos | Privacidad | Contacto                   |
|  App Store | Play Store | Web App                                |
|                                                                 |
+-----------------------------------------------------------------+
```

---

## Navegacion landing

**Header fijo (sticky):**
- Logo Nooks (izquierda)
- Links: Features | Precios | Contacto (centro, opcionales)
- **Boton "Acceder"** (arriba derecha) → navega a `/app/login`
- **Boton "Registrarse"** (arriba derecha, destacado) → navega a `/app/register`
- Al hacer scroll, el header gana fondo con blur (glassmorphism)

**Responsive:**
- Desktop (>= 1024px): Layout completo, screenshots lado a lado
- Tablet (768-1023px): Features en 2 columnas, screenshots apilados
- Movil (< 768px): Todo en 1 columna, header con hamburger menu

---

## Secciones detalladas

### Hero
- Titulo principal: H1, tipografia bold, maximo 2 lineas
- Subtitulo: 1 linea descriptiva en texto secundario
- 2 botones: "Empezar gratis" (primary) + "Ver demo" (secondary/outline)
- Screenshots: mockup de la app movil + screenshot de la webapp en laptop
- Background: dark (`#0D1117`) con gradiente sutil hacia `#1E1E2D`. Toda la landing es dark — misma identidad que la app

### Features
- 4-6 cards con icono, titulo (2-3 palabras), descripcion (1-2 lineas)
- Animacion al entrar en viewport (fade-in + slide-up con IntersectionObserver)
- Features a destacar: Proyecto=Cliente, Time Tracking, Facturacion, IA, Kanban, Multi-plataforma

### Como funciona
- 3 pasos numerados con ilustracion/screenshot de cada paso
- Linea conectora entre pasos (visual de flujo)

### Planes y precios
- 3 cards identicas a la pantalla de planes de la webapp
- Tabla comparativa colapsable para detalle
- CTA por plan: Free → "Empezar gratis", Pro/Business → "Probar 14 dias gratis"

### Testimonios
- 2-3 testimonios reales (o placeholder para beta)
- Foto + nombre + profesion + quote

### CTA final
- Fondo destacado (accent color o gradiente)
- Titulo persuasivo + boton grande

### Footer
- Links legales: Terminos, Privacidad, Cookies
- Links de descarga: App Store, Play Store, Web App
- Copyright + redes sociales (si aplica)

---

## SEO y meta tags

```html
<title>Nooks — Gestiona clientes, tiempo y facturas | App para freelancers</title>
<meta name="description" content="La unica app donde gestionas clientes, trackeas tiempo, facturas y usas IA. Para freelancers y autonomos. Gratis." />
<meta property="og:title" content="Nooks — App para freelancers" />
<meta property="og:description" content="Gestiona clientes, tiempo y facturas en un solo sitio." />
<meta property="og:image" content="/og-image.png" />
<meta property="og:url" content="https://nooks.com" />
<link rel="canonical" href="https://nooks.com" />
```

- [ ] Sitemap.xml generado automaticamente
- [ ] robots.txt permitiendo indexacion de landing, bloqueando /app/*
- [ ] Schema.org markup para SoftwareApplication
- [ ] Performance: Lighthouse score > 90 en todas las categorias

---

## Archivos

```
src/pages/landing/
├── LandingPage.tsx              # Pagina principal
├── sections/
│   ├── HeroSection.tsx
│   ├── FeaturesSection.tsx
│   ├── HowItWorksSection.tsx
│   ├── PricingSection.tsx
│   ├── TestimonialsSection.tsx
│   ├── CTASection.tsx
│   └── FooterSection.tsx
├── components/
│   ├── LandingHeader.tsx        # Header sticky con boton Acceder
│   ├── PlanCard.tsx             # Card de plan reutilizable
│   └── FeatureCard.tsx
```

---

## Ruta en router

```typescript
// La landing es publica, fuera del AppShell
{ path: "/", element: <LandingPage /> },
{ path: "/app/login", element: <LoginPage /> },
{ path: "/app/register", element: <RegisterPage /> },
{
  path: "/app",
  element: <PrivateRoute><AppShell /></PrivateRoute>,
  children: [ /* todas las rutas de la webapp */ ]
}
```
