# FASE 7.2 — ARQUITECTURA Y STACK TECNICO

> Proyecto independiente `nooks-web/`. No comparte codigo con Flutter. Consume la misma API FastAPI.

---

## Stack tecnologico

| Categoria | Tecnologia | Equivalente Flutter | Justificacion |
|-----------|-----------|-------------------|---------------|
| Framework | React 19 + TypeScript | Flutter SDK | Ecosistema maduro, tipado fuerte |
| Build | Vite 6 | Dart build | HMR instantaneo, build rapido |
| Routing | React Router v7 | Auto Route | URL-based, deep linking nativo |
| Estado global | Zustand | Riverpod | Minimalista, sin boilerplate |
| Data fetching | TanStack Query v5 | Dio + CacheManager | Cache automatico, refetch, optimistic updates |
| Formularios | React Hook Form + Zod | TextFormField | Validacion declarativa, performance |
| UI base | Tailwind CSS 4 + shadcn/ui | Material 3 | Utility-first, componentes accesibles |
| Graficas | Recharts | fl_chart | Declarativo, responsive |
| Drag & Drop | @dnd-kit | (custom) | Kanban board, reordenar tareas |
| Fechas | date-fns | intl | Tree-shakeable, funcional |
| PDF | @react-pdf/renderer | pdf + printing | Generacion client-side |
| HTTP | axios | Dio | Interceptors JWT identicos |
| Iconos | Lucide React | cupertino_icons | Consistente, tree-shakeable |
| Animaciones | Framer Motion | AnimatedContainer | Entradas, transiciones, micro-interactions |

---

## Estructura del proyecto

