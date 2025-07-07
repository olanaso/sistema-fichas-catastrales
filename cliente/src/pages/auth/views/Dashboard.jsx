import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../api/authService'

function Dashboard() {
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        loadUserData()
    }, [])

    const loadUserData = async () => {
        try {
            // Verificar autenticación
            if (!authService.isAuthenticated()) {
                navigate('/login')
                return
            }

            // Obtener datos del usuario desde localStorage
            const user = authService.getCurrentUser()
            if (user) {
                setUserData(user)
            } else {
                // Si no hay datos de usuario pero sí token, mostrar información básica
                setUserData({
                    message: 'Usuario autenticado',
                    token: authService.getAccessToken()?.substring(0, 20) + '...',
                    loginTime: new Date().toLocaleString()
                })
            }
        } catch (err) {
            setError('Error al cargar datos del usuario')
            setTimeout(() => navigate('/login'), 2000)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        try {
            await authService.logout()
        } catch (err) {
            console.error('Error en logout:', err)
        } finally {
            navigate('/login')
        }
    }

    if (loading) {
        return (
            <div className="d-flex align-items-center justify-content-center min-vh-100" 
                 style={{ backgroundColor: '#f8f9fa' }}>
                <div className="text-center">
                    <div className="spinner-border text-primary mb-3" role="status"></div>
                    <p className="text-muted">Cargando dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
            {/* Header */}
            <div className="bg-white shadow-sm border-bottom">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex justify-content-between align-items-center py-3">
                                <h1 className="h4 mb-0 fw-bold text-dark">
                                    <i className="fas fa-tachometer-alt me-2 text-primary"></i>
                                    Dashboard
                                </h1>
                                <button 
                                    onClick={handleLogout}
                                    className="btn btn-outline-danger"
                                >
                                    <i className="fas fa-sign-out-alt me-2"></i>
                                    Cerrar Sesión
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container-fluid py-4">
                <div className="row">
                    <div className="col-12">
                        {error ? (
                            <div className="alert alert-danger">
                                <i className="fas fa-exclamation-circle me-2"></i>
                                {error}
                            </div>
                        ) : (
                            <div className="row g-4">
                                {/* Welcome Card */}
                                <div className="col-12">
                                    <div className="card shadow border-0">
                                        <div className="card-body p-4">
                                            <h5 className="card-title text-dark">
                                                <i className="fas fa-user-circle me-2 text-primary"></i>
                                                Bienvenido al Sistema
                                            </h5>
                                            <p className="card-text text-muted">
                                                Has iniciado sesión exitosamente en el sistema catastral.
                                            </p>
                                            {userData?.email && (
                                                <p className="card-text">
                                                    <strong>Usuario:</strong> {userData.email}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* User Data Card */}
                                {userData && (
                                    <div className="col-12">
                                        <div className="card shadow border-0">
                                            <div className="card-header bg-white border-bottom">
                                                <h6 className="mb-0 fw-semibold">
                                                    <i className="fas fa-info-circle me-2 text-primary"></i>
                                                    Información de Sesión
                                                </h6>
                                            </div>
                                            <div className="card-body p-4">
                                                <div className="bg-dark rounded p-3">
                                                    <pre className="text-light mb-0" style={{ fontSize: '0.875rem' }}>
                                                        {JSON.stringify(userData, null, 2)}
                                                    </pre>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Quick Actions Card */}
                                <div className="col-12">
                                    <div className="card shadow border-0">
                                        <div className="card-header bg-white border-bottom">
                                            <h6 className="mb-0 fw-semibold">
                                                <i className="fas fa-bolt me-2 text-primary"></i>
                                                Acciones Rápidas
                                            </h6>
                                        </div>
                                        <div className="card-body p-4">
                                            <div className="row g-3">
                                                <div className="col-md-4">
                                                    <button className="btn btn-outline-primary w-100">
                                                        <i className="fas fa-file-alt me-2"></i>
                                                        Crear Ficha
                                                    </button>
                                                </div>
                                                <div className="col-md-4">
                                                    <button className="btn btn-outline-success w-100">
                                                        <i className="fas fa-search me-2"></i>
                                                        Buscar Propiedades
                                                    </button>
                                                </div>
                                                <div className="col-md-4">
                                                    <button className="btn btn-outline-info w-100">
                                                        <i className="fas fa-chart-bar me-2"></i>
                                                        Ver Reportes
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard 