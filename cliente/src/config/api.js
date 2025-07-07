import axios from 'axios'

// Configuración base de la API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

// Crear instancia de axios
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 segundos
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

// Interceptor para peticiones (request)
api.interceptors.request.use(
    (config) => {
        // Agregar token de autenticación si existe
        const token = localStorage.getItem('authToken')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        // Log para desarrollo
        if (import.meta.env.DEV) {
            console.log('🚀 Request:', config.method?.toUpperCase(), config.url)
        }

        return config
    },
    (error) => {
        console.error('❌ Request Error:', error)
        return Promise.reject(error)
    }
)

// Interceptor para respuestas (response)
api.interceptors.response.use(
    (response) => {
        // Log para desarrollo
        if (import.meta.env.DEV) {
            console.log('✅ Response:', response.status, response.config.url)
        }

        return response
    },
    (error) => {
        // Manejo de errores comunes
        if (error.response) {
            const { status, data } = error.response

            switch (status) {
                case 401:
                    // Token expirado o no válido
                    localStorage.removeItem('authToken')
                    window.location.href = '/login'
                    break
                case 403:
                    console.error('❌ Acceso denegado')
                    break
                case 404:
                    console.error('❌ Recurso no encontrado')
                    break
                case 500:
                    console.error('❌ Error del servidor')
                    break
                default:
                    console.error('❌ Error de respuesta:', status, data)
            }
        } else if (error.request) {
            console.error('❌ Error de red:', error.request)
        } else {
            console.error('❌ Error:', error.message)
        }

        return Promise.reject(error)
    }
)

export default api 