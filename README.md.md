¡Hola! Esta es la evolución de mi aplicación de clima. En esta etapa, el foco principal fue darle "vida" a la interfaz utilizando JavaScript Vanilla, separando los datos del HTML y manipulando el DOM de forma segura.

### 🗂️ Modelado de Datos
Toda la información meteorológica dejó de estar "quemada" en el HTML. Ahora está modelada en JavaScript mediante un **arreglo de objetos** llamado `ciudades`. Cada objeto de ciudad contiene sus datos actuales (temperatura, humedad, viento) y un sub-arreglo llamado `pronosticoSemanal`, que almacena el detalle del clima para los próximos 7 días.

### 📊 Estadísticas Semanales
Al hacer clic en cualquier ciudad, la aplicación recorre el pronóstico semanal utilizando ciclos y condicionales para calcular y renderizar en tiempo real:
* **Temperaturas extremas:** La mínima y máxima de la semana.
* **Promedio:** El promedio de temperatura semanal.
* **Frecuencia del clima:** Un conteo exacto de cuántos días estarán soleados, nublados o lluviosos.
* **Resumen inteligente:** Un mensaje de texto dinámico que cambia dependiendo de cuál fue la condición climática más repetida durante esa semana.

### 🛡️ Seguridad en el DOM
La interfaz de detalle se construye de manera segura utilizando `document.createElement()` y `textContent`, evitando la inyección directa de strings con `innerHTML` para prevenir vulnerabilidades.

refactorización segura del DOM.

Link repositorio: https://github.com/pablovidal05/windofchange



---