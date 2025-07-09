import React, { useState } from 'react'
import { Nav, Button, Collapse, Overlay, Popover } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = ({ menuItems = [], collapsed = false, userRole = 'user' }) => {
    const [expandedItems, setExpandedItems] = useState({})
    const [showPopover, setShowPopover] = useState(false)
    const [activePopoverItem, setActivePopoverItem] = useState(null)
    const [popoverTarget, setPopoverTarget] = useState(null)
    const location = useLocation()

    const toggleSubmenu = (itemId) => {
        setExpandedItems(prev => ({
            ...prev,
            [itemId]: !prev[itemId]
        }))
    }

    const handlePopoverShow = (item, target) => {
        if (collapsed && hasSubmenu(item)) {
            setActivePopoverItem(item)
            setPopoverTarget(target)
            setShowPopover(true)
        } else {
            toggleSubmenu(item.id)
        }
    }

    const handlePopoverHide = () => {
        setShowPopover(false)
        setActivePopoverItem(null)
        setPopoverTarget(null)
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
                            ref={(el) => {
                                if (collapsed && el) {
                                    el.setAttribute('data-item-id', item.id)
                                }
                            }}
                            variant="link"
                            className={`w-100 text-start p-0 border-0 text-decoration-none ${isItemActive ? 'bg-primary text-white' : 'text-dark'
                                }`}
                            onClick={(e) => handlePopoverShow(item, e.currentTarget)}
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
                        <div className="ms-3 px-3">
                            {item.children.map(child => renderSubMenuItem(child))}
                        </div>
                    </Collapse>
                )}
            </div>
        )
    }

    const renderSubMenuItem = (item) => {
        if (!canAccessMenuItem(item)) return null

        const isItemActive = isActive(item.path)
        const hasChildren = hasSubmenu(item)
        const isExpanded = expandedItems[item.id]

        return (
            <div key={item.id}>
                <div className="position-relative">
                    {hasChildren ? (
                        <Button
                            variant="link"
                            className={`w-100 text-start p-0 border-0 text-decoration-none ${isItemActive ? 'bg-primary text-white' : 'text-dark'}`}
                            onClick={() => toggleSubmenu(item.id)}
                            style={{ paddingRight: '12px' }}
                        >
                            <div className="d-flex align-items-center py-2 px-3">
                                <span className="flex-grow-1 fw-semibold">{item.title}</span>
                                <i className={`fas fa-chevron-${isExpanded ? 'down' : 'right'} ms-2`}></i>
                            </div>
                        </Button>
                    ) : (
                        <Link
                            to={item.path}
                            className={`d-flex align-items-center text-decoration-none p-0 m-0 ${isItemActive
                                    ? 'bg-gray-200 text-primary border-start border-primary border-3 rounded-0'
                                    : 'text-muted hover-bg-light border-start border-gray-200 border-3 rounded-0'
                                }`}
                            style={{ paddingRight: '12px' }}
                        >
                            <div className="d-flex align-items-center py-1 px-2 text-sm">
                                <div className="">
                                    <div className="fw-semibold">{item.title}</div>
                                    {item.description && (
                                        <small className="opacity-75">{item.description}</small>
                                    )}
                                </div>
                            </div>
                        </Link>
                    )}
                </div>

                {/* Sub-submenu */}
                {hasChildren && (
                    <Collapse in={isExpanded}>
                        <div className="ms-3 border-top">
                            {item.children.map(child => renderSubMenuItem(child))}
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
                
                /* Estilos para el popover del sidebar */
                .sidebar-popover {
                    z-index: 1050 !important;
                }
                .sidebar-popover .popover-header {
                    border-bottom: none;
                    border-radius: 0.375rem 0.375rem 0 0;
                }
                .sidebar-popover .popover-body {
                    border-radius: 0 0 0.375rem 0.375rem;
                }
                .sidebar-popover .popover-body a:last-child {
                    border-bottom: none !important;
                }
                .sidebar-popover .popover-body a:hover {
                    background-color: #f8f9fa !important;
                }
            `}</style>

            {/* Popover para sidebar contraído */}
            <Overlay
                target={popoverTarget}
                show={showPopover}
                placement="right"
                onHide={handlePopoverHide}
                rootClose
            >
                <Popover 
                    id="sidebar-popover"
                    className="sidebar-popover"
                    style={{ 
                        minWidth: '200px',
                        maxWidth: '280px'
                    }}
                >
                    <Popover.Header as="h6" className="bg-primary text-white">
                        {activePopoverItem?.title}
                    </Popover.Header>
                    <Popover.Body className="p-0">
                        {activePopoverItem?.children?.map(child => (
                            <Link
                                key={child.id}
                                to={child.path}
                                className={`d-block text-decoration-none p-3 border-bottom ${isActive(child.path) 
                                    ? 'bg-primary text-white' 
                                    : 'text-dark hover-bg-light'
                                }`}
                                onClick={handlePopoverHide}
                            >
                                <div className="fw-semibold">{child.title}</div>
                                {child.description && (
                                    <small className="opacity-75">{child.description}</small>
                                )}
                            </Link>
                        ))}
                    </Popover.Body>
                </Popover>
            </Overlay>
        </div>
    )
}

export default Sidebar 