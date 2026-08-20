/**
 * Almacén de datos actualizado con fechas reales para calcular el "extra"
 */
const DATA_FEED_NOTICIAS = {
  novedades: [
    { 
      imagen: "https://lh3.googleusercontent.com/d/1ZKVltJP559XoWmaAtCDgkFKV_uqWAwz8=w1000", 
      meta: "Hace 5 min", 
      // Usamos una fecha real (Año, Mes [0-11], Día, Hora, Minutos)
      timestamp: new Date(2026, 7, 20, 2, 34), 
      titular: "Europa legisla la privacidad en la computación cuántica",
      enlace: "/No_disponible"
    },
    { 
      imagen: "https://lh3.googleusercontent.com/d/1ZKVltJP559XoWmaAtCDgkFKV_uqWAwz8=w1000", 
      meta: "Hace 22 min", 
      timestamp: new Date(2026, 7, 20, 2, 17), 
      titular: "Satélites detectan anomalías térmicas en los océanos",
      enlace: "/No_disponible"
    },
    { 
      imagen: "https://lh3.googleusercontent.com/d/1ZKVltJP559XoWmaAtCDgkFKV_uqWAwz8=w1000", 
      meta: "Hace 1 hora", 
      timestamp: new Date(2026, 7, 20, 1, 39), 
      titular: "Nueva York restringe el uso de algoritmos financieros",
      enlace: "/No_disponible"
    }
  ],
  recomendado: [
    { 
      imagen: "https://lh3.googleusercontent.com/d/1ZKVltJP559XoWmaAtCDgkFKV_uqWAwz8=w1000", 
      meta: "98% Afinidad", 
      timestamp: new Date(2026, 7, 19, 18, 30), 
      titular: "Guía completa sobre arquitectura web descentralizada",
      enlace: "/No_disponible"
    },
    { 
      imagen: "https://lh3.googleusercontent.com/d/1ZKVltJP559XoWmaAtCDgkFKV_uqWAwz8=w1000", 
      meta: "92% Afinidad", 
      timestamp: new Date(2026, 7, 19, 15, 45), 
      titular: "La evolución del diseño editorial en la era del scroll",
      enlace: "/No_disponible"
    }
  ],
  tendencias: [
    { 
      imagen: "https://lh3.googleusercontent.com/d/1ZKVltJP559XoWmaAtCDgkFKV_uqWAwz8=w1000", 
      meta: "#1 Más leído", 
      timestamp: new Date(2026, 7, 18, 10, 0), 
      titular: "¿El fin de los monopolios tecnológicos en el mundo?",
      enlace: "/No_disponible"
    }
  ]
};

/**
 * Función auxiliar para formatear la fecha en: Día, Fecha y Hora
 */
function formatearFechaExtra(fecha) {
  const opciones = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  };
  // Formatea automáticamente a español (Ej: "jueves, 20 de agosto de 2026, 02:34")
  return new Intl.DateTimeFormat('es-ES', opciones).format(fecha);
}

/**
 * Función Principal del Componente
 */
