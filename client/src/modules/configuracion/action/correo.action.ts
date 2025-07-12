"use client"

import apiClient from "@/lib/axios";
import { CorreoFormValues } from "../schema/correo.schema";

// Actualizar configuración de correo
export async function updateCorreo(values: CorreoFormValues) {
  try {
    const response = await apiClient.post(`/configuracion/actualizar`, values);
    return {
      success: true,
      data: response.data.data,
      message: response.data.message || 'Configuración de correo actualizada exitosamente'
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Error al actualizar configuración de correo',
      message: error.response?.data?.message || 'Error al actualizar configuración de correo'
    };
  }
} 