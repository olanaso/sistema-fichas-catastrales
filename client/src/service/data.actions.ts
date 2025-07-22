import apiClient from "@/lib/axios";

//obtener datos paginados de cualquier tabla
export async function getDataPaginada(page: number = 0, size: number = 10, tabla: string, valorBusqueda?: string, columnas?: string[]) {
    try {
        // Convertir page a offset (page * size)
        const offset = page * size;
        const response = await apiClient.get(`/tipos/obtener-paginado?tabla=${tabla}&limit=${size}&offset=${offset}&valorBusqueda=${valorBusqueda}&columnas=${columnas}`);
        console.log(response.data);
        // El backend devuelve un string JSON, necesitamos parsearlo
        const responseData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

        return {
            success: true,
            data: {
                data: responseData.data || [], // Array de datos
                total: responseData.total || 0, // Total de elementos
                page: page, // Página actual
                size: size, // Elementos por página
                totalPages: Math.ceil((responseData.total || 0) / size) // Total de páginas
            },
            message: `${tabla} obtenidos exitosamente`
        };
    } catch (error: any) {
        console.error(`Error en getDataPaginada para tabla ${tabla}:`, error);
        return {
            success: false,
            error: error.message || `Error al obtener ${tabla}`,
            message: error.response?.data?.message || `Error al obtener ${tabla}`,
            data: {
                data: [],
                total: 0,
                page: page,
                size: size,
                totalPages: 0
            }
        };
    }
}

//obtener datos de cualquier tabla sin paginacion
export async function getData(tabla: string) {
    try {
        const response = await apiClient.get(`/tipos/obtener?tabla=${tabla}`);

        // El backend devuelve un string JSON, necesitamos parsearlo
        const responseData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

        return {
            success: true,
            data: responseData,
            total: responseData.length,
            message: `${tabla} obtenidos exitosamente`
        };
    } catch (error: any) {
        console.error(`Error en getData para tabla ${tabla}:`, error);
        return {
            success: false,
            error: error.message || `Error al obtener ${tabla}`,
            message: error.response?.data?.message || `Error al obtener ${tabla}`,
            data: [],
            total: 0
        };
    }
}

//buscar datos exactos en columnas específicas de una tabla
export async function buscarExacto(tabla: string, columnas: string[], valores: string[]) {
    try {
        // Construir los parámetros de consulta para las listas
        const columnasParam = columnas.map(col => `columnas=${encodeURIComponent(col)}`).join('&');
        const valoresParam = valores.map(val => `valores=${encodeURIComponent(val)}`).join('&');
        
        const response = await apiClient.get(`/tipos/buscar-exacto?tabla=${tabla}&${columnasParam}&${valoresParam}`);

        // El backend devuelve un string JSON, necesitamos parsearlo
        const responseData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

        return {
            success: true,
            data: responseData,
            total: Array.isArray(responseData) ? responseData.length : 0,
            message: `Búsqueda exacta en ${tabla} realizada exitosamente`
        };
    } catch (error: any) {
        console.error(`Error en buscarExacto para tabla ${tabla}:`, error);
        return {
            success: false,
            error: error.message || `Error al buscar en ${tabla}`,
            message: error.response?.data?.message || `Error al buscar en ${tabla}`,
            data: [],
            total: 0
        };
    }
}

//buscar datos por coincidencia en múltiples columnas de una tabla
export async function buscarCoincidencia(tabla: string, columnas: string[], termino: string) {
    try {
        // Construir los parámetros de consulta para las columnas
        const columnasParam = columnas.map(col => `columnas=${encodeURIComponent(col)}`).join('&');
        
        const response = await apiClient.get(`/tipos/buscar-coincidencia?tabla=${tabla}&${columnasParam}&termino=${encodeURIComponent(termino)}`);

        // El backend devuelve un string JSON, necesitamos parsearlo
        const responseData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

        return {
            success: true,
            data: responseData,
            total: Array.isArray(responseData) ? responseData.length : 0,
            message: `Búsqueda por coincidencia en ${tabla} realizada exitosamente`
        };
    } catch (error: any) {
        console.error(`Error en buscarCoincidencia para tabla ${tabla}:`, error);
        return {
            success: false,
            error: error.message || `Error al buscar en ${tabla}`,
            message: error.response?.data?.message || `Error al buscar en ${tabla}`,
            data: [],
            total: 0
        };
    }
}
