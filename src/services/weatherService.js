import { CIUDADES_BASE } from '../assets/js/data.js'

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
export const calcularEstadisticas = (pronostico) => {
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

// ── EXPORTA LA INSTANCIA ──────────────────────────────────────────
export const weatherApp = new WeatherApp(new ApiClient());