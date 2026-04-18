const ciudades = [
  {
    id: 1, nombre: "Santiago", pais: "Chile", icono: "⛅", temperatura: 22, estado: "Parcialmente nublado", humedad: 55, viento: 18,
    pronosticoSemanal: [
      { dia: "Lun", min: 10, max: 22, estado: "Soleado" },
      { dia: "Mar", min: 12, max: 24, estado: "Soleado" },
      { dia: "Mié", min: 11, max: 20, estado: "Nublado" },
      { dia: "Jue", min: 9, max: 18, estado: "Lluvioso" },
      { dia: "Vie", min: 10, max: 21, estado: "Parcialmente nublado" },
      { dia: "Sáb", min: 11, max: 23, estado: "Soleado" },
      { dia: "Dom", min: 13, max: 25, estado: "Soleado" }
    ]
  },
  {
    id: 2, nombre: "Valparaíso", pais: "Chile", icono: "🌬️", temperatura: 17, estado: "Viento costero", humedad: 72, viento: 32,
    pronosticoSemanal: [
      { dia: "Lun", min: 12, max: 18, estado: "Nublado" },
      { dia: "Mar", min: 11, max: 17, estado: "Viento costero" },
      { dia: "Mié", min: 10, max: 16, estado: "Nublado" },
      { dia: "Jue", min: 9, max: 15, estado: "Lluvioso" },
      { dia: "Vie", min: 11, max: 17, estado: "Parcialmente nublado" },
      { dia: "Sáb", min: 12, max: 19, estado: "Soleado" },
      { dia: "Dom", min: 12, max: 20, estado: "Soleado" }
    ]
  },
  {
    id: 3, nombre: "La Serena", pais: "Chile", icono: "☀️", temperatura: 25, estado: "Soleado", humedad: 48, viento: 12,
    pronosticoSemanal: [
      { dia: "Lun", min: 14, max: 25, estado: "Soleado" },
      { dia: "Mar", min: 15, max: 26, estado: "Soleado" },
      { dia: "Mié", min: 13, max: 24, estado: "Parcialmente nublado" },
      { dia: "Jue", min: 14, max: 23, estado: "Nublado" },
      { dia: "Vie", min: 15, max: 25, estado: "Soleado" },
      { dia: "Sáb", min: 16, max: 27, estado: "Soleado" },
      { dia: "Dom", min: 15, max: 26, estado: "Soleado" }
    ]
  },
  {
    id: 4, nombre: "Antofagasta", pais: "Chile", icono: "🌤️", temperatura: 28, estado: "Despejado", humedad: 35, viento: 20,
    pronosticoSemanal: [
      { dia: "Lun", min: 16, max: 28, estado: "Despejado" },
      { dia: "Mar", min: 17, max: 29, estado: "Despejado" },
      { dia: "Mié", min: 16, max: 27, estado: "Despejado" },
      { dia: "Jue", min: 15, max: 26, estado: "Soleado" },
      { dia: "Vie", min: 16, max: 28, estado: "Despejado" },
      { dia: "Sáb", min: 17, max: 29, estado: "Despejado" },
      { dia: "Dom", min: 17, max: 30, estado: "Soleado" }
    ]
  },
  {
    id: 5, nombre: "Concepción", pais: "Chile", icono: "🌧️", temperatura: 13, estado: "Lluvia leve", humedad: 85, viento: 22,
    pronosticoSemanal: [
      { dia: "Lun", min: 8, max: 14, estado: "Lluvioso" },
      { dia: "Mar", min: 7, max: 13, estado: "Lluvioso" },
      { dia: "Mié", min: 9, max: 15, estado: "Nublado" },
      { dia: "Jue", min: 8, max: 14, estado: "Lluvioso" },
      { dia: "Vie", min: 10, max: 16, estado: "Parcialmente nublado" },
      { dia: "Sáb", min: 11, max: 17, estado: "Soleado" },
      { dia: "Dom", min: 9, max: 15, estado: "Nublado" }
    ]
  },
  {
    id: 6, nombre: "Puerto Montt", pais: "Chile", icono: "🌨️", temperatura: 9, estado: "Lluvia intensa", humedad: 90, viento: 28,
    pronosticoSemanal: [
      { dia: "Lun", min: 4, max: 10, estado: "Lluvia intensa" },
      { dia: "Mar", min: 3, max: 9, estado: "Lluvia intensa" },
      { dia: "Mié", min: 5, max: 11, estado: "Nublado" },
      { dia: "Jue", min: 4, max: 9, estado: "Lluvioso" },
      { dia: "Vie", min: 6, max: 12, estado: "Parcialmente nublado" },
      { dia: "Sáb", min: 5, max: 11, estado: "Nublado" },
      { dia: "Dom", min: 4, max: 10, estado: "Lluvia intensa" }
    ]
  }
];

