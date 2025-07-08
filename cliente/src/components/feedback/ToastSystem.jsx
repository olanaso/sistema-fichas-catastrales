import React, { createContext, useContext } from 'react'
import toast, { Toaster } from 'react-hot-toast'

// Contexto para el sistema de toast (opcional, principalmente para consistencia)
const ToastContext = createContext()

// Hook para usar el sistema de toast
export const useToast = () => {
    // Funciones principales de toast con configuración española
    const showSuccess = (message, options = {}) => {
        return toast.success(message, {
            duration: 4000,
            position: 'top-right',
            icon: '✅',
            style: {
                borderRadius: '8px',
                background: '#10B981',
                color: '#fff',
                fontWeight: '500'
            },
            ...options
        })
    }

    const showError = (message, options = {}) => {
        return toast.error(message, {
            duration: 6000,
            position: 'top-right',
            icon: '❌',
            style: {
                borderRadius: '8px',
                background: '#EF4444',
                color: '#fff',
                fontWeight: '500'
            },
            ...options
        })
    }

    const showWarning = (message, options = {}) => {
        return toast(message, {
            duration: 5000,
            position: 'top-right',
            icon: '⚠️',
            style: {
                borderRadius: '8px',
                background: '#F59E0B',
                color: '#fff',
                fontWeight: '500'
            },
            ...options
        })
    }

    const showInfo = (message, options = {}) => {
        return toast(message, {
            duration: 4000,
            position: 'top-right',
            icon: 'ℹ️',
            style: {
                borderRadius: '8px',
                background: '#3B82F6',
                color: '#fff',
                fontWeight: '500'
            },
            ...options
        })
    }

    const showLoading = (message, options = {}) => {
        return toast.loading(message, {
            position: 'top-right',
            style: {
                borderRadius: '8px',
                background: '#6B7280',
                color: '#fff',
                fontWeight: '500'
            },
            ...options
        })
    }

    // Función para mostrar errores de validación
    const showValidationErrors = (errors, title = 'Errores de validación') => {
        const errorMessages = Object.values(errors).filter(Boolean)
        if (errorMessages.length > 0) {
            const message = `${title}:\n• ${errorMessages.join('\n• ')}`
            return showError(message, { 
                duration: 8000,
                style: {
                    maxWidth: '500px',
                    whiteSpace: 'pre-line'
                }
            })
        }
    }

    // Función para mostrar errores de API
    const showApiError = (error, defaultMessage = 'Error en la operación') => {
        let message = defaultMessage
        
        if (error?.response?.data?.message) {
            message = error.response.data.message
        } else if (error?.response?.data?.error) {
            message = error.response.data.error
        } else if (error?.message) {
            message = error.message
        } else if (typeof error === 'string') {
            message = error
        }

        return showError(message, {
            duration: 8000,
            style: {
                maxWidth: '400px'
            }
        })
    }

    // Función para operaciones con loading
    const showPromise = (promise, messages = {}) => {
        const defaultMessages = {
            loading: 'Procesando...',
            success: 'Operación completada',
            error: 'Error en la operación'
        }

        return toast.promise(promise, {
            ...defaultMessages,
            ...messages
        }, {
            position: 'top-right',
            style: {
                borderRadius: '8px',
                fontWeight: '500'
            },
            success: {
                duration: 4000,
                icon: '✅'
            },
            error: {
                duration: 6000,
                icon: '❌'
            }
        })
    }

    // Función para cerrar toast específico
    const dismissToast = (toastId) => {
        toast.dismiss(toastId)
    }

    // Función para cerrar todos los toasts
    const dismissAll = () => {
        toast.dismiss()
    }

    return {
        showSuccess,
        showError,
        showWarning,
        showInfo,
        showLoading,
        showValidationErrors,
        showApiError,
        showPromise,
        dismissToast,
        dismissAll,
        // Aliases para compatibilidad
        toast: {
            success: showSuccess,
            error: showError,
            warning: showWarning,
            info: showInfo,
            loading: showLoading,
            promise: showPromise
        }
    }
}

// Proveedor del sistema de toast (simplificado)
export const ToastProvider = ({ children }) => {
    return (
        <ToastContext.Provider value={{}}>
            {children}
            <Toaster
                position="top-right"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{
                    top: 20,
                    right: 20
                }}
                toastOptions={{
                    // Opciones globales por defecto
                    duration: 4000,
                    style: {
                        background: '#fff',
                        color: '#374151',
                        fontWeight: '500',
                        borderRadius: '8px',
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                        border: '1px solid #E5E7EB',
                        padding: '12px 16px'
                    },
                    // Configuración por tipo
                    success: {
                        duration: 4000,
                        iconTheme: {
                            primary: '#10B981',
                            secondary: '#fff'
                        },
                        style: {
                            background: '#F0FDF4',
                            color: '#166534',
                            border: '1px solid #BBF7D0'
                        }
                    },
                    error: {
                        duration: 6000,
                        iconTheme: {
                            primary: '#EF4444',
                            secondary: '#fff'
                        },
                        style: {
                            background: '#FEF2F2',
                            color: '#991B1B',
                            border: '1px solid #FECACA'
                        }
                    }
                }}
            />
        </ToastContext.Provider>
    )
}

// Componente de alerta en línea (para formularios)
export const InlineAlert = ({ 
    type = 'info', 
    message, 
    show = true, 
    className = '',
    dismissible = false,
    onDismiss,
    ...props 
}) => {
    if (!show || !message) return null

    const getAlertClass = (type) => {
        const variants = {
            success: 'alert-success',
            error: 'alert-danger',
            warning: 'alert-warning',
            info: 'alert-info'
        }
        return variants[type] || 'alert-info'
    }

    const getIcon = (type) => {
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-triangle',
            warning: 'fas fa-exclamation-circle',
            info: 'fas fa-info-circle'
        }
        return icons[type] || 'fas fa-info-circle'
    }

    const alertClass = `alert ${getAlertClass(type)} ${dismissible ? 'alert-dismissible' : ''} ${className}`
    const icon = getIcon(type)

    return (
        <div className={alertClass} role="alert" {...props}>
            <div className="d-flex align-items-center">
                <i className={`${icon} me-2`}></i>
                <div className="flex-grow-1" style={{ whiteSpace: 'pre-line' }}>
                    {message}
                </div>
                {dismissible && (
                    <button
                        type="button"
                        className="btn-close"
                        onClick={onDismiss}
                        aria-label="Close"
                    ></button>
                )}
            </div>
        </div>
    )
}

// Componente de errores de validación
export const ValidationErrors = ({ errors, show = true, className = '' }) => {
    if (!show || !errors || Object.keys(errors).length === 0) return null

    const errorList = Object.values(errors).filter(Boolean)
    
    return (
        <InlineAlert
            type="error"
            message={`• ${errorList.join('\n• ')}`}
            className={className}
        />
    )
}

export default ToastProvider 