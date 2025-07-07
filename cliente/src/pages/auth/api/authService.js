import api from '../../../config/api'

// Servicio de autenticación
export const authService = {
    // Iniciar sesión
    async login(credentials) {
        try {
            const response = await api.post('/auth/login', credentials)
            const { token, user } = response.data

            // Guardar token en localStorage
            localStorage.setItem('authToken', token)
            localStorage.setItem('user', JSON.stringify(user))

            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error en el login'
            }
        }
    },

    // Registrar usuario
    async register(userData) {
        try {
            const response = await api.post('/auth/register', userData)
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error en el registro'
            }
        }
    },

    // Cerrar sesión
    async logout() {
        try {
            await api.post('/auth/logout')
            localStorage.removeItem('authToken')
            localStorage.removeItem('user')
            return { success: true }
        } catch (error) {
            // Aunque falle la petición, limpiamos el localStorage
            localStorage.removeItem('authToken')
            localStorage.removeItem('user')
            return { success: true }
        }
    },

    // Obtener usuario actual
    getCurrentUser() {
        const user = localStorage.getItem('user')
        return user ? JSON.parse(user) : null
    },

    // Verificar si está autenticado
    isAuthenticated() {
        return !!localStorage.getItem('authToken')
    },

    // Refrescar token
    async refreshToken() {
        try {
            const response = await api.post('/auth/refresh')
            const { token } = response.data
            localStorage.setItem('authToken', token)
            return { success: true, token }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al refrescar token'
            }
        }
    },

    // Validar token
    async validateToken() {
        try {
            const response = await api.get('/auth/validate')
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Token no válido'
            }
        }
    },

    // Solicitar reset de contraseña
    async requestPasswordReset(email) {
        try {
            const response = await api.post('/auth/request-password-reset', { email })
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al solicitar reset de contraseña'
            }
        }
    },

    // Reset de contraseña
    async resetPassword(token, newPassword) {
        try {
            const response = await api.post('/auth/reset-password', { token, newPassword })
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al resetear contraseña'
            }
        }
    }
} 