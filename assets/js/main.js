// ── DATOS BASE ────────────────────────────────────────────────────
const CIUDADES_BASE = [
  { id: 1, nombre: "Santiago",     pais: "Chile", lat: -33.45, lon: -70.67 },
  { id: 2, nombre: "Valparaíso",   pais: "Chile", lat: -33.04, lon: -71.62 },
  { id: 3, nombre: "La Serena",    pais: "Chile", lat: -29.90, lon: -71.25 },
  { id: 4, nombre: "Antofagasta",  pais: "Chile", lat: -23.65, lon: -70.40 },
  { id: 5, nombre: "Concepción",   pais: "Chile", lat: -36.82, lon: -73.05 },
  { id: 6, nombre: "Puerto Montt", pais: "Chile", lat: -41.47, lon: -72.94 }
];


// ── CLASE: ApiClient ──────────────────────────────────────────────
class ApiClient {
  constructor() {
    this.baseUrl = "https://api.open-meteo.com/v1/forecast";
  }

  async obtenerClima(lat, lon) {
    const url = `${this.baseUrl}?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode,windspeed_10m,relativehumidity_2m&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=America/Santiago&forecast_days=7`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al conectar con la API");
    return response.json();
  }
}


// ── CLASE: WeatherApp ─────────────────────────────────────────────
class WeatherApp {
  constructor(apiClient) {
    this.apiClient = apiClient;
    this.ciudades = [];
  }

  interpretarCodigo(code) {
    if (code === 0)  return { estado: "Despejado",            icono: "☀️" };
    if (code <= 2)   return { estado: "Parcialmente nublado", icono: "⛅" };
    if (code <= 3)   return { estado: "Nublado",              icono: "☁️" };
    if (code <= 48)  return { estado: "Niebla",               icono: "🌫️" };
    if (code <= 55)  return { estado: "Llovizna",             icono: "🌦️" };
    if (code <= 65)  return { estado: "Lluvioso",             icono: "🌧️" };
    if (code <= 77)  return { estado: "Nieve",                icono: "❄️" };
    if (code <= 82)  return { estado: "Lluvia intensa",       icono: "⛈️" };
    return                   { estado: "Tormenta",            icono: "🌩️" };
  }

  procesarRespuesta(ciudadBase, datos) {
    const current = datos.current;
    const daily = datos.daily;
    const { estado, icono } = this.interpretarCodigo(current.weathercode);
    const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

    const pronosticoSemanal = daily.time.map((fecha, i) => {
      const diaSemana = diasSemana[new Date(fecha).getDay()];
      const { estado: estadoDia } = this.interpretarCodigo(daily.weathercode[i]);
      return {
        dia:    diaSemana,
        min:    Math.round(daily.temperature_2m_min[i]),
        max:    Math.round(daily.temperature_2m_max[i]),
        estado: estadoDia
      };
    });

    return {
      id:                ciudadBase.id,
      nombre:            ciudadBase.nombre,
      pais:              ciudadBase.pais,
      icono,
      temperatura:       Math.round(current.temperature_2m),
      estado,
      humedad:           current.relativehumidity_2m,
      viento:            Math.round(current.windspeed_10m),
      pronosticoSemanal
    };
  }

  async cargarCiudades() {
    const promesas = CIUDADES_BASE.map(async (ciudadBase) => {
      const datos = await this.apiClient.obtenerClima(ciudadBase.lat, ciudadBase.lon);
      return this.procesarRespuesta(ciudadBase, datos);
    });
    this.ciudades = await Promise.all(promesas);
  }

  buscarCiudadPorId(id) {
    return this.ciudades.find(c => c.id === id);
  }
}


