import { privateApi } from '../../../config/api'

// Servicio para usuarios
export const usuariosService = {
    // Obtener todos los usuarios
    async getAll(params = {}) {
        try {
            const response = await privateApi.get('/usuarios', { params })
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
            const response = await privateApi.get(`/usuarios/${id}`)
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al obtener usuario'
            }
        }
    },

    // Registrar nuevo usuario
    async create(userData) {
        try {
            const response = await privateApi.post('/usuarios/register', userData)
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al registrar usuario'
            }
        }
    },

    // Actualizar usuario
    async update(id, userData) {
        try {
            const response = await privateApi.put(`/usuarios/${id}`, userData)
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al actualizar usuario'
            }
        }
    },

    // Activar/Desactivar usuario
    async toggleActivo(id) {
        try {
            const response = await privateApi.patch(`/usuarios/${id}/toggle-activo`)
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al cambiar estado del usuario'
            }
        }
    },

    // Cambiar contraseña de usuario
    async changePassword(id, passwordData) {
        try {
            const response = await privateApi.patch(`/usuarios/${id}/change-password`, passwordData)
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al cambiar contraseña'
            }
        }
    },

    // Filtrar usuarios
    async filter(filters = {}) {
        try {
            const response = await privateApi.get('/usuarios/filter', { params: filters })
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al filtrar usuarios'
            }
        }
    },

    // Buscar usuarios
    async search(searchTerm, filters = {}) {
        try {
            const response = await privateApi.get('/usuarios/search', {
                params: { q: searchTerm, ...filters }
            })
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error en la búsqueda'
            }
        }
    },

    // Exportar usuarios
    async export(format = 'excel', filters = {}) {
        try {
            const response = await privateApi.get('/usuarios/export', {
                params: { format, ...filters },
                responseType: 'blob'
            })
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al exportar usuarios'
            }
        }
    },

    // Validar datos de usuario
    async validate(userData) {
        try {
            const response = await privateApi.post('/usuarios/validate', userData)
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error en la validación'
            }
        }
    }
} 