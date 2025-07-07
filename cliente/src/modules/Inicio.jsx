import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Card, Alert } from 'react-bootstrap'
import { authService } from './auth/api/authService'
import { AdminLayout, PageContainer, LoadingState } from '../components'

function Inicio() {
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        loadUserData()
    }, [])

    const loadUserData = async () => {
        try {
            // Verificar autenticación
            if (!authService.isAuthenticated()) {
                navigate('/login')
                return
            }

            // Obtener datos del usuario desde localStorage
            const user = authService.getCurrentUser()
            if (user) {
                setUserData(user)
            } else {
                // Si no hay datos de usuario pero sí token, mostrar información básica
                setUserData({
                    message: 'Usuario autenticado',
                    token: authService.getAccessToken()?.substring(0, 20) + '...',
                    loginTime: new Date().toLocaleString()
                })
            }
        } catch (err) {
            setError('Error al cargar datos del usuario')
            setTimeout(() => navigate('/login'), 2000)
        } finally {
            setLoading(false)
        }
    }

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
                        message="Cargando panel de inicio..."
                        fullPage={true}
                    />
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
                {error && (
                    <Alert variant="danger" className="mb-4">
                        <i className="fas fa-exclamation-circle me-2"></i>
                        {error}
                    </Alert>
                )}

                <Row className="g-4">
                    {/* Información de Sesión */}
                    {userData && (
                        <Col xs={12}>
                            <Card className="border-0 shadow-sm">
                                <Card.Header className="bg-white border-bottom">
                                    <Card.Title className="h6 mb-0">
                                        <i className="fas fa-info-circle me-2 text-primary"></i>
                                        Información de Sesión
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <div className="bg-dark rounded p-3">
                                        <pre className="text-light mb-0 small">
                                            {JSON.stringify(userData, null, 2)}
                                        </pre>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
                </Row>
            </PageContainer>
        </AdminLayout>
    )
}

export default Inicio 