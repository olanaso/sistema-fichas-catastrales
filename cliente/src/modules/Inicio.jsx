import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Card, Alert } from 'react-bootstrap'
import { useApp } from '../context/AppContext'
import { AdminLayout, PageContainer, LoadingState } from '../components'

function Inicio() {
    const [pageLoading, setPageLoading] = useState(true)
    const [error] = useState('')
    const navigate = useNavigate()
    const { user, isAuthenticated, loading } = useApp()

    useEffect(() => {
        // Esperar a que termine la verificación inicial de autenticación
        if (loading) {
            return // Aún está verificando la autenticación
        }

        // Una vez verificada la autenticación, decidir qué hacer
        if (!isAuthenticated) {
            navigate('/login')
            return
        }

        // Si está autenticado, simular carga de datos de la página
        setTimeout(() => {
            setPageLoading(false)
        }, 1000)
    }, [isAuthenticated, loading, navigate])

    const breadcrumbItems = [
        {
            label: 'Inicio'
        }
    ]

    // Mostrar loading mientras se verifica autenticación o se cargan datos
    if (loading || pageLoading) {
        return (
            <AdminLayout>
                <PageContainer
                    title="Inicio"
                    breadcrumbItems={breadcrumbItems}
                >
                    <LoadingState
                        message={loading ? "Verificando autenticación..." : "Cargando..."}
                        fullPage={true}
                    />
                </PageContainer>
            </AdminLayout>
        )
    }

    if (error) {
        return (
            <AdminLayout>
                <PageContainer
                    title="Inicio"
                    breadcrumbItems={breadcrumbItems}
                >
                    <Alert variant="danger">
                        {error}
                    </Alert>
                </PageContainer>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <PageContainer
                title="Inicio"
                breadcrumbItems={breadcrumbItems}
            >
                <Row>
                    <Col md={12}>
                        <Card className="shadow-sm border-0">
                            <Card.Body>
                                <h4 className="text-primary mb-4">
                                    <i className="fas fa-home me-2"></i>
                                    Bienvenido al Sistema Catastral
                                </h4>

                                {user && (
                                    <div className="mb-4">
                                        <h5>Información del Usuario</h5>
                                        <p><strong>Nombre:</strong> {user.nombres ? `${user.nombres} ${user.apellidos}` : user.name || 'N/A'}</p>
                                        <p><strong>Email:</strong> {user.email || 'N/A'}</p>
                                        <p><strong>Rol:</strong> {user.role || 'Usuario'}</p>
                                        <p><strong>Fecha de acceso:</strong> {new Date().toLocaleString()}</p>
                                    </div>
                                )}

                                <div className="row">
                                    <div className="col-md-6">
                                        <h5>Accesos Rápidos</h5>
                                        <ul className="list-unstyled">
                                            <li><i className="fas fa-file-alt me-2"></i><a href="/fichas/lista">Lista de Fichas</a></li>
                                            <li><i className="fas fa-users me-2"></i><a href="/usuarios/lista">Lista de Usuarios</a></li>
                                            <li><i className="fas fa-chart-bar me-2"></i><a href="/reportes/dashboard">Reportes</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6">
                                        <h5>Estadísticas</h5>
                                        <p>Próximamente disponible...</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </PageContainer>
        </AdminLayout>
    )
}

export default Inicio 