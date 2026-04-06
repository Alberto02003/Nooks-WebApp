# FASE 7.8 — PAGINAS SETTINGS, PERFIL, PLANES, ATAJOS

---

## SettingsPage (`/app/settings`)

```
+------------------------------------------------------------------+
|  Configuracion                                                    |
|                                                                   |
|  CUENTA                                                           |
|  +------------------------------------------------------------+ |
|  | [Avatar]  Alberto Martin                                    | |
|  |           alberto@email.com                [Editar perfil]  | |
|  +------------------------------------------------------------+ |
|  | Tema                          [Oscuro ▾]                    | |
|  | Idioma                        [Espanol ▾]                   | |
|  | Notificaciones                [Activadas]  (toggle)         | |
|  +------------------------------------------------------------+ |
|                                                                   |
|  PROFESIONAL                                                      |
|  +------------------------------------------------------------+ |
|  | Perfil freelancer (fiscal)              [Configurar →]      | |
|  | Configuracion IA                        [Configurar →]      | |
|  +------------------------------------------------------------+ |
|                                                                   |
|  SUSCRIPCION                                                      |
|  +------------------------------------------------------------+ |
|  | Plan actual: Free                       [Ver planes →]      | |
|  | Limite: 2 proyectos activos                                 | |
|  +------------------------------------------------------------+ |
|                                                                   |
|  SEGURIDAD                                                        |
|  +------------------------------------------------------------+ |
|  | Cambiar contrasena                      [Cambiar →]         | |
|  | Cambiar email                           [Cambiar →]         | |
|  | Eliminar cuenta                         [Eliminar →]        | |
|  +------------------------------------------------------------+ |
|                                                                   |
|  ATAJOS DE TECLADO                         [Ver atajos →]        |
|  ACERCA DE                                 [Info →]              |
+------------------------------------------------------------------+
```

**Funcionalidad:**
- [ ] Editar perfil: nombre, email, foto (inline o modal)
- [ ] Tema: dropdown con Oscuro/Claro/Sistema — persiste en localStorage y uiStore
- [ ] Idioma: dropdown (espanol default, ingles futuro)
- [ ] Notificaciones: toggle on/off
- [ ] Links a sub-paginas: perfil fiscal, AI, planes
- [ ] Cambiar contrasena: formulario actual + nueva + confirmar
- [ ] Cambiar email: formulario con validacion
- [ ] Eliminar cuenta: confirm dialog serio con texto "ELIMINAR"

---

## AISettingsPage (`/app/settings/ai`)

```
+------------------------------------------------------------------+
|  <- Settings    Configuracion IA                                  |
|                                                                   |
|  PROVEEDOR DE IA                                                  |
|                                                                   |
|  ( ) Usar mi Ollama (gratis, datos locales)                      |
|      URL: [http://192.168.1.100:11434___]                        |
|      Modelo: [llama3.2:latest      ▾]                            |
|      [Test conexion]  → "Conectado. Responde en 1.2s" ✓         |
|                                                                   |
|  (●) Usar Nooks AI (cloud)                                   |
|      Plan actual: Free (10 consultas/mes)                        |
|      Consultas usadas: 7/10                                      |
|      [═══════░░░] 70%                                            |
|      [Mejorar plan para mas consultas]                           |
|                                                                   |
|  FUNCIONES AUTOMATICAS                                            |
|  [x] Resumir reuniones automaticamente                           |
|  [x] Sugerir prioridades al abrir la app                        |
|  [ ] Analizar productividad semanalmente                         |
+------------------------------------------------------------------+
```

- [ ] Radio button: Ollama vs Cloud
- [ ] Si Ollama: campos URL + modelo + boton test
- [ ] Si Cloud: mostrar uso actual + barra progreso + link a planes
- [ ] Toggles de funciones automaticas
- [ ] Al guardar: PUT `/api/v1/ai/config`

---

## FreelancerProfilePage (`/app/settings/profile`)

```
+------------------------------------------------------------------+
|  <- Settings    Perfil de freelancer                              |
|                                                                   |
|  DATOS FISCALES                                                   |
|  Nombre empresa/autonomo:  [Alberto Martin_______________]       |
|  NIF/CIF:                  [12345678A____________________]       |
|  Direccion:                [Calle Mayor 1________________]       |
|  Ciudad:                   [Madrid_____]  CP: [28001_]           |
|  Pais:                     [Espana ▾]                            |
|                                                                   |
|  FACTURACION                                                      |
|  IVA por defecto:          [21__] %                              |
|  Moneda por defecto:       [EUR ▾]                               |
|  Prefijo facturas:         [INV__]                               |
|  Siguiente numero:         [4___]                                |
|                                                                   |
|  DATOS BANCARIOS                                                  |
|  IBAN:                     [ES12 3456 7890 1234 5678 90__]       |
|                                                                   |
|  LOGO                                                             |
|  [Logo actual o placeholder]   [Subir logo]                      |
|                                                                   |
|  [Guardar cambios]                                               |
+------------------------------------------------------------------+
```

