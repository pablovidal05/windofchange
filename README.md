# WeatherApp – Módulo 7

App de clima con sistema de autenticación de usuarios, estado global con Pinia y rutas protegidas. Construida con Vue 3, Vue Router y Firebase Auth.

## Sistema de usuarios

Cada usuario autenticado tiene acceso a:
- **Lista de ciudades favoritas** — se guarda en el store de Pinia durante la sesión
- **Navbar personalizado** — muestra el email del usuario y botón de cerrar sesión

Los datos de sesión que se guardan en el store:
- `email` del usuario autenticado
- `uid` de Firebase
- `isAuthenticated` — flag que controla el acceso a rutas protegidas

## Rutas

| Ruta | Acceso | Descripción |
|------|--------|-------------|
| `/` | Público | Home con listado de ciudades |
| `/location/:id` | Público | Detalle del clima de una ciudad |
| `/login` | Público | Formulario de inicio de sesión |
| `/registro` | Público | Formulario de creación de cuenta |
| `/favoritos` | Privado | Ciudades favoritas del usuario autenticado |

## Autenticación

- Implementada con **Firebase Authentication** (correo + contraseña)
- El estado de sesión se maneja con **Pinia**
- Las rutas privadas se protegen con `router.beforeEach`
- Si el usuario no está autenticado e intenta acceder a `/favoritos`, es redirigido a `/login`

## API utilizada

- **Nombre**: Open-Meteo
- **URL base**: https://api.open-meteo.com/v1/forecast
- **Documentación**: https://open-meteo.com/en/docs
- Sin API key requerida. Gratuita y de código abierto.

## Repositorio

https://github.com/pablovidal05/windofchange

## Cómo ejecutar

### Instalación
```bash
pnpm install
```

### Desarrollo
```bash
pnpm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### Build para producción
```bash
pnpm run build
`` 
