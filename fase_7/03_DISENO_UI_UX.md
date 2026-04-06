# FASE 7.3 — DISENO UI/UX: Paleta, Tipografia, Responsive, Temas

> El diseno web replica la identidad visual de la app Flutter. Misma paleta de colores, misma sensacion. Adaptado a las convenciones de interfaces web (sidebar, hover states, keyboard navigation).

---

## Paleta de colores

> **Fuente unica de verdad: `Nooks/lib/theme/app_colors.dart`.**
> La paleta de la web es EXACTAMENTE la de la app Flutter. No hay colores "de marca" separados — los colores de la app SON la marca. Si la paleta cambia en Flutter, cambia aqui.
> **La identidad de Nook es dark.** Landing, app, marketing, emails, redes: todo dark. El light theme es opcion secundaria solo dentro de la app.

### Dark Theme (identidad principal)

| Token CSS | Hex | Origen Flutter (`AppColors`) | Uso |
|-----------|-----|------------------------------|-----|
| `--bg-primary` | `#0D1117` | `primaryBackground` | Fondo principal (body, paginas, landing) |
| `--bg-secondary` | `#161B22` | `secondaryBackground` | Sidebar, cards base, AppBar |
| `--bg-card` | `#1E1E2D` | `cardBackground` | Cards elevadas, modales |
| `--bg-gradient` | `#2A2A3A` | `gradientBackground` | Fondos con gradiente sutil |
| `--accent-blue` | `#5E8BFF` | `accentBlue` | Botones primary, links, seleccion activa |
| `--accent-green` | `#C9FD4D` | `accentGreen` | Exito, timer activo, completado, ingresos |
| `--accent-red` | `#FF5E5E` | `accentRed` | Error, eliminar, vencido, urgente |
| `--accent-yellow` | `#FFD93D` | (nuevo para web) | Warnings, deadlines proximos |
| `--text-primary` | `#FFFFFF` | `textPrimary` | Texto principal |
| `--text-secondary` | `rgba(255,255,255,0.70)` | `textSecondary` | Texto secundario, placeholders |
| `--text-tertiary` | `rgba(255,255,255,0.54)` | `textTertiary` | Texto terciario, hints |
| `--border` | `rgba(255,255,255,0.08)` | (derivado) | Bordes sutiles entre secciones |
| `--border-hover` | `rgba(255,255,255,0.15)` | (derivado) | Bordes al hacer hover |

### Light Theme (opcion secundaria, solo dentro de la app)

> El light theme es una opcion de accesibilidad/preferencia dentro de la app. NO se usa en landing, marketing ni comunicacion publica.

| Token | Hex | Uso |
|-------|-----|-----|
| `--bg-primary` | `#F8F9FA` | Fondo principal |
| `--bg-secondary` | `#FFFFFF` | Sidebar, cards |
| `--bg-card` | `#FFFFFF` | Cards con sombra sutil |
| `--accent-blue` | `#4A6FE5` | Botones primary (ligeramente mas oscuro para contraste) |
| `--accent-green` | `#2DA44E` | Exito |
| `--accent-red` | `#CF222E` | Error |
| `--text-primary` | `#1F2328` | Texto principal |
| `--text-secondary` | `rgba(31,35,40,0.65)` | Texto secundario |
| `--border` | `rgba(31,35,40,0.12)` | Bordes |

### Implementacion en Tailwind

```typescript
// tailwind.config.ts
export default {
  darkMode: 'class',  // toggle via clase .dark en <html>
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          card: 'var(--bg-card)',
        },
        accent: {
          blue: 'var(--accent-blue)',
          green: 'var(--accent-green)',
          red: 'var(--accent-red)',
          yellow: 'var(--accent-yellow)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
        }
      }
    }
  }
}
```

Las CSS variables se definen en `src/index.css`:
```css
:root {
  --bg-primary: #F8F9FA;
  --bg-secondary: #FFFFFF;
  /* ... light theme values */
}
.dark {
  --bg-primary: #0D1117;
  --bg-secondary: #161B22;
  /* ... dark theme values */
}
```

---

## Tipografia

| Nivel | Font | Size | Weight | Uso |
|-------|------|------|--------|-----|
| H1 | Inter | 32px / 2rem | 700 (Bold) | Titulos de pagina |
| H2 | Inter | 24px / 1.5rem | 600 (Semibold) | Secciones dentro de pagina |
| H3 | Inter | 18px / 1.125rem | 600 | Subtitulos, card headers |
| Body | Inter | 14px / 0.875rem | 400 (Regular) | Texto general, formularios |
| Small | Inter | 12px / 0.75rem | 400 | Labels, timestamps, badges |
| Mono | JetBrains Mono | 13px | 400 | Codigo, timer, numeros de factura |

