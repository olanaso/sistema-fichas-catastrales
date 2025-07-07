import React, { useState, useEffect } from 'react'
import AppNavbar from './Navbar'
import Sidebar from './Sidebar'
import { authService } from '../../modules/auth/api/authService'

const BaseLayout = ({ 
    children, 
    menuItems = [], 
    sidebarProps = {}
}) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [userRole, setUserRole] = useState('user')

    useEffect(() => {
        // Obtener rol del usuario
        const user = authService.getCurrentUser()
        if (user && user.role) {
            setUserRole(user.role)
        }
    }, [])

    const handleToggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed)
    }

    const sidebarWidth = sidebarCollapsed ? 80 : 280

    return (
        <div className="d-flex min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
            {/* Sidebar */}
            <Sidebar
                menuItems={menuItems}
                collapsed={sidebarCollapsed}
                onToggleCollapse={handleToggleSidebar}
                userRole={userRole}
                {...sidebarProps}
            />

            {/* Main Content Area */}
            <div 
                className="flex-grow-1 d-flex flex-column"
                style={{
                    marginLeft: `${sidebarWidth}px`,
                    transition: 'margin-left 0.3s ease-in-out',
                    minHeight: '100vh'
                }}
            >
                {/* Navbar */}
                <AppNavbar />

                {/* Page Content - Ocupa todo el espacio restante */}
                <div className="flex-grow-1 bg-white">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default BaseLayout 