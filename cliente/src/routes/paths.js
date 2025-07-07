// Definición de rutas del sistema catastral
export const Paths = {
    // Rutas principales
    inicio: '/inicio',
    dashboard: '/inicio', // Alias para compatibilidad

    // Rutas de fichas catastrales
    fichas: '/fichas',
    fichasList: '/fichas/lista',
    fichasCreate: '/fichas/crear',
    fichasSearch: '/fichas/buscar',
    fichasEdit: '/fichas/editar/:id',
    fichasView: '/fichas/ver/:id',

    // Rutas de usuarios
    usuarios: '/usuarios',
    usuariosList: '/usuarios/lista',
    usuariosCreate: '/usuarios/crear',
    usuariosRoles: '/usuarios/roles',
    usuariosEdit: '/usuarios/editar/:id',
    usuariosView: '/usuarios/ver/:id',

    // Rutas de reportes
    reportes: '/reportes',
    reportesDashboard: '/reportes/dashboard',
    reportesFichas: '/reportes/fichas',
    reportesActividad: '/reportes/actividad',

    // Rutas de configuración
    configuracion: '/configuracion',
    configSistema: '/configuracion/sistema',
    configBackup: '/configuracion/backup',
    configLogs: '/configuracion/logs',

    // Rutas de autenticación
    login: '/login',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',

    // Rutas de emergencia y contacto
    emergencia: '/emergencia',
    contacto: '/contacto',
    calendar: '/config/events/calendar',
}

// Función para formatear rutas con parámetros
export const formatPath = (path, params = {}) => {
    let formattedPath = path

    // Reemplazar parámetros en la ruta
    Object.keys(params).forEach(key => {
        formattedPath = formattedPath.replace(`:${key}`, params[key])
    })

    return formattedPath
}

// Función para obtener el breadcrumb de una ruta
export const getBreadcrumb = (pathname) => {
    const breadcrumbs = {
        // Principales
        '/inicio': 'Inicio',
        '/dashboard': 'Inicio',

        // Fichas Catastrales
        '/fichas': 'Fichas Catastrales',
        '/fichas/lista': 'Lista de Fichas',
        '/fichas/crear': 'Crear Ficha',
        '/fichas/buscar': 'Buscar Fichas',
        '/fichas/editar': 'Editar Ficha',
        '/fichas/ver': 'Ver Ficha',

        // Usuarios
        '/usuarios': 'Usuarios',
        '/usuarios/lista': 'Lista de Usuarios',
        '/usuarios/crear': 'Crear Usuario',
        '/usuarios/roles': 'Gestión de Roles',
        '/usuarios/editar': 'Editar Usuario',
        '/usuarios/ver': 'Ver Usuario',

        // Reportes
        '/reportes': 'Reportes',
        '/reportes/dashboard': 'Dashboard de Reportes',
        '/reportes/fichas': 'Reporte de Fichas',
        '/reportes/actividad': 'Actividad del Sistema',

        // Configuración
        '/configuracion': 'Configuración',
        '/configuracion/sistema': 'Configuración del Sistema',
        '/configuracion/backup': 'Respaldos',
        '/configuracion/logs': 'Logs del Sistema',

        // Autenticación
        '/login': 'Iniciar Sesión',
        '/forgot-password': 'Recuperar Contraseña',
        '/reset-password': 'Nueva Contraseña',

        // Otros
        '/emergencia': 'Emergencia',
        '/contacto': 'Contacto',
        '/config/events/calendar': 'Calendario',
    }

    return breadcrumbs[pathname] || 'Página'
}

// Función para verificar si una ruta requiere autenticación
export const requiresAuth = (pathname) => {
    const publicRoutes = ['/login', '/forgot-password', '/reset-password']
    return !publicRoutes.includes(pathname)
}

// Función para obtener el ícono asociado a una ruta
export const getRouteIcon = (pathname) => {
    const routeIcons = {
        '/inicio': 'fas fa-home',
        '/fichas': 'fas fa-file-alt',
        '/usuarios': 'fas fa-users',
        '/reportes': 'fas fa-chart-bar',
        '/configuracion': 'fas fa-cogs',
        '/emergencia': 'fas fa-exclamation-triangle',
        '/contacto': 'fas fa-envelope',
        '/login': 'fas fa-sign-in-alt',
    }

    return routeIcons[pathname] || 'fas fa-file'
} 