import React, { useState } from 'react'
import { Nav, Button, Collapse } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = ({ menuItems = [], collapsed = false, onToggleCollapse, userRole = 'user' }) => {
    const [expandedItems, setExpandedItems] = useState({})
    const location = useLocation()

    const toggleCollapse = () => {
        if (onToggleCollapse) {
            onToggleCollapse()
        }
    }

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
        const paddingLeft = collapsed ? 0 : level * 20 + 16

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
                            style={{ paddingLeft: `${paddingLeft}px` }}
                        >
                            <div className="d-flex align-items-center py-2 px-3">
                                <i className={`${item.icon} ${collapsed ? 'fs-5' : 'me-3'}`}></i>
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
                            className={`d-flex align-items-center py-2 px-3 text-decoration-none rounded ${isItemActive
                                    ? 'bg-primary text-white'
                                    : 'text-dark hover-bg-light'
                                }`}
                            style={{ paddingLeft: `${paddingLeft}px` }}
                            title={collapsed ? item.title : ''}
                        >
                            <i className={`${item.icon} ${collapsed ? 'fs-5' : 'me-3'}`}></i>
                            {!collapsed && (
                                <div className="flex-grow-1">
                                    <div className="fw-semibold">{item.title}</div>
                                    {item.description && (
                                        <small className="opacity-75">{item.description}</small>
                                    )}
                                </div>
                            )}
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
            className={`bg-white shadow-sm border-end ${collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}
            style={{
                width: collapsed ? '80px' : '280px',
                height: '100vh',
                position: 'fixed',
                top: '0',
                left: '0',
                zIndex: 1000,
                transition: 'width 0.3s ease-in-out',
                overflowY: 'auto',
                overflowX: 'hidden'
            }}
        >
            {/* Header del sidebar */}
            <div className="p-3 border-bottom bg-light">
                <div className="d-flex align-items-center justify-content-between">
                    {!collapsed && (
                        <div className="d-flex align-items-center">
                            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2"
                                style={{ width: '32px', height: '32px' }}>
                                <i className="fas fa-building text-white small"></i>
                            </div>
                            <div>
                                <div className="fw-bold text-dark small">Sistema</div>
                                <div className="text-muted small">Catastral</div>
                            </div>
                        </div>
                    )}
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={toggleCollapse}
                        title={collapsed ? 'Expandir sidebar' : 'Contraer sidebar'}
                        className="border-0"
                    >
                        <i className={`fas fa-${collapsed ? 'chevron-right' : 'chevron-left'}`}></i>
                    </Button>
                </div>
            </div>

            {/* Menú de navegación */}
            <Nav className="flex-column p-3">
                {menuItems.map(item => renderMenuItem(item))}
            </Nav>

            {/* Footer del sidebar */}
            <div className="position-absolute bottom-0 w-100 p-3 border-top bg-light">
                <div className="text-center">
                    {!collapsed ? (
                        <div className="text-muted small">
                            <i className="fas fa-shield-alt me-2"></i>
                            Versión 1.0
                        </div>
                    ) : (
                        <i className="fas fa-shield-alt text-muted"></i>
                    )}
                </div>
            </div>

            {/* Estilos personalizados */}
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
                .sidebar-collapsed .collapse {
                    display: none !important;
                }
            `}</style>
        </div>
    )
}

export default Sidebar 