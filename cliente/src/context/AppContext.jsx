import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { authService } from '../modules/auth/api/authService'

// Estado inicial
const initialState = {
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null
}

// Tipos de acciones
const ACTION_TYPES = {
    SET_LOADING: 'SET_LOADING',
    SET_USER: 'SET_USER',
    SET_ERROR: 'SET_ERROR',
    LOGOUT: 'LOGOUT'
}

// Reducer para manejar el estado
const appReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case ACTION_TYPES.SET_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: !!action.payload,
                loading: false,
                error: null
            }
        case ACTION_TYPES.SET_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case ACTION_TYPES.LOGOUT:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                loading: false,
                error: null
            }
        default:
            return state
    }
}

// Crear el contexto
const AppContext = createContext()

// Hook personalizado para usar el contexto
export const useApp = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useApp debe ser usado dentro de un AppProvider')
    }
    return context
}

// Provider del contexto
export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState)

    // Verificar autenticación al cargar
    useEffect(() => {
        const checkAuth = () => {
            try {
                if (authService.isAuthenticated()) {
                    const user = authService.getCurrentUser()
                    dispatch({ type: ACTION_TYPES.SET_USER, payload: user })
                } else {
                    dispatch({ type: ACTION_TYPES.SET_LOADING, payload: false })
                }
            } catch (error) {
                dispatch({ type: ACTION_TYPES.SET_ERROR, payload: 'Error al verificar autenticación' })
            }
        }

        checkAuth()
    }, [])

    // Acciones del contexto
    const actions = {
        setLoading: (loading) => {
            dispatch({ type: ACTION_TYPES.SET_LOADING, payload: loading })
        },
        setUser: (user) => {
            dispatch({ type: ACTION_TYPES.SET_USER, payload: user })
        },
        setError: (error) => {
            dispatch({ type: ACTION_TYPES.SET_ERROR, payload: error })
        },
        logout: () => {
            authService.logout()
            dispatch({ type: ACTION_TYPES.LOGOUT })
        }
    }

    const value = {
        ...state,
        ...actions
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext 