import api from '../../../config/api'

// Servicio para funcionalidades demo
export const demoService = {
    // Obtener datos de prueba
    async getTestData() {
        try {
            const response = await api.get('/demo/test-data')
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al obtener datos de prueba'
            }
        }
    },

    // Simular datos para desarrollo
    async getMockData() {
        // Datos simulados para desarrollo
        const mockData = [
            { id: 1, name: 'Ficha Demo 1', type: 'Catastral', status: 'Activa' },
            { id: 2, name: 'Ficha Demo 2', type: 'Urbana', status: 'Pendiente' },
            { id: 3, name: 'Ficha Demo 3', type: 'Rural', status: 'Activa' }
        ]

        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1000))

        return { success: true, data: mockData }
    },

    // Probar conexión con API
    async testConnection() {
        try {
            const response = await api.get('/health')
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error de conexión con la API'
            }
        }
    },

    // Enviar datos de prueba
    async sendTestData(data) {
        try {
            const response = await api.post('/demo/test', data)
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al enviar datos de prueba'
            }
        }
    }
} 