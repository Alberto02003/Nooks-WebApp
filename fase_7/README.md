# FASE 7 — WEB APP REACT + LANDING PAGE (8-10 semanas)

> **PREREQUISITO BLOQUEANTE:** El desarrollo de la web app React NO comienza hasta que el desarrollo Flutter (Fases 0-6) este 100% terminado, testeado y funcional. La web app replica 1:1 lo que ya funciona en movil. No se disenan features nuevas en esta fase.

> **Orden en el roadmap:** Despues de Fase 4 (AI). Fases 0-6 deben estar completadas y validadas.

---

## Concepto

La web se compone de dos partes:

1. **Landing Page** (`nooks.com`) — Pagina publica de marketing con boton "Acceder" arriba a la derecha que lleva a la webapp
2. **Web App** (`nooks.com/app/...`) — Aplicacion React completa con paridad 1:1 respecto a Flutter

Ambas viven en el mismo proyecto React pero con rutas separadas. La landing es publica, la webapp requiere login.

---

## Estructura de esta fase

| Archivo | Contenido |
|---------|-----------|
| [01_LANDING_PAGE.md](01_LANDING_PAGE.md) | Diseno, secciones, CTA, SEO |
| [02_ARQUITECTURA_STACK.md](02_ARQUITECTURA_STACK.md) | Stack tecnico, estructura de carpetas, patrones |
| [03_DISENO_UI_UX.md](03_DISENO_UI_UX.md) | Paleta de colores, tipografia, responsive, dark/light, componentes base |
| [04_AUTENTICACION_LAYOUT.md](04_AUTENTICACION_LAYOUT.md) | Auth JWT, layout AppShell, sidebar, navegacion |
| [05_PAGINAS_CORE.md](05_PAGINAS_CORE.md) | Home dashboard, Tareas, Proyectos, Detalle proyecto + Kanban |
| [06_PAGINAS_CONTENIDO.md](06_PAGINAS_CONTENIDO.md) | Notas, Eventos/Calendario, Reuniones |
| [07_PAGINAS_FREELANCER.md](07_PAGINAS_FREELANCER.md) | Time Tracking, Timer global, Facturacion, AI Actions |
| [08_PAGINAS_SETTINGS.md](08_PAGINAS_SETTINGS.md) | Settings, Perfil freelancer, AI config, Planes, Atajos teclado |
| [09_PWA_DESPLIEGUE.md](09_PWA_DESPLIEGUE.md) | PWA, offline, CI/CD, hosting, variables de entorno |

---

## Roles en Fase 7

En esta fase SOLO se implementa el **rol FREELANCER (USER)**. El rol CLIENT se implementa en Fase 9. La webapp debe estar preparada para soportar roles (auth store guarda el rol), pero todas las pantallas son de freelancer.

---

## Timeline interno (8-10 semanas)

| Semana | Entregable |
|--------|-----------|
| 1 | Setup proyecto + landing page + auth (login/register) |
| 2 | Layout (AppShell, Sidebar, GlobalTimerBar) + Home dashboard |
| 3 | Proyectos (lista + detalle + Kanban) + Tareas |
| 4 | Notas + Eventos/Calendario |
| 5 | Time Tracking (pantalla + timer global + reportes) |
| 6 | Reuniones + AI Actions |
| 7 | Facturacion (lista + generador wizard + detalle + PDF) |
| 8 | Settings completo + Planes Stripe + Atajos teclado + Command Palette |
| 9 | PWA + offline basico + tests + pulido visual |
| 10 | QA final + fix bugs + deploy staging → produccion |
