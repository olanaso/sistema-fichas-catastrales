import React, { useState, useEffect } from 'react'
import { Navbar, Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { LuLogOut, LuPanelLeft } from "react-icons/lu"

const AppNavbar = ({ onToggleSidebar, sidebarCollapsed }) => {
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
                height: '60px',
                minHeight: '60px',
                maxHeight: '60px'
            }}
        >
            <Container fluid className="px-4 h-80">
                <div className="d-flex align-items-center justify-content-between w-100 h-80">
                    {/* Botón de toggle del sidebar y fecha/hora */}
                    <div className="d-flex align-items-center gap-3">
                        {/* Botón de toggle del sidebar */}
                        <Button
                            variant="light"
                            size="sm"
                            onClick={onToggleSidebar}
                            title={sidebarCollapsed ? 'Expandir sidebar' : 'Contraer sidebar'}
                            className="border-0 d-flex align-items-center justify-content-center"
                            style={{ width: '36px', height: '36px' }}
                        >
                            <LuPanelLeft size={18} />
                        </Button>

                        {/* Fecha y hora actual */}
                        <div className="d-flex flex-column justify-content-center">
                            <div className="fw-semibold text-dark small">
                                {formatDate(currentDate).charAt(0).toUpperCase() + formatDate(currentDate).slice(1)}
                            </div>
                            {/* <div className="text-primary fw-bold">
                                {formatTime(currentDate)}
                            </div> */}
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
                                {/* <div className="text-muted small">
                                    {user?.role || 'Usuario'}
                                </div> */}
                            </div>
                        </div>

                        {/* Botón de cerrar sesión */}
                        <Button
                            variant="outline-danger"
                            size="sm"
                            rounded={false}
                            onClick={handleLogout}
                            className="d-flex align-items-center gap-2"
                        >
                            <LuLogOut size={18} />
                        </Button>
                    </div>
                </div>
            </Container>
        </Navbar>
    )
}

export default AppNavbar 