// ── ESTADÍSTICAS ──────────────────────────────────────────────────
const calcularEstadisticas = (pronostico) => {
  let minSemanal = pronostico[0].min;
  let maxSemanal = pronostico[0].max;
  let sumaTemperaturas = 0;
  let conteoClima = {};

  for (let i = 0; i < pronostico.length; i++) {
    const dia = pronostico[i];
    if (dia.min < minSemanal) minSemanal = dia.min;
    if (dia.max > maxSemanal) maxSemanal = dia.max;
    sumaTemperaturas += (dia.min + dia.max) / 2;
    conteoClima[dia.estado] = (conteoClima[dia.estado] || 0) + 1;
  }

  const promedioSemanal = (sumaTemperaturas / pronostico.length).toFixed(1);

  let estadoMasFrecuente = "";
  let diasMaximos = 0;
  for (const estado in conteoClima) {
    if (conteoClima[estado] > diasMaximos) {
      diasMaximos = conteoClima[estado];
      estadoMasFrecuente = estado;
    }
  }

  let resumenTexto = "";
  if (estadoMasFrecuente.includes("Soleado") || estadoMasFrecuente.includes("Despejado")) {
    resumenTexto = "Semana mayormente soleada. Ideal para actividades al aire libre.";
  } else if (estadoMasFrecuente.includes("Lluvia") || estadoMasFrecuente.includes("Lluvioso")) {
    resumenTexto = "Semana pasada por agua, no olvides salir con paraguas.";
  } else {
    resumenTexto = "Semana gris y con mucha nubosidad.";
  }

  // Alertas
  const alertas = [];
  if (parseFloat(promedioSemanal) > 28) {
    alertas.push("🌡️ Alerta de calor: temperatura promedio elevada.");
  }
  const diasLluvia = (conteoClima["Lluvioso"] || 0) + (conteoClima["Lluvia intensa"] || 0) + (conteoClima["Llovizna"] || 0);
  if (diasLluvia >= 3) {
    alertas.push("🌧️ Semana lluviosa: se esperan varios días con precipitaciones.");
  }
  if (conteoClima["Nieve"]) {
    alertas.push("❄️ Alerta de nieve: posibles nevadas durante la semana.");
  }

  return {
    min: minSemanal,
    max: maxSemanal,
    promedio: promedioSemanal,
    conteo: conteoClima,
    resumen: resumenTexto,
    alertas
  };
};


// ── RENDER HOME ───────────────────────────────────────────────────
function renderHome(ciudades) {
  const contenedor = document.getElementById("lista-ciudades");
  if (!contenedor) return;
  contenedor.textContent = "";

  ciudades.forEach((ciudad) => {
    const col = document.createElement("div");
    col.className = "col-12 col-md-6 col-lg-4 col-xl-3";

    const card = document.createElement("div");
    card.className = "place-card";
    card.addEventListener("click", () => irADetalle(ciudad.id));

    const iconSpan = document.createElement("span");
    iconSpan.className = "place-card__icon";
    iconSpan.textContent = ciudad.icono;

    const infoDiv = document.createElement("div");
    infoDiv.className = "place-card__info";

    const nameH3 = document.createElement("h3");
    nameH3.className = "place-card__name";
    nameH3.textContent = ciudad.nombre;

    const tempDiv = document.createElement("div");
    tempDiv.className = "place-card__temp";
    tempDiv.textContent = ciudad.temperatura + "°";

    const statusSpan = document.createElement("span");
    statusSpan.className = "place-card__status";
    statusSpan.textContent = ciudad.estado;

    infoDiv.appendChild(nameH3);
    infoDiv.appendChild(tempDiv);
    infoDiv.appendChild(statusSpan);
    card.appendChild(iconSpan);
    card.appendChild(infoDiv);
    col.appendChild(card);
    contenedor.appendChild(col);
  });
}


