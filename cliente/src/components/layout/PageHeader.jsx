import React from 'react'
import { Breadcrumb, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const PageHeader = ({ title, breadcrumbItems = [], actions = null }) => {
    return (
        <div className="bg-white">
            <div className="container-fluid py-3">
                <Row className="align-items-center">
                    <Col>
                        {/* Breadcrumb simplificado */}
                        {breadcrumbItems.length > 0 && (
                            <Breadcrumb className="mb-2">
                                {breadcrumbItems.map((item, index) => (
                                    <Breadcrumb.Item
                                        key={index}
                                        active={index === breadcrumbItems.length - 1}
                                        as={item.href ? Link : 'span'}
                                        to={item.href || undefined}
                                    >
                                        {item.label}
                                    </Breadcrumb.Item>
                                ))}
                            </Breadcrumb>
                        )}

                        {/* Título de la página */}
                        <h1 className="h4 mb-0 fw-bold text-dark">{title}</h1>
                    </Col>

                    {/* Acciones */}
                    {actions && (
                        <Col xs="12">
                            {actions}
                        </Col>
                    )}
                </Row>
            </div>
        </div>
    )
}

export default PageHeader 