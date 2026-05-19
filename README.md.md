# WeatherApp – Módulo 5

App de clima que muestra el estado actual y pronóstico semanal de 6 ciudades chilenas, consumiendo datos reales desde Open-Meteo API.

## Estructura de clases

- **ApiClient** — responsable de hacer fetch a Open-Meteo y devolver el JSON crudo.
- **WeatherApp** — gestiona las ciudades, procesa la respuesta de la API, interpreta los weather codes y coordina la interfaz.

## API utilizada

- **Nombre:** Open-Meteo  
- **URL base:** https://api.open-meteo.com/v1/forecast  
- **Documentación:** https://open-meteo.com/en/docs  
- Sin API key requerida. Gratuita y de código abierto.

## Cómo se calculan las estadísticas

A partir del pronóstico de 7 días obtenido de la API se calcula:
- Temperatura mínima y máxima de la semana
- Temperatura promedio (media de min+max por día)
- Conteo de días por tipo de clima
- Alertas automáticas: calor si promedio > 28°C, lluvia si hay 3+ días lluviosos

## Cómo ejecutar

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### Build para producción
```bash
npm build
```

## Interactividad

- **Búsqueda de ciudades**: Input en Home que filtra en tiempo real.
- **Navegación sin recarga**: Vue Router maneja las transiciones entre Home y Detalle.
- **Datos reactivos**: Vue `ref()` y `computed()` manejan el estado.

## API utilizada

- **Nombre**: Open-Meteo
- **URL base**: https://api.open-meteo.com/v1/forecast
- **Documentación**: https://open-meteo.com/en/docs
- Sin API key requerida. Gratuita y de código abierto.

## Estadísticas calculadas

A partir del pronóstico de 7 días:
- Temperatura mínima y máxima de la semana
- Temperatura promedio
- Conteo de días por tipo de clima
- Alertas automáticas: calor (promedio > 28°C), lluvia (≥3 días lluviosos), nieve

## Repositorio

https://github.com/pablovidal05/windofchange

---

**Proyecto desarrollado para el Módulo 6 del bootcamp de Desarrollo Frontend.**