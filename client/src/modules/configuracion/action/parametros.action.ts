"use client";

import apiClient from "@/lib/axios";
import { ConfiguracionRequest } from "@/models/configuracion";

// Obtener configuración
export async function getConfiguracion() {
  try {
    const response = await apiClient.get(`/configuracion`);
    return {
      success: true,
      data: response.data.data,
      message: "Configuración obtenida exitosamente",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Error al obtener configuración",
      message:
        error.response?.data?.message || "Error al obtener configuración",
    };
  }
}

export async function getConfiguracionPublica() {
  try {
    const response = await apiClient.get(`/configuracion/public`);
    return {
      success: true,
      data: response.data.data,
      message: "Configuración obtenida exitosamente",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Error al obtener configuración",
      message:
        error.response?.data?.message || "Error al obtener configuración",
    };
  }
}