```
nooks-web/
├── public/
│   ├── manifest.json               # PWA manifest
│   ├── sw.js                       # Service worker (generado por Vite PWA)
│   ├── favicon.ico
│   ├── og-image.png                # Open Graph para compartir
│   └── robots.txt
│
├── src/
│   ├── api/                        # Capa HTTP — 1 archivo por dominio
│   │   ├── client.ts               # Axios instance + interceptors JWT
│   │   ├── auth.ts                 # login, register, logout, refresh, profile
│   │   ├── projects.ts             # CRUD proyectos
│   │   ├── tasks.ts                # CRUD tareas + reorder + toggle
│   │   ├── notes.ts                # CRUD notas + tags + attachments
│   │   ├── events.ts               # CRUD eventos + today/upcoming/month
│   │   ├── meetings.ts             # CRUD reuniones + AI processing
│   │   ├── timeEntries.ts          # CRUD entries + start/stop + reportes
│   │   ├── invoices.ts             # CRUD facturas + generate + PDF
│   │   ├── ai.ts                   # Config + acciones AI + process meeting
│   │   ├── subscriptions.ts        # Planes + checkout + billing
│   │   └── freelancerProfile.ts    # Perfil fiscal
│   │
│   ├── stores/                     # Zustand — estado global persistente
│   │   ├── authStore.ts            # User, tokens, rol, isAuthenticated
│   │   ├── timerStore.ts           # Timer activo, elapsedSeconds, start/stop
│   │   ├── uiStore.ts              # Sidebar open/closed, theme, modals
│   │   └── subscriptionStore.ts    # Plan actual, limites, gates
│   │   # (chatStore.ts se anade en Fase 9)
│   │
│   ├── hooks/                      # TanStack Query — 1 hook por dominio
│   │   ├── useAuth.ts              # Login, register, logout mutations
│   │   ├── useProjects.ts          # useProjects(), useProject(id), useCreateProject()...
│   │   ├── useTasks.ts             # useTasks(filters), useToggleTask(), useReorderTasks()...
│   │   ├── useNotes.ts             # useNotes(filters), useCreateNote()...
│   │   ├── useEvents.ts            # useEvents(), useTodayEvents(), useMonthEvents(y,m)...
│   │   ├── useMeetings.ts          # useMeetings(), useProcessMeeting()...
│   │   ├── useTimeEntries.ts       # useEntries(filters), useActiveTimer(), useStartTimer()...
│   │   ├── useInvoices.ts          # useInvoices(filters), useGenerateInvoice()...
│   │   ├── useAI.ts                # useAIConfig(), useSuggestPriorities()...
│   │   ├── useSubscription.ts      # usePlans(), useCurrentPlan(), useCheckout()...
│   │   └── useFreelancerProfile.ts # useProfile(), useUpdateProfile()...
│   │   # (useChat.ts, useFreelancers.ts, useReviews.ts se anaden en Fase 9)
│   │
│   ├── pages/                      # Paginas — 1:1 con Flutter screens
│   │   ├── landing/                # Landing page publica (ver 01_LANDING_PAGE.md)
│   │   │   ├── LandingPage.tsx
│   │   │   ├── sections/           # HeroSection, FeaturesSection, PricingSection...
│   │   │   └── components/         # LandingHeader, PlanCard, FeatureCard
│   │   ├── auth/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   └── ForgotPasswordPage.tsx
│   │   ├── home/
│   │   │   └── HomePage.tsx
│   │   ├── tasks/
│   │   │   └── TasksPage.tsx
│   │   ├── projects/
│   │   │   ├── ProjectsPage.tsx
│   │   │   └── ProjectDetailPage.tsx
│   │   ├── notes/
│   │   │   └── NotesPage.tsx
│   │   ├── events/
│   │   │   └── EventsPage.tsx
│   │   ├── meetings/
│   │   │   └── MeetingsPage.tsx
│   │   ├── time/
│   │   │   └── TimeTrackingPage.tsx
│   │   ├── invoices/
│   │   │   ├── InvoicesPage.tsx
│   │   │   ├── InvoiceDetailPage.tsx
│   │   │   └── InvoiceGeneratorPage.tsx
│   │   ├── ai/
│   │   │   └── AIActionsPage.tsx
│   │   └── settings/
│   │       ├── SettingsPage.tsx
│   │       ├── AISettingsPage.tsx
│   │       ├── FreelancerProfilePage.tsx
│   │       └── PlansPage.tsx
│   │   # (pages/chat/ y pages/client/ se anaden en Fase 9)
│   │
│   ├── components/                 # Componentes reutilizables por dominio
│   │   ├── layout/
│   │   │   ├── AppShell.tsx        # Shell principal: sidebar + content + timer bar
│   │   │   ├── Sidebar.tsx         # Navegacion lateral con links activos
│   │   │   ├── TopBar.tsx          # Barra superior con breadcrumb + user menu
│   │   │   ├── GlobalTimerBar.tsx  # Timer persistente en top del contenido
│   │   │   └── CommandPalette.tsx  # Ctrl+K busqueda global tipo Spotlight
│   │   ├── projects/
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectForm.tsx     # Modal crear/editar proyecto
│   │   │   ├── KanbanBoard.tsx     # Board completo con @dnd-kit
│   │   │   ├── KanbanColumn.tsx    # Columna individual (ToDo, In Progress, Done)
│   │   │   ├── KanbanTaskCard.tsx  # Card de tarea draggable
│   │   │   └── TemplateSelectorDialog.tsx
│   │   ├── tasks/
│   │   │   ├── TaskCard.tsx        # Card con play button + checkbox
│   │   │   ├── TaskForm.tsx        # Modal crear/editar tarea
│   │   │   └── TaskTimeEntries.tsx # Lista de time entries de una tarea
│   │   ├── notes/
│   │   │   ├── NoteCard.tsx
│   │   │   └── NoteEditor.tsx      # Editor con soporte markdown
│   │   ├── events/
│   │   │   ├── EventCard.tsx
│   │   │   ├── EventForm.tsx
│   │   │   └── CalendarGrid.tsx    # Calendario mensual CSS grid
│   │   ├── meetings/
│   │   │   ├── MeetingCard.tsx
│   │   │   └── MeetingTranscript.tsx
│   │   ├── time/
│   │   │   ├── TimeEntryCard.tsx
│   │   │   ├── DailyTimeline.tsx   # Timeline vertical con bloques por proyecto
│   │   │   └── WeeklyHoursChart.tsx
│   │   ├── invoices/
│   │   │   ├── InvoiceCard.tsx
│   │   │   ├── InvoicePreview.tsx  # Vista previa estilo documento
│   │   │   └── InvoiceWizardSteps.tsx
│   │   ├── ai/
│   │   │   ├── AIActionCard.tsx    # Card de accion propuesta (confirmar/editar)
│   │   │   ├── AIActionsPanel.tsx  # Panel de confirmacion de acciones
│   │   │   └── AIReportViewer.tsx  # Visor de reportes/emails generados
│   │   └── shared/
│   │       ├── ConfirmDialog.tsx
│   │       ├── UpgradePlanDialog.tsx
│   │       ├── ColorPicker.tsx
│   │       ├── DateRangePicker.tsx
│   │       ├── StatusBadge.tsx
│   │       ├── EmptyState.tsx      # Placeholder cuando no hay datos
│   │       ├── LoadingSpinner.tsx
│   │       └── ErrorBoundary.tsx
│   │
│   ├── types/                      # TypeScript — espejo exacto de DTOs Python
│   │   ├── auth.ts                 # User, LoginRequest, LoginResponse, RegisterRequest
│   │   ├── project.ts              # Project, CreateProjectRequest, ProjectTemplate
│   │   ├── task.ts                 # Task, CreateTaskRequest, TaskPriority
│   │   ├── note.ts                 # DiaryEntry, DiaryTag, DiaryAttachment
│   │   ├── event.ts                # Event, EventCategory, EventPriority, EventStatus
│   │   ├── meeting.ts              # Meeting, Speaker, ExtractedEntity
│   │   ├── timeEntry.ts            # TimeEntry, TimeReport, CreateTimeEntryRequest
│   │   ├── invoice.ts              # Invoice, InvoiceLine, FreelancerProfile
│   │   ├── ai.ts                   # AIConfig, ProposedAction, ActionType
│   │   ├── subscription.ts         # Plan, SubscriptionStatus
│   │   └── api.ts                  # ApiResponse<T>, PageResponse<T>, generics
│   │   # (chat.ts, review.ts, client.ts se anaden en Fase 9)
│   │
│   ├── utils/
│   │   ├── formatters.ts           # formatDuration(), formatCurrency(), formatDate()
│   │   ├── planGates.ts            # canCreateProject(), canUseAI(), canCreateInvoice()
│   │   ├── colorUtils.ts           # hexToRgb(), getContrastColor()
│   │   └── cn.ts                   # Tailwind class merge utility (clsx + twMerge)
│   │
│   ├── lib/
│   │   └── queryClient.ts          # TanStack Query client con defaults
│   │
│   ├── router.tsx                  # React Router v7 config completo
│   ├── App.tsx                     # Providers: QueryClient, Zustand, Theme
│   └── main.tsx                    # Entry point: ReactDOM.createRoot
│
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── .env.example
├── .eslintrc.cjs
├── .prettierrc
└── package.json
```

---

## Patrones de desarrollo

### Data Flow
```
Componente → Hook (TanStack Query) → API module (axios) → Backend FastAPI
                ↕                                              ↕
          Cache TanStack                                 PostgreSQL
                ↕
         Store Zustand (solo estado global: auth, timer, UI)
```

### Regla: TanStack Query para datos del servidor, Zustand para estado UI
- **TanStack Query**: proyectos, tareas, notas, eventos, time entries, facturas (cache + refetch)
- **Zustand**: auth (tokens, user), timer activo (tick cada segundo), UI (sidebar, theme, modals)

### Regla: Componentes puros, logica en hooks
- Las pages solo orquestan componentes y hooks
- Los componentes reciben props, no acceden a stores directamente (excepto layout)
- Los hooks encapsulan queries/mutations de TanStack Query

### Regla: Types como fuente de verdad
- Todos los tipos en `src/types/` deben ser espejo EXACTO de los DTOs del backend
- Si el backend cambia un campo, se cambia en types/ y TypeScript detecta todos los usos
