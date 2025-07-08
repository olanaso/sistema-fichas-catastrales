import React from 'react'
import { Container } from 'react-bootstrap'
import PageHeader from '../layout/PageHeader'

const PageContainer = ({ 
    title, 
    breadcrumbItems = [], 
    actions = null,
    children,
    fluid = true,
    className = "",
    ...props 
}) => {
    return (
        <div className={`h-100 ${className}`} {...props}>
            {/* Page Header */}
            {title && (
                <PageHeader 
                    title={title}
                    breadcrumbItems={breadcrumbItems}
                    actions={actions}
                />
            )}

            {/* Page Content */}
            <div className="flex-grow-1">
                {fluid ? (
                    <Container fluid className={title ? "py-0" : "py-4"}>
                        {children}
                    </Container>
                ) : (
                    <Container className={title ? "py-0" : "py-4"}>
                        {children}
                    </Container>
                )}
            </div>
        </div>
    )
}

export default PageContainer 