import React, { useState, useEffect } from 'react'
import AppNavbar from './Navbar'
import Sidebar from './Sidebar'
import { useApp } from '../../context/AppContext'
import useScreenSize from '../../hooks/useScreenSize'

const BaseLayout = ({
    children,
    menuItems = [],
    sidebarProps = {}
}) => {
    const { user } = useApp()
    const { isMobile, isDesktop } = useScreenSize()

    // Estado inicial del sidebar basado en el tamaño de pantalla
    const getInitialSidebarState = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 768) return true  // Móvil y tablet
            return false // Desktop
        }
        return false // Fallback para SSR
    }

    const [sidebarCollapsed, setSidebarCollapsed] = useState(getInitialSidebarState())

    // Efecto para manejar el estado del sidebar según el tamaño de pantalla
    useEffect(() => {
        // Solo establecer el estado inicial, no forzar cambios continuos
        if (isMobile && !sidebarCollapsed) {
            // En móviles, si no está contraído, contraerlo
            setSidebarCollapsed(true)
        } else if (isDesktop && sidebarCollapsed) {
            // En desktop, si está contraído, expandirlo
            setSidebarCollapsed(false)
        }
        // En tablets, mantener el estado actual del usuario
    }, [isMobile, isDesktop]) // Removido isTablet para permitir control manual en tablets

    const handleToggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed)
    }

    const sidebarWidth = sidebarCollapsed ? 60 : 260

    return (
        <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
            {/* Sidebar - Ocupa toda la altura del lado izquierdo */}
            <div style={{ width: `${sidebarWidth}px`, transition: 'width 0.3s ease-in-out' }}>
                <Sidebar
                    menuItems={menuItems}
                    collapsed={sidebarCollapsed}
                    userRole={user?.role || 'user'}
                    {...sidebarProps}
                />
            </div>

            {/* Área principal - Navbar + Contenido */}
            <div className="flex-grow-1 d-flex flex-column" style={{ height: '100vh', overflow: 'hidden' }}>
                {/* Navbar - Ocupa la parte superior del área no ocupada por el sidebar */}
                <div className="flex-shrink-0">
                    <AppNavbar 
                        onToggleSidebar={handleToggleSidebar}
                        sidebarCollapsed={sidebarCollapsed}
                    />
                </div>

                {/* Contenido principal - Ocupa todo el espacio restante */}
                <div
                    className="flex-grow-1 bg-white"
                    style={{
                        overflow: 'auto'
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    )
}

export default BaseLayout 