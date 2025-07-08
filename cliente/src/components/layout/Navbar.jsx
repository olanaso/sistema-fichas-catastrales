import React, { useState, useEffect } from 'react'
import { Navbar, Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

const AppNavbar = () => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const navigate = useNavigate()
    const { user, logout } = useApp()

    useEffect(() => {
        // Actualizar fecha cada segundo
        const timer = setInterval(() => {
            setCurrentDate(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const handleLogout = async () => {
        try {
            logout()
            navigate('/login')
        } catch (error) {
            console.error('Error al cerrar sesión:', error)
            navigate('/login')
        }
    }

    const formatDate = (date) => {
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const formatTime = (date) => {
        return date.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })
    }

    const getUserName = () => {
        if (user?.nombres && user?.apellidos) {
            return `${user.nombres} ${user.apellidos}`
        }
        if (user?.name) return user.name
        if (user?.email) return user.email.split('@')[0]
        return 'Usuario'
    }

    return (
        <Navbar 
            bg="white" 
            expand="lg" 
            className="shadow-sm border-bottom"
            style={{ 
                height: '80px',
                minHeight: '80px',
                maxHeight: '80px'
            }}
        >
            <Container fluid className="px-4 h-100">
                <div className="d-flex align-items-center justify-content-between w-100 h-100">
                    {/* Fecha y hora actual */}
                    <div className="d-flex flex-column justify-content-center">
                        <div className="fw-semibold text-dark small">
                            {formatDate(currentDate)}
                        </div>
                        <div className="text-primary fw-bold">
                            {formatTime(currentDate)}
                        </div>
                    </div>

                    {/* Sección de usuario */}
                    <div className="d-flex align-items-center gap-3">
                        {/* Saludo al usuario */}
                        <div className="d-flex align-items-center gap-2">
                            <div className="text-end">
                                <div className="fw-semibold text-dark small">
                                    ¡Bienvenido, {getUserName()}!
                                </div>
                                <div className="text-muted small">
                                    {user?.role || 'Usuario'}
                                </div>
                            </div>
                        </div>

                        {/* Botón de cerrar sesión */}
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={handleLogout}
                            className="d-flex align-items-center gap-2"
                        >
                            <i className="fas fa-sign-out-alt"></i>
                        </Button>
                    </div>
                </div>
            </Container>
        </Navbar>
    )
}

export default AppNavbar 