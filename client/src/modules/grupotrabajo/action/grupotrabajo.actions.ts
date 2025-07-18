import apiClient from "@/lib/axios";
import { CreateGrupoTrabajoFormValues, UpdateGrupoTrabajoFormValues } from "../schema/grupotrabajo.schema";

// Función para crear o actualizar grupo de trabajo (upsert)
export const upsertGrupoTrabajo = async (data: CreateGrupoTrabajoFormValues | UpdateGrupoTrabajoFormValues) => {
  try {
    const response = await apiClient.post("/grupo-trabajo/upsert", data);
    
    if (response.data.success) {
      return {
        success: true,
        message: response.data.message || "Grupo de trabajo guardado exitosamente",
        data: response.data.data,
      };
    } else {
      return {
        success: false,
        message: response.data.message || "Error al guardar grupo de trabajo",
      };
    }
  } catch (error: any) {
    console.error("Error upserting grupo de trabajo:", error);
    
    if (error.response?.data?.message) {
      return {
        success: false,
        message: error.response.data.message,
      };
    }
    
    return {
      success: false,
      message: "Error inesperado al guardar grupo de trabajo",
    };
  }
};

// Función específica para crear grupo de trabajo
export const createGrupoTrabajo = async (data: CreateGrupoTrabajoFormValues) => {
  return await upsertGrupoTrabajo(data);
};

// Función específica para actualizar grupo de trabajo
export const updateGrupoTrabajo = async (data: UpdateGrupoTrabajoFormValues) => {
  return await upsertGrupoTrabajo(data);
};

// Función para obtener datos de cualquier tabla
export async function getDataTable(tabla: string) {
  try {
    const response = await apiClient.get(`/tipos/obtener-paginado?tabla=${tabla}&limit=1000&offset=0`);
    
    // El backend devuelve un string JSON, necesitamos parsearlo
    const responseData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
    
    return responseData.data || [];
  } catch (error: any) {
    console.error(`Error en getDataTable para tabla ${tabla}:`, error);
    return [];
  }
}

// Función para obtener datos paginados de grupos de trabajo
export async function getGruposTrabajoPaginados(page: number = 0, size: number = 10) {
  try {
    // Convertir page a offset (page * size)
    const offset = page * size;
    const response = await apiClient.get(`/grupo-trabajo/grupos-inspectores?limit=${size}&offset=${offset}`);
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

