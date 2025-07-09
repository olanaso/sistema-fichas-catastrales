"use client"

import apiClient from "@/lib/axios";
import { UsuarioFormValues } from "../schema/usuario.schema";

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

// Crear un nuevo usuario
export async function createUsuario(values: UsuarioFormValues) {
  try {
    const response = await apiClient.post(`/usuarios/register`, values);
    return {
      success: true,
      data: response.data,
      message: 'Usuario creado exitosamente'
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Error al crear usuario',
      message: error.response?.data?.message || 'Error al crear usuario'
    };
  }
}

// Obtener todos los usuarios
export async function getUsuarios() {
  try {
    const response = await apiClient.get(`/usuarios`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Error al obtener usuario',
      message: error.response?.data?.message || 'Error al obtener usuario'
    };
  }
}

// Obtener usuario por ID
// export async function getUsuarioById(id: number) {
//   try {
//     const response = await UsuarioService.getUsuarioById(id);
//     return {
//       success: true,
//       data: response
//     };
//   } catch (error: any) {
//     return {
//       success: false,
//       error: error.message || 'Error al obtener usuario'
//     };
//   }
// }

// Cambiar estado del usuario (activo/inactivo)
export async function toggleUsuarioStatus(id: number, activo: boolean) {
  try {
    const response = await apiClient.patch(`/usuarios/${id}/toggle-activo`);
    return {
      success: true,
      data: response.data,
      message: `Usuario ${activo ? 'activado' : 'desactivado'} exitosamente`
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Error al cambiar estado del usuario',
      message: error.response?.data?.message || 'Error al cambiar estado del usuario'
    };
  }
}

// Cambiar contraseña del usuario
export async function changePassword(id: number, password: string) {
  try {
    const response = await apiClient.patch(`/usuarios/${id}/change-password`, { 
      newPassword: password,
      confirmPassword: password
    });
    return {
      success: true,
      data: response.data,
      message: 'Contraseña cambiada exitosamente'
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Error al cambiar contraseña',
      message: error.response?.data?.message || 'Error al cambiar contraseña'
    };
  }
}

// Cambiar mi contraseña (usuario actual)
export async function changeMyPassword(currentPassword: string, newPassword: string, confirmPassword: string) {
  try {
    const response = await apiClient.patch(`/usuarios/change-my-password`, {
      currentPassword,
      newPassword,
      confirmPassword
    });
    return {
      success: true,
      data: response.data,
      message: 'Contraseña cambiada exitosamente'
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Error al cambiar contraseña',
      message: error.response?.data?.message || 'Error al cambiar contraseña'
    };
  }
}

// Actualizar usuario
export async function updateUsuario(id: number, values: any) {
  try {
    const response = await apiClient.put(`/usuarios/${id}`, values);
    return {
      success: true,
      data: response.data,
      message: 'Usuario actualizado exitosamente'
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Error al actualizar usuario',
      message: error.response?.data?.message || 'Error al actualizar usuario'
    };
  }
}

// // Buscar usuarios
// export async function searchUsuarios(term: string, page: number = 0, size: number = 10) {
//   try {
//     const response = await UsuarioService.searchUsuarios(term, page, size);
//     return {
//       success: true,
//       data: response
//     };
//   } catch (error: any) {
//     return {
//       success: false,
//       error: error.message || 'Error al buscar usuarios',
//       data: { content: [], totalElements: 0, totalPages: 0, currentPage: 0, size: 0 }
//     };
//   }
// }

// // Obtener usuarios por rol
// export async function getUsuariosByRol(rolCodigo: string, page: number = 0, size: number = 10) {
//   try {
//     const response = await UsuarioService.getUsuariosByRol(rolCodigo, page, size);
//     return {
//       success: true,
//       data: response
//     };
//   } catch (error: any) {
//     return {
//       success: false,
//       error: error.message || 'Error al obtener usuarios por rol',
//       data: { content: [], totalElements: 0, totalPages: 0, currentPage: 0, size: 0 }
//     };
//   }
// }