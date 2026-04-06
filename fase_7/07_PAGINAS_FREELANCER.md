# FASE 7.7 — PAGINAS FREELANCER: Time Tracking, Facturacion, AI

---

## TimeTrackingPage (`/app/time`)

```
+------------------------------------------------------------------+
|  Time Tracking                 Hoy: 6h 23m    [+ Entrada manual]  |
|                                                                   |
|  [Dia] [Semana]    < 30 marzo 2026 >    Filtro: [Proyecto ▾]    |
|                                                                   |
|  === VISTA DIA (default) ===                                      |
|                                                                   |
|  TIMELINE                         ENTRIES                         |
|  08:00 ░░░░░░░░░░                                                 |
|  09:00 ▓▓▓▓▓▓▓▓▓▓ Corp X         09:00-11:30  Corp X            |
|  10:00 ▓▓▓▓▓▓▓▓▓▓                Maquetar landing     2h 30m    |
|  11:00 ▓▓▓▓▓▓▓▓▓▓                [billable] [editar] [eliminar] |
|  11:30 ░░░░░░░░░░ (gap)          ---                             |
|  12:00 ░░░░░░░░░░                 12:00-13:30  StartupY          |
|  12:00 ████████████ StartupY      Revisar API docs     1h 30m    |
|  13:00 ████████████               [billable] [editar] [eliminar] |
|  13:30 ░░░░░░░░░░ (gap)          ---                             |
|  14:00 ▓▓▓▓▓▓▓▓▓▓ Corp X         14:00-16:23  Corp X            |
|  15:00 ▓▓▓▓▓▓▓▓▓▓                Reunion + ajustes    2h 23m    |
|  16:00 ▓▓▓▓▓▓▓▓▓▓                [billable] [editar] [eliminar] |
|                                                                   |
|  === VISTA SEMANA ===                                             |
|  Lun  ▓▓▓▓▓▓▓▓░░  6.2h                                          |
|  Mar  ▓▓▓▓▓▓░░░░  4.8h                                          |
|  Mie  ▓▓▓▓▓▓▓▓▓▓▓▓  8.1h  (hoy)                                |
|  Jue  ░░░░░░░░░░  —                                              |
|  Vie  ░░░░░░░░░░  —                                              |
|  Total semana: 19.1h (billable: 17.5h | 787€)                   |
+------------------------------------------------------------------+
```

**Funcionalidad:**
- [ ] Vista dia (default): timeline vertical izquierda + lista entries derecha
- [ ] Vista semana: barras horizontales por dia con totales
- [ ] Selector de fecha: dia/semana, navegacion < > y click en dia
- [ ] Filtro por proyecto (dropdown)
- [ ] Filtro billable/no-billable (toggle)
- [ ] Header: total del dia (o semana)
- [ ] Cada entry card: proyecto (dot color), tarea, duracion formateada, billable toggle
- [ ] Editar entry: click abre modal con inicio/fin/descripcion/proyecto/tarea/billable
- [ ] Eliminar entry: confirmar dialog
- [ ] Boton "+ Entrada manual": modal con date pickers inicio/fin

**DailyTimeline component:**
- [ ] Eje vertical 00:00-23:59 (o rango reducido 07:00-21:00 con expand)
- [ ] Bloques coloreados por proyecto (color del proyecto)
- [ ] Gaps visibles (tiempo sin trackear) en gris sutil
- [ ] Hover sobre bloque: tooltip con proyecto + tarea + duracion
- [ ] Click sobre bloque: scroll a la entry correspondiente en la lista

---

## Timer global (detalle web)

### timerStore (Zustand)
```typescript
interface TimerStore {
  activeEntry: TimeEntry | null;
  elapsedSeconds: number;
  intervalId: number | null;

  startTimer: (params: { taskId?: number; projectId?: number; description?: string }) => Promise<void>;
  stopTimer: () => Promise<void>;
  syncFromServer: () => Promise<void>;  // Al cargar la app, recupera timer del server
  tick: () => void;  // Incrementa elapsedSeconds, llamado cada segundo
}
```

**Comportamiento:**
- [ ] Al montar AppShell: `syncFromServer()` para recuperar timer activo (GET /time-entries/active)
- [ ] Si hay timer: iniciar `setInterval(tick, 1000)` para actualizar `elapsedSeconds`
- [ ] `startTimer()`: POST al backend + iniciar interval
- [ ] `stopTimer()`: POST al backend + limpiar interval + invalidar queries de TanStack
- [ ] Si el usuario cierra y reabre la web: `syncFromServer()` recalcula elapsed desde `startTime`
- [ ] El timer se muestra en `GlobalTimerBar` (ver 04_AUTENTICACION_LAYOUT.md)

---

## InvoicesPage (`/app/invoices`)

