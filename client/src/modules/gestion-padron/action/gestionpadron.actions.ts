import apiClient from "@/lib/axios";

// Función para obtener datos de cualquier tabla
export async function getPadronClientes(page: number = 0, size: number = 10) {
  try {
    // Convertir page a offset (page * size)
    const offset = page * size;
    const response = await apiClient.get(`/tipos/obtener-paginado?tabla=clientes&limit=${size}&offset=${offset}`);
    
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
      message: 'Grupos de trabajo obtenidos exitosamente'
    };
  } catch (error: any) {
    console.error('Error en getGruposTrabajoPaginados:', error);
    return {
      success: false,
      error: error.message || 'Error al obtener grupos de trabajo',
      message: error.response?.data?.message || 'Error al obtener grupos de trabajo',
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