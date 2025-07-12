import apiClient from "@/lib/axios";
import { CreateInspectorFormValues, UpdateInspectorFormValues } from "../schema/inspector.schema";

// Función para crear o actualizar inspector (upsert)
export const upsertInspector = async (data: CreateInspectorFormValues | UpdateInspectorFormValues) => {
  try {
    const response = await apiClient.post("/inspectores/upsert", data);
    
    if (response.data.success) {
      return {
        success: true,
        message: response.data.message || "Inspector guardado exitosamente",
        data: response.data.data,
      };
    } else {
      return {
        success: false,
        message: response.data.message || "Error al guardar inspector",
      };
    }
  } catch (error: any) {
    console.error("Error upserting inspector:", error);
    
    if (error.response?.data?.message) {
      return {
        success: false,
        message: error.response.data.message,
      };
    }
    
    return {
      success: false,
      message: "Error inesperado al guardar inspector",
    };
  }
};

// Función específica para crear inspector
export const createInspector = async (data: CreateInspectorFormValues) => {
  return await upsertInspector(data);
};

// Función específica para actualizar inspector
export const updateInspector = async (data: UpdateInspectorFormValues) => {
  return await upsertInspector(data);
}; 