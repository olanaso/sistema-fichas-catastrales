"use client"

import apiClient from "@/lib/axios";
import { 
  CreateUsuarioFormValues, 
  UpdateUsuarioFormValues, 
  ChangePasswordFormValues,
  ToggleStatusFormValues 
} from "../schema/usuario.schema";


// Obtener todos los roles
export async function getRoles() {
  try {
    const response = await apiClient.get(`/roles`);
    return {
      success: true,
      data: response.data,
      message: 'Roles obtenidos exitosamente'
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Error al obtener roles',
      data: []
    };
  }
}

// Crear o actualizar usuario (upsert)
export async function upsertUsuario(values: CreateUsuarioFormValues | UpdateUsuarioFormValues) {
  try {
    const response = await apiClient.post(`/usuarios/upsert`, values);
    return {
      success: true,
      data: response.data,
      message: 'Usuario guardado exitosamente'
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Error al crear usuario',
      message: error.response?.data?.message || 'Error al crear usuario'
    };
  }
}

//obtener datos paginados de cualquier tabla
export async function getDataPaginada(page: number = 0, size: number = 10, tabla: string) {
  try {
    // Convertir page a offset (page * size)
    const offset = page * size;
    const response = await apiClient.get(`/tipos/obtener-paginado?tabla=${tabla}&limit=${size}&offset=${offset}`);
    
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
      message: `${tabla} obtenidos exitosamente`
    };
  } catch (error: any) {
    console.error(`Error en getDataPaginada para tabla ${tabla}:`, error);
    return {
      success: false,
      error: error.message || `Error al obtener ${tabla}`,
      message: error.response?.data?.message || `Error al obtener ${tabla}`,
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

// Función específica para supervisores y administradores (mantiene compatibilidad)
export async function getSupervisoresYAdministradores(page: number = 0, size: number = 10, tabla: string) {
  return getDataPaginada(page, size, tabla);
}

// Mantener compatibilidad con funciones anteriores
export async function createUsuario(values: CreateUsuarioFormValues) {
  return upsertUsuario(values);
}

export async function updateUsuario(values: UpdateUsuarioFormValues) {
  return upsertUsuario(values);
}

export async function changePassword(values: ChangePasswordFormValues) {
  return upsertUsuario(values);
}

