"use client"

import apiClient from "@/lib/axios";
import { SistemasFormValues } from "../schema/sistemas.schema";

// Actualizar conexiones a sistemas
export async function updateSistemas(values: SistemasFormValues) {
  try {
    const response = await apiClient.post(`/configuracion/actualizar`, values);
    return {
      success: true,
      data: response.data.data,
      message: response.data.message || 'Conexiones a sistemas actualizadas exitosamente'
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Error al actualizar conexiones a sistemas',
      message: error.response?.data?.message || 'Error al actualizar conexiones a sistemas'
    };
  }
} 