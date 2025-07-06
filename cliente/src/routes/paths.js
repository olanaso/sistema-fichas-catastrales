// Definición de rutas del sistema
export const Paths = {
    dashboard: '/dashboard',
    emergencia: '/emergencia',
    config: '/config',
    contacto: '/contacto',
    usuarios: '/usuarios',
    calendar: '/config/events/calendar',
    // Agregar más rutas según sea necesario
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
        '/dashboard': 'Dashboard',
        '/emergencia': 'Emergencia',
        '/config': 'Configuración',
        '/contacto': 'Contactos',
        '/usuarios': 'Usuarios',
        '/config/events/calendar': 'Eventos - Calendario',
    }

    return breadcrumbs[pathname] || 'Página'
} 