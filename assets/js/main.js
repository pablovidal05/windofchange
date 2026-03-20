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
    col.className = "col-6 col-md-4 col-lg-3";
    col.innerHTML = `
      <div class="ciudad-card" onclick="irADetalle(${ciudad.id})">
        <div class="icono">${ciudad.icono}</div>
        <div class="nombre">${ciudad.nombre}</div>
        <div class="temperatura">${ciudad.temperatura}°</div>
        <div class="estado">${ciudad.estado}</div>
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
    <div class="card-dia text-center p-2">
      <div class="dia">${dia.dia}</div>
      <div>${dia.icono}</div>
      <div class="temp-dia">${dia.temp}°C</div>
    </div>
  `).join("");

  abrirOffcanvas(`
    <div style="font-size:3rem">${ciudad.icono}</div>
    <h2>${ciudad.nombre}</h2>
    <p>${ciudad.estado}</p>
    <hr>
    <p><strong>Temperatura:</strong> ${ciudad.temperatura}°C</p>
    <p><strong>Humedad:</strong> ${ciudad.humedad}%</p>
    <p><strong>Viento:</strong> ${ciudad.viento} km/h</p>
    <p><strong>Sensación:</strong> ${ciudad.temperatura - 2}°C</p>
    <hr>
    <h6>Pronóstico semanal</h6>
    <div class="d-flex flex-wrap gap-2">${pronosticoHTML}</div>
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