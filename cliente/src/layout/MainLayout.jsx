import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function MainLayout({ children }) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const location = useLocation()

    const menuItems = [
        {
            title: 'Dashboard',
            icon: 'fas fa-tachometer-alt',
            path: '/',
            description: 'Panel principal'
        },
        {
            title: 'Acerca de',
            icon: 'fas fa-info-circle',
            path: '/about',
            description: 'Información del sistema'
        },
        {
            title: 'Contacto',
            icon: 'fas fa-envelope',
            path: '/contact',
            description: 'Contactar soporte'
        },
        {
            title: 'API Demo',
            icon: 'fas fa-code',
            path: '/api-example',
            description: 'Ejemplos de API'
        }
    ]

    const isActive = (path) => {
        return location.pathname === path
    }

    return (
        <div className="min-vh-100 d-flex" style={{ backgroundColor: '#f8f9fa' }}>
            {/* Sidebar */}
            <div
                className={`bg-white shadow-sm border-end ${sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}
                style={{
                    width: sidebarCollapsed ? '80px' : '280px',
                    transition: 'width 0.3s ease',
                    position: 'fixed',
                    height: '100vh',
                    zIndex: 1000
                }}
            >
                {/* Sidebar Header */}
                <div className="p-3 border-bottom">
                    <div className="d-flex align-items-center justify-content-between">
                        {!sidebarCollapsed && (
                            <h5 className="mb-0 fw-bold text-primary">
                                <i className="fas fa-building me-2"></i>
                                Sistema Catastral
                            </h5>
                        )}
                        <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                            title={sidebarCollapsed ? 'Expandir' : 'Contraer'}
                        >
                            <i className={`fas fa-${sidebarCollapsed ? 'chevron-right' : 'chevron-left'}`}></i>
                        </button>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="p-3">
                    <ul className="nav flex-column gap-2">
                        {menuItems.map((item, index) => (
                            <li key={index} className="nav-item">
                                <Link
                                    to={item.path}
                                    className={`nav-link d-flex align-items-center p-3 rounded ${isActive(item.path)
                                            ? 'bg-primary text-white'
                                            : 'text-dark hover-bg-light'
                                        }`}
                                    style={{
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease'
                                    }}
                                    title={sidebarCollapsed ? item.title : ''}
                                >
                                    <i className={`${item.icon} ${sidebarCollapsed ? 'fs-5' : 'me-3'}`}></i>
                                    {!sidebarCollapsed && (
                                        <div>
                                            <div className="fw-semibold">{item.title}</div>
                                            <small className="opacity-75">{item.description}</small>
                                        </div>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Sidebar Footer */}
                <div className="position-absolute bottom-0 w-100 p-3 border-top bg-light">
                    <div className="d-flex align-items-center">
                        {!sidebarCollapsed ? (
                            <div className="d-flex align-items-center w-100">
                                <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3"
                                    style={{ width: '40px', height: '40px' }}>
                                    <i className="fas fa-user text-white"></i>
                                </div>
                                <div className="flex-grow-1">
                                    <div className="fw-semibold small">Usuario</div>
                                    <div className="text-muted small">Sistema Web</div>
                                </div>
                                <Link to="/login" className="btn btn-outline-secondary btn-sm" title="Login">
                                    <i className="fas fa-sign-in-alt"></i>
                                </Link>
                            </div>
                        ) : (
                            <div className="w-100 text-center">
                                <Link to="/login" className="btn btn-outline-primary btn-sm" title="Login">
                                    <i className="fas fa-sign-in-alt"></i>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div
                className="flex-grow-1"
                style={{
                    marginLeft: sidebarCollapsed ? '80px' : '280px',
                    transition: 'margin-left 0.3s ease'
                }}
            >
                {/* Top Header */}
                <div className="bg-white shadow-sm border-bottom sticky-top">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="d-flex justify-content-between align-items-center py-3">
                                    <div>
                                        <h4 className="mb-0 fw-bold text-dark">
                                            {menuItems.find(item => isActive(item.path))?.title || 'Inicio'}
                                        </h4>
                                        <p className="text-muted mb-0 small">
                                            {menuItems.find(item => isActive(item.path))?.description || 'Bienvenido al sistema'}
                                        </p>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                        <button className="btn btn-outline-secondary btn-sm">
                                            <i className="fas fa-bell"></i>
                                        </button>
                                        <button className="btn btn-outline-secondary btn-sm">
                                            <i className="fas fa-cog"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <div className="container-fluid py-4">
                    {children}
                </div>
            </div>

            {/* CSS Styles */}
            <style jsx>{`
                .hover-bg-light:hover {
                    background-color: #f8f9fa !important;
                }
                .sidebar-expanded {
                    width: 280px;
                }
                .sidebar-collapsed {
                    width: 80px;
                }
            `}</style>
        </div>
    )
}

export default MainLayout 