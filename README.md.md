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

Abrir index.html en el navegador. Requiere conexión a internet para consumir la API.


## Repositorio

https://github.com/pablovidal05/windofchange