import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Card, Alert } from 'react-bootstrap'
import { useApp } from '../context/AppContext'
import { AdminLayout, PageContainer, LoadingState } from '../components'

function Inicio() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { user, isAuthenticated } = useApp()

    useEffect(() => {
        // Verificar autenticación
        if (!isAuthenticated) {
            navigate('/login')
            return
        }

        // Simular carga de datos
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [isAuthenticated, navigate])

    const breadcrumbItems = [
        {
            label: 'Inicio'
        }
    ]

    if (loading) {
        return (
            <AdminLayout>
                <PageContainer 
                    title="Inicio"
                    breadcrumbItems={breadcrumbItems}
                >
                    <LoadingState 
                        message="Cargando..."
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