// ── RENDER DETALLE ────────────────────────────────────────────────
function irADetalle(id) {
  const ciudad = app.buscarCiudadPorId(id);
  const estadisticas = calcularEstadisticas(ciudad.pronosticoSemanal);
  const contenedorDetalle = document.getElementById("detalle-contenido");
  contenedorDetalle.textContent = "";

  const detailWrapper = document.createElement("div");
  detailWrapper.className = "weather-detail";

  // Header
  const headerDiv = document.createElement("div");
  headerDiv.className = "weather-detail__header mb-4 text-center";

  const mainIcon = document.createElement("span");
  mainIcon.className = "display-1";
  mainIcon.textContent = ciudad.icono;

  const titleName = document.createElement("h2");
  titleName.className = "weather-detail__name mt-2";
  titleName.textContent = ciudad.nombre;

  const statusP = document.createElement("p");
  statusP.className = "weather-detail__status text-muted";
  statusP.textContent = ciudad.estado;

  const tempActual = document.createElement("p");
  tempActual.className = "fs-2 fw-bold";
  tempActual.textContent = ciudad.temperatura + "°C";

  const extraInfo = document.createElement("p");
  extraInfo.className = "text-muted small";
  extraInfo.textContent = `💧 Humedad: ${ciudad.humedad}%  |  💨 Viento: ${ciudad.viento} km/h`;

  headerDiv.appendChild(mainIcon);
  headerDiv.appendChild(titleName);
  headerDiv.appendChild(statusP);
  headerDiv.appendChild(tempActual);
  headerDiv.appendChild(extraInfo);
  detailWrapper.appendChild(headerDiv);

  // Alertas
  if (estadisticas.alertas.length > 0) {
    const alertasTitle = document.createElement("h5");
    alertasTitle.className = "mb-2 border-bottom pb-2";
    alertasTitle.textContent = "⚠️ Alertas de clima";
    detailWrapper.appendChild(alertasTitle);

    estadisticas.alertas.forEach((alerta) => {
      const alertDiv = document.createElement("div");
      alertDiv.className = "alert alert-warning py-2";
      alertDiv.textContent = alerta;
      detailWrapper.appendChild(alertDiv);
    });
  }

  // Estadísticas
  const statsTitle = document.createElement("h5");
  statsTitle.className = "mb-3 border-bottom pb-2 mt-3";
  statsTitle.textContent = "Estadísticas de la semana";
  detailWrapper.appendChild(statsTitle);

  const statsBox = document.createElement("div");
  statsBox.className = "bg-light p-3 rounded mb-4";

  const crearDato = (label, valor) => {
    const p = document.createElement("p");
    p.className = "mb-1";
    const strong = document.createElement("strong");
    strong.textContent = label + " ";
    p.appendChild(strong);
    p.appendChild(document.createTextNode(valor));
    return p;
  };

  statsBox.appendChild(crearDato("Temperatura Mínima:", estadisticas.min + "°C"));
  statsBox.appendChild(crearDato("Temperatura Máxima:", estadisticas.max + "°C"));
  statsBox.appendChild(crearDato("Promedio Semanal:",   estadisticas.promedio + "°C"));
  statsBox.appendChild(document.createElement("hr"));

  const diasClimaTitle = document.createElement("p");
  diasClimaTitle.className = "mb-1";
  const strongDias = document.createElement("strong");
  strongDias.textContent = "Días por clima:";
  diasClimaTitle.appendChild(strongDias);
  statsBox.appendChild(diasClimaTitle);

  const ulConteo = document.createElement("ul");
  ulConteo.className = "mb-2";
  for (const estado in estadisticas.conteo) {
    const li = document.createElement("li");
    li.textContent = `${estado}: ${estadisticas.conteo[estado]} días`;
    ulConteo.appendChild(li);
  }
  statsBox.appendChild(ulConteo);

  const resumenAlert = document.createElement("div");
  resumenAlert.className = "alert alert-info mt-3 mb-0";
  resumenAlert.textContent = estadisticas.resumen;
  statsBox.appendChild(resumenAlert);

  detailWrapper.appendChild(statsBox);

  // Pronóstico
  const forecastTitle = document.createElement("h5");
  forecastTitle.className = "weather-detail__forecast-title border-bottom pb-2";
  forecastTitle.textContent = "Pronóstico Extendido";
  detailWrapper.appendChild(forecastTitle);

  const forecastContainer = document.createElement("div");
  forecastContainer.className = "d-flex flex-wrap justify-content-between mt-3";

  ciudad.pronosticoSemanal.forEach((dia) => {
    const dayCard = document.createElement("div");
    dayCard.className = "forecast-card text-center border rounded p-2 m-1 flex-fill bg-light";

    const divDia = document.createElement("div");
    divDia.className = "fw-bold";
    divDia.textContent = dia.dia;

    const divMin = document.createElement("div");
    divMin.className = "text-primary";
    divMin.textContent = dia.min + "°";

    const divMax = document.createElement("div");
    divMax.className = "text-danger";
    divMax.textContent = dia.max + "°";

    const divEstado = document.createElement("div");
    divEstado.className = "small";
    divEstado.textContent = dia.estado;

    dayCard.appendChild(divDia);
    dayCard.appendChild(divMin);
    dayCard.appendChild(divMax);
    dayCard.appendChild(divEstado);
    forecastContainer.appendChild(dayCard);
  });

  detailWrapper.appendChild(forecastContainer);
  contenedorDetalle.appendChild(detailWrapper);

  const offcanvas = new bootstrap.Offcanvas(document.getElementById("detalleCiudad"));
  offcanvas.show();
}


// ── ACERCA DE ─────────────────────────────────────────────────────
function abrirAcercaDe() {
  const contenedorDetalle = document.getElementById("detalle-contenido");
  contenedorDetalle.textContent = "";

  const title = document.createElement("h2");
  title.textContent = "Acerca de";

  const hr = document.createElement("hr");

  const text = document.createElement("p");
  text.textContent = "WeatherApp consume datos reales desde Open-Meteo API. Proyecto desarrollado para el Módulo 5 del bootcamp de Desarrollo Frontend.";

  contenedorDetalle.appendChild(title);
  contenedorDetalle.appendChild(hr);
  contenedorDetalle.appendChild(text);

  const offcanvas = new bootstrap.Offcanvas(document.getElementById("detalleCiudad"));
  offcanvas.show();
}


// ── INIT ──────────────────────────────────────────────────────────
const app = new WeatherApp(new ApiClient());

document.addEventListener("DOMContentLoaded", async () => {
  const mensaje = document.getElementById("mensaje-estado");
  mensaje.textContent = "Cargando datos del clima...";

  try {
    await app.cargarCiudades();
    mensaje.textContent = "";
    renderHome(app.ciudades);
  } catch (error) {
    mensaje.textContent = "Error al cargar los datos. Intenta recargar la página.";
    console.error(error);
  }
});