- [ ] Formulario completo con validacion (NIF formato, IBAN formato)
- [ ] Logo: upload con preview
- [ ] Autoguardado o boton guardar explícito
- [ ] GET/PUT `/api/v1/freelancer-profile/`

---

## PlansPage (`/app/settings/plans`)

```
+------------------------------------------------------------------+
|  <- Settings    Planes                                            |
|                                                                   |
|  Plan actual: Free                                               |
|                                                                   |
|  +------------------+  +------------------+  +------------------+ |
|  |      FREE        |  |      PRO         |  |    BUSINESS      | |
|  |     0€/mes       |  |     6€/mes       |  |    12€/mes       | |
|  |                   |  |                   |  |                   | |
|  | 2 proyectos      |  | Ilimitados       |  | Ilimitados       | |
|  | Timer basico     |  | Timer + reportes |  | Timer + reportes | |
|  | Sin facturas     |  | 5 facturas/mes   |  | Ilimitado        | |
|  | AI: 10 cloud/mes |  | AI: 100 cloud/mes|  | AI: Ilimitado    | |
|  | Ollama: si       |  | Ollama: si       |  | Ollama: si       | |
|  |                   |  |                   |  |                   | |
|  | [Plan actual]    |  | [Mejorar →]      |  | [Mejorar →]      | |
|  +------------------+  +------------------+  +------------------+ |
|                                                                   |
|  Comparativa detallada:                                           |
|  +------------------------------------------------------------+ |
|  | Feature            | Free  | Pro   | Business              | |
|  | Proyectos activos  | 2     | ∞     | ∞                     | |
|  | Time tracking      | Basico| Compl.| Completo              | |
|  | Facturacion        | No    | 5/mes | ∞                     | |
|  | AI Cloud           | 10    | 100   | ∞                     | |
|  | AI Ollama          | ∞     | ∞     | ∞                     | |
|  | Exportar PDF       | No    | Si    | Si                    | |
|  | Google Calendar    | Si    | Si    | Si                    | |
|  | Plantillas         | 3     | Todas | Todas + custom        | |
|  | Portal cliente     | No    | 1     | ∞                     | |
|  | Soporte            | Comun.| Email | Prioritario           | |
|  +------------------------------------------------------------+ |
+------------------------------------------------------------------+
```

- [ ] Cards de planes con CTA
- [ ] Boton "Mejorar" → crea Stripe checkout session → redirige a Stripe
- [ ] Tabla comparativa colapsable
- [ ] Plan actual destacado
- [ ] Si ya tiene plan: mostrar fecha renovacion + boton "Cancelar" + boton "Cambiar plan"

---

## Atajos de teclado (exclusivo web)

```
Ctrl+N         → Abrir modal nueva tarea
Ctrl+Shift+N   → Abrir modal nueva nota
Ctrl+T         → Start/Stop timer activo
Ctrl+P         → Ir a /app/projects
Ctrl+K         → Abrir Command Palette (busqueda global)
Ctrl+I         → Ir a crear factura (seleccionar proyecto)
Ctrl+H         → Ir a /app (Home)
Escape         → Cerrar modal/palette activo
?              → Modal de atajos disponibles
```

**Implementacion:** Hook `useKeyboardShortcuts()` registrado en AppShell.

### Command Palette (`Ctrl+K`)

```
+------------------------------------------------------------------+
|  +------------------------------------------------------------+ |
|  |  🔍 Buscar proyectos, tareas, notas...                     | |
|  +------------------------------------------------------------+ |
|  |                                                              | |
|  |  ACCIONES RAPIDAS                                            | |
|  |  → Nueva tarea                                 Ctrl+N       | |
|  |  → Nueva nota                                  Ctrl+Shift+N | |
|  |  → Iniciar timer                               Ctrl+T       | |
|  |                                                              | |
|  |  PROYECTOS                                                   | |
|  |  📁 Corp X                                                  | |
|  |  📁 StartupY                                                | |
|  |                                                              | |
|  |  TAREAS RECIENTES                                            | |
|  |  ☐ Maquetar landing — Corp X                                | |
|  |  ☐ Enviar presupuesto — Corp X                              | |
|  +------------------------------------------------------------+ |
+------------------------------------------------------------------+
```

- [ ] Overlay centrado tipo Spotlight/VS Code
- [ ] Busqueda en tiempo real: proyectos, tareas, notas (debounce 200ms)
- [ ] Acciones rapidas con shortcuts mostrados
- [ ] Navegacion con flechas ↑↓ + Enter para seleccionar
- [ ] Escape para cerrar
- [ ] Resultados agrupados por tipo (proyectos, tareas, notas)
