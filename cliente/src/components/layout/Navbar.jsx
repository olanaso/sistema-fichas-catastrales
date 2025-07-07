import React, { useState, useEffect } from 'react'
import { Navbar, Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { authService } from '../../modules/auth/api/authService'

const AppNavbar = () => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [userData, setUserData] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        // Actualizar fecha cada segundo
        const timer = setInterval(() => {
            setCurrentDate(new Date())
        }, 1000)

        // Obtener datos del usuario
        const user = authService.getCurrentUser()
        if (user) {
            setUserData(user)
        } else {
            // Datos por defecto para testing
            setUserData({
                nombres: "Juan Carlos",
                apellidos: "Pérez Gómez"
            })
        }

        return () => clearInterval(timer)
    }, [])

    const handleLogout = async () => {
        try {
            await authService.logout()
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
        if (userData?.nombres && userData?.apellidos) {
            return `${userData.nombres} ${userData.apellidos}`
        }
        if (userData?.name) return userData.name
        if (userData?.email) return userData.email.split('@')[0]
        return 'Usuario'
    }

    return (
        <Navbar bg="white" expand="lg" className="shadow-sm border-bottom sticky-top">
            <Container fluid className="py-3">
                {/* Fecha y hora actual */}
                <div className="d-flex flex-column align-items-start">
                    <div className="fw-semibold text-dark small">
                        {formatDate(currentDate)}
                    </div>
                    <div className="text-primary fw-bold">
                        {formatTime(currentDate)}
                    </div>
                </div>

                {/* Espaciador */}
                <div className="flex-grow-1"></div>

                {/* Sección de usuario */}
                <div className="d-flex align-items-center gap-3">
                    {/* Saludo al usuario */}
                    <div className="d-flex align-items-center gap-2">
                        <div className="text-end">
                            <div className="fw-semibold text-dark small">
                                ¡Bienvenido, {getUserName()}!
                            </div>
                            <div className="text-muted small">
                                {userData?.role || 'Usuario'}
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
            </Container>
        </Navbar>
    )
}

export default AppNavbar 