```
+------------------------------------------------------------------+
|  Facturas                                     [+ Nueva factura]   |
|                                                                   |
|  Facturado: 2.340€  |  Pendiente: 680€  |  Cobrado: 1.660€     |
|                                                                   |
|  [Todas] [Borrador] [Enviadas] [Pagadas] [Vencidas]             |
|  Filtrar: [Proyecto ▾]  [Mes ▾]                                  |
|                                                                   |
|  +------------------------------------------------------------+ |
|  | INV-2026-003  Corp X — Marzo 2026        1.240€  [Pagada]  | |
|  | INV-2026-002  StartupY — Febrero 2026      680€  [Enviada] | |
|  | INV-2026-001  Corp X — Febrero 2026        920€  [Pagada]  | |
|  +------------------------------------------------------------+ |
+------------------------------------------------------------------+
```

**Funcionalidad:**
- [ ] Header con resumen financiero: total facturado, pendiente, cobrado
- [ ] Tabs por estado: todas, borrador, enviadas, pagadas, vencidas
- [ ] Filtro por proyecto y por mes
- [ ] Lista con: numero, cliente, periodo, total, badge estado coloreado
- [ ] Click → navega a InvoiceDetailPage
- [ ] Boton "+ Nueva factura" → seleccionar proyecto → navega a InvoiceGeneratorPage

---

## InvoiceGeneratorPage (`/app/invoices/new/:projectId`)

Wizard de 4 pasos (Stepper horizontal):

**Step 1: Seleccionar periodo**
- Date range picker (inicio - fin)
- Lista de time entries billable del periodo con checkboxes
- Total horas seleccionadas + importe estimado (horas x tarifa)

**Step 2: Revisar lineas**
- Tabla editable: descripcion | horas | precio/h | importe
- Poder anadir lineas manuales, editar, eliminar
- Subtotal visible

**Step 3: Datos fiscales**
- Datos emisor (pre-rellenados desde FreelancerProfile)
- Datos cliente (pre-rellenados desde Project)
- Tipo IVA (editable), notas
- Si no tiene FreelancerProfile configurado: warning + link a settings

**Step 4: Preview y generar**
- Vista previa de la factura (layout estilo documento)
- Botones: "Guardar borrador" | "Generar PDF"
- Tras generar: redirige a InvoiceDetailPage

---

## InvoiceDetailPage (`/app/invoices/:id`)

- [ ] Vista estilo documento: header con datos emisor/cliente, tabla lineas, totales, notas
- [ ] Botones segun estado:
  - Borrador: Editar, Enviar (cambia estado a "sent"), Eliminar
  - Enviada: Marcar pagada, Descargar PDF, Reenviar
  - Pagada: Descargar PDF
  - Vencida: Marcar pagada, Reenviar
- [ ] Descargar PDF: genera con `@react-pdf/renderer` client-side

---

## AIActionsPage (`/app/ai`)

> **No es un chat.** Es una pagina con acciones AI puntuales invocables por el usuario.

```
+------------------------------------------------------------------+
|  AI — Acciones inteligentes                                       |
|                                                                   |
|  +----------------------------+  +----------------------------+  |
|  | Que hago hoy?              |  | Reporte semanal            |  |
|  | AI analiza tus tareas      |  | Para enviar a tu cliente   |  |
|  | y sugiere prioridades      |  | Selecciona proyecto:       |  |
|  | [Analizar]                 |  | [Corp X ▾]  [Generar]     |  |
|  +----------------------------+  +----------------------------+  |
|  | Redactar email             |  | Productividad mensual      |  |
|  | Genera email de            |  | AI analiza tus horas,      |  |
|  | seguimiento/entrega        |  | tareas y deadlines         |  |
|  | [Corp X ▾]  [Generar]     |  | [Analizar]                 |  |
|  +----------------------------+  +----------------------------+  |
|                                                                   |
|  --- RESULTADO ---                                                |
|  (se muestra aqui tras generar)                                   |
|  +------------------------------------------------------------+ |
|  | [Texto generado por AI con formato markdown]                | |
|  |                                                              | |
|  | [Copiar] [Enviar por email] [Exportar PDF]                  | |
|  +------------------------------------------------------------+ |
+------------------------------------------------------------------+
```

**Funcionalidad:**
- [ ] Grid de acciones disponibles (cards clickeables)
- [ ] Cada accion: titulo, descripcion, proyecto selector (si aplica), boton generar
- [ ] Resultado: texto en area de resultado con markdown rendering
- [ ] Botones de accion sobre el resultado: copiar, email (abre mailto:), PDF
- [ ] Loading state: spinner + "AI procesando..." durante la generacion
- [ ] Si config AI no configurada: banner "Configura tu AI en Settings"

**Config AI:**
- El usuario configura Ollama vs Cloud en `/app/settings/ai`
- La pagina AIActions lee la config y muestra uso (34/100 queries si es Cloud)
