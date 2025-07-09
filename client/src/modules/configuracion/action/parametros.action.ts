"use client"

import apiClient from "@/lib/axios";
import { ConfiguracionRequest } from "@/models/configuracion";

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

// Actualizar configuración (sin archivo de logo por ahora)
export async function updateConfiguracionMultipart(values: ConfiguracionRequest) {
  try {
    const formData = new FormData();
    
    // Grupo 1: Configuración del Sistema y Empresa
    formData.append('nombreSistema', values.nombreSistema);
    formData.append('nombreCorreo', values.nombreCorreo);
    if (values.logo) {
      formData.append('logo', values.logo);
    }
    
    // Datos de la empresa
    if (values.ruc) formData.append('ruc', values.ruc);
    if (values.razonSocial) formData.append('razonSocial', values.razonSocial);
    if (values.direccion) formData.append('direccion', values.direccion);
    if (values.nombreComercial) formData.append('nombreComercial', values.nombreComercial);
    if (values.pais) formData.append('pais', values.pais);
    if (values.departamento) formData.append('departamento', values.departamento);
    if (values.provincia) formData.append('provincia', values.provincia);
    if (values.distrito) formData.append('distrito', values.distrito);
    
    // Grupo 2: Configuración de Correo
    if (values.correoSoporte) formData.append('correoSoporte', values.correoSoporte);
    if (values.hostCorreo) formData.append('hostCorreo', values.hostCorreo);
    if (values.passwordCorreo) formData.append('passwordCorreo', values.passwordCorreo);
    if (values.puertoCorreo) formData.append('puertoCorreo', values.puertoCorreo.toString());
    if (values.usuarioCorreo) formData.append('usuarioCorreo', values.usuarioCorreo);
    
    // Grupo 3: Conexiones SICI y APIs
    formData.append('conexionSici1', values.conexionSici1);
    formData.append('conexionSici2', values.conexionSici2);
    formData.append('clienteUrl', values.clienteUrl);
    if (values.apiReniecRuc) formData.append('apiReniecRuc', values.apiReniecRuc);
    
    // Configuración de base de datos PostgreSQL
    if (values.hostDb) formData.append('hostDb', values.hostDb);
    if (values.usuarioDb) formData.append('usuarioDb', values.usuarioDb);
    if (values.passwordDb) formData.append('passwordDb', values.passwordDb);
    if (values.baseDatos) formData.append('baseDatos', values.baseDatos);
    
    const response = await apiClient.put(`/configuracion/multipart`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return {
      success: true,
      data: response.data.data,
      message: response.data.message || 'Configuración actualizada exitosamente'
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Error al actualizar configuración',
      message: error.response?.data?.message || 'Error al actualizar configuración'
    };
  }
}

// Actualizar configuración (método original para compatibilidad)
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

// Subir logo (método separado para compatibilidad, pero se recomienda usar updateConfiguracionMultipart)
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
