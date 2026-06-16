# WeatherApp – App de Clima (Módulo 8, Portafolio final)

SPA construida con **Vue 3 + Vite** que consume una **API de clima real** (Open-Meteo), maneja
estado global con **Pinia**, calcula **estadísticas semanales** y genera **alertas meteorológicas**
por reglas. Incluye autenticación de usuarios con Firebase y sistema de favoritos.

## Repositorio

🔗 **GitHub:** https://github.com/pablovidal05/windofchange

## Stack

- **Vue 3** (Composition API, `<script setup>`)
- **Vue Router** (navegación SPA)
- **Pinia** (estado global — equivalente moderno de Vuex para Vue 3)
- **Vite** (bundler y servidor de desarrollo)
- **Firebase Authentication** (login/registro con correo + contraseña)
- **Open-Meteo API** (datos de clima reales, sin API key)

## Requisitos

- **Node.js** ≥ 18
- **npm** ≥ 9 (o **pnpm** ≥ 8)

## Instalación y ejecución local

```bash
# 1. Instalar dependencias
npm install        # o: pnpm install

# 2. Levantar servidor de desarrollo
npm run dev        # o: pnpm run dev
```

Abre **http://localhost:5173** en tu navegador.

```bash
# Build de producción
npm run build      # genera la carpeta dist/

# Previsualizar el build
npm run preview
```

## Configuración de variables

- **API de clima (Open-Meteo):** no requiere API key ni archivo `.env`. Es gratuita y de código
  abierto. Endpoint base: `https://api.open-meteo.com/v1/forecast`.
- **Firebase:** la configuración pública del proyecto está en `src/firebase.js`. Para usar tu propio
  proyecto Firebase, reemplaza el objeto `firebaseConfig` con tus credenciales (Console → Project
  settings → Your apps) y habilita el proveedor *Email/Password* en Authentication.

## Rutas principales

| Ruta | Acceso | Descripción |
|------|--------|-------------|
| `/` | Público | **Home** — listado de ciudades con clima actual + buscador |
| `/location/:id` | Público | **Detalle** — pronóstico de 7 días, estadísticas semanales y alertas |
| `/login` | Público | Inicio de sesión |
| `/registro` | Público | Creación de cuenta |
| `/favoritos` | Privado | Ciudades favoritas del usuario (requiere sesión) |

## Funcionalidades clave

### Consumo de API
- Datos de clima obtenidos en tiempo real desde **Open-Meteo** (temperatura actual, humedad,
  viento, código de clima y pronóstico diario a 7 días).
- Estados de carga (`Cargando datos del clima...`) y manejo de errores con mensajes al usuario
  cuando la API falla.

### Estado global (Pinia)
- `auth` — sesión del usuario (`email`, `uid`, `isAuthenticated`).
- `favoritos` — IDs de ciudades favoritas, persistidos en `localStorage`.
- El listado de ciudades y el pronóstico se gestionan a través del servicio `weatherService`,
  evitando llamadas redundantes a la API (cacheo en memoria).

### Estadísticas semanales
Calculadas en `calcularEstadisticas()` a partir del pronóstico de 7 días:
- Temperatura **mínima**, **máxima** y **promedio** de la semana.
- **Conteo de días por tipo de clima** (despejado, lluvioso, nublado, etc.).
- Resumen textual de la tendencia de la semana.

### Alertas meteorológicas
Generadas por reglas simples sobre las estadísticas:
- 🌡️ **Ola de calor** — promedio semanal > 28 °C.
- 🌧️ **Semana lluviosa** — 3 o más días con precipitaciones.
- ❄️ **Alerta de nieve** — algún día con nieve previsto.

### Extras
- Buscador de ciudades en el Home.
- Favoritos por usuario autenticado (persistencia local).
- Rutas protegidas con `router.beforeEach`.

## Estructura del proyecto

```
src/
├── App.vue
├── main.js                 # bootstrap: Pinia + Router + Firebase
├── router.js               # definición de rutas y guard de auth
├── firebase.js             # configuración de Firebase
├── components/             # Navbar, Footer
├── views/                  # Home, Detail, Login, Registro, Favoritos
├── services/
│   └── weatherService.js   # cliente Open-Meteo + estadísticas + alertas
└── stores/                 # auth.js, favoritos.js (Pinia)
```

## Capturas

> _(Opcional — añade imágenes en `docs/` y enlázalas aquí: Home, Detalle, Favoritos.)_
