import { privateApi } from '../../../config/api'

// Servicio para roles
export const rolesService = {
    // Obtener todos los roles
    async getAll(params = {}) {
        try {
            const response = await privateApi.get('/roles', { params })
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al obtener roles'
            }
        }
    },

    // Obtener rol por ID
    async getById(id) {
        try {
            const response = await privateApi.get(`/roles/${id}`)
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al obtener rol'
            }
        }
    },

    // Buscar roles
    async search(searchTerm, filters = {}) {
        try {
            const response = await privateApi.get('/roles/search', {
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

    // Exportar roles
    async export(format = 'excel', filters = {}) {
        try {
            const response = await privateApi.get('/roles/export', {
                params: { format, ...filters },
                responseType: 'blob'
            })
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al exportar roles'
            }
        }
    }
} 