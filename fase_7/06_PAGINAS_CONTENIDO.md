# FASE 7.6 — PAGINAS DE CONTENIDO: Notas, Eventos, Reuniones

---

## NotesPage (`/app/notes`)

```
+------------------------------------------------------------------+
|  Notas                                            [+ Nueva nota]  |
|                                                                   |
|  [Todas] [Favoritas] [Importantes]    Buscar: [________]         |
|  Filtrar: [Proyecto ▾]  [Tag ▾]       Vista: [Grid] [Lista]     |
|                                                                   |
|  +------------------+  +------------------+  +------------------+ |
|  | Briefing Corp X  |  | Ideas landing    |  | Acta reunion 28m | |
|  | #briefing #web   |  | #ideas           |  | #acta #corpx     | |
|  | 28 mar | 324 pal.|  | 25 mar | 89 pal. |  | 28 mar | 156 p. | |
|  | ★ Corp X         |  | StartupY         |  | 🔒 Corp X        | |
|  +------------------+  +------------------+  +------------------+ |
+------------------------------------------------------------------+
```

**Funcionalidad:**
- [ ] Vista grid (cards) / lista (rows) — toggle con boton
- [ ] Filtros: todas, favoritas (bookmarked), importantes
- [ ] Filtro por proyecto (dropdown), por tag (multi-select)
- [ ] Busqueda por texto en titulo/contenido
- [ ] Card muestra: titulo, tags como chips, fecha, word count, proyecto vinculado, iconos (★ favorita, 🔒 privada)
- [ ] Click en card → abre editor en modal o pagina dedicada

**NoteEditor (modal/fullscreen):**
- [ ] Titulo editable inline
- [ ] Editor de contenido con soporte markdown basico (bold, italic, headers, listas, code blocks)
- [ ] Toolbar: B, I, H1, H2, lista, code, link
- [ ] Sidebar derecha (colapsable): proyecto vinculado, tags, mood rating (1-10 slider), ubicacion, clima
- [ ] Toggles: favorita, importante, privada, encriptada
- [ ] Adjuntos: drag & drop de imagenes/archivos
- [ ] Autoguardado cada 3 segundos (debounce)
- [ ] Boton: exportar a PDF

---

## EventsPage (`/app/events`)

```
+------------------------------------------------------------------+
|  Eventos                                        [+ Nuevo evento]  |
|                                                                   |
|  [Calendario] [Lista]           < Marzo 2026 >                   |
|                                                                   |
|  === VISTA CALENDARIO ===                                         |
|  Lun    Mar    Mie    Jue    Vie    Sab    Dom                   |
|  +------+------+------+------+------+------+------+              |
|  |      |      |      |      |      |      | 1    |              |
|  +------+------+------+------+------+------+------+              |
|  | 2    | 3    | 4    | 5    | 6    | 7    | 8    |              |
|  |      |●●    |      |●     |      |      |      |              |
|  +------+------+------+------+------+------+------+              |
|  ...                                                              |
|                                                                   |
|  === VISTA LISTA (alternativa) ===                                |
|  HOY - 30 marzo                                                   |
|  +------------------------------------------------------------+ |
|  | 14:00-15:00  Reunion revision — Corp X        🟢 Trabajo   | |
|  | 19:00        Cena equipo                       🔵 Personal  | |
|  +------------------------------------------------------------+ |
|  MANANA - 31 marzo                                                |
|  +------------------------------------------------------------+ |
|  | 10:00-10:30  Call semanal — StartupY           🟢 Trabajo   | |
|  +------------------------------------------------------------+ |
+------------------------------------------------------------------+
```

**Funcionalidad:**
- [ ] Vista calendario mensual: CSS grid 7 columnas, dots de color por evento
- [ ] Click en dia → muestra eventos del dia en panel lateral o expandido
- [ ] Vista lista: agrupado por dia, eventos futuros
- [ ] Navegacion: < mes anterior | mes actual | mes siguiente >
- [ ] Click en evento → modal `EventForm` con edicion
- [ ] Boton "+ Nuevo evento" → modal `EventForm` vacio
- [ ] Indicador de Google Calendar sync (icono si vinculado)

**Modal EventForm:**
- Titulo, descripcion
- Fecha + hora inicio + hora fin (o toggle "Todo el dia")
- Ubicacion (texto libre)
- Categoria (dropdown: General, Trabajo, Personal, Salud, etc.) — con color
- Prioridad (Low/Medium/High)
- Proyecto vinculado (dropdown)
- Tareas vinculadas (multi-select)
- Coste + moneda
- Recordatorio (toggle + minutos antes)
- Recurrencia (patron + fecha fin)
- Color personalizado

---

## MeetingsPage (`/app/meetings`)

```
+------------------------------------------------------------------+
|  Reuniones                                                        |
|                                                                   |
|  Filtrar: [Proyecto ▾]                                           |
|                                                                   |
|  +------------------------------------------------------------+ |
|  | Reunion revision diseno — Corp X             30 mar, 14:00  | |
|  | Resumen AI: "Se revisaron los mockups del home page.        | |
|  | Se decidio cambiar la paleta a tonos mas calidos..."        | |
|  | Estado: Completada  |  Duracion: 45min  |  [Ver detalle]    | |
|  +------------------------------------------------------------+ |
|  | Call semanal — StartupY                      28 mar, 10:00  | |
|  | Resumen AI: "Revision de sprint. Se priorizaron las tareas  | |
|  | de onboarding y se pospuso la feature de exportacion..."    | |
|  | Estado: Completada  |  Duracion: 30min  |  [Ver detalle]    | |
|  +------------------------------------------------------------+ |
+------------------------------------------------------------------+
```

**Funcionalidad:**
- [ ] Lista de reuniones con resumen AI preview (primeras 2 lineas)
- [ ] Filtro por proyecto
- [ ] Click "Ver detalle" → expande o abre modal con:
  - Transcripcion completa
  - Resumen AI completo
  - Speakers con estadisticas (intervenciones, tiempo hablando)
  - Entidades extraidas (personas, fechas, tareas)
  - Boton **"Procesar con AI"** → llama `/ai/process-meeting` → abre panel de confirmacion de acciones (AIActionsPanel)
  - Boton "Extraer tareas" (legacy, mantener compatibilidad)
- [ ] Vinculacion a proyecto visible
- [ ] No hay grabacion desde web (eso es feature movil). Las reuniones se crean desde Flutter y se consultan/procesan desde web.

**AIActionsPanel (componente compartido):**
- Lista de acciones propuestas con checkbox + boton editar
- Mismo que en Flutter: confirmar/editar antes de crear
- Reutilizable desde MeetingsPage y desde ProjectDetailPage
