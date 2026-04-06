# FASE 7.5 — PAGINAS CORE: Home, Tareas, Proyectos

---

## HomePage (`/app`)

Replica exacta del dashboard freelancer de Flutter (Fase 3):

```
+------------------------------------------------------------------+
|  Hoy: Lunes 30 marzo                                            |
|  3 tareas  |  1 reunion  |  4h 23m trackeadas                   |
+------------------------------------------------------------------+
|  [TIMER ACTIVO]                                          [Stop]  |
|  Corp X > Maquetar landing          02:34:12                     |
+------------------------------------------------------------------+
|                                                                   |
|  MIS TAREAS HOY                                    [+ Nueva]     |
|  +------------------------------------------------------------+ |
|  | [▶] [ ] Maquetar landing — Corp X         Alta   15 abr    | |
|  | [■] [x] Enviar presupuesto — StartupY    Media  hoy        | |
|  | [▶] [ ] Revisar copy — Marketing Z        Baja   17 abr    | |
|  +------------------------------------------------------------+ |
|                                                                   |
|  PROXIMOS EVENTOS                                                 |
|  +------------------------------------------------------------+ |
|  | 14:00  Reunion revision — Corp X                            | |
|  | manana 10:00  Call semanal — StartupY                       | |
|  +------------------------------------------------------------+ |
|                                                                   |
|  HORAS SEMANALES                    PROYECTOS ACTIVOS            |
|  Lun  ████████░░  6.2h             Corp X — 12h/40h  [▓▓▓░░]   |
|  Mar  ██████░░░░  4.8h             StartupY — 8h/20h [▓▓░░░]   |
|  Mie  ████████████  8.1h           Marketing Z — 3h  [sin est.] |
|  Total: 19.1h / 40h                                              |
|                                                                   |
|  INGRESOS MARZO 2026                                             |
|  Facturado: 1.240€  |  Pendiente: 680€                          |
|  [═══════════░░░░░░] 64% del objetivo                            |
+------------------------------------------------------------------+
```

**Widgets como componentes:**
- `TodaySummary` — fila de contadores
- `ActiveTimerCard` — card prominente si hay timer (lee de `timerStore`)
- `TodayTasksList` — tareas con dueDate=hoy, boton play cada una
- `UpcomingEvents` — eventos hoy + manana
- `WeeklyHoursChart` — Recharts BarChart horizontal
- `ActiveProjectsCards` — grid de cards compactas con barra progreso
- `MonthlyRevenueWidget` — solo visible si hay proyectos con `hourlyRate`

**Layout:** Single column scroll en movil, 2 columnas en desktop (izq: tareas+eventos, der: graficas+proyectos+ingresos)

---

## TasksPage (`/app/tasks`)

```
+------------------------------------------------------------------+
|  Tareas                                          [+ Nueva tarea]  |
|                                                                   |
|  [Todas] [Hoy] [Proximas] [Completadas]    Buscar: [________]   |
|                                                                   |
|  Ordenar: [Prioridad ▾]   Filtrar: [Proyecto ▾]                  |
|                                                                   |
|  +------------------------------------------------------------+ |
|  | [▶] [ ] Maquetar landing                             Alta  | |
|  |     Corp X  |  Vence: 15 abr  |  2h 30m trackeadas        | |
|  +------------------------------------------------------------+ |
|  | [▶] [ ] Enviar presupuesto hosting                   Media | |
|  |     Corp X  |  Vence: hoy  |  0h                          | |
|  +------------------------------------------------------------+ |
|  | [■] [x] Diseno logo v2                               Baja  | |
|  |     Marketing Z  |  Completada: 28 mar                     | |
|  +------------------------------------------------------------+ |
+------------------------------------------------------------------+
```

**Funcionalidad:**
- [ ] Lista filtrable: todas, hoy (dueDate=today), proximas (futuras), completadas
- [ ] Ordenar: prioridad, fecha vencimiento, proyecto, fecha creacion
- [ ] Filtrar: por proyecto (dropdown)
- [ ] Busqueda por texto en titulo/descripcion
- [ ] Boton play en cada tarea → inicia timer (timerStore)
- [ ] Checkbox → toggle complete con animacion (strikethrough + fade)
- [ ] Click en tarea → abre modal `TaskForm` con edicion completa
- [ ] Boton "+ Nueva tarea" → modal `TaskForm` vacio
- [ ] Drag to reorder → `@dnd-kit` con SortableContext
- [ ] Indicador de tiempo trackeado por tarea