const buscarCiudadPorId = (id) => ciudades.find(ciudad => ciudad.id === id);

const calcularEstadisticas = (pronostico) => {
  let minSemanal = pronostico[0].min;
  let maxSemanal = pronostico[0].max;
  let sumaTemperaturas = 0;
  let conteoClima = {};

  for (let i = 0; i < pronostico.length; i++) {
    let dia = pronostico[i];

    if (dia.min < minSemanal) minSemanal = dia.min;
    if (dia.max > maxSemanal) maxSemanal = dia.max;

    sumaTemperaturas += (dia.min + dia.max) / 2;

    if (conteoClima[dia.estado]) {
      conteoClima[dia.estado]++;
    } else {
      conteoClima[dia.estado] = 1;
    }
  }

  let promedioSemanal = (sumaTemperaturas / pronostico.length).toFixed(1);

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

  return {
    min: minSemanal,
    max: maxSemanal,
    promedio: promedioSemanal,
    conteo: conteoClima,
    resumen: resumenTexto
  };
};

function renderHome() {
  const contenedor = document.getElementById("lista-ciudades");
  if (!contenedor) return;
  
  contenedor.textContent = '';

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

function irADetalle(id) {
  const ciudad = buscarCiudadPorId(id);
  const estadisticas = calcularEstadisticas(ciudad.pronosticoSemanal);
  const contenedorDetalle = document.getElementById("detalle-contenido");
  
  contenedorDetalle.textContent = '';

  const detailWrapper = document.createElement("div");
  detailWrapper.className = "weather-detail";

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

  headerDiv.appendChild(mainIcon);
  headerDiv.appendChild(titleName);
  headerDiv.appendChild(statusP);
  detailWrapper.appendChild(headerDiv);

  const statsTitle = document.createElement("h5");
  statsTitle.className = "mb-3 border-bottom pb-2";
  statsTitle.textContent = "Estadísticas de la semana";
  detailWrapper.appendChild(statsTitle);

  const statsBox = document.createElement("div");
  statsBox.className = "bg-light p-3 rounded mb-4";

  const crearDatoEstadistico = (label, valor) => {
    const p = document.createElement("p");
    p.className = "mb-1";
    const strong = document.createElement("strong");
    strong.textContent = label + " ";
    p.appendChild(strong);
    p.appendChild(document.createTextNode(valor));
    return p;
  };

  statsBox.appendChild(crearDatoEstadistico("Temperatura Mínima:", estadisticas.min + "°"));
  statsBox.appendChild(crearDatoEstadistico("Temperatura Máxima:", estadisticas.max + "°"));
  statsBox.appendChild(crearDatoEstadistico("Promedio Semanal:", estadisticas.promedio + "°"));
  
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
    li.textContent = estado + ": " + estadisticas.conteo[estado] + " días";
    ulConteo.appendChild(li);
  }
  statsBox.appendChild(ulConteo);

  const resumenAlert = document.createElement("div");
  resumenAlert.className = "alert alert-info mt-3 mb-0";
  resumenAlert.setAttribute("role", "alert");
  resumenAlert.textContent = estadisticas.resumen;
  statsBox.appendChild(resumenAlert);

  detailWrapper.appendChild(statsBox);

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

function abrirAcercaDe() {
  const contenedorDetalle = document.getElementById("detalle-contenido");
  contenedorDetalle.textContent = '';
  
  const title = document.createElement("h2");
  title.textContent = "Acerca de";
  
  const hr = document.createElement("hr");
  
  const text = document.createElement("p");
  text.textContent = "Este es un proyecto para el curso de Desarrollo Front End con el framework Bootstrap y JS Vanilla.";
  
  contenedorDetalle.appendChild(title);
  contenedorDetalle.appendChild(hr);
  contenedorDetalle.appendChild(text);

  const offcanvas = new bootstrap.Offcanvas(document.getElementById("detalleCiudad"));
  offcanvas.show();
}

document.addEventListener("DOMContentLoaded", function () {
  renderHome();
});