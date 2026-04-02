☁️ WeatherApp – Proyecto Frontend M3
¡Hola! Esta es la evolución de mi aplicación de clima. En esta etapa, el foco estuvo en refactorizar todo el código para que sea más limpio, profesional y fácil de mantener usando herramientas modernas como SASS y la metodología BEM.

🎨 Temática y Diseño
La app muestra el clima de 12 ciudades de Chile. El diseño busca ser minimalista y funcional, utilizando una paleta de colores neutros y una tipografía clara para que la información meteorológica sea la protagonista.

🛠️ ¿Cómo organicé el código? (Metodología BEM)
Para que el CSS no sea un caos, usé la metodología BEM (Block, Element, Modifier). Esto significa que cada parte de la interfaz tiene un nombre lógico:


Bloque: .place-card (la tarjeta entera).


Elemento: .place-card__name o .place-card__temp (lo que hay dentro).

🚀 Uso de SASS
Dividí los estilos en archivos pequeños (parciales) para que sea mucho más fácil trabajar:


_variables.scss: Aquí guardé mis colores y fuentes para cambiarlos en un solo lugar.


_layout.scss: Estructura del header, footer y el cuerpo de la página.


_place-card.scss y _weather-detail.scss: Estilos específicos de los componentes.


Mixin: Creé un "mixin" para que todas las tarjetas tengan ese efecto de sombra suave al pasar el mouse, sin repetir código.

📱 Responsividad y Bootstrap
La app es totalmente responsiva gracias al sistema de grillas de Bootstrap:


Móvil: Las tarjetas se ven en una sola columna para que sean fáciles de leer.


Escritorio: Se expanden a 3 o 4 columnas aprovechando el espacio.


Componentes: Usé el Navbar para la navegación y el Offcanvas para mostrar el detalle de cada ciudad de forma moderna.

📂 Cómo ejecutarlo
Clona este repo.

Asegúrate de que el archivo assets/css/style.css esté presente (es el resultado de compilar el SASS).

Abre el index.html en tu navegador y ¡listo!