**Modal TaskForm:**
- Titulo, descripcion (textarea)
- Proyecto (dropdown de proyectos activos)
- Prioridad (Low/Medium/High con chips de color)
- Fecha vencimiento (date picker)
- Eventos vinculados (multi-select)
- Seccion "Tiempo registrado" con lista de entries + total
- Boton "Anadir tiempo manual"

---

## ProjectsPage (`/app/projects`)

```
+------------------------------------------------------------------+
|  Proyectos                                    [+ Nuevo proyecto]  |
|                                                                   |
|  [Activos] [Pausados] [Completados] [Archivados] [Todos]        |
|                                                                   |
|  +------------------+  +------------------+  +------------------+ |
|  | ● Corp X         |  | ● StartupY       |  | ● Marketing Z    | |
|  | Ana Garcia (Corp)|  | Pedro (StartupY) |  | Maria (—)        | |
|  | 12h / 40h ▓▓▓░░  |  | 8h / 20h ▓▓░░░  |  | 3h (sin est.)   | |
|  | Vence: 15 abr    |  | Vence: 1 may     |  | Sin deadline     | |
|  | [12d] 🟢         |  | [28d] 🟢        |  |                  | |
|  +------------------+  +------------------+  +------------------+ |
+------------------------------------------------------------------+
```

**Funcionalidad:**
- [ ] Grid de ProjectCards (responsive: 1/2/3 columnas)
- [ ] Filtro por estado (tabs): activos, pausados, completados, archivados, todos
- [ ] Cada card muestra: color dot, nombre, cliente, barra horas, deadline con countdown coloreado
- [ ] Click en card → navega a `/app/projects/:id`
- [ ] Boton "+ Nuevo proyecto" → primero `TemplateSelectorDialog`, luego `ProjectForm` modal
- [ ] `TemplateSelectorDialog`: grid de plantillas con icono + nombre + descripcion

**Modal ProjectForm:**
- Nombre del proyecto, descripcion, color (ColorPicker)
- Seccion colapsable "Datos del cliente": nombre, empresa, email, telefono
- Tarifa/hora + moneda (EUR/USD/GBP dropdown)
- Horas estimadas, presupuesto
- Deadline (date picker)
- Estado (dropdown)

---

## ProjectDetailPage (`/app/projects/:id`)

```
+------------------------------------------------------------------+
|  <- Proyectos    Corp X                      [Editar] [Compartir] |
+------------------------------------------------------------------+
|  CLIENTE                                                          |
|  Ana Garcia — Corp X Corp.          PROGRESO                     |
|  ana@corpx.com | +34 612 345 678    12h / 40h estimadas          |
|  Tarifa: 45€/h | EUR                [▓▓▓▓▓▓░░░░░░] 30%          |
|  Deadline: 15 abr (12 dias) 🟢     Presupuesto: 540€ / 1.800€   |
+------------------------------------------------------------------+
|                                                                   |
|  [Kanban] [Notas] [Tiempo] [Facturas] [AI]                      |
|                                                                   |
|  === TAB KANBAN (default) ===                                     |
|  +------------------+  +------------------+  +------------------+ |
|  | Por hacer    (3) |  | En progreso  (2) |  | Completado   (5) | |
|  | +-----------+    |  | +-----------+    |  | +-----------+    | |
|  | |Tarea 1 [▶]|    |  | |Tarea 4 [■]|    |  | |Tarea 7  ✓|    | |
|  | +-----------+    |  | +-----------+    |  | +-----------+    | |
|  | |Tarea 2 [▶]|    |  | |Tarea 5 [▶]|    |  | |Tarea 8  ✓|    | |
|  | +-----------+    |  | +-----------+    |  | +-----------+    | |
|  | [+ Tarea]        |  |                  |  |                  | |
|  +------------------+  +------------------+  +------------------+ |
+------------------------------------------------------------------+
```

**Tabs:**

**Kanban** (default):
- [ ] 3 columnas: Por hacer, En progreso, Completado
- [ ] Drag & drop entre columnas con `@dnd-kit` (DndContext + SortableContext)
- [ ] Cada card: titulo, prioridad badge, boton play timer, fecha
- [ ] Boton "+ Tarea" al final de cada columna

**Notas:**
- [ ] Lista de notas vinculadas al proyecto
- [ ] Boton crear nota vinculada

**Tiempo:**
- [ ] Lista de time entries del proyecto
- [ ] Totales: horas billable, horas no-billable, importe estimado
- [ ] Filtro por rango de fechas

**Facturas:**
- [ ] Lista de facturas del proyecto
- [ ] Boton "Generar factura" → navega a InvoiceGeneratorPage

**AI:**
- [ ] Boton "Reporte semanal" → genera texto con AI
- [ ] Boton "Redactar email" → genera email con AI
- [ ] Resultado: texto editable con opciones copiar/email
