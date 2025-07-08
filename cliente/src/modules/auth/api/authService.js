import { publicApi, privateApi } from '../../../config/api'

// Servicio de autenticación
export const authService = {
    // Iniciar sesión (usa API pública)
    async login(credentials) {
        try {
            const response = await publicApi.post('/auth/login', {
                email: credentials.email,
                password: credentials.password
            })

            const { success, data } = response.data

            if (success && data) {
                // Guardar tokens y usuario en localStorage
                localStorage.setItem('accessToken', data.accessToken)
                localStorage.setItem('refreshToken', data.refreshToken)
                localStorage.setItem('user', JSON.stringify(data.user))

                return { success: true, data: data }
            }

            return { success: false, error: 'Respuesta inválida del servidor' }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error en el login'
            }
        }
    },

    // Registrar usuario (usa API pública)
    async register(userData) {
        try {
            const response = await publicApi.post('/auth/register', userData)
            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error en el registro'
            }
        }
    },

    // Solicitar reset de contraseña (usa API pública)
    async forgotPassword(email) {
        try {
            const response = await publicApi.post('/auth/forgot-password', email)

            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al enviar solicitud de reset'
            }
        }
    },

    // Reset de contraseña (usa API pública)
    async resetPassword(resetData) {
        try {
            const response = await publicApi.post('/auth/reset-password', {
                token: resetData.token,
                newPassword: resetData.password,
                confirmPassword: resetData.password
            })

            return { success: true, data: response.data }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al resetear contraseña'
            }
        }
    },

    // Cerrar sesión (usa API privada)
    async logout() {
        try {
            // Intentar cerrar sesión en el servidor
            await privateApi.post('/auth/logout')
        } catch (error) {
            console.warn('Error al cerrar sesión en servidor:', error)
        } finally {
            // Siempre limpiar localStorage
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('user')
        }

        return { success: true }
    },

    // Obtener usuario actual
    getCurrentUser() {
        const user = localStorage.getItem('user')
        return user ? JSON.parse(user) : null
    },

    // Verificar si está autenticado
    isAuthenticated() {
        return !!localStorage.getItem('accessToken')
    },

    // Obtener token de acceso
    getAccessToken() {
        return localStorage.getItem('accessToken')
    },

    // Obtener refresh token
    getRefreshToken() {
        return localStorage.getItem('refreshToken')
    },

    // Refrescar token (usa API pública ya que puede incluir refresh token)
    async refreshToken() {
        try {
            const refreshToken = this.getRefreshToken()
            if (!refreshToken) {
                throw new Error('No hay refresh token disponible')
            }

            const response = await publicApi.post('/auth/refresh', {
                refreshToken: refreshToken
            })

            const { data } = response.data
            if (data && data.accessToken) {
                localStorage.setItem('accessToken', data.accessToken)
                if (data.refreshToken) {
                    localStorage.setItem('refreshToken', data.refreshToken)
                }
                return { success: true, token: data.accessToken }
            }

            return { success: false, error: 'Respuesta inválida' }
        } catch (error) {
            // Si falla el refresh, cerrar sesión
            this.logout()
            return {
                success: false,
                error: error.response?.data?.message || 'Error al refrescar token'
            }
        }
    }
} 