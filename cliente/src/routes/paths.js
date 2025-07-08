// Definición de rutas del sistema catastral
export const Paths = {
    // Ruta principal
    inicio: '/inicio',

    // Rutas de fichas catastrales
    fichasList: '/fichas/lista',
    fichasCreate: '/fichas/crear',

    // Rutas de usuarios
    usuariosList: '/usuarios/lista',
    usuariosCreate: '/usuarios/crear',

    // Rutas de reportes
    reportesDashboard: '/reportes/dashboard',

    // Rutas de configuración
    configSistema: '/configuracion/sistema',

    // Rutas de autenticación
    login: '/login',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password'
}

// Función para obtener el ícono asociado a una ruta
export const getRouteIcon = (pathname) => {
    const routeIcons = {
        '/inicio': 'fas fa-home',
        '/fichas/lista': 'fas fa-file-alt',
        '/fichas/crear': 'fas fa-plus',
        '/usuarios/lista': 'fas fa-users',
        '/usuarios/crear': 'fas fa-user-plus',
        '/reportes/dashboard': 'fas fa-chart-bar',
        '/configuracion/sistema': 'fas fa-cogs',
        '/login': 'fas fa-sign-in-alt',
        '/forgot-password': 'fas fa-key',
        '/reset-password': 'fas fa-unlock'
    }

    return routeIcons[pathname] || 'fas fa-file'
} 