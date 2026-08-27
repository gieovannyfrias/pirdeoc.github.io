/**
 * 🏛️ El Heraldo Engine - Componente Unificado Remoto
 * Formato JS compatible con inyección dinámica.
 * PARTE 1: Configuración de Seguridad y Estilos CSS
 */
(function() {
    // 1. CONTROL DE SEGURIDAD: Prevenir doble inicialización
    if (window.__elHeraldoInitialized) return;
    window.__elHeraldoInitialized = true;

    document.addEventListener('DOMContentLoaded', () => {
        // ==========================================================================
        // 🎨 INYECCIÓN DE ESTILOS CSS
        // ==========================================================================
        const estilosStyles = `
            :root {
                --color-principal: #1a1a1a;
                --color-tinta: #121212;
                --color-gris-oscuro: #333333;
                --color-borde: rgba(0, 0, 0, 0.08);
                --color-acento-rojo: #c92a2a;
                --bg-footer: #121212;
                --text-primary: #ffffff;
                --text-secondary: #a0a0a0;
                --text-muted: #666666;
                --border-color: #2a2a2a;
                --fuente-logotipo: 'Playfair Display', Georgia, serif;
                --font-serif: 'Playfair Display', Georgia, serif;
                --font-sans: 'Inter', Helvetica, sans-serif;
                --transicion: all 0.3s ease;
                --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                --transition-cinematic: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            }

            body.modo-lectura {
                --color-principal: #ffffff;
                --color-gris-oscuro: #f5f5f5;
                --color-borde: rgba(255, 255, 255, 0.1);
                --color-tinta: #ffffff;
                background-color: #1a1a1a;
                color: var(--color-gris-oscuro);
            }

            .barra-navegacion {
                position: fixed;
                top: 0; left: 0; right: 0;
                background-color: rgba(251, 251, 249, 0.95);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border-bottom: 1px solid var(--color-borde);
                z-index: 100;
                transform: translateY(-100%);
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease;
            }
            body.modo-lectura .barra-navegacion { background-color: rgba(26, 26, 26, 0.95); }
            .barra-navegacion.visible { transform: translateY(0); }
            
            .nav-contenedor {
                max-width: 1400px; margin: 0 auto; height: 56px;
                display: flex; justify-content: space-between; align-items: center; padding: 0 40px;
            }
            .nav-logo { font-family: var(--fuente-logotipo); font-size: 18px; font-weight: 900; letter-spacing: -0.5px; color: var(--color-tinta); }
            
            .nav-enlaces a { text-decoration: none; color: var(--color-gris-oscuro); font-size: 13px; font-weight: 600; margin: 0 12px; transition: color 0.2s; }
            .nav-enlaces a:hover, .nav-enlaces a.activo { color: var(--color-acento-rojo); }
            .nav-acciones { display: flex; align-items: center; gap: 12px; }
            
            .btn-circular {
                background: none; border: 1px solid var(--color-borde); width: 34px; height: 34px; border-radius: 50%;
                cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--color-tinta); transition: var(--transicion);
            }
            .btn-suscripcion-nav { background-color: var(--color-tinta); color: white; border: none; padding: 6px 16px; border-radius: 4px; font-size: 12px; font-weight: 700; cursor: pointer; transition: var(--transicion); }
            body.modo-lectura .btn-suscripcion-nav { background-color: var(--color-acento-rojo); }

            .menu-hamburguesa { display: none; background: none; border: none; cursor: pointer; flex-direction: column; justify-content: center; gap: 5px; width: 24px; height: 24px; padding: 0; z-index: 120; transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
            .menu-hamburguesa .linea { width: 100%; height: 1.5px; background-color: var(--color-tinta); border-radius: 1px; transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, background-color 0.3s ease; }
            .menu-hamburguesa.abierto .linea:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
            .menu-hamburguesa.abierto .linea:nth-child(2) { opacity: 0; transform: scaleX(0); }
            .menu-hamburguesa.abierto .linea:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

                 /* ==========================================================================
               CORTINA OSCURA DE FONDO (REPARADA)
               ========================================================================== */
            .menu-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background-color: rgba(18, 18, 18, 0.4); /* Gris transparente */
                backdrop-filter: blur(4px);
                -webkit-backdrop-filter: blur(4px);
                z-index: 110;
                transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.5s;
                
                /* 🚀 SOLUCIÓN: Forzar a que esté completamente oculto al cargar */
                opacity: 0 !important;
                visibility: hidden !important;
                pointer-events: none !important;
            }

            /* Solo se activa cuando JavaScript le añade la clase 'activo' */
            .menu-overlay.activo {
                opacity: 1 !important;
                visibility: visible !important;
                pointer-events: auto !important;
            }


            .news-footer { background-color: var(--bg-footer); color: var(--text-primary); font-family: var(--font-sans); padding: 4rem 2rem 2rem 2rem; border-top: 4px solid var(--color-acento-rojo); margin-top: 60px; }
            .footer-container { max-width: 1200px; margin: 0 auto; }
            .footer-top { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; padding-bottom: 3rem; border-bottom: 1px solid var(--border-color); gap: 2rem; }
            .footer-brand { flex: 1 1 400px; }
            .footer-logo {     font-family: var(--fuente-logotipo); font-size: 2.5rem; font-weight: 900; letter-spacing: -1px; margin: 0 0 0.5rem 0; text-transform: capitalize; }
            .footer-tagline { color: var(--text-secondary); font-size: 0.95rem; line-height: 1.5; max-width: 350px; }
            .footer-newsletter { flex: 1 1 400px; }
            .footer-newsletter h3 { font-family: var(--font-serif); font-size: 1.3rem; margin: 0 0 0.5rem 0; }
            .footer-newsletter p { color: var(--text-secondary); font-size: 0.9rem; margin: 0 0 1rem 0; }

            .newsletter-form { display: flex; flex-wrap: wrap; gap: 0.5rem; }
            .newsletter-form input[type="email"] { flex: 1; background-color: #1e1e1e; border: 1px solid var(--border-color); padding: 0.8rem 1rem; color: var(--text-primary); font-size: 0.9rem; border-radius: 4px; transition: var(--transition-smooth); }
            .newsletter-form input[type="email"]:focus { outline: none; border-color: var(--color-acento-rojo); background-color: #252525; }
            .newsletter-form button { background-color: var(--color-acento-rojo); color: white; border: none; padding: 0.8rem 1.5rem; font-weight: 600; font-size: 0.9rem; border-radius: 4px; cursor: pointer; transition: var(--transition-smooth); }
            .newsletter-form button:hover { background-color: #b02323; }
            .form-feedback { display: block; font-size: 0.85rem; margin-top: 0.5rem; }

            .footer-middle { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2.5rem; padding: 3rem 0; border-bottom: 1px solid var(--border-color); }
            .footer-column h4 { font-family: var(--font-serif); font-size: 1.1rem; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 1.2rem 0; position: relative; padding-bottom: 0.5rem; }
            .footer-column h4::after { content: ''; position: absolute; bottom: 0; left: 0; width: 30px; height: 2px; background-color: var(--color-acento-rojo); }
            .footer-column ul { list-style: none; padding: 0; margin: 0; }
            .footer-column ul li { margin-bottom: 0.8rem; }
            .footer-column ul li a { color: var(--text-secondary); text-decoration: none; font-size: 0.9rem; transition: var(--transition-smooth); }
            .footer-column ul li a:hover { color: var(--text-primary); padding-left: 5px; }

            .footer-bottom { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; padding-top: 2rem; gap: 1.5rem; }
            .footer-legal p { font-size: 0.85rem; color: var(--text-muted); margin: 0 0 0.5rem 0; }
            .legal-links { display: flex; flex-wrap: wrap; gap: 1rem; }
            .legal-links a { color: var(--text-muted); text-decoration: none; font-size: 0.85rem; transition: var(--transition-smooth); }
            .legal-links a:hover { color: var(--text-secondary); }

            .footer-social { display: flex; flex-wrap: wrap; gap: 1rem; }
            .footer-social a { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; background-color: #1e1e1e; color: var(--text-secondary); border-radius: 50%; text-decoration: none; transition: var(--transition-smooth); }
            .footer-social a:hover { background-color: var(--color-acento-rojo); color: #ffffff; transform: translateY(-3px); }

            #scrollToTopBtn { display: none; position: fixed; bottom: 30px; right: 30px; z-index: 99; background-color: var(--color-acento-rojo); color: white; border: none; outline: none; width: 45px; height: 45px; border-radius: 50%; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.3); transition: var(--transition-smooth); align-items: center; justify-content: center; }
            #scrollToTopBtn:hover { background-color: #b02323; transform: scale(1.1); }

                        /* ==========================================================================
               📱 ADAPTACIÓN RESPONSIVA (MENÚ EDITORIAL SIN DISTORSIÓN)
               ========================================================================== */
            @media (max-width: 768px) {
                .menu-hamburguesa { 
                    display: flex; 
                }
                
                .nav-contenedor { 
                    padding: 0 20px; 
                    height: 60px; 
                    position: relative;
                }
                
                /* PANEL LATERAL: Ancho fijo blindado que ignora los porcentajes */
                .nav-enlaces { 
                    display: flex; 
                    flex-direction: column; 
                    position: fixed; 
                    top: 0; 
                    left: -320px; /* Oculto con margen extra para tapar la sombra de la caja */
                    width: 300px; 
                    height: 100vh; 
                    background-color: rgba(251, 251, 249, 0.98); 
                    padding: 90px 32px 32px 32px; 
                    gap: 4px; 
                    z-index: 115; 
                    box-shadow: 20px 0 60px rgba(0, 0, 0, 0.08); 
                    transition: left var(--transition-cinematic); 
                    box-sizing: border-box; /* Fuerza al navegador a incluir el padding dentro de los 300px */
                }
                
                body.modo-lectura .nav-enlaces { 
                    background-color: rgba(26, 26, 26, 0.98); 
                }
                
                /* DESPLIEGUE SEGURO: Empuja el bloque exactamente al borde izquierdo */
                .nav-enlaces.abierto { 
                    left: 0 !important; 
                }
                
                /* CORTINA OSCURA (OVERLAY) ASENTADA EN MÓVIL */
                .menu-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background-color: rgba(18, 18, 18, 0.4);
                    backdrop-filter: blur(4px);
                    -webkit-backdrop-filter: blur(4px);
                    z-index: 1;
                    transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.5s;
                    
                    opacity: 0 !important;
                    visibility: hidden !important;
                    pointer-events: none !important;
                }

                .menu-overlay.activo {
                    opacity: 1 !important;
                    visibility: visible !important;
                    pointer-events: auto !important;
                }
                
                /* Estilos tipográficos internos de la lista móvil */
                .nav-enlaces a { 
                    font-size: 15px; 
                    font-weight: 500; 
                    letter-spacing: 0.3px; 
                    color: var(--color-gris-oscuro); 
                    padding: 14px 0; 
                    margin: 0; 
                    width: 100%; 
                    border-bottom: 1px solid rgba(0, 0, 0, 0.04); 
                    transition: color 0.25s ease, padding-left 0.25s ease; 
                    box-sizing: border-box;
                }
                
                body.modo-lectura .nav-enlaces a { 
                    border-bottom-color: rgba(255,255,255,0.05); 
                }
                
                .nav-enlaces a:hover, 
                .nav-enlaces a.activo { 
                    color: var(--color-acento-rojo); 
                    padding-left: 6px; 
                }
                
                .nav-enlaces a:last-child { 
                    border-bottom: none; 
                }
                
                .nav-logo { 
                    position: absolute; 
                    left: 50%; 
                    top: 50%; 
                    transform: translate(-50%, -50%); 
                    font-size: 16px; 
                    font-weight: 700; 
                    letter-spacing: 1px; 
                    color: var(--color-tinta); 
                    display: none; 
                }
                
                .btn-suscripcion-nav { 
                    padding: 6px 14px; 
                    font-size: 11px; 
                    letter-spacing: 0.5px; 
                    font-weight: 700; 
                    text-transform: uppercase; 
                    border-radius: 20px; 
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); 
                }
                
                .footer-top, 
                .footer-bottom { 
                    flex-direction: column; 
                    align-items: stretch; 
                }
                .footer-brand {
                flex: 1 1 150px;
                }
                .footer-newsletter {
                    flex: 1 1 150px;
                }
                .footer-bottom { 
                    flex-direction: column-reverse; 
                }
                
                .footer-social { 
                    justify-content: flex-start; 
                }
            }


        `;

        const styleNode = document.createElement('style');
        styleNode.textContent = estilosStyles;
        document.head.appendChild(styleNode);
              // ==========================================================================
        // 🧱 INYECCIÓN DE LA ESTRUCTURA HTML (NAV, OVERLAY, FOOTER, SCROLLBTN)
        // ==========================================================================
        const wrapperNav = document.createElement('div');
        wrapperNav.innerHTML = `
            <nav class="barra-navegacion" id="stickyNav">
                <div class="nav-contenedor">
                    <button class="menu-hamburguesa" id="btnHamburguesa" aria-label="Abrir menú" aria-expanded="false">
                        <span class="linea"></span>
                        <span class="linea"></span>
                        <span class="linea"></span>
                    </button>
                    <span class="nav-logo">Pirdeoc</span>
                    <div class="nav-enlaces" id="menuEnlaces">
                        <a href="/Nacional" class="activo">Nacional</a>
                        <a href="/Internacional">Internacional</a>
                        <a href="Economia">Economía</a>
                        <a href="/Tecnologia">Tecnología</a>
                        <a href="/Cultura">Cultura</a>
                    </div>
                    <div class="nav-acciones">
                        <button id="btnModoLectura" class="btn-circular" title="Modo Lectura">
                            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                        </button>
                        <a href="/Suscripcion"><button class="btn-suscripcion-nav">Suscribirse</button></a>
                    </div>
                </div>
            </nav>
            <div class="menu-overlay" id="menuOverlay"></div>
        `;
        document.body.insertBefore(wrapperNav, document.body.firstChild);

        const wrapperFooter = document.createElement('div');
        wrapperFooter.innerHTML = `
            <footer class="news-footer">
                <div class="footer-container">
                    <div class="footer-top">
                        <div class="footer-brand">
                            <h2 class="footer-logo">Pirdeoc</h2>
                            <p class="footer-tagline">Periodico digital independiente, riguroso y veraz. Fundado en 2026.</p>
                        </div>
                        <div class="footer-newsletter">
                            <h3>Suscríbete a la Newsletter</h3>
                            <p>Recibe las noticias más importantes directamente en tu correo.</p>
                            <form id="newsletterForm" class="newsletter-form">
                                <input type="email" id="emailInput" placeholder="Tu correo electrónico" required>
                                <button type="submit">Suscribirse</button>
                            </form>
                            <span id="formFeedback" class="form-feedback"></span>
                        </div>
                    </div>
                    <div class="footer-middle">
                        <div class="footer-column">
                            <h4>Secciones</h4>
                            <ul>
                                <li><a href="/Nacional">Nacional</a></li>
                                <li><a href="/Internacional">Internacional</a></li>
                                <li><a href="/Economía">Economía</a></li>
                                <li><a href="/Tecnologia">Tecnologia</a></li>
                                <li><a href="/Cultura">Cultura</a></li>
                            </ul>
                        </div>
                        <div class="footer-column">
                            <h4>Cultura y Ocio</h4>
                            <ul>
                                <li><a href="/Cultura">Cultura</a></li>
                                <li><a href="/Deportes">Deportes</a></li>
                                <li><a href="/Ciencia_Salud">Ciencia y Salud</a></li>
                                <li><a href="/Tecnologia">Tecnología</a></li>
                                <li><a href="/Estilo_Vida">Estilo de Vida</a></li>
                                <li><a href="/Espectaculos">Espectaculos</a></li>

                            </ul>
                        </div>
                        <div class="footer-column">
                            <h4>Servicios</h4>
                            <ul>
                                <li><a href="/Hemeroteca">Hemeroteca</a></li>
                                <li><a href="/Edicion_impresa">Edición Impresa</a></li>
                                <li><a href="/Anuncios">Anuncios Clasificados</a></li>
                                <li><a href="/Podcasts_Videos">Podcasts y Videos</a></li>
                                <li><a href="/Newsletter">Todas las Newsletters</a></li>
                                <li><a href="/Categorias">Todas las categorias</a></li>

                            </ul>
                        </div>
                        <div class="footer-column">
                            <h4>Corporativo</h4>
                            <ul>
                                <li><a href="/Quienes_Somos">Quiénes Somos</a></li>
                                <li><a href="/Contacto">Contacto y Redacción</a></li>
                                <li><a href="/Publicidad">Publicidad y Tarifas</a></li>
                                <li><a href="/Trabaja_nosotros">Trabaja con Nosotros</a></li>
                                <li><a href="/Suscripciones">Planes de Suscripción</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <div class="footer-legal">
                            <p>&copy; <span id="year"></span> Pirdeoc S.A. Todos los derechos reservados.</p>
                            <div class="legal-links">
                                <a href="/Aviso_legal">Aviso Legal</a>
                                <a href="/Politicas_Privacidad">Política de Privacidad</a>
                                <a href="/Politicas_cookies">Política de Cookies</a>
                                <a href="/Normas_moderacion">Normas de Moderación</a>
                            </div>
                        </div>
                        <div class="footer-social">
                            <a href="https://www.facebook.com/pirdeoc" aria-label="Facebook"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
</svg></a>
                            <a href="https://x.com/pirdeoc" aria-label="Twitter"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
</svg></a>
                            <a href="https://www.instagram.com/pirdeoc" aria-label="Instagram"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
</svg></a>
                            <a href="https://www.linkedin.com/company/pirdeoc/" aria-label="LinkedIn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
</svg></a>
                            <a href="https://www.youtube.com/@pirdeoc" aria-label="YouTube"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-youtube" viewBox="0 0 16 16">
  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
</svg></a>
                        </div>
                    </div>
                </div>
            </footer>
            <button id="scrollToTopBtn" title="Volver arriba">↑</button>
        `;
        document.body.appendChild(wrapperFooter);

        // ==========================================================================
        // ⚙️ LÓGICA E INTERACCIÓN JAVASCRIPT
        // ==========================================================================
        const btnHamburguesa = document.getElementById('btnHamburguesa');
        const menuEnlaces = document.getElementById('menuEnlaces');
        const menuOverlay = document.getElementById('menuOverlay');
        const stickyNav = document.getElementById('stickyNav');
        const btnModoLectura = document.getElementById('btnModoLectura');
        const newsletterForm = document.getElementById('newsletterForm');
        const formFeedback = document.getElementById('formFeedback');
        const scrollToTopBtn = document.getElementById('scrollToTopBtn');

        // 1. Control del Panel Lateral Cinemático Móvil
        function alternarMenu() {
            const estaAbierto = btnHamburguesa?.classList.contains('abierto');
            if (btnHamburguesa) {
                btnHamburguesa.classList.toggle('abierto');
                btnHamburguesa.setAttribute('aria-expanded', !estaAbierto);
            }
            if (menuEnlaces) menuEnlaces.classList.toggle('abierto');
            if (menuOverlay) menuOverlay.classList.toggle('activo');
            document.body.style.overflow = !estaAbierto ? 'hidden' : '';
        }

        if (btnHamburguesa) btnHamburguesa.addEventListener('click', alternarMenu);
        if (menuOverlay) menuOverlay.addEventListener('click', alternarMenu);

        if (menuEnlaces) {
            menuEnlaces.querySelectorAll('a').forEach(enlace => {
                enlace.addEventListener('click', () => {
                    if (btnHamburguesa?.classList.contains('abierto')) alternarMenu();
                });
            });
        }

        // 2. Feed Dinámico de Pestañas Externas
        const botonesTabs = document.querySelectorAll('.tab-btn');
        const panelesFeed = document.querySelectorAll('.panel-contenido');

        if (botonesTabs.length > 0 && panelesFeed.length > 0) {
            botonesTabs.forEach(boton => {
                boton.addEventListener('click', () => {
                    const objetivoId = boton.getAttribute('data-target');
                    botonesTabs.forEach(b => { b.classList.remove('activo'); b.setAttribute('aria-selected', 'false'); });
                    panelesFeed.forEach(panel => panel.classList.remove('activo'));
                    boton.classList.add('activo');
                    boton.setAttribute('aria-selected', 'true');
                    const panelObjetivo = document.getElementById(objetivoId);
                    if (panelObjetivo) panelObjetivo.classList.add('activo');
                });
            });
        }

        // 3. Sistema de Scroll de la Barra Superior e Icono "Volver arriba"
               // Scroll dinámico de barra e icono "Volver arriba"
        let ultimoScrollY = window.scrollY;
        if (stickyNav && ultimoScrollY === 0) stickyNav.classList.add('visible');

        window.addEventListener('scroll', () => {
            const scrollActualY = window.scrollY;

            if (stickyNav) {
                if (scrollActualY <= 50) {
                    stickyNav.classList.add('visible');
                } else if (scrollActualY < ultimoScrollY) {
                    stickyNav.classList.add('visible');
                } else {
                    if (!btnHamburguesa?.classList.contains('abierto')) stickyNav.classList.remove('visible');
                }
            }

            if (scrollToTopBtn) {
                scrollToTopBtn.style.display = scrollActualY > 400 ? 'inline-flex' : 'none';
            }

            ultimoScrollY = scrollActualY;
        }, { passive: true });

        if (scrollToTopBtn) {
            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // 4. Modo Lectura Nocturna con LocalStorage
        if (btnModoLectura) {
            if (localStorage.getItem('modoLectura') === 'true') {
                document.body.classList.add('modo-lectura');
                actualizarIconoLectura(true);
            }

            btnModoLectura.addEventListener('click', () => {
                document.body.classList.toggle('modo-lectura');
                const esOscuro = document.body.classList.contains('modo-lectura');
                localStorage.setItem('modoLectura', esOscuro);
                actualizarIconoLectura(esOscuro);
            });
        }

        function actualizarIconoLectura(esOscuro) {
            if (!btnModoLectura) return;
            // CORREGIDO: Se agregaron las comillas invertidas necesarias para inyectar los SVG sin romper JavaScript
            btnModoLectura.innerHTML = esOscuro 
                ? `<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`
                : `<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`;
        }

        // 5. Formulario de Suscripción Interactivo
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (formFeedback) {
                    formFeedback.style.color = '#2b8a3e';
                    formFeedback.textContent = '¡Gracias por suscribirte! Revisa tu bandeja de entrada.';
                    newsletterForm.reset();
                    setTimeout(() => { formFeedback.textContent = ''; }, 5000);
                }
            });
        }
                  document.getElementById("year").textContent = new Date().getFullYear();
    }); // Cierre de DOMContentLoaded
})(); // Cierre de la IIFE

