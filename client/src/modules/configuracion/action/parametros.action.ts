"use client"

import apiClient from "@/lib/axios";
import { ConfiguracionDto, ConfiguracionRequest } from "@/models/configuracion";

// Obtener configuración
export async function getConfiguracion() {
  try {
    const response = await apiClient.get(`/configuracion`);
    return {
      success: true,
      data: response.data.data,
      message: 'Configuración obtenida exitosamente'
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Error al obtener configuración',
      message: error.response?.data?.message || 'Error al obtener configuración'
    };
  }
}

export async function getConfiguracionPublica() {
    try {
      const response = await apiClient.get(`/configuracion/public`);
      return {
        success: true,
        data: response.data.data,
        message: 'Configuración obtenida exitosamente'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Error al obtener configuración',
        message: error.response?.data?.message || 'Error al obtener configuración'
      };
    }
  }

// Actualizar configuración
export async function updateConfiguracion(values: ConfiguracionRequest) {
  try {
    const response = await apiClient.put(`/configuracion`, values);
    return {
      success: true,
      data: response.data.data,
      message: 'Configuración actualizada exitosamente'
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Error al actualizar configuración',
      message: error.response?.data?.message || 'Error al actualizar configuración'
    };
  }
}

// Subir logo
export async function uploadLogo(file: File) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiClient.post(`/configuracion/upload-logo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return {
      success: true,
      data: response.data,
      message: 'Logo subido exitosamente'
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Error al subir logo',
      message: error.response?.data?.message || 'Error al subir logo'
    };
  }
}
