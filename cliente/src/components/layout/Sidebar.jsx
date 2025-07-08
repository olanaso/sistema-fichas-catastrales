import React, { useState } from 'react'
import { Nav, Button, Collapse } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = ({ menuItems = [], collapsed = false, userRole = 'user' }) => {
    const [expandedItems, setExpandedItems] = useState({})
    const location = useLocation()

    const toggleSubmenu = (itemId) => {
        setExpandedItems(prev => ({
            ...prev,
            [itemId]: !prev[itemId]
        }))
    }

    const isActive = (path) => {
        return location.pathname === path ||
            (path !== '/' && location.pathname.startsWith(path))
    }

    const hasSubmenu = (item) => {
        return item.children && item.children.length > 0
    }

    const canAccessMenuItem = (item) => {
        if (!item.roles || item.roles.length === 0) return true
        return item.roles.includes(userRole)
    }

    const renderMenuItem = (item, level = 0) => {
        if (!canAccessMenuItem(item)) return null

        const isItemActive = isActive(item.path)
        const hasChildren = hasSubmenu(item)
        const isExpanded = expandedItems[item.id]
        const paddingLeft = collapsed ? 0 : level * 20

        // Función para renderizar el icono
        const renderIcon = (icon) => {
            if (typeof icon === 'string') {
                // Icono de Font Awesome
                return <i className={`${icon} ${collapsed ? 'fs-5' : 'me-3'}`}></i>
            } else if (React.isValidElement(icon)) {
                // Icono de React Icons o Lucide React (JSX element)
                return React.cloneElement(icon, {
                    size: collapsed ? 20 : 16,
                    className: collapsed ? 'me-0' : 'me-2'
                })
            } else {
                // Fallback
                return <span className={collapsed ? 'fs-5' : 'me-3'}>{icon}</span>
            }
        }

        return (
            <div key={item.id} className="mb-1">
                {/* Item principal */}
                <div className="position-relative">
                    {hasChildren ? (
                        <Button
                            variant="link"
                            className={`w-100 text-start p-0 border-0 text-decoration-none ${isItemActive ? 'bg-primary text-white' : 'text-dark'
                                }`}
                            onClick={() => toggleSubmenu(item.id)}
                            style={{ 
                                paddingLeft: collapsed ? '0px' : `${paddingLeft}px`,
                                paddingRight: collapsed ? '0px' : '12px'
                            }}
                        >
                            <div className={`d-flex align-items-center ${collapsed ? 'justify-content-center py-2' : 'py-2 px-3'}`}>
                                {renderIcon(item.icon)}
                                {!collapsed && (
                                    <>
                                        <span className="flex-grow-1 fw-semibold">{item.title}</span>
                                        <i className={`fas fa-chevron-${isExpanded ? 'down' : 'right'} ms-2`}></i>
                                    </>
                                )}
                            </div>
                        </Button>
                    ) : (
                        <Link
                            to={item.path}
                            className={`d-flex align-items-center text-decoration-none rounded ${isItemActive
                                    ? 'bg-primary text-white'
                                    : 'text-dark hover-bg-light'
                                }`}
                            style={{ 
                                paddingLeft: collapsed ? '0px' : `${paddingLeft}px`,
                                paddingRight: collapsed ? '0px' : '12px',
                                marginLeft: collapsed ? '10px' : '0px',
                                marginRight: collapsed ? '10px' : '0px'
                            }}
                            title={collapsed ? item.title : ''}
                        >
                            <div className={`d-flex align-items-center ${collapsed ? 'justify-content-center py-2' : 'py-2 px-3'}`}>
                                {renderIcon(item.icon)}
                                {!collapsed && (
                                    <div className="">
                                        <div className="fw-semibold">{item.title}</div>
                                        {item.description && (
                                            <small className="opacity-75">{item.description}</small>
                                        )}
                                    </div>
                                )}
                            </div>
                        </Link>
                    )}
                </div>

                {/* Submenu */}
                {hasChildren && !collapsed && (
                    <Collapse in={isExpanded}>
                        <div className="ms-3">
                            {item.children.map(child => renderMenuItem(child, level + 1))}
                        </div>
                    </Collapse>
                )}
            </div>
        )
    }

    return (
        <div
            className={`bg-white shadow-sm border-end d-flex flex-column ${collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}
            style={{
                width: '100%',
                height: '100vh',
                transition: 'width 0.3s ease-in-out'
            }}
        >
            {/* Header del sidebar */}
            <div className={`${collapsed ? 'px-0' : 'px-3'} bg-light flex-shrink-0`} 
                style={{
                    paddingTop: collapsed ? '12px' : '14px',
                    paddingBottom: collapsed ? '12px' : '14px'
                }}
            >
                <div className="d-flex align-items-center justify-content-center">
                    {collapsed ? (
                        <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: '32px', height: '32px', marginTop: '6px', marginBottom: '6px' }}>
                            <i className="fas fa-building text-white small"></i>
                        </div>
                    ) : (
                        <div className="d-flex align-items-center">
                            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2"
                                style={{ width: '32px', height: '32px' }}>
                                <i className="fas fa-building text-white small"></i>
                            </div>
                            <div>
                                <div className="fw-bold text-dark small">CATASTRO</div>
                                {/* <div className="text-muted small">Catastral</div> */}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Menú de navegación - Ocupa el espacio disponible */}
            <div className="flex-grow-1 overflow-auto">
                <Nav className={`flex-column ${collapsed ? 'p-0' : 'p-3'}`}>
                    {menuItems.map(item => renderMenuItem(item))}
                </Nav>
            </div>

            {/* Footer del sidebar */}
            <div className={`${collapsed ? 'p-0' : 'p-3'} border-top bg-light flex-shrink-0`}>
                <div className="text-center">
                    {!collapsed ? (
                        <div className="text-muted small">
                            <i className="fas fa-shield-alt me-2"></i>
                            Versión 1.0
                        </div>
                    ) : (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '40px' }}>
                            <i className="fas fa-shield-alt text-muted small"></i>
                        </div>
                    )}
                </div>
            </div>

            {/* Estilos personalizados */}
            <style jsx>{`
                .hover-bg-light:hover {
                    background-color: #f8f9fa !important;
                }
                .sidebar-expanded {
                    width: 240px;
                }
                .sidebar-collapsed {
                    width: 50px;
                }
                .sidebar-collapsed .collapse {
                    display: none !important;
                }
                .sidebar-collapsed .btn {
                    padding: 6px 2px !important;
                    display: flex !important;
                    justify-content: center !important;
                    align-items: center !important;
                }
                .sidebar-collapsed .nav-link {
                    padding: 6px 2px !important;
                    display: flex !important;
                    justify-content: center !important;
                    align-items: center !important;
                }
                .sidebar-collapsed .d-flex {
                    justify-content: center !important;
                }
            `}</style>
        </div>
    )
}

export default Sidebar 