import apiClient from "@/lib/axios";

//obtener datos paginados de cualquier tabla
export async function getDataPaginada(page: number = 0, size: number = 10, tabla: string) {
    try {
        // Convertir page a offset (page * size)
        const offset = page * size;
        const response = await apiClient.get(`/tipos/obtener-paginado?tabla=${tabla}&limit=${size}&offset=${offset}`);

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
            data: {
                data: responseData.data || [], // Array de datos
                total: responseData.total || 0, // Total de elementos
            },
            message: `${tabla} obtenidos exitosamente`
        };
    } catch (error: any) {
        console.error(`Error en getData para tabla ${tabla}:`, error);
        return {
            success: false,
            error: error.message || `Error al obtener ${tabla}`,
            message: error.response?.data?.message || `Error al obtener ${tabla}`,
            data: {
                data: [],
                total: 0,
            }
        };
    }
}
