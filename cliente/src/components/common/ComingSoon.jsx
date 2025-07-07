import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'

const ComingSoon = ({ 
    title = 'Próximamente',
    message = 'Esta sección está en desarrollo y estará disponible próximamente.',
    icon = 'fas fa-tools',
    showProgress = true,
    className = "",
    ...props 
}) => {
    return (
        <div className={`py-4 ${className}`} {...props}>
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow-sm border-0">
                        <Card.Body className="text-center py-5">
                            <div className="mb-4">
                                <i className={`${icon} text-primary`} style={{ fontSize: '3rem' }}></i>
                            </div>
                            <h3 className="text-primary mb-3">{title}</h3>
                            <p className="text-muted mb-4">{message}</p>
                            {showProgress && (
                                <div className="d-flex justify-content-center gap-2">
                                    <div className="spinner-border spinner-border-sm text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <span className="text-muted">Trabajando en ello...</span>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ComingSoon 