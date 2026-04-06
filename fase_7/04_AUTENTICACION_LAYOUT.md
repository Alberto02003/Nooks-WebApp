# FASE 7.4 — AUTENTICACION Y LAYOUT

---

## Autenticacion web

### Flujo de login
1. Usuario va a `/app/login` (o es redirigido desde ruta protegida)
2. Formulario: email + password + boton "Entrar" + link "Registrarse" + link "Olvide mi contrasena"
3. POST `/api/v1/auth/login` → recibe `access_token` + `refresh_token`
4. `access_token` se guarda en memoria (Zustand authStore) — NO en localStorage
5. `refresh_token` se guarda en httpOnly cookie (o localStorage como fallback)
6. Redirige a `/app` (Home)

### Flujo de registro
1. `/app/register`
2. Formulario: nombre, email, password, confirmar password
3. POST `/api/v1/auth/register`
4. Auto-login tras registro exitoso
5. Redirige a onboarding (Fase 8) o Home

### Refresh automatico
```typescript
// src/api/client.ts
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

api.interceptors.request.use(config => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Cola de requests pendientes durante refresh
let isRefreshing = false;
let failedQueue: Array<{ resolve: Function; reject: Function }> = [];

api.interceptors.response.use(null, async error => {
  if (error.response?.status === 401 && !error.config._retry) {
    if (isRefreshing) {
      // Encolar request hasta que refresh termine
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(token => {
        error.config.headers.Authorization = `Bearer ${token}`;
        return api(error.config);
      });
    }

    error.config._retry = true;
    isRefreshing = true;

    try {
      const newToken = await refreshAccessToken();
      failedQueue.forEach(p => p.resolve(newToken));
      failedQueue = [];
      error.config.headers.Authorization = `Bearer ${newToken}`;
      return api(error.config);
    } catch (err) {
      failedQueue.forEach(p => p.reject(err));
      failedQueue = [];
      useAuthStore.getState().logout();
      window.location.href = '/app/login';
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
  return Promise.reject(error);
});
```

### Auth Store (Zustand)
```typescript
// src/stores/authStore.ts
interface AuthStore {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  role: 'USER' | 'ADMIN' | 'CLIENT' | null;  // Preparado para Fase 9

  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  setTokens: (access: string, refresh: string) => void;
  refreshToken: () => Promise<string>;
}
```

### Rutas protegidas
```typescript
// src/components/layout/PrivateRoute.tsx
function PrivateRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, role } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/app/login" />;

  // Fase 9: redirigir CLIENT a /app/client si intenta acceder a rutas de freelancer
  // if (role === 'CLIENT' && !location.pathname.startsWith('/app/client'))
  //   return <Navigate to="/app/client" />;

  return children;
}
```

### Lo que NO aplica en web (vs Flutter)
- PIN login — no hay PIN en web
- Biometria — no disponible en navegador
- Secure storage — se usa memoria (Zustand) + httpOnly cookies

---

## Layout — AppShell

```
+============================+===========================================+
|                            |  GlobalTimerBar (si hay timer activo)     |
|  [Logo]                    |--------------------------------------------|
|                            |  TopBar: [Breadcrumb]  [Notif] [Avatar ▾] |
|  Home          /app        |--------------------------------------------|
|  Tareas        /app/tasks  |                                            |
|  Proyectos     /app/proj.  |                                            |
|  Notas         /app/notes  |         <Outlet />                         |
|  Eventos       /app/events |    (pagina activa se renderiza aqui)       |
|  Reuniones     /app/meet.  |                                            |
|  ──────────                |                                            |
|  Tiempo        /app/time   |                                            |
|  Facturas      /app/inv.   |                                            |
|  IA            /app/ai     |                                            |
|  ──────────                |                                            |
|  Settings      /app/sett.  |                                            |
|                            |                                            |
|  [Plan badge]              |                                            |
|  [Avatar + nombre]         |                                            |
+============================+===========================================+
```

### Sidebar
- Fija a la izquierda, height 100vh, position sticky
- Ancho: 280px expandida, 64px colapsada (solo iconos), 0px en movil
- Toggle: boton hamburger en TopBar o auto segun breakpoint
- Cada link: icono (Lucide) + texto + badge contador si aplica (ej: facturas pendientes)
- Link activo: fondo accent-blue/10, borde izquierdo accent-blue, texto accent-blue
- Secciones separadas por divider fino
- Bottom: avatar usuario + nombre + plan badge (Free/Pro/Business)

### TopBar
- Breadcrumb dinamico: "Proyectos > Corp X > Kanban"
- Boton notificaciones (campana con badge)
- Avatar usuario con dropdown: perfil, settings, logout
- En movil: hamburger button + titulo pagina

### GlobalTimerBar
- Barra de 40px entre TopBar y contenido
- Solo visible si `timerStore.activeEntry !== null`
- Contenido: dot color proyecto + "Proyecto > Tarea" + cronometro HH:MM:SS + boton stop
- Click en la barra → navega a `/app/time`
- Animacion: slide-down al aparecer, slide-up al desaparecer

---

## Router completo

```typescript
// src/router.tsx
const router = createBrowserRouter([
  // LANDING (publica)
  { path: "/", element: <LandingPage /> },

  // AUTH (publica)
  { path: "/app/login", element: <LoginPage /> },
  { path: "/app/register", element: <RegisterPage /> },
  { path: "/app/forgot-password", element: <ForgotPasswordPage /> },

  // WEBAPP (protegida)
  {
    path: "/app",
    element: <PrivateRoute><AppShell /></PrivateRoute>,
    children: [
      { index: true, element: <HomePage /> },
      { path: "tasks", element: <TasksPage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "projects/:id", element: <ProjectDetailPage /> },
      { path: "notes", element: <NotesPage /> },
      { path: "events", element: <EventsPage /> },
      { path: "meetings", element: <MeetingsPage /> },
      { path: "time", element: <TimeTrackingPage /> },
      { path: "invoices", element: <InvoicesPage /> },
      { path: "invoices/:id", element: <InvoiceDetailPage /> },
      { path: "invoices/new/:projectId", element: <InvoiceGeneratorPage /> },
      { path: "ai", element: <AIActionsPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "settings/ai", element: <AISettingsPage /> },
      { path: "settings/profile", element: <FreelancerProfilePage /> },
      { path: "settings/plans", element: <PlansPage /> },
    ]
  },

  // Fase 9 anadira aqui:
  // { path: "/app/chat", ... }
  // { path: "/app/client", ... }

  // 404
  { path: "*", element: <Navigate to="/" /> },
]);
```
