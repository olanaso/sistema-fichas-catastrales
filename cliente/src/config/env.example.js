// Archivo de configuración de variables de entorno
// Copia este archivo como .env en la raíz del proyecto

export const envConfig = {
    // API Configuration
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',

    // Development Settings
    DEV_MODE: import.meta.env.DEV,
    LOG_LEVEL: import.meta.env.VITE_LOG_LEVEL || 'info',

    // Authentication
    AUTH_TOKEN_KEY: import.meta.env.VITE_AUTH_TOKEN_KEY || 'authToken',
    AUTH_REFRESH_INTERVAL: import.meta.env.VITE_AUTH_REFRESH_INTERVAL || 3600000,

    // Map Configuration
    MAP_DEFAULT_LAT: import.meta.env.VITE_MAP_DEFAULT_LAT || -12.0464,
    MAP_DEFAULT_LNG: import.meta.env.VITE_MAP_DEFAULT_LNG || -77.0428,
    MAP_DEFAULT_ZOOM: import.meta.env.VITE_MAP_DEFAULT_ZOOM || 13,

    // File Upload
    MAX_FILE_SIZE: import.meta.env.VITE_MAX_FILE_SIZE || 10485760, // 10MB
    ALLOWED_FILE_TYPES: import.meta.env.VITE_ALLOWED_FILE_TYPES || '.zip,.kml,.gpx,.json,.shp',

    // App Settings
    APP_NAME: import.meta.env.VITE_APP_NAME || 'Sistema Catastral',
    APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0'
}

// Variables de entorno para archivo .env:
/*
VITE_API_BASE_URL=http://localhost:8080/api
VITE_DEV_MODE=true
VITE_LOG_LEVEL=debug
VITE_AUTH_TOKEN_KEY=authToken
VITE_AUTH_REFRESH_INTERVAL=3600000
VITE_MAP_DEFAULT_LAT=-12.0464
VITE_MAP_DEFAULT_LNG=-77.0428
VITE_MAP_DEFAULT_ZOOM=13
VITE_MAX_FILE_SIZE=10485760
VITE_ALLOWED_FILE_TYPES=.zip,.kml,.gpx,.json,.shp
VITE_APP_NAME=Sistema Catastral
VITE_APP_VERSION=1.0.0
*/ 