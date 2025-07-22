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

// Función para obtener datos de cualquier tabla (mantiene compatibilidad)
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

