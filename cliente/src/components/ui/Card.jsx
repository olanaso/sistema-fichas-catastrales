import React from 'react'
import { Card as BootstrapCard } from 'react-bootstrap'

const Card = ({ 
    title,
    subtitle,
    children,
    className = '',
    bodyClassName = '',
    headerClassName = '',
    ...props 
}) => {
    return (
        <BootstrapCard className={`shadow-sm border-0 ${className}`} {...props}>
            {(title || subtitle) && (
                <BootstrapCard.Header className={`bg-white border-bottom ${headerClassName}`}>
                    {title && <BootstrapCard.Title className="mb-0">{title}</BootstrapCard.Title>}
                    {subtitle && <BootstrapCard.Subtitle className="text-muted">{subtitle}</BootstrapCard.Subtitle>}
                </BootstrapCard.Header>
            )}
            <BootstrapCard.Body className={bodyClassName}>
                {children}
            </BootstrapCard.Body>
        </BootstrapCard>
    )
}

export default Card 