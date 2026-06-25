# PruebaSanAngular

Frontend Angular 16 para la gestión de clientes, conectado a una API Spring Boot. Incluye Tailwind CSS, arquitectura modular, notificaciones toast y modales para CRUD.

## 🏗️ Arquitectura

```
src/app/
├── components/
│   └── notificaciones/
│       └── notificaciones.component.ts  # Componente global de toasts
├── models/
│   └── cliente.ts                       # Interface Cliente
├── pages/
│   └── lista-clientes/
│       ├── lista-clientes.component.ts  # Lógica del componente
│       ├── lista-clientes.component.html # Template con Tailwind
│       └── lista-clientes.component.css # Estilos locales
├── services/
│   ├── cliente.service.ts               # HTTP client para API CRUD
│   └── notificacion.service.ts          # Servicio singleton de toasts
├── app.module.ts                        # Módulo raíz (HttpClient, Forms)
├── app-routing.module.ts                # Rutas (/clientes)
└── app.component.html                   # Layout principal + toasts globales
```

### Capas

- **Presentación**: Componentes standalone con templates HTML + Tailwind CSS.
- **Lógica de negocio**: Serviciosinyectados (`ClienteService`, `NotificacionService`).
- **Modelos**: Interfaces TypeScript que reflectan el schema del backend.
- **Routing**: Una sola ruta `/clientes` apuntando a `ListaClientesComponent`.

### Flujo de datos

1. `ListaClientesComponent` consume `ClienteService` (HttpClient).
2. Las respuestas se almacenan en arrays locales (`clientes`, `clientesFiltrados`).
3. Las operaciones CRUD disparan notificaciones mediante `NotificacionService` (patrón Observable/Subject).
4. `NotificacionesComponent` se subscribe al stream global y renderiza toasts animados.

## 🛠️ Tecnologías

- **Angular 16** (CLI ~16.0.0)
- **TypeScript 5**
- **RxJS 7**
- **Tailwind CSS 3** (via PostCSS)
- **HttpClient** + **FormsModule**

## 🚀 Características

- CRUD completo de clientes contra API REST.
- Búsqueda/filtrado en tiempo real.
- Formulario en modal con overlay (crear/editar).
- Sistema de notificaciones toast (éxito, error, advertencia, info).
- Diseño responsive con Tailwind CSS.

## ⚙️ Requisitos previos

- Node.js 18+ y npm
- Backend Spring Boot corriendo en `http://localhost:9090/api`
  - Endpoints: `GET/POST/PUT/DELETE /clientes`
  - CORS habilitado para `http://localhost:4200`

## 📦 Instalación

```bash
npm install
```

## 🧪 Desarrollo

```bash
ng serve
```
Abrir `http://localhost:4200/clientes`.

La app se recarga automáticamente ante cambios en los archivos fuente.

## 🏗️ Build de producción

```bash
ng build --configuration production
```

Los artefactos se generan en `dist/prueba_san_angular/`.

### Despliegue

1. Ejecutar el build de producción.
2. Subir la carpeta `dist/prueba_san_angular/` a tu servidor web (Nginx, Apache, Netlify, Vercel, etc.).
3. Configurar el servidor para redirigir todas las rutas a `index.html` (SPA).
4. Ajustar la URL del backend en `src/app/services/cliente.service.ts` si no es `http://localhost:9090/api`.

#### Ejemplo Nginx

```nginx
server {
    listen 80;
    server_name tu-dominio.com;
    root /ruta/a/dist/prueba_san_angular;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:9090/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 🧪 Pruebas unitarias

```bash
ng test
```

## 📝 Notas

- Si el backend usa otra URL, modificar `baseUrl` en `ClienteService`.
- Para cambiar la duración de los toasts, ajustar el `setTimeout` en `NotificacionService` (actualmente 4000ms).
- El modelo `Cliente` debe coincidir con el JSON que devuelve el backend.

## 📄Licencia

Privado - Prueba técnica
