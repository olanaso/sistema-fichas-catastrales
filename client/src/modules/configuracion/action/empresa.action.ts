"use client"

import apiClient from "@/lib/axios";
import { EmpresaFormValues } from "../schema/empresa.schema";

// Actualizar información de empresa
export async function updateEmpresa(values: EmpresaFormValues) {
  try {
    const response = await apiClient.post(`/configuracion/actualizar`, values);
    return {
      success: true,
      data: response.data.data,
      message: response.data.message || 'Información de empresa actualizada exitosamente'
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Error al actualizar información de empresa',
      message: error.response?.data?.message || 'Error al actualizar información de empresa'
    };
  }
} 