**Font stack:**
```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

Cargar via Google Fonts o self-hosted (recomendado para performance).

---

## Responsive breakpoints

| Breakpoint | Nombre | Layout | Sidebar |
|-----------|--------|--------|---------|
| < 640px | `sm` | Movil | Oculta, hamburger → drawer |
| 640-767px | `md` | Movil grande | Oculta, hamburger → drawer |
| 768-1023px | `lg` | Tablet | Colapsada (solo iconos, 64px) |
| 1024-1279px | `xl` | Desktop | Expandida (240px) |
| >= 1280px | `2xl` | Desktop grande | Expandida (280px) |

**Reglas:**
- Sidebar siempre visible en >= 768px (colapsada o expandida)
- En < 768px: hamburger menu → sidebar como drawer overlay
- Contenido principal siempre ocupa el espacio restante
- Cards en grid: 1 col (movil), 2 col (tablet), 3-4 col (desktop)
- Tablas: scroll horizontal en movil, completas en desktop
- Modales: fullscreen en movil, centrados en desktop (max-width: 640px)

---

## Componentes base (shadcn/ui customizados)

Todos los componentes de shadcn/ui se personalizan con la paleta Nooks:

### Botones
```
Primary:   bg-accent-blue text-white hover:brightness-110 rounded-lg px-4 py-2
Secondary: bg-bg-card text-text-primary border border-border hover:border-border-hover
Ghost:     bg-transparent text-text-secondary hover:bg-bg-card
Danger:    bg-accent-red text-white hover:brightness-110
```

### Cards
```
bg-bg-card rounded-xl border border-border p-4
hover:border-border-hover transition-colors
Sombra: shadow-none en dark, shadow-sm en light
```

### Inputs
```
bg-bg-primary border border-border rounded-lg px-3 py-2
focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30
placeholder:text-text-tertiary
```

### Badges / Chips de estado
```
Completado:  bg-accent-green/15 text-accent-green
En progreso: bg-accent-blue/15 text-accent-blue
Pendiente:   bg-bg-card text-text-secondary border
Vencido:     bg-accent-red/15 text-accent-red
Urgente:     bg-accent-yellow/15 text-accent-yellow
```

### Sidebar link activo
```
Inactivo: text-text-secondary hover:text-text-primary hover:bg-bg-card
Activo:   text-accent-blue bg-accent-blue/10 border-l-2 border-accent-blue
```

---

## Iconografia

- Libreria: **Lucide React** (consistente, tree-shakeable, 1000+ iconos)
- Tamano default: 20px en sidebar, 16px inline, 24px en headers
- Stroke width: 1.75 (ligeramente mas fino que el default para look moderno)
- Color: hereda del texto (currentColor)

---

## Animaciones y transiciones

| Elemento | Animacion | Duracion |
|----------|-----------|----------|
| Sidebar toggle | Width slide | 200ms ease |
| Modal open/close | Fade + scale | 150ms ease-out |
| Card hover | Border color change | 150ms |
| Page transition | Fade | 100ms |
| Toast/Snackbar | Slide-in from bottom | 200ms spring |
| Timer tick | Numeros sin transicion (instantaneo) | — |
| Kanban drag | Transform + shadow | During drag |
| Checkbox complete | Scale bounce + strikethrough | 300ms |

Usar **Framer Motion** para animaciones complejas (modales, page transitions, Kanban).
Usar **CSS transitions** para micro-interactions (hover, focus, color changes).

---

## Empty states

Cuando una seccion no tiene datos, mostrar:
- Ilustracion/icono relevante (outline, 64px, text-tertiary)
- Titulo: "Sin proyectos todavia"
- Descripcion: "Crea tu primer proyecto para empezar a gestionar clientes"
- CTA: boton primary "Crear proyecto"

---

## Dark/Light toggle

- **Default: SIEMPRE dark.** La identidad de Nook es dark. No se respeta `prefers-color-scheme` del sistema — Nook siempre arranca en dark.
- El usuario puede cambiar a light en Settings como preferencia personal
- Almacenado en `uiStore.ts` (Zustand) y en `localStorage`
- Clase `.dark` en `<html>` controla el tema
- Toggle solo en Settings (no en TopBar para no distraer)
- La landing page es SIEMPRE dark, sin toggle — es parte de la marca
