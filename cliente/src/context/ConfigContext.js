import React, { createContext, useContext, useState } from 'react'

// Crear el contexto
const ConfigContext = createContext()

// Provider del contexto
export const ConfigProvider = ({ children }) => {
    const [config, setConfig] = useState({
        loginFormPrincipal: true,
        // Agregar más configuraciones según sea necesario
    })

    const updateConfig = (key, value) => {
        setConfig(prev => ({
            ...prev,
            [key]: value
        }))
    }

    return (
        <ConfigContext.Provider value={{
            ...config,
            updateConfig
        }}>
            {children}
        </ConfigContext.Provider>
    )
}

// Hook personalizado para usar el contexto
export const useConfig = () => {
    const context = useContext(ConfigContext)
    if (!context) {
        throw new Error('useConfig debe ser usado dentro de un ConfigProvider')
    }
    return context
}

export { ConfigContext } 