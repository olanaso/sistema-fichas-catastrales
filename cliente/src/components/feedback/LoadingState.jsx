import React from 'react'
import { Container, Card } from 'react-bootstrap'

const LoadingState = ({ 
    message = 'Cargando...',
    icon = 'fas fa-spinner',
    size = 'normal',
    fullPage = false,
    className = "",
    ...props 
}) => {
    const getSizeClass = () => {
        switch (size) {
            case 'small': return 'py-3'
            case 'large': return 'py-5'
            default: return 'py-4'
        }
    }

    const content = (
        <div className={`text-center ${getSizeClass()}`}>
            <div className="spinner-border text-primary mb-3" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted">{message}</p>
        </div>
    )

    if (fullPage) {
        return (
            <Container fluid className={`d-flex align-items-center justify-content-center ${className}`} style={{ minHeight: '50vh' }} {...props}>
                {content}
            </Container>
        )
    }

    return (
        <Card className={`shadow-sm border-0 ${className}`} {...props}>
            <Card.Body>
                {content}
            </Card.Body>
        </Card>
    )
}

export default LoadingState 