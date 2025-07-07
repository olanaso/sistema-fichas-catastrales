import axios from 'axios'

// Configuración base de la API
const API_BASE_URL = 'http://localhost:8081/api'

// Configuración base común
const baseConfig = {
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 segundos
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}

// =====================================================
// API PÚBLICA - Sin token (para login, registro, etc.)
// =====================================================
const publicApi = axios.create(baseConfig)

// Interceptor para peticiones públicas
publicApi.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        console.error('❌ Public Request Error:', error)
        return Promise.reject(error)
    }
)

// Interceptor para respuestas públicas
publicApi.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response) {
            const { status, data } = error.response
            console.error('❌ Public API Error:', status, data)
        } else if (error.request) {
            // Error de red - no respuesta del servidor
            if (error.request.status === 0) {
                console.error('❌ Servidor no disponible: Verifica que el backend esté ejecutándose en http://localhost:8081')
                error.message = 'No se puede conectar al servidor. Verifica que esté ejecutándose.'
            } else {
                console.error('❌ Public Network Error:', error.request)
            }
        } else {
            console.error('❌ Public Error:', error.message)
        }
        return Promise.reject(error)
    }
)

// =====================================================
// API PRIVADA - Con token (para operaciones autenticadas)
// =====================================================
const privateApi = axios.create(baseConfig)

// Interceptor para peticiones privadas (agregar token)
privateApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        console.error('❌ Private Request Error:', error)
        return Promise.reject(error)
    }
)

// Interceptor para respuestas privadas (manejo de token expirado)
privateApi.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response) {
            const { status, data } = error.response

            switch (status) {
                case 401:
                    // Token expirado o no válido
                    console.error('❌ Token expirado o no válido')
                    localStorage.removeItem('accessToken')
                    localStorage.removeItem('refreshToken')
                    localStorage.removeItem('user')
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
                    console.error('❌ Private API Error:', status, data)
            }
        } else if (error.request) {
            // Error de red - no respuesta del servidor
            if (error.request.status === 0) {
                console.error('❌ Servidor no disponible: Verifica que el backend esté ejecutándose en http://localhost:8081')
                error.message = 'No se puede conectar al servidor. Verifica que esté ejecutándose.'
            } else {
                console.error('❌ Private Network Error:', error.request)
            }
        } else {
            console.error('❌ Private Error:', error.message)
        }

        return Promise.reject(error)
    }
)

// Exportar ambas instancias
export { publicApi, privateApi }

// Exportar publicApi como default para compatibilidad
export default publicApi 