// 1. Base de datos local (Cada ID tiene su sección real)
const noticiasDatos = [
    {
        id: 1,
        hora: "18:31",
        seccion: "Tecnología",
        imagen: "https://lh3.googleusercontent.com/d/1ZKVltJP559XoWmaAtCDgkFKV_uqWAwz8=w1000",
        titular: "El Congreso aprueba la reforma fiscal tras una sesión extraordinaria de doce horas",
        cuerpo: "Con 260 votos a favor, el paquete económico introduce nuevos gravámenes a corporaciones tecnológicas.",
        enlace: "/No_disponible"
    },
    {
        id: 2,
        hora: "18:14",
        seccion: "Mercados",
        imagen: "https://lh3.googleusercontent.com/d/1ZKVltJP559XoWmaAtCDgkFKV_uqWAwz8=w1000",
        titular: "Las bolsas asiáticas registran pérdidas generalizadas ante el temor de una desaceleración",
        cuerpo: "El índice Nikkei cae un 2.3%, arrastrado principalmente por el sector de semiconductores y manufactura.",
        enlace: "/No_disponible"
    },
    {
        id: 3,
        hora: "17:45",
        seccion: "Internacional",
        imagen: "https://lh3.googleusercontent.com/d/1ZKVltJP559XoWmaAtCDgkFKV_uqWAwz8=w1000",
        titular: "Cumbre del Clima cierra con un acuerdo histórico para reducir subsidios a combustibles fósiles",
        cuerpo: "Más de 140 delegaciones nacionales firman el documento de compromiso vinculante con metas fijadas para 2030.",
        enlace: "/No_disponible"
    },
    {
        id: 4,
        hora: "17:20",
        seccion: "Cultura",
        imagen: "https://lh3.googleusercontent.com/d/1ZKVltJP559XoWmaAtCDgkFKV_uqWAwz8=w1000",
        titular: "Fallece la novelista Elena Varela a los 84 años en su residencia de Madrid",
        cuerpo: "La ganadora del Premio Cervantes deja un legado indispensable para la narrativa contemporánea en español.",
        enlace: "/No_disponible"
    }
];

// 2. Inyección dinámica de CSS
function inyectarEstilosModulo() {
    if (document.getElementById("estilos-modulo-noticias")) return;

    const estilos = document.createElement("style");
    estilos.id = "estilos-modulo-noticias";
    estilos.textContent = `
        .columna-noticias-urgentes {
            width: 100%;                  
            padding: 16px;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .noticias-header {
            display: flex;
            align-items: center;
            gap: 8px;
            border-bottom: 3px solid #111111;
            padding-bottom: 6px;
            margin-bottom: 16px;
        }
        .noticias-header h3 {
            font-size: 15px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin: 0;
            color: #111111;
        }
        .pulso-alerta {
            width: 9px;
            height: 9px;
            background-color: #db2d2d;
            border-radius: 50%;
            animation: latidoPeriodistico 1.5s infinite ease-in-out;
        }
        .noticias-scroll-container {
            max-height: 520px;
            overflow-y: auto;
            padding-right: 4px;
            scrollbar-width: thin;
            scrollbar-color: #e1e1e6 transparent;
        }
        .noticias-scroll-container::-webkit-scrollbar { width: 4px; }
        .noticias-scroll-container::-webkit-scrollbar-track { background: transparent; }
        .noticias-scroll-container::-webkit-scrollbar-thumb { background: #e1e1e6; border-radius: 4px; }
        .noticias-scroll-container::-webkit-scrollbar-thumb:hover { background: #db2d2d; }
        
        .noticia-bloque {
            display: block;
            text-decoration: none;
            border-bottom: 1px solid #f0f0f5;
            padding: 14px 0;
            transition: background-color 0.2s ease;
        }
        .noticia-bloque .img_0 {
            width: 100%;
            height: 180px;
            object-fit: cover;
            display: block;
            margin-bottom: 12px;
            border-radius: 4px;
        }
        .noticia-bloque:last-child { border-bottom: none; }
        .noticia-bloque:hover { background-color: #fcfcfd; }
        .noticia-bloque:hover h4 { color: #db2d2d; }
        
        /* Contenedor meta en vertical */
        .noticia-meta { 
            display: flex; 
            flex-direction: column; 
            gap: 4px; 
            margin-bottom: 8px; 
            font-size: 11px; 
            font-weight: 700; 
        }
        
        /* Fila de la hora arriba */
        .hora-alerta { 
            color: #db2d2d; 
            display: block;
        }
        
        /* Fila inferior con alineación horizontal al lado */
        .noticia-submeta {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .etiqueta-seccion { color: #666666; text-transform: uppercase; letter-spacing: 0.3px; }
        .etiqueta-vivo { background-color: #db2d2d; color: #ffffff; padding: 1px 5px; font-size: 9px; text-transform: uppercase; border-radius: 2px; display: inline-block; }
        
        .noticia-bloque h4 { font-size: 16px; line-height: 1.35; font-weight: 700; margin: 0 0 6px 0; color: #111111; transition: color 0.2s ease; }
        .noticia-bloque p { font-size: 13px; line-height: 1.45; margin: 0; color: #444446; }
        
        @keyframes latidoPeriodistico {
            0% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(219, 45, 45, 0.7); }
            50% { transform: scale(1); box-shadow: 0 0 0 10px rgba(219, 45, 45, 0); }
            100% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(219, 45, 45, 0); }
        }
        .nueva-noticia-animacion { animation: entradaNoticia 0.6s ease-out forwards; }
        @keyframes entradaNoticia {
            from { opacity: 0; transform: translateY(-15px); background-color: #fff5f5; }
            to { opacity: 1; transform: translateY(0); background-color: transparent; }
        }
        @media (max-width: 480px) {
            .noticias-scroll-container { max-height: none; padding-right: 0; }
            .noticia-bloque { padding: 16px 4px; }
            .noticia-bloque .img_0 { height: 150px; }
        }
    `;
    document.head.appendChild(estilos);
}

