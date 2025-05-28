/*
*   Controlador de uso general en las páginas web del sitio privado.
*   Sirve para manejar la plantilla del encabezado y pie del documento.
*/

// Constante para completar la ruta de la API.
const USER_API = 'services/admin/administrador.php';
// Constante para establecer el elemento del contenido principal.
const MAIN = document.querySelector('main');
MAIN.style.paddingTop = '75px';
MAIN.style.paddingBottom = '100px';
MAIN.classList.add('container');
// Se establece el título de la página web.
document.querySelector('title').textContent = 'SeguriPYME - Dashboard';
// Constante para establecer el elemento del título principal.
const MAIN_TITLE = document.getElementById('mainTitle');
MAIN_TITLE.classList.add('text-center', 'py-3');

/*  Función asíncrona para cargar el encabezado y pie del documento.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const loadTemplate = async () => {
    // Petición para obtener en nombre del usuario que ha iniciado sesión.
    const DATA = await fetchData(USER_API, 'getUser');
    // Se verifica si el usuario está autenticado, de lo contrario se envía a iniciar sesión.
    if (DATA.session) {
        // Se comprueba si existe un alias definido para el usuario, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se agrega el encabezado de la página web antes del contenido principal.
            MAIN.insertAdjacentHTML('beforebegin', `
            <header>
                    <!-- Contenido de la barra de navegación -->
                    <nav class="navbar bg-body-tertiary fixed-top">
                        <div class="container-fluid">
                            <a class="navbar-brand" href="dashboard.html">SeguriPYME </a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#contentMenu"
                                aria-controls="contentMenu" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="offcanvas offcanvas-end" tabindex="-1" id="contentMenu"
                                aria-labelledby="offcanvasNavbarLabel">
                                <div class="offcanvas-header">
                                    <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu administrador</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                </div>
                                <div class="offcanvas-body">
                                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                                        <li class="nav-item">
                                            <a class="nav-link active" aria-current="page" href="dashboard.html">
                                                <button type="button" class="btn btn-outline-dark w-100">Inicio</button>
                                            </a>
                                        </li>   
                                        <li class="nav-item">
                                            <a class="nav-link active" aria-current="page" href="categoria.html">
                                                <button type="button" class="btn btn-outline-dark w-100">Categorías</button>
                                            </a>
                                        </li>  
                                        <li class="nav-item">
                                            <a class="nav-link active" aria-current="page" href="producto.html">
                                                <button type="button" class="btn btn-outline-dark w-100">Producto</button>
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link active" aria-current="page" href="administrador.html">
                                                <button type="button" class="btn btn-outline-dark w-100">Administradores</button>
                                            </a>
                                        </li>  
                                        <li class="nav-item">
                                            <a class="nav-link active" aria-current="page" href="bot.html">
                                                <button type="button" class="btn btn-outline-info w-100"> CHAT BOT</button>
                                            </a>
                                        </li>  
                                        <li class="nav-item">
                                            <a class="nav-link active" aria-current="page" href="dashboard.html">
                                                <button type="button" class="btn btn-outline-dark w-100">Inicio</button>
                                            </a>
                                        </li>   
                                        
                                        <li class="nav-item">
                                            <a class="nav-link active" aria-current="page">
                                                <button type="button" class="btn btn-danger w-100" onclick="logOut()">
                                                    Cerrar sesión
                                                </button>
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link active" aria-current="page" href="profile.html">
                                                <button type="button" class="btn btn-info w-100">
                                                    <i class="bi bi-person-circle"></i> Perfil
                                                </button>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            `);
            // Se agrega el pie de la página web después del contenido principal.
            MAIN.insertAdjacentHTML('afterend', `
        <footer>
            <nav class="navbar fixed-bottom bg-body-tertiary">
                <div class="container">
                    <div>
                        <h6>SeguriPYME </h6>
                        <p><i class="bi bi-c-square"></i> 2025 Todos los derechos reservados</p>
                    </div>
                    <div>
                        <h6>Contáctenos</h6>
                        <p><i class="bi bi-envelope"></i> example@gmail.com</p>
                    </div>
                </div>
            </nav>
        </footer>
            `);
        } else {
            sweetAlert(3, DATA.error, false, 'index.html');
        }
    } else {
        // Se comprueba si la página web es la principal, de lo contrario se direcciona a iniciar sesión.
        if (location.pathname.endsWith('index.html')) {
            // Se agrega el encabezado de la página web antes del contenido principal.
            MAIN.insertAdjacentHTML('beforebegin', `
                <header>
                    <nav class="navbar fixed-top bg-body-tertiary">
                        <div class="container">
                            <a class="navbar-brand" href="index.html">
                                <img src="../../resources/img/logo.png" alt="inventory" width="50">
                            </a>
                        </div>
                    </nav>
                </header>
            `);
            // Se agrega el pie de la página web después del contenido principal.
            MAIN.insertAdjacentHTML('afterend', `
                <footer>
                    <nav class="navbar fixed-bottom bg-body-tertiary">
                        <div class="container">
                            <div>
                                <h6>SeguriPYME </h6>
                                <p><i class="bi bi-c-square"></i> 2025 Todos los derechos reservados</p>
                            </div>
                            <div>
                                <h6>Contáctenos</h6>
                                <p><i class="bi bi-envelope"></i> example@gmail.com</p>
                            </div>
                        </div>
                    </nav>
                </footer>
                
            `);
        } else {
            location.href = 'index.html';
        }
    }
}