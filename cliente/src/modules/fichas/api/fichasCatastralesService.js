import { privateApi } from '../../../config/api'

// Servicio para fichas catastrales
export const fichasCatastralesService = {
    // Obtener todas las fichas catastrales
    async getAll(params = {}) {
        try {
            const response = await privateApi.get('/fichas-catastrales', { params })
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al obtener fichas catastrales'
            }
        }
    },

    // Obtener ficha catastral por ID
    async getById(id) {
        try {
            const response = await privateApi.get(`/fichas-catastrales/${id}`)
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al obtener ficha catastral'
            }
        }
    },

    // Crear nueva ficha catastral
    async create(fichaData) {
        try {
            const response = await privateApi.post('/fichas-catastrales', fichaData)
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al crear ficha catastral'
            }
        }
    },

    // Actualizar ficha catastral
    async update(id, fichaData) {
        try {
            const response = await privateApi.put(`/fichas-catastrales/${id}`, fichaData)
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al actualizar ficha catastral'
            }
        }
    },

    // Eliminar ficha catastral
    async delete(id) {
        try {
            await privateApi.delete(`/fichas-catastrales/${id}`)
            return { success: true }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al eliminar ficha catastral'
            }
        }
    },

    // Buscar fichas catastrales
    async search(searchTerm, filters = {}) {
        try {
            const response = await privateApi.get('/fichas-catastrales/search', {
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

    // Obtener fichas por coordenadas (geolocalización)
    async getByCoordinates(lat, lng, radius = 1000) {
        try {
            const response = await privateApi.get('/fichas-catastrales/geo', {
                params: { lat, lng, radius }
            })
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al obtener fichas por ubicación'
            }
        }
    },

    // Obtener fichas por polígono
    async getByPolygon(polygon) {
        try {
            const response = await privateApi.post('/fichas-catastrales/polygon', { polygon })
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al obtener fichas por polígono'
            }
        }
    },

    // Subir archivo geoespacial
    async uploadGeoFile(file, metadata = {}) {
        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('metadata', JSON.stringify(metadata))

            const response = await privateApi.post('/fichas-catastrales/upload-geo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al subir archivo geoespacial'
            }
        }
    },

    // Procesar archivo Shapefile
    async processShapefile(fileData) {
        try {
            const response = await privateApi.post('/fichas-catastrales/process-shapefile', fileData)
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al procesar archivo Shapefile'
            }
        }
    },

    // Obtener estadísticas de fichas
    async getStatistics() {
        try {
            const response = await privateApi.get('/fichas-catastrales/statistics')
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al obtener estadísticas'
            }
        }
    },

    // Exportar fichas a diferentes formatos
    async export(format = 'excel', filters = {}) {
        try {
            const response = await privateApi.get('/fichas-catastrales/export', {
                params: { format, ...filters },
                responseType: 'blob'
            })
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al exportar fichas'
            }
        }
    },

    // Validar datos de ficha
    async validateFicha(fichaData) {
        try {
            const response = await privateApi.post('/fichas-catastrales/validate', fichaData)
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error en la validación'
            }
        }
    },

    // Obtener historial de cambios
    async getHistory(fichaId) {
        try {
            const response = await privateApi.get(`/fichas-catastrales/${fichaId}/history`)
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al obtener historial'
            }
        }
    }
} 