function inicializarFeedNoticias(idContenedorPadre) {
  const contenedor = document.getElementById(idContenedorPadre);
  if (!contenedor) return;

  // 1. INYECTAR ESTILOS GENERALES
  if (!document.getElementById("estilos-descubrimiento-feed")) {
    const estilos = document.createElement("style");
    estilos.id = "estilos-descubrimiento-feed";
    estilos.textContent = `
      .descubrimiento-feed { background-color: #ffffff; border-radius: 16px; padding: 24px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); width: 100%; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, Segoe UI , Roboto, sans-serif; margin: 20px auto; }
      .tabs-navegacion { display: flex; gap: 8px; border-bottom: 1px solid rgba(0, 0, 0, 0.05); padding-bottom: 16px; margin-bottom: 20px; }
      .tab-btn { background: none; border: none; padding: 8px 16px; font-size: 13px; font-weight: 600; color: #666; cursor: pointer; border-radius: 20px; text-transform: capitalize; transition: all 0.25s ease; }
      .tab-btn:hover { color: #111; background-color: rgba(0, 0, 0, 0.03); }
      .tab-btn.activo { background-color: #111111; color: #ffffff; }
      .panel-contenido { display: none; flex-direction: column; gap: 20px; opacity: 0; transform: translateY(10px); transition: opacity 0.3s ease, transform 0.3s ease; max-height: 500px; overflow-y: auto; padding-right: 8px; }
      .panel-contenido.activo { display: flex; opacity: 1; transform: translateY(0); }
      .panel-contenido::-webkit-scrollbar { width: 4px; }
      .panel-contenido::-webkit-scrollbar-thumb { background: #cccccc; border-radius: 4px; }
      
      .tarjeta-enlace { text-decoration: none; display: block; color: inherit; border-bottom: 1px solid #ededed; padding-bottom: 16px; }
      .tarjeta-enlace:last-child { border-bottom: none; padding-bottom: 0; }
      .tarjeta-enlace:hover h4 { color: #c5221f; }
      
      .tarjeta-mini .img_0 { width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 10px; display: block; }
      
      /* Contenedor de las etiquetas de tiempo */
      .meta-contenedor { display: flex; flex-direction: column; gap: 2px; margin-bottom: 4px; }
      .tiempo-publicacion { font-size: 11px; font-weight: 700; color: #c5221f; text-transform: uppercase; letter-spacing: 0.5px; }
      
      /* Estilo para el campo extra */
      .tiempo-extra { font-size: 11px; font-weight: 400; color: #666666; text-transform: capitalize; }
      
      .tarjeta-mini h4 { font-size: 16px; font-weight: 700; line-height: 1.4; margin: 4px 0 0 0; color: #111111; transition: color 0.2s ease; }
    `;
    document.head.appendChild(estilos);
  }

  // 2. CONSTRUCCIÓN DINÁMICA DEL CONTENIDO
  let HTML_Botones = "";
  let HTML_Paneles = "";

  Object.keys(DATA_FEED_NOTICIAS).forEach((categoria, indice) => {
    const esPrimero = indice === 0;

    HTML_Botones += `<button class="tab-btn ${esPrimero ? 'activo' : ''}" data-target="${categoria}">${categoria}</button>`;

    let tarjetasHTML = "";
    DATA_FEED_NOTICIAS[categoria].forEach(noticia => {
      // Generamos el texto extra formateado de manera limpia
      const textoExtra = formatearFechaExtra(noticia.timestamp);

      tarjetasHTML += `
        <a href="${noticia.enlace}" class="tarjeta-enlace" target="_blank" rel="noopener noreferrer">
          <div class="tarjeta-mini">
            <img class="img_0" src="${noticia.imagen}" alt="${noticia.titular}" loading="lazy">
            <div class="meta-contenedor">
              <span class="tiempo-publicacion">${noticia.meta}</span>
              <span class="tiempo-extra">${textoExtra}</span>
            </div>
            <h4>${noticia.titular}</h4>
          </div>
        </a>
      `;
    });

    HTML_Paneles += `<div class="panel-contenido ${esPrimero ? 'activo' : ''}" id="${categoria}">${tarjetasHTML}</div>`;
  });

  contenedor.innerHTML = `
    <section class="descubrimiento-feed">
      <div class="tabs-navegacion">${HTML_Botones}</div>
      <div class="paneles-feed">${HTML_Paneles}</div>
    </section>
  `;

  // 3. LÓGICA DE INTERACTIVIDAD
  const barraNav = contenedor.querySelector('.tabs-navegacion');
  const botones = barraNav.querySelectorAll('.tab-btn');
  const paneles = contenedor.querySelectorAll('.panel-contenido');

  barraNav.addEventListener('click', (evento) => {
    const botonClickeado = evento.target.closest('.tab-btn');
    if (!botonClickeado || botonClickeado.classList.contains('activo')) return;

    const idObjetivo = botonClickeado.getAttribute('data-target');

    botones.forEach(btn => btn.classList.toggle('activo', btn === botonClickeado));
    paneles.forEach(panel => {
      const esElTarget = panel.id === idObjetivo;
      panel.classList.toggle('activo', esElTarget);
      if (esElTarget) panel.scrollTop = 0;
    });
  });
}

// 4. DISPARADOR DE ARRANQUE SEGURO
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => inicializarFeedNoticias('contenedor-noticias'));
} else {
  inicializarFeedNoticias('contenedor-noticias');
}