// 3. Lógica del Componente
let contenedorScroll;

function inicializarModuloNoticias(idContenedor) {
    const contenedorRaiz = document.getElementById(idContenedor);
    if (!contenedorRaiz) return;

    inyectarEstilosModulo();

    contenedorRaiz.innerHTML = `
        <div class="columna-noticias-urgentes">
            <div class="noticias-header">
                <span class="pulso-alerta"></span>
                <h3>Última Hora</h3>
            </div>
            <div class="noticias-scroll-container" id="lista-noticias-js"></div>
        </div>
    `;

    contenedorScroll = document.getElementById("lista-noticias-js");
    renderizarLista(noticiasDatos);
}

function crearNodoNoticia(item) {
    const enlaceContenedor = document.createElement("a");
    enlaceContenedor.className = "noticia-bloque";
    enlaceContenedor.href = item.enlace;
    enlaceContenedor.target = "_blank";
    enlaceContenedor.rel = "noopener noreferrer";

    enlaceContenedor.innerHTML = `
        <div class="noticia-meta">
            <div class="hora-alerta">${item.hora}</div>
            <div class="noticia-submeta">
                <span class="etiqueta-seccion">${item.seccion}</span>
                <span class="etiqueta-vivo">En Vivo</span>
            </div>
        </div>
        <img src="${item.imagen}" alt="Noticia" class="img_0" loading="lazy">
        <h4>${item.titular}</h4>
        <p>${item.cuerpo}</p>
    `;
    return enlaceContenedor;
}

function renderizarLista(lista) {
    contenedorScroll.innerHTML = "";
    lista.forEach(noticia => {
        contenedorScroll.appendChild(crearNodoNoticia(noticia));
    });
}

// 4. API Pública del script
function insertarNoticiaUrgente(noticia) {
    if (!contenedorScroll) return;
    const nuevoElemento = crearNodoNoticia(noticia);
    nuevoElemento.classList.add("nueva-noticia-animacion");
    
    contenedorScroll.insertBefore(nuevoElemento, contenedorScroll.firstChild);
    contenedorScroll.scrollTop = 0;
}

// 5. Arranque automático
document.addEventListener("DOMContentLoaded", () => {
    inicializarModuloNoticias("modulo-noticias");
});
