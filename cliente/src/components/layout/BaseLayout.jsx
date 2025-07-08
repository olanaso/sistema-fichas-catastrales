import React, { useState } from 'react'
import AppNavbar from './Navbar'
import Sidebar from './Sidebar'
import { useApp } from '../../context/AppContext'

const BaseLayout = ({
    children,
    menuItems = [],
    sidebarProps = {}
}) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const { user } = useApp()

    const handleToggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed)
    }

    const sidebarWidth = sidebarCollapsed ? 80 : 280

    return (
        <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
            {/* Sidebar - Ocupa toda la altura del lado izquierdo */}
            <div style={{ width: `${sidebarWidth}px`, transition: 'width 0.3s ease-in-out' }}>
                <Sidebar
                    menuItems={menuItems}
                    collapsed={sidebarCollapsed}
                    onToggleCollapse={handleToggleSidebar}
                    userRole={user?.role || 'user'}
                    {...sidebarProps}
                />
            </div>

            {/* Área principal - Navbar + Contenido */}
            <div className="flex-grow-1 d-flex flex-column" style={{ height: '100vh', overflow: 'hidden' }}>
                {/* Navbar - Ocupa la parte superior del área no ocupada por el sidebar */}
                <div className="flex-shrink-0">
                    <AppNavbar />
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