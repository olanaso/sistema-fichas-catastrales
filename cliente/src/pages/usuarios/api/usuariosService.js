import api from '../../../config/api'

// Servicio para gestión de usuarios
export const usuariosService = {
    // Obtener todos los usuarios
    async getAll(params = {}) {
        try {
            const response = await api.get('/usuarios', { params })
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al obtener usuarios'
            }
        }
    },

    // Obtener usuario por ID
    async getById(id) {
        try {
            const response = await api.get(`/usuarios/${id}`)
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al obtener usuario'
            }
        }
    },

    // Crear nuevo usuario
    async create(userData) {
        try {
            const response = await api.post('/usuarios', userData)
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al crear usuario'
            }
        }
    },

    // Actualizar usuario
    async update(id, userData) {
        try {
            const response = await api.put(`/usuarios/${id}`, userData)
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al actualizar usuario'
            }
        }
    },

    // Eliminar usuario
    async delete(id) {
        try {
            await api.delete(`/usuarios/${id}`)
            return { success: true }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al eliminar usuario'
            }
        }
    },

    // Búsqueda de usuarios
    async search(searchTerm, filters = {}) {
        try {
            const response = await api.get('/usuarios/search', {
                params: { q: searchTerm, ...filters }
            })
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error en la búsqueda de usuarios'
            }
        }
    },

    // Cambiar contraseña
    async changePassword(id, passwordData) {
        try {
            const response = await api.put(`/usuarios/${id}/password`, passwordData)
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al cambiar contraseña'
            }
        }
    },

    // Activar/desactivar usuario
    async toggleStatus(id) {
        try {
            const response = await api.put(`/usuarios/${id}/toggle-status`)
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al cambiar estado del usuario'
            }
        }
    },

    // Obtener roles disponibles
    async getRoles() {
        try {
            const response = await api.get('/usuarios/roles')
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al obtener roles'
            }
        }
    },

    // Asignar rol a usuario
    async assignRole(userId, roleId) {
        try {
            const response = await api.post(`/usuarios/${userId}/roles`, { roleId })
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al asignar rol'
            }
        }
    },

    // Remover rol de usuario
    async removeRole(userId, roleId) {
        try {
            await api.delete(`/usuarios/${userId}/roles/${roleId}`)
            return { success: true }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al remover rol'
            }
        }
    },

    // Obtener permisos de usuario
    async getPermissions(userId) {
        try {
            const response = await api.get(`/usuarios/${userId}/permissions`)
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al obtener permisos'
            }
        }
    }
} 