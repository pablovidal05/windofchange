const ciudades = [
  { id: 1, nombre: "Santiago", pais: "Chile", icono: "⛅", temperatura: 22, estado: "Parcialmente nublado", humedad: 55, viento: 18 },
  { id: 2, nombre: "Valparaíso", pais: "Chile", icono: "🌬️", temperatura: 17, estado: "Viento costero", humedad: 72, viento: 32 },
  { id: 3, nombre: "La Serena", pais: "Chile", icono: "☀️", temperatura: 25, estado: "Soleado", humedad: 48, viento: 12 },
  { id: 4, nombre: "Antofagasta", pais: "Chile", icono: "🌤️", temperatura: 28, estado: "Despejado", humedad: 35, viento: 20 },
  { id: 5, nombre: "Concepción", pais: "Chile", icono: "🌧️", temperatura: 13, estado: "Lluvia leve", humedad: 85, viento: 22 },
  { id: 6, nombre: "Puerto Montt", pais: "Chile", icono: "🌨️", temperatura: 9, estado: "Lluvia intensa", humedad: 90, viento: 28 },
  { id: 7, nombre: "Temuco", pais: "Chile", icono: "🌫️", temperatura: 11, estado: "Neblina", humedad: 88, viento: 10 },
  { id: 8, nombre: "Iquique", pais: "Chile", icono: "☀️", temperatura: 27, estado: "Soleado", humedad: 40, viento: 15 },
  { id: 9, nombre: "Rancagua", pais: "Chile", icono: "⛅", temperatura: 20, estado: "Nublado", humedad: 60, viento: 14 },
  { id: 10, nombre: "Punta Arenas", pais: "Chile", icono: "🌬️", temperatura: 4, estado: "Viento fuerte", humedad: 78, viento: 45 },
  { id: 11, nombre: "Copiapó", pais: "Chile", icono: "☀️", temperatura: 30, estado: "Muy soleado", humedad: 25, viento: 8 },
  { id: 12, nombre: "Arica", pais: "Chile", icono: "🌤️", temperatura: 29, estado: "Despejado", humedad: 38, viento: 16 },
];

const diasSemana = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const iconosPosibles = ["☀️", "⛅", "🌧️", "🌤️", "🌬️", "🌫️"];

function generarPronostico(tempBase) {
  return diasSemana.map((dia) => ({
    dia,
    icono: iconosPosibles[Math.floor(Math.random() * iconosPosibles.length)],
    temp: tempBase + Math.floor(Math.random() * 6) - 3,
  }));
}

function renderHome() {
  const contenedor = document.getElementById("lista-ciudades");
  if (!contenedor) return;

  ciudades.forEach((ciudad) => {
    const col = document.createElement("div");
col.className = "col-12 col-md-6 col-lg-4 col-xl-3"; 
    
    col.innerHTML = `
      <div class="place-card" onclick="irADetalle(${ciudad.id})">
        <span class="place-card__icon">${ciudad.icono}</span>
        <div class="place-card__info">
            <h3 class="place-card__name">${ciudad.nombre}</h3>
            <div class="place-card__temp">${ciudad.temperatura}°</div>
            <span class="place-card__status">${ciudad.estado}</span>
        </div>
      </div>
    `;
    contenedor.appendChild(col);
  });
}

function abrirOffcanvas(html) {
  document.getElementById("detalle-contenido").innerHTML = html;
  const offcanvas = new bootstrap.Offcanvas(document.getElementById("detalleCiudad"));
  offcanvas.show();
}

function irADetalle(id) {
  const ciudad = ciudades.find((c) => c.id === id);
  const pronostico = generarPronostico(ciudad.temperatura);

  const pronosticoHTML = pronostico.map((dia) => `
    <div class="forecast-card">
      <div class="forecast-card__day">${dia.dia}</div>
      <div class="forecast-card__icon">${dia.icono}</div>
      <div class="forecast-card__temp">${dia.temp}°</div>
    </div>
  `).join("");

  abrirOffcanvas(`
    <div class="weather-detail">
      <div class="weather-detail__header">
        <span class="weather-detail__main-icon">${ciudad.icono}</span>
        <h2 class="weather-detail__name">${ciudad.nombre}</h2>
        <p class="weather-detail__status">${ciudad.estado}</p>
      </div>

      <div class="weather-detail__stats">
        <div class="weather-detail__stat-card">
          <span class="label">Humedad</span>
          <span class="value">${ciudad.humedad}%</span>
        </div>
        <div class="weather-detail__stat-card">
          <span class="label">Viento</span>
          <span class="value">${ciudad.viento} km/h</span>
        </div>
        <div class="weather-detail__stat-card">
          <span class="label">Sensación</span>
          <span class="value">${ciudad.temperatura - 2}°</span>
        </div>
        <div class="weather-detail__stat-card">
          <span class="label">Presión</span>
          <span class="value">1013 hPa</span>
        </div>
      </div>

      <h6 class="weather-detail__forecast-title">Pronóstico 5 días</h6>
      <div class="d-flex justify-content-between gap-2">
        ${pronosticoHTML}
      </div>
    </div>
  `);
}

function abrirAcercaDe() {
  abrirOffcanvas(`
    <h2>Acerca de</h2>
    <hr>
    <p>Este es un proyecto para el curso de Desarrollo Front End con el framework Bootstrap.</p>
  `);
}

document.addEventListener("DOMContentLoaded", function () {
  renderHome();
});